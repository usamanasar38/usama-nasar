import { PROJECTS_HOME } from "@/features/portfolio/data/projects";
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links";
import { USER } from "@/features/portfolio/data/user";
import { formatPeriod } from "@/features/portfolio/lib/format";

/**
 * Static search index for the ⌘K palette. It only lives in the lazy search chunk; posts are
 * added at open time from the getPosts() server function (titles, tags, dates only).
 */

export type SearchPage = { title: string; to: "/" | "/blog"; hash?: string; keywords: string[] };
export type SearchLink = { title: string; href: string; hint?: string; icon: string };

export const SEARCH_PAGES: SearchPage[] = [
  { keywords: ["about", "intro", "overview"], title: "Home", to: "/" },
  { hash: "experience", keywords: ["work", "jobs", "career"], title: "Experience", to: "/" },
  { hash: "projects", keywords: ["work", "portfolio"], title: "Projects", to: "/" },
  { keywords: ["posts", "writing", "articles"], title: "Blog", to: "/blog" },
  { hash: "contact", keywords: ["email", "hire", "say hi"], title: "Contact", to: "/" },
];

export const SEARCH_PROJECTS = PROJECTS_HOME.map((project) => ({
  hint: formatPeriod(project.period, "now").split(" — ")[0],
  href: project.link,
  id: project.id,
  keywords: project.skills,
  title: project.title,
}));

export const SEARCH_LINKS: SearchLink[] = [
  ...SOCIAL_LINKS.map((link) => ({
    hint: link.handle,
    href: link.href,
    icon: link.name,
    title: link.title,
  })),
  { href: USER.resume.default, icon: "resume", title: "Résumé" },
];
