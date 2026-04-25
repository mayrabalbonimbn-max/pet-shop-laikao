import {
  AppointmentRecord,
  AppointmentStatus,
  AppointmentTransitionEvent
} from "@/domains/appointments/types";
import { calculateAmounts, getPaymentStatusFromAppointment } from "@/domains/appointments/policies";

const transitionMap: Record<AppointmentStatus, AppointmentTransitionEvent["type"][]> = {
  draft: ["create_hold"],
  hold_pending_payment: ["payment_confirmed", "payment_failed", "payment_expired", "cancel"],
  confirmed_partial: ["payment_confirmed", "check_in", "request_reschedule", "cancel", "mark_no_show"],
  confirmed_paid: ["check_in", "request_reschedule", "cancel", "mark_no_show"],
  checked_in: ["start_service"],
  in_service: ["complete"],
  completed: [],
  reschedule_requested: ["mark_rescheduled", "cancel"],
  rescheduled: [],
  cancelled: [],
  no_show: [],
  payment_failed: ["create_hold"],
  payment_expired: ["create_hold"]
};

function resolveNextStatus(currentStatus: AppointmentStatus, event: AppointmentTransitionEvent): AppointmentStatus {
  if (!transitionMap[currentStatus].includes(event.type)) {
    throw new Error(`Transition ${currentStatus} -> ${event.type} is not allowed.`);
  }

  switch (event.type) {
    case "create_hold":
      return "hold_pending_payment";
    case "payment_confirmed":
      if (currentStatus === "confirmed_partial") {
        return "confirmed_paid";
      }
      return event.paymentOption === "deposit_50" ? "confirmed_partial" : "confirmed_paid";
    case "payment_failed":
      return "payment_failed";
    case "payment_expired":
      return "payment_expired";
    case "check_in":
      return "checked_in";
    case "start_service":
      return "in_service";
    case "complete":
      return "completed";
    case "request_reschedule":
      return "reschedule_requested";
    case "mark_rescheduled":
      return "rescheduled";
    case "cancel":
      return "cancelled";
    case "mark_no_show":
      return "no_show";
  }
}

export function transitionAppointment(appointment: AppointmentRecord, event: AppointmentTransitionEvent) {
  const nextStatus = resolveNextStatus(appointment.status, event);
  const next: AppointmentRecord = {
    ...appointment,
    status: nextStatus,
    updatedAt: new Date().toISOString()
  };

  if (event.type === "create_hold") {
    next.holdExpiresAt = event.holdExpiresAt;
    next.amountPaidCents = 0;
    next.amountBalanceCents = appointment.amountDueCents;
  }

  if (event.type === "payment_confirmed") {
    const amounts = calculateAmounts(appointment.amountDueCents, event.paymentOption);
    next.paymentOption = event.paymentOption;
    next.amountPaidCents = amounts.amountToChargeNowCents;
    next.amountBalanceCents = amounts.amountBalanceCents;
    next.holdExpiresAt = undefined;
  }

  if (event.type === "payment_failed" || event.type === "payment_expired" || event.type === "cancel") {
    next.holdExpiresAt = undefined;
  }

  next.paymentStatus = getPaymentStatusFromAppointment(next.status, next.amountPaidCents, next.amountBalanceCents);

  return next;
}
