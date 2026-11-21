import { CodeIcon, LaptopIcon } from "@phosphor-icons/react"

import type { Experience } from "@/features/portfolio/types/experiences"

/**
 * Newest first. Source: Usama's CVs (Nov 2026), which take precedence over
 * the older resume.ts where they disagree.
 * Company logos: add files under /public/images/companies/. Use { light, dark }
 * for single-colour logos so they stay visible on both themes.
 */
export const EXPERIENCES: Experience[] = [
  {
    id: "freelance",
    companyName: "Freelance",
    companyIcon: LaptopIcon,
    locationType: "Remote",
    isCurrentEmployer: true,
    positions: [
      {
        id: "freelance-senior-software-engineer",
        title: "Senior Software Engineer",
        employmentPeriod: { start: "12.2024" },
        employmentType: "Freelance",
        icon: CodeIcon,
        description: `- Lead frontend on a real estate platform's B2B partners portal: upgraded an Angular 17 app in an Nx monorepo to Angular 22 and moved it to signal-based patterns.
- Implemented SSR with server-to-client state transfer, fixing SEO and indexing and delivering a **2x improvement in Core Web Vitals** through image optimisation, bundle reduction, lazy loading and hydration fixes.
- Led a team of **three engineers**: code reviews, architectural standards and steady improvements to engineering quality.
- Built an AI code generation tool with Next.js, the Vercel AI SDK and an in-browser editor that automates ServiceNow workflows through the ServiceNow SDK.
- Delivered end-to-end features on GraphQL APIs and microservices, wired into the Angular frontend.
- Contributed to a B2B React app built with TanStack Router, React Query, Zustand and Tailwind CSS.`,
        skills: [
          "Angular 22",
          "Angular Signals",
          "Nx",
          "SSR",
          "GraphQL",
          "Microservices",
          "Next.js",
          "Vercel AI SDK",
          "React",
          "TanStack Router",
          "React Query",
          "Zustand",
          "Tailwind CSS",
          "Core Web Vitals",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "love-bonito",
    companyName: "Love, Bonito",
    companyLogo: "/images/companies/love-bonito.png",
    companyWebsite: "https://lovebonito.com",
    location: "Singapore",
    locationType: "Remote",
    positions: [
      {
        id: "love-bonito-software-engineer",
        title: "Software Engineer",
        employmentPeriod: { start: "12.2021", end: "12.2024" },
        icon: CodeIcon,
        description: `- Led the migration from Vue.js to Next.js, delivering **3x faster** load times and better SEO and Core Web Vitals.
- Built NestJS microservices with **99% test coverage** and new payment features that increased order revenue by **12%**.
- Reduced checkout/cart latency by **70%**, increasing the transaction completion rate by **10%**.
- Optimised CI/CD pipelines, cutting deploy times by **3x** and infrastructure costs by **60%** (~$13k/yr).
- Refactored the legacy Vue.js codebase, reducing bundle size by **20%** and making checkout **1.5x** faster.
- Mentored junior developers, helping cut post-deploy bug reports by **30%**.`,
        skills: [
          "Next.js",
          "React",
          "Vue.js",
          "TypeScript",
          "NestJS",
          "Node.js",
          "Microservices",
          "Zustand",
          "Tailwind CSS",
          "Jest",
          "Vitest",
          "Cypress",
          "Playwright",
          "CI/CD",
        ],
      },
    ],
  },
  {
    id: "contrive-solutions",
    companyName: "Contrive Solutions",
    companyLogo: "/images/companies/contrive-solutions.png",
    companyWebsite: "https://contrivesol.com",
    location: "Lahore, Pakistan",
    positions: [
      {
        id: "contrive-software-engineer",
        title: "Software Engineer",
        employmentPeriod: { start: "08.2019", end: "11.2021" },
        icon: CodeIcon,
        description: `- Led and mentored a team of **8 engineers** on full-stack projects, improving delivery speed by **35%**.
- Migrated Express.js apps to NestJS with TypeScript, cutting bugs by **40%**.
- Built a Node.js web crawler with Puppeteer, achieving an **80% captcha bypass** rate and **50%** faster data extraction.
- Shipped scalable applications with Vue.js, Nuxt.js, Angular, Laravel, Node.js and NestJS, including Angular microfrontends and shared component libraries used across products.
- Reduced page load times by **30%** and security vulnerabilities by **50%**; built microservices and integrated REST APIs.`,
        skills: [
          "Angular",
          "NgRx",
          "Module Federation",
          "Vue.js",
          "Nuxt.js",
          "NestJS",
          "Express.js",
          "Node.js",
          "Puppeteer",
          "Laravel",
          "PostgreSQL",
          "MySQL",
          "MongoDB",
          "SCSS",
        ],
      },
    ],
  },
  {
    id: "freelance-2018",
    companyName: "Freelance",
    companyIcon: LaptopIcon,
    locationType: "Remote",
    positions: [
      {
        id: "freelance-full-stack-developer",
        title: "Full-stack Developer",
        employmentPeriod: { start: "09.2018", end: "12.2019" },
        employmentType: "Freelance",
        icon: CodeIcon,
        description: `- **User-centric development:** analysed user needs, system requirements and workflow inefficiencies to build tailored software that solved critical problems and improved satisfaction.
- **API design and implementation:** designed and built secure RESTful APIs and server-side logic, improving data communication and system functionality.
- **Problem solving:** found and fixed system pain points to deliver scalable solutions, streamline processes and improve overall software performance.`,
        skills: ["Node.js", "Vue.js", "React", "REST APIs", "MySQL", "MongoDB"],
      },
    ],
  },
]
