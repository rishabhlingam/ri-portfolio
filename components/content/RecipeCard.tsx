import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import Tag from "@/components/ui/Tag";

interface RecipeCardProps {
  title: string;
  slug: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  cuisine?: string;
  difficulty?: string;
  prepTime?: number;
  cookTime?: number;
  tags?: string[];
}

export default function RecipeCard({ title, slug, description, image, cuisine, difficulty, prepTime, cookTime, tags }: RecipeCardProps) {
  const totalTime = (prepTime || 0) + (cookTime || 0);
  return (
    <Link href={`/recipes/${slug}`} className="group block">
      <div className="aspect-[4/3] bg-white/5 overflow-hidden mb-4">
        {image ? (
          <Image src={urlFor(image).width(400).height(300).url()} alt={title} width={400} height={300}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/10 text-4xl">🍳</span>
          </div>
        )}
      </div>
      <h2 className="text-base font-light text-white/70 group-hover:text-white transition-colors mb-2">{title}</h2>
      <div className="flex items-center gap-3 mb-2">
        {cuisine && <span className="text-xs text-white/55">{cuisine}</span>}
        {difficulty && <span className="text-xs text-white/72 capitalize">{difficulty}</span>}
        {totalTime > 0 && <span className="text-xs text-white/65">{totalTime} min</span>}
      </div>
      {description && <p className="text-sm text-white/55 leading-relaxed mb-3 line-clamp-2">{description}</p>}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      )}
    </Link>
  );
}
