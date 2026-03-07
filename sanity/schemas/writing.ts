const writing = {
  name: "writing",
  title: "Writing",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "excerpt", title: "Excerpt", type: "text" },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
    { name: "readTime", title: "Read Time (minutes)", type: "number" },
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image" }] },
  ],
};

export default writing;
