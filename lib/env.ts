export function getOptionalEnv(name: string) {
  const value = process.env[name];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function getEnvOrDefault(name: string, fallback: string) {
  return getOptionalEnv(name) ?? fallback;
}
