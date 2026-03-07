const skill = {
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    { name: "name", title: "Skill Name", type: "string" },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Languages", "Frameworks", "Tools", "Cloud", "Databases", "Other"],
      },
    },
    { name: "level", title: "Proficiency Level (1-5)", type: "number" },
    { name: "icon", title: "Icon (emoji or text)", type: "string" },
    { name: "order", title: "Display Order", type: "number" },
  ],
};

export default skill;
