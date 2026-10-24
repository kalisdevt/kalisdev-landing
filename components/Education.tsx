import type { Site } from "@/content/site";

export function Education({ site }: { site: Site }) {
  return (
    <section aria-labelledby="edu-title" className="mx-auto max-w-[1320px] px-4 py-24 md:px-8 md:py-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <h2 id="edu-title" className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl lg:col-span-4">
          {site.ui.educationTitle}
        </h2>
        <ul className="grid gap-10 lg:col-span-8">
          {site.education.map((e) => (
            <li key={e.title} data-reveal className="grid gap-3 sm:grid-cols-[7rem_1fr] sm:gap-8">
              <div>
                <p className="font-mono text-3xl font-medium tracking-tight">{e.year}</p>
                <p className="mt-1 text-sm text-muted">{e.note}</p>
              </div>
              <div>
                <p className="text-xl font-medium leading-snug tracking-tight">{e.title}</p>
                <p className="mt-2 leading-relaxed text-muted">{e.place}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
