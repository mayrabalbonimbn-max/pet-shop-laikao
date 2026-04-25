import { BadgePercent, HeartHandshake, ShoppingBag, Truck } from "lucide-react";

const items = [
  {
    title: "Seu pet merece o melhor",
    description: "Cuidado de verdade no banho, na tosa e no atendimento para o tutor se sentir seguro desde o primeiro clique.",
    icon: HeartHandshake,
    accent: "bg-brand-100 text-brand-700 border-brand-200"
  },
  {
    title: "Compre e receba em casa",
    description: "Produtos, ração e itens do dia a dia com comunicação clara sobre entrega, retirada e compra rápida.",
    icon: Truck,
    accent: "bg-[var(--sun-100)] text-ink-900 border-[var(--sun-300)]"
  },
  {
    title: "Campanhas e promoções fortes",
    description: "A linguagem do site agora comporta oferta, selo, destaque e vitrines mais comerciais sem perder organização.",
    icon: BadgePercent,
    accent: "bg-[var(--magenta-100)] text-[var(--magenta-600)] border-[var(--magenta-300)]"
  },
  {
    title: "Produtos de qualidade e granel",
    description: "A loja já nasce preparada para ração a granel, pacotes por peso e campanhas de categoria com cara de verdade.",
    icon: ShoppingBag,
    accent: "bg-white text-brand-700 border-brand-200"
  }
];

export function TrustBlock() {
  return (
    <section className="content-container py-12 sm:py-16">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="eyebrow">Diferenciais fortes</p>
          <h2 className="section-title">Mais energia comercial, mais linguagem de pet shop e mais clareza para converter serviços, produtos e contato.</h2>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <article key={item.title} className="surface-default border-brand-100/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,233,255,0.62))] p-6">
            <div className={`flex h-12 w-12 items-center justify-center rounded-[18px] border ${item.accent}`}>
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-heading text-xl font-semibold text-ink-900">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-500">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
