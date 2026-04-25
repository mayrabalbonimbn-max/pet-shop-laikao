"use client";

import { CalendarClock, CircleDollarSign } from "lucide-react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export function DetailDrawer({
  title,
  subtitle
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm">
          Ver detalhe
        </Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="eyebrow">Detalhe contextual</p>
            <h3 className="font-heading text-2xl font-semibold">{title}</h3>
            <p className="text-sm text-stone-500">{subtitle}</p>
          </div>
          <div className="grid gap-3">
            <div className="rounded-[var(--radius-md)] bg-brand-50 p-4">
              <div className="flex items-center gap-3">
                <CalendarClock className="h-4 w-4 text-brand-700" />
                <p className="text-sm font-semibold text-ink-900">Timeline operacional visível aqui</p>
              </div>
            </div>
            <div className="rounded-[var(--radius-md)] bg-brand-50 p-4">
              <div className="flex items-center gap-3">
                <CircleDollarSign className="h-4 w-4 text-brand-700" />
                <p className="text-sm font-semibold text-ink-900">Pagamentos, saldo pendente e notificações</p>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
