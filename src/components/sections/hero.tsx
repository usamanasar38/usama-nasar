import {
  ArrowUpRightIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
          {socialLinks.map(({ href, label, Icon }) => (
            <Tooltip key={label}>
              <TooltipTrigger
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
                  >
                    <Icon className="size-3.5" />
                  </a>
                }
              />
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
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
