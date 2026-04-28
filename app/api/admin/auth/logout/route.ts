import { NextResponse } from "next/server";

import { clearAdminSession } from "@/server/auth/admin-auth";

export async function POST() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
