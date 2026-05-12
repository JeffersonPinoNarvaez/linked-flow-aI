export const APP_NAME = "linked flow AI";

export const MAX_TEXT_LENGTH = 900;
export const MIN_TEXT_LENGTH = 3;

export const languages = ["es", "en"] as const;
export const tones = [
  "professional",
  "inspiring",
  "friendly",
  "executive",
  "storytelling",
] as const;

export type Language = (typeof languages)[number];
export type Tone = (typeof tones)[number];
