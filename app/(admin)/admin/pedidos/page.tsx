import { FilterBar } from "@/components/admin/filter-bar";
import { OrderDetailDrawer } from "@/components/admin/order-detail-drawer";
import { DataTable } from "@/components/data-display/data-table";
import { OperationalStatusPill } from "@/components/status/operational-status-pill";
import { PaymentStatusPill } from "@/components/status/payment-status-pill";
import { inventoryStateLabels } from "@/domains/orders/constants";
import { getCommerceOrderDetail, listCommerceAdminOrders } from "@/domains/orders/queries";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await listCommerceAdminOrders();
  const orderDetails = await Promise.all(orders.map((order) => getCommerceOrderDetail(order.id)));
  const detailsById = new Map(orderDetails.filter(Boolean).map((detail) => [detail!.order.id, detail!]));

  const headers = ["Pedido", "Cliente", "Total", "Pedido", "Financeiro", "Fulfillment", "Estoque", "Acao"];
  const rows = orders.map((order) => [
    <div key={`${order.id}-id`}>
      <p className="font-semibold text-ink-900">{order.orderNumber}</p>
      <p className="text-xs text-stone-500">{order.itemCount} itens</p>
    </div>,
    <p key={`${order.id}-customer`} className="text-sm text-stone-500">
      {order.customerName}
    </p>,
    <p key={`${order.id}-total`} className="font-semibold text-ink-900">
      {order.totalLabel}
    </p>,
    <OperationalStatusPill key={`${order.id}-status`} status={order.status} />,
    <PaymentStatusPill key={`${order.id}-payment`} status={order.paymentStatus} />,
    <OperationalStatusPill key={`${order.id}-fulfillment`} status={order.fulfillmentStatus} />,
    <p key={`${order.id}-inventory`} className="text-sm font-medium text-stone-500">
      {inventoryStateLabels[order.inventoryState]}
    </p>,
    detailsById.get(order.id) ? (
      <OrderDetailDrawer key={`${order.id}-action`} detail={detailsById.get(order.id)!} />
    ) : (
      <span key={`${order.id}-empty`} className="text-sm text-stone-500">
        Sem detalhe
      </span>
    )
  ]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="eyebrow">Pedidos</p>
        <h1 className="page-title">Fila comercial e logistica com leitura real de pedido, financeiro, fulfillment e reserva de estoque.</h1>
      </div>
      <FilterBar placeholder="Buscar por pedido ou cliente" primaryFilterLabel="Status do pedido" />

      <div className="hidden lg:block">
        <DataTable headers={headers} rows={rows} />
      </div>

      <div className="grid gap-4 lg:hidden">
        {orders.map((order) => {
          const detail = detailsById.get(order.id);

          return (
            <article key={order.id} className="surface-default space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink-900">{order.orderNumber}</p>
                  <p className="text-xs text-stone-500">{order.customerName}</p>
                </div>
                <PaymentStatusPill status={order.paymentStatus} />
              </div>
              <div className="flex flex-wrap gap-2">
                <OperationalStatusPill status={order.status} />
                <OperationalStatusPill status={order.fulfillmentStatus} />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">Total</span>
                  <span className="font-semibold text-ink-900">{order.totalLabel}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">Estoque</span>
                  <span className="font-medium text-ink-900">{inventoryStateLabels[order.inventoryState]}</span>
                </div>
              </div>
              {detail ? <OrderDetailDrawer detail={detail} /> : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
