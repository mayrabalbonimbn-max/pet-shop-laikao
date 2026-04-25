import { NextRequest, NextResponse } from "next/server";

import { cartKeySchema } from "@/domains/orders/schema";
import { getCartView } from "@/domains/orders/queries";
import { getOrCreateCartAction } from "@/domains/orders/actions";

export async function GET(request: NextRequest) {
  try {
    const parsed = cartKeySchema.parse({
      cartKey: request.nextUrl.searchParams.get("cartKey")
    });

    const cart = (await getCartView(parsed.cartKey)) ?? (await getOrCreateCartAction(parsed.cartKey));
    return NextResponse.json(cart);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid cart query.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
