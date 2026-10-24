import { site } from "@/content/site";

function format(value: number, decimals: number) {
  return value.toLocaleString("ru-RU", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function Facts() {
  return (
    <section aria-label="Коротко в цифрах" className="mx-auto max-w-[1320px] px-4 md:px-8">
      <dl className="grid grid-cols-2 gap-y-10 border-y border-line py-12 md:py-14 lg:grid-cols-4">
        {site.facts.map((f, i) => (
          <div
            key={f.label}
            data-reveal
            className={`flex flex-col gap-3 ${i % 2 === 1 ? "border-l border-line pl-5" : "pr-4"} ${
              i === 0 ? "lg:pr-8" : "lg:border-l lg:border-line lg:px-8"
            }`}
          >
            <dt className="order-2 max-w-[16rem] text-[15px] leading-snug text-muted">{f.label}</dt>
            <dd className="order-1 flex items-baseline gap-2">
              <span
                data-count={f.value}
                data-decimals={f.decimals}
                className="text-5xl font-semibold tracking-[-0.04em] tabular-nums md:text-6xl"
              >
                {format(f.value, f.decimals)}
              </span>
              <span className="text-lg text-muted">{f.unit}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
