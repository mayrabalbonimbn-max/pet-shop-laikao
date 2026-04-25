import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import localtunnel from "localtunnel";

const cwd = process.cwd();
const envPath = path.join(cwd, ".env.local");
const port = Number(process.env.WEBHOOK_TUNNEL_PORT ?? 3000);

function upsertEnvValue(contents, key, value) {
  const line = `${key}="${value}"`;
  const pattern = new RegExp(`^${key}=.*$`, "m");

  if (pattern.test(contents)) {
    return contents.replace(pattern, line);
  }

  return `${contents.trimEnd()}\n${line}\n`;
}

const tunnel = await localtunnel({ port });
const webhookUrl = `${tunnel.url}/api/webhooks/payments`;

let envContents = "";
if (fs.existsSync(envPath)) {
  envContents = fs.readFileSync(envPath, "utf8");
}

envContents = upsertEnvValue(envContents, "INFINITEPAY_WEBHOOK_PUBLIC_URL", webhookUrl);
fs.writeFileSync(envPath, envContents, "utf8");

console.log(`Tunnel URL: ${tunnel.url}`);
console.log(`Webhook URL: ${webhookUrl}`);
console.log(`Updated: ${envPath}`);
console.log("Keep this process running while validating InfinitePay webhooks.");

tunnel.on("close", () => {
  console.log("Webhook tunnel closed.");
});

process.on("SIGINT", async () => {
  tunnel.close();
  process.exit(0);
});

await new Promise(() => {});
