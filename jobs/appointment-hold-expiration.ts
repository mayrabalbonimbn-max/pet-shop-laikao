import { expireAppointmentHoldsBatch } from "@/server/services/appointment-hold-expiration-service";

export async function appointmentHoldExpirationJob() {
  await expireAppointmentHoldsBatch();
  return "completed";
}
