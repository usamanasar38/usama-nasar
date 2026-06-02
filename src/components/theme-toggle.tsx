import { MoonIcon, SunDimIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { useHotkeys } from 'react-hotkeys-hook';

import { Button } from '@/components/ui/button';

import { Kbd } from './ui/kbd';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const switchTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  useHotkeys('d', () => switchTheme());

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className="relative touch-manipulation border-none"
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle Mode"
            onClick={() => switchTheme()}
          >
            <span
              className="absolute size-12 pointer-fine:hidden"
              aria-hidden
            />
            <MoonIcon className="hidden [html.dark_&]:block" aria-hidden />
            <SunDimIcon className="hidden [html.light_&]:block" aria-hidden />
          </Button>
        }
      />
      <TooltipContent className="pr-2 pl-3">
        <div className="flex items-center gap-3">
          Toggle Mode
          <Kbd>D</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
