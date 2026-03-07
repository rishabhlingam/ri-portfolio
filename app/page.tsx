import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Publications from "@/components/sections/Publications";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Divider from "@/components/ui/Divider";

export default async function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />

      <div className="max-w-5xl mx-auto px-10 md:px-20"><Divider /></div>
      <Skills />

      <div className="max-w-5xl mx-auto px-10 md:px-20"><Divider /></div>
      <Experience />

      <div className="max-w-5xl mx-auto px-10 md:px-20"><Divider /></div>
      <Publications />

      <div className="max-w-5xl mx-auto px-10 md:px-20"><Divider /></div>
      <Education />

      <div className="max-w-5xl mx-auto px-10 md:px-20"><Divider /></div>
      <Projects />

      <div className="max-w-5xl mx-auto px-10 md:px-20"><Divider /></div>
      <Contact />
    </div>
  );
}
