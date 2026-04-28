import Link from "next/link";
import { Filter, Search, ShoppingBag, Sparkles, Truck, WalletCards } from "lucide-react";

import { ProductCard } from "@/components/catalog/product-card";
import { EmptyState } from "@/components/feedback/empty-state";
import { PracticalLinksGrid } from "@/components/marketing/practical-links-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listCatalogCategories, listCatalogProducts } from "@/domains/catalog/queries";

export const dynamic = "force-dynamic";

export default async function ProductsPage({ searchParams }: { searchParams?: Promise<{ q?: string; categoria?: string }> }) {
  const params = (await searchParams) ?? {};
  const query = params.q?.trim().toLowerCase() ?? "";
  const categorySlug = params.categoria?.trim() ?? "";

  const [products, categories] = await Promise.all([listCatalogProducts(), listCatalogCategories()]);

  const filteredProducts = products.filter((product) => {
    const matchesQuery = query.length === 0 || product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
    const matchesCategory = categorySlug.length === 0 || categories.find((category) => category.slug === categorySlug)?.name === product.category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="content-container py-10 sm:py-14">
      <section className="rounded-[32px] border border-brand-100 bg-linear-to-br from-brand-100/70 via-white to-[#fff4fb] p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">Loja</span>
              <span className="rounded-full bg-[var(--sun-100)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-900">Entrega e retirada</span>
            </div>
            <h1 className="page-title">Vitrine comercial com filtros claros, leitura rapida e foco em compra.</h1>
            <p className="text-base leading-7 text-stone-600">A loja ficou mais util no mobile: busca destacada, categorias objetivas e cards com preco/estoque mais legiveis.</p>

            <form className="rounded-[20px] border border-white/80 bg-white/92 p-4 shadow-[var(--shadow-soft)]">
              <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-500" />
                  <Input name="q" defaultValue={params.q ?? ""} placeholder="Buscar racao, shampoo, coleira..." className="pl-10" />
                </div>
                {categorySlug ? <input type="hidden" name="categoria" value={categorySlug} /> : null}
                <Button type="submit" variant="secondary"><Filter className="h-4 w-4" />Filtrar</Button>
              </div>
            </form>

            <div className="flex flex-wrap gap-2">
              <Link href="/produtos" className={["inline-flex h-10 items-center rounded-full border px-4 text-sm font-semibold transition-colors", categorySlug.length === 0 ? "border-brand-200 bg-brand-50 text-brand-700 shadow-[var(--shadow-soft)]" : "border-stone-100 bg-white text-ink-900 hover:border-brand-200 hover:bg-brand-50"].join(" ")}>Todos</Link>
              {categories.map((category) => (
                <Link key={category.id} href={`/produtos?categoria=${category.slug}${query ? `&q=${encodeURIComponent(query)}` : ""}`} className={["inline-flex h-10 items-center rounded-full border px-4 text-sm font-semibold transition-colors", category.slug === categorySlug ? "border-brand-200 bg-brand-50 text-brand-700 shadow-[var(--shadow-soft)]" : "border-stone-100 bg-white text-ink-900 hover:border-brand-200 hover:bg-brand-50"].join(" ")}>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <article className="rounded-[22px] border border-white/80 bg-white/92 p-4 shadow-[var(--shadow-soft)]"><Sparkles className="h-5 w-5 text-brand-600" /><p className="mt-2 text-sm font-semibold text-ink-900">Cards mais comerciais</p><p className="text-sm text-stone-600">Preco e status visiveis.</p></article>
            <article className="rounded-[22px] border border-white/80 bg-white/92 p-4 shadow-[var(--shadow-soft)]"><Truck className="h-5 w-5 text-brand-600" /><p className="mt-2 text-sm font-semibold text-ink-900">Compra com contexto</p><p className="text-sm text-stone-600">Entrega, retirada e suporte.</p></article>
            <article className="rounded-[22px] border border-[var(--sun-300)] bg-[var(--sun-100)]/75 p-4 shadow-[var(--shadow-soft)]"><WalletCards className="h-5 w-5 text-brand-700" /><p className="mt-2 text-sm font-semibold text-brand-950">Dados reais</p><p className="text-sm text-brand-900/80">Catalogo ligado ao backend.</p></article>
          </div>
        </div>
      </section>

      {filteredProducts.length > 0 ? (
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</section>
      ) : (
        <div className="mt-8"><EmptyState title="Nenhum produto encontrado" description="Tente mudar a busca ou remover o filtro de categoria para ver outras opcoes." actionLabel="Ver catalogo completo" actionHref="/produtos" /></div>
      )}

      <section className="mt-8 rounded-[28px] border border-brand-100 bg-white p-6 shadow-[var(--shadow-soft)]">
        <div className="grid gap-4 md:grid-cols-3">
          <div><p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900"><ShoppingBag className="h-4 w-4 text-brand-700" />Compra online</p><p className="mt-1 text-sm text-stone-600">Fluxo rapido ate o checkout.</p></div>
          <div><p className="text-sm font-semibold text-ink-900">Categorias organizadas</p><p className="mt-1 text-sm text-stone-600">Navegacao mais clara no celular.</p></div>
          <div><p className="text-sm font-semibold text-ink-900">Base pronta para promocoes</p><p className="mt-1 text-sm text-stone-600">Campanhas entram sem quebrar layout.</p></div>
        </div>
      </section>

      <section className="mt-10"><PracticalLinksGrid /></section>
    </div>
  );
}
