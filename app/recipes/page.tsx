import { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import RecipeCard from "@/components/content/RecipeCard";
import WorkInProgress from "@/components/ui/WorkInProgress";
import { getRecipes } from "@/lib/sanity/queries";
import type { Recipe } from "@/lib/types";

export const metadata: Metadata = { title: "Recipes" };

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Recipes"
        description="Cooking is applied chemistry. A collection of recipes I've developed and refined."
        backHref="/beyond-code"
        backLabel="← Beyond Code"
      />
      <div className="max-w-5xl mx-auto px-10 md:px-20 pb-24">
        {!recipes?.length ? (
          <WorkInProgress message="Recipes are being tested and refined. Come back hungry." />
        ) : (
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
        )}
      </div>
    </div>
  );
}
