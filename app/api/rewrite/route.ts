import { NextResponse } from "next/server";
import { getClientIp, enforceRewriteRateLimit } from "@/lib/rate-limit";
import { rewriteForLinkedIn } from "@/lib/openai";
import { rewriteRequestSchema } from "@/lib/validations";
import { incrementRewriteCount } from "@/lib/counters";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const parsed = rewriteRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request. Check your text, tone, and language." },
      { status: 400 },
    );
  }

  try {
    const rateLimit = await enforceRewriteRateLimit(getClientIp(request));

    if (!rateLimit.success) {
      return NextResponse.json(
        { code: rateLimit.code, error: rateLimit.message },
        { status: rateLimit.status },
      );
    }

    const result = await rewriteForLinkedIn(parsed.data);
    await incrementRewriteCount();

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in /api/rewrite:", error);
    return NextResponse.json(
      { error: "Unable to rewrite the text right now." },
      { status: 500 },
    );
  }
}
