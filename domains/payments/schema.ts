import { z } from "zod";

export const paymentMethodSchema = z.enum(["pix", "credit_card"]);

export const createAppointmentPaymentIntentSchema = z.object({
  method: paymentMethodSchema.optional()
});

export const createOrderPaymentIntentSchema = z.object({
  method: paymentMethodSchema.optional()
});

export const createAppointmentBalancePaymentSchema = z.object({
  method: paymentMethodSchema
});

export const paymentStatusQuerySchema = z.object({
  providerPaymentId: z.string().optional(),
  providerCheckoutId: z.string().optional(),
  sync: z.coerce.boolean().optional().default(false)
});
