const steps = ["Serviço", "Pet", "Data", "Horário", "Resumo", "Pagamento"];

export function BookingStepper({ current = 3 }: { current?: number }) {
  return (
    <div className="surface-default overflow-x-auto p-4">
      <div className="flex min-w-max items-center gap-3">
        {steps.map((step, index) => {
          const stepIndex = index + 1;
          const state = stepIndex < current ? "done" : stepIndex === current ? "current" : "upcoming";

          return (
            <div key={step} className="flex items-center gap-3">
              <div
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
                  state === "done" && "bg-success-500 text-white",
                  state === "current" && "bg-brand-500 text-white",
                  state === "upcoming" && "bg-brand-100 text-brand-700"
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {stepIndex}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Etapa</p>
                <p className="text-sm font-medium text-ink-900">{step}</p>
              </div>
              {index < steps.length - 1 ? <div className="h-px w-8 bg-stone-100" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
