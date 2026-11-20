import type { RecognitionEntry } from "@/features/portfolio/types/recognition"

import { CERTIFICATIONS } from "./certifications"
import { OPEN_SOURCE } from "./open-source"

/** Entry keys shown first, in this order. */
export const RECOGNITION_PINNED_KEYS = ["open-source:continue-dev"]

/** Parses "YYYY", "YYYY-MM" or "YYYY-MM-DD" to a sortable timestamp. */
function toTime(date?: string) {
  if (!date) return 0
  const [y, m = "01", d = "01"] = date.split("-")
  return Date.UTC(Number(y), Number(m) - 1, Number(d))
}

/** Certifications and open-source work in one list, newest first. */
export const RECOGNITION_BY_DATE: RecognitionEntry[] = (
  [
  ...OPEN_SOURCE.map((contribution): RecognitionEntry => ({
    kind: "open-source" as const,
    key: `open-source:${contribution.id}`,
    contribution,
  })),
  ...CERTIFICATIONS.map((credential): RecognitionEntry => ({
    kind: "certificate" as const,
    key: `certificate:${credential.title}`,
    date: credential.issueDate,
    credential,
  })),
  ] satisfies RecognitionEntry[]
).sort((a, b) => toTime(b.date) - toTime(a.date))

/** Home page order: pinned entries first, then the rest newest first. */
export const RECOGNITION = pinFirst(RECOGNITION_BY_DATE, RECOGNITION_PINNED_KEYS)

function pinFirst(entries: RecognitionEntry[], keys: string[]) {
  const pinned = keys.flatMap((key) => entries.filter((entry) => entry.key === key))
  return [...pinned, ...entries.filter((entry) => !keys.includes(entry.key))]
}
