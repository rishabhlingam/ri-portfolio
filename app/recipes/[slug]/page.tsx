import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Divider from "@/components/ui/Divider";
import Tag from "@/components/ui/Tag";

interface Props { params: Promise<{ slug: string }> }

const fallbackRecipes: Record<string, { title: string; description: string; cuisine: string; difficulty: string; prepTime: number; cookTime: number; servings: number; tags: string[]; ingredients: { quantity: string; unit: string; ingredient: string; notes?: string }[]; notes: string }> = {
  "miso-glazed-black-cod": {
    title: "Miso-Glazed Black Cod", description: "A classic Nobu-inspired preparation.", cuisine: "Japanese", difficulty: "medium", prepTime: 20, cookTime: 15, servings: 2, tags: ["seafood"],
    ingredients: [{ quantity: "2", unit: "fillets", ingredient: "Black cod" }, { quantity: "3", unit: "tbsp", ingredient: "White miso paste" }, { quantity: "2", unit: "tbsp", ingredient: "Mirin" }],
    notes: "Marinate for at least 3 days for maximum flavor.",
  },
};

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = fallbackRecipes[slug];
  if (!recipe) notFound();
  const totalTime = recipe.prepTime + recipe.cookTime;
  return (
    <div className="min-h-screen">
      <PageHeader title={recipe.title} backHref="/recipes" backLabel="← Recipes" />
      <div className="max-w-3xl mx-auto px-10 md:px-20 pb-24">
        <div className="flex flex-wrap gap-6 mb-8 text-sm text-white/40">
          <span>{recipe.cuisine}</span><span className="capitalize">{recipe.difficulty}</span><span>{totalTime} min</span><span>{recipe.servings} servings</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">{recipe.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        <p className="text-base text-white/50 leading-relaxed mb-10">{recipe.description}</p>
        <Divider className="mb-10" />
        <h2 className="text-xl font-light text-white mb-6">Ingredients</h2>
        <div className="space-y-2 mb-12">
          {recipe.ingredients.map((ing, i) => (
            <div key={i} className="flex items-baseline gap-3 py-2 border-b border-white/5">
              <span className="text-sm text-white/30 w-20 shrink-0">{ing.quantity} {ing.unit}</span>
              <span className="text-sm text-white/60">{ing.ingredient}</span>
              {ing.notes && <span className="text-xs text-white/25">{ing.notes}</span>}
            </div>
          ))}
        </div>
        {recipe.notes && (
          <div className="p-6 border border-white/10">
            <p className="text-xs text-white/30 tracking-wider uppercase mb-3">Notes</p>
            <p className="text-sm text-white/45 leading-relaxed">{recipe.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
