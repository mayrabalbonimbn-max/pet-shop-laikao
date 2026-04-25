import { formatCurrency } from "@/lib/formatters";
import {
  createOrderPaymentIntentSchema,
  createAppointmentBalancePaymentSchema,
  createAppointmentPaymentIntentSchema,
  paymentStatusQuerySchema
} from "@/domains/payments/schema";
import {
  createBalancePaymentIntent,
  createInitialAppointmentPaymentIntent,
  createOrderPaymentIntent,
  getPaymentStatusWithSync,
  processPaymentProviderWebhook
} from "@/server/services/payments/payment-orchestration-service";

export async function createAppointmentPaymentIntent(appointmentId: string, input: unknown) {
  const payload = createAppointmentPaymentIntentSchema.parse(input);
  return createInitialAppointmentPaymentIntent({
    appointmentId,
    method: payload.method ?? "pix"
  });
}

export async function createAppointmentBalancePayment(appointmentId: string, input: unknown) {
  const payload = createAppointmentBalancePaymentSchema.parse(input);
  return createBalancePaymentIntent({
    appointmentId,
    method: payload.method
  });
}

export async function createOrderPaymentIntentAction(orderId: string, input: unknown) {
  const payload = createOrderPaymentIntentSchema.parse(input);
  return createOrderPaymentIntent({
    orderId,
    method: payload.method ?? "pix"
  });
}

export async function getPaymentStatusAction(paymentId: string, input: unknown) {
  const payload = paymentStatusQuerySchema.parse(input);
  const result = await getPaymentStatusWithSync({
    paymentId,
    providerPaymentId: payload.providerPaymentId,
    providerCheckoutId: payload.providerCheckoutId,
    sync: payload.sync
  });

  return {
    payment: {
      id: result.payment.id,
      provider: result.payment.provider,
      method: result.payment.method,
      purpose: result.payment.purpose,
      status: result.payment.status,
      amountCents: result.payment.amountCents,
      amountLabel: formatCurrency(result.payment.amountCents / 100),
      checkoutUrl: result.payment.checkoutUrl,
      expiresAt: result.payment.expiresAt,
      paidAt: result.payment.paidAt,
      providerPaymentId: result.payment.providerPaymentId,
      providerCheckoutId: result.payment.providerCheckoutId
    },
    appointment: result.appointment
      ? {
          id: result.appointment.id,
          serviceId: result.appointment.serviceId,
          status: result.appointment.status,
          paymentStatus: result.appointment.paymentStatus,
          serviceName: result.appointment.serviceName,
          customerName: result.appointment.customerName,
          petName: result.appointment.petName,
          selectedStartAt: result.appointment.scheduledStartAt,
          holdExpiresAt: result.appointment.holdExpiresAt,
          amountDueCents: result.appointment.amountDueCents,
          amountPaidCents: result.appointment.amountPaidCents,
          amountBalanceCents: result.appointment.amountBalanceCents,
          amountDueLabel: formatCurrency(result.appointment.amountDueCents / 100),
          amountPaidLabel: formatCurrency(result.appointment.amountPaidCents / 100),
          amountBalanceLabel: formatCurrency(result.appointment.amountBalanceCents / 100)
        }
      : undefined,
    order: result.order
      ? {
          id: result.order.id,
          orderNumber: result.order.orderNumber,
          status: result.order.status,
          paymentStatus: result.order.paymentStatus,
          fulfillmentStatus: result.order.fulfillmentStatus,
          inventoryState: result.order.inventoryState,
          customerName: result.order.customerName,
          totalCents: result.order.totalCents,
          totalLabel: formatCurrency(result.order.totalCents / 100)
        }
      : undefined
  };
}

export async function processPaymentWebhookAction(payload: Parameters<typeof processPaymentProviderWebhook>[0]) {
  return processPaymentProviderWebhook(payload);
}
