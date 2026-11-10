import Image from "next/image";
import { ArrowUpRight, CheckCircle, GitPullRequest, RocketLaunch } from "@phosphor-icons/react/dist/ssr";
import type { Site } from "@/content/site";
import type { Project } from "@/content/types";
import { BulletList, SectionHeading, TagList } from "./ui";

/*
 * Проекты: главный проект широкой карточкой (вместо скриншота у него
 * лента CI-пайплайна из README), остальные карточками со скриншотами.
 */

function Links({ links }: { links: Project["links"] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
      {links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-arrow">
          {l.label}
          <ArrowUpRight size={16} aria-hidden className="arrow-out" />
        </a>
      ))}
    </div>
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
      className="card card-hover grid gap-8 bg-surface p-6 md:p-10 lg:col-span-2 lg:grid-cols-12 lg:gap-10"
    >
      <div className="lg:col-span-7">
        <p className="font-mono text-sm text-muted">{project.kind}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">{project.title}</h3>
        <p className="mt-4 max-w-[40rem] text-lg leading-relaxed text-muted">{project.summary}</p>
        <BulletList items={project.points} />
        <TagList items={project.stack} label={stackLabel} />
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
    <article data-reveal className="card card-hover group/card flex flex-col overflow-hidden bg-surface">
      {project.image && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 620px, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="font-mono text-sm text-muted">{project.kind}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
        <BulletList items={project.points} />
        <TagList items={project.stack} label={stackLabel} />
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
    <section id="projects" aria-labelledby="projects-title" className="section">
      <SectionHeading id="projects-title" index="03" title={site.projects.title} lead={site.projects.lead} />

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        {featured && <FeaturedProject project={featured} stackLabel={site.ui.techAria} />}
        {rest.map((p) => (
          <ProjectCard key={p.id} project={p} stackLabel={site.ui.techAria} />
        ))}
      </div>
    </section>
  );
}
