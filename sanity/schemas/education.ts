import { defineField, defineType } from "sanity";

export default defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({ name: "institution", title: "Institution", type: "string" }),
    defineField({ name: "degree", title: "Degree (e.g. B.S., M.S., Ph.D.)", type: "string" }),
    defineField({ name: "field", title: "Field of Study", type: "string" }),
    defineField({ name: "graduationDate", title: "Graduation Date", type: "date" }),
    defineField({ name: "gpa", title: "GPA (optional)", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
});
