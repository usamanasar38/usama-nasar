import { AnimatePresence, m } from "motion/react";
import type { ReactNode } from "react";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

/**
 * Presence swap for toggling icons (08-motion.md): scale 0.6 → 1 and fade, 160ms.
 * `animate={false}` swaps instantly: used until the user interacts, so the post-hydration
 * correction of theme/sound state never animates on page load.
 */
export const IconSwap = ({
  swapKey,
  animate = true,
  children,
}: {
  swapKey: string;
  animate?: boolean;
  children: ReactNode;
}) => (
  <AnimatePresence initial={false} mode="popLayout">
    <m.span
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex"
      exit={{ opacity: 0, scale: 0.6 }}
      initial={{ opacity: 0, scale: 0.6 }}
      key={swapKey}
      transition={animate ? { duration: 0.16, ease: EASE_OUT_QUINT } : { duration: 0 }}
    >
      {children}
    </m.span>
  </AnimatePresence>
);
