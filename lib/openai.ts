import OpenAI from "openai";
import Groq from "groq-sdk";
import type { RewriteRequest } from "@/lib/validations";

type AIProvider = "openai" | "groq";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const toneInstructions: Record<RewriteRequest["tone"], string> = {
  professional: "professional, clear, credible, and polished",
  inspiring: "inspiring, optimistic, and grounded",
  friendly: "warm, approachable, and human",
  executive: "concise, strategic, and executive-ready",
  storytelling: "narrative-driven, vivid, and still concise",
};

const languageInstructions: Record<RewriteRequest["language"], string> = {
  es: "Spanish",
  en: "English",
};

function getAvailableProvider(): AIProvider | null {
  const preferredProvider = process.env.AI_PROVIDER as AIProvider | undefined;

  if (preferredProvider === "openai" && process.env.OPENAI_API_KEY) {
    return "openai";
  }

  if (preferredProvider === "groq" && process.env.GROQ_API_KEY) {
    return "groq";
  }

  if (process.env.GROQ_API_KEY) {
    return "groq";
  }

  if (process.env.OPENAI_API_KEY) {
    return "openai";
  }

  return null;
}

export async function rewriteForLinkedIn(payload: RewriteRequest) {
  const provider = getAvailableProvider();

  if (!provider) {
    throw new Error("No AI provider is configured. Please set OPENAI_API_KEY or GROQ_API_KEY.");
  }

  const systemPrompt =
    "Rewrite the following phrase as if it were a professional LinkedIn post.\n\nRequirements:\n- Keep the original meaning completely intact.\n- Write the entire result only in the language requested by the user. If the user requests Spanish, respond only in Spanish. If the user requests English, respond only in English.\n- Make it sound overly corporate, professional, and slightly exaggerated in a funny but believable way.\n- Use modern LinkedIn-style language, productivity vocabulary, and business buzzwords.\n- Add structure like a real LinkedIn post.\n- Keep it concise and natural.\n- Always end with a final summary line that includes the original phrase exactly as provided by the user.\n- If the requested language is Spanish, the final line must be: \"En resumen... {original phrase}\".\n- If the requested language is English, the final line must be: \"In summary... {original phrase}\".\n- Do not invent achievements, metrics, employers, credentials, dates, certifications, clients, outcomes, or claims that are not in the original text.\n- Return only the rewritten post, with no preamble or explanation.";

  const userPrompt = [
    `Output language: ${languageInstructions[payload.language]}`,
    `Important: The final LinkedIn post must be written entirely in ${languageInstructions[payload.language]}.`,
    `Final summary line format: ${
      payload.language === "es" ? "En resumen..." : "In summary..."
    } ${payload.text}`,
    `Tone style: ${toneInstructions[payload.tone]}`,
    "Original phrase to rewrite:",
    payload.text,
  ].join("\n\n");

  let rewrittenText: string | null | undefined;

  if (provider === "groq") {
    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: 0.45,
      max_tokens: 260,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    rewrittenText = completion.choices[0]?.message.content?.trim();
  } else {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.45,
      max_tokens: 260,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    rewrittenText = completion.choices[0]?.message.content?.trim();
  }

  if (!rewrittenText) {
    throw new Error(`${provider.toUpperCase()} returned an empty response.`);
  }

  return rewrittenText;
}
