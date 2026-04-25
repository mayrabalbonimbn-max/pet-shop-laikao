import { Instagram, MapPin, MessageCircle, ShoppingBag, Truck } from "lucide-react";

import { PracticalLinksGrid } from "@/components/marketing/practical-links-grid";
import { siteConfig } from "@/config/site";

export function ContactBlock() {
  return (
    <section className="content-container pb-16">
      <div className="surface-default overflow-hidden border-brand-100/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(245,233,255,0.72),rgba(255,241,168,0.22))]">
        <div className="grid gap-8 p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="eyebrow">Contato e localização</p>
              <h2 className="section-title">WhatsApp, endereço, Instagram, retirada e entrega com leitura fácil e presença comercial forte.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-stone-500">
              O bloco agora puxa a linguagem real da marca: contato rápido, compra prática, retirada no local e entrega com comunicação simples.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[var(--radius-md)] border border-success-500/15 bg-white/80 p-4">
                <MessageCircle className="h-5 w-5 text-success-500" />
                <p className="mt-3 text-sm font-semibold text-ink-900">WhatsApp</p>
                <p className="mt-1 text-sm leading-6 text-stone-500">{siteConfig.whatsappNumber}</p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--magenta-300)]/70 bg-white/80 p-4">
                <Instagram className="h-5 w-5 text-[var(--magenta-600)]" />
                <p className="mt-3 text-sm font-semibold text-ink-900">Instagram</p>
                <p className="mt-1 text-sm leading-6 text-stone-500">{siteConfig.instagramHandle}</p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-brand-100/70 bg-white/80 p-4 sm:col-span-2">
                <MapPin className="h-5 w-5 text-brand-600" />
                <p className="mt-3 text-sm font-semibold text-ink-900">Endereço</p>
                <p className="mt-1 text-sm leading-6 text-stone-500">{siteConfig.address}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[var(--radius-md)] border border-[var(--sun-300)] bg-[var(--sun-100)]/65 px-4 py-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white text-ink-900 shadow-[var(--shadow-soft)]">
                    <ShoppingBag className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">iFood em destaque</p>
                    <p className="mt-1 text-sm leading-6 text-stone-500">O espaço já está pronto para o link real sem quebrar o layout.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[var(--radius-md)] border border-brand-100/70 bg-white/80 px-4 py-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-brand-100 text-brand-700 shadow-[var(--shadow-soft)]">
                    <Truck className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">Entrega ou retirada</p>
                    <p className="mt-1 text-sm leading-6 text-stone-500">Compre no site, receba em casa ou retire aqui com facilidade.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-ink-900">Atalhos promocionais</p>
              <p className="text-sm text-stone-500">Blocos rápidos para conversão, visita à loja e campanhas de entrada.</p>
            </div>
            <PracticalLinksGrid compact />
          </div>
        </div>
      </div>
    </section>
  );
}
