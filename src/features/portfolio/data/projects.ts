import {
  CodeIcon,
  GameControllerIcon,
  SquaresFourIcon,
  StackIcon,
} from "@phosphor-icons/react"

import type { Project } from "@/features/portfolio/types/projects"

/**
 * Newest first. The home page shows the first 4 featured projects, then
 * "Show all". Images come from the current usamanasar.dev /public/media folder;
 * add `{ light, dark }` versions when you have screenshots of both themes.
 */
export const PROJECTS: Project[] = [
  {
    id: "servicenow-ai-codegen",
    title: "AI code generation for ServiceNow",
    period: { start: "04.2025" },
    experienceId: "freelance",
    skills: ["Next.js", "Vercel AI SDK", "TypeScript", "ServiceNow SDK", "AI"],
    description: `AI-powered code generation tool with an in-browser editor that automates ServiceNow workflows through the ServiceNow SDK.`,
    icon: CodeIcon,
    isFeatured: true,
    isExpanded: true,
  },
  {
    id: "rehani-soko",
    title: "Rehani Soko",
    period: { start: "08.2024", end: "02.2025" },
    link: "https://rehanisoko.com",
    experienceId: "rehani-soko",
    skills: ["Nuxt 3", "Vue.js", "TypeScript", "SSR", "Pinia", "Tailwind CSS"],
    description: `Web app for Africa's premier property marketplace, connecting buyers, sellers, renters and agents across the continent.
- SSR in Nuxt 3 took page loads from 6s to 2s.`,
    image: "/media/rehanisoko.png",
    isFeatured: true,
  },
  {
    id: "love-bonito",
    title: "Love, Bonito",
    period: { start: "12.2021", end: "12.2024" },
    link: "https://lovebonito.com",
    experienceId: "love-bonito",
    skills: ["Next.js", "React", "TypeScript", "Zustand", "Tailwind CSS", "Vitest", "Playwright"],
    description: `E-commerce web app for Southeast Asia's largest direct-to-consumer, omni-channel womenswear brand.
- Migrated from Vue.js to Next.js for 3x faster loads; checkout latency down 70%.`,
    image: "/media/lovebonito.png",
    isFeatured: true,
  },
  {
    id: "mahjoz",
    title: "Mahjoz (SaaS)",
    period: { start: "08.2022", end: "12.2022" },
    link: "https://app.mahjoz.io",
    experienceId: "mahjoz",
    skills: ["Nuxt 3", "Vue.js", "TypeScript", "Pinia", "Design System"],
    description: `SaaS for managing services and booking appointments: add services, set working hours, publish a page and take bookings and payments.
- Built on a full design system that sped up development by 25%.`,
    image: "/media/mahjoz.png",
    isFeatured: true,
  },
  {
    id: "finlex",
    title: "Finlex",
    period: { start: "2019", end: "2021" },
    link: "https://finlex.io/en/",
    experienceId: "contrive-solutions",
    skills: ["Angular", "Module Federation", "Microfrontends", "NgRx", "SCSS", "Jest"],
    description: `Interconnected Angular microfrontends built with module federation for department-level applications.
- Shared component libraries that improved maintainability and removed duplication.`,
    image: "/media/finlex.png",
    icon: SquaresFourIcon,
  },
  {
    id: "soundblock",
    title: "Arena · Soundblock",
    period: { start: "2019", end: "2021" },
    link: "https://soundblock.arena.com",
    experienceId: "contrive-solutions",
    skills: ["Angular", "TypeScript", "NgRx", "Design System", "SCSS", "Jest"],
    description: `Rights management and administration on web2 and web3 infrastructure.
- A shared Angular UI component library used across 7 Arena products for consistent design and centralised updates.`,
    image: "/media/soundblock.png",
    icon: StackIcon,
  },
  {
    id: "esports-construct",
    title: "EsportsConstruct",
    period: { start: "2019", end: "2021" },
    link: "https://esportsconstruct.com",
    experienceId: "contrive-solutions",
    skills: ["Angular", "TypeScript", "NgRx", "SCSS", "Jest"],
    description: `Staff panel for an esports technology and services company.
- Dynamic tournament formats (knockout, double elimination) with real-time API integrations.`,
    image: "/media/esports-construct.png",
    icon: GameControllerIcon,
  },
]

/** Home page order: featured first (max 4 visible), then the rest. */
export const PROJECTS_HOME = [
  ...PROJECTS.filter((p) => p.isFeatured),
  ...PROJECTS.filter((p) => !p.isFeatured),
]
