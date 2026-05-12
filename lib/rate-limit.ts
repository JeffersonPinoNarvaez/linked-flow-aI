import { upstashCommand } from "@/lib/upstash";

type RateLimitResult =
  | { success: true }
  | {
      success: false;
      status: 429;
      code: "cooldown" | "daily_limit";
      message: string;
    };

const DEFAULT_DAILY_REWRITE_LIMIT = 10;
const DEFAULT_COOLDOWN_SECONDS = 30;

function getNonNegativeIntegerEnv(name: string, fallback: number) {
  const value = Number(process.env[name]);

  if (!Number.isInteger(value) || value < 0) {
    return fallback;
  }

  return value;
}

const DAILY_REWRITE_LIMIT = getNonNegativeIntegerEnv(
  "REWRITE_DAILY_LIMIT",
  DEFAULT_DAILY_REWRITE_LIMIT,
);
const COOLDOWN_SECONDS = getNonNegativeIntegerEnv(
  "REWRITE_COOLDOWN_SECONDS",
  DEFAULT_COOLDOWN_SECONDS,
);

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  return forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
}

export async function enforceRewriteRateLimit(ip: string): Promise<RateLimitResult> {
  const identity = ip.replace(/[^a-zA-Z0-9:.:-]/g, "_");
  const dailyKey = `postcraft:rewrite:daily:${identity}`;
  const cooldownKey = `postcraft:rewrite:cooldown:${identity}`;

  const cooldownActive =
    COOLDOWN_SECONDS > 0
      ? await upstashCommand<string | null>(["GET", cooldownKey])
      : null;

  if (cooldownActive) {
    return {
      success: false,
      status: 429,
      code: "cooldown",
      message: `Please wait ${COOLDOWN_SECONDS} seconds between rewrites.`,
    };
  }

  const dailyCount =
    DAILY_REWRITE_LIMIT > 0
      ? await upstashCommand<number>(["INCR", dailyKey])
      : 0;

  if (dailyCount === 1) {
    await upstashCommand<number>(["EXPIRE", dailyKey, 60 * 60 * 24]);
  }

  if (DAILY_REWRITE_LIMIT > 0 && dailyCount > DAILY_REWRITE_LIMIT) {
    return {
      success: false,
      status: 429,
      code: "daily_limit",
      message: "Daily rewrite limit reached.",
    };
  }

  if (COOLDOWN_SECONDS > 0) {
    await upstashCommand<string>(["SET", cooldownKey, "1", "EX", COOLDOWN_SECONDS]);
  }

  return { success: true };
}
