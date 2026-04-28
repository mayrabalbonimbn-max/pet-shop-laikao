import { NextRequest, NextResponse } from "next/server";

import { upsertPromotionAction } from "@/domains/promotions/actions";
import { listAdminPromotions } from "@/domains/promotions/queries";
import { requireAdminApiSession } from "@/server/auth/admin-api";

export async function GET() {
  const { response } = await requireAdminApiSession();
  if (response) return response;

  const promotions = await listAdminPromotions();
  return NextResponse.json(promotions);
}

export async function POST(request: NextRequest) {
  const { response } = await requireAdminApiSession();
  if (response) return response;

  try {
    const body = await request.json();
    const promotion = await upsertPromotionAction(body);
    return NextResponse.json(promotion);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao salvar promocao.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
