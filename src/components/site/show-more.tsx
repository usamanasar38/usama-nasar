import { CaretDownIcon } from "@phosphor-icons/react";
import { m } from "motion/react";
import { createContext, useContext, useId, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { useSounds } from "@/lib/sound";
import { cn } from "@/lib/utils";

const MAX_STAGGERED = 8;
const STAGGER_S = 0.04;
const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

const RevealContext = createContext<{ revealed: boolean }>({ revealed: false });

/**
 * Wrap each item in the hidden part: when Show all opens, items fade in and rise 8px with a
 * 40ms stagger (08-motion.md), on top of the CSS height animation. No animation on close, and
 * MotionConfig reducedMotion="user" drops the transform for people who ask for less motion.
 */
export const StaggerItem = ({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) => {
  const { revealed } = useContext(RevealContext);
  if (!revealed) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div
      animate={{ opacity: 1, y: 0 }}
      className={className}
      initial={{ opacity: 0, y: 8 }}
      transition={{
        delay: 0.06 + Math.min(index, MAX_STAGGERED) * STAGGER_S,
        duration: 0.32,
        ease: EASE_OUT_QUINT,
      }}
    >
      {children}
    </m.div>
  );
};

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
  const [revealed, setRevealed] = useState(false);
  const regionId = useId();
  const region = useRef<HTMLDivElement>(null);
  const { play, hoverProps } = useSounds();
  const reveal = useMemo(() => ({ revealed }), [revealed]);

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
    setRevealed(next);

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
          <RevealContext value={reveal}>
            {children(rest, "hidden")}
          </RevealContext>
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
              "size-3.5 transition-transform duration-200 motion-reduce:transition-none",
              open && "rotate-180"
            )}
          />
        </Button>
      </div>
    </>
  );
};
