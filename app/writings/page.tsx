import { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import WritingCard from "@/components/content/WritingCard";
// import { getWritings } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Writings",
  description: "Essays on technology, philosophy, and the human condition.",
};

// Fallback data for when Sanity is not yet configured
const fallbackWritings = [
  {
    title: "On the Tyranny of Defaults",
    slug: "on-the-tyranny-of-defaults",
    excerpt:
      "Most software decisions are made by people who aren't you, in contexts very different from yours. Why do we accept their defaults so readily?",
    publishedAt: "2024-11-20T00:00:00Z",
    tags: ["philosophy", "software"],
    readTime: 6,
  },
  {
    title: "The Case for Deliberate Slowness",
    slug: "the-case-for-deliberate-slowness",
    excerpt:
      "In an industry that fetishizes velocity, there's radical value in taking your time. Some reflections on pacing, quality, and the lost art of thinking before typing.",
    publishedAt: "2024-09-14T00:00:00Z",
    tags: ["engineering", "culture"],
    readTime: 8,
  },
  {
    title: "Type Systems as Philosophy",
    slug: "type-systems-as-philosophy",
    excerpt:
      "The type system you choose reflects deep assumptions about knowledge, certainty, and the nature of software. A exploration of what static vs dynamic typing reveals.",
    publishedAt: "2024-07-02T00:00:00Z",
    tags: ["programming languages", "philosophy"],
    readTime: 12,
  },
];

export default async function WritingsPage() {
  // const writings = await getWritings();
  const writings = fallbackWritings;

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Writings"
        description="Essays on technology, philosophy, and the human condition. Thinking in public."
      />
      <div className="max-w-5xl mx-auto px-10 md:px-20 pb-24">
        {writings.length === 0 ? (
          <p className="text-white/30 text-sm py-12">No writings yet. Check back soon.</p>
        ) : (
          writings.map((writing) => (
            <WritingCard key={writing.slug} {...writing} />
          ))
        )}
      </div>
    </div>
  );
}
