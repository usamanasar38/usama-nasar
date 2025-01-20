export const DATA = {
  name: "Usama Nasar",
  role: 'Full Stack Engineer',
  initials: "UN",
  url: "https://usama.io",
  location: "Mandi Bahauddin, Punjab, PK",
  description:
    "I build scalable, efficient, user-centric, pixel-perfect digital experiences for the web.",
  summary: "",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
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
      badges: [],
      location: "Remote",
      title: "Lead Frontend Developer",
      start: "Aug 2024",
      end: "Present",
      description: "",
    },
    {
      company: "Love, Bonito",
      roles: [],
      badges: [],
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
      badges: [],
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
      badges: [],
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
