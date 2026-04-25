import { NextResponse } from "next/server";

import { createOrderFromCart } from "@/domains/orders/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createOrderFromCart(body);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create order from cart.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
