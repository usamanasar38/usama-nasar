import type { Period, PhosphorIcon, ThemedSrc } from "./common"

export type Project = {
  /** Stable unique identifier (list key, anchor, OG slug) */
  id: string
  title: string
  /** "MM.YYYY" or "YYYY". Omit `end` for ongoing projects. */
  period: Period
  /** Public URL (site, repository, demo). Omit for private/internal work. */
  link?: string
  /** Company or client the project was built for; links to EXPERIENCES by id */
  experienceId?: string
  /** Tags/technologies for chips */
  skills: string[]
  /** Markdown; first line is used as the card summary */
  description?: string
  /**
   * 16:10 screenshot. Use { light, dark } if you have both themes of the product,
   * otherwise a single path.
   */
  image?: ThemedSrc
  /**
   * Square company/product mark (≥ 48px) under /public/images/companies/.
   * Shown greyscale in the list row, in colour on hover. Use { light, dark } for
   * single-colour marks that would vanish on one theme.
   */
  logo?: ThemedSrc
  /** Phosphor icon shown when there's no logo */
  icon?: PhosphorIcon
  /** Shown in the first 4 on the home page */
  isFeatured?: boolean
  /** Whether the project card is expanded by default */
  isExpanded?: boolean
}
