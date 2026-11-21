import type { ReactElement, ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * One provider for the whole dock, so its tooltips form a group: the first waits for the
 * delay, the next ones open at once (and skip the zoom, see `data-instant` in tooltip.tsx).
 */
export const DockTooltipGroup = ({ children }: { children: ReactNode }) => (
  <TooltipProvider>{children}</TooltipProvider>
);

/**
 * shadcn Tooltip for dock buttons. Lives in its own chunk (Base UI tooltip + floating-ui
 * are ~20 kB gzip) and loads when a mouse first enters the dock. Never the only label:
 * every trigger keeps its aria-label.
 */
const DockTooltip = ({ label, children }: { label: string; children: ReactElement }) => (
  <Tooltip>
    <TooltipTrigger render={children} />
    <TooltipContent sideOffset={10}>{label}</TooltipContent>
  </Tooltip>
);

export default DockTooltip;
