import { stockStatusLabels } from "@/domains/catalog/constants";
import { StockStatus } from "@/domains/catalog/types";

import { Badge } from "@/components/ui/badge";

const toneByStatus: Record<StockStatus, "success" | "warning" | "danger" | "info"> = {
  in_stock: "success",
  low_stock: "warning",
  out_of_stock: "danger",
  reserved: "info"
};

export function StockStatusBadge({ status }: { status: StockStatus }) {
  return <Badge tone={toneByStatus[status]}>{stockStatusLabels[status]}</Badge>;
}
