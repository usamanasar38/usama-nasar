import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Link, useRouterState } from "@tanstack/react-router";

import { Logo } from "@/components/brand/logo";
import { useSearch } from "@/components/search/search-provider";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { useSounds } from "@/lib/sound";

const NAV_LINK =
  "inline-flex h-9 items-center rounded-full px-3.5 text-small text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground aria-[current=page]:text-foreground";

export const SiteHeader = () => {
  const pending = useRouterState({ select: (state) => state.status === "pending" });
  const { openSearch, prefetchProps } = useSearch();
  const { hoverProps } = useSounds();

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-4 px-5 md:px-6">
        <Link
          aria-label="Usama Nasar, home"
          className="group -mx-1 flex h-11 items-center gap-2.5 rounded-full px-1"
          to="/"
          {...hoverProps}
        >
          <Logo
            animate
            className="size-[26px] text-foreground transition-colors duration-150 group-hover:text-brand"
            pending={pending}
            title=""
          />
          <span className="font-medium font-mono text-small">usama nasar</span>
        </Link>

        <span aria-live="polite" className="sr-only">
          {pending ? "Loading page" : ""}
        </span>

        <div className="hidden items-center gap-1 md:flex">
          <nav aria-label="Main" className="flex items-center gap-1">
            <Link className={NAV_LINK} hash="projects"
              activeOptions={{ includeHash: true }} to="/" {...hoverProps}>
              projects
            </Link>
            <Link className={NAV_LINK} to="/blog" {...hoverProps}>
              blog
            </Link>
          </nav>
          <button
            aria-haspopup="dialog"
            aria-keyshortcuts="Meta+K Control+K /"
            className="ml-1.5 inline-flex h-9 items-center gap-2 rounded-full border pr-1.5 pl-3 text-muted-foreground text-small transition-colors duration-150 hover:bg-muted hover:text-foreground"
            onClick={openSearch}
            type="button"
            {...prefetchProps}
            onPointerEnter={(event) => {
              prefetchProps.onPointerEnter();
              hoverProps.onPointerEnter(event);
            }}
          >
            <MagnifyingGlassIcon aria-hidden className="size-4" />
            Search
            <Kbd>⌘K</Kbd>
          </button>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Button
            aria-haspopup="dialog"
            aria-label="Search"
            onClick={openSearch}
            size="icon-lg"
            variant="ghost"
            {...prefetchProps}
          >
            <MagnifyingGlassIcon aria-hidden className="size-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
