import { TelegramLogo, Phone, GithubLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Site } from "@/content/site";
import { CopyEmail } from "./CopyEmail";

export function Contact({ site }: { site: Site }) {
  const { telegram, email, phone, github } = site.contacts;

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page pb-10 pt-20 md:pt-28">
      <div data-contact className="card soft-shadow relative overflow-hidden bg-surface px-6 py-14 md:px-14 md:py-20">
        <h2
          id="contact-title"
          className="max-w-[54rem] text-balance text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
        >
          {site.contact.title}
        </h2>
        <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-muted">{site.contact.text}</p>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          <a
            href={`https://t.me/${telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary h-14 w-fit gap-3 px-8 text-lg"
          >
            <TelegramLogo size={22} weight="fill" aria-hidden />
            {site.ui.write}
          </a>
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted">{site.ui.contactEmail}</p>
            <CopyEmail email={email} labels={{ copy: site.ui.copy, copied: site.ui.copied, copyError: site.ui.copyError }} />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted">{site.ui.contactGithub}</p>
            <a
              href={`https://github.com/${github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 font-mono text-lg font-medium underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent md:text-xl"
            >
              <GithubLogo size={22} aria-hidden className="shrink-0" />
              {github}
              <ArrowUpRight size={18} aria-hidden className="text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
          {phone && (
            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-2 text-lg">
              <Phone size={20} aria-hidden />
              {phone}
            </a>
          )}
        </div>
      </div>

      <footer className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} <span className="font-mono">({site.alias})</span>
        </p>
        <p>
          {site.city}, {site.country}. Telegram{" "}
          <a href={`https://t.me/${telegram}`} target="_blank" rel="noopener noreferrer" className="text-fg underline-offset-4 hover:underline">
            @{telegram}
          </a>
          , GitHub{" "}
          <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer" className="text-fg underline-offset-4 hover:underline">
            {github}
          </a>
        </p>
      </footer>
    </section>
  );
}
