import type { OpenSourceContribution } from "@/features/portfolio/types/open-source"

export const OPEN_SOURCE: OpenSourceContribution[] = [
  {
    id: "continue-dev",
    project: "Continue.dev",
    title: "Open-source AI code assistant",
    repo: "https://github.com/continuedev/continue",
    contributionsUrl:
      "https://github.com/continuedev/continue/pulls?q=is%3Apr+author%3Ausamanasar38",
    highlight: "25K+ GitHub stars",
    description:
      "Contributed to Continue.dev, a widely used open-source AI code assistant that integrates with VS Code and JetBrains to help developers write better code faster.",
    image: "/media/continue-dev.png",
    skills: ["TypeScript", "VS Code Extension", "AI"],
  },
]
