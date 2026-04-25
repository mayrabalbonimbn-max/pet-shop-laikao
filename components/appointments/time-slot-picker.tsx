"use client";

import { TimeSlotOption } from "@/domains/appointments/types";

export function TimeSlotPicker({
  slots,
  selectedStartAt,
  onSelect
}: {
  slots: TimeSlotOption[];
  selectedStartAt?: string;
  onSelect: (startAt: string) => void;
}) {
  return (
    <div className="surface-default p-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-ink-900">Horários disponíveis</p>
        <p className="text-sm text-stone-500">O slot só segue adiante se a disponibilidade estiver realmente livre.</p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => {
          const isSelected = selectedStartAt === slot.startAt || slot.state === "selected";
          return (
            <button
              key={slot.startAt}
              type="button"
              disabled={slot.state === "blocked"}
              onClick={() => onSelect(slot.startAt)}
              className={[
                "rounded-[var(--radius-md)] border px-4 py-3 text-left text-sm font-semibold transition-colors disabled:cursor-not-allowed",
                slot.state === "available" && "border-brand-100 bg-brand-50 text-brand-700",
                slot.state === "limited" && "border-warning-500/20 bg-warning-500/8 text-warning-500",
                slot.state === "blocked" && "border-stone-100 bg-stone-100 text-stone-500",
                isSelected && "border-brand-500 bg-brand-500 text-white"
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {slot.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
