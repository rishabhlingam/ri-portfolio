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

  return (
    <div className="min-h-screen">
      <Hero profile={profile} />

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
