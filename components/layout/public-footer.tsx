import Link from "next/link";
import { Instagram, MapPinned, MessageCircle, ShoppingBag } from "lucide-react";

import { siteConfig } from "@/config/site";
import { publicRoutes } from "@/lib/routes";

const navItems = [
  { label: "Home", href: publicRoutes.home },
  { label: "Servicos", href: publicRoutes.services },
  { label: "Agenda", href: publicRoutes.schedule },
  { label: "Produtos", href: publicRoutes.products },
  { label: "Contato", href: publicRoutes.contact }
];

export function PublicFooter() {
  return (
    <footer className="border-t border-brand-100 bg-white">
      <div className="content-container grid gap-8 py-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
        <div className="space-y-4">
          <div>
            <p className="font-heading text-xl font-semibold text-ink-900">{siteConfig.name}</p>
            <p className="mt-2 max-w-sm text-sm leading-7 text-stone-500">
              Site mais claro, comercial e util para uma operacao de pet shop confiavel, profissional e facil de usar no celular.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-stone-100 bg-white px-3 py-2 text-sm font-semibold text-ink-900 hover:border-brand-200 hover:bg-brand-50"
            >
              <Instagram className="h-4 w-4 text-brand-600" />
              Instagram
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-ink-900">Navegacao</p>
          <div className="grid gap-2 text-sm text-stone-500">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand-700">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-ink-900">Atalhos</p>
          <div className="grid gap-2 text-sm">
            <Link href={siteConfig.quickLinks.schedule.href} className="font-medium text-brand-700 hover:text-brand-800">
              Agendar agora
            </Link>
            <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer" className="font-medium text-stone-500 hover:text-brand-700">
              Ver no mapa
            </a>
            <span className="font-medium text-stone-500">iFood em breve</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-ink-900">Informacoes praticas</p>
          <div className="space-y-2 text-sm text-stone-500">
            <p>{siteConfig.whatsappNumber}</p>
            <p>{siteConfig.address}</p>
            <p>{siteConfig.hoursLabel}</p>
          </div>
          <a
            href={siteConfig.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            <MapPinned className="h-4 w-4" />
            Abrir localizacao
          </a>
          <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-brand-200 bg-brand-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
            <ShoppingBag className="h-3.5 w-3.5" />
            iFood pronto para ligar
          </div>
        </div>
      </div>
    </footer>
  );
}
