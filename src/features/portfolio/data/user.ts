import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Usama",
  lastName: "Nasar",
  displayName: "Usama Nasar",
  username: "usamanasar",
  bio: "I build scalable, efficient, user-centric, pixel-perfect digital experiences for the web.",
  taglines: [
    "I build scalable, efficient, user-centric, pixel-perfect digital experiences for the web.",
    "Senior Full-Stack Engineer.",
    "7+ years shipping for the web.",
    "Open source contributor to Continue.dev.",
  ],
  address: "Mandi Bahauddin, Punjab, Pakistan",
  phoneNumberB64: "KzkyMzA0MjMyMzM0OQ==", // +923042323349, E.164, base64 encoded
  emailB64: "Y29udGFjdEB1c2FtYW5hc2FyLmRldg==", // contact@usamanasar.dev, base64 encoded
  website: "https://usamanasar.dev",
  jobTitle: "Senior Full-Stack Engineer",
  jobs: [
    {
      title: "Senior Software Engineer",
      company: "Freelance",
      experienceId: "freelance",
    },
  ],
  about: `- Senior Full-Stack Engineer with 7+ years of experience building scalable, high-performance web applications with Angular, React, Vue, TypeScript, Node.js and NestJS.
- I lead large migrations (Vue → Next.js, Express → NestJS, Angular 17 → 22), fix Core Web Vitals and SEO with SSR, and build shared UI systems and microfrontends.
- I've led frontend teams of up to 8 engineers, and I contribute to open source, including [Continue.dev](https://github.com/continuedev/continue) (25K+ GitHub stars).
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
    "senior full-stack engineer",
    "senior frontend engineer",
    "angular developer",
    "react developer",
    "vue developer",
    "nestjs developer",
    "pakistan",
  ],
  timeZone: "Asia/Karachi",
  dateCreated: "2026-11-20", // YYYY-MM-DD: launch date of this version of the site
  availableForWork: true,
}
