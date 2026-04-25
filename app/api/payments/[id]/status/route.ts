import { NextResponse } from "next/server";

import { getPaymentStatusAction } from "@/domains/payments/actions";

export const runtime = "nodejs";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const result = await getPaymentStatusAction(id, {
      providerPaymentId: searchParams.get("providerPaymentId") ?? undefined,
      providerCheckoutId: searchParams.get("providerCheckoutId") ?? undefined,
      sync: searchParams.get("sync") === "true"
    });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch payment status.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
