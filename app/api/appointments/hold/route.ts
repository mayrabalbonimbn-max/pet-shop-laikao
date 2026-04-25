import { NextResponse } from "next/server";

import { createAppointmentHold } from "@/domains/appointments/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const appointment = await createAppointmentHold(body);

    return NextResponse.json(appointment);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create hold.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
