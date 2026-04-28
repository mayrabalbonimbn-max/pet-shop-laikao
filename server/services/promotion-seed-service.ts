import { db } from "@/server/db/client";

declare global {
  // eslint-disable-next-line no-var
  var __laikaoPromotionSeeded: boolean | undefined;
}

export async function ensurePromotionSeedData() {
  if (global.__laikaoPromotionSeeded) {
    return;
  }

  const existingCount = await db.promotion.count();
  if (existingCount === 0) {
    await db.promotion.create({
      data: {
        id: "promo-boasvindas",
        slug: "boas-vindas-laikao",
        title: "Boas-vindas Laikao",
        description: "Campanha inicial para ligar a area publica de promocoes ao admin.",
        type: "campaign",
        status: "active",
        priority: 100,
        highlightedOnHome: true,
        ctaLabel: "Ver promocoes",
        ctaLink: "/promocoes",
        campaignTag: "launch",
        active: true,
        banners: {
          create: {
            id: "promobn-boasvindas",
            title: "Promocoes da semana",
            subtitle: "Ofertas em produtos e servicos",
            placement: "home_strip",
            displayOrder: 0,
            active: true,
            ctaLabel: "Conferir",
            ctaLink: "/promocoes"
          }
        }
      }
    });
  }

  global.__laikaoPromotionSeeded = true;
}
