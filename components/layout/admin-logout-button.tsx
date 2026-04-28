"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-[var(--radius-md)] border border-stone-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-stone-700 transition-colors hover:bg-stone-100"
    >
      Sair
    </button>
  );
}
