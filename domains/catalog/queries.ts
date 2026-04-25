import { formatCurrency } from "@/lib/formatters";
import {
  getProductRecordBySlug,
  listAdminProductRows,
  listCategoryRecords,
  listProductRecords
} from "@/server/repositories/commerce-repository";
import { ProductPreview } from "@/domains/catalog/types";

function computeProductPreview(product: Awaited<ReturnType<typeof listProductRecords>>[number]): ProductPreview {
  const firstVariant = product.variants[0];
  const available = firstVariant?.availableQuantity ?? 0;
  const reserved = firstVariant?.reservedQuantity ?? 0;

  const stockStatus =
    available <= 0 && reserved > 0
      ? "reserved"
      : available <= 0
        ? "out_of_stock"
        : available <= 3
          ? "low_stock"
          : reserved > 0
            ? "reserved"
            : "in_stock";

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.categoryName ?? "Sem categoria",
    priceLabel: formatCurrency((firstVariant?.priceCents ?? 0) / 100),
    stockStatus,
    imageLabel: product.imageLabel,
    featured: product.featured
  };
}

export async function listCatalogProducts() {
  const products = await listProductRecords();
  return products.map(computeProductPreview);
}

export async function getCatalogProductDetail(slug: string) {
  return getProductRecordBySlug(slug);
}

export async function listCatalogCategories() {
  return listCategoryRecords();
}

export async function listCatalogAdminProducts() {
  return listAdminProductRows();
}
