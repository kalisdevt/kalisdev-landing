"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { List, X, TelegramLogo, GithubLogo } from "@phosphor-icons/react";
import type { Site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

/** Только то, что нужно шапке: весь контент страницы в клиентский бандл не попадает. */
export type NavData = Pick<Site, "name" | "alias" | "monogram" | "avatar" | "ui"> & {
  telegram: string;
  github: string;
};

/** Брейкпоинт lg: с него ссылки помещаются в шапку и меню не нужно. */
const DESKTOP = "(min-width: 1024px)";

/**
 * Какой раздел сейчас читают: тот, что пересекает линию чуть выше
 * середины экрана. Возвращает href ссылки меню или null.
 */
function useActiveSection(hrefs: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = hrefs.join();

  useEffect(() => {
    const sections = key
      .split(",")
      .map((href) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        // Если линию пересекают два раздела, берём тот, что ниже по странице
        const current = sections.filter((s) => visible.has(s.id)).pop();
        setActive(current ? `#${current.id}` : null);
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

export function Nav({ data }: { data: NavData }) {
  const { ui } = data;
  const links = ui.nav;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(links.map((l) => l.href));
  const menuButton = useRef<HTMLButtonElement>(null);

  // У самого верха шапка прозрачная, после начала прокрутки получает фон
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Открытое меню: Escape закрывает, страница под ним не прокручивается,
  // при переходе на широкий экран меню закрывается само
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    const desktop = window.matchMedia(DESKTOP);
    const onDesktop = () => desktop.matches && setOpen(false);
    const root = document.documentElement;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  // Блокировку прокрутки снимаем сразу, до перехода по якорю
  const close = () => {
    document.documentElement.style.overflow = "";
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-10 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line/70 bg-bg/75 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      {/* Тонкий индикатор прогресса чтения, управляется из ScrollEffects */}
      <div data-progress aria-hidden className="absolute inset-x-0 -bottom-px h-[2px] origin-left scale-x-0 bg-accent" />
      <nav aria-label={ui.navAria} className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          onClick={close}
          aria-label={`${data.name}, ${ui.homeAria}`}
          className="flex items-center gap-3 font-medium tracking-tight"
        >
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

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const current = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={current ? "location" : undefined}
                  className={`rounded-full px-4 py-2 text-[15px] transition-colors duration-200 hover:text-fg ${
                    current ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* Переключатель языка: ведёт на ту же страницу другой версии */}
          <a
            href={ui.otherLocale.href}
            hrefLang={ui.otherLocale.hrefLang}
            lang={ui.otherLocale.hrefLang}
            title={ui.otherLocale.title}
            aria-label={ui.otherLocale.title}
            className="icon-btn font-mono text-[13px] font-medium"
          >
            {ui.otherLocale.label}
          </a>
          <a
            href={`https://github.com/${data.github}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="icon-btn max-sm:hidden"
          >
            <GithubLogo size={19} aria-hidden />
          </a>
          <ThemeToggle labels={{ toLight: ui.themeToLight, toDark: ui.themeToDark }} />
          <a
            href={`https://t.me/${data.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid h-11 gap-2 px-5 text-[15px] max-sm:hidden"
          >
            <TelegramLogo size={18} weight="fill" aria-hidden />
            {ui.write}
          </a>
          <button
            ref={menuButton}
            type="button"
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            className="icon-btn lg:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <List size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <>
          {/* Затемнение под меню: клик мимо меню закрывает его */}
          <div
            aria-hidden
            onClick={close}
            className="menu-backdrop absolute inset-x-0 top-full h-[100dvh] bg-bg/70 backdrop-blur-sm lg:hidden"
          />
          <div
            id="mobile-menu"
            className="menu-panel absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-t border-line bg-bg px-4 pb-6 pt-2 md:px-8 lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={close}
                    aria-current={active === l.href ? "location" : undefined}
                    className={`flex items-center gap-3 py-3 text-2xl font-medium tracking-tight ${
                      active === l.href ? "text-accent" : ""
                    }`}
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
              className="btn btn-solid mt-4 h-12 w-full gap-2"
            >
              <TelegramLogo size={18} weight="fill" aria-hidden />
              {ui.write}
            </a>
          </div>
        </>
      )}
    </header>
  );
}
