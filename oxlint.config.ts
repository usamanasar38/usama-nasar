import { defineConfig } from 'oxlint';
import core from 'ultracite/oxlint/core';
import react from 'ultracite/oxlint/react';
import tanstack from 'ultracite/oxlint/tanstack';
import vitest from 'ultracite/oxlint/vitest';

export default defineConfig({
  extends: [core, react, tanstack, vitest],
  ignorePatterns: core.ignorePatterns,
  rules: {
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'no-inline-comments': ['allow'],
    'no-plusplus': ['allow'],
    'no-use-before-define': [
      'error',
      {
        classes: true,
        functions: false,
        variables: true,
      },
    ],
  },
});
