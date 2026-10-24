/**
 * Генерирует контуры рукописной подписи (имя и фамилия) из шрифта
 * Great Vibes в components/signature-data.ts.
 *
 * Запуск после изменения имени в content/site.ts или content/site.en.ts:
 *   npm run signature
 *
 * Зачем: у рукописных букв росчерки выходят далеко за габариты символа
 * (у «в» завиток почти в два раза шире самой буквы), и браузер может
 * их обрезать. Векторные контуры рисуются целиком, а ещё позволяют
 * анимировать письмо «от руки»: перо идёт вдоль контура каждой буквы.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import opentype from "opentype.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const font = opentype.loadSync(join(root, "assets/fonts/GreatVibes-Regular.ttf"));
const upm = font.unitsPerEm;

const pick = (file, key) => {
  const src = readFileSync(join(root, file), "utf8");
  const m = src.match(new RegExp(`${key}:\\s*"([^"]+)"`));
  if (!m) throw new Error(`Не нашёл ${key} в ${file}`);
  return m[1];
};

const r = (n) => Math.round(n * 10) / 10;

/** Делит команды opentype на отдельные замкнутые контуры. */
function splitContours(commands) {
  const contours = [];
  let cur = null;
  for (const c of commands) {
    if (c.type === "M") {
      cur = { start: { x: c.x, y: c.y }, segs: [] };
      contours.push(cur);
    } else if (c.type === "Z") {
      const last = cur.segs.length ? cur.segs[cur.segs.length - 1] : cur.start;
      if (Math.abs(last.x - cur.start.x) > 0.01 || Math.abs(last.y - cur.start.y) > 0.01) {
        cur.segs.push({ type: "L", x: cur.start.x, y: cur.start.y });
      }
    } else {
      cur.segs.push({ ...c });
    }
  }
  return contours.filter((c) => c.segs.length);
}

/**
 * Переставляет начало контура в его самую левую точку: так перо
 * начинает букву слева, как при письме, а не с произвольного места.
 */
function startAtLeftmost(contour) {
  const pts = [contour.start, ...contour.segs.slice(0, -1).map((s) => ({ x: s.x, y: s.y }))];
  let k = 0;
  for (let i = 1; i < pts.length; i++) if (pts[i].x < pts[k].x) k = i;
  if (k === 0) return contour;
  // pts[i] это конец сегмента i-1; новый старт = pts[k], сегменты k..n-1, затем 0..k-1
  const segs = [...contour.segs.slice(k), ...contour.segs.slice(0, k)];
  return { start: pts[k], segs };
}

function contourToD(c) {
  let d = `M${r(c.start.x)} ${r(c.start.y)}`;
  for (const s of c.segs) {
    if (s.type === "L") d += `L${r(s.x)} ${r(s.y)}`;
    else if (s.type === "Q") d += `Q${r(s.x1)} ${r(s.y1)} ${r(s.x)} ${r(s.y)}`;
    else if (s.type === "C") d += `C${r(s.x1)} ${r(s.y1)} ${r(s.x2)} ${r(s.y2)} ${r(s.x)} ${r(s.y)}`;
  }
  return d + "Z";
}

function buildLine(text) {
  // fontSize = upm, поэтому координаты в единицах шрифта; базовая линия y = 0
  const paths = font.getPaths(text, 0, 0, upm, { kerning: true });
  const glyphs = paths
    .map((p) => {
      const bb = p.getBoundingBox();
      if (!isFinite(bb.x1)) return null;
      const contours = splitContours(p.commands)
        .map(startAtLeftmost)
        .map((c) => ({ c, minX: Math.min(c.start.x, ...c.segs.map((s) => s.x)) }))
        .sort((a, b) => a.minX - b.minX);
      return {
        // Полный контур буквы (для заливки) и контуры по отдельности (для пера)
        d: p.toPathData(1),
        pen: contours.map(({ c }) => contourToD(c)),
        bbox: [bb.x1, bb.y1, bb.x2, bb.y2],
      };
    })
    .filter(Boolean);

  const x1 = Math.min(...glyphs.map((g) => g.bbox[0]));
  const y1 = Math.min(...glyphs.map((g) => g.bbox[1]));
  const x2 = Math.max(...glyphs.map((g) => g.bbox[2]));
  const y2 = Math.max(...glyphs.map((g) => g.bbox[3]));
  return { text, glyphs: glyphs.map(({ d, pen }) => ({ d, pen })), ink: [r(x1), r(y1), r(x2), r(y2)] };
}

const files = { ru: "content/site.ts", en: "content/site.en.ts" };
const signatures = Object.fromEntries(
  Object.entries(files).map(([locale, file]) => [
    locale,
    { first: buildLine(pick(file, "firstName")), last: buildLine(pick(file, "lastName")) },
  ]),
);

const out = `// Сгенерировано scripts/build-signature.mjs из шрифта Great Vibes (OFL).
// Не редактировать вручную: после смены имени запустите npm run signature.

export const SIGNATURE_UPM = ${upm};

export type SignatureLine = {
  text: string;
  /** Габариты «чернил» в единицах шрифта: [x1, y1, x2, y2], базовая линия y = 0, ось y вниз. */
  ink: [number, number, number, number];
  glyphs: { d: string; pen: string[] }[];
};

export const signatures: Record<"ru" | "en", { first: SignatureLine; last: SignatureLine }> = ${JSON.stringify(signatures, null, 2)};
`;

writeFileSync(join(root, "components/signature-data.ts"), out);
for (const [locale, { first, last }] of Object.entries(signatures)) {
  console.log(`${locale}: ${first.text} ${last.text}`, "ink", first.ink, last.ink);
}
