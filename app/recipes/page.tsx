import { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import RecipeCard from "@/components/content/RecipeCard";
import { getRecipes } from "@/lib/sanity/queries";
import type { Recipe } from "@/lib/types";

export const metadata: Metadata = { title: "Recipes" };

const fallbackRecipes = [
  {
    title: "Miso-Glazed Black Cod",
    slug: { current: "miso-glazed-black-cod" },
    description: "A classic Nobu-inspired preparation with a 3-day miso marinade.",
    image: null,
    cuisine: "Japanese",
    difficulty: "medium",
    prepTime: 20,
    cookTime: 15,
    tags: ["seafood", "Japanese"],
  },
  {
    title: "Brown Butter Pasta with Sage",
    slug: { current: "brown-butter-pasta-sage" },
    description: "Deceptively simple. The brown butter is the hero — nutty, complex, deeply satisfying.",
    image: null,
    cuisine: "Italian",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 20,
    tags: ["pasta", "vegetarian"],
  },
];

export default async function RecipesPage() {
  const data = await getRecipes();
  const recipes = data?.length ? data : fallbackRecipes;

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Recipes"
        description="Cooking is applied chemistry. A collection of recipes I've developed and refined."
        backHref="/beyond-code"
        backLabel="← Beyond Code"
      />
      <div className="max-w-5xl mx-auto px-10 md:px-20 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {recipes.map((r: Recipe) => (
            <RecipeCard
              key={r.slug.current}
              title={r.title}
              slug={r.slug.current}
              description={r.description}
              image={r.image}
              cuisine={r.cuisine}
              difficulty={r.difficulty}
              prepTime={r.prepTime}
              cookTime={r.cookTime}
              tags={r.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
