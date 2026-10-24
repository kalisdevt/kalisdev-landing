"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { List, X, TelegramLogo, GithubLogo } from "@phosphor-icons/react";
import type { Site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

/** Только то, что нужно шапке: весь контент страницы в клиентский бандл не попадает. */
export type NavData = Pick<Site, "name" | "alias" | "monogram" | "avatar" | "ui"> & {
  telegram: string;
  github: string;
};

export function Nav({ data }: { data: NavData }) {
  const { ui } = data;
  const links = ui.nav;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-10 border-b border-line/70 bg-bg/75 backdrop-blur-xl">
      {/* Тонкий индикатор прогресса чтения, управляется из ScrollEffects */}
      <div
        data-progress
        aria-hidden
        className="absolute inset-x-0 bottom-[-1px] z-30 h-[2px] origin-left scale-x-0 bg-accent"
      />
      <nav
        aria-label={ui.navAria}
        className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-4 md:px-8"
      >
        <a href="#top" aria-label={`${data.name}, ${ui.homeAria}`} className="flex items-center gap-3 font-medium tracking-tight">
          {data.avatar ? (
            <Image
              src={data.avatar}
              alt=""
              width={36}
              height={36}
              sizes="36px"
              className="size-9 rounded-full object-cover ring-1 ring-line"
            />
          ) : (
            <span className="grid size-9 place-items-center rounded-full bg-fg text-[13px] font-semibold text-bg">
              {data.monogram}
            </span>
          )}
          <span className="font-mono text-[15px] font-medium">{data.alias}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-[15px] text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Переключатель языка: ведёт на ту же страницу другой версии */}
          <a
            href={ui.otherLocale.href}
            hrefLang={ui.otherLocale.hrefLang}
            lang={ui.otherLocale.hrefLang}
            title={ui.otherLocale.title}
            aria-label={ui.otherLocale.title}
            className="grid size-11 place-items-center rounded-full border border-line font-mono text-[13px] font-medium text-fg transition-colors duration-200 hover:bg-surface-2 active:scale-[0.96]"
          >
            {ui.otherLocale.label}
          </a>
          <a
            href={`https://github.com/${data.github}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="hidden size-11 place-items-center rounded-full border border-line text-fg transition-colors duration-200 hover:bg-surface-2 active:scale-[0.96] sm:grid"
          >
            <GithubLogo size={19} aria-hidden />
          </a>
          <ThemeToggle labels={{ toLight: ui.themeToLight, toDark: ui.themeToDark }} />
          <a
            href={`https://t.me/${data.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-2 whitespace-nowrap rounded-full bg-fg px-5 text-[15px] font-medium text-bg transition-transform duration-200 hover:-translate-y-[1px] active:scale-[0.98] sm:inline-flex"
          >
            <TelegramLogo size={18} weight="fill" aria-hidden />
            {ui.write}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            className="grid size-11 place-items-center rounded-full border border-line text-fg md:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <List size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="z-20 border-t border-line bg-bg px-4 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-2xl font-medium tracking-tight"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`https://github.com/${data.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-3 text-2xl font-medium tracking-tight"
              >
                <GithubLogo size={24} aria-hidden />
                GitHub
              </a>
            </li>
          </ul>
          <a
            href={`https://t.me/${data.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-fg text-base font-medium text-bg"
          >
            <TelegramLogo size={18} weight="fill" aria-hidden />
            {ui.write}
          </a>
        </div>
      )}
    </header>
  );
}
