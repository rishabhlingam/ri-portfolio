import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Publications from "@/components/sections/Publications";
import Projects from "@/components/sections/Projects";
import Interests from "@/components/sections/Interests";
import Contact from "@/components/sections/Contact";
import Divider from "@/components/ui/Divider";

// When Sanity is configured, uncomment these and pass data as props:
// import {
//   getProfile, getSkills, getExperience, getEducation,
//   getPublications, getProjects,
// } from "@/lib/sanity/queries";

export default async function HomePage() {
  // const [profile, skills, experience, education, publications, projects] = await Promise.all([
  //   getProfile(), getSkills(), getExperience(), getEducation(), getPublications(), getProjects(),
  // ]);

  return (
    <div className="min-h-screen">
      <Hero />

      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <Divider />
      </div>

      <Skills /* data={skills} */ />

      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <Divider />
      </div>

      <Experience /* data={experience} */ />

      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <Divider />
      </div>

      <Education /* data={education} */ />

      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <Divider />
      </div>

      <Publications /* data={publications} */ />

      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <Divider />
      </div>

      <Projects /* data={projects} */ />

      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <Divider />
      </div>

      <Interests />

      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <Divider />
      </div>

      <Contact
      // email={profile?.email}
      // github={profile?.github}
      // linkedin={profile?.linkedin}
      // twitter={profile?.twitter}
      />
    </div>
  );
}
