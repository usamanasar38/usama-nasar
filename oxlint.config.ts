import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";
import tanstack from "ultracite/oxlint/tanstack";
import vitest from "ultracite/oxlint/vitest";
import { jsPluginSettings, selectJsPlugins } from "ultracite/oxlint/js-plugins";
import tanstackJsPlugins from "ultracite/oxlint/tanstack/js-plugins";
import shadcn from "ultracite/oxlint/shadcn";
import landmines from "ultracite/oxlint/landmines";
import antiSlop from "ultracite/oxlint/anti-slop";

const jsPlugins = selectJsPlugins(["react-doctor"]);

export default defineConfig({
  env: core.env,
  extends: [
    core,
    react,
    tanstack,
    vitest,
    jsPlugins,
    tanstackJsPlugins,
    shadcn,
    landmines,
    antiSlop,
  ],
  ignorePatterns: [
    ...core.ignorePatterns,
    // Vendored registry code (shadcn, Kibo UI, soundcn): re-installs overwrite it.
    ".agents/**",
    "src/components/ui/**",
    "src/components/kibo-ui/**",
    "src/hooks/use-sound.ts",
    "src/lib/sound-engine.ts",
    "src/lib/sound-types.ts",
    "src/lib/sounds/**",
    "src/routeTree.gen.ts",
  ],
  jsPlugins: [
    ...jsPlugins.jsPlugins,
    ...shadcn.jsPlugins,
    ...landmines.jsPlugins,
  ],
  options: { typeAware: true },
  settings: jsPluginSettings,
});
