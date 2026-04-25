import { WalletCards } from "lucide-react";

export function BalanceDueIndicator({
  value,
  compact = false
}: {
  value: string;
  compact?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-warning-500/10 px-3 py-1.5 text-warning-500">
      <WalletCards className="h-4 w-4" />
      <span className={compact ? "text-xs font-semibold" : "text-sm font-semibold"}>
        Saldo pendente: {value}
      </span>
    </div>
  );
}
