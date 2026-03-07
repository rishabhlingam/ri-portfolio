import { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import RantCard from "@/components/content/RantCard";

export const metadata: Metadata = { title: "Rants" };

const fallbackRants = [
  { title: "Stop Calling It AI", slug: "stop-calling-it-ai", excerpt: "It's statistics. Very impressive, useful, and occasionally magical statistics — but let's not confuse the map for the territory.", publishedAt: "2024-12-01T00:00:00Z", tags: ["AI", "nomenclature"], readTime: 4 },
  { title: "The Resume-Driven Development Problem", slug: "resume-driven-development", excerpt: "We're building infrastructure to put on resumes, not to solve problems. A rant about our industry's collective delusion.", publishedAt: "2024-10-11T00:00:00Z", tags: ["culture", "engineering"], readTime: 5 },
];

export default async function RantsPage() {
  const rants = fallbackRants;
  return (
    <div className="min-h-screen">
      <PageHeader title="Rants" description="Unfiltered thoughts on tech, society, and everything in between."
        backHref="/beyond-code" backLabel="← Beyond Code" />
      <div className="max-w-5xl mx-auto px-10 md:px-20 pb-24">
        {rants.map((r) => <RantCard key={r.slug} {...r} />)}
      </div>
    </div>
  );
}
