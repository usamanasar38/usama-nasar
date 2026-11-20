import { createFileRoute } from "@tanstack/react-router";

import { educationMarkdown } from "@/features/portfolio/lib/markdown";
import { markdownResponse } from "@/lib/markdown-response";

export const Route = createFileRoute("/education.md")({
  server: { handlers: { GET: () => markdownResponse(educationMarkdown()) } },
});
