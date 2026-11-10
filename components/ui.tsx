/*
 * Мелкие общие элементы секций. Раньше эта разметка повторялась в
 * нескольких компонентах; теперь правится в одном месте.
 */

/** Заголовок секции с порядковым номером и необязательным подзаголовком. */
export function SectionHeading({
  id,
  index,
  title,
  lead,
  className = "",
}: {
  id: string;
  index: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p aria-hidden className="mb-4 flex items-center gap-3 font-mono text-sm text-muted">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line" />
      </p>
      <h2 id={id} className="section-title max-w-[48rem]">
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}

/** Чипы технологий. */
export function TagList({ items, label, className = "mt-6" }: { items: string[]; label?: string; className?: string }) {
  if (!items.length) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label={label}>
      {items.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Список пунктов с короткой чертой вместо маркера. */
export function BulletList({ items, className = "" }: { items: string[]; className?: string }) {
  if (!items.length) return null;
  return (
    <ul className={`mt-5 grid gap-3 ${className}`}>
      {items.map((p) => (
        <li key={p} className="relative pl-5 leading-relaxed text-fg/85">
          <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-2.5 bg-muted" />
          {p}
        </li>
      ))}
    </ul>
  );
}

/**
 * Одноцветный логотип: файл служит маской, цвет берётся из фона элемента
 * (bg-current, bg-fg и т. п.), поэтому логотип следует теме сайта.
 */
export function MaskIcon({
  src,
  width,
  height,
  className = "",
}: {
  src: string;
  width: number;
  height: number;
  className?: string;
}) {
  const mask = `url(${src}) center / contain no-repeat`;
  return (
    <span
      aria-hidden
      className={`block shrink-0 ${className}`}
      style={{ width, height, mask, WebkitMask: mask }}
    />
  );
}
