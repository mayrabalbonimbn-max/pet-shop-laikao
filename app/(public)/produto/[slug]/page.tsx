import { notFound } from "next/navigation";
import { Instagram, MapPinned, ShieldCheck, ShoppingBag } from "lucide-react";

import { InlineNotice } from "@/components/feedback/inline-notice";
import { PracticalLinksGrid } from "@/components/marketing/practical-links-grid";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getCatalogProductDetail } from "@/domains/catalog/queries";
import { ProductPurchasePanel } from "@/components/catalog/product-purchase-panel";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params
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
            <div className="surface-default flex min-h-[28rem] items-center justify-center rounded-[32px] border border-brand-100 bg-linear-to-br from-white via-brand-50/70 to-brand-100/70 p-10 text-center shadow-[var(--shadow-soft)]">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-600">{product.categoryName ?? "Catalogo"}</p>
                <h1 className="mt-4 font-heading text-4xl font-semibold text-ink-900">{product.imageLabel}</h1>
                <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-stone-500">{product.description}</p>
              </div>
            </div>

            <div className="grid gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex min-h-[8.5rem] items-center justify-center rounded-[24px] border border-stone-100 bg-white text-center shadow-[var(--shadow-soft)]"
                >
                  <p className="text-sm font-semibold text-stone-500">Foto {item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
            <article className="surface-default border border-stone-100 bg-white p-6 shadow-[var(--shadow-soft)]">
              <h2 className="font-heading text-2xl font-semibold text-ink-900">Por que esse produto vende melhor agora</h2>
              <div className="mt-5 grid gap-3">
                {product.variants.map((variant) => (
                  <div key={variant.id} className="rounded-[var(--radius-lg)] border border-stone-100 bg-sand-50 p-4">
                    <p className="font-semibold text-ink-900">{variant.title}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-500">
                      SKU {variant.sku} • {variant.availableQuantity > 0 ? `${variant.availableQuantity} unidade(s) disponiveis` : "Sem estoque no momento"}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface-default border border-stone-100 bg-white p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-2 text-brand-700">
                <ShieldCheck className="h-5 w-5" />
                <p className="font-semibold">Confianca e atendimento rapido</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-500">
                Se o cliente quiser confirmar uso, tamanho ou rotina ideal, o suporte da loja continua facil de acionar sem quebrar o funil.
              </p>
              <div className="mt-5 grid gap-3">
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
            description="Preco, estoque e variantes ja saem da camada persistida do catalogo, enquanto a compra continua validada no servidor."
          />
        </section>

        <aside className="space-y-6">
          <ProductPurchasePanel product={product} />

          <article className="surface-default border border-stone-100 bg-white p-6 shadow-[var(--shadow-soft)]">
            <h2 className="font-heading text-xl font-semibold text-ink-900">Atalhos praticos</h2>
            <div className="mt-4 grid gap-3">
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-stone-100 bg-sand-50 px-4 py-3 text-sm font-semibold text-ink-900"
              >
                <MapPinned className="h-4 w-4 text-brand-600" />
                Ver localizacao
              </a>
              <div className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-dashed border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700">
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
