import { NextResponse } from "next/server";

import { getAgendaBootstrapData } from "@/domains/appointments/queries";

export async function GET() {
  return NextResponse.json(await getAgendaBootstrapData());
}
