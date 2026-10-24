import type { Metadata, Viewport } from "next";
import { Onest, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = `${site.name} (${site.alias}), ${site.role}`;
const description =
  "Fullstack-разработчик на Vue.js и Node.js. Опыт в одиночку вести CRM/LMS-платформу: backend на Node.js и MongoDB, интерфейсы на Vue, платежи и интеграции по API.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: "profile",
    locale: "ru_RU",
    title,
    description,
    siteName: `${site.name} (${site.alias})`,
  },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
  ],
};

// Выполняется до отрисовки: применяет сохранённую тему и отмечает,
// можно ли анимировать hero (чтобы не было мигания контента).
const bootScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}if(window.matchMedia&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-ok');})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.alias,
  jobTitle: site.role,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "RU" },
  email: `mailto:${site.contacts.email}`,
  sameAs: [`https://t.me/${site.contacts.telegram}`, `https://github.com/${site.contacts.github}`],
  knowsAbout: ["Vue.js", "TypeScript", "Node.js", "Python", "MongoDB", "PostgreSQL", "Docker", "PyTorch", "Machine Learning"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${onest.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-[100dvh] bg-bg font-sans text-fg">{children}</body>
    </html>
  );
}
