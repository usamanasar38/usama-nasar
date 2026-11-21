<!-- intent-skills:start -->
## Skill Loading

Use the repository’s installed Intent. If it is unavailable, report the missing dependency instead of downloading a replacement.
Before editing files for a substantial task:
- Run `pnpm exec intent list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `pnpm exec intent load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `pnpm exec ultracite fix`
- **Check for issues**: `pnpm exec ultracite check`
- **Diagnose setup**: `pnpm exec ultracite doctor`

Oxlint + Oxfmt (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Write functions as arrow functions assigned to `const`, and define them above where they're used
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- When a hook dependency rule fires, first check whether the effect is needed, and whether adding the dependency changes when it runs
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- In JSX, work out a multi-way condition in a variable or helper above the `return`, not in a chain of ternaries

### Accessibility

- Use semantic HTML first; add ARIA only when no native element fits
- Provide meaningful alt text for images
- Use proper heading hierarchy
- Add labels for form inputs
- Make anything clickable a `<button>` or a link, so it works from the keyboard; don't add key handlers to a `<div>`
- Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting, and put braces around every `if` body, including a one-line guard
- Use a single ternary for a choice between two values. For three or more outcomes, use early returns or a lookup; never nest ternaries
- Group related code together and separate concerns
- Avoid import cycles; move shared code into a module both sides import
- Don't leave TODO or FIXME comments in new code. For an existing one, do the task, delete it if it's done, or leave it; never reword it to get past the linter

### Security

- Add `rel="noopener noreferrer"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Avoid barrel files (index files that only re-export other modules) inside an app; a package's entry point is fine
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**

- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**

- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**

- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Oxlint + Oxfmt Can't Help

Oxlint + Oxfmt will catch most mechanical issues automatically. Focus your attention on:

1. **Business logic correctness** - Oxlint + Oxfmt can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Oxlint + Oxfmt. Run `pnpm exec ultracite fix` before committing to ensure compliance.

---

# usamanasar.dev: agent rules

Personal portfolio and blog for Usama Nasar, senior frontend & full-stack engineer. Monochrome, one blue
accent, pill-and-circle shapes, sections separated by space, small UI sounds.

## How to work

- `docs/design/` is the source of truth for design and content. Read the relevant doc before changing a
  page or component (`02-foundations.md` for tokens, `03-components.md` for components, `04-pages.md` for
  layouts, `08-motion.md` before adding any animation). If code and a doc disagree, the doc wins; if you
  change a rule on purpose, update the doc in the same change.
- `prompts/` holds the original build prompts and the agent rules they were written against (`prompts/CLAUDE.md`). They are history now: read them for intent, not as a to-do list.
- Finish every change with `pnpm typecheck` and `pnpm build`, then check the page at 390px and 1440px in
  light and dark. Report what you did and anything left open.
- Don't commit unless asked. Never commit straight to `main`.

## Stack (don't swap)

TanStack Start 1.x (React 19, SSR, Vite, Nitro, Vercel) · TypeScript strict · Tailwind CSS 4 · shadcn/ui
`base-mira` on Base UI · Motion via `LazyMotion` (`m.*` only) · Phosphor icons · simple-icons for tech logos ·
content-collections for `.md`/`.mdx` posts · rehype-pretty-code + Shiki at build time · soundcn sounds
behind our own `SoundProvider` · Ultracite (Oxlint + Oxfmt).

## Hard rules

1. **Tokens only.** No hex/rgb/oklch or Tailwind palette colours in components. Use the tokens in
   `src/styles/app.css` (`bg-background`, `text-foreground`, `text-muted-foreground`, `border`, `bg-muted`,
   `text-brand`, `bg-brand-subtle`…). Missing token → add it to `app.css` (light and `.dark`) and
   `02-foundations.md`.
2. **Blue is the only accent:** links, focus rings, active state, logo hover, progress ring, availability
   badge. No blue buttons, cards or backgrounds. Two scoped exceptions exist and must stay scoped:
   `status` (green, the "available for work" dot) and `love` (red, the footer heart).
3. **Shapes:** `rounded-full` for chips, tags, badges, buttons, inputs, kbd and the dock; circles for the
   avatar, icon discs and back-to-top; `rounded-xl` for cards and images; `rounded-2xl` for the command
   dialog; `rounded-lg` for code blocks.
4. **Badges share one size.** Availability badge, stack chips and tags are all `<Badge>` (`h-7 px-3
   text-caption`, 14px icons). Change look with a variant (`brand`, `chip`, `tag`), never with a size class.
5. **No section dividers.** Space and a `SectionHeading` separate sections.
6. **Components:** shadcn first, then Kibo UI / soundcn (`docs/design/07-registries.md`), then custom.
   Restyle every registry component to our tokens and Phosphor icons. **No `lucide-react`.**
7. **Type scale classes only:** `text-display`, `text-h1`, `text-h2`, `text-section`, `text-h3`, `text-say`,
   `text-lead`, `text-body`, `text-prose`, `text-detail`, `text-small`, `text-label`, `text-caption`,
   `text-micro`, `text-code`. Commit Mono (`font-mono`) only for metadata, counters, tags, kbd, code and the
   name lockup.
8. **Icons are Phosphor regular weight.** A Vite plugin strips every other weight from the bundle, so
   `weight="fill"` renders nothing unless the icon is listed in `PHOSPHOR_WEIGHT_OVERRIDES`
   (`vite.config.ts`). Today only `Heart` (fill) is.
9. **Brand assets are fixed.** Use `Logo`, `LogoTile`, `PromptMark` from `src/components/brand/logo.tsx`
   and the files in `public/`. Never redraw or recolour the paths.
10. **Never invent content.** Facts come from `src/features/portfolio/data/` and `src/content/site.ts`.
    `[BRACKETS]` are placeholders for Usama and stay hidden until filled. Drafts are hidden in production.
11. **SSR and Core Web Vitals first.** Every fact is in the server HTML. No splash or loader, no
    above-the-fold entrance animations, no scroll listeners. CSS for motion by default; Motion only where
    `08-motion.md` allows. Every animation stops under `prefers-reduced-motion`.
12. **Sound** only through `useSounds()` (`src/lib/sound.tsx`): never on load or scroll, nothing loaded before
    the first interaction, the toggle always available.
13. **Accessibility is part of done:** semantic elements, visible focus, labels on icon buttons, 44px touch
    targets, WCAG AA (the tokens pass; don't lighten them).
14. **SEO and LLMs:** every route sets title, description, canonical, OG and JSON-LD. Posts appear in the
    sitemap, RSS and `llms.txt`, and have a `.md` twin.
15. **Keep the client bundle lean.** Server-only work (Shiki, post bodies, JSON-LD, simple-icons paths) stays
    in server functions or `*.server.ts`. Lazy-load anything not needed for first paint (search dialog,
    tooltips, sounds).

## Project gotchas

- Import `cn` from `@/lib/utils`, never from `"cn"` directly. The local one knows our type scale; the raw one
  treats `text-caption` as a colour and drops it when a text colour is also present.
- Server functions use `createServerFn().validator(...)` (not `.inputValidator`). Return plain serialisable
  data; JSON-LD goes out as an escaped string.
- In `createFileRoute` options keep the order `validateSearch → loaderDeps → loader → head → component`,
  or `loaderData` loses its types. Don't let a formatter sort them.
- Suffix routes use brackets: `blog/{$slug}[.]md.ts`, `llms[.]txt.ts`. `src/routeTree.gen.ts` is generated.
- Keep dynamic `import()` at module scope, not inside components (React Compiler can't handle it).
- Images inside MDX paragraphs are unwrapped by `mdxComponents.p`, so `<div>` never lands inside `<p>`.
- Every page is prerendered at build time (`/vcard` excepted). A page that throws fails the build.

## Definition of done

- `pnpm typecheck` and `pnpm build` pass with no new warnings.
- Keyboard-only pass works; no console errors; no hydration warnings.
- Lighthouse mobile on changed pages: Performance ≥ 95, Accessibility / Best Practices / SEO = 100.
