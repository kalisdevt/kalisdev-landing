import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { Logo, Site } from "@/content/site";
import { BulletList, MaskIcon, SectionHeading, TagList } from "./ui";

function CompanyLogo({ logo, name }: { logo: Logo; name: string }) {
  // Высота логотипа фиксированная, ширина по пропорциям файла
  const h = 36;
  const w = Math.round((logo.width / logo.height) * h);
  return (
    <span className="inline-flex items-center gap-2.5">
      {logo.mono ? (
        // Одноцветный логотип красится в цвет текста через маску
        <MaskIcon src={logo.src} width={w} height={h} className="bg-fg transition-colors duration-200 group-hover:bg-accent" />
      ) : (
        <Image src={logo.src} alt="" width={w} height={h} className="block" style={{ width: w, height: h }} />
      )}
      {logo.wordmark && (
        <span aria-hidden className="text-[1.35rem] font-extrabold leading-none tracking-tight sm:text-[1.65rem]">
          {logo.wordmark}
        </span>
      )}
      <span className="sr-only">{name}</span>
    </span>
  );
}

export function Experience({ site }: { site: Site }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="experience-title"
              index="01"
              title={site.ui.experienceTitle}
              lead={site.experienceLead}
              className="lg:max-w-[22rem]"
            />
          </div>
        </div>

        <ol data-timeline className="relative lg:col-span-8">
          {/* Линия таймлайна: фон + заполнение по прокрутке */}
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
          <span
            aria-hidden
            data-timeline-progress
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent"
          />

          {site.experience.map((job) => (
            <li key={job.company} data-reveal className="relative pb-16 pl-10 last:pb-0 md:pl-14">
              <span
                aria-hidden
                data-timeline-dot
                className={`absolute left-0 top-2 size-[15px] rounded-full border-2 ${
                  job.current ? "border-accent bg-accent" : "border-line bg-bg"
                }`}
              />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="font-mono text-sm text-muted">{job.period}</p>
                {job.current && (
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                    {site.ui.now}
                  </span>
                )}
              </div>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-2 transition-colors hover:text-accent"
                >
                  {job.logo ? <CompanyLogo logo={job.logo} name={job.company} /> : job.company}
                  <ArrowUpRight
                    size={20}
                    aria-hidden
                    className="text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              </h3>
              <p className="mt-1 text-lg text-fg/80">{job.role}</p>
              {job.team && <p className="mt-1 max-w-[40rem] text-[15px] leading-snug text-muted">{job.team}</p>}
              <p className="mt-4 max-w-[40rem] leading-relaxed text-muted">{job.summary}</p>

              <BulletList items={job.points} className="max-w-[44rem]" />
              <TagList items={job.tags} label={site.ui.techAria} />

              {job.caseLink && (
                <a href="#case" className="link-arrow group mt-4">
                  {site.ui.caseMore}
                  <ArrowDown size={16} aria-hidden className="group-hover:translate-y-0.5" />
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
