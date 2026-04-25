import { NextResponse } from "next/server";

import { createAppointmentBalancePayment } from "@/domains/payments/actions";

export const runtime = "nodejs";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json().catch(() => ({}));
    const result = await createAppointmentBalancePayment(id, body);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create appointment balance payment.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
