import type { ThemedSrc } from "./common"

export type User = {
  firstName: string
  lastName: string
  /** Preferred public-facing name */
  displayName: string
  /** Handle used in links, mentions and JSON-LD alternateName */
  username: string
  /** e.g. "he/him". Leave undefined if you'd rather not show it. */
  pronouns?: string
  /** One-line bio: meta description, OG description, hero subtitle */
  bio: string
  /** Short phrases the profile header can rotate through */
  taglines: string[]
  /** General location for display */
  address: string
  /** E.164 phone number, base64 encoded so it isn't scraped from the HTML. Decode on interaction. */
  phoneNumberB64: string
  /** Public contact email, base64 encoded (same reason) */
  emailB64: string
  /** Personal/homepage URL (no trailing slash) */
  website: string
  /** Primary role shown on the profile */
  jobTitle: string
  /** Current jobs shown in the overview; `experienceId` links to EXPERIENCES */
  jobs: {
    title: string
    company: string
    website?: string
    experienceId?: string
  }[]
  /** Second sentence of the home intro, after `bio` (plain text) */
  intro: string
  /** Rich about section; Markdown supported */
  about: string
  /** Square avatar, ≥ 384px. Same photo works on both themes. */
  avatar: string
  /** Résumé URL(s) */
  resume: {
    /** The default résumé link shown on the site */
    default: string
    /** Optional variants, e.g. a frontend-focused CV */
    variants?: { label: string; href: string }[]
  }
  /** Default Open Graph image per theme (1200×630). Light is used for og:image. */
  ogImage: ThemedSrc
  /** SEO keywords */
  keywords: string[]
  /** IANA time zone, used for the "local time" overview item */
  timeZone: string
  /** Site start date, YYYY-MM-DD (ProfilePage.dateCreated) */
  dateCreated: string
  /** Shows the "available for work" badge */
  availableForWork: boolean
}
