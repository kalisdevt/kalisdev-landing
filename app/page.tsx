import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Facts } from "@/components/Facts";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { CaseStudy } from "@/components/CaseStudy";
import { Stack } from "@/components/Stack";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { ScrollEffects } from "@/components/ScrollEffects";
import { CodeRain } from "@/components/CodeRain";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-30 focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-bg"
      >
        Перейти к содержимому
      </a>
      <CodeRain />
      <Nav />
      <main id="main">
        <Hero />
        <Facts />
        <About />
        <Experience />
        <CaseStudy />
        <Stack />
        <Education />
        <Contact />
      </main>
      <ScrollEffects />
    </>
  );
}
