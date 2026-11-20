import type { Period, PhosphorIcon, ThemedSrc } from "./common"

export type ExperiencePosition = {
  id: string
  title: string
  /** "MM.YYYY" or "YYYY". Omit `end` for current roles. */
  employmentPeriod: Period
  /** Full-time | Part-time | Contract | Freelance, etc. */
  employmentType?: string
  /** Markdown bullet list; **bold** marks the metric */
  description?: string
  /** Phosphor icon for the role type */
  icon?: PhosphorIcon
  skills?: string[]
  /** Open by default in the UI (the <details> `open` attribute) */
  isExpanded?: boolean
}

export type Experience = {
  id: string
  companyName: string
  /**
   * Company logo. Use { light, dark } when the logo is single-colour and would
   * vanish on one theme. Falls back to `companyIcon`, then a monogram.
   */
  companyLogo?: ThemedSrc
  /** Phosphor icon used when there's no logo (e.g. freelance) */
  companyIcon?: PhosphorIcon
  companyWebsite?: string
  location?: string
  locationType?: "On-site" | "Hybrid" | "Remote"
  /** Newest first */
  positions: ExperiencePosition[]
  isCurrentEmployer?: boolean
}
