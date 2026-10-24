"use client";

import { useEffect, useRef } from "react";

/*
 * Фон: еле заметный «падающий код» в цвете акцента.
 * Холст закреплён за всем содержимым (z-index -1), карточки с фоном его
 * перекрывают, поэтому код виден только в просветах. Это атмосфера,
 * а не акцент: низкая непрозрачность, медленное движение, ~24 кадра/с.
 * При prefers-reduced-motion рисуется один неподвижный кадр.
 */

const GLYPHS = "01{}[]()<>=+-*/;:.,_$#&|!?abcdefghijklmnopqrstuvwxyz";
const FONT_SIZE = 14;
const COLUMN_GAP = 22; // расстояние между колонками, px
const FPS = 24;
/** Непрозрачность головы колонки; хвост затухает к нулю. */
const OPACITY = { dark: 0.1, light: 0.08 };

type Drop = { y: number; speed: number; trail: number; chars: string[] };

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

function readTheme() {
  const root = document.documentElement;
  const accent = getComputedStyle(root).getPropertyValue("--accent").trim() || "#45d18f";
  const set = root.dataset.theme;
  const dark = set ? set === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  // canvas не понимает var(), поэтому берём готовое имя шрифта из переменной next/font
  const mono = getComputedStyle(root).getPropertyValue("--font-jetbrains").trim();
  return { accent, opacity: dark ? OPACITY.dark : OPACITY.light, font: `${FONT_SIZE}px ${mono || "ui-monospace"}, monospace` };
}

export function CodeRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let theme = readTheme();
    let drops: Drop[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = 0;

    const newDrop = (initial: boolean): Drop => {
      const trail = 8 + Math.floor(Math.random() * 18);
      const rows = Math.ceil(height / FONT_SIZE);
      return {
        // Сначала колонки разбросаны по всей высоте, потом стартуют сверху
        y: initial ? Math.random() * rows : -Math.random() * rows * 0.6,
        speed: 0.18 + Math.random() * 0.32,
        trail,
        chars: Array.from({ length: trail }, randomGlyph),
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // На узких экранах колонок меньше, чтобы фон оставался спокойным
      const gap = width < 768 ? COLUMN_GAP * 1.4 : COLUMN_GAP;
      const columns = Math.ceil(width / gap);
      drops = Array.from({ length: columns }, () => newDrop(true));
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = theme.font;
      ctx.textBaseline = "top";
      ctx.fillStyle = theme.accent;
      const gap = width / drops.length;
      drops.forEach((d, i) => {
        const x = i * gap + gap / 2 - FONT_SIZE / 3;
        for (let k = 0; k < d.trail; k++) {
          const row = Math.floor(d.y) - k;
          if (row < 0) continue;
          const y = row * FONT_SIZE;
          if (y > height) continue;
          ctx.globalAlpha = theme.opacity * (1 - k / d.trail);
          ctx.fillText(d.chars[k], x, y);
        }
      });
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      if (now - last < 1000 / FPS) return;
      last = now;
      const rows = height / FONT_SIZE;
      drops.forEach((d, i) => {
        const before = Math.floor(d.y);
        d.y += d.speed;
        // Новый символ в голове колонки, хвост сдвигается
        if (Math.floor(d.y) !== before) {
          d.chars.pop();
          d.chars.unshift(randomGlyph());
        }
        // Изредка символ в хвосте меняется: код «живой»
        if (Math.random() < 0.04) d.chars[1 + Math.floor(Math.random() * (d.trail - 1))] = randomGlyph();
        if (d.y - d.trail > rows) drops[i] = newDrop(false);
      });
      draw();
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce.matches) draw();
      else raf = requestAnimationFrame(step);
    };

    // Цвет и прозрачность следуют теме сайта и системной теме
    const onTheme = () => {
      theme = readTheme();
      draw();
    };
    const themeObserver = new MutationObserver(onTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", onTheme);
    reduce.addEventListener("change", start);
    window.addEventListener("resize", resize);

    resize();
    start();

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      scheme.removeEventListener("change", onTheme);
      reduce.removeEventListener("change", start);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 size-full" />;
}
