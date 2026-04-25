import {
  IntegrationStatus,
  PaymentMethod,
  PaymentProvider,
  PaymentPurpose,
  PaymentStatus
} from "@/domains/payments/types";

export const PAYMENT_PROVIDER: PaymentProvider = "infinitepay";
export const PAYMENT_CURRENCY = "BRL";

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  pending: "Pendente",
  partial: "Parcial",
  paid: "Pago",
  failed: "Falhou",
  expired: "Expirado",
  cancelled: "Cancelado",
  refunded: "Reembolsado"
};

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  pix: "Pix",
  credit_card: "Cartão"
};

export const paymentPurposeLabels: Record<PaymentPurpose, string> = {
  appointment_deposit: "Sinal do agendamento",
  appointment_full: "Agendamento integral",
  appointment_balance: "Saldo do agendamento",
  order_full: "Pedido da loja",
  refund: "Estorno"
};

export const integrationStatusLabels: Record<IntegrationStatus, string> = {
  received: "Recebido",
  processed: "Processado",
  failed: "Falhou",
  ignored: "Ignorado"
};
