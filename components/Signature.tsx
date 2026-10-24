import type { Locale } from "@/content/types";
import { signatures, SIGNATURE_UPM, type SignatureLine } from "./signature-data";

/*
 * Рукописная подпись из настоящих контуров букв Great Vibes
 * (данные генерирует scripts/build-signature.mjs).
 *
 * Каждая буква рисуется заливкой, а для анимации у неё есть маска-«перо»:
 * толстая линия вдоль контура буквы. ScrollEffects прорисовывает перо
 * через stroke-dashoffset, и буква проявляется по ходу линии, как от руки.
 * Без JS и при reduced motion маски не подключаются и подпись видна сразу.
 */

/** Толщина пера в единицах шрифта: должна перекрывать самый толстый штрих. */
const PEN = 150;
/** Обводка поверх заливки делает тонкий шрифт чуть жирнее (в единицах шрифта). */
const WEIGHT = 18;
/** Запас по краям, чтобы росчерки и обводка не упирались в границу. */
const PAD = 40;

// Общая высота для всех строк обоих языков: базовые линии совпадают
// по смещению, и раскладка подписи одинакова в русской и английской версии
const allLines = Object.values(signatures).flatMap((s) => [s.first, s.last]);
const TOP = Math.min(...allLines.map((l) => l.ink[1])) - PAD;
const BOTTOM = Math.max(...allLines.map((l) => l.ink[3])) + PAD;

/** Высота строки подписи, в em. */
const SIGNATURE_HEIGHT_EM = (BOTTOM - TOP) / SIGNATURE_UPM;

/** Расстояние между базовыми линиями имени и фамилии, в em: меньше высоты строки, поэтому фамилия заходит на имя. */
const LINE_GAP_EM = 0.68;
/** Сдвиг фамилии вправо, в em. */
const INDENT_EM = 0.95;

function Line({
  line,
  id,
  className,
  style,
  animated,
}: {
  line: SignatureLine;
  id: string;
  className?: string;
  style?: React.CSSProperties;
  animated: boolean;
}) {
  const x = Math.min(line.ink[0], 0) - PAD;
  const w = line.ink[2] + PAD - x;
  const h = BOTTOM - TOP;

  return (
    <svg
      // Метки для ScrollEffects; без них подпись статична и видна сразу
      data-hero-line={animated || undefined}
      data-signature={animated || undefined}
      aria-hidden
      viewBox={`${x} ${TOP} ${w} ${h}`}
      className={`block overflow-visible ${className ?? ""}`}
      style={{ width: `${w / SIGNATURE_UPM}em`, height: `${h / SIGNATURE_UPM}em`, ...style }}
    >
      <defs>
        {line.glyphs.map((g, i) => (
          <mask key={i} id={`${id}-${i}`} maskUnits="userSpaceOnUse" x={x - PEN} y={TOP - PEN} width={w + PEN * 2} height={h + PEN * 2}>
            {g.pen.map((d, j) => (
              <path
                key={j}
                d={d}
                data-pen
                fill="none"
                stroke="#fff"
                strokeWidth={PEN}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </mask>
        ))}
      </defs>
      {line.glyphs.map((g, i) => (
        <path
          key={i}
          d={g.d}
          data-glyph
          data-mask={`url(#${id}-${i})`}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={WEIGHT}
          strokeLinejoin="round"
          paintOrder="stroke"
        />
      ))}
    </svg>
  );
}

export function Signature({
  locale,
  lastNameClassName,
  animated = true,
}: {
  locale: Locale;
  lastNameClassName?: string;
  /** false: без анимации письма (например, на странице 404). */
  animated?: boolean;
}) {
  const signature = signatures[locale];
  return (
    <>
      <Line line={signature.first} id="sig-first" animated={animated} />
      <Line
        line={signature.last}
        id="sig-last"
        className={lastNameClassName}
        animated={animated}
        style={{ marginTop: `${-(SIGNATURE_HEIGHT_EM - LINE_GAP_EM)}em`, marginLeft: `${INDENT_EM}em` }}
      />
    </>
  );
}
