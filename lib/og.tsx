import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { ImageResponse } from "next/og";
import type { SiteContent } from "@/content/types";
import { signatures, type SignatureLine } from "@/components/signature-data";

/*
 * Карточка для соцсетей и мессенджеров (1200x630).
 * Имя рисуется той же рукописной подписью, что на сайте (векторные
 * контуры), подписи шрифтом Onest с кириллицей. Если в shared.ts задан
 * аватар или фото, оно встаёт справа.
 */

export const ogSize = { width: 1200, height: 630 };

const root = process.cwd();
// Статические файлы Onest (Fontsource): генератор картинок не понимает
// вариативные шрифты. Латиница и кириллица в разных файлах, недостающие
// буквы берутся из следующего шрифта в списке.
const onestFonts = ["latin", "cyrillic"].map((subset) => ({
  name: "Onest",
  data: readFileSync(join(root, `assets/fonts/onest-${subset}-400.woff`)),
  weight: 400 as const,
  style: "normal" as const,
}));

const C = { bg: "#0b0c0e", fg: "#ececee", muted: "#9a9ea6", accent: "#45d18f", line: "#26282e", rain: "#45d18f" };

/** Фото из /public в data URL; null, если файла нет. */
function photoDataUrl(src: string | null | undefined) {
  if (!src) return null;
  const file = join(root, "public", src);
  if (!existsSync(file)) return null;
  const type = extname(file).toLowerCase() === ".png" ? "image/png" : "image/jpeg";
  return `data:${type};base64,${readFileSync(file).toString("base64")}`;
}

function SignatureSvg({ line, height, color }: { line: SignatureLine; height: number; color: string }) {
  const pad = 40;
  const [x1, y1, x2, y2] = line.ink;
  const w = x2 - x1 + pad * 2;
  const h = y2 - y1 + pad * 2;
  return (
    <svg width={(w / h) * height} height={height} viewBox={`${x1 - pad} ${y1 - pad} ${w} ${h}`}>
      {line.glyphs.map((g, i) => (
        <path key={i} d={g.d} fill={color} stroke={color} strokeWidth={18} />
      ))}
    </svg>
  );
}

/** Неподвижный «падающий код» на фоне, как на сайте. Детерминированный, чтобы картинка не менялась от сборки к сборке. */
function Rain() {
  const glyphs = "01{}[]()<>=+-*/;:abcdefxyz";
  const cols = 40;
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex" }}>
      {Array.from({ length: cols }, (_, c) => {
        const start = Math.floor(rnd() * 20);
        const len = 6 + Math.floor(rnd() * 14);
        return (
          <div key={c} style={{ display: "flex", flexDirection: "column", width: 1200 / cols, alignItems: "center", paddingTop: start * 18 }}>
            {Array.from({ length: len }, (_, k) => (
              <span key={k} style={{ fontSize: 14, lineHeight: "18px", color: C.rain, opacity: 0.14 * (1 - k / len) }}>
                {glyphs[Math.floor(rnd() * glyphs.length)]}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export function renderOgImage(site: SiteContent) {
  const sig = signatures[site.locale];
  const photo = photoDataUrl(site.avatar ?? site.photos.mobile?.src ?? site.photos.desktop?.src);
  const sigHeight = 150;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: C.bg,
          color: C.fg,
          fontFamily: "Onest",
        }}
      >
        <Rain />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", flex: 1, position: "relative" }}>
          <div style={{ fontSize: 30, color: C.accent, letterSpacing: 1 }}>{site.alias}</div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <SignatureSvg line={sig.first} height={sigHeight} color={C.fg} />
            <div style={{ display: "flex", marginTop: -sigHeight * 0.42, marginLeft: sigHeight * 0.9 }}>
              <SignatureSvg line={sig.last} height={sigHeight} color={C.accent} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 40, color: C.fg }}>{site.role}</div>
            <div style={{ fontSize: 28, color: C.muted }}>Vue.js, Node.js, TypeScript, Python</div>
          </div>
        </div>

        {photo && (
          <div style={{ display: "flex", alignItems: "center", paddingRight: 72, position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              width={340}
              height={420}
              style={{ objectFit: "cover", borderRadius: 24, border: `1px solid ${C.line}` }}
              alt=""
            />
          </div>
        )}
      </div>
    ),
    {
      ...ogSize,
      fonts: onestFonts,
    },
  );
}

