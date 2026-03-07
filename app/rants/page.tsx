import { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import RantCard from "@/components/content/RantCard";
// import { getRants } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Rants",
  description: "Unfiltered thoughts on tech, society, and everything in between.",
};

const fallbackRants = [
  {
    title: "LLMs Won't Replace Programmers — But They Will Replace Bad Programmers",
    slug: "llms-and-programmers",
    excerpt:
      "The discourse around AI replacing software engineers is mostly noise. Here's my honest take on what changes and what doesn't.",
    publishedAt: "2024-12-01T00:00:00Z",
    tags: ["AI", "engineering", "careers"],
    readTime: 7,
  },
  {
    title: "The Enshittification of Developer Tools",
    slug: "enshittification-of-dev-tools",
    excerpt:
      "Something has gone wrong with how we build software for developers. A rant about bloat, complexity, and the golden age we squandered.",
    publishedAt: "2024-10-15T00:00:00Z",
    tags: ["tools", "industry", "rant"],
    readTime: 9,
  },
  {
    title: "Complexity Is Not a Virtue",
    slug: "complexity-is-not-a-virtue",
    excerpt:
      "The best engineers I know write boring code. Why does our industry celebrate complexity when simplicity is the hard achievement?",
    publishedAt: "2024-08-22T00:00:00Z",
    tags: ["simplicity", "engineering culture"],
    readTime: 5,
  },
];

export default async function RantsPage() {
  // const rants = await getRants();
  const rants = fallbackRants;

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Rants"
        description="Unfiltered thoughts on tech, society, and everything in between. Opinions are my own."
      />
      <div className="max-w-5xl mx-auto px-10 md:px-20 pb-24">
        {rants.length === 0 ? (
          <p className="text-white/30 text-sm py-12">No rants yet.</p>
        ) : (
          rants.map((rant) => <RantCard key={rant.slug} {...rant} />)
        )}
      </div>
    </div>
  );
}
