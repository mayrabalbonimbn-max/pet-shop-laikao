import { NextRequest, NextResponse } from "next/server";

import { authenticateAdmin, createAdminSession } from "@/server/auth/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim() ?? "";
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json({ message: "Email e senha sao obrigatorios." }, { status: 400 });
    }

    const authResult = await authenticateAdmin(email, password);
    if (!authResult.ok) {
      return NextResponse.json({ message: "Credenciais invalidas." }, { status: 401 });
    }

    await createAdminSession(authResult.user.id);
    return NextResponse.json({ user: authResult.user });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao autenticar.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
