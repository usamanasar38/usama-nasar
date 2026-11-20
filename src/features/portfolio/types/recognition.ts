import type { Certification } from "./certifications"
import type { OpenSourceContribution } from "./open-source"

export type CredentialRecognition = {
  kind: "certificate"
  key: string
  /** Raw source date: "YYYY-MM-DD", "YYYY-MM" or "YYYY" */
  date: string
  credential: Certification
}

export type OpenSourceRecognition = {
  kind: "open-source"
  key: string
  date?: string
  contribution: OpenSourceContribution
}

export type RecognitionEntry = CredentialRecognition | OpenSourceRecognition

export type RecognitionKind = RecognitionEntry["kind"]
