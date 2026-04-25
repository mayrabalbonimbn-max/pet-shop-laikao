import Link from "next/link";
import { CalendarDays, ExternalLink, Instagram, MapPinned, MessageCircle, ShoppingBag } from "lucide-react";

import { siteConfig } from "@/config/site";

const practicalHighlights = [
  {
    label: "WhatsApp",
    value: siteConfig.whatsappNumber,
    icon: MessageCircle,
    href: siteConfig.whatsappUrl
  },
  {
    label: "Endereco",
    value: siteConfig.addressLine,
    icon: MapPinned,
    href: siteConfig.mapUrl
  },
  {
    label: "Instagram",
    value: siteConfig.instagramHandle,
    icon: Instagram,
    href: siteConfig.instagramUrl
  }
] as const;

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden border-b border-brand-100/80 bg-[linear-gradient(180deg,#fbf7ff_0%,#ffffff_58%,#fff8f2_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(141,57,244,0.14),_transparent_33%),radial-gradient(circle_at_bottom_left,_rgba(141,57,244,0.08),_transparent_35%)]" />
      <div className="content-container relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="space-y-6">
          <p className="eyebrow">Pet shop completo, confiavel e facil de chamar</p>
          <div className="space-y-4">
            <h1 className="font-heading text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Banho, tosa, contato rapido e agenda online em um site mais claro, mais util e mais comercial.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-stone-500 sm:text-lg">
              A marca continua roxa e memoravel, mas agora com muito mais leitura, informacao pratica visivel e atalhos
              rapidos para WhatsApp, Instagram, mapa, agendamento e a futura entrada do iFood.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:max-w-2xl">
            {practicalHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[var(--radius-lg)] border border-brand-100 bg-white px-4 py-4 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-brand-100 text-brand-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ExternalLink className="h-4 w-4 text-brand-500" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-ink-900">{item.label}</p>
                  <p className="mt-1 text-sm leading-6 text-stone-500">{item.value}</p>
                </a>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={siteConfig.quickLinks.schedule.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-brand-500 px-5 text-base font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Agendar agora
              <CalendarDays className="h-4 w-4" />
            </Link>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-brand-200 bg-white px-5 text-base font-semibold text-ink-900 transition-colors hover:bg-brand-50"
            >
              Falar no WhatsApp
              <MessageCircle className="h-4 w-4 text-brand-600" />
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="surface-muted p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-brand-700">Informacoes praticas em destaque</p>
                <p className="mt-1 text-sm leading-6 text-stone-500">
                  Mais clareza para quem quer chamar, ver onde fica e decidir rapido.
                </p>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
                Mobile forte
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[var(--radius-md)] border border-brand-100 bg-brand-50/70 p-4">
                <p className="text-2xl font-semibold text-ink-900">50%</p>
                <p className="mt-1 text-sm leading-6 text-stone-500">Reserva com sinal visivel e saldo pendente claro no admin.</p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-brand-100 bg-white p-4">
                <p className="text-2xl font-semibold text-ink-900">3 visoes</p>
                <p className="mt-1 text-sm leading-6 text-stone-500">Calendario mensal, semanal e diario pensado para touch.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-brand-100 bg-white p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-ink-900">Atalhos de alta intencao</span>
              <span className="text-brand-600">Prontos para trocar depois</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link
                href={siteConfig.quickLinks.schedule.href}
                className="flex items-center justify-between rounded-[var(--radius-md)] border border-stone-100 bg-white px-4 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-200 hover:bg-brand-50"
              >
                Agendamento
                <CalendarDays className="h-4 w-4 text-brand-600" />
              </Link>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-[var(--radius-md)] border border-stone-100 bg-white px-4 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-200 hover:bg-brand-50"
              >
                Instagram
                <Instagram className="h-4 w-4 text-brand-600" />
              </a>
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-[var(--radius-md)] border border-stone-100 bg-white px-4 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-200 hover:bg-brand-50"
              >
                Como chegar
                <MapPinned className="h-4 w-4 text-brand-600" />
              </a>
              <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-dashed border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700">
                iFood em breve
                <ShoppingBag className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
