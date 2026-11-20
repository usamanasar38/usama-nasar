import type { Period } from "@/features/portfolio/types/common"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** "08.2024" → { year: 2024, month: 8 }; "2019" → { year: 2019 } */
export function parsePeriodDate(value: string): { year: number; month?: number } {
  const [a, b] = value.split(".")
  return b ? { year: Number(b), month: Number(a) } : { year: Number(a) }
}

/** "08.2024" → "Aug 2024"; "2019" → "2019" */
export function formatPeriodDate(value: string) {
  const { year, month } = parsePeriodDate(value)
  return month ? `${MONTHS[month - 1]} ${year}` : String(year)
}

/** { start: "08.2024", end: "02.2025" } → "Aug 2024 — Feb 2025"; no end → "… — Present" */
export function formatPeriod(period: Period, presentLabel = "Present") {
  return `${formatPeriodDate(period.start)} — ${period.end ? formatPeriodDate(period.end) : presentLabel}`
}

/** ISO-ish machine value for <time dateTime>: "2024-08" or "2019" */
export function periodDateTime(value: string) {
  const { year, month } = parsePeriodDate(value)
  return month ? `${year}-${String(month).padStart(2, "0")}` : String(year)
}

/**
 * Human duration, LinkedIn-style and inclusive of both months:
 * 08.2024 → 02.2025 = "7 mos". Year-only periods return "".
 */
export function formatDuration(period: Period, now = new Date()) {
  const start = parsePeriodDate(period.start)
  const end = period.end
    ? parsePeriodDate(period.end)
    : { year: now.getFullYear(), month: now.getMonth() + 1 }
  if (!start.month || !end.month) return ""
  const months = (end.year - start.year) * 12 + (end.month - start.month) + 1
  const y = Math.floor(months / 12)
  const m = months % 12
  return [y ? `${y} yr${y > 1 ? "s" : ""}` : "", m ? `${m} mo${m > 1 ? "s" : ""}` : ""]
    .filter(Boolean)
    .join(" ")
}

/** Total years since the first role, for "7+ years" copy. */
export function yearsOfExperience(firstStart: string, now = new Date()) {
  return now.getFullYear() - parsePeriodDate(firstStart).year
}

/** Decodes the base64 email/phone in USER. Call on interaction, not during SSR. */
export function decodeB64(value: string) {
  return typeof atob === "function" ? atob(value) : Buffer.from(value, "base64").toString("utf8")
}
