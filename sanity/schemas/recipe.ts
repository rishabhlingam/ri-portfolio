import { defineField, defineType } from "sanity";

export default defineType({
  name: "recipe",
  title: "Recipe",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "cuisine", title: "Cuisine", type: "string" }),
    defineField({
      name: "difficulty", title: "Difficulty", type: "string",
      options: { list: ["easy", "medium", "hard"] },
    }),
    defineField({ name: "prepTime", title: "Prep Time (minutes)", type: "number" }),
    defineField({ name: "cookTime", title: "Cook Time (minutes)", type: "number" }),
    defineField({ name: "servings", title: "Servings", type: "number" }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "ingredients", title: "Ingredients", type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "quantity", title: "Quantity", type: "string" },
          { name: "unit", title: "Unit", type: "string" },
          { name: "ingredient", title: "Ingredient", type: "string" },
          { name: "notes", title: "Notes", type: "string" },
        ],
      }],
    }),
    defineField({ name: "instructions", title: "Instructions", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "notes", title: "Notes", type: "text" }),
  ],
});
