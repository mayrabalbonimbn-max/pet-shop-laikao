import { Clock3, Instagram, MapPinned, MessageCircle, Navigation, ShoppingBag } from "lucide-react";

import { PracticalLinksGrid } from "@/components/marketing/practical-links-grid";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  return (
    <div className="content-container py-10 sm:py-14">
      <section className="rounded-[32px] border border-brand-100 bg-linear-to-br from-brand-100/70 via-white to-[#fff4fb] p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">Contato</span>
              <span className="rounded-full bg-[var(--sun-100)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-900">Pratico e direto</span>
            </div>
            <h1 className="page-title">Tudo que a cliente precisa para agir em segundos.</h1>
            <p className="text-base leading-7 text-stone-600">WhatsApp, Instagram, endereco, horario e mapa com prioridade visual. Pagina enxuta, util e comercial.</p>

            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-[18px] border border-white/80 bg-white/92 p-4 shadow-[var(--shadow-soft)]"><MessageCircle className="h-5 w-5 text-success-500" /><p className="mt-2 text-sm text-stone-500">WhatsApp</p><p className="font-semibold text-ink-900">{siteConfig.whatsappNumber}</p></article>
              <article className="rounded-[18px] border border-white/80 bg-white/92 p-4 shadow-[var(--shadow-soft)]"><Instagram className="h-5 w-5 text-brand-600" /><p className="mt-2 text-sm text-stone-500">Instagram</p><p className="font-semibold text-ink-900">{siteConfig.instagramHandle}</p></article>
              <article className="rounded-[18px] border border-white/80 bg-white/92 p-4 shadow-[var(--shadow-soft)] sm:col-span-2"><MapPinned className="h-5 w-5 text-brand-600" /><p className="mt-2 text-sm text-stone-500">Endereco</p><p className="font-semibold text-ink-900">{siteConfig.address}</p></article>
            </div>
          </div>

          <div className="surface-default border border-white/80 bg-white/92 p-6 shadow-[var(--shadow-soft)]">
            <h2 className="font-heading text-2xl font-semibold text-ink-900">Atalhos rapidos</h2>
            <p className="mt-2 text-sm text-stone-600">Ideal para mobile: um toque e a cliente ja segue para o canal certo.</p>
            <div className="mt-5 grid gap-3">
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer"><Button size="lg" fullWidth><MessageCircle className="h-4 w-4" />Falar no WhatsApp</Button></a>
              <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer"><Button variant="secondary" size="lg" fullWidth><Instagram className="h-4 w-4" />Abrir Instagram</Button></a>
              <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer"><Button variant="secondary" size="lg" fullWidth><Navigation className="h-4 w-4" />Ver localizacao</Button></a>
              <div className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-dashed border-[var(--sun-300)] bg-[var(--sun-100)]/85 px-4 py-3 text-sm font-semibold text-brand-900"><ShoppingBag className="h-4 w-4" />iFood em breve</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <article className="surface-default border border-brand-100 bg-white p-6 shadow-[var(--shadow-soft)]">
          <h2 className="font-heading text-2xl font-semibold text-ink-900">Horario e visita</h2>
          <div className="mt-4 grid gap-3">
            <div className="rounded-[16px] border border-stone-100 p-4"><p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900"><Clock3 className="h-4 w-4 text-brand-600" />{siteConfig.hoursLabel}</p></div>
            <div className="rounded-[16px] border border-[var(--sun-300)] bg-[var(--sun-100)]/75 p-4"><p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-900"><MapPinned className="h-4 w-4 text-brand-600" />{siteConfig.address}</p></div>
          </div>
        </article>

        <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-[var(--shadow-soft)]">
          <div className="flex min-h-[19rem] flex-col items-center justify-center bg-linear-to-br from-brand-50 via-white to-[#fff5fb] p-8 text-center">
            <MapPinned className="h-9 w-9 text-brand-600" />
            <h2 className="mt-4 font-heading text-2xl font-semibold text-ink-900">Mapa e chegada rapida</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-stone-600">A cliente abre rota em um toque e chega sem friccao.</p>
            <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer" className="mt-5"><Button size="lg">Abrir no mapa</Button></a>
          </div>
        </div>
      </section>

      <section className="mt-10"><PracticalLinksGrid /></section>
    </div>
  );
}
