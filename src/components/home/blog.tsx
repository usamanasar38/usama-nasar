import { PostCard } from "@/components/blog/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import type { PostSummary } from "@/lib/posts";

/** Latest 4 posts. Not rendered when there are none (drafts are hidden in production). */
export const BlogSection = ({ posts }: { posts: PostSummary[] }) => {
  if (posts.length === 0) {
    return null;
  }
  return (
    <section aria-labelledby="h-blog" className="mt-16 md:mt-20" id="blog">
      <SectionHeading id="h-blog" link={{ label: "All posts", to: "/blog" }}>
        Blog
      </SectionHeading>
      <div className="grid gap-x-4 gap-y-8 md:grid-cols-2">
        {posts.slice(0, 4).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};
