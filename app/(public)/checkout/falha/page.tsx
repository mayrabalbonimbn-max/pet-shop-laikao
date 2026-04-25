import { ErrorState } from "@/components/feedback/error-state";

export default function CheckoutFailurePage() {
  return (
    <div className="content-container py-16">
      <ErrorState
        title="Pagamento não concluído"
        description="Esta tela estrutural já prepara o fluxo de falha e retry do checkout."
      />
    </div>
  );
}
