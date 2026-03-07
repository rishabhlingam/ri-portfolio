const education = {
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    { name: "institution", title: "Institution", type: "string" },
    { name: "degree", title: "Degree", type: "string" },
    { name: "field", title: "Field of Study", type: "string" },
    { name: "graduationDate", title: "Graduation Date", type: "date" },
    { name: "gpa", title: "GPA", type: "string" },
    { name: "description", title: "Description", type: "array", of: [{ type: "block" }] },
    { name: "institutionUrl", title: "Institution URL", type: "url" },
  ],
};

export default education;
