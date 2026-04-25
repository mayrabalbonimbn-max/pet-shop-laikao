import { formatCurrency } from "@/lib/formatters";
import { getAppointmentById } from "@/server/repositories/appointment-repository";
import { getOrderById } from "@/server/repositories/order-repository";
import {
  getPaymentById,
  listIntegrationLogsByPaymentId,
  listPayments
} from "@/server/repositories/payment-repository";
import { mapPaymentToAppointmentListItem, mapPaymentToFinanceRow, mapPaymentToIntentView } from "@/domains/payments/mappers";
import { FinanceSummary } from "@/domains/payments/types";
import { listPaymentsForAppointment, listPaymentsForOrder } from "@/server/services/payments/payment-orchestration-service";

export async function getPaymentStatusView(paymentId: string) {
  const payment = await getPaymentById(paymentId);
  if (!payment) {
    return null;
  }

  const appointment = payment.appointmentId ? await getAppointmentById(payment.appointmentId) : null;
  const order = payment.orderId ? await getOrderById(payment.orderId) : null;

  return {
    payment: mapPaymentToIntentView(payment),
    appointment: appointment
      ? {
          id: appointment.id,
          serviceId: appointment.serviceId,
          status: appointment.status,
          paymentStatus: appointment.paymentStatus,
          serviceName: appointment.serviceName,
          customerName: appointment.customerName,
          petName: appointment.petName,
          selectedStartAt: appointment.scheduledStartAt,
          holdExpiresAt: appointment.holdExpiresAt,
          amountDueCents: appointment.amountDueCents,
          amountPaidCents: appointment.amountPaidCents,
          amountBalanceCents: appointment.amountBalanceCents,
          amountDueLabel: formatCurrency(appointment.amountDueCents / 100),
          amountPaidLabel: formatCurrency(appointment.amountPaidCents / 100),
          amountBalanceLabel: formatCurrency(appointment.amountBalanceCents / 100)
        }
      : undefined,
    order: order
      ? {
          id: order.id,
          orderNumber: order.orderNumber,
          status: order.status,
          paymentStatus: order.paymentStatus,
          fulfillmentStatus: order.fulfillmentStatus,
          inventoryState: order.inventoryState,
          customerName: order.customerName,
          totalCents: order.totalCents,
          totalLabel: formatCurrency(order.totalCents / 100)
        }
      : undefined
  };
}

export async function listFinancePayments() {
  const payments = await listPayments();
  return payments.map(mapPaymentToFinanceRow);
}

export async function getFinanceSummary(): Promise<FinanceSummary> {
  const payments = await listPayments();

  return payments.reduce<FinanceSummary>(
    (summary, payment) => {
      if (payment.status === "paid") {
        summary.paidTotalCents += payment.amountCents;
      }

      if (payment.status === "pending") {
        summary.pendingTotalCents += payment.amountCents;
      }

      if (payment.status === "failed" || payment.status === "expired") {
        summary.failedCount += 1;
      }

      if (payment.status === "refunded") {
        summary.refundedTotalCents += payment.amountCents;
      }

      return summary;
    },
    {
      paidTotalCents: 0,
      pendingTotalCents: 0,
      failedCount: 0,
      refundedTotalCents: 0
    }
  );
}

export async function getPaymentAdminDetail(paymentId: string) {
  const payment = await getPaymentById(paymentId);
  if (!payment) {
    return null;
  }

  return {
    payment: mapPaymentToIntentView(payment),
    logs: await listIntegrationLogsByPaymentId(paymentId)
  };
}

export async function listAppointmentPaymentItems(appointmentId: string) {
  const payments = await listPaymentsForAppointment(appointmentId);
  return payments.map(mapPaymentToAppointmentListItem);
}

export async function listOrderPaymentItems(orderId: string) {
  const payments = await listPaymentsForOrder(orderId);
  return payments.map((payment) => ({
    id: payment.id,
    purpose: payment.purpose,
    method: payment.method,
    status: payment.status,
    amountLabel: formatCurrency(payment.amountCents / 100),
    createdAt: payment.createdAt,
    paidAt: payment.paidAt,
    checkoutUrl: payment.checkoutUrl,
    providerPaymentId: payment.providerPaymentId
  }));
}
