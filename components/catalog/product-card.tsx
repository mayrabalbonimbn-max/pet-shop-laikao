import Link from "next/link";

import { ProductPreview } from "@/domains/catalog/types";
import { StockStatusBadge } from "@/components/catalog/stock-status-badge";

export function ProductCard({ product }: { product: ProductPreview }) {
  return (
    <article className="surface-default group flex h-full flex-col overflow-hidden border border-stone-100 bg-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-elevated)]">
      <div className="flex h-48 items-center justify-center bg-linear-to-br from-brand-100 via-white to-brand-50 p-5 text-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-brand-600">{product.category}</p>
          <p className="mt-3 text-lg font-semibold text-ink-900">{product.imageLabel}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          {product.featured ? (
            <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
              Mais vendido
            </span>
          ) : null}
          <h3 className="font-heading text-lg font-semibold">{product.name}</h3>
          <p className="text-sm leading-6 text-stone-500">Escolha pensada para rotina, cuidado e praticidade no dia a dia.</p>
          <p className="font-heading text-2xl font-semibold text-brand-700">{product.priceLabel}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
          <StockStatusBadge status={product.stockStatus} />
          <Link
            href={`/produto/${product.slug}`}
            className="inline-flex h-10 items-center justify-center rounded-[var(--radius-md)] border border-brand-200 bg-white px-4 text-sm font-semibold text-ink-900 transition-colors group-hover:border-brand-300 group-hover:bg-brand-50 hover:border-brand-300 hover:bg-brand-50"
          >
            Ver produto
          </Link>
        </div>
      </div>
    </article>
  );
}
