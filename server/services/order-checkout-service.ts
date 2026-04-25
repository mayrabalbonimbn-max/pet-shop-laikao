import { db } from "@/server/db/client";
import {
  createOrderRecord,
  getCartRecordByKey,
  getVariantRecordById,
  updateCartRecordTotals
} from "@/server/repositories/commerce-repository";
import { reserveVariantInventory } from "@/server/services/inventory-service";
import { calculateCartTotals, validateCartStock } from "@/domains/orders/policies";
import { findCouponRecordByCode } from "@/server/repositories/commerce-repository";

export async function recalculateCart(cartKey: string) {
  let cart = await getCartRecordByKey(cartKey);
  if (!cart) {
    throw new Error("Carrinho nao encontrado.");
  }

  for (const item of cart.items) {
    const variant = await getVariantRecordById(item.variantId);
    if (!variant) {
      throw new Error("Variante nao encontrada ao recalcular o carrinho.");
    }

    if (variant.priceCents !== item.unitPriceCents) {
      await db.cartItem.update({
        where: {
          id: item.id
        },
        data: {
          unitPriceCents: variant.priceCents,
          lineTotalCents: variant.priceCents * item.quantity,
          updatedAt: new Date()
        }
      });
    }
  }

  cart = await getCartRecordByKey(cartKey);
  if (!cart) {
    throw new Error("Carrinho nao encontrado.");
  }

  const coupon = cart.couponCode ? await findCouponRecordByCode(cart.couponCode) : null;
  const totals = calculateCartTotals({ items: cart.items, coupon });

  return updateCartRecordTotals({
    cartKey,
    subtotalCents: totals.subtotalCents,
    discountCents: totals.discountCents,
    totalCents: totals.totalCents,
    couponId: totals.couponApplication?.couponId
  });
}

export async function createOrderFromCartService(input: {
  cartKey: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
}) {
  const cart = await recalculateCart(input.cartKey);

  if (cart.items.length === 0) {
    throw new Error("Nao e possivel gerar pedido com carrinho vazio.");
  }

  const stockValidation = validateCartStock(cart);
  if (!stockValidation.valid) {
    throw new Error(stockValidation.issues[0] ?? "Carrinho com problema de estoque.");
  }

  return db.$transaction(async (tx) => {
    for (const item of cart.items) {
      await reserveVariantInventory(tx, {
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        referenceType: "cart_checkout",
        referenceId: cart.cartKey,
        reason: "Reserva ao criar pedido a partir do carrinho"
      });
    }

    const order = await createOrderRecord({
      tx,
      cartKey: cart.cartKey,
      couponId: cart.couponId,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail,
      notes: input.notes,
      subtotalCents: cart.subtotalCents,
      discountCents: cart.discountCents,
      shippingCents: 0,
      totalCents: cart.totalCents,
      items: await Promise.all(
        cart.items.map(async (item) => {
          const variant = await getVariantRecordById(item.variantId);
          if (!variant) {
            throw new Error("Variante nao encontrada ao criar pedido.");
          }

          return {
            productId: item.productId,
            variantId: item.variantId,
            productName: item.productName,
            variantName: item.variantName,
            sku: variant.sku,
            quantity: item.quantity,
            unitPriceCents: item.unitPriceCents,
            lineTotalCents: item.lineTotalCents
          };
        })
      )
    });

    return order;
  });
}
