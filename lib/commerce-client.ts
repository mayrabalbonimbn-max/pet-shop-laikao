"use client";

import { CartView, CheckoutPreview } from "@/domains/orders/types";
import { PaymentStatusView } from "@/domains/payments/types";

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    const message = typeof data?.message === "string" ? data.message : "Nao foi possivel concluir a operacao.";
    throw new Error(message);
  }

  return data as T;
}

export async function fetchCart(cartKey: string) {
  const response = await fetch(`/api/cart?cartKey=${encodeURIComponent(cartKey)}`, {
    method: "GET",
    cache: "no-store"
  });

  return parseResponse<CartView>(response);
}

export async function addCartItem(input: {
  cartKey: string;
  variantId: string;
  quantity: number;
}) {
  const response = await fetch("/api/cart/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  return parseResponse<CartView>(response);
}

export async function updateCartItem(input: {
  cartKey: string;
  itemId: string;
  quantity: number;
}) {
  const response = await fetch(`/api/cart/items/${input.itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cartKey: input.cartKey,
      quantity: input.quantity
    })
  });

  return parseResponse<CartView>(response);
}

export async function removeCartItem(input: {
  cartKey: string;
  itemId: string;
}) {
  const response = await fetch(`/api/cart/items/${input.itemId}?cartKey=${encodeURIComponent(input.cartKey)}`, {
    method: "DELETE"
  });

  return parseResponse<CartView>(response);
}

export async function applyCartCoupon(input: {
  cartKey: string;
  code: string;
}) {
  const response = await fetch("/api/cart/apply-coupon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  return parseResponse<CartView>(response);
}

export async function fetchCheckoutPreview(cartKey: string) {
  const response = await fetch(`/api/checkout?cartKey=${encodeURIComponent(cartKey)}`, {
    method: "GET",
    cache: "no-store"
  });

  return parseResponse<CheckoutPreview | null>(response);
}

export async function createOrderFromCart(input: {
  cartKey: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
}) {
  const response = await fetch("/api/orders/from-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  return parseResponse<{ orderId: string; orderNumber: string }>(response);
}

export async function createOrderPaymentIntent(input: {
  orderId: string;
  method?: "pix" | "credit_card";
}) {
  const response = await fetch(`/api/orders/${input.orderId}/payment-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      method: input.method ?? "pix"
    })
  });

  return parseResponse<{
    payment: {
      id: string;
      checkoutUrl?: string;
      status: string;
      amountLabel: string;
    };
    order: {
      id: string;
      orderNumber: string;
      status: string;
      paymentStatus: string;
      fulfillmentStatus: string;
      inventoryState: string;
    };
  }>(response);
}

export async function fetchPaymentStatus(input: {
  paymentId: string;
  providerPaymentId?: string;
  providerCheckoutId?: string;
  sync?: boolean;
}) {
  const search = new URLSearchParams();
  if (input.providerPaymentId) {
    search.set("providerPaymentId", input.providerPaymentId);
  }
  if (input.providerCheckoutId) {
    search.set("providerCheckoutId", input.providerCheckoutId);
  }
  if (input.sync) {
    search.set("sync", "true");
  }

  const response = await fetch(`/api/payments/${input.paymentId}/status?${search.toString()}`, {
    method: "GET",
    cache: "no-store"
  });

  return parseResponse<PaymentStatusView>(response);
}
