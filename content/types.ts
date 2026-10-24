/**
 * Структура контента сайта. Русская и английская версии описаны
 * одним типом, поэтому TypeScript не даст забыть строку в одной из них.
 */

export type Locale = "ru" | "en";

export type Logo = {
  src: string;
  width: number;
  height: number;
  /** Перекрашивать логотип в цвет текста (для одноцветных SVG). */
  mono?: boolean;
  /** Текст рядом со значком, если он часть логотипа. */
  wordmark?: string;
};

export type Photo = {
  src: string;
  /** Какая точка кадра остаётся видимой при обрезке, "по горизонтали по вертикали". */
  position?: string;
};

export type ServiceLogo = { name: string; src: string; width: number; height: number; h: number };

export type Job = {
  company: string;
  url: string;
  logo: Logo | null;
  role: string;
  team: string | null;
  period: string;
  current: boolean;
  summary: string;
  points: string[];
  tags: string[];
  caseLink?: boolean;
};

export type Project = {
  id: string;
  title: string;
  /** Короткая пометка: учебный проект, pet-проект и т. п. */
  kind: string;
  summary: string;
  points: string[];
  stack: string[];
  /** Скриншот проекта. Если null, карточка без картинки. */
  image: { src: string; alt: string; width: number; height: number } | null;
  /** Шаги CI/CD для визуальной ленты пайплайна (только у главного проекта). */
  pipeline?: string[];
  links: { label: string; href: string }[];
};

export type SiteContent = {
  locale: Locale;
  /** Адрес версии на сайте: "/" или "/en". */
  path: string;
  /** Формат чисел: "ru-RU" даёт 1,5; "en-US" даёт 1.5. */
  numberLocale: string;
  ogLocale: string;

  name: string;
  firstName: string;
  lastName: string;
  alias: string;
  monogram: string;
  role: string;
  city: string;
  country: string;

  photos: { mobile: Photo | null; tablet: Photo | null; desktop: Photo | null };
  photoAlt: string;
  avatar: string | null;
  contacts: { telegram: string; github: string; email: string; phone: string | null };

  meta: { title: string; description: string };
  hero: { status: string; lead: string };
  facts: { value: number; decimals: number; unit: string; label: string }[];
  about: string;
  experienceLead: string;
  experience: Job[];
  caseStudy: {
    title: string;
    lead: string;
    cells: Record<"backend" | "s3" | "reports" | "referral" | "dashboards" | "integrations", { title: string; text: string }>;
    services: ServiceLogo[];
  };
  projects: { title: string; lead: string; items: Project[] };
  stack: { group: string; items: string[] }[];
  education: { year: string; title: string; place: string; note: string }[];
  contact: { title: string; text: string };

  /** Подписи интерфейса: кнопки, меню, подсказки для скринридеров. */
  ui: {
    skipToContent: string;
    navAria: string;
    nav: { href: string; label: string }[];
    homeAria: string;
    write: string;
    seeExperience: string;
    openMenu: string;
    closeMenu: string;
    themeToLight: string;
    themeToDark: string;
    /** Переключатель на другую версию языка. */
    otherLocale: { label: string; href: string; hrefLang: string; title: string };
    factsAria: string;
    aboutTitle: string;
    experienceTitle: string;
    now: string;
    techAria: string;
    caseMore: string;
    codeAria: string;
    servicesAria: string;
    /** Подпись счётчика сервисов, {n} заменяется числом. */
    servicesCount: string;
    stackTitle: string;
    educationTitle: string;
    contactEmail: string;
    contactGithub: string;
    copy: string;
    copied: string;
    copyError: string;
  };
};
