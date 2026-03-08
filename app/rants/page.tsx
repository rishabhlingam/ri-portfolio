import { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import RantCard from "@/components/content/RantCard";
import WorkInProgress from "@/components/ui/WorkInProgress";
import { getRants } from "@/lib/sanity/queries";
import type { Rant } from "@/lib/types";

export const metadata: Metadata = { title: "Rants" };

export default async function RantsPage() {
  const rants = await getRants();

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Rants"
        description="Unfiltered thoughts on tech, society, and everything in between."
        backHref="/beyond-code"
        backLabel="← Beyond Code"
      />
      <div className="max-w-5xl mx-auto px-10 md:px-20 pb-24">
        {!rants?.length ? (
          <WorkInProgress message="Opinions are brewing. Come back for the unfiltered takes." />
        ) : (
          rants.map((r: Rant) => (
            <RantCard
              key={r.slug.current}
              title={r.title}
              slug={r.slug.current}
              excerpt={r.excerpt}
              publishedAt={r.publishedAt}
              tags={r.tags}
              readTime={r.readTime}
            />
          ))
        )}
      </div>
    </div>
  );
}
