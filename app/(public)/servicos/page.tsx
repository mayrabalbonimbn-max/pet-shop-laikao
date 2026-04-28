import Link from "next/link";
import { CalendarClock, Clock3, MessageCircle, Scissors, ShieldCheck, Sparkles, Star } from "lucide-react";

import { PracticalLinksGrid } from "@/components/marketing/practical-links-grid";
import { Button } from "@/components/ui/button";
import { publicRoutes } from "@/lib/routes";

const services = [
  {
    slug: "banho-e-tosa-premium",
    name: "Banho e tosa premium",
    description: "Banho completo com acabamento caprichado e tosa alinhada para pets que precisam de visual impecavel.",
    price: "A partir de R$ 110",
    duration: "75 a 90 min",
    icon: Sparkles,
    badge: "Mais pedido"
  },
  {
    slug: "banho-terapeutico",
    name: "Banho terapeutico",
    description: "Fluxo com foco em pele sensivel, conforto e produtos adequados, com orientacao clara para o tutor.",
    price: "A partir de R$ 78",
    duration: "50 a 60 min",
    icon: ShieldCheck,
    badge: "Pele sensivel"
  },
  {
    slug: "tosa-higienica",
    name: "Tosa higienica",
    description: "Servico de manutencao pratica para rotina do pet, com execucao rapida e qualidade constante.",
    price: "A partir de R$ 65",
    duration: "35 a 45 min",
    icon: Scissors,
    badge: "Express"
  }
];

export default function ServicesPage() {
  return (
    <div className="content-container py-10 sm:py-14">
      <section className="rounded-[32px] border border-brand-100 bg-linear-to-br from-brand-100/70 via-white to-[#fff3fb] p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">Servicos</span>
              <span className="rounded-full bg-[var(--sun-100)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-900">Agenda online</span>
            </div>
            <h1 className="page-title">Servicos claros, comerciais e prontos para conversao no celular.</h1>
            <p className="text-base leading-7 text-stone-600">
              Valor, tempo medio e acao para agendar aparecem de forma objetiva. A pagina vende servico sem enrolacao e sem poluicao visual.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={publicRoutes.schedule} className="sm:min-w-[14rem]"><Button size="lg" fullWidth>Agendar agora</Button></Link>
              <a href="https://wa.me/5511980512871" target="_blank" rel="noreferrer" className="sm:min-w-[14rem]"><Button variant="secondary" size="lg" fullWidth>Falar no WhatsApp</Button></a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <article className="rounded-[22px] border border-white/80 bg-white/92 p-4 shadow-[var(--shadow-soft)]"><p className="text-sm font-semibold text-ink-900">Preco visivel</p><p className="mt-1 text-sm text-stone-600">Faixa de valor logo no card.</p></article>
            <article className="rounded-[22px] border border-white/80 bg-white/92 p-4 shadow-[var(--shadow-soft)]"><p className="text-sm font-semibold text-ink-900">Duracao clara</p><p className="mt-1 text-sm text-stone-600">Tutor entende tempo medio antes de fechar.</p></article>
            <article className="rounded-[22px] border border-white/80 bg-white/92 p-4 shadow-[var(--shadow-soft)]"><p className="text-sm font-semibold text-ink-900">CTA direto</p><p className="mt-1 text-sm text-stone-600">Agenda e WhatsApp sempre acessiveis.</p></article>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article key={service.slug} className="surface-default flex h-full flex-col border border-brand-100 bg-white p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-brand-100 text-brand-700"><service.icon className="h-5 w-5" /></div>
              <span className="rounded-full bg-[var(--sun-100)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-900">{service.badge}</span>
            </div>
            <h2 className="mt-4 font-heading text-2xl font-semibold text-ink-900">{service.name}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{service.description}</p>

            <div className="mt-4 grid gap-2 rounded-[18px] border border-brand-100 bg-brand-50/55 p-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-stone-500">Preco</span><strong className="font-heading text-lg text-brand-700">{service.price}</strong></div>
              <div className="flex items-center justify-between"><span className="inline-flex items-center gap-1.5 text-stone-500"><Clock3 className="h-4 w-4 text-brand-500" /> Duracao</span><strong className="text-ink-900">{service.duration}</strong></div>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <Link href={`/servicos/${service.slug}`}><Button variant="secondary" fullWidth>Ver detalhes</Button></Link>
              <Link href={publicRoutes.schedule}><Button fullWidth>Agendar</Button></Link>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-4 xl:grid-cols-[1fr_1.1fr]">
        <article className="surface-default border border-brand-100 bg-white p-6 shadow-[var(--shadow-soft)]">
          <p className="eyebrow">Como funciona</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-ink-900">Fluxo simples para fechar o agendamento.</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[18px] border border-stone-100 p-4"><p className="inline-flex items-center gap-2 font-semibold text-ink-900"><CalendarClock className="h-4 w-4 text-brand-700" />Escolha o servico</p><p className="mt-1 text-sm text-stone-600">Veja valor e duracao.</p></div>
            <div className="rounded-[18px] border border-stone-100 p-4"><p className="inline-flex items-center gap-2 font-semibold text-ink-900"><Star className="h-4 w-4 text-brand-700" />Selecione dia e horario</p><p className="mt-1 text-sm text-stone-600">Agenda mensal/semanal/diaria.</p></div>
            <div className="rounded-[18px] border border-stone-100 p-4"><p className="inline-flex items-center gap-2 font-semibold text-ink-900"><ShieldCheck className="h-4 w-4 text-brand-700" />Confirme pagamento</p><p className="mt-1 text-sm text-stone-600">Pix 50% ou 100% e cartao.</p></div>
            <div className="rounded-[18px] border border-stone-100 p-4"><p className="inline-flex items-center gap-2 font-semibold text-ink-900"><MessageCircle className="h-4 w-4 text-success-500" />Suporte rapido</p><p className="mt-1 text-sm text-stone-600">WhatsApp para duvidas antes de confirmar.</p></div>
          </div>
        </article>
        <PracticalLinksGrid />
      </section>
    </div>
  );
}
