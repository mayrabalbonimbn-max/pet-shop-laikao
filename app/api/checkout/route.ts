import { NextRequest, NextResponse } from "next/server";

import { cartKeySchema } from "@/domains/orders/schema";
import { getCheckoutPreview } from "@/domains/orders/queries";

export async function GET(request: NextRequest) {
  try {
    const parsed = cartKeySchema.parse({
      cartKey: request.nextUrl.searchParams.get("cartKey")
    });

    const preview = await getCheckoutPreview(parsed.cartKey);
    return NextResponse.json(preview);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid checkout query.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
