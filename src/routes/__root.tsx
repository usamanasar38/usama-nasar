import { TanStackDevtools } from '@tanstack/react-devtools';
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { ThemeProvider } from 'next-themes';

import { TooltipProvider } from '@/components/ui/tooltip';
import { DATA, METADATA } from '@/data';
import { jsonLd } from '@/lib/seo';

import { NotFound } from '../components/not-found';

import appCss from '../styles.css?url';

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" attribute="class">
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  head: () => ({
    links: [
      { href: appCss, rel: 'stylesheet' },
      { href: DATA.url, rel: 'canonical' },
      { href: METADATA.repository, rel: 'source' },
      { href: '/usama-nasar.vcf', rel: 'author', type: 'text/vcard' },
      { href: '/sitemap.xml', rel: 'sitemap', type: 'application/xml' },
    ],
    meta: [
      { charSet: 'utf-8' },
      { content: 'width=device-width, initial-scale=1', name: 'viewport' },

      // Primary
      { title: METADATA.title },
      { content: METADATA.description, name: 'description' },
      { content: METADATA.keywords.join(', '), name: 'keywords' },
      { content: DATA.name, name: 'author' },
      {
        content:
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        name: 'robots',
      },
      { content: '#000000', name: 'theme-color' },
      { content: 'dark light', name: 'color-scheme' },
      { content: 'telephone=no', name: 'format-detection' },

      // Geo
      { content: METADATA.geo.region, name: 'geo.region' },
      { content: METADATA.geo.placename, name: 'geo.placename' },

      // Open Graph
      { content: 'profile', property: 'og:type' },
      { content: DATA.url, property: 'og:url' },
      { content: DATA.name, property: 'og:site_name' },
      { content: METADATA.locale, property: 'og:locale' },
      { content: METADATA.title, property: 'og:title' },
      { content: METADATA.description, property: 'og:description' },
      { content: METADATA.ogImage, property: 'og:image' },
      { content: '1200', property: 'og:image:width' },
      { content: '630', property: 'og:image:height' },
      { content: `${DATA.name} — ${DATA.role}`, property: 'og:image:alt' },
      { content: 'Usama', property: 'profile:first_name' },
      { content: 'Nasar', property: 'profile:last_name' },
      { content: 'usamanasar38', property: 'profile:username' },

      // Twitter / X
      { content: 'summary_large_image', name: 'twitter:card' },
      { content: METADATA.twitterHandle, name: 'twitter:site' },
      { content: METADATA.twitterHandle, name: 'twitter:creator' },
      { content: METADATA.title, name: 'twitter:title' },
      { content: METADATA.description, name: 'twitter:description' },
      { content: METADATA.ogImage, name: 'twitter:image' },
      { content: `${DATA.name} — ${DATA.role}`, name: 'twitter:image:alt' },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});
