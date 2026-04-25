export function getServerHealth() {
  return {
    status: "structural",
    integrations: "not-configured"
  } as const;
}
