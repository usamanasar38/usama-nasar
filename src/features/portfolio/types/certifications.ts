export type Certification = {
  title: string
  issuer: string
  /** Instructor or author, e.g. "Deborah Kurata" */
  instructor?: string
  /**
   * Icon key for the issuer; unknown keys fall back to a generic certificate icon.
   * Supported: "pluralsight" | "aihero" | "coursera" | "vercel" | "google".
   */
  issuerIconName?: string
  /** "YYYY-MM-DD" preferred; "YYYY-MM" or "YYYY" when the exact date isn't known */
  issueDate: string
  /** Credential identifier; empty string if none */
  credentialID: string
  /** Verification URL or certificate link; omit if there isn't a public one */
  credentialURL?: string
  /** Markdown */
  description?: string
}
