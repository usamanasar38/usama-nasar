import { ArrowRightIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { useSounds } from "@/lib/sound";

type SectionHeadingProps = {
  id: string;
  children: ReactNode;
  /** Shows a two-digit mono counter ("06") on the right. */
  count?: number;
  /** Shows "All posts →" style link on the right. */
  link?: { label: string; to: "/blog" };
};

/** `<h2 class="text-section">` + optional counter or link. Sections use aria-labelledby={id}. */
export const SectionHeading = ({ id, children, count, link }: SectionHeadingProps) => {
  const { hoverProps } = useSounds();
  return (
    <div className="mb-5 flex items-baseline justify-between gap-4">
      <h2 className="text-section" id={id}>
        {children}
      </h2>
      {count === undefined ? null : (
        <span className="font-mono text-caption text-muted-foreground">
          <span aria-hidden>{String(count).padStart(2, "0")}</span>
          <span className="sr-only">{count} items</span>
        </span>
      )}
      {link ? (
        <Link
          className="group inline-flex items-center gap-1 text-muted-foreground text-small transition-colors hover:text-foreground"
          to={link.to}
          {...hoverProps}
        >
          {link.label}
          <ArrowRightIcon
            aria-hidden
            className="size-3.5 transition-transform duration-200 ease-out-quint group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </Link>
      ) : null}
    </div>
  );
};
