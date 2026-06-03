import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  HeartIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from '@phosphor-icons/react';
import { motion } from 'motion/react';

import { DATA, METADATA } from '@/data';

const socialLinks = [
  {
    Icon: GithubLogoIcon,
    href: DATA.contact.social.GitHub.url,
    label: 'GitHub',
  },
  {
    Icon: LinkedinLogoIcon,
    href: DATA.contact.social.LinkedIn.url,
    label: 'LinkedIn',
  },
  {
    Icon: XLogoIcon,
    href: DATA.contact.social.Twitter.url,
    label: 'Twitter',
  },
  {
    Icon: EnvelopeSimpleIcon,
    href: `mailto:${DATA.contact.email}`,
    label: 'Email',
  },
] as const;

const inspiredBy = [
  { href: 'https://tailwindcss.com', label: 'tailwindcss.com' },
  { href: 'https://ui.shadcn.com', label: 'ui.shadcn.com' },
  { href: 'https://vercel.com', label: 'vercel.com' },
  { href: 'https://chanhdai.com', label: 'chanhdai.com' },
] as const;

const heartbeat = {
  animate: { scale: [1, 1.4, 1, 1.3, 1] },
  transition: {
    duration: 1.4,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatDelay: 1.2,
    times: [0, 0.2, 0.4, 0.6, 1],
  },
};

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-2xl px-6 py-8">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">
              The source code is available on{' '}
              <a
                href={METADATA.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline-offset-4 transition-colors hover:underline"
              >
                GitHub
              </a>
              .
            </p>
            <p className="text-xs text-muted-foreground">
              Inspired by{' '}
              {inspiredBy.map((site, i) => (
                <span key={site.href}>
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {site.label}
                  </a>
                  {i < inspiredBy.length - 1 && (
                    <span className="mx-1 text-border">/</span>
                  )}
                </span>
              ))}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-3 sm:items-end">
            <div className="flex items-center">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={
                    href.startsWith('mailto')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  aria-label={label}
                  className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {DATA.name}
            </p>
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          Built with
          <motion.span
            animate={heartbeat.animate}
            transition={heartbeat.transition}
            className="inline-flex"
          >
            <HeartIcon
              weight="fill"
              className="size-3 text-red-500"
              aria-hidden
            />
          </motion.span>
          by <span className="font-medium text-foreground">{DATA.name}</span>
        </p>
      </div>
    </footer>
  );
}
