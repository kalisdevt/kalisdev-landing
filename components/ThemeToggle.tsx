"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

type Theme = "light" | "dark";

function resolveTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => setTheme(resolveTheme()), []);

  const toggle = () => {
    const next: Theme = resolveTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // приватный режим или заблокированное хранилище: тема просто не запомнится
    }
    setTheme(next);
  };

  const label = theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-11 place-items-center rounded-full border border-line text-fg transition-colors duration-200 hover:bg-surface-2 active:scale-[0.96]"
    >
      {/* До монтирования иконка скрыта, чтобы не было рассинхрона с SSR */}
      <span className={theme ? "opacity-100" : "opacity-0"}>
        {theme === "dark" ? <Sun size={19} aria-hidden /> : <Moon size={19} aria-hidden />}
      </span>
    </button>
  );
}
