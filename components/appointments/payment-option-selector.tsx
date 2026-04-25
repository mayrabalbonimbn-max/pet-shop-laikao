"use client";

import { PaymentOption } from "@/domains/appointments/types";
import { paymentOptionLabels } from "@/domains/appointments/constants";
import { formatCurrency } from "@/lib/formatters";

export function PaymentOptionSelector({
  value,
  totalCents,
  onChange
}: {
  value: PaymentOption;
  totalCents?: number;
  onChange: (value: PaymentOption) => void;
}) {
  const half = typeof totalCents === "number" ? Math.ceil(totalCents / 2) : undefined;

  const options: Array<{ value: PaymentOption; amountLabel: string }> = [
    {
      value: "deposit_50",
      amountLabel: half ? formatCurrency(half / 100) : "R$ 0,00"
    },
    {
      value: "full_100",
      amountLabel: totalCents ? formatCurrency(totalCents / 100) : "R$ 0,00"
    }
  ];

  return (
    <div className="grid gap-4">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={[
            "rounded-[var(--radius-lg)] border p-5 text-left transition-colors",
            value === option.value
              ? "border-brand-500 bg-brand-50 shadow-[var(--shadow-soft)]"
              : "border-stone-100 bg-white hover:border-brand-200"
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-ink-900">{paymentOptionLabels[option.value]}</p>
              <p className="mt-2 text-sm text-stone-500">
                {option.value === "deposit_50"
                  ? "Reserva o horário agora e mantém saldo pendente para leitura operacional."
                  : "Quita o atendimento no mesmo fluxo, com confirmação total."}
              </p>
            </div>
            <span className="font-heading text-xl font-semibold text-brand-700">{option.amountLabel}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
