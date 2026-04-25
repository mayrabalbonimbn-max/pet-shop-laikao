import { NotificationItem, NotificationStatus } from "@/domains/notifications/types";

export const notificationStatusLabels: Record<NotificationStatus, string> = {
  queued: "Na fila",
  sent: "Enviado",
  failed: "Falhou",
  retrying: "Tentando novamente",
  cancelled: "Cancelado"
};

export const mockNotifications: NotificationItem[] = [
  {
    id: "NOT-11",
    channel: "email",
    event: "appointment.confirmed",
    recipient: "marina@email.com",
    status: "sent",
    reference: "APT-1042",
    createdAt: "2026-04-20T10:17:00.000Z"
  },
  {
    id: "NOT-12",
    channel: "whatsapp",
    event: "order.paid",
    recipient: "(11) 99999-1010",
    status: "queued",
    reference: "ORD-2019",
    createdAt: "2026-04-20T11:41:00.000Z"
  },
  {
    id: "NOT-13",
    channel: "push",
    event: "payment.failed",
    recipient: "Bianca Souza",
    status: "failed",
    reference: "ORD-2021",
    createdAt: "2026-04-20T12:46:00.000Z"
  }
];
