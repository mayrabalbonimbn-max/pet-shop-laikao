import { getEnvOrDefault, getOptionalEnv } from "@/lib/env";

export function getAdminHost() {
  return getOptionalEnv("ADMIN_HOST")?.toLowerCase() ?? "admin.petlaikao.com.br";
}

export function getPublicHost() {
  return getOptionalEnv("PUBLIC_HOST")?.toLowerCase() ?? "petlaikao.com.br";
}

export function isAdminHost(hostname: string) {
  return hostname.toLowerCase() === getAdminHost();
}

export function getAppBaseUrl() {
  return getEnvOrDefault("APP_URL", "http://localhost:3000");
}
