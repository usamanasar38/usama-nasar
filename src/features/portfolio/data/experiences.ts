import { CodeIcon, LaptopIcon, UsersThreeIcon } from "@phosphor-icons/react"

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
        employmentPeriod: { start: "04.2025" },
        employmentType: "Freelance",
        icon: CodeIcon,
        description: `- Modernised an Angular 17 application in an Nx monorepo, upgrading it to Angular 22 and adopting signal-based patterns.
- Implemented SSR with server-to-client state transfer, fixing SEO and indexing issues and achieving a **2x improvement in Core Web Vitals** through image optimisation, bundle reduction, lazy loading and hydration fixes.
- Built an AI-powered code generation tool with Next.js, the Vercel AI SDK and an in-browser editor to automate ServiceNow workflows through the ServiceNow SDK.
- Delivered end-to-end features on GraphQL APIs and microservices, integrated with the Angular frontend.
- Led a team of three engineers on a real estate platform: code reviews, architectural standards and engineering quality.
- Contributed to a B2B React application using TanStack Router, React Query, Zustand and Tailwind CSS.`,
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
    id: "rehani-soko",
    companyName: "Rehani Soko",
    companyWebsite: "https://rehanisoko.com",
    // companyLogo: { light: "/images/companies/rehani-soko-light.svg", dark: "/images/companies/rehani-soko-dark.svg" },
    location: "United States",
    locationType: "Remote",
    positions: [
      {
        id: "rehani-soko-lead-frontend",
        title: "Lead Front-End Engineer",
        employmentPeriod: { start: "08.2024", end: "02.2025" },
        icon: UsersThreeIcon,
        description: `- Implemented SSR in Vue 3 / Nuxt 3, cutting page load time from **6s to 2s** and improving Core Web Vitals and retention by **15%**.
- Led a team of **6 frontend engineers**, improving development velocity by **30%** through process automation and streamlined code reviews.
- Refactored critical modules and shipped fault-tolerant solutions, reducing system downtime.
- Diagnosed performance bottlenecks, resolving **50%** of recurring issues in the legacy UI.`,
        skills: [
          "Nuxt 3",
          "Vue 3",
          "TypeScript",
          "SSR",
          "Pinia",
          "Tailwind CSS",
          "Vitest",
          "Playwright",
          "CI/CD",
          "Team Leadership",
        ],
      },
    ],
  },
  {
    id: "love-bonito",
    companyName: "Love, Bonito",
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
- Mentored junior developers, contributing to a **30%** drop in post-deploy bug reports.`,
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
    id: "mahjoz",
    companyName: "Mahjoz | محجوز",
    companyWebsite: "https://mahjoz.io",
    location: "Riyadh, Saudi Arabia",
    locationType: "Remote",
    positions: [
      {
        id: "mahjoz-senior-frontend",
        title: "Senior Frontend Engineer",
        employmentPeriod: { start: "08.2022", end: "12.2022" },
        icon: CodeIcon,
        description: `- Delivered a Nuxt 3 SaaS for services and appointment booking with a full design system, accelerating development by **25%**.
- Optimised front-end performance and shipped high-quality UIs with modern JavaScript frameworks.
- Tested extensively to catch bugs early and worked with product managers to streamline releases.`,
        skills: ["Nuxt 3", "Vue.js", "TypeScript", "Pinia", "Design System", "Jest"],
      },
    ],
  },
  {
    id: "contrive-solutions",
    companyName: "Contrive Solutions",
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
- Delivered scalable applications with Vue.js, Nuxt.js, Angular, Laravel, Node.js and NestJS, including Angular microfrontends and shared component libraries.
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
        description: `- Developed RESTful APIs and integrated third-party services and payment gateways.
- Debugged and optimised existing codebases, improving performance, maintainability and stability.`,
        skills: ["Node.js", "Vue.js", "React", "REST APIs", "MySQL", "MongoDB"],
      },
    ],
  },
]
