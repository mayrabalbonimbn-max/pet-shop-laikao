import Link from "next/link";
import {
  BadgePercent,
  Dog,
  Drumstick,
  Scissors,
  ShoppingBag,
  Sparkles,
  Truck,
  WashingMachine,
} from "lucide-react";

import { ProductCard } from "@/components/catalog/product-card";
import { InlineNotice } from "@/components/feedback/inline-notice";
import { ContactBlock } from "@/components/marketing/contact-block";
import { HeroBanner } from "@/components/marketing/hero-banner";
import { PracticalLinksGrid } from "@/components/marketing/practical-links-grid";
import { TrustBlock } from "@/components/marketing/trust-block";
import { Button } from "@/components/ui/button";
import { listCatalogProducts } from "@/domains/catalog/queries";
import { publicRoutes } from "@/lib/routes";

const serviceHighlights = [
  {
    title: "Banho e tosa",
    description: "Atendimento com visual caprichado, leitura facil e CTA forte para agendar no celular.",
    icon: Scissors,
    badge: "Mais pedido",
  },
  {
    title: "Hidratacao",
    description: "Cuidado extra para o pet com comunicacao mais calorosa e mais proxima das artes.",
    icon: Sparkles,
    badge: "Cuidado premium",
  },
  {
    title: "Escovacao",
    description: "Rotina de higiene e manutencao com mais clareza para quem quer resolver rapido.",
    icon: WashingMachine,
    badge: "Rotina em dia",
  },
  {
    title: "Corte de unhas",
    description: "Servico rapido e util para o dia a dia, agora com mais destaque na entrada do site.",
    icon: Dog,
    badge: "Servico express",
  },
];

const commerceHighlights = [
  {
    title: "iFood e pedidos rapidos",
    description: "O site deixa mais evidente que o Laikao tambem vende produtos e prepara pedidos.",
    icon: ShoppingBag,
  },
  {
    title: "Entrega ou retirada",
    description: "A cliente entende em segundos que pode receber em casa ou retirar na loja.",
    icon: Truck,
  },
  {
    title: "Racao a granel",
    description: "Campanhas de granel e pacotes de 1kg passam a ter espaco proprio e mais apelo.",
    icon: Drumstick,
  },
];

export default async function HomePage() {
  const featuredProducts = (await listCatalogProducts()).slice(0, 6);

  return (
    <div className="bg-transparent">
      <HeroBanner />

      <section className="content-container py-10 sm:py-14">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="eyebrow">Atalhos e contato rapido</p>
            <h2 className="section-title">WhatsApp, localizacao, agendamento, Instagram e iFood continuam no topo, mas agora dentro de uma entrada mais roxa e mais comercial.</h2>
          </div>
        </div>

        <PracticalLinksGrid className="mb-6" />

        <div className="grid gap-4 lg:grid-cols-3">
          <InlineNotice
            title="Dois caminhos muito claros"
            description="A home separa melhor o fluxo de estetica animal do fluxo de produtos e pedidos."
          />
          <InlineNotice
            tone="warning"
            title="Mais promocional sem ficar panfleto"
            description="O site ganha energia de campanha, badges e blocos de venda sem perder organizacao."
          />
          <InlineNotice
            tone="success"
            title="Mais cara de pet shop forte"
            description="A linguagem agora deixa evidente que o Laikao cuida, vende, entrega e atende rapido."
          />
        </div>
      </section>

      <section className="content-container pb-14">
        <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[32px] border border-brand-200/80 bg-linear-to-br from-brand-200 via-white to-brand-100 p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
                Estetica animal
              </span>
              <span className="rounded-full bg-[var(--sun-100)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-900">
                Banho, tosa e cuidado
              </span>
            </div>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-brand-950 sm:text-4xl">
              Uma entrada mais forte para banho, tosa, hidratacao, escovacao e corte de unhas.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-brand-900/78">
              A home agora deixa muito mais evidente que o Pet Shop Laikao cuida do pet com servicos prontos para converter no mobile.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {serviceHighlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[24px] border border-white/80 bg-white/90 p-4 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-brand-100 text-brand-700">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-[var(--sun-100)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-900">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-ink-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{item.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={publicRoutes.services} className="sm:min-w-[14rem]">
                <Button size="lg" fullWidth>
                  Ver servicos
                </Button>
              </Link>
              <Link href={publicRoutes.schedule} className="sm:min-w-[14rem]">
                <Button variant="secondary" size="lg" fullWidth>
                  Agendar agora
                </Button>
              </Link>
            </div>
          </article>

          <article className="rounded-[32px] border border-brand-100 bg-linear-to-br from-white via-[#fff7ff] to-[var(--magenta-100)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[var(--magenta-100)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--magenta-600)]">
                Produtos e iFood
              </span>
              <span className="rounded-full bg-brand-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
                Entrega ou retirada
              </span>
            </div>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-ink-900">
              Produtos, compra e entrega com muito mais forca logo no comeco da home.
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-600">
              O site comunica melhor que o Laikao vende produtos, atende pelo iFood e prepara retirada sem perder a identidade da marca.
            </p>

            <div className="mt-6 grid gap-3">
              {commerceHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-brand-100/80 bg-white/90 p-4 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[var(--magenta-100)] text-[var(--magenta-600)]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-ink-900">{item.title}</p>
                      <p className="text-sm leading-6 text-stone-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-[var(--sun-300)] bg-linear-to-r from-[var(--sun-100)] via-white to-[var(--magenta-100)] p-5">
              <div className="flex items-center gap-3">
                <BadgePercent className="h-5 w-5 text-[var(--magenta-600)]" />
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-900">Campanhas em destaque</p>
              </div>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-brand-950">Racao a granel, kits e ofertas com mais apelo visual.</h3>
              <p className="mt-2 text-sm leading-6 text-brand-900/80">
                A home fica pronta para campanhas promocionais reais, com badges, blocos e chamadas fortes sem bagunca.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="content-container pb-14">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Estetica animal</p>
            <h2 className="section-title">Uma secao de servicos com mais cara de pet shop, mais CTA e mais energia comercial.</h2>
          </div>
          <Link href={publicRoutes.services}>
            <Button variant="secondary">Explorar servicos</Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {serviceHighlights.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-brand-100 bg-linear-to-br from-white via-brand-50/85 to-[var(--magenta-100)]/60 p-5 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-brand-500/12 text-brand-700">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-[var(--magenta-100)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--magenta-600)]">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{item.description}</p>
              <div className="mt-5 rounded-[18px] border border-white/80 bg-white/92 px-4 py-3 text-sm font-semibold text-brand-800">
                Agendamento direto e leitura forte no celular
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-container pb-14">
        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[32px] border border-brand-100 bg-linear-to-br from-white via-brand-50/80 to-[var(--magenta-100)]/60 p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <p className="eyebrow">Venda, entrega e retirada</p>
            <h2 className="section-title mt-2">A loja aparece com mais clareza para quem quer comprar pelo site, pedir no iFood ou retirar no local.</h2>
            <p className="mt-4 text-base leading-7 text-stone-600">
              O Laikao deixa de parecer apenas uma pagina de servicos e assume com mais forca o lado comercial de pet shop completo.
            </p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-[22px] border border-white/80 bg-white/92 p-4 shadow-[var(--shadow-soft)]">
                <p className="font-semibold text-ink-900">Produtos em destaque</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">Racao, higiene, acessorios e campanhas especiais com mais apelo visual.</p>
              </div>
              <div className="rounded-[22px] border border-white/80 bg-white/92 p-4 shadow-[var(--shadow-soft)]">
                <p className="font-semibold text-ink-900">Entrega rapida ou retirada</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">Mensagem forte para compras praticas, como nas artes promocionais da marca.</p>
              </div>
              <div className="rounded-[22px] border border-[var(--sun-300)] bg-[var(--sun-100)]/78 p-4 shadow-[var(--shadow-soft)]">
                <p className="font-semibold text-brand-950">Racao a granel e pacotes de 1kg</p>
                <p className="mt-2 text-sm leading-6 text-brand-900/82">
                  Estrutura pronta para campanhas de granel com destaque sem comprometer a navegacao da home.
                </p>
              </div>
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {commerceHighlights.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-brand-100 bg-white p-5 shadow-[var(--shadow-soft)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-brand-100 text-brand-700">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-2xl font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{item.description}</p>
                <div className="mt-5 rounded-[18px] bg-linear-to-r from-brand-50 to-[var(--magenta-100)] px-4 py-3 text-sm font-semibold text-brand-800">
                  Mais visibilidade comercial sem poluir a experiencia
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-container pb-14">
        <div className="rounded-[34px] border border-brand-100 bg-linear-to-r from-brand-100 via-white to-[var(--sun-100)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <div className="grid gap-6 xl:grid-cols-[1fr_1.15fr]">
            <div>
              <p className="eyebrow">Racao a granel</p>
              <h2 className="section-title mt-2">Uma frente importante da marca agora ganha espaco proprio no site.</h2>
              <p className="mt-4 text-base leading-7 text-stone-600">
                A home fica pronta para destacar granel, embalagens de 1kg, kits promocionais e categorias com mais giro.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href={publicRoutes.products} className="sm:min-w-[14rem]">
                  <Button size="lg" fullWidth>
                    Ver produtos
                  </Button>
                </Link>
                <a href="#" className="pointer-events-none sm:min-w-[14rem]" aria-disabled="true">
                  <Button variant="secondary" size="lg" fullWidth>
                    iFood em breve
                  </Button>
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {["Pacotes de 1kg", "Campanhas promocionais", "Compra pratica para o dia a dia"].map((item, index) => (
                <div key={item} className="rounded-[24px] border border-white/80 bg-white/92 p-5 shadow-[var(--shadow-soft)]">
                  <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-700">
                    Granel 0{index + 1}
                  </span>
                  <p className="mt-4 font-heading text-2xl font-semibold text-ink-900">{item}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    Visual mais promocional e mais alinhado com a comunicacao real do pet shop.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-container pb-16">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Produtos em destaque</p>
            <h2 className="section-title">Uma vitrine mais chamativa, mais lilas e com mais cara de promocao organizada.</h2>
          </div>
          <Link href={publicRoutes.products}>
            <Button variant="secondary">Abrir loja</Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <TrustBlock />
      <ContactBlock />
    </div>
  );
}
