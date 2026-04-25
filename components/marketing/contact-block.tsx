import { Instagram, MapPin, MessageCircle, ShoppingBag } from "lucide-react";

import { PracticalLinksGrid } from "@/components/marketing/practical-links-grid";
import { siteConfig } from "@/config/site";

export function ContactBlock() {
  return (
    <section className="content-container pb-16">
      <div className="surface-default overflow-hidden">
        <div className="grid gap-8 p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="eyebrow">Contato e localizacao</p>
              <h2 className="section-title">Tudo o que a cliente precisa para chamar, localizar e decidir rapido.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-stone-500">
              O bloco agora deixa o site mais util no primeiro olhar: WhatsApp, endereco, Instagram, mapa, agenda e o
              espaco pronto para o iFood sem gambiarra.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[var(--radius-md)] border border-brand-100 bg-brand-50/80 p-4">
                <MessageCircle className="h-5 w-5 text-brand-600" />
                <p className="mt-3 text-sm font-semibold text-ink-900">WhatsApp</p>
                <p className="mt-1 text-sm leading-6 text-stone-500">{siteConfig.whatsappNumber}</p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-stone-100 bg-white p-4">
                <Instagram className="h-5 w-5 text-brand-600" />
                <p className="mt-3 text-sm font-semibold text-ink-900">Instagram</p>
                <p className="mt-1 text-sm leading-6 text-stone-500">{siteConfig.instagramHandle}</p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-stone-100 bg-white p-4 sm:col-span-2">
                <MapPin className="h-5 w-5 text-brand-600" />
                <p className="mt-3 text-sm font-semibold text-ink-900">Endereco</p>
                <p className="mt-1 text-sm leading-6 text-stone-500">{siteConfig.address}</p>
              </div>
            </div>

            <div className="rounded-[var(--radius-md)] border border-dashed border-brand-200 bg-brand-50 px-4 py-4">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white text-brand-700 shadow-[var(--shadow-soft)]">
                  <ShoppingBag className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">iFood preparado para entrar</p>
                  <p className="mt-1 text-sm leading-6 text-stone-500">
                    O atalho ja esta no layout. Depois voce so troca o `href` em `siteConfig.quickLinks.ifood`.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-ink-900">Atalhos rapidos</p>
              <p className="text-sm text-stone-500">Links estrategicos para conversao, contato e visita a loja.</p>
            </div>
            <PracticalLinksGrid compact />
          </div>
        </div>
      </div>
    </section>
  );
}
