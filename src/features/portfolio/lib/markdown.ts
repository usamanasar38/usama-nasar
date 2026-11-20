import { absoluteUrl, SITE_INFO } from "@/config/site"
import { CERTIFICATIONS } from "@/features/portfolio/data/certifications"
import { EDUCATION } from "@/features/portfolio/data/education"
import { EXPERIENCES } from "@/features/portfolio/data/experiences"
import { OPEN_SOURCE } from "@/features/portfolio/data/open-source"
import { PROJECTS } from "@/features/portfolio/data/projects"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { TECH_STACK } from "@/features/portfolio/data/tech-stack"
import { USER } from "@/features/portfolio/data/user"
import { formatPeriod } from "@/features/portfolio/lib/format"

/**
 * Markdown versions of each portfolio section, for LLMs and AI search.
 * Served by server routes: /about.md, /experience.md, /projects.md,
 * /education.md, /recognition.md, /llms.txt, /llms-full.txt (see INTEGRATION.md).
 * Mirrors chanhdai.com's app/(llms) routes.
 */

export type LlmsPost = {
  slug: string
  title: string
  description: string
  date: string
  /** Raw markdown body, only needed for llms-full.txt */
  raw?: string
}

export function aboutMarkdown() {
  return `# About ${USER.displayName}

${USER.jobTitle} · ${USER.address}

${USER.bio}

${USER.about.trim()}

## Links

- Website: ${SITE_INFO.url}
${SOCIAL_LINKS.map((s) => `- ${s.title}: ${s.href}`).join("\n")}
- Résumé: ${USER.resume.default}

## Tech stack

${groupBy(TECH_STACK, (t) => t.categories[0] ?? "Other")
  .map(([category, items]) => `- ${category}: ${items.map((t) => t.title).join(", ")}`)
  .join("\n")}
`
}

export function experienceMarkdown() {
  return `# Experience

${EXPERIENCES.flatMap((company) =>
  company.positions.map((position) => {
    const where = [company.location, company.locationType].filter(Boolean).join(" · ")
    const skills = position.skills?.join(", ") || "N/A"
    return `## ${position.title} | ${company.companyName}

Duration: ${formatPeriod(position.employmentPeriod)}${where ? `\n\nLocation: ${where}` : ""}${company.companyWebsite ? `\n\nWebsite: ${company.companyWebsite}` : ""}

Skills: ${skills}

${position.description?.trim() ?? ""}`
  }),
).join("\n\n")}
`
}

export function projectsMarkdown() {
  return `# Projects

${PROJECTS.map(
  (p) => `## ${p.title}

Period: ${formatPeriod(p.period)}${p.link ? `\n\nLink: ${p.link}` : ""}

Skills: ${p.skills.join(", ")}

${p.description?.trim() ?? ""}`,
).join("\n\n")}

# Open source

${OPEN_SOURCE.map(
  (o) => `## ${o.project} — ${o.title}${o.highlight ? ` (${o.highlight})` : ""}

Repository: ${o.repo}

${o.description}`,
).join("\n\n")}
`
}

export function educationMarkdown() {
  return `# Education

${EDUCATION.map(
  (e) => `## ${[e.degree, e.fieldOfStudy].filter(Boolean).join(" in ")} | ${e.school}

Duration: ${formatPeriod(e.period)}${e.location ? `\n\nLocation: ${e.location}` : ""}${e.description ? `\n\n${e.description.trim()}` : ""}`,
).join("\n\n")}
`
}

export function recognitionMarkdown() {
  return `# Recognition

## Certifications and courses

${CERTIFICATIONS.map(
  (c) =>
    `- ${c.title} — ${c.issuer}${c.instructor ? ` (${c.instructor})` : ""}, ${c.issueDate}${c.credentialURL ? ` · ${c.credentialURL}` : ""}${c.description ? `\n  ${c.description}` : ""}`,
).join("\n")}

## Open source

${OPEN_SOURCE.map((o) => `- ${o.project}${o.highlight ? ` (${o.highlight})` : ""}: ${o.repo}`).join("\n")}
`
}

/** llmstxt.org shape: H1, blockquote summary, then link lists. */
export function llmsTxt(posts: LlmsPost[]) {
  return `# ${SITE_INFO.name}

> ${USER.jobTitle} with 7+ years of experience. ${USER.bio}

- [About](${absoluteUrl("/about.md")}): Who I am, my tech stack, and how to reach me.
- [Experience](${absoluteUrl("/experience.md")}): Roles, teams and measurable outcomes.
- [Projects](${absoluteUrl("/projects.md")}): Selected projects and open-source work.
- [Education](${absoluteUrl("/education.md")}): Degree.
- [Recognition](${absoluteUrl("/recognition.md")}): Certifications, courses and open-source contributions.
- [Blog](${absoluteUrl("/blog")}): Writing, newest first.
- [Everything as one file](${absoluteUrl("/llms-full.txt")})

## Blog

${posts.length ? posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}.md`)}): ${p.description}`).join("\n") : "- No posts yet."}

## Optional

${SOCIAL_LINKS.map((s) => `- [${s.title}](${s.href})`).join("\n")}
- [Résumé](${USER.resume.default})
`
}

export function llmsFullTxt(posts: LlmsPost[]) {
  return [
    aboutMarkdown(),
    experienceMarkdown(),
    projectsMarkdown(),
    educationMarkdown(),
    recognitionMarkdown(),
    "# Blog\n",
    ...posts.map((p) => `## ${p.title}\n\n${p.date} · ${absoluteUrl(`/blog/${p.slug}`)}\n\n${(p.raw ?? p.description).trim()}\n`),
  ].join("\n")
}

function groupBy<T>(items: T[], key: (item: T) => string): [string, T[]][] {
  const map = new Map<string, T[]>()
  for (const item of items) {
    const k = key(item)
    map.set(k, [...(map.get(k) ?? []), item])
  }
  return [...map.entries()]
}
