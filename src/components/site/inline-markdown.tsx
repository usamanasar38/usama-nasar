import { Fragment } from "react";

import { EXTERNAL, NewTabNote } from "@/components/site/external-note";

const TOKEN = /\*\*(?<bold>[^*]+)\*\*|\[(?<label>[^\]]+)\]\((?<href>[^)\s]+)\)/gu;

/**
 * Renders the inline markdown used in the portfolio data: **bold** (metrics) and
 * [links](url). Server-rendered; no markdown library on the client.
 */
export const InlineMarkdown = ({ text }: { text: string }) => {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const { bold, label, href } = match.groups ?? {};
    parts.push(text.slice(last, match.index));
    if (bold !== undefined) {
      parts.push(
        <strong className="font-semibold text-foreground" key={match.index}>
          {bold}
        </strong>
      );
    } else if (label !== undefined && href !== undefined) {
      parts.push(
        <a
          className="text-brand underline decoration-brand/40 underline-offset-[3px] transition-colors hover:decoration-brand"
          href={href}
          key={match.index}
          {...EXTERNAL}
        >
          {label}
          <NewTabNote />
        </a>
      );
    }
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return parts.map((part, index) => <Fragment key={index}>{part}</Fragment>);
};

/** "- one\n- two" → ["one", "two"]; other lines are kept as they are. */
export const markdownLines = (markdown: string | undefined) =>
  (markdown ?? "")
    .split("\n")
    .map((line) => line.replace(/^\s*[-*]\s+/u, "").trim())
    .filter(Boolean);
