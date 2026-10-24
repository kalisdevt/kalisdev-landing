"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Весь scroll-слой страницы в одном клиентском компоненте. Секции
 * остаются серверными и только помечают элементы data-атрибутами.
 *
 * Каждая анимация чем-то обоснована:
 *  - hero: вводит иерархию (имя, затем смысл, затем действие);
 *  - прогресс-бар: ориентир на длинной странице;
 *  - «Обо мне»: текст читается в темпе прокрутки (единственный pin);
 *  - таймлайн: линия показывает, где вы в истории опыта;
 *  - счётчики, reveal, бенто: подсвечивают новый блок при входе.
 *
 * При prefers-reduced-motion ничего из этого не создаётся,
 * контент сразу в финальном состоянии.
 */
/** Толщина пера подписи в единицах шрифта, как PEN в Signature.tsx (с запасом). */
const PEN_SIZE = 200;

/** Общая длительность письма подписи (имя и фамилия), в секундах. */
const WRITE_DURATION = 2.6;

/**
 * Письмо «от руки»: каждая буква подписи проявляется через маску-перо,
 * которое идёт вдоль её контура (stroke-dashoffset).
 *
 * Тайминг задаёт воображаемая рука, которая движется по строке слева
 * направо с постоянной скоростью: каждый контур начинает рисоваться,
 * когда рука доходит до его левого края. Поэтому отдельные куски букв
 * (например, конец перекладины «Т») не появляются раньше времени.
 * Контур обходит штрих с двух сторон, и штрих проявляется уже на первой
 * половине пути, поэтому скорость пера вдвое выше скорости руки.
 */
function writeSignature() {
  const tl = gsap.timeline();
  const lines = gsap.utils.toArray<SVGSVGElement>("[data-signature]");
  const glyphs = lines.flatMap((svg) => Array.from(svg.querySelectorAll<SVGPathElement>("[data-glyph]")));

  const strokes = lines.map((svg) =>
    Array.from(svg.querySelectorAll<SVGPathElement>("[data-glyph]")).flatMap((glyph) => {
      const mask = svg.querySelector(glyph.getAttribute("data-mask")!.slice(4, -1));
      return Array.from(mask?.querySelectorAll<SVGPathElement>("[data-pen]") ?? []).map((pen) => ({
        pen,
        len: pen.getTotalLength(),
        x: pen.getBBox().x,
        right: pen.getBBox().x + pen.getBBox().width,
      }));
    }),
  );
  const spans = strokes.map((line) => {
    const x0 = Math.min(...line.map((s) => s.x));
    const x1 = Math.max(...line.map((s) => s.right));
    return { x0, width: Math.max(1, x1 - x0) };
  });
  const totalWidth = spans.reduce((sum, s) => sum + s.width, 0);
  if (!strokes.flat().length) return tl;

  // Маски подключаем только на время анимации. Если анимацию прервут
  // (смена брейкпоинта), откат gsap снимет штриховку пера, и маска
  // станет сплошной, так что буквы всё равно останутся видны.
  glyphs.forEach((g) => g.setAttribute("mask", g.getAttribute("data-mask")!));

  let lineStart = 0;
  strokes.forEach((line, li) => {
    const { x0, width } = spans[li];
    // Время на строку пропорционально её ширине, скорость руки одинаковая
    const lineDuration = (WRITE_DURATION * width) / totalWidth;
    const handSpeed = width / lineDuration; // единиц шрифта в секунду
    line.forEach(({ pen, len, x }) => {
      // Скрытое перо: штрих длиной с контур, сдвинутый за его начало.
      // Промежуток длиннее контура на толщину пера с обеих сторон, иначе
      // скруглённый кончик соседнего штриха оставит пятно на контуре.
      gsap.set(pen, { strokeDasharray: `${len} ${len + PEN_SIZE * 2}`, strokeDashoffset: len + PEN_SIZE });
      const at = lineStart + ((x - x0) / width) * lineDuration;
      const duration = Math.max(0.12, len / 2 / handSpeed);
      tl.to(pen, { strokeDashoffset: 0, duration, ease: "none" }, at);
    });
    lineStart += lineDuration + 0.18; // рука переходит на новую строку
  });
  // Когда всё написано, снимаем маски: буквы рисуются без масок, чётко
  tl.call(() => glyphs.forEach((g) => g.removeAttribute("mask")));
  return tl;
}

export function ScrollEffects() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 1024px)",
      },
      (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        // Hero: вход по порядку
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        intro
          .fromTo(
            "[data-hero-photo]",
            { autoAlpha: 0, clipPath: "inset(12% 12% 12% 12% round 20px)", scale: 1.04 },
            { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0% round 20px)", scale: 1, duration: 1.4, clearProps: "clipPath,scale" },
            0,
          )
          .set("[data-hero-line]", { autoAlpha: 1 }, 0.3)
          .add(writeSignature(), 0.3)
          .fromTo(
            "[data-hero-fade]",
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 },
            1.3,
          );

        // Лёгкий параллакс фото внутри рамки
        gsap.fromTo(
          "[data-parallax]",
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: "[data-hero-photo]", start: "top top+=80", end: "bottom top", scrub: true },
          },
        );

        // Счётчики в цифрах
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals ?? 0);
          const fmt = (v: number) =>
            v.toLocaleString("ru-RU", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
          const state = { v: 0 };
          el.textContent = fmt(0);
          gsap.to(state, {
            v: target,
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = fmt(state.v);
            },
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        // «Обо мне»: слова проявляются по мере чтения
        const words = gsap.utils.toArray<HTMLElement>("[data-word]");
        if (words.length) {
          gsap.fromTo(
            words,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: desktop
                ? { trigger: "[data-about]", start: "top top", end: "+=110%", scrub: 0.6, pin: true }
                : { trigger: "[data-about]", start: "top 75%", end: "bottom 60%", scrub: 0.6 },
            },
          );
        }

        // Таймлайн опыта
        gsap.fromTo(
          "[data-timeline-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-timeline]", start: "top 65%", end: "bottom 65%", scrub: 0.4 },
          },
        );

        // Появление блоков при входе в экран
        gsap.set("[data-reveal]", { autoAlpha: 0, y: 24 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "expo.out", overwrite: true }),
        });

        gsap.set("[data-bento]", { autoAlpha: 0, y: 32, scale: 0.98 });
        ScrollTrigger.batch("[data-bento]", {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, duration: 1, stagger: 0.08, ease: "expo.out", overwrite: true }),
        });

        gsap.set("[data-chip]", { autoAlpha: 0, y: 12 });
        ScrollTrigger.batch("[data-chip]", {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.03, ease: "power2.out", overwrite: true }),
        });

        // Финальный блок контактов
        gsap.fromTo(
          "[data-contact]",
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-contact]", start: "top 85%", once: true },
          },
        );

        // Прогресс чтения: создаётся последним, чтобы учесть место под pin
        gsap.to("[data-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
        });
      },
    );

    // Шрифты меняют высоту строк, пересчитываем позиции триггеров
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => mm.revert();
  });

  return null;
}
