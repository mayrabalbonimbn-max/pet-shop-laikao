import { Clock3, Instagram, MapPinned, MessageCircle, Navigation, ShoppingBag } from "lucide-react";

import { PracticalLinksGrid } from "@/components/marketing/practical-links-grid";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  return (
    <div className="content-container py-10 sm:py-14">
      <section className="grid gap-8 rounded-[32px] border border-brand-100 bg-linear-to-br from-white via-brand-50/70 to-brand-100/70 p-6 shadow-[var(--shadow-soft)] sm:p-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <p className="eyebrow">Contato</p>
          <h1 className="page-title">Informacoes praticas visiveis para quem quer falar, chegar ou agendar sem perder tempo.</h1>
          <p className="max-w-3xl text-base leading-7 text-stone-500">
            Esta pagina foi organizada para ser direta no mobile e util de verdade: WhatsApp, Instagram, endereco, mapa e horarios aparecem antes de qualquer rodeio.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-5 shadow-[var(--shadow-soft)]">
              <MessageCircle className="h-5 w-5 text-success-500" />
              <p className="mt-3 text-sm text-stone-500">WhatsApp</p>
              <p className="mt-1 font-semibold text-ink-900">{siteConfig.whatsappNumber}</p>
            </article>
            <article className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-5 shadow-[var(--shadow-soft)]">
              <Instagram className="h-5 w-5 text-brand-600" />
              <p className="mt-3 text-sm text-stone-500">Instagram</p>
              <p className="mt-1 font-semibold text-ink-900">{siteConfig.instagramHandle}</p>
            </article>
            <article className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-5 shadow-[var(--shadow-soft)] sm:col-span-2">
              <MapPinned className="h-5 w-5 text-brand-600" />
              <p className="mt-3 text-sm text-stone-500">Endereco</p>
              <p className="mt-1 font-semibold text-ink-900">{siteConfig.address}</p>
            </article>
          </div>
        </div>

        <div className="surface-default border border-white/80 bg-white/90 p-6 shadow-[var(--shadow-soft)]">
          <h2 className="font-heading text-3xl font-semibold text-ink-900">Atalhos rapidos</h2>
          <p className="mt-3 text-sm leading-6 text-stone-500">
            Quem entrar aqui precisa conseguir agir em segundos, tanto no desktop quanto no celular.
          </p>

          <div className="mt-6 grid gap-3">
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
              <Button size="lg" fullWidth>
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </Button>
            </a>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
              <Button variant="secondary" size="lg" fullWidth>
                <Instagram className="h-4 w-4" />
                Abrir Instagram
              </Button>
            </a>
            <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer">
              <Button variant="secondary" size="lg" fullWidth>
                <Navigation className="h-4 w-4" />
                Ver localizacao
              </Button>
            </a>
            <div className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-dashed border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700">
              <ShoppingBag className="h-4 w-4" />
              iFood em breve
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_1.12fr]">
        <article className="surface-default border border-stone-100 bg-white p-6 shadow-[var(--shadow-soft)]">
          <h2 className="font-heading text-2xl font-semibold text-ink-900">Horario e localizacao</h2>
          <div className="mt-5 grid gap-4">
            <div className="rounded-[var(--radius-lg)] border border-stone-100 bg-sand-50 p-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900">
                <Clock3 className="h-4 w-4 text-brand-600" />
                Horario
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-500">{siteConfig.hoursLabel}</p>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-stone-100 bg-sand-50 p-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900">
                <MapPinned className="h-4 w-4 text-brand-600" />
                Endereco completo
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-500">{siteConfig.address}</p>
            </div>
          </div>
        </article>

        <div className="overflow-hidden rounded-[32px] border border-stone-100 bg-white shadow-[var(--shadow-soft)]">
          <div className="flex min-h-[22rem] flex-col items-center justify-center bg-linear-to-br from-brand-50 via-white to-brand-100/70 p-8 text-center">
            <MapPinned className="h-10 w-10 text-brand-600" />
            <h2 className="mt-4 font-heading text-3xl font-semibold text-ink-900">Mapa e chegada rapida</h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-stone-500">
              O link do mapa ja esta pronto para uso. Quando quiser, esta area pode virar embed real sem precisar redesenhar a pagina.
            </p>
            <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer" className="mt-6">
              <Button size="lg">Abrir no mapa</Button>
            </a>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <PracticalLinksGrid />
      </section>
    </div>
  );
}
