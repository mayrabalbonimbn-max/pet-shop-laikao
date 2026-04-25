import { NextResponse } from "next/server";

import { applyCouponToCart } from "@/domains/orders/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cart = await applyCouponToCart(body);
    return NextResponse.json(cart);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to apply coupon.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
