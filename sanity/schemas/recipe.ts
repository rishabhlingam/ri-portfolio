const recipe = {
  name: "recipe",
  title: "Recipe",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "description", title: "Description", type: "text" },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    { name: "cuisine", title: "Cuisine", type: "string" },
    {
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: { list: ["easy", "medium", "hard"] },
    },
    { name: "prepTime", title: "Prep Time (minutes)", type: "number" },
    { name: "cookTime", title: "Cook Time (minutes)", type: "number" },
    { name: "servings", title: "Servings", type: "number" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
    {
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "quantity", title: "Quantity", type: "string" },
            { name: "unit", title: "Unit", type: "string" },
            { name: "ingredient", title: "Ingredient", type: "string" },
            { name: "notes", title: "Notes", type: "string" },
          ],
        },
      ],
    },
    {
      name: "instructions",
      title: "Instructions",
      type: "array",
      of: [{ type: "block" }],
    },
    { name: "notes", title: "Notes", type: "text" },
  ],
};

export default recipe;
