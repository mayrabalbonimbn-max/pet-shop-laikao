import { AgendaBookingFlow } from "@/components/appointments/agenda-booking-flow";
import { getAgendaBootstrapData, getAvailabilityData } from "@/domains/appointments/queries";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const bootstrap = await getAgendaBootstrapData();
  const initialService = bootstrap.services[0];
  const initialAvailability = await getAvailabilityData({
    serviceId: initialService.id,
    selectedDate: bootstrap.initialSelectedDate,
    view: "month"
  });

  return (
    <div className="content-container py-8 sm:py-12">
      <AgendaBookingFlow bootstrap={bootstrap} initialAvailability={initialAvailability} />
    </div>
  );
}
