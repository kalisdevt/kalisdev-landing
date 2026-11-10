"use client";

import { useEffect, useState } from "react";
import { Check, Copy, WarningCircle } from "@phosphor-icons/react";

type State = "idle" | "copied" | "error";

function copyViaSelection(text: string) {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.cssText = "position:fixed;opacity:0;pointer-events:none";
  document.body.appendChild(field);
  field.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  field.remove();
  return ok;
}

export function CopyEmail({
  email,
  labels,
}: {
  email: string;
  labels: { copy: string; copied: string; copyError: string };
}) {
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
      // Clipboard API недоступен (старый браузер, встроенный просмотрщик): запасной способ
      setState(copyViaSelection(email) ? "copied" : "error");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={`mailto:${email}`}
        className="break-all text-lg font-medium underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent md:text-xl"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="btn btn-outline h-11 gap-2 px-4 text-sm font-normal text-muted hover:text-fg"
      >
        {state === "copied" ? (
          <Check size={16} weight="bold" className="text-accent" aria-hidden />
        ) : state === "error" ? (
          <WarningCircle size={16} aria-hidden />
        ) : (
          <Copy size={16} aria-hidden />
        )}
        <span aria-live="polite">
          {state === "copied" ? labels.copied : state === "error" ? labels.copyError : labels.copy}
        </span>
      </button>
    </div>
  );
}
