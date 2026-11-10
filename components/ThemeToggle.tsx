"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

type Theme = "light" | "dark";

/** Цвет панели браузера для каждой темы: совпадает с --bg в globals.css. */
const THEME_COLOR: Record<Theme, string> = { light: "#f3f4f6", dark: "#0b0c0e" };

function resolveTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Тема выбрана вручную: панель браузера красим под неё, а не под систему
function syncThemeColor() {
  const set = document.documentElement.dataset.theme;
  if (set !== "light" && set !== "dark") return;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", THEME_COLOR[set]));
}

export function ThemeToggle({ labels }: { labels: { toLight: string; toDark: string } }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(resolveTheme());
    syncThemeColor();
    // Пока тема не выбрана вручную, иконка следует за системной
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setTheme(resolveTheme());
    scheme.addEventListener("change", onChange);
    return () => scheme.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = resolveTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      syncThemeColor();
    };
    // Плавное перетекание между темами там, где браузер это умеет
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduce) document.startViewTransition(apply);
    else apply();
    try {
      localStorage.setItem("theme", next);
    } catch {
      // приватный режим или заблокированное хранилище: тема просто не запомнится
    }
    setTheme(next);
  };

  const label = theme === "dark" ? labels.toLight : labels.toDark;

  return (
    <button type="button" onClick={toggle} aria-label={label} title={label} className="icon-btn">
      {/* До монтирования иконка скрыта, чтобы не было рассинхрона с SSR */}
      <span className={theme ? "opacity-100" : "opacity-0"}>
        {theme === "dark" ? <Sun size={19} aria-hidden /> : <Moon size={19} aria-hidden />}
      </span>
    </button>
  );
}
