import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = async () =>
  import("@/lib/motion-features").then((m) => m.default);

/**
 * Motion is only used for icon swaps and the Show-all stagger (docs/design/08-motion.md).
 * `strict` makes `motion.*` throw: use `m.*` everywhere.
 */
export const MotionProvider = ({ children }: { children: ReactNode }) => (
  <LazyMotion features={loadFeatures} strict>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
);
