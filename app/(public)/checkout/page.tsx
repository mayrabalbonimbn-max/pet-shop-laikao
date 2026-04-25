import { Suspense } from "react";
import { CreditCard, ReceiptText, UserRound } from "lucide-react";

import { CheckoutPageClient } from "@/components/commerce/checkout-page-client";

const checkoutSections = [
  {
    title: "Identificacao",
    description: "Campos curtos, legiveis e conectados ao pedido real."
  },
  {
    title: "Entrega ou retirada",
    description: "Escolha clara entre retirada na loja e entrega local."
  },
  {
    title: "Revisao",
    description: "Resumo do pedido e observacoes sempre visiveis."
  },
  {
    title: "Pagamento",
    description: "A tela ja nasce preparada para a payment layer dos pedidos."
  }
];

export default function CheckoutPage() {
  return (
    <div className="content-container py-10 sm:py-14">
      <section className="grid gap-8 rounded-[32px] border border-brand-100 bg-linear-to-br from-white via-brand-50/70 to-brand-100/70 p-6 shadow-[var(--shadow-soft)] sm:p-8 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-5">
          <p className="eyebrow">Checkout</p>
          <h1 className="page-title">Checkout claro, confiavel e organizado para fechar o pedido real sem parecer formulario cru.</h1>
          <p className="max-w-3xl text-base leading-7 text-stone-500">
            A etapa final agora conversa com a camada de carrinho e pedidos ja persistida, mantendo a leitura leve e forte no mobile.
          </p>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {checkoutSections.map((section) => (
              <div key={section.title} className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-4 shadow-[var(--shadow-soft)]">
                <p className="text-sm font-semibold text-brand-700">{section.title}</p>
                <p className="mt-2 text-sm leading-6 text-stone-500">{section.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
          <article className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-5 shadow-[var(--shadow-soft)]">
            <UserRound className="h-5 w-5 text-brand-600" />
            <p className="mt-3 text-sm font-semibold text-ink-900">Dados organizados por bloco</p>
            <p className="mt-2 text-sm leading-6 text-stone-500">Cada secao explica melhor o que o cliente precisa fazer.</p>
          </article>
          <article className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-5 shadow-[var(--shadow-soft)]">
            <ReceiptText className="h-5 w-5 text-brand-600" />
            <p className="mt-3 text-sm font-semibold text-ink-900">Resumo facil de entender</p>
            <p className="mt-2 text-sm leading-6 text-stone-500">O total e o conteudo do pedido continuam visiveis sem esmagar a tela.</p>
          </article>
          <article className="rounded-[var(--radius-lg)] border border-white/80 bg-white/90 p-5 shadow-[var(--shadow-soft)]">
            <CreditCard className="h-5 w-5 text-brand-600" />
            <p className="mt-3 text-sm font-semibold text-ink-900">Pronto para a payment layer</p>
            <p className="mt-2 text-sm leading-6 text-stone-500">O pedido ja nasce real hoje e abre caminho limpo para o pagamento na proxima etapa.</p>
          </article>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.82fr]">
            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div key={item} className="surface-default h-56 animate-pulse border border-stone-100 bg-white" />
              ))}
            </div>
            <div className="surface-default h-80 animate-pulse border border-stone-100 bg-white" />
          </div>
        }
      >
        <CheckoutPageClient />
      </Suspense>
    </div>
  );
}
