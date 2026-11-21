import {
  BrainIcon,
  OpenAiLogoIcon,
  PlugsConnectedIcon,
  SquaresFourIcon,
  StackIcon,
  WaveSineIcon,
} from "@phosphor-icons/react"
import {
  siAngular,
  siBaseui,
  siBootstrap,
  siBun,
  siClaude,
  siCursor,
  siCypress,
  siDatadog,
  siDocker,
  siExpress,
  siGit,
  siGithub,
  siGithubactions,
  siGooglegemini,
  siGrafana,
  siGraphql,
  siJavascript,
  siJest,
  siMongodb,
  siMui,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNgrx,
  siNodedotjs,
  siNuxt,
  siNx,
  siOpentelemetry,
  siPinia,
  siPostgresql,
  siPython,
  siRadixui,
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

import { siAmazonaws } from "@/features/portfolio/data/brand-icons"
import type { TechStack } from "@/features/portfolio/types/tech-stack"

/**
 * From Usama's CVs (Nov 2026). `isFeatured` items appear on the home page;
 * everything appears in /about.md and llms-full.txt.
 * Logos are monochrome (currentColor), so they work on light and dark themes.
 * Within a home group, items follow the group's category order, then this order.
 */
export const TECH_STACK: TechStack[] = [
  // Languages
  { key: "typescript", title: "TypeScript", href: "https://www.typescriptlang.org", icon: siTypescript, categories: ["Language"], isFeatured: true },
  { key: "javascript", title: "JavaScript", href: "https://developer.mozilla.org/docs/Web/JavaScript", icon: siJavascript, categories: ["Language"], isFeatured: true },
  { key: "python", title: "Python", href: "https://www.python.org", icon: siPython, categories: ["Language"], isFeatured: true },

  // Frontend
  { key: "react", title: "React", href: "https://react.dev", icon: siReact, categories: ["Frontend"], isFeatured: true },
  { key: "nextjs", title: "Next.js", href: "https://nextjs.org", icon: siNextdotjs, categories: ["Frontend"], isFeatured: true },
  { key: "angular", title: "Angular", href: "https://angular.dev", icon: siAngular, categories: ["Frontend"], isFeatured: true },
  { key: "vue", title: "Vue.js", href: "https://vuejs.org", icon: siVuedotjs, categories: ["Frontend"], isFeatured: true },
  { key: "nuxt", title: "Nuxt", href: "https://nuxt.com", icon: siNuxt, categories: ["Frontend"], isFeatured: true },
  { key: "motion", title: "Motion", href: "https://motion.dev", fallbackIcon: WaveSineIcon, categories: ["Frontend"], isFeatured: true },
  { key: "tanstack", title: "TanStack", href: "https://tanstack.com", icon: siTanstack, categories: ["Frontend"], isFeatured: true },
  { key: "rxjs", title: "RxJS", href: "https://rxjs.dev", icon: siReactivex, categories: ["Frontend"] },
  { key: "microfrontends", title: "Microfrontends", href: "https://module-federation.io", fallbackIcon: SquaresFourIcon, categories: ["Frontend"] },

  // State
  { key: "ngrx", title: "NgRx", href: "https://ngrx.io", icon: siNgrx, categories: ["State"] },
  { key: "redux", title: "Redux", href: "https://redux.js.org", icon: siRedux, categories: ["State"], isFeatured: true },
  { key: "zustand", title: "Zustand", href: "https://zustand.docs.pmnd.rs", fallbackIcon: StackIcon, categories: ["State"], isFeatured: true },
  { key: "pinia", title: "Pinia", href: "https://pinia.vuejs.org", icon: siPinia, categories: ["State"] },
  { key: "react-query", title: "React Query", href: "https://tanstack.com/query", icon: siReactquery, categories: ["State"] },

  // Styling and UI primitives
  { key: "tailwindcss", title: "Tailwind CSS", href: "https://tailwindcss.com", icon: siTailwindcss, categories: ["Styling"], isFeatured: true },
  { key: "shadcn", title: "shadcn/ui", href: "https://ui.shadcn.com", icon: siShadcnui, categories: ["Styling"], isFeatured: true },
  { key: "radix-ui", title: "Radix UI", href: "https://www.radix-ui.com", icon: siRadixui, categories: ["Styling"], isFeatured: true },
  { key: "base-ui", title: "Base UI", href: "https://base-ui.com", icon: siBaseui, categories: ["Styling"], isFeatured: true },
  { key: "sass", title: "SCSS / Sass", href: "https://sass-lang.com", icon: siSass, categories: ["Styling"] },
  { key: "mui", title: "Material UI", href: "https://mui.com", icon: siMui, categories: ["Styling"] },
  { key: "bootstrap", title: "Bootstrap", href: "https://getbootstrap.com", icon: siBootstrap, categories: ["Styling"] },

  // Backend
  { key: "nodejs", title: "Node.js", href: "https://nodejs.org", icon: siNodedotjs, categories: ["Backend"], isFeatured: true },
  { key: "nestjs", title: "NestJS", href: "https://nestjs.com", icon: siNestjs, categories: ["Backend"], isFeatured: true },
  { key: "bun", title: "Bun", href: "https://bun.sh", icon: siBun, categories: ["Backend"], isFeatured: true },
  { key: "graphql", title: "GraphQL", href: "https://graphql.org", icon: siGraphql, categories: ["Backend"], isFeatured: true },
  { key: "rest", title: "REST", href: "https://developer.mozilla.org/docs/Glossary/REST", fallbackIcon: PlugsConnectedIcon, categories: ["Backend"], isFeatured: true },
  { key: "express", title: "Express", href: "https://expressjs.com", icon: siExpress, categories: ["Backend"] },
  { key: "trpc", title: "tRPC", href: "https://trpc.io", icon: siTrpc, categories: ["Backend"] },

  // Database
  { key: "postgresql", title: "PostgreSQL", href: "https://www.postgresql.org", icon: siPostgresql, categories: ["Database"], isFeatured: true },
  { key: "mysql", title: "MySQL", href: "https://www.mysql.com", icon: siMysql, categories: ["Database"], isFeatured: true },
  { key: "mongodb", title: "MongoDB", href: "https://www.mongodb.com", icon: siMongodb, categories: ["Database"], isFeatured: true },
  { key: "redis", title: "Redis", href: "https://redis.io", icon: siRedis, categories: ["Database"], isFeatured: true },

  // AI
  { key: "claude", title: "Claude", href: "https://claude.ai", icon: siClaude, categories: ["AI"], isFeatured: true },
  { key: "cursor", title: "Cursor", href: "https://cursor.com", icon: siCursor, categories: ["AI"], isFeatured: true },
  { key: "gemini", title: "Gemini", href: "https://gemini.google.com", icon: siGooglegemini, categories: ["AI"], isFeatured: true },
  { key: "chatgpt", title: "ChatGPT", href: "https://chatgpt.com", fallbackIcon: OpenAiLogoIcon, categories: ["AI"], isFeatured: true },
  { key: "vercel-ai-sdk", title: "Vercel AI SDK", href: "https://ai-sdk.dev", fallbackIcon: BrainIcon, categories: ["AI"] },

  // DevOps
  { key: "git", title: "Git", href: "https://git-scm.com", icon: siGit, categories: ["DevOps"], isFeatured: true },
  { key: "github", title: "GitHub", href: "https://github.com", icon: siGithub, categories: ["DevOps"], isFeatured: true },
  { key: "docker", title: "Docker", href: "https://www.docker.com", icon: siDocker, categories: ["DevOps"], isFeatured: true },
  { key: "vercel", title: "Vercel", href: "https://vercel.com", icon: siVercel, categories: ["DevOps"], isFeatured: true },
  { key: "github-actions", title: "GitHub Actions", href: "https://github.com/features/actions", icon: siGithubactions, categories: ["DevOps"] },

  // Tooling
  { key: "nx", title: "Nx", href: "https://nx.dev", icon: siNx, categories: ["Tooling"], isFeatured: true },
  { key: "turborepo", title: "Turborepo", href: "https://turborepo.com", icon: siTurborepo, categories: ["Tooling"] },
  { key: "vite", title: "Vite", href: "https://vite.dev", icon: siVite, categories: ["Tooling"], isFeatured: true },
  { key: "webpack", title: "Webpack", href: "https://webpack.js.org", icon: siWebpack, categories: ["Tooling"] },

  // Testing
  { key: "vitest", title: "Vitest", href: "https://vitest.dev", icon: siVitest, categories: ["Testing"], isFeatured: true },
  { key: "jest", title: "Jest", href: "https://jestjs.io", icon: siJest, categories: ["Testing"], isFeatured: true },
  { key: "cypress", title: "Cypress", href: "https://www.cypress.io", icon: siCypress, categories: ["Testing"], isFeatured: true },
  { key: "playwright", title: "Playwright", href: "https://playwright.dev", fallbackIcon: StackIcon, categories: ["Testing"], isFeatured: true },
  { key: "testing-library", title: "Testing Library", href: "https://testing-library.com", icon: siTestinglibrary, categories: ["Testing"] },

  // Observability
  { key: "sentry", title: "Sentry", href: "https://sentry.io", icon: siSentry, categories: ["Observability"], isFeatured: true },
  { key: "datadog", title: "Datadog", href: "https://www.datadoghq.com", icon: siDatadog, categories: ["Observability"], isFeatured: true },
  { key: "grafana", title: "Grafana", href: "https://grafana.com", icon: siGrafana, categories: ["Observability"] },
  { key: "opentelemetry", title: "OpenTelemetry", href: "https://opentelemetry.io", icon: siOpentelemetry, categories: ["Observability"] },

  // Infrastructure
  { key: "nginx", title: "nginx", href: "https://nginx.org", icon: siNginx, categories: ["Infrastructure"], isFeatured: true },
  { key: "aws", title: "AWS", href: "https://aws.amazon.com", icon: siAmazonaws, categories: ["Infrastructure"], isFeatured: true },
]

export const TECH_STACK_FEATURED = TECH_STACK.filter((t) => t.isFeatured)

/** Groups for the home page Stack section (featured items only), in display order. */
export const TECH_STACK_GROUPS = (
  [
    { title: "languages", categories: ["Language"] },
    { title: "frontend", categories: ["Frontend", "State", "Styling"] },
    { title: "backend & data", categories: ["Backend", "Database"] },
    { title: "ai & tooling", categories: ["AI", "DevOps", "Tooling", "Testing"] },
    { title: "observability & infra", categories: ["Observability", "Infrastructure"] },
  ] as const
).map((group) => ({
  title: group.title,
  items: group.categories.flatMap((category) =>
    TECH_STACK_FEATURED.filter((t) => t.categories[0] === category),
  ),
})).filter((group) => group.items.length > 0)
