"use client";

import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/config/site";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir conversa no WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex h-14 items-center gap-3 rounded-full bg-success-500 px-4 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition-all hover:brightness-110 sm:right-6 sm:bottom-6"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/16">
        <MessageCircle className="h-5 w-5" />
      </span>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
