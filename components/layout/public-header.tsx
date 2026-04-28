import Link from "next/link";
import { CalendarDays, ExternalLink, Instagram, MapPinned, MessageCircle, ShoppingBag } from "lucide-react";

import { MobileNavSheet } from "@/components/layout/mobile-nav-sheet";
import { siteConfig } from "@/config/site";
import { publicRoutes } from "@/lib/routes";

const navItems = [
  { label: "Servicos", href: publicRoutes.services },
  { label: "Agenda", href: publicRoutes.schedule },
  { label: "Produtos", href: publicRoutes.products },
  { label: "Promocoes", href: publicRoutes.promotions },
  { label: "Contato", href: publicRoutes.contact },
  { label: "Carrinho", href: publicRoutes.cart }
];

const quickActions = [
  {
    label: "WhatsApp",
    href: siteConfig.whatsappUrl,
    icon: MessageCircle
  },
  {
    label: "Instagram",
    href: siteConfig.instagramUrl,
    icon: Instagram
  },
  {
    label: "Mapa",
    href: siteConfig.mapUrl,
    icon: MapPinned
  }
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100/80 bg-white/95 backdrop-blur-md">
      <div className="border-b border-brand-100/70 bg-brand-50/75">
        <div className="content-container flex flex-col gap-2 py-2 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-brand-700">
              <MessageCircle className="h-3.5 w-3.5" />
              {siteConfig.whatsappNumber}
            </a>
            <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-brand-700">
              <MapPinned className="h-3.5 w-3.5" />
              {siteConfig.addressLine}
            </a>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-brand-700">
              <Instagram className="h-3.5 w-3.5" />
              {siteConfig.instagramHandle}
            </a>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href={siteConfig.quickLinks.schedule.href}
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-3 py-2 text-xs font-semibold text-white shadow-[var(--shadow-soft)] transition-colors hover:bg-brand-600"
            >
              <CalendarDays className="h-3.5 w-3.5" />
              Agendar
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-2 text-xs font-semibold text-ink-900">
              <ShoppingBag className="h-3.5 w-3.5 text-brand-600" />
              iFood em breve
            </span>
          </div>
        </div>
      </div>

      <div className="content-container flex min-h-18 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-brand-500 text-lg font-black text-white shadow-[var(--shadow-soft)]">
            L
          </div>
          <div>
            <p className="font-heading text-lg font-semibold text-ink-900">Pet Shop Laikao</p>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-500">Premium popular</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-stone-500 hover:text-brand-700">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {quickActions.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-stone-100 bg-white px-4 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-200 hover:bg-brand-50"
              >
                <Icon className="h-4 w-4 text-brand-600" />
                {item.label}
              </a>
            );
          })}

          <Link
            href={siteConfig.quickLinks.schedule.href}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Agendar agora
            <ExternalLink className="h-4 w-4" />
          </Link>
          <span className="inline-flex h-11 items-center gap-2 rounded-full border border-dashed border-brand-200 bg-brand-50 px-4 text-sm font-semibold text-brand-700">
            <ShoppingBag className="h-4 w-4" />
            iFood em breve
          </span>
        </div>

        <MobileNavSheet />
      </div>
    </header>
  );
}
