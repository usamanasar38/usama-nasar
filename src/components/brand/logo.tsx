import type { SVGProps } from "react";

/** Wave mark path, 64×64 grid. Do not edit: see docs/design/01-brand.md. */
export const WAVE_PATH = "M10 16V37A11 11 0 0 0 32 37V27A11 11 0 0 1 54 27V48";
/** Wave cut out of the tile mark, 64×64 grid, stroke 5.5. Do not edit: see docs/design/01-brand.md. */
export const TILE_CUT_PATH = "M17 21V35.5A7.5 7.5 0 0 0 32 35.5V28.5A7.5 7.5 0 0 1 47 28.5V43";

type SvgProps = Omit<SVGProps<SVGSVGElement>, "children">;

type LogoProps = SvgProps & {
  /** Accessible name. Pass "" when the visible name "usama nasar" sits next to the mark. */
  title?: string;
  /** Draw the wave in once on a full page load (header only). */
  animate?: boolean;
  /** Show a brand-blue signal running along the wave (route loading). */
  pending?: boolean;
};

/**
 * Primary mark ("01 Wave"). Colour = currentColor, so style it with text-* classes:
 *   <Logo className="size-7 text-foreground hover:text-brand" />
 */
export function Logo({ title = "Usama Nasar", animate = false, pending = false, className, ...props }: LogoProps) {
  const labelled = title !== "";
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={6}
      role={labelled ? "img" : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
      className={["shrink-0", className].filter(Boolean).join(" ")}
      {...props}
    >
      <path d={WAVE_PATH} pathLength={1} className={animate ? "un-draw" : undefined} />
      {pending ? (
        <path d={WAVE_PATH} pathLength={1} stroke="currentColor" className="un-signal text-brand" aria-hidden />
      ) : null}
    </svg>
  );
}

/** Tile mark ("03 Tile") for avatars, OG images, app icons. Favicons use /public files. */
export function LogoTile({ title = "Usama Nasar", className, ...props }: SvgProps & { title?: string }) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label={title} focusable="false" className={className} {...props}>
      <defs>
        <mask id="un-tile-cut">
          <rect width="64" height="64" fill="#fff" />
          <path d={TILE_CUT_PATH} fill="none" stroke="#000" strokeWidth={5.5} />
        </mask>
      </defs>
      <rect width="64" height="64" rx="14" fill="currentColor" mask="url(#un-tile-cut)" />
    </svg>
  );
}

/** "> un_" prompt for the footer. Decorative: the visible text carries the meaning. */
export function PromptMark({ className, ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 84 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={6}
      aria-hidden
      focusable="false"
      className={className}
      {...props}
    >
      <path d="M6 20L18 32L6 44M28 20V36A8 8 0 0 0 44 36V28A8 8 0 0 1 60 28V44" />
      <path d="M68 44H80" className="un-blink" />
    </svg>
  );
}
