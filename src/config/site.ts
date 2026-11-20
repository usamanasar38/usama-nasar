import { SOCIAL } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"
import { resolveThemedSrc } from "@/features/portfolio/lib/themed-image"

/** Set VITE_APP_URL per environment (preview deploys); falls back to production. */
const APP_URL = (import.meta.env?.VITE_APP_URL as string | undefined) ?? USER.website

export const SITE_INFO = {
  name: USER.displayName,
  url: APP_URL.replace(/\/$/, ""),
  title: `${USER.displayName} – ${USER.jobTitle}`,
  titleTemplate: (page: string) => `${page} – ${USER.displayName}`,
  description: USER.bio,
  keywords: USER.keywords,
  /** Light OG image is the default og:image; dark is available for future per-theme use */
  ogImage: resolveThemedSrc(USER.ogImage),
  locale: "en_US",
}

/** Matches --background in app.css for each theme. */
export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#0a0a0a",
} as const

export type NavItem = { title: string; href: string }

export const MAIN_NAV: NavItem[] = [
  { title: "projects", href: "/#projects" },
  { title: "blog", href: "/blog" },
]

export const MOBILE_NAV: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/#projects" },
  { title: "Blog", href: "/blog" },
]

export const X_HANDLE = SOCIAL.x.handle
export const GITHUB_USERNAME = SOCIAL.github.handle
/** TODO(usama): set once the new portfolio repo exists */
export const SOURCE_CODE_GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`

export const CAL_URL = "https://cal.com/[handle]" // TODO(usama): booking link for the dock and contact

export const UTM_PARAMS = { utm_source: "usamanasar.dev" }

/** Absolute URL for a site path ("/blog" → "https://usamanasar.dev/blog"). */
export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path
  return `${SITE_INFO.url}${path.startsWith("/") ? path : `/${path}`}`
}
