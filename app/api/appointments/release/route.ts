import { NextResponse } from "next/server";

import { releaseAppointmentHold } from "@/domains/appointments/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const appointment = await releaseAppointmentHold(body);

    return NextResponse.json(appointment);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to release hold.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
