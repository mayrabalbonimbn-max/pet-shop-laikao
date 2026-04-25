import { db } from "@/server/db/client";
import { ensureSqliteDatabaseSchema } from "@/server/db/bootstrap";
import { ensureAppointmentSeedData } from "@/server/services/appointment-seed-service";
import { categorySeed, couponSeed, productSeed } from "@/domains/catalog/constants";

declare global {
  // eslint-disable-next-line no-var
  var __laikaoCommerceSeedPromise: Promise<void> | undefined;
}

async function seed() {
  await ensureSqliteDatabaseSchema();
  await ensureAppointmentSeedData();

  const productCount = await db.product.count();
  if (productCount > 0) {
    return;
  }

  const customers = await db.customer.findMany({ orderBy: { createdAt: "asc" }, take: 2 });

  await db.$transaction(async (tx) => {
    for (const category of categorySeed) {
      await tx.category.create({
        data: {
          ...category,
          description: category.description ?? null,
          parentId: category.parentId ?? null
        }
      });
    }

    for (const product of productSeed) {
      await tx.product.create({
        data: {
          id: product.id,
          categoryId: product.categoryId,
          slug: product.slug,
          name: product.name,
          description: product.description,
          status: product.status,
          featured: product.featured,
          imageLabel: product.imageLabel,
          active: product.active,
          variants: {
            create: product.variants.map((variant) => ({
              id: variant.id,
              slug: variant.slug,
              title: variant.title,
              sku: variant.sku,
              priceCents: variant.priceCents,
              compareAtCents: variant.compareAtCents ?? null,
              stockQuantity: variant.stockQuantity,
              reservedQuantity: variant.reservedQuantity,
              active: variant.active
            }))
          }
        }
      });
    }

    for (const coupon of couponSeed) {
      await tx.coupon.create({
        data: {
          id: coupon.id,
          code: coupon.code,
          description: coupon.description ?? null,
          discountType: coupon.discountType,
          discountValue: coupon.discountValue,
          minSubtotalCents: coupon.minSubtotalCents ?? null,
          active: coupon.active,
          startsAt: coupon.startsAt ? new Date(coupon.startsAt) : null,
          endsAt: coupon.endsAt ? new Date(coupon.endsAt) : null,
          usageLimit: coupon.usageLimit ?? null,
          usageCount: coupon.usageCount
        }
      });
    }

    await tx.cart.create({
      data: {
        id: "CART-DEMO",
        cartKey: "demo-cart",
        customerId: customers[0]?.id ?? null,
        status: "active",
        subtotalCents: 13280,
        discountCents: 0,
        totalCents: 13280,
        items: {
          create: [
            {
              id: "CARTITEM-01",
              productId: "PROD-01",
              variantId: "VAR-01",
              quantity: 1,
              unitPriceCents: 4290,
              lineTotalCents: 4290
            },
            {
              id: "CARTITEM-02",
              productId: "PROD-02",
              variantId: "VAR-02",
              quantity: 1,
              unitPriceCents: 8990,
              lineTotalCents: 8990
            }
          ]
        }
      }
    });

    await tx.order.create({
      data: {
        id: "ORDER-01",
        orderNumber: "PED-3001",
        customerId: customers[0]?.id ?? null,
        customerName: customers[0]?.fullName ?? "Cliente Laikao",
        customerPhone: customers[0]?.phone ?? "+55 11 98051-2871",
        customerEmail: customers[0]?.email ?? null,
        status: "pending_payment",
        paymentStatus: "pending",
        fulfillmentStatus: "reserved",
        inventoryState: "reserved",
        subtotalCents: 22990,
        discountCents: 0,
        shippingCents: 0,
        totalCents: 22990,
        items: {
          create: [
            {
              id: "ORDERITEM-01",
              productId: "PROD-03",
              variantId: "VAR-03",
              productName: "Cama Nuvem Conforto Max",
              variantName: "Tamanho M",
              sku: "LAI-CAMA-M",
              quantity: 1,
              unitPriceCents: 22990,
              lineTotalCents: 22990
            }
          ]
        },
        timeline: {
          create: [
            {
              id: "ORDTL-01",
              label: "Pedido criado",
              description: "Pedido criado com reserva inicial de estoque."
            }
          ]
        }
      }
    });

    await tx.order.create({
      data: {
        id: "ORDER-02",
        orderNumber: "PED-3002",
        customerId: customers[1]?.id ?? null,
        customerName: customers[1]?.fullName ?? "Cliente Premium",
        customerPhone: customers[1]?.phone ?? "+55 11 98051-2871",
        customerEmail: customers[1]?.email ?? null,
        status: "delivered",
        paymentStatus: "paid",
        fulfillmentStatus: "delivered",
        inventoryState: "decremented",
        subtotalCents: 4290,
        discountCents: 0,
        shippingCents: 0,
        totalCents: 4290,
        items: {
          create: [
            {
              id: "ORDERITEM-02",
              productId: "PROD-01",
              variantId: "VAR-01",
              productName: "Shampoo Hidratante Pelos Brilhantes",
              variantName: "500ml",
              sku: "LAI-SHAMPOO-500",
              quantity: 1,
              unitPriceCents: 4290,
              lineTotalCents: 4290
            }
          ]
        },
        timeline: {
          create: [
            {
              id: "ORDTL-02",
              label: "Pedido pago",
              description: "Pagamento confirmado e estoque baixado."
            },
            {
              id: "ORDTL-03",
              label: "Pedido entregue",
              description: "Ciclo comercial concluido."
            }
          ]
        }
      }
    });

    await tx.inventoryMovement.createMany({
      data: [
        {
          id: "INV-01",
          productId: "PROD-03",
          variantId: "VAR-03",
          movementType: "reserve",
          quantity: 1,
          reason: "Reserva ao criar pedido",
          referenceType: "order",
          referenceId: "ORDER-01"
        },
        {
          id: "INV-02",
          productId: "PROD-01",
          variantId: "VAR-01",
          movementType: "decrement",
          quantity: 1,
          reason: "Pedido concluido",
          referenceType: "order",
          referenceId: "ORDER-02"
        }
      ]
    });
  });
}

export async function ensureCommerceSeedData() {
  if (!global.__laikaoCommerceSeedPromise) {
    global.__laikaoCommerceSeedPromise = seed();
  }

  await global.__laikaoCommerceSeedPromise;
}
