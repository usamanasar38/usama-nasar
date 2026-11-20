import { createFileRoute } from "@tanstack/react-router";

import { recognitionMarkdown } from "@/features/portfolio/lib/markdown";
import { markdownResponse } from "@/lib/markdown-response";

export const Route = createFileRoute("/recognition.md")({
  server: { handlers: { GET: () => markdownResponse(recognitionMarkdown()) } },
});
