/**
 * English version of the site. Same structure as site.ts (enforced by
 * the SiteContent type); shared data lives in shared.ts.
 *
 * No em dashes: use a regular hyphen "-" for ranges and compounds.
 * After changing firstName or lastName, regenerate the handwritten
 * signature: npm run signature
 */
import { shared } from "./shared";
import type { SiteContent } from "./types";

export const siteEn: SiteContent = {
  locale: "en",
  path: "/en",
  numberLocale: "en-US",
  ogLocale: "en_US",

  name: "Dmitriy Tynkov",
  firstName: "Dmitriy",
  lastName: "Tynkov",
  alias: shared.alias,
  monogram: "DT",
  role: "Fullstack developer",
  city: "Krasnodar",
  country: "Russia",

  photos: shared.photos,
  photoAlt: "Dmitriy Tynkov, fullstack developer",
  avatar: shared.avatar,
  contacts: shared.contacts,

  meta: {
    title: "Dmitriy Tynkov (kalisdev), Fullstack developer",
    description:
      "Fullstack developer working with Vue.js and Node.js. Built and ran an education CRM/LMS platform solo: Node.js and MongoDB backend, Vue interfaces, payments and third-party API integrations.",
  },

  hero: {
    status: "Open to offers, remote",
    lead: "Fullstack with Vue.js and Node.js. I design backends, build interfaces, wire up payments and APIs, and ship to production.",
  },

  facts: [
    { value: 4, decimals: 0, unit: "years", label: "in web development" },
    { value: 1.5, decimals: 1, unit: "years", label: "of commercial fullstack work" },
    { value: 11, decimals: 0, unit: "services", label: "integrated via API in one product" },
    { value: 1, decimals: 0, unit: "developer", label: "for an entire CRM/LMS platform" },
  ],

  about:
    "I have been building for the web for about four years, the last year and a half commercially and fullstack. I am used to owning a product alone: I dig into the business problem, break it down and take it all the way to production. Alongside that I work on ML and computer vision: Python, PyTorch, neural networks, Depth Anything. I lean on math, linear algebra and statistics, and I work with LLMs through context engineering. I can defend my technical decisions and take criticism calmly.",

  experienceLead: "A year and a half of commercial development, most of it as the only engineer on the product.",

  experience: [
    {
      company: "MAGNIT TECH",
      url: "https://magnit.tech",
      logo: shared.logos.magnit,
      role: "Intern engineer, MAGNIT TECH PRO program",
      team: "Commercial Unit Information Systems Development Department, commercial terms team",
      period: "September 2026 - present",
      current: true,
      summary:
        "Selected for a ten-month internship at the technology division of one of Russia's largest retailers. Working remotely in a product team.",
      points: [
        "Taking part in migrating an internal company application from Ext JS 7.6 to Vue.",
        "Mapping the Ext JS architecture (component structure, ViewModels and controllers) to move logic and state to Vue correctly.",
        "Picking up backlog tasks together with a mentor, using the team's task tracker, Confluence and Git.",
        "Following an individual development plan with a mentor; the program targets the Junior+ level.",
      ],
      tags: ["Vue.js", "TypeScript", "Ext JS 7.6", "JavaScript", "MVVM", "Git"],
    },
    {
      company: "Vypolnyator",
      url: "https://vypolnyator.ru",
      logo: { ...shared.logos.vypolnyator, wordmark: "Vypolnyator" },
      role: "Fullstack developer",
      team: null,
      period: "May 2026 - August 2026",
      current: false,
      summary: "Private project: a task tracker built with Vue.js, Node.js and MySQL.",
      points: [
        "Extended the existing architecture and legacy code, kept a consistent code style, fixed bugs.",
        "Integrated magnific.com to generate icons with AI right inside the product.",
        "Maintained the project on Linux servers with Docker, worked with GitHub and Gitverse.",
        "Prepared the legal documents required to connect the YooKassa payment gateway: public offer and terms of service.",
      ],
      tags: ["Vue.js", "Node.js", "MySQL", "Docker"],
    },
    {
      company: "REPKA LLC",
      url: "https://repka-school.ru",
      logo: { ...shared.logos.repka, wordmark: "Repka online school" },
      role: "Fullstack developer, sole engineer on the project",
      team: null,
      period: "May 2025 - October 2026",
      current: false,
      summary: "End-to-end development and support of an education CRM/LMS platform, from data schema to deployment.",
      points: [
        "Designed and evolved the backend on Node.js and MongoDB.",
        "Built a responsive interface with Vue.js and Vuetify.",
        "Deployed and maintained the application on Linux servers.",
      ],
      tags: ["Node.js", "MongoDB", "Vue.js", "Vuetify", "S3", "Linux"],
      caseLink: true,
    },
  ],

  caseStudy: {
    title: "Case study: the Repka platform",
    lead: "For a year and a half I was the only developer of an education CRM/LMS. Here is what I built in it.",
    cells: {
      backend: {
        title: "Architecture and backend",
        text: "Designed the server side on Node.js and MongoDB, with data schemas and relations defined in Mongoose.",
      },
      s3: {
        title: "Documents in S3",
        text: "A module for uploading, storing and managing signed documents in cloud storage.",
      },
      reports: {
        title: "Automated reports",
        text: "A system that builds teacher reports on its own and takes routine work off the team.",
      },
      referral: {
        title: "Referral program",
        text: "Reward accrual, linking invited users and showing bonuses in the user profile.",
      },
      dashboards: {
        title: "Dashboards and SMS",
        text: "Interactive analytics dashboards and SMS notifications for users.",
      },
      integrations: {
        title: "Payments and third-party services",
        text: "Connected payment acquiring, a CRM, an online cash register and data services through their APIs.",
      },
    },
    services: shared.services,
  },

  projects: {
    title: "Projects",
    lead: "What I build outside commercial work: university projects I take to product level, and this website.",
    items: [
      {
        id: "crm",
        title: "Ad agency CRM",
        kind: "University project, Kuban State University",
        summary:
          "Requests from Telegram and the website land in a single inbox, a client and a lead are created for each one automatically, and a manager handles the conversation and the deal in one window.",
        points: [
          "Duplicate protection on redelivery, client lookup by channel ID, phone or email.",
          "Replies to clients in Telegram straight from the system, roles and accounts, deal stages with a required rejection reason.",
          "Every pull request goes through linting, a security scan, integration tests and an AI review; after merge the project deploys itself to Vercel.",
        ],
        stack: ["Node.js 24", "Express 5", "PostgreSQL 17", "Vue 3", "Docker Compose", "GitHub Actions", "JWT", "zod"],
        image: null,
        pipeline: ["ESLint", "Semgrep", "Tests", "Image build", "Deploy"],
        links: [{ label: "Code on GitHub", href: "https://github.com/kalisdevt/AdAgencyCRM" }],
      },
      {
        id: "transport",
        title: "Transportation problem",
        kind: "University project, operations research",
        summary: "A web solver for the linear programming transportation problem that writes out the solution step by step.",
        points: [
          "Initial plan with the northwest corner method and optimization with the method of potentials, including iterations and redistribution cycles.",
          "Formulas rendered with MathJax, tables up to 10 by 10.",
        ],
        stack: ["Vue 3", "Vite", "Bootstrap Vue", "MathJax"],
        image: { ...shared.projectImages.transport, alt: "Step-by-step solution of a transportation problem: the initial plan table" },
        links: [
          { label: "Open demo", href: "https://drive-task.vercel.app" },
          { label: "Code", href: "https://github.com/kalisdevt/drivetask" },
        ],
      },
      {
        id: "landing",
        title: "This website",
        kind: "Pet project",
        summary: "A Next.js portfolio landing page: a handwritten signature built from font outlines, a falling code background, two languages.",
        points: [
          "The signature is built from Great Vibes outlines with an opentype.js script and is \"written\" with masks and stroke-dashoffset.",
          "Dark and light themes, static build, deployed to Vercel from GitHub.",
        ],
        stack: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "GSAP", "opentype.js"],
        image: { ...shared.projectImages.landing, alt: "The first screen of kalisdev.tech" },
        links: [{ label: "Code on GitHub", href: "https://github.com/kalisdevt/kalisdev-landing" }],
      },
    ],
  },

  stack: [
    { group: "Languages", items: ["JavaScript", "TypeScript", "Python"] },
    { group: "Frontend", items: ["Vue.js", "Pinia", "Vuex", "Vuetify", "Ext JS", "HTML5", "CSS3", "Sass / SCSS"] },
    {
      group: "Backend and DevOps",
      items: ["Node.js", "Express", "REST API", "Git", "Docker", "CI/CD", "Linux, SSH", "AWS S3", "Claude Code"],
    },
    { group: "Databases", items: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL", "Oracle"] },
    {
      group: "ML and CV",
      items: ["Neural Networks / Deep Learning", "Machine Learning", "PyTorch", "Depth Anything", "Context Engineering"],
    },
    { group: "Math and data", items: ["Mathematics", "Linear algebra", "Statistics", "NumPy"] },
  ],

  education: [
    {
      year: "2028",
      title: "Bachelor's degree in Applied Computer Science",
      place: "Kuban State University, Faculty of Computer Technologies and Applied Mathematics",
      note: "Expected graduation",
    },
    {
      year: "2023",
      title: "\"Code of the Future\". Fullstack developer: from a personal website to a full web application",
      place: "Moscow School of Programmers",
      note: "Certificate",
    },
  ],

  contact: {
    title: "Have a project? Let's talk.",
    text: "Telegram is the fastest way to reach me. I work remotely and am open to full-time, part-time and project work.",
  },

  ui: {
    skipToContent: "Skip to content",
    navAria: "Main navigation",
    nav: [
      { href: "#experience", label: "Experience" },
      { href: "#case", label: "Case" },
      { href: "#projects", label: "Projects" },
      { href: "#stack", label: "Stack" },
      { href: "#contact", label: "Contact" },
    ],
    homeAria: "back to top",
    write: "Message me",
    seeExperience: "See experience",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    otherLocale: { label: "RU", href: "/", hrefLang: "ru", title: "Русская версия" },
    factsAria: "At a glance",
    aboutTitle: "About me",
    experienceTitle: "Experience",
    now: "Now",
    techAria: "Technologies",
    caseMore: "More in the case study",
    codeAria: "Example Mongoose data schema",
    servicesAria: "Integrated services",
    servicesCount: "{n} services",
    stackTitle: "Stack",
    educationTitle: "Education",
    contactEmail: "or by email",
    contactGithub: "code on GitHub",
    copy: "Copy",
    copied: "Copied",
    copyError: "Could not copy, select it manually",
  },
};
