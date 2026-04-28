import { Bell, Search } from "lucide-react";

import { AdminMobileNavSheet } from "@/components/layout/admin-mobile-nav-sheet";
import { AdminLogoutButton } from "@/components/layout/admin-logout-button";
import { getAdminSessionUser } from "@/server/auth/admin-auth";

export async function AdminTopbar() {
  const user = await getAdminSessionUser();

  return (
    <div className="sticky top-0 z-30 border-b border-stone-100 bg-sand-50/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <AdminMobileNavSheet />
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[var(--radius-md)] border border-stone-100 bg-white px-4 py-3 shadow-[var(--shadow-soft)]">
            <Search className="h-4 w-4 shrink-0 text-stone-500" />
            <p className="truncate text-sm text-stone-500">Buscar por cliente, pet, pedido, agendamento ou pagamento</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-stone-100 bg-white p-3 text-stone-500 shadow-[var(--shadow-soft)]">
            <Bell className="h-4 w-4" />
          </button>
          <div className="hidden rounded-[var(--radius-md)] border border-stone-100 bg-white px-4 py-2 shadow-[var(--shadow-soft)] sm:block">
            <p className="text-sm font-semibold text-ink-900">{user?.name ?? "Gestao"}</p>
            <p className="text-xs text-stone-500">{user?.role ?? "operacoes"}</p>
          </div>
          <AdminLogoutButton />
        </div>
      </div>
    </div>
  );
}
