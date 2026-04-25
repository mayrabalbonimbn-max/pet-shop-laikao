import Link from "next/link";
import { CalendarDays, Dog, ExternalLink, Instagram, MapPinned, MessageCircle, Scissors, ShoppingBag, Sparkles, Truck } from "lucide-react";

import { siteConfig } from "@/config/site";

const quickPromos = [
  "Banho, tosa e hidratação",
  "Produtos e entrega rápida",
  "Ração a granel em destaque"
];

const practicalHighlights = [
  {
    label: "WhatsApp",
    value: siteConfig.whatsappNumber,
    icon: MessageCircle,
    href: siteConfig.whatsappUrl,
    accent: "bg-success-500/10 text-success-500 border-success-500/25"
  },
  {
    label: "Endereço",
    value: siteConfig.addressLine,
    icon: MapPinned,
    href: siteConfig.mapUrl,
    accent: "bg-brand-100 text-brand-700 border-brand-200"
  },
  {
    label: "Instagram",
    value: siteConfig.instagramHandle,
    icon: Instagram,
    href: siteConfig.instagramUrl,
    accent: "bg-[var(--magenta-100)] text-[var(--magenta-600)] border-[var(--magenta-300)]"
  }
] as const;

const primaryPaths = [
  {
    title: "Estética animal",
    description: "Banho, tosa, hidratação, escovação e corte de unhas com chamada forte para agenda.",
    href: siteConfig.quickLinks.schedule.href,
    cta: "Agendar agora",
    icon: Scissors,
    badge: "Banho & tosa"
  },
  {
    title: "Produtos, entrega e iFood",
    description: "Loja com ração, acessórios, compra rápida, retirada no local e espaço pronto para o iFood.",
    href: "/produtos",
    cta: "Comprar produtos",
    icon: ShoppingBag,
    badge: "Entrega / retirada"
  }
] as const;

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden border-b border-brand-100/70 bg-[linear-gradient(180deg,#fef8ff_0%,#f5e8ff_42%,#fff1f8_72%,#fff9dd_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(159,56,246,0.24),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(239,79,179,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(255,190,27,0.16),_transparent_26%)]" />

      <div className="content-container relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {quickPromos.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-brand-200/80 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="space-y-4">
            <p className="eyebrow">Pet shop forte de bairro, com cara profissional</p>
            <h1 className="font-heading text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Um site mais roxo, mais vivo e mais vendedor para quem cuida do pet e também compra com praticidade.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-stone-500 sm:text-lg">
              A energia das artes da marca agora virou linguagem de produto: estética animal em destaque, produtos,
              ração a granel, entrega, retirada, WhatsApp rápido, agenda e espaço forte para campanhas promocionais.
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
                  className="rounded-[var(--radius-lg)] border border-brand-100/80 bg-white/80 px-4 py-4 shadow-[var(--shadow-soft)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-[16px] border ${item.accent}`}>
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
              Agendar banho ou tosa
              <CalendarDays className="h-4 w-4" />
            </Link>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--magenta-300)] bg-white px-5 text-base font-semibold text-[var(--magenta-600)] transition-colors hover:bg-[var(--magenta-100)]"
            >
              Chamar no WhatsApp
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[28px] border border-brand-100/80 bg-white/78 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-brand-700">Dois caminhos de alta intenção</p>
                <p className="mt-1 text-sm leading-6 text-stone-500">
                  Serviços e compras aparecem separados, mas igualmente fortes, como nas artes promocionais.
                </p>
              </div>
              <span className="rounded-full bg-[var(--sun-100)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink-900">
                Promo forte
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {primaryPaths.map((path) => (
                <Link
                  key={path.title}
                  href={path.href}
                  className="group rounded-[22px] border border-brand-100/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(245,233,255,0.86))] p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-brand-500 text-white shadow-[var(--shadow-soft)]">
                      <path.icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-[var(--magenta-100)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--magenta-600)]">
                      {path.badge}
                    </span>
                  </div>
                  <h2 className="mt-4 font-heading text-2xl font-semibold text-ink-900">{path.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-stone-500">{path.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                    {path.cta}
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-brand-100/80 bg-white/80 p-4 shadow-[var(--shadow-soft)]">
              <Dog className="h-5 w-5 text-brand-700" />
              <p className="mt-3 text-sm font-semibold text-ink-900">Seu pet merece o melhor</p>
              <p className="mt-1 text-sm leading-6 text-stone-500">Cuidado, carinho e acabamento bonito no atendimento.</p>
            </div>
            <div className="rounded-[24px] border border-[var(--magenta-300)] bg-[var(--magenta-100)]/60 p-4 shadow-[var(--shadow-soft)]">
              <Sparkles className="h-5 w-5 text-[var(--magenta-600)]" />
              <p className="mt-3 text-sm font-semibold text-ink-900">Banho e tosa em evidência</p>
              <p className="mt-1 text-sm leading-6 text-stone-500">Hidratação, escovação e unhas com linguagem mais comercial.</p>
            </div>
            <div className="rounded-[24px] border border-[var(--sun-300)] bg-[var(--sun-100)]/70 p-4 shadow-[var(--shadow-soft)]">
              <Truck className="h-5 w-5 text-ink-900" />
              <p className="mt-3 text-sm font-semibold text-ink-900">Entrega ou retirada</p>
              <p className="mt-1 text-sm leading-6 text-stone-500">Compre no site, receba em casa ou retire na loja.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
