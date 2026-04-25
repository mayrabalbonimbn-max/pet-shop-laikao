"use client";

import { CircleDollarSign, ExternalLink, PackageCheck, ScrollText, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { OperationalStatusPill } from "@/components/status/operational-status-pill";
import { PaymentStatusPill } from "@/components/status/payment-status-pill";
import { inventoryStateLabels } from "@/domains/orders/constants";
import { OrderDetailView } from "@/domains/orders/types";
import { paymentMethodLabels, paymentPurposeLabels } from "@/domains/payments/constants";
import { formatCurrency } from "@/lib/formatters";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC"
  }).format(new Date(value));
}

function getVisibleActions(detail: OrderDetailView) {
  const actions: string[] = [];

  if (detail.order.paymentStatus !== "paid" && detail.order.status !== "cancelled" && detail.order.status !== "delivered") {
    actions.push("Gerar cobranca");
  }

  if (detail.order.status === "paid") {
    actions.push("Iniciar separacao");
  }

  if (detail.order.status === "processing") {
    actions.push("Marcar pronto");
    actions.push("Marcar enviado");
  }

  if (detail.order.status === "ready_for_pickup" || detail.order.status === "shipped") {
    actions.push("Marcar entregue");
  }

  if (detail.order.status !== "cancelled" && detail.order.status !== "delivered") {
    actions.push("Cancelar");
  }

  return actions;
}

export function OrderDetailDrawer({ detail }: { detail: OrderDetailView }) {
  const visibleActions = getVisibleActions(detail);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm">
          Ver detalhe
        </Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="eyebrow">Detalhe do pedido</p>
            <h3 className="font-heading text-2xl font-semibold">{detail.order.orderNumber}</h3>
            <p className="text-sm text-stone-500">{detail.order.customerName}</p>
          </div>

          <div className="space-y-3 rounded-[var(--radius-lg)] bg-brand-50 p-4">
            <div className="flex flex-wrap gap-3">
              <OperationalStatusPill status={detail.order.status} />
              <PaymentStatusPill status={detail.order.paymentStatus} />
              <OperationalStatusPill status={detail.order.fulfillmentStatus} />
            </div>
            <div className="grid gap-2 text-sm sm:grid-cols-2">
              <div className="flex justify-between gap-3 rounded-[var(--radius-md)] bg-white/80 p-3">
                <span className="text-stone-500">Total</span>
                <span className="font-semibold text-ink-900">{formatCurrency(detail.order.totalCents / 100)}</span>
              </div>
              <div className="flex justify-between gap-3 rounded-[var(--radius-md)] bg-white/80 p-3">
                <span className="text-stone-500">Estoque</span>
                <span className="font-semibold text-ink-900">{inventoryStateLabels[detail.order.inventoryState]}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <PackageCheck className="h-4 w-4 text-brand-700" />
              <p className="text-sm font-semibold text-ink-900">Itens do pedido</p>
            </div>
            <div className="space-y-3">
              {detail.items.map((item) => (
                <div key={item.id} className="rounded-[var(--radius-md)] border border-stone-100 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{item.productName}</p>
                      <p className="text-xs text-stone-500">
                        {item.variantName} • SKU {item.sku}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-ink-900">{formatCurrency(item.lineTotalCents / 100)}</span>
                  </div>
                  <p className="mt-2 text-xs text-stone-500">{item.quantity} unidade(s)</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 text-brand-700" />
              <p className="text-sm font-semibold text-ink-900">Pagamentos vinculados</p>
            </div>
            {detail.payments.length > 0 ? (
              <div className="space-y-3">
                {detail.payments.map((payment) => (
                  <div key={payment.id} className="rounded-[var(--radius-md)] border border-stone-100 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-ink-900">{paymentPurposeLabels[payment.purpose]}</p>
                        <p className="text-xs text-stone-500">
                          {paymentMethodLabels[payment.method]} • {payment.amountLabel}
                        </p>
                      </div>
                      <PaymentStatusPill status={payment.status} />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-stone-500">
                      <span>Criado em {formatDateTime(payment.createdAt)}</span>
                      {payment.paidAt ? <span>Pago em {formatDateTime(payment.paidAt)}</span> : null}
                    </div>
                    {payment.checkoutUrl ? (
                      <a
                        href={payment.checkoutUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
                      >
                        Abrir checkout da InfinitePay
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-500">Nenhum pagamento vinculado a este pedido ainda.</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ScrollText className="h-4 w-4 text-brand-700" />
              <p className="text-sm font-semibold text-ink-900">Timeline basica</p>
            </div>
            <div className="space-y-3">
              {detail.timeline.map((entry) => (
                <div key={entry.id} className="rounded-[var(--radius-md)] border border-stone-100 p-4">
                  <p className="text-sm font-semibold text-ink-900">{entry.label}</p>
                  <p className="mt-1 text-sm text-stone-500">{entry.description}</p>
                  <p className="mt-2 text-xs text-stone-500">{formatDateTime(entry.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-brand-700" />
              <p className="text-sm font-semibold text-ink-900">Acoes da etapa</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {visibleActions.map((action) => (
                <Button key={action} variant="secondary" fullWidth>
                  {action}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
