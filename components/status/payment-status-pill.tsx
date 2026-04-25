import { appointmentPaymentStatusLabels } from "@/domains/appointments/constants";
import { AppointmentPaymentStatus } from "@/domains/appointments/types";
import { paymentStatusLabels } from "@/domains/payments/constants";
import { PaymentStatus } from "@/domains/payments/types";

import { StatusBadge } from "@/components/status/status-badge";

export function PaymentStatusPill({ status }: { status: AppointmentPaymentStatus | PaymentStatus }) {
  const label = status in appointmentPaymentStatusLabels ? appointmentPaymentStatusLabels[status as AppointmentPaymentStatus] : paymentStatusLabels[status as PaymentStatus];
  return <StatusBadge label={label} status={status} />;
}
