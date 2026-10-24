import {
  CloudArrowUp,
  FileText,
  UsersThree,
  ChartLineUp,
  CreditCard,
} from "@phosphor-icons/react/dist/ssr";
import type { Site } from "@/content/site";


// Иллюстрация в духе реального кода проекта: схема реферала на Mongoose.
const codeLines: { t: string; k?: boolean }[][] = [
  [{ t: "const " }, { t: "referralSchema", k: true }, { t: " = new Schema({" }],
  [{ t: "  inviter" , k: true }, { t: ": { type: ObjectId, ref: 'User', index: true }," }],
  [{ t: "  invitee", k: true }, { t: ": { type: ObjectId, ref: 'User', unique: true }," }],
  [{ t: "  status", k: true }, { t: ": { type: String, enum: ['pending', 'paid'] }," }],
  [{ t: "  reward", k: true }, { t: ": { amount: Number, accruedAt: Date }," }],
  [{ t: "}, { timestamps: true });" }],
  [{ t: "" }],
  [{ t: "referralSchema", k: true }, { t: ".post('save', notifyInviter);" }],
];

function Cell({
  className = "",
  icon,
  title,
  text,
  children,
}: {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <article data-bento className={`relative flex flex-col overflow-hidden rounded-[20px] border border-line p-6 md:p-8 ${className}`}>
      {icon && <div className="mb-10 text-accent">{icon}</div>}
      <div className="mt-auto">
        <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h3>
        <p className="mt-2 max-w-[34rem] leading-relaxed text-muted">{text}</p>
      </div>
      {children}
    </article>
  );
}

export function CaseStudy({ site }: { site: Site }) {
  const c = site.caseStudy.cells;
  const services = site.caseStudy.services;

  return (
    <section id="case" aria-labelledby="case-title" className="mx-auto max-w-[1320px] px-4 py-24 md:px-8 md:py-32">
      <h2 id="case-title" className="max-w-[48rem] text-4xl font-semibold tracking-[-0.035em] md:text-6xl">
        {site.caseStudy.title}
      </h2>
      <p className="mt-5 max-w-[40rem] text-lg leading-relaxed text-muted">{site.caseStudy.lead}</p>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <article
          data-bento
          className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-surface md:col-span-2 lg:col-span-4 lg:row-span-2"
        >
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{c.backend.title}</h3>
            <p className="mt-2 max-w-[34rem] leading-relaxed text-muted">{c.backend.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["Node.js", "Express", "MongoDB", "Mongoose", "REST API"].map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[13px] text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto border-t border-line bg-surface-2 px-6 py-6 md:px-8">
            <pre
              aria-label={site.ui.codeAria}
              className="overflow-x-auto font-mono text-[13px] leading-[1.75] text-muted md:text-sm"
            >
              <code>
                {codeLines.map((line, i) => (
                  <span key={i} className="block">
                    <span aria-hidden className="mr-5 inline-block w-4 select-none text-right opacity-40">
                      {i + 1}
                    </span>
                    {line.map((part, j) => (
                      <span key={j} className={part.k ? "text-accent" : undefined}>
                        {part.t}
                      </span>
                    ))}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </article>

        <Cell
          className="border-transparent bg-accent-soft lg:col-span-2"
          icon={<CloudArrowUp size={40} weight="duotone" aria-hidden />}
          title={c.s3.title}
          text={c.s3.text}
        />
        <Cell
          className="bg-surface lg:col-span-2"
          icon={<FileText size={40} weight="duotone" aria-hidden />}
          title={c.reports.title}
          text={c.reports.text}
        />
        <Cell
          className="dot-grid bg-surface lg:col-span-3"
          icon={<UsersThree size={40} weight="duotone" aria-hidden />}
          title={c.referral.title}
          text={c.referral.text}
        />
        <Cell
          className="bg-surface-2 lg:col-span-3"
          icon={<ChartLineUp size={40} weight="duotone" aria-hidden />}
          title={c.dashboards.title}
          text={c.dashboards.text}
        />

        <article
          data-bento
          className="overflow-hidden rounded-[20px] border border-line bg-surface-2 text-fg md:col-span-2 lg:col-span-6"
        >
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-8">
            <div>
              <CreditCard size={40} weight="duotone" aria-hidden className="mb-6 text-accent" />
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{c.integrations.title}</h3>
              <p className="mt-2 max-w-[34rem] leading-relaxed text-muted">{c.integrations.text}</p>
            </div>
            <p className="font-mono text-sm text-muted">{site.ui.servicesCount.replace("{n}", String(services.length))}</p>
          </div>

          {/* Бегущая строка: единственная на странице, пауза при наведении */}
          <div className="marquee relative border-t border-line py-8 md:py-10 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <ul aria-label={site.ui.servicesAria} className="sr-only">
              {services.map((s) => (
                <li key={s.name}>{s.name}</li>
              ))}
            </ul>
            <div aria-hidden className="marquee-track flex w-max">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20">
                  {services.map((s) => (
                    // Одноцветный логотип: файл служит маской, цвет берётся из цвета текста,
                    // поэтому в тёмной теме логотипы белые, в светлой чёрные
                    <span
                      key={s.name}
                      className="block shrink-0 bg-current opacity-90"
                      style={{
                        width: Math.round((s.width / s.height) * s.h),
                        height: s.h,
                        maskImage: `url(${s.src})`,
                        WebkitMaskImage: `url(${s.src})`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
