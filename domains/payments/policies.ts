import { calculateAmounts } from "@/domains/appointments/policies";
import { AppointmentRecord } from "@/domains/appointments/types";
import { OrderRecord } from "@/domains/orders/types";
import { PaymentPurpose, PaymentStatus } from "@/domains/payments/types";

export function resolveAppointmentPaymentPurpose(appointment: AppointmentRecord): PaymentPurpose {
  return appointment.paymentOption === "deposit_50" ? "appointment_deposit" : "appointment_full";
}

export function resolvePaymentAmountCents(appointment: AppointmentRecord, purpose: PaymentPurpose) {
  switch (purpose) {
    case "appointment_deposit":
      return calculateAmounts(appointment.amountDueCents, "deposit_50").amountToChargeNowCents;
    case "appointment_full":
      return appointment.amountDueCents;
    case "appointment_balance":
      return appointment.amountBalanceCents;
    case "order_full":
      throw new Error("Order payments must resolve amount from the order domain.");
    case "refund":
      return appointment.amountPaidCents;
    default:
      throw new Error("Unsupported payment purpose.");
  }
}

export function resolveOrderPaymentAmountCents(order: OrderRecord, purpose: PaymentPurpose) {
  switch (purpose) {
    case "order_full":
      return order.totalCents;
    default:
      throw new Error("Unsupported order payment purpose.");
  }
}

export function mapInfinitePayStatusToPaymentStatus({
  paid,
  expiresAt,
  providerStatus
}: {
  paid?: boolean;
  expiresAt?: string;
  providerStatus?: string;
}): PaymentStatus {
  if (paid) {
    return "paid";
  }

  if (providerStatus === "cancelled") {
    return "cancelled";
  }

  if (providerStatus === "failed") {
    return "failed";
  }

  if (expiresAt && new Date(expiresAt).getTime() <= Date.now()) {
    return "expired";
  }

  if (!providerStatus) {
    return "pending";
  }

  if (providerStatus === "refunded") {
    return "refunded";
  }

  return "pending";
}

export function paymentNeedsSync(status: PaymentStatus) {
  return status === "pending";
}
