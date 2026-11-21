import { ArrowUpIcon } from "@phosphor-icons/react";

import { useSounds } from "@/lib/sound";

/**
 * Floating circle, bottom right. Reveal and progress ring are CSS scroll-driven animations
 * (un-reveal, un-progress in app.css): no scroll listeners. Hidden (visibility) at the top,
 * so it's out of the tab order until it appears.
 */
export const BackToTop = () => {
  const { play, hoverProps } = useSounds();
  return (
    <button
      aria-label="Back to top"
      className="un-reveal fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 grid size-12 place-items-center rounded-full border bg-dock text-foreground shadow-black/5 shadow-lg backdrop-blur-md transition-press active:scale-97 hover:bg-muted md:right-6 md:bottom-6 dark:shadow-black/40"
      onClick={() => {
        play("rise");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ behavior: reduce ? "instant" : "smooth", top: 0 });
        document.querySelector<HTMLElement>("#main")?.focus({ preventScroll: true });
      }}
      type="button"
      {...hoverProps}
    >
      <svg aria-hidden className="absolute -inset-px -rotate-90" viewBox="0 0 48 48">
        <circle
          className="un-progress fill-none stroke-brand"
          cx="24"
          cy="24"
          pathLength={1}
          r="23"
          strokeWidth="1.5"
        />
      </svg>
      <ArrowUpIcon aria-hidden className="size-[18px]" />
    </button>
  );
};
