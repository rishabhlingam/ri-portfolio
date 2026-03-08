"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import HeadingDivider from "@/components/ui/HeadingDivider";

const skillGroups = [
  { category: "Languages", skills: ["Python", "TypeScript", "Rust", "Go", "C/C++", "SQL"] },
  { category: "Frameworks", skills: ["React", "Next.js", "FastAPI", "PyTorch", "Node.js", "Tailwind CSS"] },
  { category: "Cloud & Tools", skills: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "Git"] },
  { category: "Databases", skills: ["PostgreSQL", "Redis", "MongoDB", "Pinecone", "DynamoDB"] },
];

interface SkillsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
}

export default function Skills({ data }: SkillsProps) {
  const displayGroups = data
    ? Object.entries(
        data.reduce((acc: Record<string, string[]>, s: { category: string; name: string }) => {
          if (!acc[s.category]) acc[s.category] = [];
          acc[s.category].push(s.name);
          return acc;
        }, {})
      ).map(([category, skills]) => ({ category, skills: skills as string[] }))
    : skillGroups;

  return (
    <Section id="skills">
      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <div className="mb-12">
          <p className="text-xs text-white/55 tracking-[0.4em] uppercase mb-3">02</p>
          <h2 className="text-3xl md:text-4xl font-light text-white">Skills</h2>
        </div>
        <HeadingDivider className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {displayGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <p className="text-xs text-white/55 tracking-[0.3em] uppercase mb-4">{group.category}</p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm text-white/60 border border-white/10 hover:border-white/30 hover:text-white/80 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
