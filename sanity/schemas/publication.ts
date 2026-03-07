import { defineField, defineType } from "sanity";

export default defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "authors", title: "Authors", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "venue", title: "Venue / Journal", type: "string" }),
    defineField({ name: "publishedDate", title: "Published Date", type: "date" }),
    defineField({ name: "abstract", title: "Abstract", type: "text" }),
    defineField({ name: "url", title: "URL", type: "url" }),
    defineField({ name: "pdf", title: "PDF URL", type: "url" }),
    defineField({
      name: "type", title: "Type", type: "string",
      options: { list: ["conference", "journal", "workshop", "preprint"] },
    }),
  ],
});
