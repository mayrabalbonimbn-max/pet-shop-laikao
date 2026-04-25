import type { Route } from "next";
import Link from "next/link";

import { Box } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: Route;
}) {
  return (
    <div className="surface-default flex flex-col items-start gap-4 border border-stone-100 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <div className="rounded-[18px] bg-brand-100 p-3 text-brand-700">
        <Box className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <h3 className="font-heading text-2xl font-semibold text-ink-900">{title}</h3>
        <p className="max-w-xl text-sm leading-6 text-stone-500">{description}</p>
      </div>
      {actionLabel ? (
        actionHref ? (
          <Link href={actionHref}>
            <Button variant="secondary">{actionLabel}</Button>
          </Link>
        ) : (
          <Button variant="secondary">{actionLabel}</Button>
        )
      ) : null}
    </div>
  );
}
