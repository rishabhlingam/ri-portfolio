import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "github", title: "GitHub URL", type: "url" }),
    defineField({ name: "demo", title: "Live Demo URL", type: "url" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", title: "Featured", type: "boolean" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
});
