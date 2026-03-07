import { defineField, defineType } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "startDate", title: "Start Date", type: "date" }),
    defineField({ name: "endDate", title: "End Date", type: "date" }),
    defineField({ name: "current", title: "Current Role", type: "boolean" }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }] }),
  ],
});
