# kalisdev.tech

Лендинг-портфолио Дмитрия Тынкова (kalisdev): [www.kalisdev.tech](https://www.kalisdev.tech), английская версия на [/en](https://www.kalisdev.tech/en).

Next.js 16 (App Router, статическая генерация), Tailwind CSS v4, GSAP ScrollTrigger, Vercel.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production-сборка
npm run signature  # перегенерировать рукописную подпись
```

## Где что править

- **Тексты**: `content/site.ts` (русская версия) и `content/site.en.ts` (английская).
  Обе описаны одним типом `SiteContent` (`content/types.ts`), поэтому TypeScript
  не даст забыть строку в одной из версий. Компоненты трогать не нужно.
- **Общее для обеих версий** (фото, контакты, логотипы, скриншоты проектов): `content/shared.ts`.
- **Фото первого экрана**: три кадра под разные экраны, браузер скачивает только нужный.
  Положите файлы в `public/photos/` и пропишите пути в `content/shared.ts`, раздел `photos`:
  - `mobile`: телефоны (до 768 px), вертикальный 4:5, от 1200x1500 px;
  - `tablet`: планшеты и небольшие ноутбуки (768-1279 px), 3:2, от 2400x1600 px;
  - `desktop`: ноутбуки и мониторы (от 1280 px), широкий 2:1, от 3200x1600 px.

  Можно добавить не все: недостающий кадр заменится ближайшим. Поле `position` у кадра
  задаёт, какая его точка остаётся видимой при обрезке (по умолчанию `"50% 30%"`).
- **Аватар в шапке**: квадратное фото от 400x400 px, поле `avatar` в `content/shared.ts`.
  Пока его нет, в шапке монограмма. Аватар (или фото) попадает и в превью для соцсетей.
- **Проекты**: раздел `projects` в `content/site.ts` и `site.en.ts`, скриншоты в `public/projects/`.
- **Логотипы**: места работы в `public/logos/`, сервисы бегущей строки в `public/logos/services/`
  (одноцветные SVG, цвет задаёт сайт).
- **Рукописное имя**: векторные контуры шрифта Great Vibes, а не текст, поэтому росчерки не
  обрезаются и имя «пишется от руки». После смены `firstName` или `lastName` запустите `npm run signature`.
- **Цвета и темы**: токены в начале `app/globals.css`.
- **Анимации**: `components/ScrollEffects.tsx` (подпись, прокрутка) и `components/CodeRain.tsx` (фон).
  При `prefers-reduced-motion` отключаются.

## Устройство

- `app/(ru)` и `app/(en)/en`: два корневых layout, чтобы у каждой версии был свой `<html lang>`.
- `app/global-not-found.tsx`: одна страница 404 на весь сайт.
- `lib/document.tsx`: общий HTML-документ, метаданные с `hreflang`, Vercel Analytics.
- `lib/og.tsx`: превью для соцсетей с рукописной подписью и кириллицей.
- `app/sitemap.ts`, `app/robots.ts`: для поисковиков.

## Деплой

Push в ветку `main` на GitHub публикует сайт на Vercel автоматически.

Переменные окружения на Vercel (необязательные):

- `NEXT_PUBLIC_SITE_URL`: адрес сайта для ссылок в превью; по умолчанию берётся основной домен проекта.
- `NEXT_PUBLIC_YANDEX_VERIFICATION`: код подтверждения из Яндекс.Вебмастера.

## Шрифты и лицензии

Great Vibes и Onest распространяются по SIL Open Font License, файлы в `assets/fonts/`.
Логотипы компаний и сервисов принадлежат их владельцам и используются только для обозначения
мест работы и интеграций.
