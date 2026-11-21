import { CaretDownIcon } from "@phosphor-icons/react";
import { useId, useRef, useState } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { useSounds } from "@/lib/sound";
import { cn } from "@/lib/utils";

interface ShowMoreProps<T> {
  items: T[];
  /** How many stay visible when collapsed. */
  initial?: number;
  /** Screen-reader noun for the button: "Show all 6 projects". */
  label: string;
  /** Renders a slice. `part` is "visible" for the first items, "hidden" for the rest. */
  children: (items: T[], part: "visible" | "hidden") => ReactNode;
}

/**
 * Renders the first `initial` items, then the rest in a wrapper that animates
 * grid-template-rows 0fr → 1fr. Every item is in the server HTML (SEO, LLMs); the hidden
 * part is `inert` until opened.
 */
export const ShowMore = <T,>({
  items,
  initial = 4,
  label,
  children,
}: ShowMoreProps<T>) => {
  const [open, setOpen] = useState(false);
  const [settled, setSettled] = useState(false);
  const regionId = useId();
  const region = useRef<HTMLDivElement>(null);
  const { play, hoverProps } = useSounds();

  const visible = items.slice(0, initial);
  const rest = items.slice(initial);

  if (rest.length === 0) {
    return children(visible, "visible");
  }

  const toggle = () => {
    const next = !open;
    play(next ? "expand" : "collapse");
    setOpen(next);
    setSettled(false);

    if (next) {
      requestAnimationFrame(() => {
        region.current
          ?.querySelector<HTMLElement>(
            "a[href], button, summary, [tabindex]:not([tabindex='-1'])"
          )
          ?.focus({ preventScroll: true });
      });
    }
  };

  return (
    <>
      {children(visible, "visible")}
      <div
        className="un-collapse"
        data-open={open || undefined}
        id={regionId}
        inert={!open}
        onTransitionEnd={(event) => {
          if (event.target === event.currentTarget && open) {
            setSettled(true);
          }
        }}
        ref={region}
      >
        <div
          className={cn(
            "-mx-3 min-h-0 px-3",
            settled ? "overflow-visible" : "overflow-hidden"
          )}
        >
          {children(rest, "hidden")}
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <Button
          aria-controls={regionId}
          aria-expanded={open}
          onClick={toggle}
          size="sm"
          variant="outline"
          {...hoverProps}
        >
          {open ? "Show less" : `Show all ${items.length}`}
          <span className="sr-only"> {label}</span>
          <CaretDownIcon
            aria-hidden
            className={cn(
              "size-3.5 transition-transform duration-200 ease-in-out-quint motion-reduce:transition-none",
              open && "rotate-180"
            )}
          />
        </Button>
      </div>
    </>
  );
};
