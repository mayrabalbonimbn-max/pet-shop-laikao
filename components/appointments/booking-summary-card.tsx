import { BalanceDueIndicator } from "@/components/status/balance-due-indicator";
import { PaymentOption } from "@/domains/appointments/types";
import { formatCurrency } from "@/lib/formatters";

export function BookingSummaryCard({
  serviceName,
  customerName,
  petName,
  dateLabel,
  totalCents,
  paymentOption,
  chargeNowCents,
  balanceCents
}: {
  serviceName?: string;
  customerName?: string;
  petName?: string;
  dateLabel?: string;
  totalCents?: number;
  paymentOption: PaymentOption;
  chargeNowCents?: number;
  balanceCents?: number;
}) {
  return (
    <aside className="surface-default p-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-ink-900">Resumo do agendamento</p>
        <p className="text-sm text-stone-500">Tudo o que o cliente precisa confirmar antes de avançar para o pagamento.</p>
      </div>
      <div className="mt-5 space-y-4 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-stone-500">Serviço</span>
          <span className="font-semibold text-ink-900">{serviceName ?? "Selecione um serviço"}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-stone-500">Tutor</span>
          <span className="font-semibold text-ink-900">{customerName ?? "Preencha os dados"}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-stone-500">Pet</span>
          <span className="font-semibold text-ink-900">{petName ?? "Selecione ou cadastre"}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-stone-500">Data</span>
          <span className="font-semibold text-ink-900">{dateLabel ?? "Escolha data e horário"}</span>
        </div>
        <div className="rounded-[var(--radius-md)] bg-brand-50 p-4">
          <div className="flex justify-between gap-3">
            <span className="text-stone-500">Total</span>
            <span className="font-heading text-lg font-semibold text-brand-700">
              {typeof totalCents === "number" ? formatCurrency(totalCents / 100) : "R$ 0,00"}
            </span>
          </div>
          <p className="mt-2 text-sm text-stone-500">
            {paymentOption === "deposit_50"
              ? "Reserva com sinal de 50% e saldo pendente visível para a operação."
              : "Pagamento integral preparado no próprio fluxo."}
          </p>
        </div>
        {typeof chargeNowCents === "number" ? (
          <div className="space-y-3">
            <div className="flex justify-between gap-3 text-sm">
              <span className="text-stone-500">Cobrança agora</span>
              <span className="font-semibold text-ink-900">{formatCurrency(chargeNowCents / 100)}</span>
            </div>
            {typeof balanceCents === "number" && balanceCents > 0 ? (
              <BalanceDueIndicator value={formatCurrency(balanceCents / 100)} />
            ) : null}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
