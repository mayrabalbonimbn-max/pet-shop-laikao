import Link from "next/link";

import { ProductPreview } from "@/domains/catalog/types";
import { StockStatusBadge } from "@/components/catalog/stock-status-badge";

export function ProductCard({ product }: { product: ProductPreview }) {
  return (
    <article className="surface-default group flex h-full flex-col overflow-hidden border border-brand-100/70 bg-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-[var(--shadow-elevated)]">
      <div className="relative flex h-44 items-center justify-center bg-[linear-gradient(135deg,#fffaff_0%,#f7ecff_58%,#fff4fb_100%)] p-5 text-center">
        <div className="absolute left-4 top-4 flex gap-2">
          {product.featured ? <span className="inline-flex rounded-full bg-[var(--magenta-100)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--magenta-600)]">Mais vendido</span> : null}
          {product.stockStatus === "low_stock" ? <span className="inline-flex rounded-full bg-[var(--sun-100)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900">Ultimas unidades</span> : null}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-600">{product.category}</p>
          <p className="mt-3 text-lg font-semibold text-ink-900">{product.imageLabel}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="font-heading text-lg font-semibold text-ink-900">{product.name}</h3>
          <p className="text-sm text-stone-600">Produto pronto para compra rapida com entrega, retirada e suporte.</p>
          <div className="flex items-end justify-between gap-3">
            <p className="font-heading text-2xl font-semibold text-brand-700">{product.priceLabel}</p>
            <StockStatusBadge status={product.stockStatus} />
          </div>
        </div>

        <div className="mt-auto grid gap-2 border-t border-brand-100/70 pt-4 sm:grid-cols-2">
          <Link href={`/produto/${product.slug}`} className="inline-flex h-10 items-center justify-center rounded-[var(--radius-md)] border border-brand-200 bg-white px-4 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:bg-brand-50">Ver produto</Link>
          <Link href={`/produto/${product.slug}`} className="inline-flex h-10 items-center justify-center rounded-[var(--radius-md)] bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700">Comprar</Link>
        </div>
      </div>
    </article>
  );
}
