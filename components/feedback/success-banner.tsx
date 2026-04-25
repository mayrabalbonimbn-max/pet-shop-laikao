import { CheckCircle2 } from "lucide-react";

export function SuccessBanner({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-success-500/15 bg-success-500/8 p-4 text-success-500">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5" />
        <div className="space-y-1">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-sm text-stone-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
