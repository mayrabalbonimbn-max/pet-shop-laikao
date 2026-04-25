import { randomUUID } from "node:crypto";

import { Prisma } from "@prisma/client";

import { db } from "@/server/db/client";
import {
  AdminProductRow,
  CategoryRecord,
  CouponRecord,
  InventoryMovementRecord,
  ProductRecord,
  ProductVariantRecord
} from "@/domains/catalog/types";
import {
  CartItemRecord,
  CartRecord,
  OrderAdminRow,
  OrderDetailView,
  OrderItemRecord,
  OrderRecord
} from "@/domains/orders/types";
import { ensureCommerceSeedData } from "@/server/services/commerce-seed-service";
import { formatCurrency } from "@/lib/formatters";

async function ensureInfrastructure() {
  await ensureCommerceSeedData();
}

function nextId(prefix: string) {
  return `${prefix}-${randomUUID()}`;
}

const productInclude = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    category: true,
    variants: {
      orderBy: {
        createdAt: "asc"
      }
    }
  }
});

type ProductWithRelations = Prisma.ProductGetPayload<typeof productInclude>;

const cartInclude = Prisma.validator<Prisma.CartDefaultArgs>()({
  include: {
    coupon: true,
    items: {
      orderBy: {
        createdAt: "asc"
      },
      include: {
        product: {
          include: {
            category: true
          }
        },
        variant: true
      }
    }
  }
});

type CartWithRelations = Prisma.CartGetPayload<typeof cartInclude>;

const orderInclude = Prisma.validator<Prisma.OrderDefaultArgs>()({
  include: {
    items: {
      orderBy: {
        createdAt: "asc"
      }
    },
    coupon: true,
    customer: true
  }
});

type OrderWithRelations = Prisma.OrderGetPayload<typeof orderInclude>;

function computeStockStatus(stockQuantity: number, reservedQuantity: number) {
  const available = Math.max(stockQuantity - reservedQuantity, 0);

  if (available <= 0 && reservedQuantity > 0) {
    return "reserved" as const;
  }

  if (available <= 0) {
    return "out_of_stock" as const;
  }

  if (reservedQuantity > 0) {
    return "reserved" as const;
  }

  if (available <= 3) {
    return "low_stock" as const;
  }

  return "in_stock" as const;
}

function mapVariantRecord(variant: ProductWithRelations["variants"][number]): ProductVariantRecord {
  const availableQuantity = Math.max(variant.stockQuantity - variant.reservedQuantity, 0);

  return {
    id: variant.id,
    productId: variant.productId,
    slug: variant.slug,
    title: variant.title,
    sku: variant.sku,
    priceCents: variant.priceCents,
    compareAtCents: variant.compareAtCents ?? undefined,
    stockQuantity: variant.stockQuantity,
    reservedQuantity: variant.reservedQuantity,
    availableQuantity,
    active: variant.active
  };
}

function mapProductRecord(product: ProductWithRelations): ProductRecord {
  return {
    id: product.id,
    categoryId: product.categoryId ?? undefined,
    categoryName: product.category?.name,
    slug: product.slug,
    name: product.name,
    description: product.description,
    status: product.status as ProductRecord["status"],
    featured: product.featured,
    imageLabel: product.imageLabel,
    mainImageUrl: product.mainImageUrl ?? undefined,
    active: product.active,
    variants: product.variants.map(mapVariantRecord),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString()
  };
}

function mapCartItem(item: CartWithRelations["items"][number]): CartItemRecord {
  const availableQuantity = Math.max(item.variant.stockQuantity - item.variant.reservedQuantity, 0);
  const currentUnitPriceCents = item.variant.priceCents;

  return {
    id: item.id,
    cartId: item.cartId,
    productId: item.productId,
    variantId: item.variantId,
    productName: item.product.name,
    variantName: item.variant.title,
    productSlug: item.product.slug,
    categoryName: item.product.category?.name ?? "Sem categoria",
    imageLabel: item.product.imageLabel,
    sku: item.variant.sku,
    quantity: item.quantity,
    unitPriceCents: item.unitPriceCents,
    currentUnitPriceCents,
    lineTotalCents: item.lineTotalCents,
    stockStatus: computeStockStatus(item.variant.stockQuantity, item.variant.reservedQuantity),
    availableQuantity,
    priceChanged: currentUnitPriceCents !== item.unitPriceCents
  };
}

function mapCartRecord(cart: CartWithRelations): CartRecord {
  return {
    id: cart.id,
    cartKey: cart.cartKey,
    customerId: cart.customerId ?? undefined,
    couponId: cart.couponId ?? undefined,
    couponCode: cart.coupon?.code ?? undefined,
    status: cart.status as CartRecord["status"],
    subtotalCents: cart.subtotalCents,
    discountCents: cart.discountCents,
    totalCents: cart.totalCents,
    items: cart.items.map(mapCartItem),
    createdAt: cart.createdAt.toISOString(),
    updatedAt: cart.updatedAt.toISOString()
  };
}

function mapOrderRecord(order: OrderWithRelations): OrderRecord {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    cartId: order.cartId ?? undefined,
    customerId: order.customerId ?? undefined,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    customerEmail: order.customerEmail ?? undefined,
    notes: order.notes ?? undefined,
    status: order.status as OrderRecord["status"],
    paymentStatus: order.paymentStatus as OrderRecord["paymentStatus"],
    fulfillmentStatus: order.fulfillmentStatus as OrderRecord["fulfillmentStatus"],
    inventoryState: order.inventoryState as OrderRecord["inventoryState"],
    subtotalCents: order.subtotalCents,
    discountCents: order.discountCents,
    shippingCents: order.shippingCents,
    totalCents: order.totalCents,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString()
  };
}

function mapOrderItemRecord(item: OrderWithRelations["items"][number]): OrderItemRecord {
  return {
    id: item.id,
    orderId: item.orderId,
    productId: item.productId,
    variantId: item.variantId,
    productName: item.productName,
    variantName: item.variantName,
    sku: item.sku,
    quantity: item.quantity,
    unitPriceCents: item.unitPriceCents,
    lineTotalCents: item.lineTotalCents
  };
}

export async function listCategoryRecords() {
  await ensureInfrastructure();
  const categories = await db.category.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }]
  });

  return categories.map<CategoryRecord>((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description ?? undefined,
    parentId: category.parentId ?? undefined,
    active: category.active,
    displayOrder: category.displayOrder
  }));
}

export async function listProductRecords() {
  await ensureInfrastructure();
  const products = await db.product.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
    ...productInclude
  });

  return products.map(mapProductRecord);
}

export async function getProductRecordBySlug(slug: string) {
  await ensureInfrastructure();
  const product = await db.product.findUnique({
    where: { slug },
    ...productInclude
  });

  return product ? mapProductRecord(product) : null;
}

export async function listAdminProductRows(): Promise<AdminProductRow[]> {
  const products = await listProductRecords();

  return products.map((product) => {
    const firstVariant = product.variants[0];
    const stockStatus = firstVariant
      ? computeStockStatus(firstVariant.stockQuantity, firstVariant.reservedQuantity)
      : "out_of_stock";

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      categoryName: product.categoryName ?? "Sem categoria",
      priceLabel: formatCurrency((firstVariant?.priceCents ?? 0) / 100),
      stockStatus,
      availableQuantity: firstVariant?.availableQuantity ?? 0,
      reservedQuantity: firstVariant?.reservedQuantity ?? 0,
      sku: firstVariant?.sku ?? "-",
      status: product.status,
      featured: product.featured
    };
  });
}

export async function getVariantRecordById(variantId: string) {
  await ensureInfrastructure();
  return db.productVariant.findUnique({
    where: { id: variantId },
    include: {
      product: {
        include: {
          category: true
        }
      }
    }
  });
}

export async function findCouponRecordByCode(code: string): Promise<CouponRecord | null> {
  await ensureInfrastructure();
  const coupon = await db.coupon.findUnique({
    where: {
      code: code.trim().toUpperCase()
    }
  });

  if (!coupon) {
    return null;
  }

  return {
    id: coupon.id,
    code: coupon.code,
    description: coupon.description ?? undefined,
    discountType: coupon.discountType as CouponRecord["discountType"],
    discountValue: coupon.discountValue,
    minSubtotalCents: coupon.minSubtotalCents ?? undefined,
    active: coupon.active,
    startsAt: coupon.startsAt?.toISOString(),
    endsAt: coupon.endsAt?.toISOString(),
    usageLimit: coupon.usageLimit ?? undefined,
    usageCount: coupon.usageCount
  };
}

async function getCartWithRelationsByKey(cartKey: string) {
  return db.cart.findUnique({
    where: { cartKey },
    ...cartInclude
  });
}

export async function getOrCreateCartRecord(cartKey: string) {
  await ensureInfrastructure();

  let cart = await getCartWithRelationsByKey(cartKey);
  if (!cart) {
    await db.cart.create({
      data: {
        id: nextId("cart"),
        cartKey,
        status: "active",
        subtotalCents: 0,
        discountCents: 0,
        totalCents: 0
      }
    });

    cart = await getCartWithRelationsByKey(cartKey);
  }

  if (!cart) {
    throw new Error("Unable to initialize cart.");
  }

  return mapCartRecord(cart);
}

export async function getCartRecordByKey(cartKey: string) {
  await ensureInfrastructure();
  const cart = await getCartWithRelationsByKey(cartKey);
  return cart ? mapCartRecord(cart) : null;
}

export async function upsertCartItemRecord({
  cartKey,
  variantId,
  quantity
}: {
  cartKey: string;
  variantId: string;
  quantity: number;
}) {
  await ensureInfrastructure();
  const cart = await getOrCreateCartRecord(cartKey);
  const variant = await getVariantRecordById(variantId);

  if (!variant || !variant.product) {
    throw new Error("Produto nao encontrado.");
  }

  const availableQuantity = Math.max(variant.stockQuantity - variant.reservedQuantity, 0);
  if (availableQuantity < quantity) {
    throw new Error("Estoque insuficiente para a quantidade solicitada.");
  }

  const existing = await db.cartItem.findFirst({
    where: {
      cartId: cart.id,
      variantId
    }
  });

  if (existing) {
    await db.cartItem.update({
      where: { id: existing.id },
      data: {
        quantity,
        unitPriceCents: variant.priceCents,
        lineTotalCents: variant.priceCents * quantity,
        updatedAt: new Date()
      }
    });
  } else {
    await db.cartItem.create({
      data: {
        id: nextId("cartitem"),
        cartId: cart.id,
        productId: variant.productId,
        variantId: variant.id,
        quantity,
        unitPriceCents: variant.priceCents,
        lineTotalCents: variant.priceCents * quantity
      }
    });
  }
}

export async function updateCartRecordTotals({
  cartKey,
  subtotalCents,
  discountCents,
  totalCents,
  couponId
}: {
  cartKey: string;
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
  couponId?: string;
}) {
  await ensureInfrastructure();

  await db.cart.update({
    where: { cartKey },
    data: {
      subtotalCents,
      discountCents,
      totalCents,
      couponId: couponId ?? null,
      updatedAt: new Date()
    }
  });

  const refreshed = await getCartWithRelationsByKey(cartKey);
  if (!refreshed) {
    throw new Error("Cart not found after recalculation.");
  }

  return mapCartRecord(refreshed);
}

export async function removeCartItemRecord({
  cartKey,
  itemId
}: {
  cartKey: string;
  itemId: string;
}) {
  await ensureInfrastructure();
  const cart = await getCartWithRelationsByKey(cartKey);
  if (!cart) {
    throw new Error("Cart not found.");
  }

  await db.cartItem.deleteMany({
    where: {
      id: itemId,
      cartId: cart.id
    }
  });
}

export async function updateCartItemQuantityRecord({
  cartKey,
  itemId,
  quantity
}: {
  cartKey: string;
  itemId: string;
  quantity: number;
}) {
  await ensureInfrastructure();
  const cart = await getCartWithRelationsByKey(cartKey);
  if (!cart) {
    throw new Error("Cart not found.");
  }

  const item = cart.items.find((entry) => entry.id === itemId);
  if (!item) {
    throw new Error("Item not found in cart.");
  }

  const availableQuantity = Math.max(item.variant.stockQuantity - item.variant.reservedQuantity, 0);
  if (availableQuantity < quantity) {
    throw new Error("Estoque insuficiente para atualizar a quantidade do item.");
  }

  await db.cartItem.update({
    where: { id: itemId },
    data: {
      quantity,
      lineTotalCents: item.unitPriceCents * quantity,
      updatedAt: new Date()
    }
  });
}

export async function listOrderRecords() {
  await ensureInfrastructure();
  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc"
    },
    ...orderInclude
  });

  return orders.map((order) => ({
    ...mapOrderRecord(order),
    items: order.items.map(mapOrderItemRecord)
  }));
}

export async function listAdminOrderRows(): Promise<OrderAdminRow[]> {
  const orders = await listOrderRecords();

  return orders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    totalCents: order.totalCents,
    totalLabel: formatCurrency(order.totalCents / 100),
    status: order.status,
    paymentStatus: order.paymentStatus,
    fulfillmentStatus: order.fulfillmentStatus,
    inventoryState: order.inventoryState,
    itemCount: order.items.length,
    createdAt: order.createdAt
  }));
}

export async function getOrderDetailById(id: string): Promise<OrderDetailView | null> {
  await ensureInfrastructure();
  const order = await db.order.findUnique({
    where: { id },
    ...orderInclude
  });

  if (!order) {
    return null;
  }

  return {
    order: mapOrderRecord(order),
    items: order.items.map(mapOrderItemRecord),
    timeline: [],
    payments: []
  };
}

export async function listInventoryMovementRecords() {
  await ensureInfrastructure();
  const movements = await db.inventoryMovement.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return movements.map<InventoryMovementRecord>((movement) => ({
    id: movement.id,
    productId: movement.productId,
    variantId: movement.variantId,
    movementType: movement.movementType as InventoryMovementRecord["movementType"],
    quantity: movement.quantity,
    reason: movement.reason,
    referenceType: movement.referenceType,
    referenceId: movement.referenceId,
    createdAt: movement.createdAt.toISOString()
  }));
}

export async function createOrderRecord(input: {
  tx?: Prisma.TransactionClient;
  cartKey: string;
  customerId?: string;
  couponId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  totalCents: number;
  items: Array<{
    productId: string;
    variantId: string;
    productName: string;
    variantName: string;
    sku: string;
    quantity: number;
    unitPriceCents: number;
    lineTotalCents: number;
  }>;
}) {
  await ensureInfrastructure();
  const tx = input.tx ?? db;

    const cart = await tx.cart.findUnique({
      where: { cartKey: input.cartKey },
      include: {
        items: true
      }
    });

    if (!cart) {
      throw new Error("Cart not found for order creation.");
    }

    const order = await tx.order.create({
      data: {
        id: nextId("order"),
        orderNumber: `PED-${Date.now()}`,
        cartId: cart.id,
        customerId: input.customerId ?? null,
        couponId: input.couponId ?? null,
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        customerEmail: input.customerEmail ?? null,
        notes: input.notes ?? null,
        status: "pending_payment",
        paymentStatus: "pending",
        fulfillmentStatus: "reserved",
        inventoryState: "reserved",
        subtotalCents: input.subtotalCents,
        discountCents: input.discountCents,
        shippingCents: input.shippingCents,
        totalCents: input.totalCents,
        items: {
          create: input.items.map((item) => ({
            id: nextId("orderitem"),
            productId: item.productId,
            variantId: item.variantId,
            productName: item.productName,
            variantName: item.variantName,
            sku: item.sku,
            quantity: item.quantity,
            unitPriceCents: item.unitPriceCents,
            lineTotalCents: item.lineTotalCents
          }))
        },
        timeline: {
          create: {
            id: nextId("ordtl"),
            label: "Pedido criado",
            description: "Pedido gerado a partir do carrinho com estoque reservado."
          }
        }
      }
    });

    await tx.cart.update({
      where: { id: cart.id },
      data: {
        status: "converted",
        updatedAt: new Date()
      }
    });

    if (input.couponId) {
      await tx.coupon.update({
        where: { id: input.couponId },
        data: {
          usageCount: {
            increment: 1
          }
        }
      });
    }

    return {
      id: order.id,
      orderNumber: order.orderNumber
    };
}
