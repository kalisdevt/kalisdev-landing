"use client";

import { useEffect, useState } from "react";
import { Check, Copy, WarningCircle } from "@phosphor-icons/react";

type State = "idle" | "copied" | "error";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2200);
    return () => clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={`mailto:${email}`}
        className="text-lg font-medium underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent md:text-xl"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-fg active:scale-[0.97]"
      >
        {state === "copied" ? (
          <Check size={16} weight="bold" className="text-accent" aria-hidden />
        ) : state === "error" ? (
          <WarningCircle size={16} aria-hidden />
        ) : (
          <Copy size={16} aria-hidden />
        )}
        <span aria-live="polite">
          {state === "copied" ? "Скопировано" : state === "error" ? "Не удалось, выделите вручную" : "Копировать"}
        </span>
      </button>
    </div>
  );
}
