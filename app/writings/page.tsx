import { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import WritingCard from "@/components/content/WritingCard";
import { getWritings } from "@/lib/sanity/queries";
import type { Writing } from "@/lib/types";

export const metadata: Metadata = {
  title: "Writings",
  description: "Essays on technology, philosophy, and the human condition.",
};

const fallbackWritings = [
  {
    title: "On the Tyranny of Defaults",
    slug: { current: "on-the-tyranny-of-defaults" },
    excerpt: "Most software decisions are made by people who aren't you, in contexts very different from yours. Why do we accept their defaults so readily?",
    publishedAt: "2024-11-20T00:00:00Z",
    tags: ["philosophy", "software"],
    readTime: 6,
  },
  {
    title: "The Case for Deliberate Slowness",
    slug: { current: "the-case-for-deliberate-slowness" },
    excerpt: "In an industry that fetishizes velocity, there's radical value in taking your time.",
    publishedAt: "2024-09-14T00:00:00Z",
    tags: ["engineering", "culture"],
    readTime: 8,
  },
];

export default async function WritingsPage() {
  const data = await getWritings();
  const writings = data?.length ? data : fallbackWritings;

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Writings"
        description="Essays on technology, philosophy, and the human condition."
        backHref="/beyond-code"
        backLabel="← Beyond Code"
      />
      <div className="max-w-5xl mx-auto px-10 md:px-20 pb-24">
        {writings.map((w: Writing) => (
          <WritingCard
            key={w.slug.current}
            title={w.title}
            slug={w.slug.current}
            excerpt={w.excerpt}
            publishedAt={w.publishedAt}
            tags={w.tags}
            readTime={w.readTime}
          />
        ))}
      </div>
    </div>
  );
}
