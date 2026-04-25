import { SuccessBanner } from "@/components/feedback/success-banner";

export default function CheckoutSuccessPage() {
  return (
    <div className="content-container py-16">
      <SuccessBanner
        title="Pedido confirmado"
        description="Esta tela já existe para suportar a etapa de confirmação final quando a integração de pagamentos entrar."
      />
    </div>
  );
}
