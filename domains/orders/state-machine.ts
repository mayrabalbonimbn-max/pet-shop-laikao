import { OrderRecord, OrderStatus, OrderTransitionEvent } from "@/domains/orders/types";

const transitionMap: Record<OrderStatus, OrderTransitionEvent["type"][]> = {
  pending_payment: ["create_payment_intent", "payment_confirmed", "payment_failed", "payment_expired", "cancel"],
  payment_failed: ["create_payment_intent", "payment_confirmed", "cancel"],
  payment_expired: ["create_payment_intent", "payment_confirmed", "cancel"],
  paid: ["start_processing", "mark_ready_for_pickup", "mark_shipped", "cancel"],
  processing: ["mark_ready_for_pickup", "mark_shipped", "cancel"],
  ready_for_pickup: ["mark_delivered", "cancel"],
  shipped: ["mark_delivered"],
  delivered: [],
  cancelled: []
};

function ensureTransitionAllowed(current: OrderStatus, event: OrderTransitionEvent) {
  if (!transitionMap[current].includes(event.type)) {
    throw new Error(`Transition ${current} -> ${event.type} is not allowed.`);
  }
}

export function transitionOrder(order: OrderRecord, event: OrderTransitionEvent): OrderRecord {
  ensureTransitionAllowed(order.status, event);

  const next: OrderRecord = {
    ...order,
    updatedAt: new Date().toISOString()
  };

  switch (event.type) {
    case "create_payment_intent":
      next.status = "pending_payment";
      next.paymentStatus = "pending";
      if (next.inventoryState === "not_reserved" || next.inventoryState === "released") {
        next.inventoryState = "reserved";
      }
      if (next.fulfillmentStatus === "cancelled" || next.fulfillmentStatus === "not_started") {
        next.fulfillmentStatus = "reserved";
      }
      break;
    case "payment_confirmed":
      next.status = "paid";
      next.paymentStatus = "paid";
      next.fulfillmentStatus = "not_started";
      next.inventoryState = "decremented";
      break;
    case "payment_failed":
      next.status = "payment_failed";
      next.paymentStatus = "failed";
      next.fulfillmentStatus = "not_started";
      next.inventoryState = "released";
      break;
    case "payment_expired":
      next.status = "payment_expired";
      next.paymentStatus = "expired";
      next.fulfillmentStatus = "not_started";
      next.inventoryState = "released";
      break;
    case "start_processing":
      next.status = "processing";
      next.fulfillmentStatus = "picking";
      break;
    case "mark_ready_for_pickup":
      next.status = "ready_for_pickup";
      next.fulfillmentStatus = "ready_for_pickup";
      break;
    case "mark_shipped":
      next.status = "shipped";
      next.fulfillmentStatus = "shipped";
      break;
    case "mark_delivered":
      next.status = "delivered";
      next.fulfillmentStatus = "delivered";
      break;
    case "cancel":
      next.status = "cancelled";
      next.paymentStatus = next.paymentStatus === "paid" ? "refunded" : "cancelled";
      next.fulfillmentStatus = "cancelled";
      next.inventoryState = "released";
      break;
  }

  return next;
}
