# 04 · Site shell

```text
Read CLAUDE.md, docs/design/02-foundations.md (Layout, Radius, Icons), 03-components.md sections Header,
Theme toggle, Dock, Back to top, Footer, Section heading, and 04-pages.md (site map, responsive behaviour).

Goal: header, theme toggle, dock, floating back-to-top and footer on every page. Sounds and search are
wired in later prompts: leave clearly named no-op callbacks (onOpenSearch, sound hooks) for now.

Build (custom, per 03-components.md, with paths given there):
1. ThemeToggle: icon button (rounded-full, size-10), Phosphor MoonIcon / SunIcon, aria-label naming the
   target theme, uses useTheme() from src/lib/theme.ts.
2. SiteHeader: sticky, h-16, bg-background/80 backdrop-blur-md, NO bottom border, max-w-site container.
   Left: Link to "/" with <Logo title="" animate pending={routerPending}> + "usama nasar" (font-mono
   text-small font-medium), aria-label "Usama Nasar, home". routerPending comes from
   useRouterState({ select: s => s.status === "pending" }). Right ≥ md: pill links "projects" (→ /#projects)
   and "blog" (→ /blog), a pill search trigger ("Search" + Kbd ⌘K), ThemeToggle. Right < md: search icon
   button + ThemeToggle. Add an sr-only aria-live region announcing "Loading page" while pending.
3. SectionHeading: <h2 className="text-section"> with an optional mono two-digit counter (with sr-only
   "N items") or an "All posts →" link on the right; mb-5.
4. Dock: fixed bottom centre pill (rounded-full border bg-dock backdrop-blur-md p-1.5 shadow-lg
   shadow-black/5 dark:shadow-black/40), safe-area aware.
   - ≥ md, role="toolbar" aria-label "Quick actions": pill search field (w-58, Search anything… + ⌘K) ·
     copy email button (copies site.email; swaps EnvelopeSimpleIcon → CheckIcon text-brand for 1.8s;
     polite live announcement; falls back to mailto) · book a call link (site.calendar, new tab, sr-only
     "(opens in a new tab)") · sound toggle (aria-pressed, SpeakerHighIcon / SpeakerSlashIcon).
     Icon buttons are 38px circles with shadcn Tooltip labels (desktop only) AND aria-labels.
   - < md, <nav aria-label="Mobile">: Home, Projects, Blog, Search as 44px circles; active = bg-muted +
     aria-current="page".
5. BackToTop: fixed bottom-right circle (size-12, right-4 bottom-4, md:right-6 md:bottom-6), bg-dock
   border shadow, ArrowUpIcon, SVG ring <circle pathLength=1 className="un-progress stroke-brand">,
   class un-reveal on the button. Click scrolls to top (instant under reduced motion) and focuses #main.
   It must not overlap the mobile dock at 360px.
6. SiteFooter: no top border; pt-14 pb-32; PromptMark + "designed & built by usama nasar" (font-mono
   text-label text-muted-foreground) and links rss · llms.txt · sitemap · source · © year (font-mono
   text-caption). Links may 404 until prompt 12.
7. Root layout: skip link, SiteHeader, <main id="main" tabIndex={-1} className="mx-auto max-w-site px-5
   md:px-6">, SiteFooter, Dock, BackToTop. Blog post pages will widen main themselves later.

Constraints: Phosphor icons only; tokens only; no borders between header/main/footer; no scroll listeners.

Acceptance:
- Matches the canvas header, dock and footer at 1440 and 390 in both themes.
- Back-to-top is hidden at the top, fades in after ~400px, and the ring fills with scroll.
- Everything works by keyboard; touch targets ≥ 44px on mobile; Lighthouse a11y 100 on the placeholder page.
```
