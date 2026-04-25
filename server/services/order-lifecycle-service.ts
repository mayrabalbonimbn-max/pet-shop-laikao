import { db } from "@/server/db/client";
import { transitionOrder } from "@/domains/orders/state-machine";
import { OrderTransitionEvent } from "@/domains/orders/types";
import { getOrderById, addOrderTimeline, saveOrder } from "@/server/repositories/order-repository";
import {
  reserveVariantInventory,
  decrementVariantInventory,
  releaseVariantInventory
} from "@/server/services/inventory-service";

function buildTimelineCopy(event: OrderTransitionEvent) {
  switch (event.type) {
    case "create_payment_intent":
      return {
        label: "Cobranca criada",
        description: "Um novo checkout foi criado para este pedido."
      };
    case "payment_confirmed":
      return {
        label: "Pagamento confirmado",
        description: "O pedido foi pago e o estoque reservado foi baixado definitivamente."
      };
    case "payment_failed":
      return {
        label: "Pagamento falhou",
        description: "A cobranca falhou e o estoque reservado foi liberado."
      };
    case "payment_expired":
      return {
        label: "Pagamento expirou",
        description: "A cobranca expirou antes da confirmacao e o estoque reservado foi liberado."
      };
    case "start_processing":
      return {
        label: "Separacao iniciada",
        description: "A equipe iniciou o processamento deste pedido."
      };
    case "mark_ready_for_pickup":
      return {
        label: "Pronto para retirada",
        description: "O pedido ja pode ser retirado na loja."
      };
    case "mark_shipped":
      return {
        label: "Pedido enviado",
        description: "O pedido foi despachado."
      };
    case "mark_delivered":
      return {
        label: "Pedido entregue",
        description: "O ciclo comercial do pedido foi concluido."
      };
    case "cancel":
      return {
        label: "Pedido cancelado",
        description: "O pedido foi cancelado e o estoque foi devolvido quando necessario."
      };
  }
}

export async function applyOrderTransition({
  orderId,
  event
}: {
  orderId: string;
  event: OrderTransitionEvent;
}) {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new Error("Pedido nao encontrado.");
  }

  const detail = await db.order.findUnique({
    where: { id: orderId },
    include: {
      items: true
    }
  });

  if (!detail) {
    throw new Error("Pedido nao encontrado.");
  }

  return db.$transaction(async (tx) => {
    const nextOrder = transitionOrder(order, event);

    if (event.type === "payment_confirmed" && order.inventoryState === "reserved") {
      for (const item of detail.items) {
        await decrementVariantInventory(tx, {
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          referenceType: "order",
          referenceId: order.id,
          reason: "Baixa definitiva de estoque apos pagamento aprovado"
        });
      }
    }

    if (event.type === "create_payment_intent" && (order.inventoryState === "released" || order.inventoryState === "not_reserved")) {
      for (const item of detail.items) {
        await reserveVariantInventory(tx, {
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          referenceType: "order",
          referenceId: order.id,
          reason: "Nova reserva ao recriar cobranca do pedido"
        });
      }
    }

    if ((event.type === "payment_failed" || event.type === "payment_expired" || event.type === "cancel") && order.inventoryState === "reserved") {
      for (const item of detail.items) {
        await releaseVariantInventory(tx, {
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          referenceType: "order",
          referenceId: order.id,
          reason:
            event.type === "cancel"
              ? "Liberacao de estoque por cancelamento do pedido"
              : "Liberacao de estoque por falha/expiracao de pagamento"
        });
      }
    }

    if (event.type === "cancel" && order.inventoryState === "decremented") {
      for (const item of detail.items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: {
            stockQuantity: {
              increment: item.quantity
            }
          }
        });

        await tx.inventoryMovement.create({
          data: {
            id: `${order.id}-restock-${item.variantId}-${Date.now()}`,
            productId: item.productId,
            variantId: item.variantId,
            movementType: "restock",
            quantity: item.quantity,
            reason: "Reposicao por cancelamento de pedido pago",
            referenceType: "order",
            referenceId: order.id
          }
        });
      }
    }

    const saved = await saveOrder(nextOrder, tx);
    const timeline = buildTimelineCopy(event);
    await addOrderTimeline(saved.id, timeline.label, timeline.description, tx);
    return saved;
  });
}
