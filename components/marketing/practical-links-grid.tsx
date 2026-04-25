import Link from "next/link";
import { CalendarDays, ExternalLink, Instagram, MapPinned, MessageCircle, ShoppingBag } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const shortcutMeta = {
  whatsapp: {
    icon: MessageCircle,
    accent: "bg-success-500/10 text-success-500 border-success-500/20"
  },
  instagram: {
    icon: Instagram,
    accent: "bg-brand-100 text-brand-700 border-brand-200"
  },
  map: {
    icon: MapPinned,
    accent: "bg-info-500/10 text-info-500 border-info-500/20"
  },
  schedule: {
    icon: CalendarDays,
    accent: "bg-brand-50 text-brand-700 border-brand-200"
  },
  ifood: {
    icon: ShoppingBag,
    accent: "bg-sand-100 text-ink-900 border-stone-100"
  }
} as const;

export function PracticalLinksGrid({
  className,
  compact = false
}: {
  className?: string;
  compact?: boolean;
}) {
  const entries = Object.entries(siteConfig.quickLinks) as Array<
    [keyof typeof siteConfig.quickLinks, (typeof siteConfig.quickLinks)[keyof typeof siteConfig.quickLinks]]
  >;

  return (
    <div className={cn("grid gap-3 sm:grid-cols-2 xl:grid-cols-5", className)}>
      {entries.map(([key, item]) => {
        const Icon = shortcutMeta[key].icon;
        const isExternal = item.href.startsWith("http");
        const isPlaceholder = item.status === "placeholder";

        if (isPlaceholder) {
          return (
            <article
              key={key}
              className="rounded-[var(--radius-lg)] border border-dashed border-brand-200 bg-white px-4 py-4 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-[16px] border",
                    shortcutMeta[key].accent
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
                  Em breve
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold text-ink-900">{item.label}</p>
              <p className="mt-1 text-sm leading-6 text-stone-500">{item.description}</p>
            </article>
          );
        }

        const content = (
          <>
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-[16px] border transition-transform group-hover:scale-[1.03]",
                shortcutMeta[key].accent
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-ink-900">{item.label}</p>
              <ExternalLink className="h-4 w-4 text-brand-500" />
            </div>
            {!compact ? <p className="mt-1 text-sm leading-6 text-stone-500">{item.description}</p> : null}
          </>
        );

        const classNameValue =
          "group rounded-[var(--radius-lg)] border border-stone-100 bg-white px-4 py-4 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[var(--shadow-elevated)]";

        return isExternal ? (
          <a key={key} href={item.href} target="_blank" rel="noreferrer" className={classNameValue}>
            {content}
          </a>
        ) : (
          <Link key={key} href={item.href} className={classNameValue}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}
