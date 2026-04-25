import { Prisma } from "@prisma/client";

function variantRowId(variantId: string) {
  return { id: variantId };
}

export async function reserveVariantInventory(
  tx: Prisma.TransactionClient,
  {
    variantId,
    productId,
    quantity,
    referenceType,
    referenceId,
    reason
  }: {
    variantId: string;
    productId: string;
    quantity: number;
    referenceType: string;
    referenceId: string;
    reason: string;
  }
) {
  const variant = await tx.productVariant.findUnique({
    where: variantRowId(variantId)
  });

  if (!variant) {
    throw new Error("Variant not found for inventory reservation.");
  }

  const available = variant.stockQuantity - variant.reservedQuantity;
  if (available < quantity) {
    throw new Error("Estoque insuficiente para reservar o item.");
  }

  await tx.productVariant.update({
    where: variantRowId(variantId),
    data: {
      reservedQuantity: {
        increment: quantity
      }
    }
  });

  await tx.inventoryMovement.create({
    data: {
      id: `${referenceId}-reserve-${variantId}-${Date.now()}`,
      productId,
      variantId,
      movementType: "reserve",
      quantity,
      reason,
      referenceType,
      referenceId
    }
  });
}

export async function releaseVariantInventory(
  tx: Prisma.TransactionClient,
  {
    variantId,
    productId,
    quantity,
    referenceType,
    referenceId,
    reason
  }: {
    variantId: string;
    productId: string;
    quantity: number;
    referenceType: string;
    referenceId: string;
    reason: string;
  }
) {
  const variant = await tx.productVariant.findUnique({
    where: variantRowId(variantId)
  });

  if (!variant) {
    throw new Error("Variant not found for inventory release.");
  }

  const releasable = Math.min(quantity, variant.reservedQuantity);

  await tx.productVariant.update({
    where: variantRowId(variantId),
    data: {
      reservedQuantity: {
        decrement: releasable
      }
    }
  });

  await tx.inventoryMovement.create({
    data: {
      id: `${referenceId}-release-${variantId}-${Date.now()}`,
      productId,
      variantId,
      movementType: "release",
      quantity: releasable,
      reason,
      referenceType,
      referenceId
    }
  });
}

export async function decrementVariantInventory(
  tx: Prisma.TransactionClient,
  {
    variantId,
    productId,
    quantity,
    referenceType,
    referenceId,
    reason
  }: {
    variantId: string;
    productId: string;
    quantity: number;
    referenceType: string;
    referenceId: string;
    reason: string;
  }
) {
    const variant = await tx.productVariant.findUnique({
      where: variantRowId(variantId)
    });

    if (!variant) {
      throw new Error("Variant not found for inventory decrement.");
    }

    if (variant.stockQuantity < quantity) {
      throw new Error("Estoque insuficiente para baixa definitiva.");
    }

    await tx.productVariant.update({
      where: variantRowId(variantId),
      data: {
        stockQuantity: {
          decrement: quantity
        },
        reservedQuantity: {
          decrement: Math.min(quantity, variant.reservedQuantity)
        }
      }
    });

    await tx.inventoryMovement.create({
      data: {
        id: `${referenceId}-decrement-${variantId}-${Date.now()}`,
        productId,
        variantId,
        movementType: "decrement",
        quantity,
        reason,
        referenceType,
        referenceId
      }
    });
}
