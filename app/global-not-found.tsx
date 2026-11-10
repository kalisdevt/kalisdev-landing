import type { Metadata } from "next";
import { ArrowLeft, Translate } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/content/site";
import { bootScript, fontVariables } from "@/lib/document";
import { CodeRain } from "@/components/CodeRain";
import { Signature } from "@/components/Signature";
import "./globals.css";

/*
 * 404 для всего сайта (адрес не совпал ни с одним маршрутом).
 * Язык по такому адресу не определить, поэтому страница двуязычная.
 * Подпись здесь статичная: анимации лендинга на этой странице не нужны.
 */

export const metadata: Metadata = {
  title: "404 | kalisdev",
  description: "Страница не найдена. Page not found.",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="ru" className={fontVariables} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-[100dvh] bg-bg font-sans text-fg">
        <CodeRain />
        <main className="container-page flex min-h-[100dvh] flex-col justify-center py-16">
          <a href="/" className="font-mono text-[15px] font-medium text-muted transition-colors hover:text-fg">
            {site.alias}
          </a>

          <p className="mt-16 font-mono text-[clamp(4rem,14vw,10rem)] font-medium leading-none tracking-tighter text-accent">404</p>
          <h1 className="mt-6 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Страница не найдена</h1>
          <p className="mt-2 text-xl text-muted md:text-2xl" lang="en">
            Page not found
          </p>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted">
            Похоже, ссылка устарела или в адресе опечатка. Вся информация обо мне на главной.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="/"
              className="btn btn-primary"
            >
              <ArrowLeft size={18} aria-hidden />
              На главную
            </a>
            <a
              href="/en"
              lang="en"
              hrefLang="en"
              className="btn btn-outline"
            >
              <Translate size={18} aria-hidden />
              English version
            </a>
          </div>

          <div aria-hidden className="mt-16 text-[clamp(2.6rem,6vw,4.5rem)] leading-none opacity-80">
            <Signature locale="ru" lastNameClassName="text-accent" animated={false} />
          </div>
        </main>
      </body>
    </html>
  );
}
