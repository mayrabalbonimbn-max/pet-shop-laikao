export const publicRoutes = {
  home: "/",
  services: "/servicos",
  schedule: "/agenda",
  products: "/produtos",
  promotions: "/promocoes",
  contact: "/contato",
  cart: "/carrinho",
  checkout: "/checkout"
} as const;

export const adminRoutes = {
  dashboard: "/admin/dashboard",
  appointments: "/admin/agendamentos",
  orders: "/admin/pedidos",
  products: "/admin/produtos",
  promotions: "/admin/promocoes",
  finance: "/admin/financeiro",
  notifications: "/admin/notificacoes"
} as const;
