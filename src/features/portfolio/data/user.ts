import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Usama",
  lastName: "Nasar",
  displayName: "Usama Nasar",
  username: "usamanasar",
  bio: "I build fast, accessible web apps with React, Next.js, Angular and Vue, focused on quick first loads, solid Core Web Vitals and consistent UI.",
  taglines: [
    "Senior Frontend Engineer.",
    "7+ years shipping for the web.",
    "React, Next.js, Angular and Vue, with TypeScript throughout.",
    "Open-source contributor to Continue.dev.",
  ],
  address: "Islamabad, Pakistan",
  phoneNumberB64: "KzkyMzA0MjMyMzM0OQ==", // +923042323349, E.164, base64 encoded
  emailB64: "Y29udGFjdEB1c2FtYW5hc2FyLmRldg==", // contact@usamanasar.dev, base64 encoded
  website: "https://usamanasar.dev",
  jobTitle: "Senior Frontend Engineer",
  jobs: [
    {
      title: "Senior Software Engineer",
      company: "Freelance",
      experienceId: "freelance",
    },
  ],
  intro: "I've led engineering teams of up to 8 and mentor developers through code review.",
  about: `- Senior Frontend Engineer with 7+ years of experience building scalable, high-performance web apps with React, Next.js, Angular, Vue and TypeScript, backed by hands-on Node.js and NestJS work on the server.
- I lead large migrations (Vue → Next.js, Angular 17 → 22, Express → NestJS), fix SEO and Core Web Vitals with SSR, and build shared component libraries, design systems and microfrontends.
- I've led engineering teams of up to 8, mentor developers through code review, and contribute to open source, including [Continue.dev](https://github.com/continuedev/continue) (25K+ GitHub stars).
`,
  avatar: "/images/avatar.webp", // TODO(usama): add a square photo, ≥ 384×384
  resume: {
    default:
      "https://drive.google.com/file/d/1uJDI32gdkDALvF5COhtpHSIlLJzwUteg/view?usp=sharing",
    // variants: [
    //   { label: "Full-stack CV", href: "/cv/usama-nasar-full-stack.pdf" },
    //   { label: "Frontend CV", href: "/cv/usama-nasar-frontend.pdf" },
    // ],
  },
  ogImage: {
    light: "/og-default-light.png",
    dark: "/og-default-dark.png",
  },
  keywords: [
    "Usama Nasar",
    "usamanasar",
    "usamanasar38",
    "usama nasar developer",
    "senior frontend engineer",
    "senior frontend developer",
    "senior full-stack engineer",
    "next.js developer",
    "angular developer",
    "react developer",
    "vue developer",
    "nestjs developer",
    "islamabad",
    "pakistan",
  ],
  timeZone: "Asia/Karachi",
  dateCreated: "2026-11-20", // YYYY-MM-DD: launch date of this version of the site
  availableForWork: true,
}
