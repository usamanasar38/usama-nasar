import type { Config } from "tailwindcss";
import TailwindAnimate from 'tailwindcss-animate';
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ...defaultTheme.fontFamily,
        sans: [
          ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
          {
            fontFeatureSettings: '"ss03", "cv02", "cv11"',
          },
        ],
      },
    },
  },
  plugins: [TailwindAnimate],
} satisfies Config;
