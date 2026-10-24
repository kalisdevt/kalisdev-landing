/**
 * Русская версия сайта. Английская лежит в site.en.ts, общие данные
 * (фото, контакты, логотипы) в shared.ts.
 *
 * Правило оформления: никаких длинных тире. Для диапазонов дат и
 * составных слов используется обычный дефис "-".
 *
 * После смены firstName или lastName перегенерируйте рукописную
 * подпись: npm run signature
 */
import { shared } from "./shared";
import type { SiteContent } from "./types";

export type { Logo, Photo, SiteContent as Site } from "./types";

export const site: SiteContent = {
  locale: "ru",
  path: "/",
  numberLocale: "ru-RU",
  ogLocale: "ru_RU",

  name: "Дмитрий Тынков",
  firstName: "Дмитрий",
  lastName: "Тынков",
  alias: shared.alias,
  monogram: "ДТ",
  role: "Fullstack-разработчик",
  city: "Краснодар",
  country: "Россия",

  photos: shared.photos,
  photoAlt: "Дмитрий Тынков, fullstack-разработчик",
  avatar: shared.avatar,
  contacts: shared.contacts,

  meta: {
    title: "Дмитрий Тынков (kalisdev), Fullstack-разработчик",
    description:
      "Fullstack-разработчик на Vue.js и Node.js. Опыт в одиночку вести CRM/LMS-платформу: backend на Node.js и MongoDB, интерфейсы на Vue, платежи и интеграции по API.",
  },

  hero: {
    status: "Открыт к предложениям, удалённо",
    lead: "Fullstack на Vue.js и Node.js. Проектирую бэкенд, собираю интерфейсы, подключаю платежи и API, довожу до продакшена.",
  },

  facts: [
    { value: 4, decimals: 0, unit: "года", label: "в веб-разработке" },
    { value: 1.5, decimals: 1, unit: "года", label: "коммерческого fullstack-опыта" },
    { value: 11, decimals: 0, unit: "сервисов", label: "подключено по API в одном продукте" },
    { value: 1, decimals: 0, unit: "разработчик", label: "на всю CRM/LMS-платформу" },
  ],

  about:
    "Пишу для веба около четырёх лет, последние полтора года коммерчески и в fullstack. Привык вести продукт в одиночку: разбираюсь в бизнес-задаче, раскладываю её на части и довожу до продакшена. Параллельно занимаюсь ML и компьютерным зрением: Python, PyTorch, нейросети, Depth Anything. Опираюсь на математику, линейную алгебру и статистику, а с LLM работаю через context engineering. Решения умею аргументировать, критику принимаю спокойно.",

  experienceLead: "Полтора года коммерческой разработки, большую часть в роли единственного инженера на продукте.",

  experience: [
    {
      company: "MAGNIT TECH",
      url: "https://magnit.tech",
      logo: shared.logos.magnit,
      role: "Стажёр-инженер, программа MAGNIT TECH PRO",
      team: "Департамент по развитию и разработке ИС коммерческого блока. Направление развития работы с коммерческими условиями",
      period: "Сентябрь 2026 - сейчас",
      current: true,
      summary:
        "Прошёл отбор на десятимесячную стажировку в технологическом подразделении одного из крупнейших ритейлеров России. Работаю удалённо в продуктовой команде.",
      points: [
        "Участвую в миграции внутреннего приложения компании с Ext JS 7.6 на Vue.",
        "Разбираю архитектуру Ext JS: структуру компонентов, ViewModel и контроллеры, чтобы корректно перенести логику и состояние на Vue.",
        "Беру задачи из бэклога команды вместе с наставником, работаю в таск-трекере, Confluence и Git.",
        "Иду по индивидуальному плану развития с ментором, цель программы: уровень Junior+.",
      ],
      tags: ["Vue.js", "TypeScript", "Ext JS 7.6", "JavaScript", "MVVM", "Git"],
    },
    {
      company: "Выполнятор",
      url: "https://vypolnyator.ru",
      logo: { ...shared.logos.vypolnyator, wordmark: "Выполнятор" },
      role: "Fullstack-разработчик",
      team: null,
      period: "Май 2026 - Август 2026",
      current: false,
      summary: "Частный проект: трекер задач на Vue.js, Node.js и MySQL.",
      points: [
        "Развивал существующую архитектуру и legacy-код, держал единый стиль, чинил баги.",
        "Интегрировал magnific.com для генерации иконок нейросетью прямо в продукте.",
        "Поддерживал проект на Linux-серверах в Docker, работал с GitHub и Gitverse.",
        "Подготовил юридические документы для подключения ЮKassa: оферту и пользовательское соглашение.",
      ],
      tags: ["Vue.js", "Node.js", "MySQL", "Docker"],
    },
    {
      company: "ООО «РЕПКА»",
      url: "https://repka-school.ru",
      logo: { ...shared.logos.repka, wordmark: "Онлайн-школа \"Репка\"" },
      role: "Fullstack-разработчик, единственный на проекте",
      team: null,
      period: "Май 2025 - Октябрь 2026",
      current: false,
      summary: "Полный цикл разработки и поддержки образовательной CRM/LMS-платформы: от схемы данных до деплоя.",
      points: [
        "Спроектировал и развивал серверную часть на Node.js и MongoDB.",
        "Собрал адаптивный интерфейс на Vue.js и Vuetify.",
        "Деплоил и поддерживал приложение на Linux-серверах.",
      ],
      tags: ["Node.js", "MongoDB", "Vue.js", "Vuetify", "S3", "Linux"],
      caseLink: true,
    },
  ],

  caseStudy: {
    title: "Кейс: платформа РЕПКИ",
    lead: "Полтора года был единственным разработчиком образовательной CRM/LMS. Вот что в ней сделано моими руками.",
    cells: {
      backend: {
        title: "Архитектура и backend",
        text: "Спроектировал серверную часть на Node.js и MongoDB, описал схемы и связи данных через Mongoose.",
      },
      s3: {
        title: "Документы в S3",
        text: "Модуль загрузки, хранения и управления подписанными документами в облачном хранилище.",
      },
      reports: {
        title: "Автоотчёты",
        text: "Система, которая сама собирает отчёты для преподавателей и снимает с команды рутину.",
      },
      referral: {
        title: "Реферальная программа",
        text: "Начисления, привязка приглашённых пользователей и отображение бонусов в профиле.",
      },
      dashboards: {
        title: "Дашборды и SMS",
        text: "Интерактивная аналитика показателей и SMS-уведомления для пользователей.",
      },
      integrations: {
        title: "Платежи и сторонние сервисы",
        text: "Подключил эквайринги, CRM, онлайн-кассу и сервисы данных по их API.",
      },
    },
    services: shared.services,
  },

  projects: {
    title: "Проекты",
    lead: "То, что я делаю помимо коммерческой работы: учебные проекты, которые довожу до уровня продукта, и этот сайт.",
    items: [
      {
        id: "crm",
        title: "CRM рекламного агентства",
        kind: "Учебный проект, КубГУ",
        summary:
          "Обращения из Telegram и с сайта собираются в одну ленту, по каждому автоматически заводятся клиент и лид, а менеджер ведёт переписку и сделку в одном окне.",
        points: [
          "Защита от дублей при повторной доставке, поиск клиента по каналу, телефону или e-mail.",
          "Ответ клиенту в Telegram прямо из системы, роли и учётные записи, этапы сделки с обязательной причиной отказа.",
          "Каждый pull request проходит линтер, проверку безопасности, интеграционные тесты и ИИ-ревью, после слияния проект сам разворачивается на Vercel.",
        ],
        stack: ["Node.js 24", "Express 5", "PostgreSQL 17", "Vue 3", "Docker Compose", "GitHub Actions", "JWT", "zod"],
        image: null,
        pipeline: ["ESLint", "Semgrep", "Тесты", "Сборка образов", "Деплой"],
        links: [{ label: "Код на GitHub", href: "https://github.com/kalisdevt/AdAgencyCRM" }],
      },
      {
        id: "transport",
        title: "Транспортная задача",
        kind: "Учебный проект, исследование операций",
        summary: "Веб-калькулятор транспортной задачи линейного программирования, который расписывает решение по шагам.",
        points: [
          "Опорный план методом северо-западного угла и оптимизация методом потенциалов, с итерациями и циклами пересчёта.",
          "Формулы через MathJax, таблицы до 10 на 10.",
        ],
        stack: ["Vue 3", "Vite", "Bootstrap Vue", "MathJax"],
        image: { ...shared.projectImages.transport, alt: "Пошаговое решение транспортной задачи: таблица первого опорного плана" },
        links: [
          { label: "Открыть демо", href: "https://drive-task.vercel.app" },
          { label: "Код", href: "https://github.com/kalisdevt/drivetask" },
        ],
      },
      {
        id: "landing",
        title: "Этот сайт",
        kind: "Pet-проект",
        summary: "Лендинг-портфолио на Next.js: рукописная подпись из контуров шрифта, фон с падающим кодом, две языковые версии.",
        points: [
          "Подпись собирается из контуров Great Vibes скриптом на opentype.js и «пишется» через маски и stroke-dashoffset.",
          "Тёмная и светлая темы, статическая сборка, деплой на Vercel из GitHub.",
        ],
        stack: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "GSAP", "opentype.js"],
        image: { ...shared.projectImages.landing, alt: "Первый экран сайта kalisdev.tech" },
        links: [{ label: "Код на GitHub", href: "https://github.com/kalisdevt/kalisdev-landing" }],
      },
    ],
  },

  stack: [
    { group: "Языки", items: ["JavaScript", "TypeScript", "Python"] },
    { group: "Frontend", items: ["Vue.js", "Pinia", "Vuex", "Vuetify", "Ext JS", "HTML5", "CSS3", "Sass / SCSS"] },
    {
      group: "Backend и DevOps",
      items: ["Node.js", "Express", "REST API", "Git", "Docker", "CI/CD", "Linux, SSH", "AWS S3", "Claude Code"],
    },
    { group: "Базы данных", items: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL", "Oracle"] },
    {
      group: "ML и CV",
      items: ["Neural Networks / Deep Learning", "Machine Learning", "PyTorch", "Depth Anything", "Context Engineering"],
    },
    { group: "Математика и данные", items: ["Математика", "Линейная алгебра", "Статистика", "NumPy"] },
  ],

  education: [
    {
      year: "2028",
      title: "Прикладная информатика, бакалавриат",
      place: "Кубанский государственный университет, факультет компьютерных технологий и прикладной математики",
      note: "Год окончания",
    },
    {
      year: "2023",
      title: "«Код будущего». Fullstack-разработчик: от собственного сайта до полноценного web-приложения",
      place: "Московская школа программистов",
      note: "Сертификат",
    },
  ],

  contact: {
    title: "Есть задача? Давайте обсудим.",
    text: "Быстрее всего отвечаю в Telegram. Работаю удалённо, рассматриваю полную и частичную занятость, а также проектную работу.",
  },

  ui: {
    skipToContent: "Перейти к содержимому",
    navAria: "Основная навигация",
    nav: [
      { href: "#experience", label: "Опыт" },
      { href: "#case", label: "Кейс" },
      { href: "#projects", label: "Проекты" },
      { href: "#stack", label: "Стек" },
      { href: "#contact", label: "Контакты" },
    ],
    homeAria: "в начало страницы",
    write: "Написать",
    seeExperience: "Смотреть опыт",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    themeToLight: "Включить светлую тему",
    themeToDark: "Включить тёмную тему",
    otherLocale: { label: "EN", href: "/en", hrefLang: "en", title: "English version" },
    factsAria: "Коротко в цифрах",
    aboutTitle: "Обо мне",
    experienceTitle: "Опыт",
    now: "Сейчас",
    techAria: "Технологии",
    caseMore: "Подробнее в кейсе",
    codeAria: "Пример схемы данных на Mongoose",
    servicesAria: "Подключённые сервисы",
    servicesCount: "{n} сервисов",
    stackTitle: "Стек",
    educationTitle: "Образование",
    contactEmail: "или на почту",
    contactGithub: "код на GitHub",
    copy: "Копировать",
    copied: "Скопировано",
    copyError: "Не удалось, выделите вручную",
  },
};
