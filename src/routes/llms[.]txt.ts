import { createFileRoute } from "@tanstack/react-router";

import { buildLlmsTxt } from "@/lib/llms";
import { markdownResponse } from "@/lib/markdown-response";

export const Route = createFileRoute("/llms.txt")({
  server: { handlers: { GET: () => markdownResponse(buildLlmsTxt(), { plain: true }) } },
});
