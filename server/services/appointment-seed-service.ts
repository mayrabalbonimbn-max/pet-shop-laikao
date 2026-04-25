import { db } from "@/server/db/client";
import { ensureSqliteDatabaseSchema } from "@/server/db/bootstrap";
import {
  appointmentsSeed,
  appointmentServicesSeed,
  availabilityRulesSeed,
  calendarBlocksSeed,
  customersSeed,
  petsSeed
} from "@/domains/appointments/constants";

declare global {
  // eslint-disable-next-line no-var
  var __laikaoAppointmentSeedPromise: Promise<void> | undefined;
}

async function seed() {
  await ensureSqliteDatabaseSchema();

  const serviceCount = await db.appointmentService.count();
  if (serviceCount > 0) {
    return;
  }

  await db.$transaction(async (tx) => {
    for (const service of appointmentServicesSeed) {
      await tx.appointmentService.create({ data: service });
    }

    for (const customer of customersSeed) {
      await tx.customer.create({ data: customer });
    }

    for (const pet of petsSeed) {
      await tx.pet.create({ data: pet });
    }

    for (const rule of availabilityRulesSeed) {
      await tx.availabilityRule.create({ data: rule });
    }

    for (const block of calendarBlocksSeed) {
      await tx.calendarBlock.create({
        data: {
          ...block,
          serviceId: block.serviceId ?? null,
          startsAt: new Date(block.startsAt),
          endsAt: new Date(block.endsAt)
        }
      });
    }

    for (const appointment of appointmentsSeed) {
      await tx.appointment.create({
        data: {
          id: appointment.id,
          serviceId: appointment.serviceId,
          customerId: appointment.customerId,
          petId: appointment.petId,
          scheduledStartAt: new Date(appointment.scheduledStartAt),
          scheduledEndAt: new Date(appointment.scheduledEndAt),
          status: appointment.status,
          paymentStatus: appointment.paymentStatus,
          paymentOption: appointment.paymentOption,
          paymentMethod: appointment.paymentMethod,
          amountDueCents: appointment.amountDueCents,
          amountPaidCents: appointment.amountPaidCents,
          amountBalanceCents: appointment.amountBalanceCents,
          createdAt: new Date(appointment.createdAt),
          updatedAt: new Date(appointment.updatedAt)
        }
      });

      for (const entry of appointment.timeline) {
        await tx.appointmentTimeline.create({
          data: {
            id: entry.id,
            appointmentId: appointment.id,
            label: entry.label,
            description: entry.description,
            createdAt: new Date(entry.createdAt)
          }
        });
      }
    }
  });
}

export async function ensureAppointmentSeedData() {
  if (!global.__laikaoAppointmentSeedPromise) {
    global.__laikaoAppointmentSeedPromise = seed();
  }

  await global.__laikaoAppointmentSeedPromise;
}
