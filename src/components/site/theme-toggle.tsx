import { CircleHalfIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { useSounds } from "@/lib/sound";
import { useTheme } from "@/lib/theme";

/**
 * Theme switch. The half-filled circle turns 180° whenever `.dark` lands on <html>
 * (CSS only), so the icon is right before hydration and animates on every change,
 * including ones made from ⌘K.
 */
export const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const { play, hoverProps } = useSounds();
  const target = theme === "dark" ? "light" : "dark";

  return (
    <Button
      aria-label={`Switch to ${target} theme`}
      onClick={() => {
        play(toggle() === "light" ? "on" : "off");
      }}
      size="icon"
      variant="ghost"
      {...hoverProps}
    >
      <CircleHalfIcon
        aria-hidden
        className="ease-out-quint transition-transform duration-500 motion-reduce:transition-none dark:rotate-180"
      />
    </Button>
  );
};
