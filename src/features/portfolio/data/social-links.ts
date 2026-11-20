import type { SocialProfile } from "@/features/portfolio/types/social-links"

/**
 * Keyed registry of social profiles — the single source of truth. Icons are
 * bound in `lib/social-link-icons.ts` (keyed by the same `SocialName`), so
 * adding a profile here forces the icon map to stay in sync at compile time.
 */
export const SOCIAL = {
  github: {
    title: "GitHub",
    handle: "usamanasar38",
    href: "https://github.com/usamanasar38",
    sameAs: true,
  },
  linkedin: {
    title: "LinkedIn",
    handle: "usama-nasar",
    href: "https://www.linkedin.com/in/usama-nasar/",
    sameAs: true,
  },
  x: {
    title: "X",
    handle: "@usamanasar_",
    href: "https://x.com/usamanasar_",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
