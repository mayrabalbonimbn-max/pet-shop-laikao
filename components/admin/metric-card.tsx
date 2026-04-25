import { MetricItem } from "@/domains/admin/types";

import { cn } from "@/lib/utils";

const toneMap = {
  neutral: "bg-white",
  success: "bg-success-500/7",
  warning: "bg-warning-500/8",
  danger: "bg-error-500/8"
} as const;

export function MetricCard({ item }: { item: MetricItem }) {
  return (
    <article
      className={cn(
        "rounded-[var(--radius-lg)] border border-stone-100 p-5 shadow-[var(--shadow-soft)]",
        toneMap[item.tone ?? "neutral"]
      )}
    >
      <p className="text-sm font-medium text-stone-500">{item.label}</p>
      <p className="mt-3 font-heading text-3xl font-semibold text-ink-900">{item.value}</p>
      <p className="mt-2 text-sm text-stone-500">{item.helper}</p>
    </article>
  );
}
