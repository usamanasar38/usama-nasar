import type { ThemedSrc } from "./common"

export type OpenSourceContribution = {
  id: string
  /** Project name, e.g. "Continue.dev" */
  project: string
  /** What the project is, one line */
  title: string
  /** Repository URL */
  repo: string
  /** Optional link to your PRs/commits, e.g. a GitHub search URL */
  contributionsUrl?: string
  /** Display-only social proof, e.g. "25K+ stars" */
  highlight?: string
  description: string
  image?: ThemedSrc
  skills?: string[]
}
