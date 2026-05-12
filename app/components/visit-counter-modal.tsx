"use client";

import { BarChart3, FileText, Users, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/ui/button";

type VisitCounterLabels = {
  title: string;
  description: string;
  totalVisits: string;
  rewrittenPhrases: string;
  loading: string;
  error: string;
};

type VisitCounterModalProps = {
  counters: {
    totalVisits: number;
    rewrittenPhrases: number;
  } | null;
  error: boolean;
  formatter: Intl.NumberFormat;
  labels: VisitCounterLabels;
  loading: boolean;
  open: boolean;
  onClose: () => void;
};

export function VisitCounterModal({
  counters,
  error,
  formatter,
  labels,
  loading,
  open,
  onClose,
}: VisitCounterModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="w-[min(92vw,620px)] rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-soft backdrop:bg-slate-950/55"
      onCancel={onClose}
      onClose={onClose}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <BarChart3 className="h-5 w-5 text-indigo-600" aria-hidden="true" />
          {labels.title}
        </h2>
        <Button
          aria-label="Close modal"
          size="icon"
          type="button"
          variant="ghost"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-5 px-6 py-5">
        <p className="text-sm leading-6 text-slate-600">{labels.description}</p>

        {loading ? (
          <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            {labels.loading}
          </p>
        ) : null}

        {error ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {labels.error}
          </p>
        ) : null}

        {!loading && !error && counters ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
              <Users className="mb-4 h-5 w-5 text-indigo-700" aria-hidden="true" />
              <p className="text-sm font-medium text-indigo-900">{labels.totalVisits}</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {formatter.format(counters.totalVisits)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <FileText className="mb-4 h-5 w-5 text-slate-700" aria-hidden="true" />
              <p className="text-sm font-medium text-slate-700">
                {labels.rewrittenPhrases}
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {formatter.format(counters.rewrittenPhrases)}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
