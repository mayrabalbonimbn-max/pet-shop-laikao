import { appointmentStatusLabels } from "@/domains/appointments/constants";
import { fulfillmentStatusLabels, orderStatusLabels } from "@/domains/orders/constants";
import { AppointmentStatus } from "@/domains/appointments/types";
import { FulfillmentStatus, OrderStatus } from "@/domains/orders/types";

import { StatusBadge } from "@/components/status/status-badge";

export function OperationalStatusPill({
  status
}: {
  status: AppointmentStatus | OrderStatus | FulfillmentStatus;
}) {
  const label =
    status in appointmentStatusLabels
      ? appointmentStatusLabels[status as AppointmentStatus]
      : status in orderStatusLabels
        ? orderStatusLabels[status as OrderStatus]
        : fulfillmentStatusLabels[status as FulfillmentStatus];

  return <StatusBadge label={label} status={status} />;
}
