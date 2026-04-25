import { AppointmentAdminDetail, AppointmentAdminRow, AppointmentRecord, AppointmentService, CustomerProfile, PetProfile } from "@/domains/appointments/types";
import { calculateAmounts } from "@/domains/appointments/policies";
import { formatCurrency } from "@/lib/formatters";

export function mapCustomersWithPets(customers: CustomerProfile[], pets: PetProfile[]) {
  return customers.map((customer) => ({
    ...customer,
    pets: pets.filter((pet) => pet.customerId === customer.id)
  }));
}

export function mapAppointmentToAdminRow(appointment: AppointmentRecord): AppointmentAdminRow {
  return {
    id: appointment.id,
    customerName: appointment.customerName,
    customerPhone: appointment.customerPhone,
    petName: appointment.petName,
    serviceName: appointment.serviceName,
    scheduledStartAt: appointment.scheduledStartAt,
    status: appointment.status,
    paymentStatus: appointment.paymentStatus,
    amountPaidCents: appointment.amountPaidCents,
    amountBalanceCents: appointment.amountBalanceCents
  };
}

export function mapAppointmentToAdminDetail(appointment: AppointmentRecord): AppointmentAdminDetail {
  return {
    ...mapAppointmentToAdminRow(appointment),
    paymentOption: appointment.paymentOption,
    paymentMethod: appointment.paymentMethod,
    holdExpiresAt: appointment.holdExpiresAt,
    timeline: appointment.timeline
  };
}

export function mapAppointmentToHoldResponse(appointment: AppointmentRecord) {
  return {
    id: appointment.id,
    status: appointment.status,
    paymentStatus: appointment.paymentStatus,
    holdExpiresAt: appointment.holdExpiresAt,
    serviceName: appointment.serviceName,
    customerName: appointment.customerName,
    petName: appointment.petName,
    selectedStartAt: appointment.scheduledStartAt,
    amountDueLabel: formatCurrency(appointment.amountDueCents / 100),
    amountPaidLabel: formatCurrency(appointment.amountPaidCents / 100),
    amountBalanceLabel: formatCurrency(appointment.amountBalanceCents / 100)
  };
}

export function mapSummaryPricing(service: AppointmentService | undefined, paymentOption: "deposit_50" | "full_100") {
  if (!service) {
    return null;
  }

  const amounts = calculateAmounts(service.priceCents, paymentOption);

  return {
    totalCents: service.priceCents,
    chargeNowCents: amounts.amountToChargeNowCents,
    balanceCents: amounts.amountBalanceCents,
    totalLabel: formatCurrency(service.priceCents / 100),
    chargeNowLabel: formatCurrency(amounts.amountToChargeNowCents / 100),
    balanceLabel: formatCurrency(amounts.amountBalanceCents / 100)
  };
}
