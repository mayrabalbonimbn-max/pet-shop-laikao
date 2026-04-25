import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  HeartHandshake,
  Scissors,
  ShieldCheck,
  Sparkles,
  TimerReset,
  WashingMachine,
} from "lucide-react";

import { InlineNotice } from "@/components/feedback/inline-notice";
import { PracticalLinksGrid } from "@/components/marketing/practical-links-grid";
import { Button } from "@/components/ui/button";
import { publicRoutes } from "@/lib/routes";

const services = [
  {
    slug: "banho-e-tosa-premium",
    name: "Banho e tosa premium",
    description: "Banho completo com acabamento caprichado, tosa alinhada e uma experiencia pensada para deixar o pet bonito e o tutor seguro com o atendimento.",
    price: "A partir de R$ 110",
    duration: "75 a 90 min",
    icon: Sparkles,
    highlight: "Mais procurado da semana",
  },
  {
    slug: "banho-terapeutico",
    name: "Banho terapeutico",
    description: "Fluxo com foco em pele, conforto e produtos adequados para quem precisa de mais cuidado e explicacao clara antes de agendar.",
    price: "A partir de R$ 78",
    duration: "50 a 60 min",
    icon: ShieldCheck,
    highlight: "Ideal para pets sensiveis",
  },
  {
    slug: "tosa-higienica",
    name: "Tosa higienica",
    description: "Servico de manutencao agil, pratico e muito solicitado para manter a rotina do pet em dia sem complicar a agenda do tutor.",
    price: "A partir de R$ 65",
    duration: "35 a 45 min",
    icon: CalendarClock,
    highlight: "Agendamento rapido",
  },
];

const sellingPoints = [
  {
    title: "Visual mais vendedor",
    description: "Servico com mais personalidade, mais destaque comercial e CTA mais evidente.",
  },
  {
    title: "Preco e duracao visiveis",
    description: "O cliente entende rapido quanto custa e quanto tempo leva, sem cacar informacao.",
  },
  {
    title: "Cara de pet shop forte",
    description: "A linguagem da pagina fica mais proxima das artes promocionais da marca.",
  },
];

export default function ServicesPage() {
  return (
    <div className="content-container py-10 sm:py-14">
      <section className="grid gap-8 rounded-[32px] border border-brand-100 bg-linear-to-br from-brand-200 via-white to-[var(--magenta-100)] p-6 shadow-[var(--shadow-soft)] sm:p-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-brand-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
              Estetica animal
            </span>
            <span className="rounded-full bg-[var(--sun-100)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-900">
              Banho, tosa e cuidado
            </span>
          </div>
          <h1 className="page-title max-w-4xl">Banho, tosa, hidratacao, escovacao e manutencao com mais cara de pagina que vende servico.</h1>
          <p className="max-w-3xl text-base leading-7 text-stone-500">
            A pagina de servicos agora assume a energia comercial do Laikao sem ficar pesada: mais lilas, mais destaque e mais clareza para quem quer agendar no celular.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={publicRoutes.schedule} className="sm:min-w-[14rem]">
              <Button size="lg" fullWidth>
                Agendar agora
              </Button>
            </Link>
            <a href="https://wa.me/5511980512871" target="_blank" rel="noreferrer" className="sm:min-w-[14rem]">
              <Button variant="secondary" size="lg" fullWidth>
                Falar no WhatsApp
              </Button>
            </a>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
          {sellingPoints.map((point, index) => (
            <article key={point.title} className="rounded-[var(--radius-lg)] border border-white/80 bg-white/92 p-5 shadow-[var(--shadow-soft)]">
              <p className="text-sm font-semibold text-[var(--magenta-600)]">0{index + 1}</p>
              <h2 className="mt-2 font-heading text-xl font-semibold text-ink-900">{point.title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-500">{point.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <InlineNotice
          tone="info"
          title="Agendamento online e atendimento humano trabalham juntos"
          description="O cliente pode seguir sozinho pela agenda ou chamar no WhatsApp quando precisar de orientacao antes de fechar o horario."
        />
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.slug}
            className="surface-default flex h-full flex-col gap-5 border border-brand-100 bg-linear-to-br from-white via-brand-50/65 to-[var(--magenta-100)]/55 p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-[var(--shadow-elevated)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-13 w-13 items-center justify-center rounded-[18px] bg-white text-brand-700 shadow-[var(--shadow-soft)]">
                <service.icon className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-[var(--sun-100)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-900">
                {service.highlight}
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="font-heading text-2xl font-semibold text-ink-900">{service.name}</h2>
              <p className="text-sm leading-6 text-stone-500">{service.description}</p>
            </div>

            <div className="grid gap-3 rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-stone-500">Preco base</span>
                <span className="font-heading text-xl font-semibold text-[var(--magenta-600)]">{service.price}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-stone-500">
                  <TimerReset className="h-4 w-4 text-brand-500" />
                  Duracao media
                </span>
                <span className="font-semibold text-ink-900">{service.duration}</span>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              <Link href={`/servicos/${service.slug}`} className="sm:flex-1">
                <Button variant="secondary" fullWidth>
                  Ver detalhes
                </Button>
              </Link>
              <Link href={publicRoutes.schedule} className="sm:flex-1">
                <Button fullWidth>Agendar</Button>
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-4 xl:grid-cols-[1fr_1.1fr]">
        <article className="surface-default border border-brand-100 bg-linear-to-br from-white via-brand-50/70 to-[var(--sun-100)]/70 p-6 shadow-[var(--shadow-soft)]">
          <p className="eyebrow">Confianca e praticidade</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-ink-900">Uma pagina de servicos com mais pulso comercial e mais proximidade com a comunicacao real da marca.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-4">
              <p className="inline-flex items-center gap-2 font-semibold text-ink-900">
                <Scissors className="h-4 w-4 text-brand-700" />
                Como funciona
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-500">
                Escolha o servico, confira valor e duracao media e siga para um agendamento guiado com menos duvida.
              </p>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-4">
              <p className="inline-flex items-center gap-2 font-semibold text-ink-900">
                <HeartHandshake className="h-4 w-4 text-[var(--magenta-600)]" />
                Se precisar de ajuda
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-500">
                O WhatsApp continua como apoio rapido para porte, cuidado, preparacao do pet e duvidas antes do horario.
              </p>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-4">
              <p className="inline-flex items-center gap-2 font-semibold text-ink-900">
                <Sparkles className="h-4 w-4 text-brand-700" />
                Mais cara de pet shop
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-500">
                O visual ficou mais roxo, mais vivo e mais alinhado com a energia promocional das artes do Laikao.
              </p>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--sun-300)] bg-[var(--sun-100)]/75 p-4">
              <p className="inline-flex items-center gap-2 font-semibold text-brand-950">
                <WashingMachine className="h-4 w-4 text-brand-700" />
                Cuidado e rotina
              </p>
              <p className="mt-2 text-sm leading-6 text-brand-900/80">
                Banho, tosa, hidratacao, escovacao e manutencao aparecem de forma mais forte e mais comercial.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/5511980512871"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            Tirar duvidas antes de agendar
            <ArrowRight className="h-4 w-4" />
          </a>
        </article>

        <PracticalLinksGrid />
      </section>
    </div>
  );
}
