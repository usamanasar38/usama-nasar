# 10 · Home: blog, education, recognition, contact

```text
Read CLAUDE.md, docs/design/03-components.md (Post card, Credential row, Contact links), 04-pages.md (Home).

Build:
1. src/components/blog/post-card.tsx (custom on card tokens): the whole card is one Link to
   /blog/$slug. Cover 1200:630 rounded-xl border overflow-hidden bg-muted with an <img> (width 1200, height 630,
   lazy unless priority) that scales to 1.02 on hover (500ms, motion-reduce:transition-none); no cover →
   title in mono on bg-muted. Below: title (prop `as` h2|h3, class text-h3, underline fades in on hover),
   then font-mono text-caption "<time dateTime>Mmm d, yyyy</time> · n min read". Hover plays "hover".
2. Blog section (id="blog", SectionHeading "Blog" with an "All posts →" link to /blog): latest 4 posts
   from getPosts() in a grid gap-x-4 gap-y-8 md:grid-cols-2, as="h3". Hide the section if there are none.
3. Education and Recognition: two separate sections (SectionHeading "Education" / "Recognition") of
   shadcn Item rows: 40px rounded-full bg-muted icon disc (GraduationCapIcon / TrophyIcon), title (16/600),
   org (14 muted), year on the right (font-mono text-caption). From visible(education) / visible(recognition).
4. Contact (id="contact", mt-24): heading "Say hi." (48px desktop / text-h1 scale, weight 600, tracking
   -0.035em), one muted line, and a pill sound toggle on the right (aria-pressed, SpeakerHighIcon /
   SpeakerSlashIcon, font-mono text-micro). Then contactLinks as big links: index 01…, label text-say,
   hint (≥ md, font-mono text-caption), ArrowUpRightIcon that nudges up-right on hover; underline fades in.
   Hover and focus play note(i); click plays "click". No dividers.

Acceptance:
- The full home page matches the canvas home frames at 1440 and 390 in both themes.
- Blog cards: one link per card, readable link name (the title), covers don't shift layout.
- Contact links play a rising run when hovered top to bottom (after one click), and are silent when sound is off.
```
