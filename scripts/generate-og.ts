import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { Resvg } from "@resvg/resvg-js";
import { createElement } from "react";
import type { CSSProperties, ReactNode } from "react";
import satori from "satori";

import { USER } from "../src/features/portfolio/data/user.ts";

const ROOT = new URL("../", import.meta.url);
const WIDTH = 1200;
const HEIGHT = 630;
const TILE_SIZE = 112;
const SCHEME = /^https?:\/\//u;

const fromRoot = (path: string) => fileURLToPath(new URL(path, ROOT));

const neutralHex = (lightness: number) => {
  const linear = lightness ** 3;

  const srgb =
    linear <= 0.0031308 ? 12.92 * linear : 1.055 * linear ** (1 / 2.4) - 0.055;

  const channel = Math.round(Math.min(1, Math.max(0, srgb)) * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${channel.repeat(3)}`;
};

interface Theme {
  name: "light" | "dark";
  background: string;
  foreground: string;
  muted: string;
  tile: string;
}

const THEMES: Theme[] = [
  {
    background: neutralHex(1),
    foreground: neutralHex(0.145),
    muted: neutralHex(0.52),
    name: "light",
    tile: "public/brand/tile-light.svg",
  },
  {
    background: neutralHex(0.145),
    foreground: neutralHex(0.985),
    muted: neutralHex(0.708),
    name: "dark",
    tile: "public/brand/tile-dark.svg",
  },
];

const WOFF_NUM_TABLES_OFFSET = 12;
const WOFF_HEADER_SIZE = 44;
const WOFF_ENTRY_SIZE = 20;

const hideLtagTable = (font: Buffer) => {
  const tables = font.readUInt16BE(WOFF_NUM_TABLES_OFFSET);

  for (let index = 0; index < tables; index += 1) {
    const offset = WOFF_HEADER_SIZE + index * WOFF_ENTRY_SIZE;

    if (font.toString("latin1", offset, offset + 4) === "ltag") {
      font.write("zltg", offset, "latin1");
    }
  }

  return font;
};

// WARNING: satori's opentype.js throws on the `ltag` table (Commit Mono has one), so it is renamed in memory.
const readFont = async (file: string) =>
  hideLtagTable(await readFile(fromRoot(`node_modules/${file}`)));

const div = (style: CSSProperties, children: ReactNode) =>
  createElement("div", { style }, children);

const card = (theme: Theme, tileSrc: string) =>
  div(
    {
      backgroundColor: theme.background,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      height: HEIGHT,
      padding: 96,
      width: WIDTH,
    },
    [
      createElement("img", {
        height: TILE_SIZE,
        key: "tile",
        src: tileSrc,
        width: TILE_SIZE,
      }),
      createElement(
        "div",
        {
          key: "text",
          style: { display: "flex", flexDirection: "column", marginTop: "auto" },
        },
        div(
          {
            color: theme.foreground,
            fontFamily: "Host Grotesk",
            fontSize: 88,
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
          },
          USER.displayName
        ),
        div(
          {
            color: theme.muted,
            fontFamily: "Host Grotesk",
            fontSize: 38,
            fontWeight: 500,
            lineHeight: 1.2,
            marginTop: 18,
          },
          USER.jobTitle
        ),
        div(
          {
            color: theme.muted,
            fontFamily: "Commit Mono",
            fontSize: 26,
            lineHeight: 1.2,
            marginTop: 44,
          },
          USER.website.replace(SCHEME, "")
        )
      ),
    ]
  );

const [grotesk500, grotesk600, mono400] = await Promise.all([
  readFont("@fontsource/host-grotesk/files/host-grotesk-latin-500-normal.woff"),
  readFont("@fontsource/host-grotesk/files/host-grotesk-latin-600-normal.woff"),
  readFont("@fontsource/commit-mono/files/commit-mono-latin-400-normal.woff"),
]);

const FONTS = [
  { data: grotesk500, name: "Host Grotesk", style: "normal", weight: 500 },
  { data: grotesk600, name: "Host Grotesk", style: "normal", weight: 600 },
  { data: mono400, name: "Commit Mono", style: "normal", weight: 400 },
] as const;

const render = async (theme: Theme) => {
  const tile = await readFile(fromRoot(theme.tile));
  const tileSrc = `data:image/svg+xml;base64,${tile.toString("base64")}`;

  const svg = await satori(card(theme, tileSrc), {
    fonts: [...FONTS],
    height: HEIGHT,
    width: WIDTH,
  });

  const png = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } })
    .render()
    .asPng();

  const out = `public/og-default-${theme.name}.png`;

  await writeFile(fromRoot(out), png);

  return `${out} (${png.length} bytes)`;
};

const written = await Promise.all(THEMES.map(render));

process.stdout.write(`${written.join("\n")}\n`);
