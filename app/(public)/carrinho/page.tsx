import Link from "next/link";
import { AlertTriangle, Percent, ShoppingCart } from "lucide-react";

import { CartPageClient } from "@/components/commerce/cart-page-client";
import { Button } from "@/components/ui/button";
import { publicRoutes } from "@/lib/routes";

export default function CartPage() {
  return (
    <div className="content-container py-10 sm:py-14">
      <section className="grid gap-8 rounded-[32px] border border-brand-100 bg-linear-to-br from-white via-brand-50/70 to-brand-100/70 p-6 shadow-[var(--shadow-soft)] sm:p-8 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-5">
          <p className="eyebrow">Carrinho</p>
          <h1 className="page-title">Ultima revisao antes do checkout com leitura forte, estoque validado e resumo vindo do backend real.</h1>
          <p className="max-w-3xl text-base leading-7 text-stone-500">
            O carrinho agora conversa com a camada persistida da loja para recalcular subtotal, validar estoque e aplicar cupom sem improviso.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={publicRoutes.checkout} className="sm:min-w-[15rem]">
              <Button size="lg" fullWidth>
                Ir para checkout
              </Button>
            </Link>
            <Link href={publicRoutes.products} className="sm:min-w-[15rem]">
              <Button variant="secondary" size="lg" fullWidth>
                Continuar comprando
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
          <article className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-5 shadow-[var(--shadow-soft)]">
            <ShoppingCart className="h-5 w-5 text-brand-600" />
            <p className="mt-3 text-sm font-semibold text-ink-900">Itens organizados</p>
            <p className="mt-2 text-sm leading-6 text-stone-500">Cada item agora tem mais hierarquia visual, status e acoes mais legiveis.</p>
          </article>
          <article className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-5 shadow-[var(--shadow-soft)]">
            <Percent className="h-5 w-5 text-brand-600" />
            <p className="mt-3 text-sm font-semibold text-ink-900">Resumo mais claro</p>
            <p className="mt-2 text-sm leading-6 text-stone-500">Subtotal, desconto e total final aparecem com leitura comercial e dados reais.</p>
          </article>
          <article className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-5 shadow-[var(--shadow-soft)]">
            <AlertTriangle className="h-5 w-5 text-warning-500" />
            <p className="mt-3 text-sm font-semibold text-ink-900">Erros mais explicitos</p>
            <p className="mt-2 text-sm leading-6 text-stone-500">Estoque, cupom invalido e valor atualizado deixam de parecer falha escondida.</p>
          </article>
        </div>
      </section>

      <CartPageClient />
    </div>
  );
}
