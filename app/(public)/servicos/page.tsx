import Link from "next/link";
import { ArrowRight, CalendarClock, ShieldCheck, Sparkles, Stethoscope, TimerReset } from "lucide-react";

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
    highlight: "Mais procurado da semana"
  },
  {
    slug: "banho-terapeutico",
    name: "Banho terapeutico",
    description: "Fluxo com foco em pele, conforto e produtos adequados para quem precisa de mais cuidado e explicacao clara antes de agendar.",
    price: "A partir de R$ 78",
    duration: "50 a 60 min",
    icon: ShieldCheck,
    highlight: "Ideal para pets sensiveis"
  },
  {
    slug: "tosa-higienica",
    name: "Tosa higienica",
    description: "Servico de manutencao agil, pratico e muito solicitado para manter a rotina do pet em dia sem complicar a agenda do tutor.",
    price: "A partir de R$ 65",
    duration: "35 a 45 min",
    icon: CalendarClock,
    highlight: "Agendamento rapido"
  }
];

const sellingPoints = [
  {
    title: "Preco claro",
    description: "Faixa de valor visivel ja no card, sem obrigar o cliente a procurar informacao escondida."
  },
  {
    title: "Duracao explicada",
    description: "Tempo medio por atendimento para reduzir inseguranca e ajudar na decisao no celular."
  },
  {
    title: "CTA direto",
    description: "Cada servico empurra o cliente para o agendamento ou para o WhatsApp sem ruido."
  }
];

export default function ServicesPage() {
  return (
    <div className="content-container py-10 sm:py-14">
      <section className="grid gap-8 rounded-[32px] border border-brand-100 bg-linear-to-br from-white via-brand-50/70 to-brand-100/70 p-6 shadow-[var(--shadow-soft)] sm:p-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <p className="eyebrow">Servicos</p>
          <h1 className="page-title max-w-4xl">Servicos claros, bem explicados e prontos para vender melhor no celular.</h1>
          <p className="max-w-3xl text-base leading-7 text-stone-500">
            A pagina agora trabalha como vitrine comercial de verdade: mostra preco, duracao, contexto e empurra
            para a agenda com muito menos duvida.
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
            <article key={point.title} className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-5 shadow-[var(--shadow-soft)]">
              <p className="text-sm font-semibold text-brand-700">0{index + 1}</p>
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
            className="surface-default flex h-full flex-col gap-5 border border-stone-100 bg-white p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-elevated)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-13 w-13 items-center justify-center rounded-[18px] bg-brand-100 text-brand-700">
                <service.icon className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
                {service.highlight}
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="font-heading text-2xl font-semibold text-ink-900">{service.name}</h2>
              <p className="text-sm leading-6 text-stone-500">{service.description}</p>
            </div>

            <div className="grid gap-3 rounded-[var(--radius-lg)] border border-stone-100 bg-sand-50 p-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-stone-500">Preco base</span>
                <span className="font-heading text-xl font-semibold text-brand-700">{service.price}</span>
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
                <Button fullWidth>
                  Agendar
                </Button>
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-4 xl:grid-cols-[1fr_1.1fr]">
        <article className="surface-default border border-stone-100 bg-white p-6 shadow-[var(--shadow-soft)]">
          <p className="eyebrow">Confianca e praticidade</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-ink-900">Uma pagina de servicos que vende melhor porque responde o que importa.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[var(--radius-lg)] border border-stone-100 bg-sand-50 p-4">
              <p className="font-semibold text-ink-900">Como funciona</p>
              <p className="mt-2 text-sm leading-6 text-stone-500">
                Escolha o servico, confira o valor base, veja a duracao media e siga para um agendamento guiado.
              </p>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-stone-100 bg-sand-50 p-4">
              <p className="font-semibold text-ink-900">Se precisar de ajuda</p>
              <p className="mt-2 text-sm leading-6 text-stone-500">
                O WhatsApp continua como apoio rapido para tirar duvidas sobre porte, cuidado e preparacao do pet.
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
