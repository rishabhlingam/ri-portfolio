import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "ri-portfolio",
  basePath: "/studio",   // ← add this line
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "p8sc3u2y",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});