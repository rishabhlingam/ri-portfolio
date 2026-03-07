import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Publications from "@/components/sections/Publications";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Divider from "@/components/ui/Divider";
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

      <div className="max-w-5xl mx-auto px-10 md:px-20"><Divider /></div>
      <Skills data={skills?.length ? skills : undefined} />

      <div className="max-w-5xl mx-auto px-10 md:px-20"><Divider /></div>
      <Experience data={experience?.length ? experience : undefined} />

      <div className="max-w-5xl mx-auto px-10 md:px-20"><Divider /></div>
      <Publications data={publications?.length ? publications : undefined} />

      <div className="max-w-5xl mx-auto px-10 md:px-20"><Divider /></div>
      <Education data={education?.length ? education : undefined} />

      <div className="max-w-5xl mx-auto px-10 md:px-20"><Divider /></div>
      <Projects data={projects?.length ? projects : undefined} />

      <div className="max-w-5xl mx-auto px-10 md:px-20"><Divider /></div>
      <Contact
        email={profile?.email}
        github={profile?.github}
        linkedin={profile?.linkedin}

      />
    </div>
  );
}
