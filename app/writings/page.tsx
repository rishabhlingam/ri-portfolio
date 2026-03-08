import { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import WritingCard from "@/components/content/WritingCard";
import WorkInProgress from "@/components/ui/WorkInProgress";
import { getWritings } from "@/lib/sanity/queries";
import type { Writing } from "@/lib/types";

export const metadata: Metadata = {
  title: "Writings",
  description: "Essays on technology, philosophy, and the human condition.",
};

export default async function WritingsPage() {
  const writings = await getWritings();

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Writings"
        description="Essays on technology, philosophy, and the human condition."
        backHref="/beyond-code"
        backLabel="← Beyond Code"
      />
      <div className="max-w-5xl mx-auto px-10 md:px-20 pb-24">
        {!writings?.length ? (
          <WorkInProgress message="Essays are being written. Check back soon." />
        ) : (
          writings.map((w: Writing) => (
            <WritingCard
              key={w.slug.current}
              title={w.title}
              slug={w.slug.current}
              excerpt={w.excerpt}
              publishedAt={w.publishedAt}
              tags={w.tags}
              readTime={w.readTime}
            />
          ))
        )}
      </div>
    </div>
  );
}
