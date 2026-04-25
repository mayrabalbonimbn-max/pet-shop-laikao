export const adminNavigation = [
  {
    title: "Visão Geral",
    items: [{ label: "Dashboard", href: "/admin/dashboard" }]
  },
  {
    title: "Operação",
    items: [
      { label: "Agendamentos", href: "/admin/agendamentos" },
      { label: "Pedidos", href: "/admin/pedidos" },
      { label: "Financeiro", href: "/admin/financeiro" },
      { label: "Notificações", href: "/admin/notificacoes" }
    ]
  },
  {
    title: "Catálogo",
    items: [{ label: "Produtos", href: "/admin/produtos" }]
  }
] as const;
