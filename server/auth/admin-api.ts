import { NextResponse } from "next/server";

import { getAdminSessionUser } from "@/server/auth/admin-auth";

export async function requireAdminApiSession() {
  const user = await getAdminSessionUser();
  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ message: "Nao autenticado." }, { status: 401 })
    };
  }

  return { user, response: null };
}
