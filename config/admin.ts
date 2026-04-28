export const adminNavigation = [
  {
    title: "Visao Geral",
    items: [{ label: "Dashboard", href: "/admin/dashboard" }]
  },
  {
    title: "Operacao",
    items: [
      { label: "Agendamentos", href: "/admin/agendamentos" },
      { label: "Pedidos", href: "/admin/pedidos" },
      { label: "Promocoes", href: "/admin/promocoes" },
      { label: "Financeiro", href: "/admin/financeiro" },
      { label: "Notificacoes", href: "/admin/notificacoes" }
    ]
  },
  {
    title: "Catalogo",
    items: [{ label: "Produtos", href: "/admin/produtos" }]
  }
] as const;
