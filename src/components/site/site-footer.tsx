import { HeartIcon } from "@phosphor-icons/react";
import { PromptMark } from "@/components/brand/logo";
import { EXTERNAL, NewTabNote } from "@/components/site/external-note";
import { SOURCE_CODE_GITHUB_URL } from "@/config/site";
import { useSounds } from "@/lib/sound";

const LINK =
  "rounded-sm underline-offset-4 transition-colors hover:text-foreground hover:underline";

export const SiteFooter = () => {
  const { hoverProps } = useSounds();
  return (
    <footer className="mx-auto max-w-site px-5 pt-14 pb-32 md:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-2 font-mono text-label text-muted-foreground">
          <PromptMark className="h-3.5 w-auto text-foreground" />
          designed &amp; built with
          <HeartIcon
            aria-hidden
            className="un-heartbeat size-4 text-love"
            weight="fill"
          />
          <span className="sr-only">love</span>
          by usama nasar
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-2 font-mono text-caption text-muted-foreground">
            <li>
              <a className={LINK} href="/rss.xml" {...hoverProps}>
                rss
              </a>
            </li>
            <li aria-hidden>·</li>
            <li>
              <a className={LINK} href="/llms.txt" {...hoverProps}>
                llms.txt
              </a>
            </li>
            <li aria-hidden>·</li>
            <li>
              <a className={LINK} href="/sitemap.xml" {...hoverProps}>
                sitemap
              </a>
            </li>
            <li aria-hidden>·</li>
            <li>
              <a className={LINK} href={SOURCE_CODE_GITHUB_URL} {...EXTERNAL} {...hoverProps}>
                source
                <NewTabNote />
              </a>
            </li>
            <li aria-hidden>·</li>
            <li suppressHydrationWarning>© {new Date().getFullYear()}</li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
