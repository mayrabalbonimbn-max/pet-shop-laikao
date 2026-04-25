import { DetailDrawer } from "@/components/admin/detail-drawer";
import { FilterBar } from "@/components/admin/filter-bar";
import { DataTable } from "@/components/data-display/data-table";
import { StockStatusBadge } from "@/components/catalog/stock-status-badge";
import { listCatalogAdminProducts } from "@/domains/catalog/queries";
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await listCatalogAdminProducts();
  const headers = ["Produto", "Categoria", "Preco", "Estoque", "Reserva", "Acao"];
  const rows = products.map((product) => [
    <div key={`${product.id}-name`}>
      <p className="font-semibold text-ink-900">{product.name}</p>
      <p className="text-xs text-stone-500">{product.slug}</p>
    </div>,
    <p key={`${product.id}-category`} className="text-sm text-stone-500">
      {product.categoryName}
    </p>,
    <div key={`${product.id}-price`}>
      <p className="font-semibold text-ink-900">{product.priceLabel}</p>
      <p className="text-xs text-stone-500">{product.sku}</p>
    </div>,
    <div key={`${product.id}-stock`} className="space-y-2">
      <StockStatusBadge status={product.stockStatus} />
      <p className="text-xs text-stone-500">Disponivel: {product.availableQuantity}</p>
    </div>,
    <p key={`${product.id}-reserved`} className="text-sm font-medium text-stone-500">
      {product.reservedQuantity} un.
    </p>,
    <DetailDrawer
      key={`${product.id}-action`}
      title={product.name}
      subtitle={`SKU ${product.sku} • ${product.availableQuantity} disponivel • ${product.reservedQuantity} reservado.`}
    />
  ]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="eyebrow">Produtos</p>
        <h1 className="page-title">Catalogo com leitura real de preco, estoque disponivel, reserva e status comercial.</h1>
      </div>
      <FilterBar placeholder="Buscar por produto, categoria ou SKU" primaryFilterLabel="Categoria" />
      <DataTable headers={headers} rows={rows} />
    </div>
  );
}
