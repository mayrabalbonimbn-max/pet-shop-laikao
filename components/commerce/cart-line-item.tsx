"use client";

import { AlertCircle, Loader2, Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StockStatusBadge } from "@/components/catalog/stock-status-badge";
import { StockStatus } from "@/domains/catalog/types";

export function CartLineItem({
  name,
  price,
  total,
  category = "Produto",
  quantity = 1,
  stockStatus = "in_stock",
  imageLabel = "Produto",
  status,
  onDecrease,
  onIncrease,
  onRemove,
  pending = false
}: {
  name: string;
  price: string;
  total: string;
  category?: string;
  quantity?: number;
  stockStatus?: StockStatus;
  imageLabel?: string;
  status?: string;
  onDecrease?: () => void;
  onIncrease?: () => void;
  onRemove?: () => void;
  pending?: boolean;
}) {
  return (
    <article className="surface-default flex flex-col gap-5 border border-stone-100 bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-linear-to-br from-brand-100 via-white to-brand-50 text-center text-sm font-semibold text-brand-700">
          {imageLabel}
        </div>
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
                {category}
              </span>
              <StockStatusBadge status={stockStatus} />
            </div>
            <h3 className="font-heading text-xl font-semibold text-ink-900">{name}</h3>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm text-stone-500">Preco unitario</p>
                <p className="font-heading text-2xl font-semibold text-brand-700">{price}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-stone-500">Total do item</p>
                <p className="font-semibold text-ink-900">{total}</p>
              </div>
            </div>
          </div>

          {status ? (
            <div className="rounded-[var(--radius-md)] border border-warning-500/15 bg-warning-500/5 px-4 py-3 text-sm text-warning-500">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="font-medium">{status}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-stone-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="icon" onClick={onDecrease} disabled={pending || quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <div className="inline-flex h-11 min-w-14 items-center justify-center rounded-[var(--radius-md)] border border-stone-100 bg-sand-50 px-4 text-sm font-semibold text-ink-900">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : quantity}
          </div>
          <Button variant="secondary" size="icon" onClick={onIncrease} disabled={pending}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onRemove}
            disabled={pending}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-error-500 disabled:pointer-events-none disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" />
            Remover
          </button>
        </div>
      </div>
    </article>
  );
}
