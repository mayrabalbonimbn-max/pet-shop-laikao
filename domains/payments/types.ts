import type { AppointmentPaymentStatus, AppointmentStatus } from "@/domains/appointments/types";

export type PaymentProvider = "infinitepay" | "mercado_pago";
export type PaymentReferenceType = "appointment" | "order";
export type PaymentPurpose = "appointment_deposit" | "appointment_full" | "appointment_balance" | "order_full" | "refund";
export type PaymentMethod = "pix" | "credit_card";
export type PaymentStatus = "pending" | "partial" | "paid" | "failed" | "expired" | "cancelled" | "refunded";
export type IntegrationDirection = "inbound" | "outbound";
export type IntegrationStatus = "received" | "processed" | "failed" | "ignored";

export type PaymentRecord = {
  id: string;
  appointmentId?: string;
  orderId?: string;
  provider: PaymentProvider;
  providerPaymentId?: string;
  providerCheckoutId?: string;
  referenceType: PaymentReferenceType;
  referenceId: string;
  purpose: PaymentPurpose;
  method: PaymentMethod;
  status: PaymentStatus;
  providerStatus?: string;
  amountCents: number;
  currency: string;
  idempotencyKey: string;
  checkoutUrl?: string;
  rawPayload?: string;
  expiresAt?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type IntegrationLogRecord = {
  id: string;
  paymentId?: string;
  provider: PaymentProvider;
  eventType: string;
  eventId?: string;
  direction: IntegrationDirection;
  status: IntegrationStatus;
  referenceType?: PaymentReferenceType;
  referenceId?: string;
  idempotencyKey?: string;
  payload: string;
  responsePayload?: string;
  headers?: string;
  createdAt: string;
  processedAt?: string;
};

export type PaymentIntentView = {
  id: string;
  provider: PaymentProvider;
  method: PaymentMethod;
  purpose: PaymentPurpose;
  status: PaymentStatus;
  amountCents: number;
  amountLabel: string;
  checkoutUrl?: string;
  expiresAt?: string;
  paidAt?: string;
  providerPaymentId?: string;
  providerCheckoutId?: string;
};

export type PaymentStatusView = {
  payment: PaymentIntentView;
  appointment?: {
    id: string;
    serviceId: string;
    status: AppointmentStatus;
    paymentStatus: AppointmentPaymentStatus;
    serviceName: string;
    customerName: string;
    petName: string;
    selectedStartAt: string;
    holdExpiresAt?: string;
    amountDueCents: number;
    amountPaidCents: number;
    amountBalanceCents: number;
    amountDueLabel: string;
    amountPaidLabel: string;
    amountBalanceLabel: string;
      };
  order?: {
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: PaymentStatus;
    fulfillmentStatus: string;
    inventoryState: string;
    customerName: string;
    totalCents: number;
    totalLabel: string;
  };
};

export type FinancePaymentRow = {
  id: string;
  referenceId: string;
  customerName: string;
  serviceName?: string;
  orderNumber?: string;
  purpose: PaymentPurpose;
  amountLabel: string;
  method: PaymentMethod;
  status: PaymentStatus;
  provider: PaymentProvider;
  createdAt: string;
};

export type FinanceSummary = {
  paidTotalCents: number;
  pendingTotalCents: number;
  failedCount: number;
  refundedTotalCents: number;
};

export type AppointmentPaymentListItem = {
  id: string;
  purpose: PaymentPurpose;
  method: PaymentMethod;
  status: PaymentStatus;
  amountLabel: string;
  createdAt: string;
  paidAt?: string;
  checkoutUrl?: string;
  providerPaymentId?: string;
};

export type PaymentWebhookPayload = {
  rawBody: string;
  headers: Record<string, string>;
  query: Record<string, string>;
};
