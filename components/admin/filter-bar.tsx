import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function FilterBar({
  placeholder = "Buscar",
  primaryFilterLabel = "Status"
}: {
  placeholder?: string;
  primaryFilterLabel?: string;
}) {
  return (
    <div className="surface-default flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
      <Input placeholder={placeholder} className="lg:flex-1" />
      <div className="grid gap-3 sm:grid-cols-2 lg:w-[26rem]">
        <Select
          placeholder={primaryFilterLabel}
          options={[
            { label: "Todos", value: "all" },
            { label: "Pendentes", value: "pending" },
            { label: "Pagos", value: "paid" }
          ]}
        />
        <Button variant="secondary">
          <SlidersHorizontal className="h-4 w-4" />
          Mais filtros
        </Button>
      </div>
    </div>
  );
}
