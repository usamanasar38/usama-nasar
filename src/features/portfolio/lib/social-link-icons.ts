import { GithubLogoIcon, LinkedinLogoIcon, XLogoIcon, type Icon } from "@phosphor-icons/react"

import type { SocialName } from "@/features/portfolio/data/social-links"

/**
 * Icons for every key in SOCIAL. `Record<SocialName, …>` makes TypeScript fail
 * when a profile is added without an icon. Phosphor icons use currentColor,
 * so they follow the theme.
 */
export const SOCIAL_LINK_ICONS: Record<SocialName, Icon> = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  x: XLogoIcon,
}
