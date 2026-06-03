import { Tooltip } from '@base-ui/react/tooltip';
import {
  ArrowUpRightIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { DATA } from '@/data';

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

export function HeroSection() {
  const handle = useMemo(() => Tooltip.createHandle<string>(), []);

  return (
    <section>
      <p className="text-sm text-muted-foreground">Hey, I'm</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        {DATA.name}
      </h1>
      <p className="mt-2 text-base font-medium text-muted-foreground">
        {DATA.role}
      </p>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
        {DATA.description}
      </p>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {/* Single tooltip that repositions across all triggers without closing */}
          <Tooltip.Root handle={handle} disableHoverablePopup>
            {({ payload: label }) => (
              <Tooltip.Portal>
                <Tooltip.Positioner
                  side="top"
                  sideOffset={6}
                  className="isolate z-50 transition-[transform] duration-[120ms] ease-out data-[instant]:transition-none"
                >
                  <Tooltip.Popup
                    render={
                      <motion.div
                        layout="size"
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                      />
                    }
                    className="inline-flex w-fit origin-(--transform-origin) items-center rounded-md bg-foreground px-2 py-0.5 text-xs text-background data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95"
                  >
                    {label ?? ''}
                    <Tooltip.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=top]:-bottom-2.5" />
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            )}
          </Tooltip.Root>

          {/* Detached triggers — each shares the same Root via handle */}
          {socialLinks.map(({ href, label, Icon }) => (
            <Tooltip.Trigger
              key={label}
              handle={handle}
              payload={label}
              delay={0}
              closeDelay={150}
              render={
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={
                    href.startsWith('mailto')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={label}
                />
              }
            >
              <Icon className="size-3.5" />
            </Tooltip.Trigger>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          render={
            <a href={DATA.resumeLink} target="_blank" rel="noopener noreferrer">
              Resume
              <ArrowUpRightIcon />
            </a>
          }
        />
      </div>
    </section>
  );
}
