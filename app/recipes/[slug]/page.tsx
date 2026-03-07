import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import PageHeader from "@/components/layout/PageHeader";
import Tag from "@/components/ui/Tag";
import Divider from "@/components/ui/Divider";
import { portableTextComponents } from "@/components/layout/PortableTextComponents";
// import { getRecipeBySlug } from "@/lib/sanity/queries";

interface Props {
  params: Promise<{ slug: string }>;
}

const fallbackRecipes: Record<string, {
  title: string;
  slug: string;
  description: string;
  cuisine: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  tags: string[];
  ingredients: { quantity: string; unit: string; ingredient: string; notes?: string }[];
  instructions: null;
  notes: string;
}> = {
  "miso-glazed-black-cod": {
    title: "Miso-Glazed Black Cod",
    slug: "miso-glazed-black-cod",
    description:
      "A classic Nobu-inspired preparation with a 3-day miso marinade that caramelizes into something extraordinary.",
    cuisine: "Japanese",
    difficulty: "medium",
    prepTime: 20,
    cookTime: 15,
    servings: 2,
    tags: ["seafood", "Japanese"],
    ingredients: [
      { quantity: "2", unit: "fillets", ingredient: "Black cod", notes: "Skin-on" },
      { quantity: "3", unit: "tbsp", ingredient: "White miso paste" },
      { quantity: "2", unit: "tbsp", ingredient: "Mirin" },
      { quantity: "2", unit: "tbsp", ingredient: "Sake" },
      { quantity: "1", unit: "tbsp", ingredient: "Sugar" },
    ],
    instructions: null,
    notes: "Marinate for at least 3 days for maximum flavor penetration.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: fallbackRecipes[slug]?.title || "Recipe" };
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  // const recipe = await getRecipeBySlug(slug);
  const recipe = fallbackRecipes[slug];
  if (!recipe) notFound();

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <div className="min-h-screen">
      <PageHeader title={recipe.title} backHref="/recipes" backLabel="← Recipes" />
      <div className="max-w-3xl mx-auto px-10 md:px-20 pb-24">
        {/* Meta */}
        <div className="flex flex-wrap gap-6 mb-8 text-sm text-white/40">
          {recipe.cuisine && <span>{recipe.cuisine}</span>}
          {recipe.difficulty && <span className="capitalize">{recipe.difficulty}</span>}
          {totalTime > 0 && <span>{totalTime} min total</span>}
          {recipe.servings && <span>{recipe.servings} servings</span>}
        </div>

        {recipe.tags && (
          <div className="flex flex-wrap gap-2 mb-8">
            {recipe.tags.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}
          </div>
        )}

        <p className="text-base text-white/50 leading-relaxed mb-10">{recipe.description}</p>

        <Divider className="mb-10" />

        {/* Ingredients */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-light text-white mb-6">Ingredients</h2>
            <div className="space-y-2">
              {recipe.ingredients.map(
                (
                  ing: { quantity: string; unit: string; ingredient: string; notes?: string },
                  i: number
                ) => (
                  <div key={i} className="flex items-baseline gap-3 py-2 border-b border-white/5">
                    <span className="text-sm text-white/30 w-20 shrink-0">
                      {ing.quantity} {ing.unit}
                    </span>
                    <span className="text-sm text-white/60">{ing.ingredient}</span>
                    {ing.notes && (
                      <span className="text-xs text-white/25">{ing.notes}</span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        {recipe.instructions && (
          <div className="mb-10">
            <h2 className="text-xl font-light text-white mb-6">Instructions</h2>
            <PortableText value={recipe.instructions} components={portableTextComponents} />
          </div>
        )}

        {/* Notes */}
        {recipe.notes && (
          <div className="mt-8 p-6 border border-white/10">
            <p className="text-xs text-white/30 tracking-wider uppercase mb-3">Notes</p>
            <p className="text-sm text-white/45 leading-relaxed">{recipe.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
