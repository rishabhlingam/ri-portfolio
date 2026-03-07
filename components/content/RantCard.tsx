import Link from "next/link";
import { formatDate } from "@/lib/utils";
import Tag from "@/components/ui/Tag";

interface RantCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  tags?: string[];
  readTime?: number;
}

export default function RantCard({ title, slug, excerpt, publishedAt, tags, readTime }: RantCardProps) {
  return (
    <Link href={`/rants/${slug}`} className="group block py-8 border-b border-white/5">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs text-white/25">{formatDate(publishedAt)}</span>
        {readTime && <span className="text-xs text-white/20">{readTime} min read</span>}
      </div>
      <h2 className="text-lg font-light text-white/70 group-hover:text-white transition-colors mb-2 leading-snug">{title}</h2>
      {excerpt && <p className="text-sm text-white/35 leading-relaxed mb-4 max-w-2xl">{excerpt}</p>}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      )}
    </Link>
  );
}
