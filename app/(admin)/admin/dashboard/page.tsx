import { DetailDrawer } from "@/components/admin/detail-drawer";
import { MetricCard } from "@/components/admin/metric-card";
import { InlineNotice } from "@/components/feedback/inline-notice";
import { dashboardMetrics } from "@/domains/admin/constants";
import { listAdminAppointments } from "@/domains/appointments/queries";
import { mockOrders } from "@/domains/orders/constants";
import { listAdminPromotions } from "@/domains/promotions/queries";
import { OperationalStatusPill } from "@/components/status/operational-status-pill";
import { BalanceDueIndicator } from "@/components/status/balance-due-indicator";
import { formatCurrency } from "@/lib/formatters";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const appointments = (await listAdminAppointments()).slice(0, 3);
  const promotions = await listAdminPromotions();
  const activePromotions = promotions.filter((promotion) => promotion.active).length;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="eyebrow">Dashboard</p>
        <h1 className="page-title">Centro operacional do dia com agenda, pedidos, financeiro e alertas visíveis.</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} item={metric} />
        ))}
        <MetricCard
          item={{
            label: "Promocoes ativas",
            value: String(activePromotions),
            helper: "Campanhas publicas ligadas ao admin.",
            tone: "success"
          }}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="surface-default p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl font-semibold">Próximos atendimentos</h2>
              <p className="text-sm text-stone-500">O que precisa de atenção nas próximas horas.</p>
            </div>
          </div>
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="rounded-[var(--radius-md)] border border-stone-100 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{appointment.customerName}</p>
                    <p className="text-sm text-stone-500">
                      {appointment.petName} • {appointment.serviceName}
                    </p>
                  </div>
                  <OperationalStatusPill status={appointment.status} />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  {appointment.amountBalanceCents > 0 ? (
                    <BalanceDueIndicator value={formatCurrency(appointment.amountBalanceCents / 100)} compact />
                  ) : (
                    <span className="text-sm text-stone-500">Pagamento em dia</span>
                  )}
                  <DetailDrawer title={appointment.id} subtitle="Timeline, pagamento, status e automações." />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="surface-default p-6">
            <h2 className="font-heading text-xl font-semibold">Pedidos novos</h2>
            <div className="mt-4 space-y-3">
              {mockOrders.map((order) => (
                <div key={order.id} className="rounded-[var(--radius-md)] border border-stone-100 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{order.id}</p>
                      <p className="text-sm text-stone-500">{order.customerName}</p>
                    </div>
                    <OperationalStatusPill status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <InlineNotice
            tone="warning"
            title="Pendências críticas devem ficar visíveis no topo"
            description="Saldo pendente, pagamento falho, estoque travado e notificação com erro precisam aparecer aqui sem esconder o resto da operação."
          />
        </div>
      </div>
    </div>
  );
}
