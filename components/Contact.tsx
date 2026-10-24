import { TelegramLogo, Phone, GithubLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/content/site";
import { CopyEmail } from "./CopyEmail";

export function Contact() {
  const { telegram, email, phone, github } = site.contacts;

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-[1320px] px-4 pb-10 pt-24 md:px-8 md:pt-32">
      <div data-contact className="soft-shadow overflow-hidden rounded-[20px] border border-line bg-surface px-6 py-14 md:px-14 md:py-20">
        <h2
          id="contact-title"
          className="max-w-[54rem] text-balance text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
        >
          {site.contact.title}
        </h2>
        <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-muted">{site.contact.text}</p>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
          <a
            href={`https://t.me/${telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 w-fit items-center gap-3 whitespace-nowrap rounded-full bg-accent px-8 text-lg font-medium text-accent-fg transition-transform duration-200 hover:-translate-y-[1px] active:scale-[0.98]"
          >
            <TelegramLogo size={22} weight="fill" aria-hidden />
            Написать
          </a>
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted">или на почту</p>
            <CopyEmail email={email} />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted">код на GitHub</p>
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
          {site.city}, Россия. Telegram{" "}
          <a href={`https://t.me/${telegram}`} className="text-fg underline-offset-4 hover:underline">
            @{telegram}
          </a>
          , GitHub{" "}
          <a href={`https://github.com/${github}`} className="text-fg underline-offset-4 hover:underline">
            {github}
          </a>
        </p>
      </footer>
    </section>
  );
}
