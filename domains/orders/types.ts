import { PaymentStatus } from "@/domains/payments/types";

export type CartStatus = "active" | "converted" | "abandoned";
export type OrderStatus =
  | "pending_payment"
  | "payment_failed"
  | "payment_expired"
  | "paid"
  | "processing"
  | "ready_for_pickup"
  | "shipped"
  | "delivered"
  | "cancelled";
export type FulfillmentStatus = "not_started" | "reserved" | "picking" | "ready_for_pickup" | "shipped" | "delivered" | "cancelled";
export type InventoryState = "not_reserved" | "reserved" | "decremented" | "released";
export type OrderTransitionEvent =
  | { type: "create_payment_intent" }
  | { type: "payment_confirmed" }
  | { type: "payment_failed" }
  | { type: "payment_expired" }
  | { type: "start_processing" }
  | { type: "mark_ready_for_pickup" }
  | { type: "mark_shipped" }
  | { type: "mark_delivered" }
  | { type: "cancel" };

export type CartItemRecord = {
  id: string;
  cartId: string;
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  productSlug: string;
  categoryName: string;
  imageLabel: string;
  sku: string;
  quantity: number;
  unitPriceCents: number;
  currentUnitPriceCents: number;
  lineTotalCents: number;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock" | "reserved";
  availableQuantity: number;
  priceChanged: boolean;
};

export type CartRecord = {
  id: string;
  cartKey: string;
  customerId?: string;
  couponId?: string;
  couponCode?: string;
  status: CartStatus;
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
  items: CartItemRecord[];
  createdAt: string;
  updatedAt: string;
};

export type OrderRecord = {
  id: string;
  orderNumber: string;
  cartId?: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  inventoryState: InventoryState;
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  totalCents: number;
  createdAt: string;
  updatedAt: string;
};

export type OrderItemRecord = {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  sku: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
};

export type OrderAdminRow = {
  id: string;
  orderNumber: string;
  customerName: string;
  totalCents: number;
  totalLabel: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  inventoryState: InventoryState;
  itemCount: number;
  createdAt: string;
};

export type OrderDetailView = {
  order: OrderRecord;
  items: OrderItemRecord[];
  timeline: OrderTimelineEntry[];
  payments: OrderPaymentListItem[];
};

export type OrderItemSummary = {
  id: string;
  customerName: string;
  totalLabel: string;
  status: OrderStatus;
  inventoryState: InventoryState;
  itemCount: number;
  createdAt: string;
};

export type CheckoutPreview = {
  cart: CartView;
  customer?: {
    id?: string;
    fullName: string;
    phone: string;
    email?: string;
  };
  readiness: {
    canCheckout: boolean;
    issues: string[];
  };
};

export type CartView = CartRecord & {
  subtotalLabel: string;
  discountLabel: string;
  totalLabel: string;
  issues: string[];
  hasPriceChanges: boolean;
  hasStockIssues: boolean;
};

export type OrderTimelineEntry = {
  id: string;
  label: string;
  description: string;
  createdAt: string;
};

export type OrderPaymentListItem = {
  id: string;
  purpose: import("@/domains/payments/types").PaymentPurpose;
  method: import("@/domains/payments/types").PaymentMethod;
  status: PaymentStatus;
  amountLabel: string;
  createdAt: string;
  paidAt?: string;
  checkoutUrl?: string;
  providerPaymentId?: string;
};
