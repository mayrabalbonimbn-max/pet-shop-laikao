import { CouponApplicationResult, CouponRecord } from "@/domains/catalog/types";
import { CartRecord } from "@/domains/orders/types";

export function validateCartStock(cart: CartRecord) {
  const issues = cart.items.flatMap((item) => {
    const itemIssues: string[] = [];

    if (item.availableQuantity < item.quantity) {
      itemIssues.push(`${item.productName} nao tem estoque suficiente para essa quantidade.`);
    }

    if (item.priceChanged) {
      itemIssues.push(`${item.productName} teve atualizacao de valor e o carrinho foi recalculado.`);
    }

    return itemIssues;
  });

  return {
    valid: issues.length === 0,
    issues
  };
}

export function calculateCouponDiscount(
  subtotalCents: number,
  coupon: CouponRecord | null
): CouponApplicationResult | null {
  if (!coupon || !coupon.active) {
    return null;
  }

  const now = Date.now();
  if (coupon.startsAt && new Date(coupon.startsAt).getTime() > now) {
    return null;
  }

  if (coupon.endsAt && new Date(coupon.endsAt).getTime() < now) {
    return null;
  }

  if (coupon.usageLimit !== undefined && coupon.usageCount >= coupon.usageLimit) {
    return null;
  }

  if (coupon.minSubtotalCents !== undefined && subtotalCents < coupon.minSubtotalCents) {
    return null;
  }

  const discountCents =
    coupon.discountType === "fixed"
      ? Math.min(coupon.discountValue, subtotalCents)
      : Math.floor((subtotalCents * coupon.discountValue) / 100);

  return {
    couponId: coupon.id,
    code: coupon.code,
    discountCents
  };
}

export function calculateCartTotals({
  items,
  coupon
}: Pick<CartRecord, "items"> & { coupon?: CouponRecord | null }) {
  const subtotalCents = items.reduce((total, item) => total + item.lineTotalCents, 0);
  const couponDiscount = calculateCouponDiscount(subtotalCents, coupon ?? null);
  const discountCents = couponDiscount?.discountCents ?? 0;

  return {
    subtotalCents,
    discountCents,
    totalCents: Math.max(subtotalCents - discountCents, 0),
    couponApplication: couponDiscount
  };
}
