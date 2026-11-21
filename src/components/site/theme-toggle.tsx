import { ThemeIcon } from "@/components/site/theme-icon";
import { Button } from "@/components/ui/button";
import { useSounds } from "@/lib/sound";
import { useTheme } from "@/lib/theme";

/**
 * Theme switch. The icon (ThemeIcon) turns the sky: the sun sets as a crescent moon rises and
 * waxes to full, and the reverse at dawn. Quick clicks reverse the scene in place.
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
      className="pointer-coarse:size-11"
      size="icon"
      variant="ghost"
      {...hoverProps}
    >
      <ThemeIcon />
    </Button>
  );
};
