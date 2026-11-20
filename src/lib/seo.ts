import { absoluteUrl, META_THEME_COLORS, SITE_INFO, X_HANDLE } from "@/config/site"
import { USER } from "@/features/portfolio/data/user"

/**
 * head() helpers for TanStack Start routes. The equivalent of Next's
 * `metadata` objects in chanhdai.com: one place that produces title,
 * description, canonical, Open Graph, Twitter and JSON-LD tags.
 *
 *   export const Route = createFileRoute("/blog/")({
 *     head: () => seo({ title: "Blog", description: "…", path: "/blog" }),
 *   })
 */

type MetaTag =
  | { title: string }
  | { name: string; content: string; media?: string }
  | { property: string; content: string }
  | { charSet: string }

type LinkTag = {
  rel: string
  href: string
  type?: string
  sizes?: string
  media?: string
  title?: string
  as?: string
  crossOrigin?: "anonymous" | "use-credentials"
}

type ScriptTag = { type?: string; children: string }

export type HeadResult = { meta: MetaTag[]; links: LinkTag[]; scripts?: ScriptTag[] }

export type SeoInput = {
  /** Page title without the site name; omit on the home page */
  title?: string
  description?: string
  /** Site path for the canonical URL, e.g. "/blog/hello" */
  path: string
  /** Absolute or site-relative OG image (1200×630); defaults to the light default */
  image?: string
  imageAlt?: string
  type?: "website" | "profile" | "article"
  /** Article fields when type = "article" */
  article?: { publishedTime: string; modifiedTime?: string; tags?: string[] }
  /** Alternate markdown version (LLMs): "/blog/hello.md" */
  markdownPath?: string
  /** JSON-LD objects to embed */
  jsonLd?: unknown[]
  noindex?: boolean
}

/** Serialises JSON-LD safely for an inline <script>. */
export function jsonLdScript(data: unknown): ScriptTag {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data).replace(/</g, "\\u003c"),
  }
}

export function seo(input: SeoInput): HeadResult {
  const title = input.title ? SITE_INFO.titleTemplate(input.title) : SITE_INFO.title
  const description = input.description ?? SITE_INFO.description
  const url = absoluteUrl(input.path)
  const image = absoluteUrl(input.image ?? SITE_INFO.ogImage.light)
  const imageAlt = input.imageAlt ?? (input.title ?? SITE_INFO.name)
  const type = input.type ?? (input.path === "/" ? "profile" : "website")

  const meta: MetaTag[] = [
    { title },
    { name: "description", content: description },
    { property: "og:site_name", content: SITE_INFO.name },
    { property: "og:locale", content: SITE_INFO.locale },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: imageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: X_HANDLE },
    { name: "twitter:creator", content: X_HANDLE },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ]

  if (type === "profile") {
    meta.push(
      { property: "profile:first_name", content: USER.firstName },
      { property: "profile:last_name", content: USER.lastName },
      { property: "profile:username", content: USER.username },
    )
  }
  if (type === "article" && input.article) {
    meta.push({ property: "article:published_time", content: input.article.publishedTime })
    if (input.article.modifiedTime) meta.push({ property: "article:modified_time", content: input.article.modifiedTime })
    meta.push({ property: "article:author", content: SITE_INFO.url })
    for (const tag of input.article.tags ?? []) meta.push({ property: "article:tag", content: tag })
  }
  if (input.noindex) meta.push({ name: "robots", content: "noindex, nofollow" })

  const links: LinkTag[] = [{ rel: "canonical", href: url }]
  if (input.markdownPath) {
    links.push({ rel: "alternate", type: "text/markdown", href: absoluteUrl(input.markdownPath), title: "Markdown" })
  }

  return {
    meta,
    links,
    scripts: input.jsonLd?.map(jsonLdScript),
  }
}

/**
 * Site-wide tags for the root route: charset, viewport, keywords, theme colour
 * per scheme, favicons (light/dark via the adaptive SVG), manifest, RSS and llms.txt.
 * The app's own light/dark switch is the `.dark` class; theme-color follows the OS
 * because browsers only support media queries for it.
 */
export function rootHead(): HeadResult {
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "keywords", content: SITE_INFO.keywords.join(", ") },
      { name: "author", content: SITE_INFO.name },
      { name: "color-scheme", content: "light dark" },
      { name: "theme-color", media: "(prefers-color-scheme: light)", content: META_THEME_COLORS.light },
      { name: "theme-color", media: "(prefers-color-scheme: dark)", content: META_THEME_COLORS.dark },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      // Follows the OS scheme via its own media query (browser tabs can't see the app's class).
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "alternate", type: "application/rss+xml", href: absoluteUrl("/rss.xml"), title: `${SITE_INFO.name} — Blog` },
      { rel: "alternate", type: "text/plain", href: absoluteUrl("/llms.txt"), title: "llms.txt" },
      { rel: "me", href: absoluteUrl("/") },
    ],
  }
}
