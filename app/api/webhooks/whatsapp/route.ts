import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: "Webhook de WhatsApp ainda não implementado nesta etapa estrutural."
    },
    { status: 501 }
  );
}
