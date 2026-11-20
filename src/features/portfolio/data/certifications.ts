import type { Certification } from "@/features/portfolio/types/certifications"

/** Newest first. Add credentialURL when a public verification link exists. */
export const CERTIFICATIONS: Certification[] = [
  {
    title: "Build DeepSearch in TypeScript",
    issuer: "AI Hero",
    issuerIconName: "aihero",
    issueDate: "2025-07-27",
    credentialID: "",
    description:
      "Cohort-based training on semantic search, LLM observability, eval-driven agent architecture, modern Next.js backend infrastructure, and AI system metrics and optimisation.",
  },
  {
    title: "Angular: Getting Started",
    issuer: "Pluralsight",
    instructor: "Deborah Kurata",
    issuerIconName: "pluralsight",
    issueDate: "2019",
    credentialID: "",
  },
]
