import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

const toneMap = {
  info: {
    wrapper: "border-info-500/15 bg-info-500/5 text-info-500",
    icon: Info
  },
  warning: {
    wrapper: "border-warning-500/15 bg-warning-500/5 text-warning-500",
    icon: TriangleAlert
  },
  danger: {
    wrapper: "border-error-500/15 bg-error-500/5 text-error-500",
    icon: AlertCircle
  },
  success: {
    wrapper: "border-success-500/15 bg-success-500/5 text-success-500",
    icon: CheckCircle2
  }
} as const;

export function InlineNotice({
  tone = "info",
  title,
  description
}: {
  tone?: keyof typeof toneMap;
  title: string;
  description: string;
}) {
  const Icon = toneMap[tone].icon;

  return (
    <div className={cn("rounded-[var(--radius-lg)] border p-4", toneMap[tone].wrapper)}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-4 w-4" />
        <div className="space-y-1">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-sm text-stone-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
