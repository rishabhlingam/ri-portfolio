import { defineField, defineType } from "sanity";

export default defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "text" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "github", title: "GitHub URL", type: "url" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "twitter", title: "Twitter URL", type: "url" }),
    defineField({ name: "resume", title: "Resume URL", type: "url" }),
  ],
});
