import Link from "next/link";
import { BadgePercent, Filter, Search, ShoppingBag, Sparkles, Truck, WalletCards } from "lucide-react";

import { ProductCard } from "@/components/catalog/product-card";
import { EmptyState } from "@/components/feedback/empty-state";
import { InlineNotice } from "@/components/feedback/inline-notice";
import { PracticalLinksGrid } from "@/components/marketing/practical-links-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listCatalogCategories, listCatalogProducts } from "@/domains/catalog/queries";

export const dynamic = "force-dynamic";

const merchandisingPoints = [
  {
    title: "Vitrine mais vendedora",
    description: "Mais destaque para categoria, preco, oferta e acao principal.",
  },
  {
    title: "Busca e filtros mais claros",
    description: "A cliente encontra mais rapido granel, higiene, racao e acessorios.",
  },
  {
    title: "Mais cara de promocao organizada",
    description: "A pagina vende melhor sem virar panfleto pesado ou baguncado.",
  },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; categoria?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const query = params.q?.trim().toLowerCase() ?? "";
  const categorySlug = params.categoria?.trim() ?? "";

  const [products, categories] = await Promise.all([listCatalogProducts(), listCatalogCategories()]);

  const filteredProducts = products.filter((product) => {
    const matchesQuery =
      query.length === 0 ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    const matchesCategory =
      categorySlug.length === 0 ||
      categories.find((category) => category.slug === categorySlug)?.name === product.category;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="content-container py-10 sm:py-14">
      <section className="grid gap-8 rounded-[32px] border border-brand-100 bg-linear-to-br from-brand-200 via-white to-[var(--magenta-100)] p-6 shadow-[var(--shadow-soft)] sm:p-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-brand-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
              Produtos e categorias
            </span>
            <span className="rounded-full bg-[var(--sun-100)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-900">
              Entrega, retirada e iFood
            </span>
          </div>
          <h1 className="page-title">Uma vitrine mais roxa, mais comercial e mais proxima das campanhas reais do Pet Shop Laikao.</h1>
          <p className="max-w-3xl text-base leading-7 text-stone-500">
            O catalogo usa a camada real da loja, mas agora fala melhor com a cliente: mais destaque para categoria, produto, promocao, entrega e compra rapida.
          </p>

          <form className="surface-default flex flex-col gap-3 border border-white/80 bg-white/92 p-4 lg:flex-row lg:items-center">
            <div className="relative lg:flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-500" />
              <Input name="q" defaultValue={params.q ?? ""} placeholder="Buscar racao, shampoo, guia, cama..." className="pl-10" />
            </div>
            {categorySlug ? <input type="hidden" name="categoria" value={categorySlug} /> : null}
            <Button type="submit" variant="secondary">
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
          </form>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/produtos"
              className={[
                "inline-flex h-10 items-center rounded-full border px-4 text-sm font-semibold transition-colors",
                categorySlug.length === 0
                  ? "border-brand-200 bg-brand-50 text-brand-700 shadow-[var(--shadow-soft)]"
                  : "border-stone-100 bg-white text-ink-900 hover:border-brand-200 hover:bg-brand-50",
              ].join(" ")}
            >
              Todos
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/produtos?categoria=${category.slug}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                className={[
                  "inline-flex h-10 items-center rounded-full border px-4 text-sm font-semibold transition-colors",
                  category.slug === categorySlug
                    ? "border-brand-200 bg-brand-50 text-brand-700 shadow-[var(--shadow-soft)]"
                    : "border-stone-100 bg-white text-ink-900 hover:border-brand-200 hover:bg-brand-50",
                ].join(" ")}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
          {merchandisingPoints.map((point) => (
            <article key={point.title} className="rounded-[var(--radius-lg)] border border-white/80 bg-white/92 p-5 shadow-[var(--shadow-soft)]">
              <h2 className="font-heading text-xl font-semibold text-ink-900">{point.title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-500">{point.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 xl:grid-cols-[1fr_0.88fr]">
        <InlineNotice
          tone="info"
          title="Catalogo real, sem regra de negocio vazando para o front"
          description="Busca e filtro usam a camada de catalogo atual, enquanto estoque, variantes e compra continuam validados no servidor."
        />

        <div className="grid gap-3 sm:grid-cols-3">
          <article className="rounded-[var(--radius-lg)] border border-brand-100 bg-white p-4 shadow-[var(--shadow-soft)]">
            <Sparkles className="h-5 w-5 text-brand-600" />
            <p className="mt-3 text-sm font-semibold text-ink-900">Destaques mais visiveis</p>
          </article>
          <article className="rounded-[var(--radius-lg)] border border-brand-100 bg-white p-4 shadow-[var(--shadow-soft)]">
            <Truck className="h-5 w-5 text-brand-600" />
            <p className="mt-3 text-sm font-semibold text-ink-900">Compra e retirada mais claras</p>
          </article>
          <article className="rounded-[var(--radius-lg)] border border-[var(--sun-300)] bg-[var(--sun-100)]/75 p-4 shadow-[var(--shadow-soft)]">
            <WalletCards className="h-5 w-5 text-brand-600" />
            <p className="mt-3 text-sm font-semibold text-brand-950">Preco e estoque reais</p>
          </article>
        </div>
      </section>

      <section className="mt-8 grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <article className="rounded-[32px] border border-brand-100 bg-linear-to-br from-white via-brand-50/80 to-[var(--magenta-100)]/60 p-6 shadow-[var(--shadow-soft)]">
          <p className="eyebrow">Mais forte para vender</p>
          <h2 className="section-title mt-2">Produtos, entrega, retirada e campanhas com mais forca logo na vitrine.</h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            A pagina agora fica mais alinhada com a energia das artes: mais promocional, mais clara e mais identificavel como pet shop de verdade.
          </p>
        </article>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[28px] border border-brand-100 bg-white p-5 shadow-[var(--shadow-soft)]">
            <BadgePercent className="h-5 w-5 text-[var(--magenta-600)]" />
            <p className="mt-3 font-semibold text-ink-900">Campanhas melhor resolvidas</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">Selos, destaque e vitrine mais vivos sem perder organizacao.</p>
          </article>
          <article className="rounded-[28px] border border-brand-100 bg-white p-5 shadow-[var(--shadow-soft)]">
            <ShoppingBag className="h-5 w-5 text-brand-700" />
            <p className="mt-3 font-semibold text-ink-900">iFood e compra rapida</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">A estrutura fica pronta para conectar canais comerciais fortes.</p>
          </article>
          <article className="rounded-[28px] border border-[var(--sun-300)] bg-[var(--sun-100)]/75 p-5 shadow-[var(--shadow-soft)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-900">Granel</p>
            <p className="mt-3 font-semibold text-brand-950">Racao a granel e 1kg com mais destaque</p>
            <p className="mt-2 text-sm leading-6 text-brand-900/78">Campanhas futuras entram aqui sem precisar redesenhar a loja.</p>
          </article>
        </div>
      </section>

      {filteredProducts.length > 0 ? (
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="Nenhum produto encontrado"
            description="Tente mudar a busca ou remover o filtro de categoria para ver outras opcoes disponiveis."
            actionLabel="Ver catalogo completo"
            actionHref="/produtos"
          />
        </div>
      )}

      <section className="mt-10">
        <PracticalLinksGrid />
      </section>
    </div>
  );
}
