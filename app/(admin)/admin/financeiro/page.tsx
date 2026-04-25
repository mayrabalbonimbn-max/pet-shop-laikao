import { FilterBar } from "@/components/admin/filter-bar";
import { MetricCard } from "@/components/admin/metric-card";
import { PaymentDetailDrawer } from "@/components/admin/payment-detail-drawer";
import { DataTable } from "@/components/data-display/data-table";
import { BalanceDueIndicator } from "@/components/status/balance-due-indicator";
import { PaymentStatusPill } from "@/components/status/payment-status-pill";
import { listAdminAppointments } from "@/domains/appointments/queries";
import { listCommerceAdminOrders, getCommerceInventorySnapshot } from "@/domains/orders/queries";
import { paymentMethodLabels, paymentPurposeLabels } from "@/domains/payments/constants";
import { getFinanceSummary, getPaymentAdminDetail, listFinancePayments } from "@/domains/payments/queries";
import { formatCurrency } from "@/lib/formatters";

export const dynamic = "force-dynamic";

export default async function AdminFinancePage() {
  const [payments, summary, appointments, orders, inventorySnapshot] = await Promise.all([
    listFinancePayments(),
    getFinanceSummary(),
    listAdminAppointments(),
    listCommerceAdminOrders(),
    getCommerceInventorySnapshot()
  ]);
  const paymentDetails = await Promise.all(payments.map((payment) => getPaymentAdminDetail(payment.id)));
  const detailsById = new Map(paymentDetails.filter(Boolean).map((detail) => [detail!.payment.id, detail!]));
  const pendingBalanceCents = appointments.reduce((total, appointment) => total + appointment.amountBalanceCents, 0);
  const pendingOrderTotalCents = orders
    .filter((order) => order.paymentStatus === "pending")
    .reduce((total, order) => total + order.totalCents, 0);
  const headers = ["Pagamento", "Referencia", "Cliente", "Valor", "Metodo", "Status", "Acao"];
  const rows = payments.map((payment) => [
    <div key={`${payment.id}-payment`}>
      <p className="font-semibold text-ink-900">{paymentPurposeLabels[payment.purpose]}</p>
      <p className="text-xs text-stone-500">{payment.id}</p>
    </div>,
    <div key={`${payment.id}-ref`}>
      <p className="text-sm font-medium text-ink-900">{payment.orderNumber ?? payment.referenceId}</p>
      <p className="text-xs text-stone-500">{payment.orderNumber ? "Pedido da loja" : payment.serviceName ?? "Agendamento"}</p>
    </div>,
    <p key={`${payment.id}-customer`} className="text-sm text-stone-500">
      {payment.customerName}
    </p>,
    <p key={`${payment.id}-amount`} className="font-semibold text-ink-900">
      {payment.amountLabel}
    </p>,
    <p key={`${payment.id}-method`} className="text-sm text-stone-500">
      {paymentMethodLabels[payment.method]}
    </p>,
    <PaymentStatusPill key={`${payment.id}-status`} status={payment.status} />,
    detailsById.get(payment.id) ? (
      <PaymentDetailDrawer key={`${payment.id}-drawer`} detail={detailsById.get(payment.id)!} />
    ) : (
      <span key={`${payment.id}-empty`} className="text-sm text-stone-500">
        Sem detalhe
      </span>
    )
  ]);

  const metricCards = [
    {
      label: "Recebido via InfinitePay",
      value: formatCurrency(summary.paidTotalCents / 100),
      helper: "Pagamentos ja conciliados pelo gateway.",
      tone: "success" as const
    },
    {
      label: "Cobrancas pendentes",
      value: formatCurrency(summary.pendingTotalCents / 100),
      helper: "Inclui checkouts abertos e aguardando confirmacao.",
      tone: "warning" as const
    },
    {
      label: "Falhas e expiracoes",
      value: String(summary.failedCount),
      helper: "Pagamentos que exigem nova tentativa ou revisao.",
      tone: "danger" as const
    },
    {
      label: "Estornos preparados",
      value: formatCurrency(summary.refundedTotalCents / 100),
      helper: "Estrutura pronta, mesmo sem fluxo final de refund.",
      tone: "neutral" as const
    },
    {
      label: "Pedidos aguardando pagamento",
      value: formatCurrency(pendingOrderTotalCents / 100),
      helper: "Leitura real dos pedidos criados a partir do carrinho.",
      tone: "warning" as const
    },
    {
      label: "Unidades reservadas",
      value: String(inventorySnapshot.reservedUnits),
      helper: "Itens ja reservados no estoque por pedidos abertos.",
      tone: "neutral" as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="eyebrow">Financeiro</p>
        <h1 className="page-title">Recebimentos, pendencias e excecoes financeiras precisam viver no mesmo radar operacional.</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {metricCards.map((metric) => (
          <MetricCard key={metric.label} item={metric} />
        ))}
      </div>

      <FilterBar placeholder="Buscar por pagamento, agendamento ou cliente" primaryFilterLabel="Status financeiro" />

      <div className="surface-default flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <p className="text-sm font-semibold text-ink-900">Saldo pendente dos agendamentos</p>
          <p className="text-sm text-stone-500">Visao rapida para operacao, cobranca e follow-up no admin.</p>
        </div>
        <BalanceDueIndicator value={formatCurrency(pendingBalanceCents / 100)} />
      </div>

      <div className="surface-default flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <p className="text-sm font-semibold text-ink-900">Pedidos do ecommerce em aberto</p>
          <p className="text-sm text-stone-500">Base real da loja conectada ao financeiro e ao estoque reservado.</p>
        </div>
        <div className="text-right">
          <p className="font-heading text-2xl font-semibold text-brand-700">{orders.length}</p>
          <p className="text-xs text-stone-500">{inventorySnapshot.pendingOrders} com pagamento pendente</p>
        </div>
      </div>

      <div className="hidden lg:block">
        <DataTable headers={headers} rows={rows} />
      </div>

      <div className="grid gap-4 lg:hidden">
        {payments.map((payment) => {
          const detail = detailsById.get(payment.id);

          return (
            <article key={payment.id} className="surface-default space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink-900">{paymentPurposeLabels[payment.purpose]}</p>
                  <p className="text-xs text-stone-500">{payment.orderNumber ?? payment.referenceId}</p>
                </div>
                <PaymentStatusPill status={payment.status} />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">Cliente</span>
                  <span className="font-medium text-ink-900">{payment.customerName}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">Valor</span>
                  <span className="font-semibold text-ink-900">{payment.amountLabel}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">Metodo</span>
                  <span className="font-medium text-ink-900">{paymentMethodLabels[payment.method]}</span>
                </div>
              </div>
              {detail ? <PaymentDetailDrawer detail={detail} /> : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
