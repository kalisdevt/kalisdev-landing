import type { Site } from "@/content/site";

export function About({ site }: { site: Site }) {
  const words = site.about.split(" ");

  return (
    <section id="about" aria-labelledby="about-title" data-about className="relative">
      <div className="container-page flex flex-col justify-center py-20 md:py-28 lg:min-h-[100dvh] lg:py-16">
        <h2 id="about-title" className="sr-only">
          {site.ui.aboutTitle}
        </h2>
        {/* Слова проявляются по мере прокрутки. Без JS текст виден целиком. */}
        <p className="max-w-[62rem] text-[clamp(1.45rem,2.9vw,2.6rem)] font-medium leading-[1.25] tracking-[-0.02em]">
          {words.map((w, i) => (
            <span key={i} data-word className="inline">
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
