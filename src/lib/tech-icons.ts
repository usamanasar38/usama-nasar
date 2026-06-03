interface TechIconEntry {
  icon: string | null;
  label: string;
}

const svglMap: Record<string, string | null> = {
  Angular: 'angular',
  'CI/CD': null,
  CSS: 'css3',
  Cypress: 'cypress',
  Git: 'git',
  HTML: 'html5',
  // handled specially
  'HTML & CSS': null,
  Javascript: 'javascript',
  Jest: 'jest',
  Laravel: 'laravel',
  'Micro-frontend': null,
  MongoDB: 'mongodb',
  MySQL: 'mysql',
  NestJS: 'nestjs',
  'Next.js': 'nextjs',
  NgRx: 'ngrx',
  'Node.js': 'nodejs',
  'Nuxt.js': 'nuxtjs',
  PHP: 'php',
  Pinia: 'pinia',
  Playwright: 'playwright',
  PostgreSQL: 'postgresql',
  'React.js': 'react',
  Redux: 'redux',
  SCSS: 'sass',
  TailwindCSS: 'tailwindcss',
  Typescript: 'typescript',
  Vitest: 'vitest',
  'Vue.js': 'vue',
  Vuex: 'vuex',
  Zustand: 'zustand',
};

function resolveIcon(name: string): string | null {
  const mapped = svglMap[name];
  if (mapped === null || mapped === undefined) {
    return null;
  }
  return `https://svgl.app/library/${mapped}.svg`;
}

export function getTechIcons(name: string): TechIconEntry[] {
  if (name === 'HTML & CSS') {
    return [
      { icon: resolveIcon('HTML'), label: 'HTML' },
      { icon: resolveIcon('CSS'), label: 'CSS' },
    ];
  }

  const icon = resolveIcon(name);
  return [{ icon, label: name }];
}
