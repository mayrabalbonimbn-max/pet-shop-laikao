"use client";

import { AppointmentService } from "@/domains/appointments/types";
import { formatCurrency } from "@/lib/formatters";

export function ServiceSelector({
  services,
  selectedServiceId,
  onSelect
}: {
  services: AppointmentService[];
  selectedServiceId?: string;
  onSelect: (serviceId: string) => void;
}) {
  return (
    <div className="grid gap-3">
      {services.map((service) => {
        const selected = service.id === selectedServiceId;
        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(service.id)}
            className={[
              "rounded-[var(--radius-lg)] border p-4 text-left transition-colors",
              selected ? "border-brand-500 bg-brand-50 shadow-[var(--shadow-soft)]" : "border-stone-100 bg-white hover:border-brand-200"
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="font-semibold text-ink-900">{service.name}</p>
                <p className="text-sm text-stone-500">{service.description}</p>
              </div>
              <div className="text-right">
                <p className="font-heading text-lg font-semibold text-brand-700">{formatCurrency(service.priceCents / 100)}</p>
                <p className="text-xs text-stone-500">{service.durationMinutes} min</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
