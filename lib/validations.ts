import { z } from "zod";
import {
  languages,
  MAX_TEXT_LENGTH,
  MIN_TEXT_LENGTH,
  tones,
} from "@/lib/constants";

export const rewriteRequestSchema = z.object({
  text: z
    .string()
    .trim()
    .min(MIN_TEXT_LENGTH)
    .max(MAX_TEXT_LENGTH)
    .refine((value) => value.replace(/\s/g, "").length >= MIN_TEXT_LENGTH),
  tone: z.enum(tones),
  language: z.enum(languages),
});

export type RewriteRequest = z.infer<typeof rewriteRequestSchema>;
