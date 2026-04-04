import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import PageHeader from "@/components/layout/PageHeader";
import Divider from "@/components/ui/Divider";
import Tag from "@/components/ui/Tag";
import { portableTextComponents } from "@/components/layout/PortableTextComponents";
import { getRecipeBySlug } from "@/lib/sanity/queries";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  return { title: recipe?.title ?? slug };
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) notFound();

  const totalTime = (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0);

  return (
    <div className="min-h-screen">
      <PageHeader title={recipe.title} backHref="/recipes" backLabel="← Recipes" />
      <div className="max-w-3xl mx-auto px-10 md:px-20 pb-24">
        <div className="flex flex-wrap gap-6 mb-8 text-sm text-white">
          {recipe.cuisine && <span>{recipe.cuisine}</span>}
          {recipe.difficulty && <span className="capitalize">{recipe.difficulty}</span>}
          {totalTime > 0 && <span>{totalTime} min</span>}
          {recipe.servings && <span>{recipe.servings} servings</span>}
        </div>

        {recipe.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {recipe.tags.map((t: string) => <Tag key={t}>{t}</Tag>)}
          </div>
        )}

        {recipe.description && (
          <p className="text-base text-white leading-relaxed mb-10">{recipe.description}</p>
        )}

        <Divider className="mb-10" />

        {recipe.ingredients?.length > 0 && (
          <>
            <h2 className="text-xl font-light text-white mb-6">Ingredients</h2>
            <div className="space-y-2 mb-12">
              {recipe.ingredients.map(
                (ing: { quantity: string; unit: string; ingredient: string; notes?: string }, i: number) => (
                  <div key={i} className="flex items-baseline gap-3 py-2 border-b border-white/5">
                    <span className="text-sm text-white w-20 shrink-0">
                      {ing.quantity} {ing.unit}
                    </span>
                    <span className="text-sm text-white">{ing.ingredient}</span>
                    {ing.notes && <span className="text-xs text-white">{ing.notes}</span>}
                  </div>
                )
              )}
            </div>
          </>
        )}

        {recipe.instructions && (
          <>
            <h2 className="text-xl font-light text-white mb-6">Instructions</h2>
            <div className="mb-12">
              <PortableText value={recipe.instructions} components={portableTextComponents} />
            </div>
          </>
        )}

        {recipe.notes && (
          <div className="p-6 border border-white/10">
            <p className="text-xs text-white tracking-wider uppercase mb-3">Notes</p>
            <p className="text-sm text-white leading-relaxed">{recipe.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
