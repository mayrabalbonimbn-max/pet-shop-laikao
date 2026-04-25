import { FulfillmentStatus, InventoryState, OrderItemSummary, OrderStatus } from "@/domains/orders/types";

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending_payment: "Aguardando pagamento",
  payment_failed: "Pagamento falhou",
  payment_expired: "Pagamento expirou",
  paid: "Pago",
  processing: "Em processamento",
  ready_for_pickup: "Pronto para retirada",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

export const fulfillmentStatusLabels: Record<FulfillmentStatus, string> = {
  not_started: "Nao iniciado",
  reserved: "Reservado",
  picking: "Em separacao",
  ready_for_pickup: "Pronto para retirada",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado"
};

export const inventoryStateLabels: Record<InventoryState, string> = {
  not_reserved: "Nao reservado",
  reserved: "Reservado",
  decremented: "Baixado",
  released: "Liberado"
};

export const mockOrders: OrderItemSummary[] = [
  {
    id: "ORD-2019",
    customerName: "Paulo Nunes",
    totalLabel: "R$ 189,90",
    status: "paid",
    inventoryState: "decremented",
    itemCount: 3,
    createdAt: "2026-04-20T11:35:00.000Z"
  },
  {
    id: "ORD-2020",
    customerName: "Bianca Souza",
    totalLabel: "R$ 74,90",
    status: "processing",
    inventoryState: "reserved",
    itemCount: 2,
    createdAt: "2026-04-20T12:00:00.000Z"
  },
  {
    id: "ORD-2021",
    customerName: "Davi Rocha",
    totalLabel: "R$ 129,90",
    status: "payment_expired",
    inventoryState: "released",
    itemCount: 1,
    createdAt: "2026-04-20T12:45:00.000Z"
  }
];
