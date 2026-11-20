# 08 · Home: intro, overview, stack

```text
Read CLAUDE.md, docs/design/04-pages.md (Home), 03-components.md (Hero, Chips, Overview list, Section
heading) and 05-content.md (Page copy). Remove the temporary token/brand preview route.

Goal: the top three sections of "/" exactly as on the canvas, data from src/content/site.ts.

Build in src/routes/index.tsx with section components in src/components/home/:
1. Intro (<section id="about" aria-label="About">, pt-14, flex-col gap-5.5):
   - Row (stacks < md): shadcn Avatar size-28 rounded-full border with <img width=112 height=112
     fetchPriority="high" alt="Usama Nasar"> (site.avatar), fallback LogoTile on bg-muted.
   - Next to it: Badge variant "brand" "available for work" with a 6px bg-brand dot (only if
     site.availableForWork), <h1 className="text-display"> site.name, role line (text-lead font-medium).
   - Intro paragraph: text-lead text-muted-foreground max-w-[640px]; "daleelaqar.com" as an inline brand link.
   - Social chips <ul aria-label="Social links">: pill links h-9 border px-3 gap-2 text-small with Phosphor
     icons from the icon map in 02-foundations.md; external links get sr-only "(opens in a new tab)".
2. Overview (mt-16 md:mt-20, SectionHeading "Overview"): <dl> 2 columns ≥ md using shadcn Item: icon disc
   size-9 rounded-full bg-muted, <dt> font-mono text-micro text-muted-foreground, <dd> 15px.
3. Stack (SectionHeading "Stack"): groups (h3 in font-mono text-caption text-muted-foreground lowercase),
   pill chips (li, h-8 border pl-2.5 pr-3.5 gap-2 text-small) with a monochrome simple-icons logo
   (TechIcon: svg viewBox 0 0 24 24 fill currentColor, size-3.5, aria-hidden).
4. Every chip/link plays "hover" on pointer enter.

Constraints: no dividers; nothing animates in; the hero must render fully from server HTML (it's the LCP).

Acceptance:
- Matches the canvas at 1440 and 390 (hero stacks on mobile) in both themes.
- LCP element is the h1 or the avatar; CLS 0; Lighthouse a11y 100.
```
