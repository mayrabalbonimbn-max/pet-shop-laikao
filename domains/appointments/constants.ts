import {
  AppointmentPaymentStatus,
  AppointmentRecord,
  AppointmentService,
  AppointmentStatus,
  AvailabilityRule,
  CalendarBlock,
  CustomerProfile,
  PaymentOption,
  PetProfile
} from "@/domains/appointments/types";

export const HOLD_DURATION_SECONDS = 10 * 60;

export const appointmentStatusLabels: Record<AppointmentStatus, string> = {
  draft: "Rascunho",
  hold_pending_payment: "Aguardando pagamento",
  confirmed_partial: "Confirmado com saldo",
  confirmed_paid: "Confirmado quitado",
  checked_in: "Check-in realizado",
  in_service: "Em atendimento",
  completed: "Concluído",
  reschedule_requested: "Reagendamento solicitado",
  rescheduled: "Reagendado",
  cancelled: "Cancelado",
  no_show: "Não compareceu",
  payment_failed: "Pagamento falhou",
  payment_expired: "Pagamento expirou"
};

export const appointmentPaymentStatusLabels: Record<AppointmentPaymentStatus, string> = {
  unpaid: "Não iniciado",
  pending: "Pendente",
  partial: "Parcial",
  paid: "Pago",
  failed: "Falhou",
  expired: "Expirado",
  cancelled: "Cancelado"
};

export const paymentOptionLabels: Record<PaymentOption, string> = {
  deposit_50: "Reservar com 50%",
  full_100: "Pagar 100%"
};

export const appointmentServicesSeed: AppointmentService[] = [
  {
    id: "svc-bath-premium",
    slug: "banho-e-tosa-premium",
    name: "Banho e tosa premium",
    description: "Serviço principal com ticket mais alto e operação completa.",
    durationMinutes: 90,
    priceCents: 11000,
    active: true
  },
  {
    id: "svc-bath-therapy",
    slug: "banho-terapeutico",
    name: "Banho terapêutico",
    description: "Banho de cuidado especial com execução mais rápida.",
    durationMinutes: 60,
    priceCents: 7800,
    active: true
  },
  {
    id: "svc-hygiene",
    slug: "tosa-higienica",
    name: "Tosa higiênica",
    description: "Serviço de manutenção com ótima conversão de entrada.",
    durationMinutes: 45,
    priceCents: 6500,
    active: true
  }
];

export const customersSeed: CustomerProfile[] = [
  {
    id: "cust-marina",
    fullName: "Marina Costa",
    phone: "(11) 99111-2200",
    email: "marina@email.com"
  },
  {
    id: "cust-lucas",
    fullName: "Lucas Mello",
    phone: "(11) 99222-4400",
    email: "lucas@email.com"
  },
  {
    id: "cust-renata",
    fullName: "Renata Lima",
    phone: "(11) 99333-6600",
    email: "renata@email.com"
  }
];

export const petsSeed: PetProfile[] = [
  {
    id: "pet-thor",
    customerId: "cust-marina",
    name: "Thor",
    species: "dog",
    breed: "Golden Retriever",
    size: "large"
  },
  {
    id: "pet-maya",
    customerId: "cust-lucas",
    name: "Maya",
    species: "dog",
    breed: "Spitz",
    size: "small"
  },
  {
    id: "pet-pingo",
    customerId: "cust-renata",
    name: "Pingo",
    species: "dog",
    breed: "Shih-tzu",
    size: "small"
  }
];

export const availabilityRulesSeed: AvailabilityRule[] = [
  { id: "rule-1", serviceId: null, weekday: 1, startsAt: "09:00", endsAt: "18:00", slotIntervalMinutes: 60, capacity: 1, active: true },
  { id: "rule-2", serviceId: null, weekday: 2, startsAt: "09:00", endsAt: "18:00", slotIntervalMinutes: 60, capacity: 1, active: true },
  { id: "rule-3", serviceId: null, weekday: 3, startsAt: "09:00", endsAt: "18:00", slotIntervalMinutes: 60, capacity: 1, active: true },
  { id: "rule-4", serviceId: null, weekday: 4, startsAt: "09:00", endsAt: "18:00", slotIntervalMinutes: 60, capacity: 1, active: true },
  { id: "rule-5", serviceId: null, weekday: 5, startsAt: "09:00", endsAt: "18:00", slotIntervalMinutes: 60, capacity: 1, active: true },
  { id: "rule-6", serviceId: null, weekday: 6, startsAt: "09:00", endsAt: "14:00", slotIntervalMinutes: 60, capacity: 1, active: true }
];

export const calendarBlocksSeed: CalendarBlock[] = [
  {
    id: "block-1",
    startsAt: "2026-04-23T14:00:00.000Z",
    endsAt: "2026-04-23T18:00:00.000Z",
    reason: "Bloqueio operacional da tarde"
  },
  {
    id: "block-2",
    startsAt: "2026-04-25T09:00:00.000Z",
    endsAt: "2026-04-25T11:00:00.000Z",
    reason: "Encaixe interno / manutenção"
  }
];

const buildTimeline = (entries: Array<[string, string, string]>) =>
  entries.map(([id, label, description], index) => ({
    id,
    label,
    description,
    createdAt: `2026-04-20T1${index}:00:00.000Z`
  }));

export const appointmentsSeed: AppointmentRecord[] = [
  {
    id: "APT-1042",
    serviceId: "svc-bath-premium",
    serviceName: "Banho e tosa premium",
    customerId: "cust-marina",
    customerName: "Marina Costa",
    customerPhone: "(11) 99111-2200",
    customerEmail: "marina@email.com",
    petId: "pet-thor",
    petName: "Thor",
    petSpecies: "dog",
    petSize: "large",
    scheduledStartAt: "2026-04-21T10:30:00.000Z",
    scheduledEndAt: "2026-04-21T12:00:00.000Z",
    status: "confirmed_partial",
    paymentStatus: "partial",
    paymentOption: "deposit_50",
    paymentMethod: "pix",
    amountDueCents: 11000,
    amountPaidCents: 5500,
    amountBalanceCents: 5500,
    createdAt: "2026-04-20T10:00:00.000Z",
    updatedAt: "2026-04-20T10:16:00.000Z",
    timeline: buildTimeline([
      ["tl-1", "Agendamento criado", "Reserva criada pela agenda online."],
      ["tl-2", "Sinal confirmado", "Pagamento parcial registrado no fluxo."]
    ])
  },
  {
    id: "APT-1043",
    serviceId: "svc-bath-therapy",
    serviceName: "Banho terapêutico",
    customerId: "cust-lucas",
    customerName: "Lucas Mello",
    customerPhone: "(11) 99222-4400",
    customerEmail: "lucas@email.com",
    petId: "pet-maya",
    petName: "Maya",
    petSpecies: "dog",
    petSize: "small",
    scheduledStartAt: "2026-04-21T13:00:00.000Z",
    scheduledEndAt: "2026-04-21T14:00:00.000Z",
    status: "confirmed_paid",
    paymentStatus: "paid",
    paymentOption: "full_100",
    paymentMethod: "credit_card",
    amountDueCents: 7800,
    amountPaidCents: 7800,
    amountBalanceCents: 0,
    createdAt: "2026-04-20T10:40:00.000Z",
    updatedAt: "2026-04-20T10:55:00.000Z",
    timeline: buildTimeline([
      ["tl-3", "Agendamento criado", "Reserva criada pela agenda online."],
      ["tl-4", "Pagamento integral", "Pagamento 100% confirmado via simulação."]
    ])
  },
  {
    id: "APT-1044",
    serviceId: "svc-hygiene",
    serviceName: "Tosa higiênica",
    customerId: "cust-renata",
    customerName: "Renata Lima",
    customerPhone: "(11) 99333-6600",
    customerEmail: "renata@email.com",
    petId: "pet-pingo",
    petName: "Pingo",
    petSpecies: "dog",
    petSize: "small",
    scheduledStartAt: "2026-04-21T15:30:00.000Z",
    scheduledEndAt: "2026-04-21T16:15:00.000Z",
    status: "payment_failed",
    paymentStatus: "failed",
    paymentOption: "deposit_50",
    paymentMethod: "pix",
    amountDueCents: 6500,
    amountPaidCents: 0,
    amountBalanceCents: 6500,
    createdAt: "2026-04-20T11:00:00.000Z",
    updatedAt: "2026-04-20T11:10:00.000Z",
    timeline: buildTimeline([
      ["tl-5", "Agendamento criado", "Reserva criada pela agenda online."],
      ["tl-6", "Pagamento falhou", "Tentativa de cobrança recusada antes da confirmação."]
    ])
  }
];
