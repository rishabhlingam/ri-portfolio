const profile = {
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "bio", title: "Bio", type: "array", of: [{ type: "block" }] },
    { name: "image", title: "Profile Image", type: "image", options: { hotspot: true } },
    { name: "email", title: "Email", type: "string" },
    { name: "github", title: "GitHub URL", type: "url" },
    { name: "linkedin", title: "LinkedIn URL", type: "url" },
    { name: "twitter", title: "Twitter URL", type: "url" },
    { name: "resume", title: "Resume PDF", type: "file" },
  ],
};

export default profile;
