import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import Tag from "@/components/ui/Tag";
import { formatDate } from "@/lib/utils";
// import { getPhotoBySlug } from "@/lib/sanity/queries";
// import { urlFor } from "@/lib/sanity/client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") };
}

export default async function PhotoPage({ params }: Props) {
  const { slug } = await params;
  // const photo = await getPhotoBySlug(slug);
  // if (!photo) notFound();

  // Placeholder
  const photo = null;
  if (!photo) notFound();

  return (
    <div className="min-h-screen">
      <PageHeader
        title={(photo as { title: string }).title}
        backHref="/photography"
        backLabel="← Photography"
      />
      <div className="max-w-4xl mx-auto px-10 md:px-20 pb-24">
        <div className="mb-8">
          <Image
            src="/placeholder.jpg"
            alt={(photo as { title: string }).title}
            width={900}
            height={600}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-4 mb-4">
          {(photo as { location?: string }).location && (
            <span className="text-sm text-white/35">{(photo as { location?: string }).location}</span>
          )}
          {(photo as { dateTaken?: string }).dateTaken && (
            <span className="text-xs text-white/25">{formatDate((photo as { dateTaken?: string }).dateTaken!)}</span>
          )}
        </div>
        {(photo as { description?: string }).description && (
          <p className="text-sm text-white/40 mb-4">{(photo as { description?: string }).description}</p>
        )}
        {(photo as { tags?: string[] }).tags && (
          <div className="flex flex-wrap gap-2">
            {(photo as { tags?: string[] }).tags!.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}
          </div>
        )}
      </div>
    </div>
  );
}
