import { notFound } from "next/navigation";
import { BadgePercent, CheckCircle2, Clock3, Instagram, MapPinned, MessageCircle, ShieldCheck, ShoppingBag, Truck } from "lucide-react";

import { ProductPurchasePanel } from "@/components/catalog/product-purchase-panel";
import { PracticalLinksGrid } from "@/components/marketing/practical-links-grid";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getCatalogProductDetail } from "@/domains/catalog/queries";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getCatalogProductDetail(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="content-container py-10 sm:py-14">
      <div className="grid gap-8 xl:grid-cols-[1fr_0.86fr]">
        <section className="space-y-6">
          <div className="rounded-[32px] border border-brand-100 bg-linear-to-br from-brand-100/70 via-white to-[#fff5fb] p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">{product.categoryName ?? "Catalogo"}</span>
              <span className="rounded-full bg-[var(--sun-100)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-900">Produto da loja</span>
            </div>
            <h1 className="mt-4 font-heading text-3xl font-semibold text-ink-900 sm:text-4xl">{product.name}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-stone-600">{product.description}</p>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.34fr]">
              <div className="flex min-h-[18rem] items-center justify-center rounded-[24px] border border-white/80 bg-white p-6 text-center shadow-[var(--shadow-soft)]"><p className="text-lg font-semibold text-ink-900">{product.imageLabel}</p></div>
              <div className="grid gap-3">{[1, 2, 3].map((item) => <div key={item} className="flex min-h-[5.2rem] items-center justify-center rounded-[18px] border border-brand-100 bg-brand-50/60 text-sm font-semibold text-stone-600">Miniatura {item}</div>)}</div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.94fr]">
            <article className="surface-default border border-brand-100 bg-white p-6 shadow-[var(--shadow-soft)]">
              <h2 className="font-heading text-2xl font-semibold text-ink-900">Variantes, estoque e disponibilidade</h2>
              <div className="mt-4 grid gap-3">
                {product.variants.map((variant) => (
                  <div key={variant.id} className="rounded-[18px] border border-stone-100 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-ink-900">{variant.title}</p>
                      <p className="font-semibold text-brand-700">R$ {(variant.priceCents / 100).toFixed(2).replace(".", ",")}</p>
                    </div>
                    <p className="mt-1 text-sm text-stone-600">SKU {variant.sku}</p>
                    <p className="mt-1 text-sm text-stone-600">{variant.availableQuantity > 0 ? `${variant.availableQuantity} unidade(s) disponiveis` : "Sem estoque no momento"}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface-default border border-brand-100 bg-white p-6 shadow-[var(--shadow-soft)]">
              <h2 className="font-heading text-xl font-semibold text-ink-900">Compra com confianca</h2>
              <div className="mt-4 grid gap-3">
                <div className="rounded-[16px] border border-stone-100 p-3"><p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900"><ShieldCheck className="h-4 w-4 text-brand-700" />Estoque real do backend</p></div>
                <div className="rounded-[16px] border border-stone-100 p-3"><p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900"><Truck className="h-4 w-4 text-brand-700" />Entrega e retirada</p></div>
                <div className="rounded-[16px] border border-[var(--sun-300)] bg-[var(--sun-100)]/75 p-3"><p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-900"><BadgePercent className="h-4 w-4 text-[var(--magenta-600)]" />Campanhas e ofertas organizadas</p></div>
              </div>

              <div className="mt-5 grid gap-2">
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer"><Button variant="success" size="lg" fullWidth><MessageCircle className="h-4 w-4" />Tirar duvidas no WhatsApp</Button></a>
                <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer"><Button variant="secondary" size="lg" fullWidth><Instagram className="h-4 w-4" />Ver Instagram</Button></a>
              </div>
            </article>
          </div>

          <article className="surface-default border border-brand-100 bg-white p-5 shadow-[var(--shadow-soft)]">
            <h2 className="font-heading text-xl font-semibold text-ink-900">Atendimento e retirada</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-[14px] border border-stone-100 p-3"><p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900"><Clock3 className="h-4 w-4 text-brand-700" />{siteConfig.hoursLabel}</p></div>
              <div className="rounded-[14px] border border-stone-100 p-3"><p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900"><MapPinned className="h-4 w-4 text-brand-700" />{siteConfig.addressLine}</p></div>
              <div className="rounded-[14px] border border-stone-100 p-3"><p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900"><ShoppingBag className="h-4 w-4 text-brand-700" />iFood em breve</p></div>
              <div className="rounded-[14px] border border-stone-100 p-3"><p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900"><CheckCircle2 className="h-4 w-4 text-success-500" />Compra assistida</p></div>
            </div>
          </article>
        </section>

        <aside className="space-y-6">
          <ProductPurchasePanel product={product} />
          <article className="surface-default border border-brand-100 bg-white p-6 shadow-[var(--shadow-soft)]">
            <h2 className="font-heading text-xl font-semibold text-ink-900">Atalhos praticos</h2>
            <div className="mt-4 grid gap-3">
              <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-brand-100 bg-brand-50/70 px-4 py-3 text-sm font-semibold text-ink-900"><MapPinned className="h-4 w-4 text-brand-600" />Ver localizacao</a>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-stone-100 bg-white px-4 py-3 text-sm font-semibold text-ink-900"><MessageCircle className="h-4 w-4 text-success-500" />WhatsApp direto</a>
            </div>
          </article>
        </aside>
      </div>

      <section className="mt-10"><PracticalLinksGrid /></section>
    </div>
  );
}
