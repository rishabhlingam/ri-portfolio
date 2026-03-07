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

export default async function WritingPost({ params }: Props) {
  const { slug } = await params;
  const writing = { title: slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "), publishedAt: new Date().toISOString(), readTime: 5, tags: ["essay"], excerpt: "Coming soon.", body: null };
  if (!writing) notFound();
  return (
    <div className="min-h-screen">
      <PageHeader title={writing.title} backHref="/writings" backLabel="← Writings" />
      <div className="max-w-3xl mx-auto px-10 md:px-20 pb-24">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-xs text-white/30">{formatDate(writing.publishedAt)}</span>
          {writing.readTime && <span className="text-xs text-white/20">{writing.readTime} min read</span>}
        </div>
        {writing.tags && <div className="flex flex-wrap gap-2 mb-10">{writing.tags.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}</div>}
        {writing.body ? <PortableText value={writing.body} components={portableTextComponents} /> : <p className="text-white/40">{writing.excerpt}</p>}
      </div>
    </div>
  );
}
