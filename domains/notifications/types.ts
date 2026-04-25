export type NotificationStatus = "queued" | "sent" | "failed" | "retrying" | "cancelled";

export type NotificationChannel = "email" | "whatsapp" | "push" | "admin_inbox";

export type NotificationItem = {
  id: string;
  channel: NotificationChannel;
  event: string;
  recipient: string;
  status: NotificationStatus;
  reference: string;
  createdAt: string;
};
