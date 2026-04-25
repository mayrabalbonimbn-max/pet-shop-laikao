export const publicRoutes = {
  home: "/",
  services: "/servicos",
  schedule: "/agenda",
  products: "/produtos",
  contact: "/contato",
  cart: "/carrinho",
  checkout: "/checkout"
} as const;

export const adminRoutes = {
  dashboard: "/admin/dashboard",
  appointments: "/admin/agendamentos",
  orders: "/admin/pedidos",
  products: "/admin/produtos",
  finance: "/admin/financeiro",
  notifications: "/admin/notificacoes"
} as const;
