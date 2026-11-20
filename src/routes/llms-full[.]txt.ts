import { createFileRoute } from "@tanstack/react-router";

import { buildLlmsFullTxt } from "@/lib/llms";
import { markdownResponse } from "@/lib/markdown-response";

export const Route = createFileRoute("/llms-full.txt")({
  server: { handlers: { GET: () => markdownResponse(buildLlmsFullTxt(), { plain: true }) } },
});
