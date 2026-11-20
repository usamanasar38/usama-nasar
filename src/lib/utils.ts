import { createCn } from "cn/config";

/** Our type-scale utilities are font sizes, so `text-caption` and `text-muted-foreground` don't cancel out. */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display", "h1", "h2", "section", "h3", "say", "lead", "body",
            "prose", "detail", "small", "label", "caption", "micro", "code",
          ],
        },
      ],
    },
  },
});
