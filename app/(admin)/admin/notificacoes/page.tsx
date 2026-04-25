import { FilterBar } from "@/components/admin/filter-bar";
import { DataTable } from "@/components/data-display/data-table";
import { StatusBadge } from "@/components/status/status-badge";
import { mockNotifications, notificationStatusLabels } from "@/domains/notifications/constants";

export default function AdminNotificationsPage() {
  const headers = ["Canal", "Evento", "Destinatário", "Status", "Referência"];
  const rows = mockNotifications.map((item) => [
    <p key={`${item.id}-channel`} className="font-semibold text-ink-900">
      {item.channel}
    </p>,
    <p key={`${item.id}-event`} className="text-sm text-stone-500">
      {item.event}
    </p>,
    <p key={`${item.id}-recipient`} className="text-sm text-stone-500">
      {item.recipient}
    </p>,
    <StatusBadge key={`${item.id}-status`} label={notificationStatusLabels[item.status]} status={item.status} />,
    <p key={`${item.id}-reference`} className="font-medium text-ink-900">
      {item.reference}
    </p>
  ]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="eyebrow">Notificações</p>
        <h1 className="page-title">Fila de envio, falhas e rastreabilidade visíveis para operação e suporte.</h1>
      </div>
      <FilterBar placeholder="Buscar por canal, evento ou destinatário" primaryFilterLabel="Canal" />
      <DataTable headers={headers} rows={rows} />
    </div>
  );
}
