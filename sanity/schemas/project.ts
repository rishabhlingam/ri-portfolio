const project = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }] },
    { name: "github", title: "GitHub URL", type: "url" },
    { name: "demo", title: "Demo URL", type: "url" },
    { name: "image", title: "Project Image", type: "image", options: { hotspot: true } },
    { name: "featured", title: "Featured Project", type: "boolean" },
    { name: "order", title: "Display Order", type: "number" },
  ],
};

export default project;
