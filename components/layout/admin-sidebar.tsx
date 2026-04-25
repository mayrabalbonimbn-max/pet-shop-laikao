"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNavigation } from "@/config/admin";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 border-r border-white/10 bg-brand-950 text-white lg:flex lg:flex-col">
      <div className="border-b border-white/10 px-6 py-6">
        <p className="font-heading text-xl font-semibold text-white">Laikão Admin</p>
        <p className="mt-1 text-sm text-white/60">Operação, agenda, loja e financeiro.</p>
      </div>
      <div className="flex-1 space-y-8 overflow-y-auto px-4 py-6">
        {adminNavigation.map((group) => (
          <div key={group.title} className="space-y-3">
            <p className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              {group.title}
            </p>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-[var(--radius-md)] px-3 py-3 text-sm font-medium transition-colors",
                      active ? "bg-brand-500 text-white" : "text-white/70 hover:bg-white/6 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
