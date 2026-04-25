const CART_KEY_STORAGE = "laikao_cart_key";

function generateCartKey() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `cart-${crypto.randomUUID()}`;
  }

  return `cart-${Math.random().toString(36).slice(2, 10)}`;
}

export function getStoredCartKey() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(CART_KEY_STORAGE);
}

export function ensureStoredCartKey() {
  if (typeof window === "undefined") {
    return null;
  }

  const existing = getStoredCartKey();
  if (existing) {
    return existing;
  }

  const nextKey = generateCartKey();
  window.localStorage.setItem(CART_KEY_STORAGE, nextKey);
  return nextKey;
}

export function clearStoredCartKey() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(CART_KEY_STORAGE);
}

