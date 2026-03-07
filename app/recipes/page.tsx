import { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import RecipeCard from "@/components/content/RecipeCard";
// import { getRecipes } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Recipes",
  description: "A collection of recipes I've developed, from weeknight meals to ambitious projects.",
};

const fallbackRecipes = [
  {
    title: "Miso-Glazed Black Cod",
    slug: "miso-glazed-black-cod",
    description:
      "A classic Nobu-inspired preparation with a 3-day miso marinade that caramelizes into something extraordinary.",
    image: null,
    cuisine: "Japanese",
    difficulty: "medium" as const,
    prepTime: 20,
    cookTime: 15,
    tags: ["seafood", "Japanese", "umami"],
  },
  {
    title: "Brown Butter Pasta with Sage",
    slug: "brown-butter-pasta-sage",
    description:
      "Deceptively simple. The brown butter is the hero here — nutty, complex, and deeply satisfying.",
    image: null,
    cuisine: "Italian",
    difficulty: "easy" as const,
    prepTime: 10,
    cookTime: 20,
    tags: ["pasta", "vegetarian", "quick"],
  },
  {
    title: "Sourdough Focaccia",
    slug: "sourdough-focaccia",
    description:
      "Pillowy, olive-oil-drenched focaccia made with an active sourdough starter. Weekend project, weeklong reward.",
    image: null,
    cuisine: "Italian",
    difficulty: "hard" as const,
    prepTime: 60,
    cookTime: 25,
    tags: ["bread", "sourdough", "baking"],
  },
];

export default async function RecipesPage() {
  // const recipes = await getRecipes();
  const recipes = fallbackRecipes;

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Recipes"
        description="Cooking is applied chemistry. A collection of recipes I've developed and refined."
      />
      <div className="max-w-5xl mx-auto px-10 md:px-20 pb-24">
        {recipes.length === 0 ? (
          <p className="text-white/30 text-sm py-12">No recipes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.slug} {...recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
