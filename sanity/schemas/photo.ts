const photo = {
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "image", title: "Photo", type: "image", options: { hotspot: true } },
    { name: "location", title: "Location", type: "string" },
    { name: "dateTaken", title: "Date Taken", type: "date" },
    { name: "description", title: "Description", type: "text" },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
  ],
};

export default photo;
