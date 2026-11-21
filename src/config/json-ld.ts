import type {
  Blog,
  BlogPosting,
  BreadcrumbList,
  Person,
  ProfilePage,
  WebSite,
  WithContext,
} from "schema-dts"

import { absoluteUrl, SITE_INFO } from "@/config/site"
import { EDUCATION } from "@/features/portfolio/data/education"
import { EXPERIENCES } from "@/features/portfolio/data/experiences"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { TECH_STACK } from "@/features/portfolio/data/tech-stack"
import { USER } from "@/features/portfolio/data/user"
import { decodeB64 } from "@/features/portfolio/lib/format"
import { hasPublicFile } from "@/lib/public-asset"

/**
 * Stable @id anchors so Google can merge JSON-LD nodes across separate
 * <script> blocks (and pages) into a single entity in the Knowledge Graph.
 */
export const JSON_LD_ID = {
  website: `${SITE_INFO.url}/#website`,
  person: `${SITE_INFO.url}/#person`,
} as const

const current = EXPERIENCES.find((e) => e.isCurrentEmployer)

/** The avatar once it exists in public/, else the square brand mark (never a 404). */
const PERSON_IMAGE = absoluteUrl(hasPublicFile(USER.avatar) ? USER.avatar : "/logo-512.png")

export const personJsonLd: Person = {
  "@type": "Person",
  "@id": JSON_LD_ID.person,
  name: USER.displayName,
  givenName: USER.firstName,
  familyName: USER.lastName,
  alternateName: [USER.username],
  description: SITE_INFO.description,
  jobTitle: USER.jobTitle,
  image: PERSON_IMAGE,
  url: SITE_INFO.url,
  email: `mailto:${decodeB64(USER.emailB64)}`,
  address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressRegion: "Islamabad Capital Territory", addressCountry: "PK" },
  hasOccupation: {
    "@type": "Occupation",
    name: USER.jobTitle,
    occupationLocation: { "@type": "City", name: USER.address },
    skills: TECH_STACK.filter((t) => t.isFeatured).map((t) => t.title).join(", "),
  },
  ...(current?.companyName && current.companyName !== "Freelance"
    ? { worksFor: { "@type": "Organization", name: current.companyName, url: current.companyWebsite } }
    : {}),
  alumniOf: EDUCATION.map((e) => ({ "@type": "CollegeOrUniversity" as const, name: e.school, url: e.schoolWebsite })),
  knowsAbout: TECH_STACK.map((t) => t.title),
  // Public profiles opt in via their `sameAs` flag.
  sameAs: SOCIAL_LINKS.filter((link) => link.sameAs).map((link) => link.href),
}

/** Rendered once in the root layout; pages reference the Person by @id. */
export const websiteJsonLd: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": JSON_LD_ID.website,
  name: SITE_INFO.name,
  url: SITE_INFO.url,
  description: SITE_INFO.description,
  inLanguage: "en",
  publisher: personJsonLd,
}

/** Home page. */
export function profilePageJsonLd(): WithContext<ProfilePage> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/"),
    url: absoluteUrl("/"),
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(), // build time when prerendered
    mainEntity: { "@id": JSON_LD_ID.person },
  }
}

export type BlogPostingInput = {
  slug: string
  title: string
  description: string
  date: string
  updated?: string
  tags: string[]
  /** Absolute or site-relative image URL (cover or generated OG) */
  image: string
}

export function blogJsonLd(posts: BlogPostingInput[]): WithContext<Blog> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog"),
    url: absoluteUrl("/blog"),
    name: `${SITE_INFO.name} — Blog`,
    author: { "@id": JSON_LD_ID.person },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting" as const,
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.date,
    })),
  }
}

export function blogPostingJsonLd(post: BlogPostingInput): WithContext<BlogPosting> {
  const url = absoluteUrl(`/blog/${post.slug}`)
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    url,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    keywords: post.tags,
    image: absoluteUrl(post.image),
    author: { "@id": JSON_LD_ID.person },
    publisher: { "@id": JSON_LD_ID.person },
    inLanguage: "en",
  }
}

export type BreadcrumbItem = { name: string; href: string }

export function breadcrumbListJsonLd(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  }
}
