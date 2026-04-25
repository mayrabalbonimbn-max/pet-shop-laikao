"use client";

import { AvailabilityDay, CalendarView } from "@/domains/appointments/types";

export function AvailabilityCalendar({
  monthLabel,
  days,
  view,
  onSelectDate
}: {
  monthLabel: string;
  days: AvailabilityDay[];
  view: CalendarView;
  onSelectDate: (dateKey: string) => void;
}) {
  const columns = view === "month" ? "grid-cols-7" : view === "week" ? "grid-cols-7" : "grid-cols-1";

  return (
    <div className="surface-default p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink-900">{monthLabel}</p>
          <p className="text-sm text-stone-500">Disponibilidade real calculada a partir de regras, bloqueios e ocupação.</p>
        </div>
        <div className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          {view === "month" ? "Visão mensal" : view === "week" ? "Visão semanal" : "Visão diária"}
        </div>
      </div>
      <div className={`mt-5 grid gap-2 ${columns}`}>
        {days.map((day) => (
          <button
            key={day.dateKey}
            type="button"
            onClick={() => onSelectDate(day.dateKey)}
            className={[
              "rounded-[var(--radius-md)] px-3 py-3 text-left transition-colors",
              day.state === "available" && "bg-brand-50 text-brand-700",
              day.state === "limited" && "bg-warning-500/12 text-warning-500",
              day.state === "blocked" && "bg-stone-100 text-stone-500",
              day.state === "selected" && "bg-brand-500 text-white"
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className={view === "day" ? "flex items-center justify-between" : "space-y-1"}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">{day.weekdayLabel}</p>
                <p className="text-sm font-semibold">{day.dayLabel}</p>
              </div>
              <p className="text-xs opacity-80">{day.availableSlots} slots</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
