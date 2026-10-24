import Image from "next/image";
import { ArrowUpRight, CheckCircle, GitPullRequest, RocketLaunch } from "@phosphor-icons/react/dist/ssr";
import type { Site } from "@/content/site";
import type { Project } from "@/content/types";

/*
 * Проекты: главный проект широкой карточкой (вместо скриншота у него
 * лента CI-пайплайна из README), остальные карточками со скриншотами.
 */

function Links({ links }: { links: Project["links"] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-accent underline-offset-4 hover:underline"
        >
          {l.label}
          <ArrowUpRight
            size={16}
            aria-hidden
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      ))}
    </div>
  );
}

function Stack({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2" aria-label={label}>
      {items.map((t) => (
        <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[13px] text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Points({ points }: { points: string[] }) {
  return (
    <ul className="mt-5 grid gap-2.5">
      {points.map((p) => (
        <li key={p} className="relative pl-5 leading-relaxed text-fg/85">
          <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-2.5 bg-muted" />
          {p}
        </li>
      ))}
    </ul>
  );
}

/** Шаги CI/CD главного проекта: от pull request до деплоя. */
function Pipeline({ steps }: { steps: string[] }) {
  return (
    <ol className="dot-grid relative flex h-full flex-col justify-center gap-0 rounded-[10px] border border-line bg-surface-2 p-6 font-mono text-sm md:p-8">
      <li className="flex items-center gap-3 pb-5 text-muted">
        <GitPullRequest size={20} aria-hidden className="shrink-0" />
        pull request
      </li>
      {steps.map((step, i) => (
        <li key={step} className="relative flex items-center gap-3 py-2.5">
          {/* Вертикальная линия, соединяющая шаги */}
          <span aria-hidden className="absolute -top-2.5 left-[9.5px] h-5 w-px bg-line" />
          <CheckCircle
            size={20}
            weight="fill"
            aria-hidden
            className={`relative shrink-0 ${i === steps.length - 1 ? "text-accent" : "text-fg/70"}`}
          />
          <span className={i === steps.length - 1 ? "text-accent" : "text-fg"}>{step}</span>
        </li>
      ))}
      <li className="flex items-center gap-3 pt-5 text-muted">
        <RocketLaunch size={20} aria-hidden className="shrink-0" />
        vercel
      </li>
    </ol>
  );
}

function FeaturedProject({ project, stackLabel }: { project: Project; stackLabel: string }) {
  return (
    <article
      data-reveal
      className="grid gap-8 rounded-[20px] border border-line bg-surface p-6 md:p-10 lg:col-span-2 lg:grid-cols-12 lg:gap-10"
    >
      <div className="lg:col-span-7">
        <p className="font-mono text-sm text-muted">{project.kind}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">{project.title}</h3>
        <p className="mt-4 max-w-[40rem] text-lg leading-relaxed text-muted">{project.summary}</p>
        <Points points={project.points} />
        <Stack items={project.stack} label={stackLabel} />
        <Links links={project.links} />
      </div>
      {project.pipeline && (
        <div className="lg:col-span-5">
          <Pipeline steps={project.pipeline} />
        </div>
      )}
    </article>
  );
}

function ProjectCard({ project, stackLabel }: { project: Project; stackLabel: string }) {
  return (
    <article data-reveal className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-surface">
      {project.image && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 620px, 100vw"
            className="object-cover object-top"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="font-mono text-sm text-muted">{project.kind}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
        <Points points={project.points} />
        <Stack items={project.stack} label={stackLabel} />
        <div className="mt-auto">
          <Links links={project.links} />
        </div>
      </div>
    </article>
  );
}

export function Projects({ site }: { site: Site }) {
  const [featured, ...rest] = site.projects.items;

  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-[1320px] px-4 py-24 md:px-8 md:py-32">
      <h2 id="projects-title" className="text-4xl font-semibold tracking-[-0.035em] md:text-6xl">
        {site.projects.title}
      </h2>
      <p className="mt-5 max-w-[40rem] text-lg leading-relaxed text-muted">{site.projects.lead}</p>

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        {featured && <FeaturedProject project={featured} stackLabel={site.ui.techAria} />}
        {rest.map((p) => (
          <ProjectCard key={p.id} project={p} stackLabel={site.ui.techAria} />
        ))}
      </div>
    </section>
  );
}
