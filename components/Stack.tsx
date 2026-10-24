import {
  siVuedotjs,
  siPinia,
  siVuetify,
  siJavascript,
  siHtml5,
  siCss,
  siSass,
  siNodedotjs,
  siExpress,
  siMongodb,
  siMongoose,
  siMysql,
  siLinux,
  siDocker,
  siGit,
  siClaude,
  siPython,
  siPytorch,
  siPostgresql,
  siNumpy,
  siGithubactions,
  siTypescript,
  siSencha,
  type SimpleIcon,
} from "simple-icons";
import {
  Brain,
  ChartBar,
  ChatCenteredText,
  Cloud,
  CubeFocus,
  Database,
  GridFour,
  Graph,
  MathOperations,
  PlugsConnected,
  Stack as StackIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Site } from "@/content/site";

// Логотипы из Simple Icons. Для того, чего там нет, берём иконку Phosphor.
const logos: Record<string, SimpleIcon | React.ReactNode> = {
  "Vue.js": siVuedotjs,
  Pinia: siPinia,
  Vuex: siVuedotjs,
  Vuetify: siVuetify,
  JavaScript: siJavascript,
  HTML5: siHtml5,
  CSS3: siCss,
  "Sass / SCSS": siSass,
  "Node.js": siNodedotjs,
  Express: siExpress,
  MongoDB: siMongodb,
  Mongoose: siMongoose,
  MySQL: siMysql,
  "REST API": <PlugsConnected size={22} aria-hidden />,
  "Linux, SSH": siLinux,
  Docker: siDocker,
  Git: siGit,
  "AWS S3": <Cloud size={22} aria-hidden />,
  "Claude Code": siClaude,
  "CI/CD": siGithubactions,
  Python: siPython,
  TypeScript: siTypescript,
  // Ext JS выпускает Sencha
  "Ext JS": siSencha,
  PostgreSQL: siPostgresql,
  // Логотипа Oracle в Simple Icons нет
  Oracle: <Database size={22} aria-hidden />,
  "Neural Networks / Deep Learning": <Brain size={22} aria-hidden />,
  "Machine Learning": <Graph size={22} aria-hidden />,
  PyTorch: siPytorch,
  "Depth Anything": <CubeFocus size={22} aria-hidden />,
  "Context Engineering": <ChatCenteredText size={22} aria-hidden />,
  Математика: <MathOperations size={22} aria-hidden />,
  Mathematics: <MathOperations size={22} aria-hidden />,
  "Линейная алгебра": <GridFour size={22} aria-hidden />,
  "Linear algebra": <GridFour size={22} aria-hidden />,
  Статистика: <ChartBar size={22} aria-hidden />,
  Statistics: <ChartBar size={22} aria-hidden />,
  NumPy: siNumpy,
};

function Logo({ name }: { name: string }) {
  const logo = logos[name];
  if (logo && typeof logo === "object" && "path" in (logo as SimpleIcon)) {
    const icon = logo as SimpleIcon;
    return (
      <svg viewBox="0 0 24 24" className="size-[22px] fill-current" aria-hidden>
        <path d={icon.path} />
      </svg>
    );
  }
  return <>{(logo as React.ReactNode) ?? <StackIcon size={22} aria-hidden />}</>;
}

export function Stack({ site }: { site: Site }) {
  return (
    <section id="stack" aria-labelledby="stack-title" className="mx-auto max-w-[1320px] px-4 py-24 md:px-8 md:py-32">
      <h2 id="stack-title" className="text-4xl font-semibold tracking-[-0.035em] md:text-6xl">
        {site.ui.stackTitle}
      </h2>

      {/* Группы разной длины, поэтому колонки, а не сетка: без пустых дыр */}
      <div className="mt-14 gap-10 md:columns-2 lg:columns-3">
        {site.stack.map((group) => (
          <div key={group.group} className="mb-12 break-inside-avoid">
            <h3 className="border-b border-line pb-4 font-mono text-sm text-muted">{group.group}</h3>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  data-chip
                  className={`group flex items-center gap-3 rounded-[10px] ${item.length > 18 ? "col-span-2" : ""} bg-surface px-3.5 py-3 text-[15px] transition-colors duration-200 hover:bg-surface-2`}
                >
                  <span className="shrink-0 text-muted transition-colors duration-200 group-hover:text-accent">
                    <Logo name={item} />
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
