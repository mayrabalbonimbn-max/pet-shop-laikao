import { Badge } from "@/components/ui/badge";
import { AppointmentPaymentStatus, AppointmentStatus } from "@/domains/appointments/types";
import { NotificationStatus } from "@/domains/notifications/types";
import { FulfillmentStatus, OrderStatus } from "@/domains/orders/types";
import { PaymentStatus } from "@/domains/payments/types";

type SupportedStatus = AppointmentStatus | AppointmentPaymentStatus | PaymentStatus | OrderStatus | FulfillmentStatus | NotificationStatus;

const toneByStatus: Record<SupportedStatus, "neutral" | "success" | "warning" | "danger" | "info" | "brand"> = {
  draft: "neutral",
  hold_pending_payment: "warning",
  confirmed_partial: "warning",
  confirmed_paid: "success",
  checked_in: "info",
  in_service: "brand",
  completed: "success",
  reschedule_requested: "warning",
  rescheduled: "info",
  cancelled: "danger",
  payment_failed: "danger",
  payment_expired: "danger",
  no_show: "danger",
  unpaid: "neutral",
  pending: "warning",
  partial: "warning",
  paid: "success",
  failed: "danger",
  expired: "danger",
  refunded: "info",
  pending_payment: "warning",
  not_started: "neutral",
  reserved: "warning",
  picking: "brand",
  ready_for_pickup: "info",
  shipped: "info",
  delivered: "success",
  processing: "brand",
  queued: "warning",
  sent: "success",
  retrying: "info"
};

export function StatusBadge({ label, status }: { label: string; status: SupportedStatus }) {
  return <Badge tone={toneByStatus[status]}>{label}</Badge>;
}
