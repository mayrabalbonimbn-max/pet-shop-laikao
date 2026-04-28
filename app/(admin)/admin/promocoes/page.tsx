"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type PromotionRow = {
  id: string;
  title: string;
  slug: string;
  status: string;
  type: string;
  active: boolean;
  priority: number;
  startsAt?: string;
  endsAt?: string;
  ctaLabel?: string;
  ctaLink?: string;
  campaignTag?: string;
  highlightedOnHome: boolean;
};

const emptyForm = {
  id: "",
  title: "",
  slug: "",
  status: "draft",
  type: "campaign",
  active: true,
  priority: 0,
  startsAt: "",
  endsAt: "",
  ctaLabel: "",
  ctaLink: "",
  campaignTag: "",
  highlightedOnHome: false
};

export default function AdminPromotionsPage() {
  const [rows, setRows] = useState<PromotionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState<string | null>(null);

  async function loadRows() {
    setLoading(true);
    const response = await fetch("/api/admin/promotions", { cache: "no-store" });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.message ?? "Falha ao carregar promocoes.");
      return;
    }
    setRows(data);
  }

  useEffect(() => {
    void loadRows();
  }, []);

  const sortedRows = useMemo(
    () => [...rows].sort((a, b) => Number(b.active) - Number(a.active) || b.priority - a.priority),
    [rows]
  );

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      id: form.id || undefined,
      slug: form.slug,
      title: form.title,
      type: form.type,
      status: form.status,
      active: form.active,
      priority: form.priority,
      startsAt: form.startsAt ? new Date(form.startsAt).toISOString() : undefined,
      endsAt: form.endsAt ? new Date(form.endsAt).toISOString() : undefined,
      ctaLabel: form.ctaLabel || undefined,
      ctaLink: form.ctaLink || undefined,
      campaignTag: form.campaignTag || undefined,
      highlightedOnHome: form.highlightedOnHome,
      items: [],
      banners: []
    };

    const response = await fetch("/api/admin/promotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage(data.message ?? "Falha ao salvar promocao.");
      return;
    }

    setMessage("Promocao salva com sucesso.");
    setForm(emptyForm);
    await loadRows();
  }

  async function toggleActive(id: string, active: boolean) {
    const response = await fetch(`/api/admin/promotions/${id}/toggle`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active })
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message ?? "Falha ao alterar status.");
      return;
    }
    setRows((current) => current.map((row) => (row.id === id ? { ...row, active: data.active } : row)));
  }

  function loadForEdit(row: PromotionRow) {
    setForm({
      id: row.id,
      title: row.title,
      slug: row.slug,
      status: row.status,
      type: row.type,
      active: row.active,
      priority: row.priority,
      startsAt: row.startsAt ? row.startsAt.slice(0, 16) : "",
      endsAt: row.endsAt ? row.endsAt.slice(0, 16) : "",
      ctaLabel: row.ctaLabel ?? "",
      ctaLink: row.ctaLink ?? "",
      campaignTag: row.campaignTag ?? "",
      highlightedOnHome: row.highlightedOnHome
    });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="eyebrow">Promocoes</p>
        <h1 className="page-title">Campanhas reais com prioridade, validade, CTA e status operacional.</h1>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="surface-default p-5">
          <h2 className="font-heading text-xl font-semibold text-ink-900">Promocoes cadastradas</h2>
          {loading ? (
            <p className="mt-4 text-sm text-stone-500">Carregando...</p>
          ) : (
            <div className="mt-4 space-y-3">
              {sortedRows.map((row) => (
                <article key={row.id} className="rounded-xl border border-stone-100 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink-900">{row.title}</p>
                      <p className="text-xs text-stone-500">
                        /{row.slug} • {row.type} • {row.status}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => loadForEdit(row)} className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-semibold">
                        Editar
                      </button>
                      <button
                        onClick={() => toggleActive(row.id, !row.active)}
                        className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-semibold"
                      >
                        {row.active ? "Desativar" : "Ativar"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <form onSubmit={onSubmit} className="surface-default space-y-4 p-5">
          <h2 className="font-heading text-xl font-semibold text-ink-900">{form.id ? "Editar promocao" : "Nova promocao"}</h2>
          <input value={form.id} type="hidden" readOnly />
          <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Titulo" className="w-full rounded-xl border border-stone-200 px-3 py-2.5" />
          <input required value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} placeholder="slug-promocao" className="w-full rounded-xl border border-stone-200 px-3 py-2.5" />
          <div className="grid gap-3 sm:grid-cols-2">
            <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="rounded-xl border border-stone-200 px-3 py-2.5">
              <option value="campaign">Campanha</option><option value="product">Produto</option><option value="service">Servico</option><option value="mixed">Misto</option>
            </select>
            <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="rounded-xl border border-stone-200 px-3 py-2.5">
              <option value="draft">Rascunho</option><option value="scheduled">Agendada</option><option value="active">Ativa</option><option value="paused">Pausada</option><option value="expired">Expirada</option>
            </select>
          </div>
          <input type="number" value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: Number(e.target.value) }))} placeholder="Prioridade" className="w-full rounded-xl border border-stone-200 px-3 py-2.5" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input type="datetime-local" value={form.startsAt} onChange={(e) => setForm((f) => ({ ...f, startsAt: e.target.value }))} className="rounded-xl border border-stone-200 px-3 py-2.5" />
            <input type="datetime-local" value={form.endsAt} onChange={(e) => setForm((f) => ({ ...f, endsAt: e.target.value }))} className="rounded-xl border border-stone-200 px-3 py-2.5" />
          </div>
          <input value={form.ctaLabel} onChange={(e) => setForm((f) => ({ ...f, ctaLabel: e.target.value }))} placeholder="Texto do CTA" className="w-full rounded-xl border border-stone-200 px-3 py-2.5" />
          <input value={form.ctaLink} onChange={(e) => setForm((f) => ({ ...f, ctaLink: e.target.value }))} placeholder="Link do CTA" className="w-full rounded-xl border border-stone-200 px-3 py-2.5" />
          <label className="flex items-center gap-2 text-sm font-medium text-ink-900"><input type="checkbox" checked={form.highlightedOnHome} onChange={(e) => setForm((f) => ({ ...f, highlightedOnHome: e.target.checked }))} /> Destacar na home</label>
          <label className="flex items-center gap-2 text-sm font-medium text-ink-900"><input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} /> Promocao ativa</label>
          {message ? <p className="text-sm text-brand-700">{message}</p> : null}
          <button disabled={saving} className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white">{saving ? "Salvando..." : "Salvar promocao"}</button>
        </form>
      </div>
    </div>
  );
}
