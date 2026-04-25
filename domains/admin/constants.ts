import { MetricItem } from "@/domains/admin/types";

export const dashboardMetrics: MetricItem[] = [
  {
    label: "Agendamentos de hoje",
    value: "18",
    helper: "4 com saldo pendente",
    tone: "warning"
  },
  {
    label: "Pedidos novos",
    value: "7",
    helper: "2 aguardando separação",
    tone: "neutral"
  },
  {
    label: "Recebimentos do dia",
    value: "R$ 2.480",
    helper: "Pix e cartão conciliados",
    tone: "success"
  },
  {
    label: "Falhas críticas",
    value: "3",
    helper: "pagamento e notificação",
    tone: "danger"
  }
];
