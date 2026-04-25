import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock3, MessageCircle, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";

import { InlineNotice } from "@/components/feedback/inline-notice";
import { PracticalLinksGrid } from "@/components/marketing/practical-links-grid";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { publicRoutes } from "@/lib/routes";

const serviceMap = {
  "banho-e-tosa-premium": {
    title: "Banho e tosa premium",
    price: "A partir de R$ 110",
    duration: "75 a 90 min",
    icon: Sparkles,
    audience: "Ideal para quem quer banho completo com acabamento forte e aparencia impecavel.",
    description:
      "Servico pensado para transmitir cuidado, capricho e organizacao. A pagina deixa claro o valor base, a duracao media e o caminho de agendamento sem friccao.",
    highlights: ["Acabamento premium", "Fluxo de agenda online", "Atendimento com apoio por WhatsApp"]
  },
  "banho-terapeutico": {
    title: "Banho terapeutico",
    price: "A partir de R$ 78",
    duration: "50 a 60 min",
    icon: ShieldCheck,
    audience: "Indicado para pets que pedem mais delicadeza e explicacao no atendimento.",
    description:
      "Estrutura comercial preparada para explicar beneficios, reduzir inseguranca do tutor e facilitar a decisao de quem quer cuidado mais especifico.",
    highlights: ["Cuidado com pele e conforto", "Explicacao clara do servico", "Agenda simples e confiavel"]
  },
  "tosa-higienica": {
    title: "Tosa higienica",
    price: "A partir de R$ 65",
    duration: "35 a 45 min",
    icon: Stethoscope,
    audience: "Servico agil de manutencao para manter a rotina do pet sem complicar a semana.",
    description:
      "Pagina pensada para vender um servico recorrente com clareza, usando CTA direto, resumo rapido e apoio humano quando necessario.",
    highlights: ["Atendimento pratico", "Duracao enxuta", "Ideal para rotina recorrente"]
  }
} as const;

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceMap[slug as keyof typeof serviceMap];

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="content-container py-10 sm:py-14">
      <div className="grid gap-8 xl:grid-cols-[1fr_0.78fr]">
        <section className="space-y-6">
          <div className="rounded-[32px] border border-brand-100 bg-linear-to-br from-white via-brand-50/70 to-brand-100/70 p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <p className="eyebrow">Servico individual</p>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl space-y-4">
                <h1 className="page-title">{service.title}</h1>
                <p className="text-base leading-7 text-stone-500">{service.description}</p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-white text-brand-700 shadow-[var(--shadow-soft)]">
                <Icon className="h-7 w-7" />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-4">
                <p className="text-sm text-stone-500">Preco base</p>
                <p className="mt-2 font-heading text-2xl font-semibold text-brand-700">{service.price}</p>
              </article>
              <article className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-4">
                <p className="inline-flex items-center gap-2 text-sm text-stone-500">
                  <Clock3 className="h-4 w-4 text-brand-500" />
                  Duracao media
                </p>
                <p className="mt-2 font-semibold text-ink-900">{service.duration}</p>
              </article>
              <article className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-4">
                <p className="text-sm text-stone-500">Perfil do atendimento</p>
                <p className="mt-2 font-semibold text-ink-900">{service.audience}</p>
              </article>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
            <article className="surface-default border border-stone-100 bg-white p-6 shadow-[var(--shadow-soft)]">
              <h2 className="font-heading text-2xl font-semibold text-ink-900">Por que esse servico vende melhor agora</h2>
              <div className="mt-5 grid gap-3">
                {service.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-[var(--radius-lg)] border border-stone-100 bg-sand-50 p-4 text-sm font-medium text-ink-900">
                    {highlight}
                  </div>
                ))}
              </div>
            </article>

            <article className="surface-default border border-stone-100 bg-white p-6 shadow-[var(--shadow-soft)]">
              <h2 className="font-heading text-2xl font-semibold text-ink-900">Se o tutor ainda estiver em duvida</h2>
              <p className="mt-3 text-sm leading-6 text-stone-500">
                O fluxo principal continua sendo o agendamento online, mas o WhatsApp fica evidente para apoiar quando o
                cliente quiser confirmar detalhes antes de fechar o horario.
              </p>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-success-500 px-4 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </article>
          </div>

          <InlineNotice
            tone="success"
            title="Pagina preparada para vender e orientar"
            description="Preco, duracao, CTA principal e canal humano estao organizados para reduzir atrito e aumentar conversao."
          />
        </section>

        <aside className="space-y-5">
          <div className="surface-default border border-stone-100 bg-white p-6 shadow-[var(--shadow-soft)]">
            <p className="eyebrow">Proxima acao</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-ink-900">Agende este servico em poucos passos.</h2>
            <p className="mt-3 text-sm leading-6 text-stone-500">
              Escolha data, horario e forma de pagamento no fluxo online. Se preferir, comece agora e finalize com apoio no WhatsApp.
            </p>

            <div className="mt-6 grid gap-3">
              <Link href={publicRoutes.schedule}>
                <Button size="lg" fullWidth>
                  <CalendarDays className="h-4 w-4" />
                  Agendar este servico
                </Button>
              </Link>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
                <Button variant="secondary" size="lg" fullWidth>
                  Tirar duvidas no WhatsApp
                </Button>
              </a>
            </div>
          </div>

          <PracticalLinksGrid compact className="xl:grid-cols-2" />
        </aside>
      </div>
    </div>
  );
}
