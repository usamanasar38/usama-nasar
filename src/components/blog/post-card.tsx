import { Link } from "@tanstack/react-router";

import { coverUrl } from "@/lib/covers";
import { formatPostDate } from "@/lib/dates";
import type { PostSummary } from "@/lib/posts";
import { useSounds } from "@/lib/sound";

type PostCardProps = {
  post: PostSummary;
  /** h3 under the home "Blog" heading, h2 on /blog. */
  as?: "h2" | "h3";
  /** Eager + high fetch priority: only the first card on /blog. */
  priority?: boolean;
};

/** The whole card is one link to the post; the title is its accessible name. */
export const PostCard = ({ post, as: Heading = "h3", priority = false }: PostCardProps) => {
  const { hoverProps } = useSounds();
  const cover = coverUrl(post.cover);
  return (
    <Link
      className="group flex flex-col gap-3 rounded-xl"
      params={{ slug: post.slug }}
      to="/blog/$slug"
      {...hoverProps}
    >
      <div className="aspect-[1200/630] overflow-hidden rounded-xl border bg-muted">
        {cover ? (
          <img
            alt=""
            className="size-full object-cover transition-transform duration-500 ease-out-quint group-hover:scale-[1.02] motion-reduce:transition-none"
            decoding="async"
            fetchPriority={priority ? "high" : undefined}
            height={630}
            loading={priority ? "eager" : "lazy"}
            src={cover}
            width={1200}
          />
        ) : (
          <div className="grid size-full place-items-center p-6 text-center font-mono text-muted-foreground text-small">
            {post.title}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Heading className="text-h3 decoration-foreground/0 underline-offset-4 transition-[text-decoration-color] duration-150 group-hover:underline group-hover:decoration-foreground/40">
          {post.title}
        </Heading>
        <p className="font-mono text-caption text-muted-foreground">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingTime} min read
          {post.draft ? " · draft" : ""}
        </p>
      </div>
    </Link>
  );
};
