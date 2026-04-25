import { NextResponse } from "next/server";

import { processPaymentWebhookAction } from "@/domains/payments/actions";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const rawBody = await request.text();

  try {
    await processPaymentWebhookAction({
      rawBody,
      headers: Object.fromEntries(request.headers.entries()),
      query: Object.fromEntries(url.searchParams.entries())
    });

    return NextResponse.json({ success: true, message: null });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
