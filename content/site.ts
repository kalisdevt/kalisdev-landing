/**
 * Весь текст сайта живёт здесь. Правки вносятся в этот файл,
 * компоненты трогать не нужно.
 *
 * Правило оформления: никаких длинных тире. Для диапазонов дат и
 * составных слов используется обычный дефис "-".
 */

export type Logo = {
  src: string;
  width: number;
  height: number;
  mono?: boolean;
  wordmark?: string;
};

export type Photo = {
  src: string;
  position?: string;
};

export const site = {
  name: "Дмитрий Тынков",
  firstName: "Дмитрий",
  lastName: "Тынков",
  /** Технологический псевдоним: шапка, подвал, заголовок вкладки и поисковики. */
  alias: "kalisdev",
  role: "Fullstack-разработчик",
  stackLine: "Vue.js, Node.js",
  city: "Краснодар",

  /**
   * ФОТО ПЕРВОГО ЭКРАНА: три кадра под разные ширины экрана.
   * Положите файлы в /public/photos/ и впишите пути, например
   * { src: "/photos/desktop.jpg" }. Браузер скачивает только тот кадр,
   * который подходит экрану.
   *
   * Если какого-то кадра нет, берётся ближайший из оставшихся.
   * Пока все три null, показывается заглушка с монограммой.
   *
   * position: какая точка кадра остаётся видимой при обрезке,
   * "по горизонтали по вертикали", по умолчанию "50% 30%".
   */
  photos: {
    /** Телефоны, экран уже 768 px. Вертикальный кадр 4:5, от 1200x1500 px. */
    mobile: null as Photo | null,
    /** Планшеты и небольшие ноутбуки, 768-1279 px. Кадр 3:2, от 2000x1333 px. */
    tablet: null as Photo | null,
    /** Ноутбуки и мониторы, от 1280 px. Широкий кадр 2:1, от 2800x1400 px. */
    desktop: null as Photo | null,
  },
  photoAlt: "Дмитрий Тынков, fullstack-разработчик",

  /**
   * АВАТАР в шапке сайта: маленькое круглое фото вместо монограммы «ДТ».
   * Квадратный кадр от 400x400 px, лицо крупно и по центру
   * (на экране он 36 px, мелкие детали не видны).
   * Например: avatar: "/photos/avatar.jpg". Пока null, показывается «ДТ».
   */
  avatar: null as string | null,

  contacts: {
    telegram: "kalisdev",
    github: "kalisdevt",
    email: "dimatynkovvv@yandex.ru",
    /** Телефон на публичной странице собирает спам. Впишите номер, если всё же нужен. */
    phone: null as string | null,
  },

  hero: {
    status: "Открыт к предложениям, удалённо",
    lead:
      "Fullstack на Vue.js и Node.js. Проектирую бэкенд, собираю интерфейсы, подключаю платежи и API, довожу до продакшена.",
  },

  facts: [
    { value: 4, decimals: 0, unit: "года", label: "в веб-разработке" },
    { value: 1.5, decimals: 1, unit: "года", label: "коммерческого fullstack-опыта" },
    { value: 11, decimals: 0, unit: "сервисов", label: "подключено по API в одном продукте" },
    { value: 1, decimals: 0, unit: "разработчик", label: "на всю CRM/LMS-платформу" },
  ],

  about:
    "Пишу для веба около четырёх лет, последние полтора года коммерчески и в fullstack. Привык вести продукт в одиночку: разбираюсь в бизнес-задаче, раскладываю её на части и довожу до продакшена. Параллельно занимаюсь ML и компьютерным зрением: Python, PyTorch, нейросети, Depth Anything. Опираюсь на математику, линейную алгебру и статистику, а с LLM работаю через context engineering. Решения умею аргументировать, критику принимаю спокойно.",

  experience: [
    {
      company: "MAGNIT TECH",
      url: "https://magnit.tech",
      /**
       * Логотип компании вместо названия. mono: true перекрашивает его
       * в цвет текста (подходит для одноцветных SVG, работает в обеих темах).
       * wordmark: текст рядом со значком, если он часть логотипа.
       */
      logo: { src: "/logos/magnit-tech.svg", width: 94, height: 32, mono: true } as Logo | null,
      role: "Стажёр-инженер, программа MAGNIT TECH PRO",
      team: "Департамент по развитию и разработке ИС коммерческого блока. Направление развития работы с коммерческими условиями" as string | null,
      period: "Сентябрь 2026 - сейчас",
      current: true,
      summary:
        "Прошёл отбор на десятимесячную стажировку в технологическом подразделении одного из крупнейших ритейлеров России. Работаю удалённо в продуктовой команде.",
      points: [
        "Участвую в миграции внутреннего приложения компании с Ext JS 7.6 на Vue.",
        "Разбираю архитектуру Ext JS: структуру компонентов, ViewModel и контроллеры, чтобы корректно перенести логику и состояние на Vue.",
        "Беру задачи из бэклога команды вместе с наставником, работаю в таск-трекере, Confluence и Git.",
        "Иду по индивидуальному плану развития с ментором, цель программы: уровень Junior+.",
      ] as string[],
      tags: ["Vue.js", "TypeScript", "Ext JS 7.6", "JavaScript", "MVVM", "Git"] as string[],
    },
    {
      company: "Выполнятор",
      url: "https://vypolnyator.ru",
      logo: { src: "/logos/vypolnyator.png", width: 40, height: 40, wordmark: "Выполнятор" } as Logo | null,
      role: "Fullstack-разработчик",
      team: null as string | null,
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
      logo: { src: "/logos/repka.png", width: 40, height: 40, wordmark: "Онлайн-школа \"Репка\"" } as Logo | null,
      role: "Fullstack-разработчик, единственный на проекте",
      team: null as string | null,
      period: "Май 2025 - Октябрь 2026",
      current: false,
      summary:
        "Полный цикл разработки и поддержки образовательной CRM/LMS-платформы: от схемы данных до деплоя.",
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
    lead:
      "Полтора года был единственным разработчиком образовательной CRM/LMS. Вот что в ней сделано моими руками.",
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
    /**
     * Логотипы сервисов для бегущей строки: одноцветные, файлы в /public/logos/services.
     * Файл работает как маска, поэтому важна только форма, цвет задаёт сайт.
     * width/height: пропорции файла; h: высота на странице в px (подбирается
     * на глаз, чтобы логотипы разной формы выглядели одного веса).
     */
    services: [
      { name: "amoCRM", src: "/logos/services/amocrm.svg", width: 83, height: 25, h: 24 },
      { name: "DaData", src: "/logos/services/dadata.svg", width: 500, height: 148, h: 30 },
      { name: "i-digital", src: "/logos/services/idigital.svg", width: 112, height: 69, h: 38 },
      { name: "TargetSMS", src: "/logos/services/targetsms.png", width: 330, height: 40, h: 22 },
      { name: "CloudKassir", src: "/logos/services/cloudkassir.svg", width: 208, height: 40, h: 30 },
      { name: "Jump.Finance", src: "/logos/services/jump.svg", width: 160, height: 34, h: 28 },
      { name: "Точка Банк", src: "/logos/services/tochka.svg", width: 1305, height: 172, h: 22 },
      { name: "Т-Рассрочки", src: "/logos/services/tbank.svg", width: 253, height: 74, h: 34 },
      { name: "Долями", src: "/logos/services/dolyame.svg", width: 322, height: 48, h: 24 },
      { name: "Яндекс Пэй", src: "/logos/services/yandexpay.svg", width: 96, height: 32, h: 30 },
      { name: "CloudPayments", src: "/logos/services/cloudpayments.svg", width: 187, height: 34, h: 30 },
    ],
  },

  stack: [
    {
      group: "Языки",
      items: ["JavaScript", "TypeScript", "Python"],
    },
    {
      group: "Frontend",
      items: ["Vue.js", "Pinia", "Vuex", "Vuetify", "Ext JS", "HTML5", "CSS3", "Sass / SCSS"],
    },
    {
      group: "Backend и DevOps",
      items: ["Node.js", "Express", "REST API", "Git", "Docker", "CI/CD", "Linux, SSH", "AWS S3", "Claude Code"],
    },
    {
      group: "Базы данных",
      items: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL", "Oracle"],
    },
    {
      group: "ML и CV",
      items: ["Neural Networks / Deep Learning", "Machine Learning", "PyTorch", "Depth Anything", "Context Engineering"],
    },
    {
      group: "Математика и данные",
      items: ["Математика", "Линейная алгебра", "Статистика", "NumPy"],
    },
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
} as const;

export type Site = typeof site;
