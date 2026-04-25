import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.01em]",
  {
    variants: {
      tone: {
        neutral: "bg-stone-100 text-stone-500",
        success: "bg-success-500/12 text-success-500",
        warning: "bg-warning-500/12 text-warning-500",
        danger: "bg-error-500/12 text-error-500",
        info: "bg-info-500/12 text-info-500",
        brand: "bg-brand-500/12 text-brand-700"
      }
    },
    defaultVariants: {
      tone: "neutral"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ tone }), className)} {...props} />;
}
