import { createPasswordHash } from "@/server/auth/admin-auth";
import { db } from "@/server/db/client";

declare global {
  // eslint-disable-next-line no-var
  var __laikaoAdminSeeded: boolean | undefined;
}

const defaultAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() || "admin@petlaikao.com.br";
const defaultAdminPassword = process.env.ADMIN_PASSWORD?.trim() || "Trocar@123";

export async function ensureAdminSeedData() {
  if (global.__laikaoAdminSeeded) {
    return;
  }

  const password = createPasswordHash(defaultAdminPassword);
  await db.adminUser.upsert({
    where: { email: defaultAdminEmail },
    update: {},
    create: {
      id: "admin-root",
      name: "Gestao Laikao",
      email: defaultAdminEmail,
      role: "super_admin",
      passwordHash: password.hash,
      passwordSalt: password.salt,
      active: true
    }
  });

  global.__laikaoAdminSeeded = true;
}
