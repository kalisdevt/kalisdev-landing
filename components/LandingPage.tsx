import type { Site } from "@/content/site";
import { Nav, type NavData } from "./Nav";
import { Hero } from "./Hero";
import { Facts } from "./Facts";
import { About } from "./About";
import { Experience } from "./Experience";
import { CaseStudy } from "./CaseStudy";
import { Projects } from "./Projects";
import { Stack } from "./Stack";
import { Education } from "./Education";
import { Contact } from "./Contact";
import { ScrollEffects } from "./ScrollEffects";
import { CodeRain } from "./CodeRain";

/** Страница лендинга целиком; язык задаёт переданный контент. */
export function LandingPage({ site }: { site: Site }) {
  // В клиентскую шапку передаём только нужные ей поля
  const nav: NavData = {
    name: site.name,
    alias: site.alias,
    monogram: site.monogram,
    avatar: site.avatar,
    ui: site.ui,
    telegram: site.contacts.telegram,
    github: site.contacts.github,
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-30 focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-bg"
      >
        {site.ui.skipToContent}
      </a>
      <CodeRain />
      <Nav data={nav} />
      <main id="main">
        <Hero site={site} />
        <Facts site={site} />
        <About site={site} />
        <Experience site={site} />
        <CaseStudy site={site} />
        <Projects site={site} />
        <Stack site={site} />
        <Education site={site} />
        <Contact site={site} />
      </main>
      <ScrollEffects />
    </>
  );
}
