import { getEnvOrDefault, getOptionalEnv } from "@/lib/env";

const appUrl = getEnvOrDefault("APP_URL", "http://localhost:3000");
const webhookPublicUrl = getOptionalEnv("INFINITEPAY_WEBHOOK_PUBLIC_URL");
const handle = getOptionalEnv("INFINITEPAY_HANDLE");
const apiBaseUrl = getEnvOrDefault("INFINITEPAY_API_BASE_URL", "https://api.infinitepay.io");

export const paymentsConfig = {
  provider: "infinitepay",
  mode: handle ? "integrated_checkout" : "disabled",
  methods: ["pix", "credit_card"],
  currency: "BRL",
  appUrl,
  handle,
  apiBaseUrl,
  webhookPublicUrl,
  webhookSecret: getOptionalEnv("INFINITEPAY_WEBHOOK_SECRET")
} as const;

export function isPaymentProviderConfigured() {
  return Boolean(paymentsConfig.handle);
}

export function getPaymentProviderConfigurationError() {
  return "INFINITEPAY_HANDLE nao configurado. O checkout integrado da InfinitePay esta pronto, mas ainda sem a conta vinculada.";
}
