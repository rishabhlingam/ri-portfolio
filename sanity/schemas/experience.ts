const experience = {
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    { name: "company", title: "Company", type: "string" },
    { name: "role", title: "Role/Title", type: "string" },
    { name: "startDate", title: "Start Date", type: "date" },
    { name: "endDate", title: "End Date", type: "date" },
    { name: "current", title: "Current Position", type: "boolean" },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    { name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }] },
    { name: "companyUrl", title: "Company URL", type: "url" },
  ],
};

export default experience;
