"use client";

import Link from "next/link";
import { CalendarDays, Instagram, MapPinned, Menu, MessageCircle, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { siteConfig } from "@/config/site";
import { publicRoutes } from "@/lib/routes";

const items = [
  { label: "Home", href: publicRoutes.home },
  { label: "Servicos", href: publicRoutes.services },
  { label: "Agenda", href: publicRoutes.schedule },
  { label: "Produtos", href: publicRoutes.products },
  { label: "Promocoes", href: publicRoutes.promotions },
  { label: "Contato", href: publicRoutes.contact },
  { label: "Carrinho", href: publicRoutes.cart }
];

const practicalLinks = [
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

export function MobileNavSheet() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary" size="icon" className="lg:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent side="right" className="bg-white p-0 text-ink-900">
        <div className="flex h-full flex-col">
          <div className="border-b border-brand-100 bg-brand-50 px-6 py-6">
            <p className="eyebrow">Laikao</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-ink-900">Atalhos praticos e navegacao principal</h2>
            <p className="mt-2 text-sm leading-6 text-stone-500">{siteConfig.addressLine}</p>
          </div>

          <div className="space-y-8 px-6 py-6">
            <nav className="flex flex-col gap-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[var(--radius-md)] border border-stone-100 bg-white px-4 py-3 text-base font-medium text-ink-900 hover:border-brand-200 hover:bg-brand-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-ink-900">Contato e redes</p>
              <div className="grid gap-3">
                {practicalLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-[var(--radius-md)] border border-stone-100 bg-white px-4 py-3 text-sm font-semibold text-ink-900 hover:border-brand-200 hover:bg-brand-50"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-brand-100 text-brand-700">
                        <Icon className="h-4 w-4" />
                      </span>
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-auto border-t border-stone-100 px-6 py-5">
            <div className="grid gap-3">
              <Link
                href={siteConfig.quickLinks.schedule.href}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-brand-500 px-5 text-base font-semibold text-white"
              >
                <CalendarDays className="h-4 w-4" />
                Agendar agora
              </Link>
              <div className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-dashed border-brand-200 bg-brand-50 px-5 text-base font-semibold text-brand-700">
                <ShoppingBag className="h-4 w-4" />
                iFood em breve
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
