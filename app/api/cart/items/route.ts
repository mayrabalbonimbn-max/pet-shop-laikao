import { NextResponse } from "next/server";

import { addItemToCart } from "@/domains/orders/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cart = await addItemToCart(body);
    return NextResponse.json(cart);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to add item to cart.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
