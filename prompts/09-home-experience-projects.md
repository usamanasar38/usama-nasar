# 09 · Home: experience and projects

```text
Read CLAUDE.md, docs/design/03-components.md (Experience, Show more, Project card), 08-motion.md.

Goal: Experience and Projects sections with max 4 items visible and an animated "Show all N".

Build:
1. src/components/site/show-more.tsx (custom) per "Show more": renders items.slice(0, initial) then the
   rest inside a wrapper whose grid-template-rows animates 0fr → 1fr (500ms ease-out-quint, none under
   reduced motion), with an inner min-h-0 overflow-hidden div. The rest is server-rendered but `inert` while
   closed. Centred pill button "Show all {N}" / "Show less" with a sr-only label (e.g. "projects"),
   CaretDownIcon rotating 180°, aria-expanded, aria-controls. Opening moves focus to the first focusable
   revealed item and plays "expand"; closing plays "collapse". If items.length ≤ initial, render no button.
   Leave a hook point for the Motion stagger added in prompt 13.
2. Experience (id="experience", SectionHeading "Experience" with count): ShowMore initial=4 over
   visible(experience). Each row is a native <details name="experience"> (first one open):
   <summary> (list-none, no marker) = 40px rounded-full bg-muted monogram disc (font-mono), company
   (16/600) over role (14 muted), dates on the right ≥ md (font-mono text-caption), CaretDownIcon that rotates
   when open; hover bg-muted rounded-xl, p-3 -mx-3. Content pl-[54px] pb-4: dates (< md only), bullet list
   (15px muted), tag badges (variant "tag"). onToggle plays expand/collapse. Rows separated by gap-1, no lines.
   Format dates as "Mmm yyyy — now".
3. Projects (id="projects", SectionHeading "Projects" with count): ShowMore initial=4 over visible(projects),
   rendering a 2-column grid (md) of project cards: shadcn Card rounded-xl overflow-hidden; image 16:10
   (<img loading="lazy" decoding="async" width height>, or bg-muted with the title in mono); body p-4:
   title (text-h3) + ArrowUpRightIcon link (aria-label "Open {title}"), description (text-small muted),
   tag badges. Hover border-muted-foreground.

Acceptance:
- With 6 items, 4 show; "Show all 6" opens smoothly and focus lands on the first new card; "Show less" closes.
- Collapsed items are in the page source (view-source) but not reachable by Tab.
- <details> rows work with JavaScript disabled.
```
