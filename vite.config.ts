import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import contentCollections from "@content-collections/vite";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { FontaineTransform } from "fontaine";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import type { Plugin } from "vite";

const root = import.meta.dirname;
const publicDir = join(root, "public");

/** Recursively lists files under public/ as site paths ("/images/avatar.webp"). */
const listPublicFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);

    if (statSync(path).isDirectory()) {
      return listPublicFiles(path);
    }

    return [`/${relative(publicDir, path).split("\\").join("/")}`];
  });

/**
 * `virtual:public-files`: the list of files in public/ at build time, so components can
 * render an <img> only when its file exists (avatar, project screenshots) and fall back to
 * a server-rendered placeholder otherwise, instead of shipping a broken image.
 */
const publicFiles = (): Plugin => {
  const id = "virtual:public-files";
  const resolved = `\0${id}`;

  return {
    load(loadId) {
      if (loadId === resolved) {
        return `export default new Set(${JSON.stringify(listPublicFiles(publicDir))});`;
      }
    },
    name: "un:public-files",
    resolveId(source) {
      if (source === id) {
        return resolved;
      }
    },
  };
};

const PHOSPHOR_DEFS = /@phosphor-icons\/react\/dist\/defs\/[^/]+\.es\.js$/u;
const PHOSPHOR_WEIGHT = /\n {2}\[\n {4}"(?<weight>bold|duotone|fill|light|regular|thin)",/gu;

/** Icons drawn in a weight other than regular. Each keeps only that weight. */
const PHOSPHOR_WEIGHT_OVERRIDES: Record<string, string> = {
  /** The footer's "made with love" heart, filled red. */
  Heart: "fill",
};

/**
 * The design uses Phosphor's regular weight only (02-foundations.md#icons), but every icon
 * module ships all six weights. Keep just "regular" (or the override above) so each icon
 * costs one path, not six.
 */
const phosphorRegularOnly = (): Plugin => ({
  enforce: "pre",
  name: "un:phosphor-regular-only",
  transform(code, id) {
    if (!PHOSPHOR_DEFS.test(id.split("?")[0] ?? "")) {
      return null;
    }
    const name = /(?<name>[^/]+)\.es\.js/u.exec(id)?.groups?.name ?? "";
    const keep = PHOSPHOR_WEIGHT_OVERRIDES[name] ?? "regular";
    const entries = [...code.matchAll(PHOSPHOR_WEIGHT)];
    const first = entries[0];
    const regularIndex = entries.findIndex((entry) => entry.groups?.weight === keep);
    const regular = entries[regularIndex];
    const end = code.lastIndexOf("\n]);");
    if (!(first && regular) || end === -1) {
      return null;
    }
    const next = entries[regularIndex + 1];
    const body = code.slice(regular.index, next ? next.index : end).replace(/,\s*$/u, "");
    return { code: code.slice(0, first.index) + body + code.slice(end), map: null };
  },
});

const config = defineConfig({
  plugins: [
    devtools(),
    phosphorRegularOnly(),
    publicFiles(),
    contentCollections(),
    nitro(),
    // Metric-matched fallbacks so the swap from system font to Host Grotesk / Commit Mono
    // doesn't shift layout.
    FontaineTransform.vite({
      fallbacks: {
        "Commit Mono": ["Menlo", "Consolas", "Courier New"],
        "Host Grotesk Variable": ["Arial", "Helvetica Neue", "Segoe UI"],
      },
      resolvePath: (id) =>
        id.startsWith("/node_modules/")
          ? new URL(`.${id}`, `file://${root}/`)
          : new URL(`./public${id}`, `file://${root}/`),
    }),
    tailwindcss(),
    tanstackStart({
      // Every page and feed is static HTML/text at build time; /vcard stays a function so it
      // keeps its download headers.
      prerender: {
        crawlLinks: true,
        enabled: true,
        failOnError: true,
        filter: ({ path }) => path !== "/vcard" && !path.includes("#"),
      },
      pages: [
        "/robots.txt",
        "/llms-full.txt",
        "/about.md",
        "/experience.md",
        "/projects.md",
        "/education.md",
        "/recognition.md",
      ].map((path) => ({ path })),
    }),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  build: { sourcemap: process.env.ANALYZE === "1" },
  resolve: { tsconfigPaths: true },
});

export default config;
