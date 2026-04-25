import { notFound } from "next/navigation";
import { BadgePercent, Instagram, MapPinned, ShieldCheck, ShoppingBag, Truck } from "lucide-react";

import { ProductPurchasePanel } from "@/components/catalog/product-purchase-panel";
import { InlineNotice } from "@/components/feedback/inline-notice";
import { PracticalLinksGrid } from "@/components/marketing/practical-links-grid";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getCatalogProductDetail } from "@/domains/catalog/queries";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getCatalogProductDetail(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="content-container py-10 sm:py-14">
      <div className="grid gap-8 xl:grid-cols-[1fr_0.82fr]">
        <section className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_0.24fr]">
            <div className="surface-default flex min-h-[28rem] items-center justify-center rounded-[32px] border border-brand-100 bg-linear-to-br from-brand-200 via-white to-[var(--magenta-100)] p-10 text-center shadow-[var(--shadow-soft)]">
              <div>
                <div className="flex justify-center gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
                    {product.categoryName ?? "Catalogo"}
                  </span>
                  <span className="rounded-full bg-[var(--sun-100)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-900">
                    Destaque da loja
                  </span>
                </div>
                <h1 className="mt-4 font-heading text-4xl font-semibold text-ink-900">{product.imageLabel}</h1>
                <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-stone-500">{product.description}</p>
              </div>
            </div>

            <div className="grid gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex min-h-[8.5rem] items-center justify-center rounded-[24px] border border-brand-100 bg-linear-to-br from-white via-brand-50/80 to-[var(--magenta-100)]/55 text-center shadow-[var(--shadow-soft)]"
                >
                  <p className="text-sm font-semibold text-stone-500">Foto {item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
            <article className="surface-default border border-brand-100 bg-linear-to-br from-white via-brand-50/65 to-[var(--magenta-100)]/45 p-6 shadow-[var(--shadow-soft)]">
              <h2 className="font-heading text-2xl font-semibold text-ink-900">Preco, estoque, variantes e compra com mais personalidade comercial.</h2>
              <div className="mt-5 grid gap-3">
                {product.variants.map((variant) => (
                  <div key={variant.id} className="rounded-[var(--radius-lg)] border border-white/80 bg-white/92 p-4">
                    <p className="font-semibold text-ink-900">{variant.title}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-500">
                      SKU {variant.sku} • {variant.availableQuantity > 0 ? `${variant.availableQuantity} unidade(s) disponiveis` : "Sem estoque no momento"}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface-default border border-brand-100 bg-white p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-2 text-brand-700">
                <ShieldCheck className="h-5 w-5" />
                <p className="font-semibold">Confianca e atendimento rapido</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-500">
                Se o cliente quiser confirmar uso, tamanho, rotina ou entrega, o suporte continua facil de acionar sem quebrar o funil.
              </p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-[18px] border border-[var(--sun-300)] bg-[var(--sun-100)]/80 p-4">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-950">
                    <BadgePercent className="h-4 w-4 text-[var(--magenta-600)]" />
                    Produto com cara de promocao organizada
                  </p>
                </div>
                <div className="rounded-[18px] border border-brand-100 bg-brand-50/75 p-4">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-900">
                    <Truck className="h-4 w-4 text-brand-700" />
                    Entrega, retirada e apoio rapido
                  </p>
                </div>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  <Instagram className="h-4 w-4" />
                  Ver Instagram
                </a>
              </div>
            </article>
          </div>

          <InlineNotice
            tone="success"
            title="Pagina conectada ao produto real"
            description="Preco, estoque e variantes saem da camada persistida do catalogo, enquanto a compra continua validada no servidor."
          />
        </section>

        <aside className="space-y-6">
          <ProductPurchasePanel product={product} />

          <article className="surface-default border border-brand-100 bg-white p-6 shadow-[var(--shadow-soft)]">
            <h2 className="font-heading text-xl font-semibold text-ink-900">Atalhos praticos</h2>
            <div className="mt-4 grid gap-3">
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-brand-100 bg-brand-50/70 px-4 py-3 text-sm font-semibold text-ink-900"
              >
                <MapPinned className="h-4 w-4 text-brand-600" />
                Ver localizacao
              </a>
              <div className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-dashed border-[var(--sun-300)] bg-[var(--sun-100)]/85 px-4 py-3 text-sm font-semibold text-brand-900">
                <ShoppingBag className="h-4 w-4" />
                iFood em breve
              </div>
            </div>
          </article>
        </aside>
      </div>

      <section className="mt-10">
        <PracticalLinksGrid />
      </section>
    </div>
  );
}
