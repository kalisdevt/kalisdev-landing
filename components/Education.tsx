import type { Site } from "@/content/site";
import { SectionHeading } from "./ui";

export function Education({ site }: { site: Site }) {
  return (
    <section id="education" aria-labelledby="edu-title" className="section">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <SectionHeading id="edu-title" index="05" title={site.ui.educationTitle} className="lg:col-span-4" />
        <ul className="grid content-start gap-10 lg:col-span-8 lg:pt-10">
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
