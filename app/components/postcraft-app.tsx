"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Clipboard,
  Loader2,
  RefreshCcw,
  Sparkles,
  Wand2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { APP_NAME, MAX_TEXT_LENGTH, type Language, tones } from "@/lib/constants";
import { translations, type LegalKey } from "@/lib/i18n";
import { rewriteRequestSchema, type RewriteRequest } from "@/lib/validations";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Select } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { LegalModal } from "@/app/components/legal-modal";

const formSchema = rewriteRequestSchema.extend({
  acceptedTerms: z.boolean().refine((value) => value),
});

type FormValues = z.infer<typeof formSchema>;

type RewriteResponse = {
  code?: "cooldown" | "daily_limit";
  result?: string;
  error?: string;
};

export function PostCraftApp() {
  const [result, setResult] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeLegalKey, setActiveLegalKey] = useState<LegalKey | null>(null);
  const [lastSuccessfulRequestKey, setLastSuccessfulRequestKey] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      text: "",
      tone: "professional",
      language: "es",
      acceptedTerms: false,
    },
  });

  const text = watch("text") || "";
  const tone = watch("tone");
  const language = watch("language");
  const acceptedTerms = watch("acceptedTerms");
  const t = translations[language as Language];

  const currentRequestKey = useMemo(
    () => JSON.stringify({ text: text.trim(), tone, language }),
    [language, text, tone],
  );

  const isDuplicateSuccessfulRequest =
    Boolean(result) && lastSuccessfulRequestKey === currentRequestKey;
  const isSubmitDisabled =
    isSubmitting || !isValid || !acceptedTerms || isDuplicateSuccessfulRequest;
  const activeLegalContent = activeLegalKey
    ? t.legalContent[activeLegalKey]
    : null;

  async function onSubmit(values: FormValues) {
    setErrorMessage("");
    setStatusMessage("");
    setCopied(false);

    if (!values.acceptedTerms) {
      setErrorMessage(t.errors.termsRequired);
      return;
    }

    if (isDuplicateSuccessfulRequest) {
      setErrorMessage(t.errors.duplicate);
      return;
    }

    const payload: RewriteRequest = {
      text: values.text,
      tone: values.tone,
      language: values.language,
    };

    try {
      const response = await fetch("/api/rewrite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as RewriteResponse;

      if (!response.ok || !data.result) {
        if (response.status === 429) {
          setErrorMessage(
            data.code === "daily_limit" ? t.errors.dailyLimit : t.errors.rateLimit,
          );
          return;
        }

        setErrorMessage(t.errors.generic);
        return;
      }

      setResult(data.result);
      setStatusMessage(t.success);
      setLastSuccessfulRequestKey(currentRequestKey);
    } catch {
      setErrorMessage(t.errors.generic);
    }
  }

  async function copyResult() {
    if (!result) {
      return;
    }

    await navigator.clipboard.writeText(result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function clearForm() {
    reset({
      text: "",
      tone: "professional",
      language,
      acceptedTerms: false,
    });
    setResult("");
    setStatusMessage("");
    setErrorMessage("");
    setCopied(false);
    setLastSuccessfulRequestKey("");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.14),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] text-slate-950">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-6 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-lg font-bold tracking-tight">{APP_NAME}</p>
            <p className="hidden text-xs font-medium text-slate-500 sm:block">
              LinkedIn rewrite studio
            </p>
          </div>
        </div>

        <label className="grid gap-1 text-sm font-medium text-slate-700">
          <span className="sr-only">{t.languageLabel}</span>
          <Select {...register("language")} aria-label={t.languageLabel}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </Select>
        </label>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-8 px-5 pb-10 pt-2 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <section className="space-y-6">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/75 px-3 py-1 text-xs font-semibold uppercase text-indigo-700 shadow-sm">
              <Wand2 className="h-3.5 w-3.5" aria-hidden="true" />
              {APP_NAME}
            </p>
            <h1 className="max-w-2xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">
              {t.tagline}
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              {t.legalIntro}
            </p>
          </div>

          <form
            className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-soft backdrop-blur sm:p-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-5">
              <div className="grid gap-2">
                <label
                  className="text-sm font-semibold text-slate-800"
                  htmlFor="text"
                >
                  {t.inputLabel}
                </label>
                <Textarea
                  id="text"
                  maxLength={MAX_TEXT_LENGTH}
                  placeholder={t.inputPlaceholder}
                  {...register("text")}
                />
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-500">
                    {t.characterCount(text.length, MAX_TEXT_LENGTH)}
                  </span>
                  {errors.text ? (
                    <span role="alert" className="font-medium text-rose-600">
                      {t.errors.invalidText}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-semibold text-slate-800"
                  htmlFor="tone"
                >
                  {t.toneLabel}
                </label>
                <Select id="tone" {...register("tone")}>
                  {tones.map((toneOption) => (
                    <option key={toneOption} value={toneOption}>
                      {t.tones[toneOption]}
                    </option>
                  ))}
                </Select>
              </div>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                <Checkbox {...register("acceptedTerms")} />
                <span>{t.termsCheckbox}</span>
              </label>
              {errors.acceptedTerms ? (
                <p role="alert" className="text-sm font-medium text-rose-600">
                  {t.errors.termsRequired}
                </p>
              ) : null}

              {errorMessage ? (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
                >
                  {errorMessage}
                </p>
              ) : null}

              {statusMessage ? (
                <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  {statusMessage}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button className="w-full sm:w-auto" disabled={isSubmitDisabled} type="submit">
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Wand2 className="h-4 w-4" aria-hidden="true" />
                  )}
                  {isSubmitting ? t.rewriting : t.rewrite}
                </Button>
                <Button
                  className="w-full sm:w-auto"
                  type="button"
                  variant="secondary"
                  onClick={clearForm}
                >
                  <RefreshCcw className="h-4 w-4" aria-hidden="true" />
                  {t.clear}
                </Button>
              </div>
            </div>
          </form>
        </section>

        <section
          aria-live="polite"
          className="rounded-2xl border border-white/70 bg-slate-950 p-4 text-white shadow-soft sm:p-6"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">{t.resultLabel}</h2>
            <Button
              disabled={!result}
              type="button"
              variant="secondary"
              onClick={copyResult}
            >
              {copied ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Clipboard className="h-4 w-4" aria-hidden="true" />
              )}
              {copied ? t.copied : t.copy}
            </Button>
          </div>
          <div className="min-h-[360px] rounded-2xl border border-white/10 bg-white/[0.06] p-5">
            {result ? (
              <p className="whitespace-pre-wrap text-base leading-8 text-slate-50">
                {result}
              </p>
            ) : (
              <p className="text-base leading-7 text-slate-400">{t.emptyResult}</p>
            )}
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-4 border-t border-slate-200 px-5 py-6 text-sm text-slate-600 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p>{APP_NAME}</p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Legal">
          {(Object.keys(t.legalLinks) as LegalKey[]).map((key) => (
            <button
              key={key}
              className="font-medium text-slate-600 underline-offset-4 hover:text-indigo-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              type="button"
              onClick={() => setActiveLegalKey(key)}
            >
              {t.legalLinks[key]}
            </button>
          ))}
        </nav>
      </footer>

      {activeLegalContent ? (
        <LegalModal
          open={Boolean(activeLegalKey)}
          paragraphs={activeLegalContent.paragraphs}
          title={activeLegalContent.title}
          onClose={() => setActiveLegalKey(null)}
        />
      ) : null}
    </div>
  );
}
