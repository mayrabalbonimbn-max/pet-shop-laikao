"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    setLoading(false);

    if (!response.ok) {
      setError("Nao foi possivel entrar. Verifique e-mail e senha.");
      return;
    }

    router.replace("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-brand-950 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-[85vh] w-full max-w-5xl items-center">
        <div className="grid w-full gap-6 rounded-[32px] border border-brand-300/25 bg-white/95 p-6 shadow-[var(--shadow-medium)] sm:p-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="eyebrow">Pet Shop Laikao</p>
            <h1 className="font-heading text-3xl font-semibold text-ink-900 sm:text-4xl">Admin operacional</h1>
            <p className="text-sm leading-6 text-stone-600">
              Acesso protegido para agendamentos, pedidos, financeiro e promocoes.
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4 rounded-[24px] border border-stone-100 bg-white p-5 shadow-[var(--shadow-soft)]">
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium text-ink-900">E-mail</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                className="w-full rounded-xl border border-stone-200 px-3 py-2.5 outline-none ring-brand-500 transition focus:border-brand-400 focus:ring-2"
              />
            </label>
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium text-ink-900">Senha</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                required
                className="w-full rounded-xl border border-stone-200 px-3 py-2.5 outline-none ring-brand-500 transition focus:border-brand-400 focus:ring-2"
              />
            </label>
            {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-65"
            >
              {loading ? "Entrando..." : "Entrar no admin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
