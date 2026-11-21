import {
  ArrowRightIcon,
  CheckIcon,
  LinkSimpleIcon,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { IconSwap } from "@/components/site/icon-swap";
import { useCopy } from "@/hooks/use-copy";
import { useSounds } from "@/lib/sound";

const CopyLinkButton = ({ anchor }: { anchor: string }) => {
  const { hoverProps } = useSounds();
  const { copied, copy } = useCopy();

  const onCopy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${anchor}`;

    if (!(await copy(url))) {
      window.location.hash = anchor;
    }
  };

  return (
    <>
      <button
        aria-label={`Copy link to the ${anchor} section`}
        className="text-muted-foreground hover:bg-muted hover:text-foreground relative grid size-7 shrink-0 place-items-center rounded-full opacity-0 transition duration-150 group-hover/heading:opacity-100 after:absolute after:-inset-2 focus-visible:opacity-100 data-copied:opacity-100 motion-reduce:transition-none pointer-coarse:hidden"
        data-copied={copied ? "" : undefined}
        onClick={() => {
          onCopy().catch(() => {
            window.location.hash = anchor;
          });
        }}
        type="button"
        {...hoverProps}
      >
        <IconSwap swapKey={copied ? "check" : "link"}>
          {copied ? (
            <CheckIcon aria-hidden className="text-brand size-4" />
          ) : (
            <LinkSimpleIcon aria-hidden className="size-4" />
          )}
        </IconSwap>
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>
    </>
  );
};

interface SectionHeadingProps {
  id: string;
  /** Hash the heading links to: the id of the enclosing `<section>`. */
  anchor: string;
  children: ReactNode;
  /** Shows "(11)" in mono next to the title. */
  count?: number;
  /** Shows "All posts →" style link on the right. */
  link?: { label: string; to: "/blog" };
}

/**
 * `<h2 class="text-section">` that links to `#anchor`, with an optional "(n)"
 * count, a copy-link button revealed on hover or focus, and an optional link on
 * the right. Sections use aria-labelledby={id} and id={anchor}.
 */
export const SectionHeading = ({
  id,
  anchor,
  children,
  count,
  link,
}: SectionHeadingProps) => {
  const { hoverProps } = useSounds();

  return (
    <div className="mb-5 flex items-baseline justify-between gap-4">
      <div className="group/heading flex items-center gap-1.5">
        <h2 className="text-section" id={id}>
          <a className="rounded-sm" href={`#${anchor}`}>
            {children}
            {count === undefined ? null : (
              <sup className="text-caption text-muted-foreground ml-1 font-mono">
                ({count})
              </sup>
            )}
          </a>
        </h2>
        <CopyLinkButton anchor={anchor} />
      </div>
      {link === undefined ? null : (
        <Link
          className="group text-muted-foreground text-small hover:text-foreground inline-flex items-center gap-1 transition-colors"
          to={link.to}
          {...hoverProps}
        >
          {link.label}
          <ArrowRightIcon
            aria-hidden
            className="ease-out-quint size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </Link>
      )}
    </div>
  );
};
