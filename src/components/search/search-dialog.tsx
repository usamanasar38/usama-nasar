import {
  ArrowUpRightIcon,
  CalendarDotsIcon,
  EnvelopeSimpleIcon,
  FolderSimpleIcon,
  HouseIcon,
  MoonIcon,
  NotebookIcon,
  SpeakerHighIcon,
  SpeakerSlashIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { ICONS } from "@/components/site/icons";
import type { IconName } from "@/components/site/icons";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { site } from "@/content/site";
import { formatPostDate } from "@/lib/dates";
import { getPosts } from "@/lib/posts";
import type { PostSummary } from "@/lib/posts";
import { SEARCH_LINKS, SEARCH_PAGES, SEARCH_PROJECTS } from "@/lib/search-index";
import { useSounds } from "@/lib/sound";
import { useTheme } from "@/lib/theme";

const PAGE_ICONS = { Blog: NotebookIcon, Projects: FolderSimpleIcon } as const;

const openExternal = (href: string) => {
  window.open(href, "_blank", "noopener,noreferrer");
};

type SearchDialogProps = { open: boolean; onOpenChange: (open: boolean) => void };

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const navigate = useNavigate();
  const { theme, toggle: toggleTheme } = useTheme();
  const { enabled, toggle: toggleSound, play } = useSounds();
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<PostSummary[]>([]);

  useEffect(() => {
    if (!open) {
      return;
    }
    let cancelled = false;
    getPosts()
      .then((result) => {
        if (!cancelled) {
          setPosts(result);
        }
        return result;
      })
      .catch(() => {
        // Posts are optional in the palette; pages and actions still work.
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  const switchTheme = () => {
    play(theme === "dark" ? "on" : "off");
    toggleTheme();
  };

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "d" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        switchTheme();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const close = () => onOpenChange(false);
  const run = (action: () => void) => () => {
    close();
    action();
  };

  return (
    <CommandDialog
      description="Search pages, posts, projects and actions"
      onOpenChange={(next) => {
        if (!next) {
          setQuery("");
        }
        onOpenChange(next);
      }}
      open={open}
      title="Search"
    >
      <Command loop>
        <CommandInput
          onValueChange={setQuery}
          placeholder="Search pages, posts, projects, actions…"
          value={query}
        >
          <Kbd>esc</Kbd>
        </CommandInput>
        <CommandList>
          <CommandEmpty>No results for “{query}”</CommandEmpty>

          <CommandGroup heading="pages">
            {SEARCH_PAGES.map((page) => {
              const Icon = PAGE_ICONS[page.title as keyof typeof PAGE_ICONS] ?? HouseIcon;
              return (
                <CommandItem
                  key={page.title}
                  keywords={page.keywords}
                  onSelect={run(() => {
                    navigate({ hash: page.hash, to: page.to }).catch(() => undefined);
                  })}
                  value={`page ${page.title}`}
                >
                  <Icon aria-hidden />
                  {page.title}
                </CommandItem>
              );
            })}
          </CommandGroup>

          {posts.length > 0 ? (
            <CommandGroup heading="posts">
              {posts.map((post) => (
                <CommandItem
                  key={post.slug}
                  keywords={post.tags}
                  onSelect={run(() => {
                    navigate({ params: { slug: post.slug }, to: "/blog/$slug" }).catch(
                      () => undefined
                    );
                  })}
                  value={`post ${post.title}`}
                >
                  <NotebookIcon aria-hidden />
                  <span className="truncate">{post.title}</span>
                  <CommandShortcut>{formatPostDate(post.date)}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}

          <CommandGroup heading="projects">
            {SEARCH_PROJECTS.map((project) => (
              <CommandItem
                key={project.id}
                keywords={project.keywords}
                onSelect={run(() => {
                  if (project.href) {
                    openExternal(project.href);
                  } else {
                    navigate({ hash: "projects", to: "/" }).catch(() => undefined);
                  }
                })}
                value={`project ${project.title}`}
              >
                <FolderSimpleIcon aria-hidden />
                <span className="truncate">{project.title}</span>
                <CommandShortcut>{project.hint}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="actions">
            <CommandItem
              keywords={["mail", "contact"]}
              onSelect={run(() => {
                navigator.clipboard
                  .writeText(site.email)
                  .then(() => play("success"))
                  .catch(() => {
                    window.location.href = `mailto:${site.email}`;
                  });
              })}
              value="action Copy email"
            >
              <EnvelopeSimpleIcon aria-hidden />
              Copy email
              <CommandShortcut>{site.email}</CommandShortcut>
            </CommandItem>
            {site.calendar ? (
              <CommandItem
                keywords={["meeting", "cal"]}
                onSelect={run(() => {
                  if (site.calendar) {
                    openExternal(site.calendar);
                  }
                })}
                value="action Book a call"
              >
                <CalendarDotsIcon aria-hidden />
                Book a call
              </CommandItem>
            ) : null}
            <CommandItem
              keywords={["dark", "light", "mode"]}
              onSelect={switchTheme}
              value="action Switch theme"
            >
              {theme === "dark" ? <SunIcon aria-hidden /> : <MoonIcon aria-hidden />}
              Switch to {theme === "dark" ? "light" : "dark"} theme
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem
              keywords={["audio", "mute"]}
              onSelect={toggleSound}
              value="action Toggle sound"
            >
              {enabled ? <SpeakerSlashIcon aria-hidden /> : <SpeakerHighIcon aria-hidden />}
              Turn sound {enabled ? "off" : "on"}
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="links">
            {SEARCH_LINKS.map((link) => {
              const Icon = ICONS[link.icon as IconName] ?? ArrowUpRightIcon;
              return (
                <CommandItem
                  key={link.href}
                  onSelect={run(() => openExternal(link.href))}
                  value={`link ${link.title}`}
                >
                  <Icon aria-hidden />
                  {link.title}
                  <CommandShortcut className="flex items-center gap-1">
                    {link.hint}
                    <ArrowUpRightIcon aria-hidden className="size-3.5" />
                  </CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
        <div
          aria-hidden
          className="flex items-center gap-3 border-t px-4 py-2.5 font-mono text-micro text-muted-foreground"
        >
          <span>↑↓ navigate</span>
          <span>·</span>
          <span>↵ open</span>
          <span>·</span>
          <span>esc close</span>
        </div>
      </Command>
    </CommandDialog>
  );
};

export default SearchDialog;
