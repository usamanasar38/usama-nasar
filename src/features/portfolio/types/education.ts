import type { Period, ThemedSrc } from "./common"

export type Education = {
  id: string
  school: string
  schoolWebsite?: string
  schoolLogo?: ThemedSrc
  degree?: string
  fieldOfStudy?: string
  location?: string
  period: Period
  /** Markdown */
  description?: string
  skills?: string[]
  isExpanded?: boolean
}
