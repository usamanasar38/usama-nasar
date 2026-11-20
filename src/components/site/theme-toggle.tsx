import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { IconSwap } from "@/components/site/icon-swap";
import { Button } from "@/components/ui/button";
import { useSounds } from "@/lib/sound";
import { useTheme } from "@/lib/theme";

export const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const { play, hoverProps } = useSounds();
  const [interacted, setInteracted] = useState(false);
  const target = theme === "dark" ? "light" : "dark";

  return (
    <Button
      aria-label={`Switch to ${target} theme`}
      onClick={() => {
        setInteracted(true);
        play(target === "light" ? "on" : "off");
        toggle();
      }}
      size="icon"
      variant="ghost"
      {...hoverProps}
    >
      <IconSwap animate={interacted} swapKey={theme}>
        {theme === "dark" ? <SunIcon aria-hidden /> : <MoonIcon aria-hidden />}
      </IconSwap>
    </Button>
  );
};
