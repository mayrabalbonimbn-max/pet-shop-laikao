import { formatCurrency } from "@/lib/formatters";
import { PAYMENT_PROVIDER, paymentPurposeLabels } from "@/domains/payments/constants";
import {
  AppointmentPaymentListItem,
  FinancePaymentRow,
  IntegrationLogRecord,
  PaymentMethod,
  PaymentIntentView,
  PaymentRecord
} from "@/domains/payments/types";
import { OrderPaymentListItem } from "@/domains/orders/types";

export function mapPaymentToIntentView(payment: PaymentRecord): PaymentIntentView {
  return {
    id: payment.id,
    provider: payment.provider,
    method: payment.method,
    purpose: payment.purpose,
    status: payment.status,
    amountCents: payment.amountCents,
    amountLabel: formatCurrency(payment.amountCents / 100),
    checkoutUrl: payment.checkoutUrl,
    expiresAt: payment.expiresAt,
    paidAt: payment.paidAt,
    providerPaymentId: payment.providerPaymentId,
    providerCheckoutId: payment.providerCheckoutId
  };
}

export function mapPaymentToAppointmentListItem(payment: PaymentRecord): AppointmentPaymentListItem {
  return {
    id: payment.id,
    purpose: payment.purpose,
    method: payment.method,
    status: payment.status,
    amountLabel: formatCurrency(payment.amountCents / 100),
    createdAt: payment.createdAt,
    paidAt: payment.paidAt,
    checkoutUrl: payment.checkoutUrl,
    providerPaymentId: payment.providerPaymentId
  };
}

export function mapPaymentToOrderListItem(payment: PaymentRecord): OrderPaymentListItem {
  return {
    id: payment.id,
    purpose: payment.purpose,
    method: payment.method as PaymentMethod,
    status: payment.status,
    amountLabel: formatCurrency(payment.amountCents / 100),
    createdAt: payment.createdAt,
    paidAt: payment.paidAt,
    checkoutUrl: payment.checkoutUrl,
    providerPaymentId: payment.providerPaymentId
  };
}

export function mapPaymentToFinanceRow(payment: PaymentRecord & { customerName: string; serviceName?: string }): FinancePaymentRow {
  return {
    id: payment.id,
    referenceId: payment.referenceId,
    customerName: payment.customerName,
    serviceName: payment.serviceName,
    orderNumber: "orderNumber" in payment ? (payment as PaymentRecord & { orderNumber?: string }).orderNumber : undefined,
    purpose: payment.purpose,
    amountLabel: formatCurrency(payment.amountCents / 100),
    method: payment.method,
    status: payment.status,
    provider: payment.provider ?? PAYMENT_PROVIDER,
    createdAt: payment.createdAt
  };
}

export function mapIntegrationLogPreview(log: IntegrationLogRecord) {
  return {
    id: log.id,
    eventType: log.eventType,
    status: log.status,
    createdAt: log.createdAt
  };
}

export function getPaymentPurposeLabel(purpose: PaymentRecord["purpose"]) {
  return paymentPurposeLabels[purpose];
}
