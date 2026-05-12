"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/ui/button";

type LegalModalProps = {
  open: boolean;
  title: string;
  paragraphs: string[];
  onClose: () => void;
};

export function LegalModal({ open, title, paragraphs, onClose }: LegalModalProps) {
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
        <h2 className="text-lg font-semibold">{title}</h2>
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
      <div className="space-y-4 px-6 py-5 text-sm leading-6 text-slate-600">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </dialog>
  );
}
