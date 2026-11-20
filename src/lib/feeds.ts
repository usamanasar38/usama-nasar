import { absoluteUrl, SITE_INFO } from "@/config/site"
import { USER } from "@/features/portfolio/data/user"

/** robots.txt: allow all, list the sitemap, and keep AI-crawler opt-outs one edit away. */
export function robotsTxt() {
  return `User-agent: *
Allow: /

# AI crawlers are allowed by default. To opt out of training crawlers,
# uncomment the blocks you want:
# User-agent: GPTBot
# Disallow: /
# User-agent: ClaudeBot
# Disallow: /
# User-agent: Google-Extended
# Disallow: /
# User-agent: CCBot
# Disallow: /
# User-agent: PerplexityBot
# Disallow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
`
}

export type SitemapEntry = { path: string; lastmod?: string; priority?: number }

export function sitemapXml(entries: SitemapEntry[]) {
  const urls = entries
    .map(
      (e) =>
        `  <url><loc>${escapeXml(absoluteUrl(e.path))}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}${e.priority !== undefined ? `<priority>${e.priority.toFixed(1)}</priority>` : ""}</url>`,
    )
    .join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

export type RssItem = {
  slug: string
  title: string
  description: string
  date: string
  /** Rendered HTML of the full post */
  html?: string
  tags?: string[]
}

export function rssXml(items: RssItem[]) {
  const feedUrl = absoluteUrl("/rss.xml")
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>${escapeXml(`${SITE_INFO.name} — Blog`)}</title>
  <link>${absoluteUrl("/blog")}</link>
  <description>${escapeXml(USER.bio)}</description>
  <language>en</language>
  <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${items
  .map((i) => {
    const url = absoluteUrl(`/blog/${i.slug}`)
    return `  <item>
    <title>${escapeXml(i.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${new Date(i.date).toUTCString()}</pubDate>
    <description>${escapeXml(i.description)}</description>
${(i.tags ?? []).map((t) => `    <category>${escapeXml(t)}</category>`).join("\n")}
${i.html ? `    <content:encoded><![CDATA[${i.html.replace(/]]>/g, "]]]]><![CDATA[>")}]]></content:encoded>` : ""}
  </item>`
  })
  .join("\n")}
</channel>
</rss>
`
}

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}
