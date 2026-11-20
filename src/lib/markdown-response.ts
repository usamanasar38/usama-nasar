export const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8"
export const TEXT_CONTENT_TYPE = "text/plain; charset=utf-8"

type MarkdownResponseInit = ResponseInit & {
  /** Set when the same URL also serves HTML via Accept negotiation, so caches keep both. */
  negotiated?: boolean
  /** Serve as text/plain (llms.txt) instead of text/markdown */
  plain?: boolean
}

/** Response for the .md / llms routes (server routes in TanStack Start). */
export function markdownResponse(
  body: string,
  { negotiated = false, plain = false, headers, ...init }: MarkdownResponseInit = {},
) {
  const responseHeaders = new Headers(headers)
  responseHeaders.set("Content-Type", plain ? TEXT_CONTENT_TYPE : MARKDOWN_CONTENT_TYPE)
  responseHeaders.set("Cache-Control", "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800")
  if (negotiated) responseHeaders.append("Vary", "Accept")
  return new Response(body, { ...init, headers: responseHeaders })
}
