import { NextResponse } from "next/server";
import { getSiteCounters, incrementVisitCount } from "@/lib/counters";

export const runtime = "nodejs";

export async function GET() {
  try {
    const counters = await getSiteCounters();
    return NextResponse.json(counters);
  } catch (error) {
    console.error("Error reading counters:", error);
    return NextResponse.json(
      { error: "Unable to load counters right now." },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    const counters = await incrementVisitCount();
    return NextResponse.json(counters);
  } catch (error) {
    console.error("Error updating visit counter:", error);
    return NextResponse.json(
      { error: "Unable to update counters right now." },
      { status: 500 },
    );
  }
}
