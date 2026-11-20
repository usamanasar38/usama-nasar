# 03 · Brand assets

```text
Read CLAUDE.md and docs/design/01-brand.md.

Goal: logos, favicons, manifest and default OG images are wired in and work in both themes.

Steps:
1. Check public/ contains: favicon.ico, favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png,
   logo-512.png, site.webmanifest, og-default-light.png, og-default-dark.png and brand/*.svg. Don't modify them.
2. Check src/components/brand/logo.tsx exports Logo, LogoTile, PromptMark, WAVE_PATH. Don't change the paths.
   Make sure the un-draw, un-signal and un-blink utilities from app.css are used as the components expect
   (pathLength=1).
3. Root head(): add icon links: favicon.ico (sizes 48x48), favicon.svg (type image/svg+xml),
   apple-touch-icon.png, manifest site.webmanifest. Default og:image = absolute URL of
   /og-default-light.png (1200×630) with og:image:width/height and og:image:alt "Usama Nasar".
4. site.webmanifest: name "Usama Nasar", short_name "Usama Nasar", theme_color and background_color
   #0a0a0a, display "standalone", icons 192/512 (512 purpose "any maskable"). Already correct; just verify.
5. Add a brand preview to the temporary index route from prompt 01: Logo (with animate), LogoTile,
   PromptMark at 16, 26, 64px in text-foreground, plus the lockup <img> pair shown in 01-brand.md
   ("Light and dark: which method where", method 2). Toggle the theme to check both.

Acceptance:
- Favicon appears in the tab in light and dark OS modes; the apple-touch icon and manifest validate in
  DevTools > Application.
- The logo follows the theme via currentColor; the img pair swaps correctly with the .dark class.
- The header logo draw-in plays once on reload and not at all with reduced motion enabled.
```
