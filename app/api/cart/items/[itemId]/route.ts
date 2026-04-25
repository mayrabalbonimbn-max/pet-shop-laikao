import { NextRequest, NextResponse } from "next/server";

import { removeCartItem, updateCartItemQuantity } from "@/domains/orders/actions";

export async function PATCH(request: NextRequest, context: { params: Promise<{ itemId: string }> }) {
  try {
    const { itemId } = await context.params;
    const body = await request.json();
    const cart = await updateCartItemQuantity({
      ...body,
      itemId
    });

    return NextResponse.json(cart);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update cart item.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ itemId: string }> }) {
  try {
    const { itemId } = await context.params;
    const cartKey = request.nextUrl.searchParams.get("cartKey");
    const cart = await removeCartItem({
      cartKey,
      itemId
    });

    return NextResponse.json(cart);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to remove cart item.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
