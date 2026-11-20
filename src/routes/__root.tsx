/// <reference types="vite/client" />
import hostGroteskUrl from "@fontsource-variable/host-grotesk/files/host-grotesk-latin-wght-normal.woff2?url";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { MotionProvider } from "@/components/motion-provider";
import { SearchProvider } from "@/components/search/search-provider";
import { BackToTop } from "@/components/site/back-to-top";
import { Dock } from "@/components/site/dock";
import { NotFound } from "@/components/site/not-found";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getSiteJsonLd } from "@/lib/portfolio.functions";
import { rootHead } from "@/lib/seo";
import { SoundProvider } from "@/lib/sound";
import { THEME_SCRIPT } from "@/lib/theme";

import appCss from "@/styles/app.css?url";

const RootDocument = ({ children }: { children: ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      {/* Sets .dark before first paint: no flash, no shift. Must stay before the stylesheet. */}
      {/* oxlint-disable-next-line react/no-danger -- static, build-time string */}
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      <HeadContent />
    </head>
    <body className="min-h-dvh">
      {children}
      <Scripts />
    </body>
  </html>
);

const RootLayout = () => (
  <MotionProvider>
    <SoundProvider>
        <SearchProvider>
          <a
            className="bg-foreground text-background text-small sr-only z-50 rounded-full px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
            href="#main"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main className="focus:outline-none" id="main" tabIndex={-1}>
            <Outlet />
          </main>
          <SiteFooter />
          <Dock />
          <BackToTop />
        </SearchProvider>
    </SoundProvider>
  </MotionProvider>
);

export const Route = createRootRoute({
  component: RootLayout,
  loader: () => getSiteJsonLd(),
  head: ({ loaderData }) => {
    const base = rootHead();

    return {
      links: [
        {
          as: "font",
          crossOrigin: "anonymous",
          href: hostGroteskUrl,
          rel: "preload",
          type: "font/woff2",
        },
        { href: appCss, rel: "stylesheet" },
        ...base.links,
      ],
      meta: base.meta,
      scripts: loaderData ? [{ children: loaderData, type: "application/ld+json" }] : [],
    };
  },
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});
