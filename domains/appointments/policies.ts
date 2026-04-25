import { AppointmentPaymentStatus, AppointmentStatus, PaymentOption } from "@/domains/appointments/types";

export const APPOINTMENT_OCCUPYING_STATUSES: AppointmentStatus[] = [
  "hold_pending_payment",
  "confirmed_partial",
  "confirmed_paid",
  "checked_in",
  "in_service"
];

export function appointmentOccupiesSlot(status: AppointmentStatus) {
  return APPOINTMENT_OCCUPYING_STATUSES.includes(status);
}

export function calculateAmounts(priceCents: number, paymentOption: PaymentOption) {
  const amountToChargeNow = paymentOption === "deposit_50" ? Math.ceil(priceCents / 2) : priceCents;

  return {
    amountDueCents: priceCents,
    amountToChargeNowCents: amountToChargeNow,
    amountBalanceCents: Math.max(priceCents - amountToChargeNow, 0)
  };
}

export function getPaymentStatusFromAppointment(
  status: AppointmentStatus,
  amountPaidCents: number,
  amountBalanceCents: number
): AppointmentPaymentStatus {
  if (status === "payment_failed") {
    return "failed";
  }

  if (status === "payment_expired") {
    return "expired";
  }

  if (status === "cancelled") {
    return "cancelled";
  }

  if (status === "hold_pending_payment") {
    return "pending";
  }

  if (amountPaidCents > 0 && amountBalanceCents > 0) {
    return "partial";
  }

  if (amountPaidCents > 0 && amountBalanceCents === 0) {
    return "paid";
  }

  return "unpaid";
}
