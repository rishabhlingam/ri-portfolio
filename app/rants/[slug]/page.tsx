import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import PageHeader from "@/components/layout/PageHeader";
import Tag from "@/components/ui/Tag";
import { portableTextComponents } from "@/components/layout/PortableTextComponents";
import { formatDate } from "@/lib/utils";
// import { getRantBySlug } from "@/lib/sanity/queries";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
  };
}

export default async function RantPost({ params }: Props) {
  const { slug } = await params;
  // const rant = await getRantBySlug(slug);
  // if (!rant) notFound();

  const rant = {
    title: slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    publishedAt: new Date().toISOString(),
    readTime: 5,
    tags: ["rant"],
    excerpt: "Coming soon.",
    body: null,
  };

  if (!rant) notFound();

  return (
    <div className="min-h-screen">
      <PageHeader title={rant.title} backHref="/rants" backLabel="← Rants" />
      <div className="max-w-3xl mx-auto px-10 md:px-20 pb-24">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-xs text-white/30">{formatDate(rant.publishedAt)}</span>
          {rant.readTime && (
            <span className="text-xs text-white/20">{rant.readTime} min read</span>
          )}
        </div>

        {rant.tags && rant.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {rant.tags.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}
          </div>
        )}

        <div>
          {rant.body ? (
            <PortableText value={rant.body} components={portableTextComponents} />
          ) : (
            <p className="text-white/40 text-base">{rant.excerpt}</p>
          )}
        </div>
      </div>
    </div>
  );
}
