const items = [
  {
    title: "Agenda séria",
    description: "Reserva com pagamento integrado, visão clara de disponibilidade e confirmação confiável."
  },
  {
    title: "Loja preparada para crescer",
    description: "Catálogo modular com categorias, estoque, promoções e checkout com cara de operação real."
  },
  {
    title: "Admin operacional",
    description: "Centro de comando pensado para uso diário, com decisões visuais que reduzem atrito."
  }
];

export function TrustBlock() {
  return (
    <section className="content-container py-12 sm:py-16">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="eyebrow">Confianca e clareza</p>
          <h2 className="section-title">Menos peso visual, mais leitura, mais informacao pratica onde a cliente realmente olha.</h2>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="surface-default border-brand-100/80 bg-white p-6">
            <p className="eyebrow">Diferencial</p>
            <h3 className="mt-4 font-heading text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-500">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
