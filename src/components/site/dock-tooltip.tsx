import type { ReactElement } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * shadcn Tooltip for dock buttons. Lives in its own chunk (Base UI tooltip + floating-ui
 * are ~20 kB gzip) and loads when a mouse first enters the dock. Never the only label:
 * every trigger keeps its aria-label.
 */
const DockTooltip = ({ label, children }: { label: string; children: ReactElement }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent sideOffset={10}>{label}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default DockTooltip;
