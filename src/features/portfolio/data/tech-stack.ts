import { BrainIcon, SquaresFourIcon, StackIcon } from "@phosphor-icons/react"
import {
  siAngular,
  siBootstrap,
  siClaude,
  siCypress,
  siDocker,
  siExpress,
  siGit,
  siGithubactions,
  siGrafana,
  siGraphql,
  siJavascript,
  siJest,
  siMongodb,
  siMui,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNgrx,
  siNodedotjs,
  siNuxt,
  siNx,
  siOpentelemetry,
  siPinia,
  siPostgresql,
  siPython,
  siReact,
  siReactivex,
  siReactquery,
  siRedis,
  siRedux,
  siSass,
  siSentry,
  siShadcnui,
  siTailwindcss,
  siTanstack,
  siTestinglibrary,
  siTrpc,
  siTurborepo,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
  siVuedotjs,
  siWebpack,
} from "simple-icons" // named imports only: the full package is several MB

import type { TechStack } from "@/features/portfolio/types/tech-stack"

/**
 * From Usama's CVs (Nov 2026). `isFeatured` items appear on the home page;
 * everything appears in /about.md and llms-full.txt.
 * Logos are monochrome (currentColor), so they work on light and dark themes.
 */
export const TECH_STACK: TechStack[] = [
  // Languages
  { key: "typescript", title: "TypeScript", href: "https://www.typescriptlang.org", icon: siTypescript, categories: ["Language"], isFeatured: true },
  { key: "javascript", title: "JavaScript", href: "https://developer.mozilla.org/docs/Web/JavaScript", icon: siJavascript, categories: ["Language"], isFeatured: true },
  { key: "python", title: "Python", href: "https://www.python.org", icon: siPython, categories: ["Language"] },

  // Frontend
  { key: "angular", title: "Angular", href: "https://angular.dev", icon: siAngular, categories: ["Frontend"], isFeatured: true },
  { key: "rxjs", title: "RxJS", href: "https://rxjs.dev", icon: siReactivex, categories: ["Frontend"] },
  { key: "react", title: "React", href: "https://react.dev", icon: siReact, categories: ["Frontend"], isFeatured: true },
  { key: "nextjs", title: "Next.js", href: "https://nextjs.org", icon: siNextdotjs, categories: ["Frontend"], isFeatured: true },
  { key: "vue", title: "Vue.js", href: "https://vuejs.org", icon: siVuedotjs, categories: ["Frontend"], isFeatured: true },
  { key: "nuxt", title: "Nuxt", href: "https://nuxt.com", icon: siNuxt, categories: ["Frontend"], isFeatured: true },
  { key: "tanstack", title: "TanStack", href: "https://tanstack.com", icon: siTanstack, categories: ["Frontend"] },
  { key: "microfrontends", title: "Microfrontends", href: "https://module-federation.io", fallbackIcon: SquaresFourIcon, categories: ["Frontend"] },

  // State
  { key: "ngrx", title: "NgRx", href: "https://ngrx.io", icon: siNgrx, categories: ["State"] },
  { key: "redux", title: "Redux", href: "https://redux.js.org", icon: siRedux, categories: ["State"] },
  { key: "zustand", title: "Zustand", href: "https://zustand.docs.pmnd.rs", fallbackIcon: StackIcon, categories: ["State"] },
  { key: "pinia", title: "Pinia", href: "https://pinia.vuejs.org", icon: siPinia, categories: ["State"] },
  { key: "react-query", title: "React Query", href: "https://tanstack.com/query", icon: siReactquery, categories: ["State"] },

  // Styling
  { key: "tailwindcss", title: "Tailwind CSS", href: "https://tailwindcss.com", icon: siTailwindcss, categories: ["Styling"], isFeatured: true },
  { key: "sass", title: "SCSS / Sass", href: "https://sass-lang.com", icon: siSass, categories: ["Styling"] },
  { key: "shadcn", title: "shadcn/ui", href: "https://ui.shadcn.com", icon: siShadcnui, categories: ["Styling"] },
  { key: "mui", title: "Material UI", href: "https://mui.com", icon: siMui, categories: ["Styling"] },
  { key: "bootstrap", title: "Bootstrap", href: "https://getbootstrap.com", icon: siBootstrap, categories: ["Styling"] },

  // Backend
  { key: "nodejs", title: "Node.js", href: "https://nodejs.org", icon: siNodedotjs, categories: ["Backend"], isFeatured: true },
  { key: "nestjs", title: "NestJS", href: "https://nestjs.com", icon: siNestjs, categories: ["Backend"], isFeatured: true },
  { key: "express", title: "Express", href: "https://expressjs.com", icon: siExpress, categories: ["Backend"] },
  { key: "graphql", title: "GraphQL", href: "https://graphql.org", icon: siGraphql, categories: ["Backend"], isFeatured: true },
  { key: "trpc", title: "tRPC", href: "https://trpc.io", icon: siTrpc, categories: ["Backend"] },

  // Database
  { key: "postgresql", title: "PostgreSQL", href: "https://www.postgresql.org", icon: siPostgresql, categories: ["Database"], isFeatured: true },
  { key: "mysql", title: "MySQL", href: "https://www.mysql.com", icon: siMysql, categories: ["Database"] },
  { key: "mongodb", title: "MongoDB", href: "https://www.mongodb.com", icon: siMongodb, categories: ["Database"] },
  { key: "redis", title: "Redis", href: "https://redis.io", icon: siRedis, categories: ["Database"] },

  // Tooling
  { key: "nx", title: "Nx", href: "https://nx.dev", icon: siNx, categories: ["Tooling"], isFeatured: true },
  { key: "turborepo", title: "Turborepo", href: "https://turborepo.com", icon: siTurborepo, categories: ["Tooling"] },
  { key: "vite", title: "Vite", href: "https://vite.dev", icon: siVite, categories: ["Tooling"] },
  { key: "webpack", title: "Webpack", href: "https://webpack.js.org", icon: siWebpack, categories: ["Tooling"] },

  // Testing
  { key: "vitest", title: "Vitest", href: "https://vitest.dev", icon: siVitest, categories: ["Testing"] },
  { key: "jest", title: "Jest", href: "https://jestjs.io", icon: siJest, categories: ["Testing"] },
  { key: "cypress", title: "Cypress", href: "https://www.cypress.io", icon: siCypress, categories: ["Testing"] },
  { key: "playwright", title: "Playwright", href: "https://playwright.dev", fallbackIcon: StackIcon, categories: ["Testing"] },
  { key: "testing-library", title: "Testing Library", href: "https://testing-library.com", icon: siTestinglibrary, categories: ["Testing"] },

  // DevOps
  { key: "docker", title: "Docker", href: "https://www.docker.com", icon: siDocker, categories: ["DevOps"] },
  { key: "git", title: "Git", href: "https://git-scm.com", icon: siGit, categories: ["DevOps"] },
  { key: "github-actions", title: "GitHub Actions", href: "https://github.com/features/actions", icon: siGithubactions, categories: ["DevOps"] },
  { key: "vercel", title: "Vercel", href: "https://vercel.com", icon: siVercel, categories: ["DevOps"] },

  // Observability
  { key: "sentry", title: "Sentry", href: "https://sentry.io", icon: siSentry, categories: ["Observability"] },
  { key: "grafana", title: "Grafana", href: "https://grafana.com", icon: siGrafana, categories: ["Observability"] },
  { key: "opentelemetry", title: "OpenTelemetry", href: "https://opentelemetry.io", icon: siOpentelemetry, categories: ["Observability"] },

  // AI
  { key: "claude-code", title: "Claude Code", href: "https://www.anthropic.com/claude-code", icon: siClaude, categories: ["AI"] },
  { key: "vercel-ai-sdk", title: "Vercel AI SDK", href: "https://ai-sdk.dev", fallbackIcon: BrainIcon, categories: ["AI"] },
]

export const TECH_STACK_FEATURED = TECH_STACK.filter((t) => t.isFeatured)

/** Groups for the home page Stack section (featured items only), in display order. */
export const TECH_STACK_GROUPS = (
  [
    { title: "languages", categories: ["Language"] },
    { title: "frontend", categories: ["Frontend", "State", "Styling"] },
    { title: "backend & data", categories: ["Backend", "Database"] },
    { title: "tooling", categories: ["Tooling", "Testing", "DevOps", "Observability", "AI"] },
  ] as const
).map((group) => ({
  title: group.title,
  items: TECH_STACK_FEATURED.filter((t) =>
    t.categories.some((c) => (group.categories as readonly string[]).includes(c)),
  ),
})).filter((group) => group.items.length > 0)
