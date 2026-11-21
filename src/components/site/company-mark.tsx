import type { ReactNode } from "react";

import {
  resolveThemedSrc,
  THEMED_IMG,
} from "@/features/portfolio/lib/themed-image";
import type {
  PhosphorIcon,
  ThemedSrc,
} from "@/features/portfolio/types/common";
import { hasPublicFile } from "@/lib/public-asset";
import { cn } from "@/lib/utils";

const MONOGRAM_SPLIT = /[^\p{L}\p{N}]+/u;
const LATIN_START = /^[a-z0-9]/iu;

const monogram = (name: string) => {
  const words = name
    .split(MONOGRAM_SPLIT)
    .filter((word) => LATIN_START.test(word));

  const [first = "", second] = words;

  return (
    second === undefined ? first.slice(0, 2) : `${first[0]}${second[0]}`
  ).toLowerCase();
};

const LOGO =
  "size-6 rounded-md object-contain opacity-60 grayscale transition duration-150 group-hover/item:opacity-100 group-hover/item:grayscale-0 group-has-focus-visible/item:opacity-100 group-has-focus-visible/item:grayscale-0 motion-reduce:transition-none";

const LogoImage = ({ src, className }: { src: string; className?: string }) => (
  <img
    alt=""
    className={cn(LOGO, className)}
    decoding="async"
    height={24}
    loading="lazy"
    src={src}
    width={24}
  />
);

/**
 * 40px disc showing a company logo (greyscale until the parent `group/item` row
 * is hovered or focused), else a Phosphor icon, else a monogram such as
 * "Love, Bonito" → "lb". Decorative: the company name sits next to it.
 */
export const CompanyMark = ({
  name,
  logo,
  icon: Icon,
}: {
  name: string;
  logo?: ThemedSrc;
  icon?: PhosphorIcon;
}) => {
  const src = logo === undefined ? undefined : resolveThemedSrc(logo);
  let content: ReactNode = monogram(name);

  if (src !== undefined && hasPublicFile(src.light)) {
    const themed = src.light !== src.dark && hasPublicFile(src.dark);

    content = themed ? (
      <>
        <LogoImage className={THEMED_IMG.light} src={src.light} />
        <LogoImage className={THEMED_IMG.dark} src={src.dark} />
      </>
    ) : (
      <LogoImage src={src.light} />
    );
  } else if (Icon !== undefined) {
    content = <Icon className="size-[18px]" />;
  }

  return (
    <span
      aria-hidden
      className="bg-muted text-caption grid size-10 shrink-0 place-items-center rounded-full font-mono"
    >
      {content}
    </span>
  );
};
