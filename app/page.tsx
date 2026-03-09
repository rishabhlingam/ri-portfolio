import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Publications from "@/components/sections/Publications";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import SectionEndDivider from "@/components/ui/SectionEndDivider";
import {
  getProfile,
  getSkills,
  getExperience,
  getEducation,
  getPublications,
  getProjects,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";

export default async function HomePage() {
  const [profile, skills, experience, education, publications, projects] =
    await Promise.all([
      getProfile(),
      getSkills(),
      getExperience(),
      getEducation(),
      getPublications(),
      getProjects(),
    ]);

  // Resolve Sanity image and proxy through Next.js image optimization
  // so the canvas can read pixel data without CORS issues
  const rawImageUrl = profile?.image
    ? urlFor(profile.image).width(1200).quality(90).url()
    : undefined;
  const profileImageUrl = rawImageUrl
    ? `/_next/image?url=${encodeURIComponent(rawImageUrl)}&w=1200&q=90`
    : undefined;

  return (
    <div className="min-h-screen">
      <Hero profile={profile} imageUrl={profileImageUrl} />

      <SectionEndDivider />
      <Skills data={skills?.length ? skills : undefined} />

      <SectionEndDivider />
      <Experience data={experience?.length ? experience : undefined} />

      <SectionEndDivider />
      <Publications data={publications?.length ? publications : undefined} />

      <SectionEndDivider />
      <Education data={education?.length ? education : undefined} />

      <SectionEndDivider />
      <Projects data={projects?.length ? projects : undefined} />

      <SectionEndDivider />
      <Contact
        email={profile?.email}
        github={profile?.github}
        linkedin={profile?.linkedin}
      />
    </div>
  );
}
