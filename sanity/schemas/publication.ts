const publication = {
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "authors", title: "Authors", type: "array", of: [{ type: "string" }] },
    { name: "venue", title: "Venue/Journal/Conference", type: "string" },
    { name: "publishedDate", title: "Published Date", type: "date" },
    { name: "abstract", title: "Abstract", type: "text" },
    { name: "url", title: "Paper URL", type: "url" },
    { name: "pdf", title: "PDF File", type: "file" },
    {
      name: "type",
      title: "Publication Type",
      type: "string",
      options: {
        list: ["journal", "conference", "workshop", "preprint", "thesis"],
      },
    },
  ],
};

export default publication;
