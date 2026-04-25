import { NextResponse } from "next/server";

import { transitionOrderAction } from "@/domains/orders/actions";

export const runtime = "nodejs";

export async function POST(request: Request, context: { params: Promise<unknown> }) {
  try {
    const { id } = (await context.params) as { id: string };
    const body = await request.json().catch(() => ({}));
    const result = await transitionOrderAction(id, body);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to transition order.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
