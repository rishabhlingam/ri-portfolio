"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import Divider from "@/components/ui/Divider";
import { formatMonthYear } from "@/lib/utils";

const fallbackExperience = [
  {
    company: "Acme Corp",
    role: "Senior Software Engineer",
    startDate: "2022-06-01",
    endDate: null,
    current: true,
    description: [
      "Led development of distributed data pipelines processing 10M+ events/day",
      "Architected ML inference infrastructure reducing latency by 40%",
      "Mentored 3 junior engineers and drove adoption of TypeScript across the team",
    ],
    technologies: ["Python", "Kubernetes", "PyTorch", "Kafka"],
  },
  {
    company: "Startup XYZ",
    role: "Software Engineer",
    startDate: "2020-08-01",
    endDate: "2022-05-31",
    current: false,
    description: [
      "Built real-time recommendation engine serving 500K+ users",
      "Reduced cloud infrastructure costs by 30% through optimization",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
  },
];

interface ExperienceProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
}

export default function Experience({ data }: ExperienceProps) {
  const experiences = data || fallbackExperience;

  return (
    <Section id="experience">
      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <div className="mb-12">
          <p className="text-xs text-white/30 tracking-[0.4em] uppercase mb-3">03</p>
          <h2 className="text-3xl md:text-4xl font-light text-white">Experience</h2>
        </div>
        <Divider className="mb-12" />
        <div>
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${i}`}
              className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-12 py-10 border-b border-white/5 last:border-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div>
                <p className="text-xs text-white/30 tracking-wide">
                  {formatMonthYear(exp.startDate)} —{" "}
                  {exp.current ? <span className="text-white/50">Present</span> : formatMonthYear(exp.endDate)}
                </p>
              </div>
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-light text-white">{exp.role}</h3>
                    <p className="text-sm text-white/40 mt-0.5">{exp.company}</p>
                  </div>
                  {exp.current && (
                    <span className="mt-1 px-2 py-0.5 text-xs border border-white/20 text-white/40 shrink-0">Current</span>
                  )}
                </div>
                <ul className="space-y-2 mb-4">
                  {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((desc: string, j: number) => (
                    <li key={j} className="text-sm text-white/50 pl-4 relative">
                      <span className="absolute left-0 text-white/20">—</span>
                      {desc}
                    </li>
                  ))}
                </ul>
                {exp.technologies && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((tech: string) => (
                      <span key={tech} className="text-xs text-white/30 border border-white/10 px-2 py-0.5">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
