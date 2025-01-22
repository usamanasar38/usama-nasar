export const DATA = {
  name: "Usama Nasar",
  role: "Full Stack Engineer",
  initials: "UN",
  url: "https://usama.io",
  location: "Mandi Bahauddin, Punjab, PK",
  seo: {
    title: "Usama Nasar",
    description: "Usama Nasar is a Full Stack engineer who builds scalable, efficient, user-centric, pixel-perfect digital experiences for the web.",
  },
  description:
    "I build scalable, efficient, user-centric, pixel-perfect digital experiences for the web.",
  summary: "",
  skills: [
    "Javascript",
    "Typescript",
    "React",
    "Next.js",
    "Vue.js",
    "Angular",
    "HTML & CSS",
    "Redux",
    "Pinia",
    "Vuex",
    "NestJS",
    "Node.js",
    "Jest",
    "Vitest",
    "Playwright",
    "Cypress",
    "Git",
    "CI/CD",
  ],
  navbar: [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#eduction", label: "Education" },
  ],
  contact: {
    email: "usamanasar38@gmail.com",
    tel: "+92 304 2323349",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/usamanasar38",
        // icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/usama-nasar/",
        // icon: Icons.linkedin,

        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Rehani Soko",
      href: "https://rehanisoko.com/",
      roles: [],
      technologiesUsed: [
        "Javascript",
        "Typescript",
        "Nuxt.js",
        "Vue.js",
        "HTML & CSS",
        "Pinia",
        "Node.js",
        "Vitest",
        "Playwright",
        "Git",
        "CI/CD",
      ],
      location: "Remote",
      title: "Lead Frontend Developer",
      start: "Aug 2024",
      end: "Present",
      description: "This is description",
    },
    {
      company: "Love, Bonito",
      roles: [],
      technologiesUsed: [
        "Javascript",
        "Typescript",
        "React",
        "Next.js",
        "Vue.js",
        "HTML & CSS",
        "Zustand",
        "Vuex",
        "NestJS",
        "Node.js",
        "Jest",
        "Vitest",
        "Cypress",
        "Playwright",
        "Git",
        "CI/CD",
      ],
      href: "https://lovebonito.com/",
      location: "Remote",
      title: "Software Engineer",
      start: "Dec 2021",
      end: "Dec 2024",
      description: "",
    },
    {
      company: "Mahjoz | محجوز",
      href: "https://mahjoz.io/",
      roles: [],
      technologiesUsed: [
        "Javascript",
        "Typescript",
        "Nuxt.js",
        "Vue.js",
        "HTML & CSS",
        "Pinia",
        "Node.js",
        "Jest",
        "Git",
        "CI/CD",
      ],
      location: "Riyadh, SA",
      title: "Senior Frontend Engineer",
      start: "Aug 2022",
      end: "Dec 2022",
      description: "",
    },
    {
      company: "Contrive Solutions",
      href: "https://contrivesol.com/",
      roles: ["Frontend Developer"],
      technologiesUsed: [
        "Javascript",
        "Typescript",
        "React",
        "Next.js",
        "Vue.js",
        "Angular",
        "HTML & CSS",
        "Vuex",
        "Redux",
        "NestJS",
        "Node.js",
        "PHP",
        "Laravel",
        "Jest",
        "Git",
        "CI/CD",
      ],
      location: "Lahore, PK",
      title: "Full Stack Developer",
      start: "Aug 2019",
      end: "Nov 2021",
      description: "",
    },
  ],
  education: [
    {
      school: "University of Gujrat",
      href: "https://uog.edu.pk/",
      degree: "Bachelor's of Science in Computer Science (BSCS)",
      start: "2015",
      end: "2019",
    },
    {
      school: "Angular Getting Started",
      degree: "Bachelor's of Science in Computer Science (BSCS)",
      dates: "2019 - 2015",
    },
  ],
  projects: [
    {
      title: "Love, Bonito",
      href: "https://lovebonito.com/",
      active: true,
      description: "",
      technologies: [],
      image: "websiteLink",
    },
    {
      title: "Rehani Soko",
      href: "https://rehanisoko.com/",
      active: true,
      description: "",
      technologies: [],
      image: "websiteLink",
    },
    {
      title: "Mahjoz (SaaS)",
      href: "https://app.mahjoz.io/",
      active: true,
      description: "",
      technologies: [],
      image: "websiteLink",
    },
    {
      title: "Soundblock",
      href: "https://soundblock.com/",
      active: true,
      description: "",
      technologies: [],
      image: "websiteLink",
    },
  ],
} as const;
