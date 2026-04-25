import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ErrorState({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="surface-critical flex flex-col items-start gap-4 p-6 sm:p-8">
      <div className="rounded-full bg-error-500/12 p-3 text-error-500">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <h3 className="font-heading text-lg font-semibold text-ink-900">{title}</h3>
        <p className="max-w-xl text-sm text-stone-500">{description}</p>
      </div>
      <Button variant="secondary">Tentar novamente</Button>
    </div>
  );
}
