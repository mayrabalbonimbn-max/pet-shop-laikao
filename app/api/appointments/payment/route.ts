import { NextResponse } from "next/server";

export async function POST(request: Request) {
  void request;
  return NextResponse.json(
    {
      ok: false,
      message: "A simulação antiga foi substituída pelo fluxo real em /api/appointments/:id/payment-intent."
    },
    { status: 410 }
  );
}
