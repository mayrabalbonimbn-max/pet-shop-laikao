import {
  findCouponRecordByCode,
  getOrCreateCartRecord,
  removeCartItemRecord,
  updateCartItemQuantityRecord,
  updateCartRecordTotals,
  upsertCartItemRecord
} from "@/server/repositories/commerce-repository";
import { createOrderFromCartService, recalculateCart } from "@/server/services/order-checkout-service";
import {
  addCartItemSchema,
  applyCouponSchema,
  createOrderFromCartSchema,
  orderTransitionSchema,
  removeCartItemSchema,
  updateCartItemSchema
} from "@/domains/orders/schema";
import { calculateCartTotals } from "@/domains/orders/policies";
import { getCartView } from "@/domains/orders/queries";
import { applyOrderTransition } from "@/server/services/order-lifecycle-service";

export async function getOrCreateCartAction(cartKey: string) {
  const cart = await getOrCreateCartRecord(cartKey);
  await recalculateCart(cart.cartKey);
  return getCartView(cart.cartKey);
}

export async function addItemToCart(input: unknown) {
  const payload = addCartItemSchema.parse(input);
  await upsertCartItemRecord(payload);
  await recalculateCart(payload.cartKey);
  return getCartView(payload.cartKey);
}

export async function updateCartItemQuantity(input: unknown) {
  const payload = updateCartItemSchema.parse(input);
  await updateCartItemQuantityRecord(payload);
  await recalculateCart(payload.cartKey);
  return getCartView(payload.cartKey);
}

export async function removeCartItem(input: unknown) {
  const payload = removeCartItemSchema.parse(input);
  await removeCartItemRecord(payload);
  await recalculateCart(payload.cartKey);
  return getCartView(payload.cartKey);
}

export async function applyCouponToCart(input: unknown) {
  const payload = applyCouponSchema.parse(input);
  const cart = await getOrCreateCartRecord(payload.cartKey);
  const coupon = await findCouponRecordByCode(payload.code);
  if (!coupon) {
    throw new Error("Cupom nao encontrado.");
  }

  const totals = calculateCartTotals({
    items: cart.items,
    coupon
  });

  if (!totals.couponApplication) {
    throw new Error("Cupom invalido para o subtotal atual.");
  }

  await updateCartRecordTotals({
    cartKey: payload.cartKey,
    subtotalCents: totals.subtotalCents,
    discountCents: totals.discountCents,
    totalCents: totals.totalCents,
    couponId: totals.couponApplication?.couponId
  });

  await recalculateCart(payload.cartKey);
  return getCartView(payload.cartKey);
}

export async function createOrderFromCart(input: unknown) {
  const payload = createOrderFromCartSchema.parse(input);
  const order = await createOrderFromCartService({
    cartKey: payload.cartKey,
    customerName: payload.customerName,
    customerPhone: payload.customerPhone,
    customerEmail: payload.customerEmail || undefined,
    notes: payload.notes || undefined
  });

  return {
    orderId: order.id,
    orderNumber: order.orderNumber
  };
}

export async function transitionOrderAction(orderId: string, input: unknown) {
  const payload = orderTransitionSchema.parse(input);
  return applyOrderTransition({
    orderId,
    event: {
      type: payload.event
    }
  });
}
