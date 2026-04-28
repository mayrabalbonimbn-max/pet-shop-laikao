import Link from "next/link";

import { Button } from "@/components/ui/button";
import { listActivePromotions } from "@/domains/promotions/queries";

export const dynamic = "force-dynamic";

export default async function PromotionsPage() {
  const promotions = await listActivePromotions();

  return (
    <div className="content-container py-10 sm:py-14">
      <div className="space-y-2">
        <p className="eyebrow">Promocoes</p>
        <h1 className="page-title">Campanhas ativas, ofertas sazonais e beneficios do Pet Shop Laikao.</h1>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {promotions.map((promotion) => (
          <article key={promotion.id} className="surface-default p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">{promotion.type}</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-ink-900">{promotion.title}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{promotion.description ?? "Campanha promocional ativa no momento."}</p>
            <div className="mt-5">
              <Link href={(promotion.ctaLink ?? "/produtos") as "/produtos"}>
                <Button variant="secondary">{promotion.ctaLabel ?? "Aproveitar oferta"}</Button>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
