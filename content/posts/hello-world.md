---
title: "Hello world: a sample post for the pipeline"
description: "A draft that exercises every piece of the markdown pipeline: headings, lists, inline code, a highlighted code block, a table, a quote and an image."
date: 2026-11-20
tags: [performance, angular]
draft: true
---

This post is a **draft**. It only renders in development, so the article styles and the build-time
highlighter can be checked against real markup.

## Headings and lists

Each `h2` and `h3` gets an id and appears in the table of contents.

- Unordered items use muted markers.
- Inline code like `ChangeDetectionStrategy.OnPush` sits in a small chip.
- Links look like [this one to the blog index](/blog).

1. Ordered lists work too.
2. Second item.

### A smaller heading

Short paragraph under an `h3`.

## Code

```ts title="app.config.ts" {4}
import { ApplicationConfig } from "@angular/core";
import { provideClientHydration } from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration()],
};
```

## Table

| Metric | Before | After |
| ------ | ------ | ----- |
| LCP    | 0.0s   | 0.0s  |
| CLS    | 0.00   | 0.00  |

## Quote and image

> Placeholder quote. Replace with something worth quoting.

![The default Open Graph image](/og-default-light.png)
