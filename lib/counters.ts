import { upstashCommand } from "@/lib/upstash";

const VISITS_KEY = "linked-flow:counter:visits";
const REWRITES_KEY = "linked-flow:counter:rewrites";

export type SiteCounters = {
  totalVisits: number;
  rewrittenPhrases: number;
};

export async function getSiteCounters(): Promise<SiteCounters> {
  const [totalVisits, rewrittenPhrases] = await Promise.all([
    upstashCommand<string | null>(["GET", VISITS_KEY]),
    upstashCommand<string | null>(["GET", REWRITES_KEY]),
  ]);

  return {
    totalVisits: Number(totalVisits || 0),
    rewrittenPhrases: Number(rewrittenPhrases || 0),
  };
}

export async function incrementVisitCount(): Promise<SiteCounters> {
  await upstashCommand<number>(["INCR", VISITS_KEY]);
  return getSiteCounters();
}

export async function incrementRewriteCount(): Promise<void> {
  await upstashCommand<number>(["INCR", REWRITES_KEY]);
}
