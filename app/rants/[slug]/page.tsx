import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import PageHeader from "@/components/layout/PageHeader";
import Tag from "@/components/ui/Tag";
import { portableTextComponents } from "@/components/layout/PortableTextComponents";
import { formatDate } from "@/lib/utils";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") };
}

const fallbackRants: Record<string, { title: string; publishedAt: string; readTime: number; tags: string[]; excerpt: string; body: null }> = {
  "stop-calling-it-ai": { title: "Stop Calling It AI", publishedAt: "2024-12-01T00:00:00Z", readTime: 4, tags: ["AI"], excerpt: "It's statistics. Very impressive, useful, and occasionally magical statistics.", body: null },
  "resume-driven-development": { title: "Resume-Driven Development", publishedAt: "2024-10-11T00:00:00Z", readTime: 5, tags: ["culture"], excerpt: "We're building infrastructure to put on resumes, not to solve problems.", body: null },
};

export default async function RantPost({ params }: Props) {
  const { slug } = await params;
  const rant = fallbackRants[slug];
  if (!rant) notFound();
  return (
    <div className="min-h-screen">
      <PageHeader title={rant.title} backHref="/rants" backLabel="← Rants" />
      <div className="max-w-3xl mx-auto px-10 md:px-20 pb-24">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-xs text-white/30">{formatDate(rant.publishedAt)}</span>
          {rant.readTime && <span className="text-xs text-white/20">{rant.readTime} min read</span>}
        </div>
        {rant.tags && <div className="flex flex-wrap gap-2 mb-10">{rant.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>}
        {rant.body ? <PortableText value={rant.body} components={portableTextComponents} /> : <p className="text-white/40">{rant.excerpt}</p>}
      </div>
    </div>
  );
}
