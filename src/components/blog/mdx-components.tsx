import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Children, isValidElement, useEffect, useRef, useState } from "react";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import { ImageZoom } from "@/components/kibo-ui/image-zoom";
import { EXTERNAL, NewTabNote } from "@/components/site/external-note";
import { IconSwap } from "@/components/site/icon-swap";
import { Button } from "@/components/ui/button";
import { CodeBlock, CodeBlockActions, CodeBlockHeader, CodeBlockTitle } from "@/components/ui/code-block";
import { useSounds } from "@/lib/sound";

const COPIED_MS = 1800;

/** Copies the text of the code block it sits in; the highlighted HTML stays build-time. */
const CopyCodeButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [copied, setCopied] = useState(false);
  const { play } = useSounds();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    const code = ref.current?.closest("[data-slot=code-block]")?.querySelector("pre");
    if (!code) {
      return;
    }
    navigator.clipboard
      .writeText(code.textContent)
      .then(() => {
        play("success");
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), COPIED_MS);
        return undefined;
      })
      .catch(() => undefined);
  };

  return (
    <>
      <Button aria-label={copied ? "Copied" : "Copy code"} onClick={copy} ref={ref} size="icon-xs" variant="ghost">
        <IconSwap swapKey={copied ? "check" : "copy"}>
          {copied ? <CheckIcon aria-hidden className="text-brand" /> : <CopyIcon aria-hidden />}
        </IconSwap>
      </Button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Code copied" : ""}
      </span>
    </>
  );
};

type ElementWithProps = ReactElement<Record<string, unknown> & { children?: ReactNode }>;

/**
 * rehype-pretty-code emits <figure data-rehype-pretty-code-figure> with an optional
 * <figcaption data-rehype-pretty-code-title> and the highlighted <pre>. Wrap it in the
 * shadcn CodeBlock shell for the header, file name and copy button.
 */
const Figure = ({ children, ...props }: ComponentProps<"figure">) => {
  if (!("data-rehype-pretty-code-figure" in props)) {
    return <figure {...props}>{children}</figure>;
  }
  const parts = Children.toArray(children).filter(isValidElement) as ElementWithProps[];
  const caption = parts.find((part) => "data-rehype-pretty-code-title" in part.props);
  const pre = parts.find((part) => part.type === "pre");
  const language = typeof pre?.props["data-language"] === "string" ? pre.props["data-language"] : undefined;

  return (
    <CodeBlock size="sm">
      <CodeBlockHeader className="border-b px-3 py-2 group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:pt-2">
        <CodeBlockTitle>{caption?.props.children ?? language ?? "code"}</CodeBlockTitle>
        <CodeBlockActions>
          <CopyCodeButton />
        </CodeBlockActions>
      </CodeBlockHeader>
      {pre}
    </CodeBlock>
  );
};

const Anchor = ({ href = "", children, ...props }: ComponentProps<"a">) => {
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} {...props} {...EXTERNAL}>
      {children}
      <NewTabNote />
    </a>
  );
};

const Image = ({ alt = "", width, height, ...props }: ComponentProps<"img">) => (
  <ImageZoom>
    <img
      alt={alt}
      className="rounded-xl border"
      decoding="async"
      height={height}
      loading="lazy"
      width={width}
      {...props}
    />
  </ImageZoom>
);

const Table = (props: ComponentProps<"table">) => (
  <div className="table-wrap">
    <table {...props} />
  </div>
);

/** Markdown wraps a lone image in <p>; ImageZoom renders block elements, so drop the <p>. */
const Paragraph = ({ children, ...props }: ComponentProps<"p">) => {
  const parts = Children.toArray(children).filter(
    (part) => !(typeof part === "string" && part.trim() === "")
  );
  const [only] = parts;
  if (parts.length === 1 && isValidElement(only) && only.type === Image) {
    return <div className="flex flex-col">{children}</div>;
  }
  return <p {...props}>{children}</p>;
};

export const mdxComponents = { a: Anchor, figure: Figure, img: Image, p: Paragraph, table: Table };
