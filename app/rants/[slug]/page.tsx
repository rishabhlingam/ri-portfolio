import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import PageHeader from "@/components/layout/PageHeader";
import Tag from "@/components/ui/Tag";
import { portableTextComponents } from "@/components/layout/PortableTextComponents";
import { formatDate } from "@/lib/utils";
import { getRantBySlug } from "@/lib/sanity/queries";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rant = await getRantBySlug(slug);
  return { title: rant?.title ?? slug };
}

export default async function RantPost({ params }: Props) {
  const { slug } = await params;
  const rant = await getRantBySlug(slug);
  if (!rant) notFound();

  return (
    <div className="min-h-screen">
      <PageHeader title={rant.title} backHref="/rants" backLabel="← Rants" />
      <div className="max-w-3xl mx-auto px-10 md:px-20 pb-24">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-xs text-white">{formatDate(rant.publishedAt)}</span>
          {rant.readTime && (
            <span className="text-xs text-white">{rant.readTime} min read</span>
          )}
        </div>
        {rant.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {rant.tags.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}
          </div>
        )}
        {rant.body ? (
          <PortableText value={rant.body} components={portableTextComponents} />
        ) : (
          <p className="text-white">{rant.excerpt}</p>
        )}
      </div>
    </div>
  );
}
