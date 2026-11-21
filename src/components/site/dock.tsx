import {
  CalendarDotsIcon,
  CheckIcon,
  EnvelopeSimpleIcon,
  FolderSimpleIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  NotebookIcon,
  SpeakerHighIcon,
  SpeakerSlashIcon,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { createContext, lazy, Suspense, useContext, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactElement } from "react";

import { useSearch } from "@/components/search/search-provider";
import { EXTERNAL, NewTabNote } from "@/components/site/external-note";
import { IconSwap } from "@/components/site/icon-swap";
import { Kbd } from "@/components/ui/kbd";
import { site } from "@/content/site";
import { useSounds } from "@/lib/sound";
import { cn } from "@/lib/utils";

const COPIED_MS = 1800;

const SHELL =
  "fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 z-40 -translate-x-1/2 rounded-full border bg-dock p-1.5 shadow-black/5 shadow-lg backdrop-blur-md dark:shadow-black/40";

const ICON_BUTTON =
  "grid size-[38px] place-items-center rounded-full text-foreground transition-press active:scale-97 hover:bg-muted aria-pressed:text-foreground";

/** Arrow keys move between the toolbar's controls (WAI-ARIA toolbar pattern). */
const onToolbarKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
    return;
  }

  const items = [
    ...event.currentTarget.querySelectorAll<HTMLElement>("a, button"),
  ];
  const active = document.activeElement;
  const index = active instanceof HTMLElement ? items.indexOf(active) : -1;
  const step = event.key === "ArrowRight" ? 1 : -1;
  const next = items[(index + step + items.length) % items.length];

  if (next) {
    event.preventDefault();
    next.focus();
  }
};

const loadTooltip = () => import("@/components/site/dock-tooltip");
const LazyTooltip = lazy(loadTooltip);

const loadTooltipGroup = async () => {
  const { DockTooltipGroup } = await loadTooltip();

  return { default: DockTooltipGroup };
};

const LazyTooltipGroup = lazy(loadTooltipGroup);

/** True once a mouse has entered the dock: from then on, buttons get real tooltips. */
const TooltipsReady = createContext(false);

const DockTooltip = ({ label, children }: { label: string; children: ReactElement }) =>
  useContext(TooltipsReady) ? (
    <Suspense fallback={children}>
      <LazyTooltip label={label}>{children}</LazyTooltip>
    </Suspense>
  ) : (
    children
  );

const DockTooltipScope = ({ ready, children }: { ready: boolean; children: ReactElement }) =>
  ready ? (
    <Suspense fallback={children}>
      <LazyTooltipGroup>{children}</LazyTooltipGroup>
    </Suspense>
  ) : (
    children
  );

const CopyEmailButton = () => {
  const { play, hoverProps } = useSounds();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () => () => {
      clearTimeout(timer.current);
    },
    []
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      window.location.href = `mailto:${site.email}`;

      return;
    }

    play("success");
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(false);
    }, COPIED_MS);
  };

  return (
    <>
      <DockTooltip label={copied ? "Copied" : "Copy email"}>
        <button
          aria-label="Copy email address"
          className={ICON_BUTTON}
          onClick={() => {
            copy().catch(() => undefined);
          }}
          type="button"
          {...hoverProps}
        >
          <IconSwap swapKey={copied ? "check" : "mail"}>
            {copied ? (
              <CheckIcon aria-hidden className="text-brand size-[18px]" />
            ) : (
              <EnvelopeSimpleIcon aria-hidden className="size-[18px]" />
            )}
          </IconSwap>
        </button>
      </DockTooltip>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
};

const SoundToggleButton = () => {
  const { enabled, toggle, hoverProps } = useSounds();
  const [interacted, setInteracted] = useState(false);

  return (
    <DockTooltip label={enabled ? "Sound on" : "Sound off"}>
      <button
        aria-label="Sound"
        aria-pressed={enabled}
        className={ICON_BUTTON}
        onClick={() => {
          setInteracted(true);
          toggle();
        }}
        type="button"
        {...hoverProps}
      >
        <IconSwap animate={interacted} swapKey={enabled ? "on" : "off"}>
          {enabled ? (
            <SpeakerHighIcon aria-hidden className="size-[18px]" />
          ) : (
            <SpeakerSlashIcon
              aria-hidden
              className="text-muted-foreground size-[18px]"
            />
          )}
        </IconSwap>
      </button>
    </DockTooltip>
  );
};

const DesktopDock = () => {
  const { openSearch, prefetchProps } = useSearch();
  const { hoverProps } = useSounds();
  const [tooltips, setTooltips] = useState(false);

  return (
    <div
      aria-label="Quick actions"
      className={cn(SHELL, "hidden items-center gap-1 md:flex")}
      onKeyDown={onToolbarKeyDown}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" && !tooltips) {
          setTooltips(true);
        }
      }}
      role="toolbar"
    >
      <TooltipsReady value={tooltips}>
      <DockTooltipScope ready={tooltips}>
      <>
      <button
        aria-haspopup="dialog"
        className="bg-background/60 text-muted-foreground text-small hover:bg-muted hover:text-foreground flex h-[38px] w-58 items-center gap-2 rounded-full border pr-1.5 pl-3 text-left transition-press active:scale-97"
        onClick={openSearch}
        type="button"
        {...prefetchProps}
        onPointerEnter={(event) => {
          prefetchProps.onPointerEnter();
          hoverProps.onPointerEnter(event);
        }}
      >
        <MagnifyingGlassIcon aria-hidden className="size-4" />
        <span className="flex-1">Search anything…</span>
        <Kbd>⌘K</Kbd>
      </button>
      <CopyEmailButton />
      {site.calendar ? (
        <DockTooltip label="Book a call">
          <a
            aria-label="Book a call"
            className={ICON_BUTTON}
            href={site.calendar}
            {...EXTERNAL}
            {...hoverProps}
          >
            <CalendarDotsIcon aria-hidden className="size-[18px]" />
            <NewTabNote />
          </a>
        </DockTooltip>
      ) : null}
      <SoundToggleButton />
      </>
      </DockTooltipScope>
      </TooltipsReady>
    </div>
  );
};

const MOBILE_ITEM =
  "grid size-11 place-items-center rounded-full text-muted-foreground transition-press active:scale-97 hover:text-foreground aria-[current=page]:bg-muted aria-[current=page]:text-foreground";

const MobileDock = () => {
  const { openSearch, prefetchProps } = useSearch();
  const { play } = useSounds();


  const tap = () => {
    play("click");
  };

  return (
    <nav aria-label="Mobile" className={cn(SHELL, "md:hidden")}>
      <ul className="flex items-center gap-1">
        <li>
          <Link
            activeOptions={{ exact: true, includeHash: true }}
            aria-label="Home"
            className={MOBILE_ITEM}
            onClick={tap}
            to="/"
          >
            <HouseIcon aria-hidden className="size-5" />
          </Link>
        </li>
        <li>
          <Link
            activeOptions={{ exact: true, includeHash: true }}
            aria-label="Projects"
            className={MOBILE_ITEM}
            hash="projects"
            onClick={tap}
            to="/"
          >
            <FolderSimpleIcon aria-hidden className="size-5" />
          </Link>
        </li>
        <li>
          <Link
            aria-label="Blog"
            className={MOBILE_ITEM}
            onClick={tap}
            to="/blog"
          >
            <NotebookIcon aria-hidden className="size-5" />
          </Link>
        </li>
        <li>
          <button
            aria-haspopup="dialog"
            aria-label="Search"
            className={MOBILE_ITEM}
            onClick={() => {
              tap();
              openSearch();
            }}
            type="button"
            {...prefetchProps}
          >
            <MagnifyingGlassIcon aria-hidden className="size-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export const Dock = () => (
  <>
    <DesktopDock />
    <MobileDock />
  </>
);
