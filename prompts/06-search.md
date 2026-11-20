# 06 · Search (⌘K)

```text
Read CLAUDE.md and docs/design/03-components.md "Command palette (⌘K)".

Goal: a global command palette opened from the header, the dock, ⌘K / Ctrl+K and "/".

Steps:
1. src/hooks/use-search-hotkey.ts: ⌘K / Ctrl+K always; "/" only when focus isn't in an input, textarea,
   select or contenteditable. preventDefault in both cases.
2. src/lib/search-index.ts: build the index on the server at build time (createServerFn or a prerendered
   JSON route; don't ship content to the client except the index itself). Items:
   - pages: Home, Projects (/#projects), Blog, Résumé (site.resume)
   - posts: title, slug, date, tags (empty for now; wired to content-collections in prompt 07)
   - projects: visible(projects) from site.ts
   - links: socials
   - actions: copy email, book a call, switch theme (hint ⌘D), turn sound on/off
3. src/components/search/search-dialog.tsx with shadcn Dialog + Command:
   - Dialog content max-w-[580px] rounded-2xl, 12vh from the top, overlay bg-scrim.
   - Input row: MagnifyingGlassIcon, placeholder "Search pages, posts, projects, actions…", Kbd "esc".
   - Groups with font-mono text-micro text-muted-foreground headings: pages, posts, projects, actions, links.
   - Items: h-10 rounded-[10px] px-3 text-small, 17px muted icon, right-aligned mono hint; selected = bg-muted.
   - Footer: "↑↓ navigate · ↵ open · esc close" in font-mono text-micro.
   - Empty: "No results for "{query}"".
   - Opening plays "open"; closing plays "collapse"; actions play their own sounds.
4. Lazy-load: the root layout holds open state and renders <SearchDialog> via React.lazy, mounted the
   first time search opens. Prefetch the chunk on hover/focus of any search trigger.
5. Connect onOpenSearch in the header and dock; register useSearchHotkey in the root layout. Add ⌘D as a
   theme hotkey only while the palette is open (as a listed action), not globally.

Acceptance:
- All five triggers open it; arrows/enter/esc work; focus returns to the trigger on close.
- Adding search grows initial JS on "/" by ≤ 2 kB (cmdk is in the lazy chunk).
- Screen readers announce results (cmdk default) and the dialog has an accessible name.
```
