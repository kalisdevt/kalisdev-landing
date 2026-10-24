import { getImageProps } from "next/image";
import { ArrowDown, TelegramLogo } from "@phosphor-icons/react/dist/ssr";
import type { Photo as PhotoSource, Site } from "@/content/site";
import { Signature } from "./Signature";

/*
 * Композиция: фото широкой полосой сверху, а панель с именем
 * «врезана» в его нижний левый угол и заходит на фото внахлёст.
 * Панель залита цветом фона, поэтому имя читается на любом снимке.
 * Скруглённые «вогнутые» углы стыка рисуют классы .notch-* в globals.css.
 */

const DEFAULT_POSITION = "50% 30%";

// Если какого-то кадра нет, берём ближайший по форме из оставшихся
function resolvePhotos(site: Site) {
  const { mobile, tablet, desktop } = site.photos;
  const m = mobile ?? tablet ?? desktop;
  if (!m) return null;
  return {
    mobile: m,
    tablet: tablet ?? desktop ?? m,
    desktop: desktop ?? tablet ?? m,
  };
}

function srcSetFor(photo: PhotoSource, sizes: string) {
  return getImageProps({ src: photo.src, alt: "", fill: true, sizes, quality: 82 }).props;
}

/**
 * Три кадра под разные экраны через <picture>: браузер скачивает только
 * подходящий. Точка кадрирования у каждого своя, через CSS-переменные.
 * Границы совпадают с брейкпоинтами Tailwind: md (768) и xl (1280).
 */
function ArtDirectedPhoto({ photos, alt }: { photos: NonNullable<ReturnType<typeof resolvePhotos>>; alt: string }) {
  const desktop = srcSetFor(photos.desktop, "(min-width: 1320px) 1256px, 100vw");
  const tablet = srcSetFor(photos.tablet, "100vw");
  const { srcSet: mobileSrcSet, sizes: mobileSizes, ...img } = srcSetFor(photos.mobile, "100vw");

  return (
    <picture
      style={
        {
          "--pos-m": photos.mobile.position ?? DEFAULT_POSITION,
          "--pos-t": photos.tablet.position ?? DEFAULT_POSITION,
          "--pos-d": photos.desktop.position ?? DEFAULT_POSITION,
        } as React.CSSProperties
      }
    >
      <source media="(min-width: 1280px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />
      <source media="(min-width: 768px)" srcSet={tablet.srcSet} sizes={tablet.sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img
        {...img}
        srcSet={mobileSrcSet}
        sizes={mobileSizes}
        alt={alt}
        loading="eager"
        fetchPriority="high"
        className="object-cover [object-position:var(--pos-m)] md:[object-position:var(--pos-t)] xl:[object-position:var(--pos-d)]"
      />
    </picture>
  );
}

function Photo({ site }: { site: Site }) {
  const photos = resolvePhotos(site);
  return (
    <div
      data-hero-photo
      className="relative h-[clamp(340px,62vh,520px)] overflow-hidden rounded-[20px] bg-surface-2 md:h-[clamp(340px,calc(100dvh-23rem),740px)]"
    >
      <div data-parallax className="absolute inset-[-6%_0]">
        {photos ? (
          <ArtDirectedPhoto photos={photos} alt={site.photoAlt} />
        ) : (
          // Заглушка, пока фото не добавлены. Пути к фото задаются в content/site.ts.
          <div
            className="dot-grid flex size-full items-start justify-end p-6 md:items-center md:p-16"
            role="img"
            aria-label={site.photoAlt}
          >
            <span className="select-none text-[clamp(6rem,18vw,16rem)] font-semibold leading-none tracking-tighter text-accent/80">
              {site.monogram}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function Hero({ site }: { site: Site }) {
  return (
    <section id="top" className="relative mx-auto max-w-[1320px] px-4 pb-16 pt-20 md:px-8 lg:min-h-[100dvh] lg:pb-10">
      <Photo site={site} />

      {/* Панель с именем, заходит на фото на величину --overlap */}
      <div className="hero-panel notch-left notch-right relative w-fit max-w-full rounded-tr-[20px] bg-bg pr-5 pt-5 md:pr-10 md:pt-7">
        <p
          data-hero-fade
          className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted"
        >
          {/* Реальный статус доступности, а не декор */}
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {site.hero.status}
        </p>

        {/*
          Имя как подпись: векторные контуры рукописного шрифта (Signature),
          фамилия акцентным цветом ниже со сдвигом и заходит на имя.
          Текстом имя остаётся для скринридеров и поисковиков.
        */}
        <h1 className="mt-2 text-[clamp(3.8rem,8vw,7rem)] leading-none md:mt-3">
          <span className="sr-only">{site.name}</span>
          <Signature locale={site.locale} lastNameClassName="text-accent" />
        </h1>
      </div>

      <div className="mt-6 grid gap-8 md:mt-8 lg:grid-cols-12 lg:items-end lg:gap-8">
        <p data-hero-fade className="max-w-[36rem] text-lg leading-relaxed text-muted md:text-xl lg:col-span-7">
          {site.hero.lead}
        </p>

        <div data-hero-fade className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
          <a
            href={`https://t.me/${site.contacts.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 items-center gap-2.5 whitespace-nowrap rounded-full bg-accent px-7 text-base font-medium text-accent-fg transition-transform duration-200 hover:-translate-y-[1px] active:scale-[0.98]"
          >
            <TelegramLogo size={20} weight="fill" aria-hidden />
            {site.ui.write}
          </a>
          <a
            href="#experience"
            className="inline-flex h-13 items-center gap-2.5 whitespace-nowrap rounded-full border border-line px-7 text-base font-medium text-fg transition-colors duration-200 hover:bg-surface-2 active:scale-[0.98]"
          >
            {site.ui.seeExperience}
            <ArrowDown size={18} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
