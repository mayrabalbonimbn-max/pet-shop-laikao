import { NextRequest, NextResponse } from "next/server";

import { availabilityQuerySchema } from "@/domains/appointments/schema";
import { getAvailabilityData } from "@/domains/appointments/queries";

export async function GET(request: NextRequest) {
  try {
    const parsed = availabilityQuerySchema.parse({
      serviceId: request.nextUrl.searchParams.get("serviceId"),
      selectedDate: request.nextUrl.searchParams.get("selectedDate"),
      view: request.nextUrl.searchParams.get("view")
    });

    return NextResponse.json(await getAvailabilityData(parsed));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid availability query.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
