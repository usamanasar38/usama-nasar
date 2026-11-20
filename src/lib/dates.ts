const POST_DATE = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

/** "2026-11-20T00:00:00.000Z" → "Nov 20, 2026" (UTC, so server and client agree). */
export const formatPostDate = (iso: string) => POST_DATE.format(new Date(iso));
