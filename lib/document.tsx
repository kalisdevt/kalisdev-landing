import type { Metadata, Viewport } from "next";
import { Onest, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import type { SiteContent } from "@/content/types";

/*
 * Общий HTML-документ для обеих языковых версий. У каждой версии свой
 * корневой layout (app/(ru) и app/(en)/en), чтобы <html lang> был верным.
 */

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Рукописное имя на первом экране не грузит веб-шрифт: это векторные
// контуры Great Vibes, см. components/Signature.tsx.

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export function buildMetadata(site: SiteContent): Metadata {
  const { title, description } = site.meta;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      type: "profile",
      locale: site.ogLocale,
      alternateLocale: site.locale === "ru" ? "en_US" : "ru_RU",
      title,
      description,
      siteName: `${site.name} (${site.alias})`,
      url: site.path,
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: site.path,
      languages: { ru: "/", en: "/en", "x-default": "/" },
    },
    // Код подтверждения Яндекс.Вебмастера: задаётся переменной окружения на Vercel
    verification: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
      ? { yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION }
      : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
  ],
};

// Выполняется до отрисовки: применяет сохранённую тему и отмечает,
// можно ли анимировать hero (чтобы не было мигания контента).
export const bootScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}if(window.matchMedia&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-ok');})();`;

export const fontVariables = `${onest.variable} ${jetbrains.variable}`;

function personJsonLd(site: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.alias,
    jobTitle: site.role,
    url: new URL(site.path, siteUrl).toString(),
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "RU" },
    email: `mailto:${site.contacts.email}`,
    sameAs: [`https://t.me/${site.contacts.telegram}`, `https://github.com/${site.contacts.github}`],
    knowsAbout: ["Vue.js", "TypeScript", "Node.js", "Python", "MongoDB", "PostgreSQL", "Docker", "PyTorch", "Machine Learning"],
  };
}

export function RootDocument({ site, children }: { site: SiteContent; children: React.ReactNode }) {
  return (
    <html lang={site.locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(site)) }} />
      </head>
      <body className="min-h-[100dvh] bg-bg font-sans text-fg">
        {children}
        {/* Vercel Web Analytics: без cookie, считает визиты и переходы между разделами */}
        <Analytics />
      </body>
    </html>
  );
}
