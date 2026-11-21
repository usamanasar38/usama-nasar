import {
  BuildingsIcon,
  CodeIcon,
  GameControllerIcon,
  GlobeIcon,
  GraduationCapIcon,
  SquaresFourIcon,
  StackIcon,
} from "@phosphor-icons/react"

import type { Project } from "@/features/portfolio/types/projects"

/**
 * Newest first. The home page lists the featured projects first (4 visible),
 * then the rest behind "Show all". Each row shows `logo` (or `icon`), greyscale
 * until hovered. `image` is kept for future case-study pages.
 */
export const PROJECTS: Project[] = [
  {
    id: "servicenow-ai-codegen",
    title: "AI code generation for ServiceNow",
    period: { start: "04.2025" },
    experienceId: "freelance",
    skills: ["Next.js", "Vercel AI SDK", "TypeScript", "ServiceNow SDK", "AI"],
    description: `AI code generation tool with an in-browser editor that writes and ships ServiceNow workflows through the ServiceNow SDK.
- Built with Next.js and the Vercel AI SDK.`,
    icon: CodeIcon,
    isFeatured: true,
    isExpanded: true,
  },
  {
    id: "rehani-soko",
    title: "Rehani Soko",
    period: { start: "08.2024", end: "02.2025" },
    link: "https://rehanisoko.com",
    skills: ["Nuxt 3", "Vue.js", "TypeScript", "SSR", "Pinia", "Tailwind CSS", "Team Leadership"],
    description: `Property marketplace connecting buyers, sellers, renters and agents across Africa. I was the Lead Front-End Engineer.
- Moved the app to SSR in Nuxt 3, cutting page load time from 6s to 2.5s and lifting retention by 15%.
- Led a team of 6 frontend engineers, raising development velocity by 30% through process automation and faster code reviews.
- Refactored legacy code to remove critical bugs, and resolved 50% of the recurring performance issues in the legacy UI.`,
    image: "/media/rehanisoko.png",
    logo: "/images/companies/rehani-soko.svg",
    isFeatured: true,
  },
  {
    id: "love-bonito",
    title: "Love, Bonito",
    period: { start: "12.2021", end: "12.2024" },
    link: "https://lovebonito.com",
    experienceId: "love-bonito",
    skills: ["Next.js", "React", "TypeScript", "Zustand", "Tailwind CSS", "Vitest", "Playwright"],
    description: `E-commerce storefront for Southeast Asia's largest direct-to-consumer womenswear brand.
- Migrated the storefront from Vue.js to Next.js for 3x faster loads and better SEO.
- Cut checkout and cart latency by 70%, raising the transaction completion rate by 10%.`,
    image: "/media/lovebonito.png",
    logo: "/images/companies/love-bonito.png",
    isFeatured: true,
  },
  {
    id: "mahjoz",
    title: "Mahjoz",
    period: { start: "08.2022", end: "12.2022" },
    link: "https://app.mahjoz.io",
    skills: ["Nuxt 3", "Vue.js", "TypeScript", "Pinia", "Design System"],
    description: `SaaS for service businesses in Saudi Arabia to list services, set working hours, publish a booking page and take bookings and payments.
- Built the Nuxt 3 frontend on a full design system that sped up development by 25%.`,
    image: "/media/mahjoz.png",
    logo: "/images/companies/mahjoz.svg",
    isFeatured: true,
  },
  {
    id: "daleel-aqar",
    title: "Daleel Aqar",
    period: { start: "04.2025" },
    link: "https://daleelaqar.com",
    experienceId: "freelance",
    skills: ["Angular 22", "Angular Signals", "SSR", "SEO", "Core Web Vitals", "TypeScript", "Team Leadership"],
    description: `Real estate platform for Jordan. I'm the Lead Senior Frontend Engineer on its internal B2B partners portal.
- Upgraded the app from Angular 17 to 22 and moved components to signals, while the team adopts modern Angular practices step by step.
- Fixed SSR and SEO, more than doubling performance and Core Web Vitals scores.`,
    logo: "/images/companies/daleel-aqar.png",
  },
  {
    id: "finlex",
    title: "Finlex",
    period: { start: "2019", end: "2021" },
    link: "https://finlex.io/en/",
    experienceId: "contrive-solutions",
    skills: ["Angular", "Module Federation", "Microfrontends", "NgRx", "SCSS", "Jest"],
    description: `Digital platform for financial lines insurance (D&O, cyber) where brokers, companies and insurers compare the market, take out policies and manage contracts.
- Built interconnected Angular microfrontends with module federation for department-level applications.
- Created shared component libraries that removed duplicated UI code and made the apps easier to maintain.`,
    image: "/media/finlex.png",
    logo: "/images/companies/finlex.svg",
    icon: SquaresFourIcon,
  },
  {
    id: "soundblock",
    title: "Arena · Soundblock",
    period: { start: "2019", end: "2021" },
    link: "https://soundblock.arena.com",
    experienceId: "contrive-solutions",
    skills: ["Angular", "TypeScript", "NgRx", "Design System", "SCSS", "Jest"],
    description: `Rights management and administration platform running on web2 and web3 infrastructure.
- Built a shared Angular UI component library used across 7 Arena products, giving them one consistent design and a single place to ship updates.`,
    image: "/media/soundblock.png",
    logo: { light: "/images/companies/arena-light.png", dark: "/images/companies/arena-dark.png" },
    icon: StackIcon,
  },
  {
    id: "grundsteuer-digital",
    title: "Grundsteuer Digital",
    period: { start: "2019", end: "2021" },
    link: "https://www.grundsteuer-digital.de",
    logo: "/images/companies/grundsteuer-digital.svg",
    experienceId: "contrive-solutions",
    skills: ["Vue 3", "Vuex", "Laravel", "PHP", "MySQL", "AWS", "OAuth"],
    description: `SaaS for Germany's property tax reform: property owners and their advisers prepare property data and submit it digitally to the tax authorities.
- Multi-tenant, white-label platform serving 7 partners, each with its own theme and subdomain.
- Integrations with ELSTER, Lexoffice and OS-FINO, OAuth/SSO login and credit-based payments.`,
    icon: BuildingsIcon,
  },
  {
    id: "skolaro",
    title: "Skolaro",
    period: { start: "2019", end: "2021" },
    link: "https://www.skolaro.com",
    logo: "/images/companies/skolaro.png",
    experienceId: "contrive-solutions",
    skills: ["Laravel", "PHP", "MySQL", "Sphinx", "Memcached", "REST APIs"],
    description: `School management system and private social platform for teachers, students and parents, with 1.5 million active users.
- Fast search with Sphinx, caching with Memcached and a public REST API.`,
    icon: GraduationCapIcon,
  },
  {
    id: "ei-next",
    title: "EI Next",
    period: { start: "2019", end: "2021" },
    experienceId: "contrive-solutions",
    skills: ["Angular", "Laravel Lumen", "PHP", "Node.js", "Web Crawlers"],
    description: `Internal web app for a German digital-products company to manage company data and automate collecting it from company websites.
- Upgraded the Angular frontend from v8 to v12.
- Contact-form, URL and domain crawlers, employee activity tracking and role-based access.`,
    icon: GlobeIcon,
  },
  {
    id: "esports-construct",
    title: "EsportsConstruct",
    period: { start: "2019", end: "2021" },
    link: "https://esportsconstruct.com",
    experienceId: "contrive-solutions",
    skills: ["Angular", "TypeScript", "NgRx", "Lumen", "ElasticSearch", "Redis", "RabbitMQ"],
    description: `Admin and staff panel for an esports technology company: a data platform for managing tournament data across esports titles, which then fed the company's other platforms.
- Managed tournament formats (knockout, double elimination), live scores and team management for different games.
- Real-time API integrations, backed by a Lumen API with ElasticSearch search, Redis caching and RabbitMQ queues.`,
    image: "/media/esports-construct.png",
    icon: GameControllerIcon,
  },
]

/** Home page order: featured first (max 4 visible), then the rest. */
export const PROJECTS_HOME = [
  ...PROJECTS.filter((p) => p.isFeatured),
  ...PROJECTS.filter((p) => !p.isFeatured),
]
