import {
  CategoryRecord,
  CouponRecord,
  InventoryMovementType,
  ProductPreview,
  ProductStatus,
  StockStatus
} from "@/domains/catalog/types";

export const stockStatusLabels: Record<StockStatus, string> = {
  in_stock: "Em estoque",
  low_stock: "Estoque baixo",
  out_of_stock: "Sem estoque",
  reserved: "Reservado"
};

export const productStatusLabels: Record<ProductStatus, string> = {
  draft: "Rascunho",
  active: "Ativo",
  out_of_stock: "Sem estoque",
  archived: "Arquivado"
};

export const inventoryMovementLabels: Record<InventoryMovementType, string> = {
  reserve: "Reserva",
  release: "Liberacao",
  decrement: "Baixa",
  adjustment: "Ajuste",
  restock: "Reposicao"
};

export const categorySeed: CategoryRecord[] = [
  {
    id: "CAT-BANHO",
    name: "Banho",
    slug: "banho",
    description: "Produtos para banho, cuidado e beleza.",
    active: true,
    displayOrder: 1
  },
  {
    id: "CAT-PASSEIO",
    name: "Passeio",
    slug: "passeio",
    description: "Itens para rotina de passeio.",
    active: true,
    displayOrder: 2
  },
  {
    id: "CAT-DESCANSO",
    name: "Descanso",
    slug: "descanso",
    description: "Produtos para conforto e descanso.",
    active: true,
    displayOrder: 3
  }
];

export const productSeed = [
  {
    id: "PROD-01",
    categoryId: "CAT-BANHO",
    slug: "shampoo-hidratante-pelos-brilhantes",
    name: "Shampoo Hidratante Pelos Brilhantes",
    description: "Shampoo premium para rotina de banho com leitura comercial clara e boa margem para crescimento do catalogo.",
    status: "active" as ProductStatus,
    featured: true,
    imageLabel: "Shampoo premium roxo",
    active: true,
    variants: [
      {
        id: "VAR-01",
        slug: "shampoo-hidratante-pelos-brilhantes-500ml",
        title: "500ml",
        sku: "LAI-SHAMPOO-500",
        priceCents: 4290,
        compareAtCents: 4990,
        stockQuantity: 18,
        reservedQuantity: 0,
        active: true
      }
    ]
  },
  {
    id: "PROD-02",
    categoryId: "CAT-PASSEIO",
    slug: "guia-smart-refletiva-urban",
    name: "Guia Smart Refletiva Urban",
    description: "Guia refletiva para passeio com foco em seguranca, visual urbano e praticidade.",
    status: "active" as ProductStatus,
    featured: false,
    imageLabel: "Guia refletiva",
    active: true,
    variants: [
      {
        id: "VAR-02",
        slug: "guia-smart-refletiva-urban-unica",
        title: "Tamanho unico",
        sku: "LAI-GUIA-URBAN",
        priceCents: 8990,
        compareAtCents: undefined,
        stockQuantity: 5,
        reservedQuantity: 1,
        active: true
      }
    ]
  },
  {
    id: "PROD-03",
    categoryId: "CAT-DESCANSO",
    slug: "cama-nuvem-conforto-max",
    name: "Cama Nuvem Conforto Max",
    description: "Produto premium de descanso com valor percebido alto e boa apresentacao no site.",
    status: "active" as ProductStatus,
    featured: true,
    imageLabel: "Cama premium",
    active: true,
    variants: [
      {
        id: "VAR-03",
        slug: "cama-nuvem-conforto-max-m",
        title: "Tamanho M",
        sku: "LAI-CAMA-M",
        priceCents: 22990,
        compareAtCents: 25990,
        stockQuantity: 2,
        reservedQuantity: 1,
        active: true
      }
    ]
  }
] as const;

export const couponSeed: CouponRecord[] = [
  {
    id: "CPN-LAIKAO10",
    code: "LAIKAO10",
    description: "Cupom promocional inicial da loja.",
    discountType: "percentage",
    discountValue: 10,
    minSubtotalCents: 10000,
    active: true,
    usageCount: 0
  }
];

export const mockProducts: ProductPreview[] = [
  {
    id: "PROD-01",
    slug: "shampoo-hidratante-pelos-brilhantes",
    name: "Shampoo Hidratante Pelos Brilhantes",
    category: "Banho",
    priceLabel: "R$ 42,90",
    stockStatus: "in_stock",
    imageLabel: "Shampoo premium roxo",
    featured: true
  },
  {
    id: "PROD-02",
    slug: "guia-smart-refletiva-urban",
    name: "Guia Smart Refletiva Urban",
    category: "Passeio",
    priceLabel: "R$ 89,90",
    stockStatus: "low_stock",
    imageLabel: "Guia refletiva"
  },
  {
    id: "PROD-03",
    slug: "cama-nuvem-conforto-max",
    name: "Cama Nuvem Conforto Max",
    category: "Descanso",
    priceLabel: "R$ 229,90",
    stockStatus: "reserved",
    imageLabel: "Cama premium"
  }
];
