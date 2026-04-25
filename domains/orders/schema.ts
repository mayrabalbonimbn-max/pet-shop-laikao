import { z } from "zod";

export const cartKeySchema = z.object({
  cartKey: z.string().trim().min(3).max(80)
});

export const addCartItemSchema = z.object({
  cartKey: z.string().trim().min(3).max(80),
  variantId: z.string().trim().min(1),
  quantity: z.number().int().min(1).max(20)
});

export const updateCartItemSchema = z.object({
  cartKey: z.string().trim().min(3).max(80),
  itemId: z.string().trim().min(1),
  quantity: z.number().int().min(1).max(20)
});

export const removeCartItemSchema = z.object({
  cartKey: z.string().trim().min(3).max(80),
  itemId: z.string().trim().min(1)
});

export const applyCouponSchema = z.object({
  cartKey: z.string().trim().min(3).max(80),
  code: z.string().trim().min(1).max(40)
});

export const createOrderFromCartSchema = z.object({
  cartKey: z.string().trim().min(3).max(80),
  customerName: z.string().trim().min(3).max(120),
  customerPhone: z.string().trim().min(8).max(30),
  customerEmail: z.string().trim().email().optional().or(z.literal("")),
  notes: z.string().trim().max(400).optional().or(z.literal(""))
});

export const orderTransitionSchema = z.object({
  event: z.enum([
    "create_payment_intent",
    "payment_confirmed",
    "payment_failed",
    "payment_expired",
    "start_processing",
    "mark_ready_for_pickup",
    "mark_shipped",
    "mark_delivered",
    "cancel"
  ])
});
