"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { adminNavigation } from "@/config/admin";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export function AdminMobileNavSheet() {
  const pathname = usePathname();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary" size="icon" className="lg:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent side="left" className="bg-brand-950 text-white">
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="eyebrow">Laikão Admin</p>
            <h2 className="font-heading text-2xl font-semibold text-white">Navegação operacional</h2>
          </div>

          {adminNavigation.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">{group.title}</p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-[var(--radius-md)] px-4 py-3 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-brand-500 text-white"
                        : "text-white/75 hover:bg-white/6 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
