import { defineField, defineType } from "sanity";

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({
      name: "category", title: "Category", type: "string",
      options: { list: ["Languages", "Frameworks", "Cloud & Tools", "Databases", "Other"] },
    }),
    defineField({ name: "level", title: "Level (1–5)", type: "number" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
});
