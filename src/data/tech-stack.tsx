import type { ComponentType } from 'react';

import { Angular } from '../components/ui/svgs/angular';
import { BaseUi } from '../components/ui/svgs/base-ui';
import { BaseUiDark } from '../components/ui/svgs/base-ui-dark';
import { Bun } from '../components/ui/svgs/bun';
import { ClaudeAiIcon } from '../components/ui/svgs/claude-ai-icon';
import { Cypress } from '../components/ui/svgs/cypress';
import { Docker } from '../components/ui/svgs/docker';
import { Git } from '../components/ui/svgs/git';
import { Javascript } from '../components/ui/svgs/javascript';
import { Jest } from '../components/ui/svgs/jest';
import { Motion } from '../components/ui/svgs/motion';
import { MotionDark } from '../components/ui/svgs/motion-dark';
import { MysqlIconLight } from '../components/ui/svgs/mysql-icon-light';
import { Nestjs } from '../components/ui/svgs/nestjs';
import { NextjsIconDark } from '../components/ui/svgs/nextjs-icon-dark';
import { Nodejs } from '../components/ui/svgs/nodejs';
import { Nuxt } from '../components/ui/svgs/nuxt';
import { Openai } from '../components/ui/svgs/openai';
import { OpenaiDark } from '../components/ui/svgs/openai-dark';
import { Pinia } from '../components/ui/svgs/pinia';
import { Playwright } from '../components/ui/svgs/playwright';
import { Postgresql } from '../components/ui/svgs/postgresql';
import { RadixUiDark } from '../components/ui/svgs/radix-ui-dark';
import { RadixUiLight } from '../components/ui/svgs/radix-ui-light';
import { ReactLight } from '../components/ui/svgs/react-light';
import { Redis } from '../components/ui/svgs/redis';
import { Redux } from '../components/ui/svgs/redux';
import { Sass } from '../components/ui/svgs/sass';
import { ShadcnUi } from '../components/ui/svgs/shadcn-ui';
import { ShadcnUiDark } from '../components/ui/svgs/shadcn-ui-dark';
import { Tailwindcss } from '../components/ui/svgs/tailwindcss';
import { Tanstack } from '../components/ui/svgs/tanstack';
import { Typescript } from '../components/ui/svgs/typescript';
import { Vitest } from '../components/ui/svgs/vitest';
import { Vue } from '../components/ui/svgs/vue';

export type TechIcon = ComponentType<{ className?: string }>;

export interface TechItem {
  name: string;
  Icon: TechIcon;
  href: string;
}

function p(abbr: string): TechIcon {
  function PlaceholderIcon() {
    return (
      <div className="flex size-4 items-center justify-center rounded text-[9px] font-bold text-muted-foreground">
        {abbr}
      </div>
    );
  }
  PlaceholderIcon.displayName = `Icon_${abbr}`;
  return PlaceholderIcon;
}

function themed(Light: TechIcon, Dark: TechIcon): TechIcon {
  // oxlint-disable-next-line unicorn/consistent-function-scoping
  function ThemedIcon({ className }: { className?: string }) {
    return (
      <>
        <Light className={`${className ?? ''} block dark:hidden`} />
        <Dark className={`${className ?? ''} hidden dark:block`} />
      </>
    );
  }
  ThemedIcon.displayName = `${Light.displayName ?? 'Icon'}Themed`;
  return ThemedIcon;
}

export const TECH_STACK: TechItem[] = [
  // Languages
  {
    Icon: Typescript,
    href: 'https://www.typescriptlang.org/',
    name: 'TypeScript',
  },
  {
    Icon: Javascript,
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    name: 'JavaScript',
  },

  // Frontend frameworks
  { Icon: ReactLight, href: 'https://react.dev/', name: 'React.js' },
  { Icon: NextjsIconDark, href: 'https://nextjs.org/', name: 'Next.js' },
  { Icon: Vue, href: 'https://vuejs.org/', name: 'Vue.js' },
  { Icon: Nuxt, href: 'https://nuxt.com/', name: 'Nuxt.js' },
  { Icon: Angular, href: 'https://angular.dev/', name: 'Angular' },

  // Backend
  { Icon: Nodejs, href: 'https://nodejs.org/', name: 'Node.js' },
  { Icon: Nestjs, href: 'https://nestjs.com/', name: 'NestJS' },
  { Icon: Bun, href: 'https://bun.sh/', name: 'Bun' },

  // Styling
  { Icon: Tailwindcss, href: 'https://tailwindcss.com/', name: 'Tailwind CSS' },
  { Icon: Sass, href: 'https://sass-lang.com/', name: 'SCSS' },

  // UI ecosystem
  {
    Icon: themed(ShadcnUi, ShadcnUiDark),
    href: 'https://ui.shadcn.com/',
    name: 'shadcn/ui',
  },
  {
    Icon: themed(RadixUiLight, RadixUiDark),
    href: 'https://www.radix-ui.com/',
    name: 'Radix UI',
  },
  {
    Icon: themed(BaseUi, BaseUiDark),
    href: 'https://base-ui.com/',
    name: 'Base UI',
  },
  {
    Icon: themed(Motion, MotionDark),
    href: 'https://motion.dev/',
    name: 'Motion',
  },
  { Icon: Tanstack, href: 'https://tanstack.com/', name: 'TanStack' },

  // State management
  { Icon: Redux, href: 'https://redux.js.org/', name: 'Redux' },
  { Icon: p('Zu'), href: 'https://zustand-demo.pmnd.rs/', name: 'Zustand' },
  { Icon: Pinia, href: 'https://pinia.vuejs.org/', name: 'Pinia' },
  { Icon: p('Vx'), href: 'https://vuex.vuejs.org/', name: 'Vuex' },

  // Databases
  { Icon: Postgresql, href: 'https://www.postgresql.org/', name: 'PostgreSQL' },
  { Icon: MysqlIconLight, href: 'https://www.mysql.com/', name: 'MySQL' },
  { Icon: Redis, href: 'https://redis.io/', name: 'Redis' },

  // Testing
  { Icon: Vitest, href: 'https://vitest.dev/', name: 'Vitest' },
  { Icon: Jest, href: 'https://jestjs.io/', name: 'Jest' },
  { Icon: Playwright, href: 'https://playwright.dev/', name: 'Playwright' },
  { Icon: Cypress, href: 'https://www.cypress.io/', name: 'Cypress' },

  // Tools
  { Icon: Git, href: 'https://git-scm.com/', name: 'Git' },
  { Icon: Docker, href: 'https://www.docker.com/', name: 'Docker' },

  // AI
  { Icon: ClaudeAiIcon, href: 'https://www.anthropic.com/', name: 'Claude' },
  {
    Icon: themed(Openai, OpenaiDark),
    href: 'https://openai.com/',
    name: 'ChatGPT',
  },
];
