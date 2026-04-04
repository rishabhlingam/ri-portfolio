"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import HeadingDivider from "@/components/ui/HeadingDivider";

const fallbackProjects = [
  {
    title: "Distributed Vector Database",
    description: "A horizontally scalable vector database built for production ML workloads. Supports approximate nearest neighbor search with sub-10ms latency at 100M+ vectors.",
    technologies: ["Rust", "gRPC", "HNSW", "Raft consensus"],
    github: "https://github.com",
    demo: null,
    featured: true,
  },
  {
    title: "LLM Evaluation Framework",
    description: "Open-source framework for systematically evaluating large language models across safety, reasoning, and domain-specific benchmarks.",
    technologies: ["Python", "PyTorch", "FastAPI", "React"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
  },
  {
    title: "Portfolio OS",
    description: "This very website — a minimal dark portfolio with Sanity CMS, Framer Motion animations, and full Next.js App Router architecture.",
    technologies: ["Next.js", "TypeScript", "Sanity", "Framer Motion"],
    github: "https://github.com",
    demo: null,
    featured: false,
  },
  {
    title: "Real-time Collaborative Editor",
    description: "A low-latency collaborative text editor using CRDTs for conflict-free merging and WebSockets for real-time sync.",
    technologies: ["TypeScript", "Yjs", "WebSockets", "React"],
    github: "https://github.com",
    demo: null,
    featured: false,
  },
];

interface ProjectsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
}

export default function Projects({ data }: ProjectsProps) {
  const projects = data || fallbackProjects;

  return (
    <Section id="projects">
      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <div className="mb-12">
          <p className="text-xs text-white tracking-[0.4em] uppercase mb-3">06</p>
          <h2 className="text-3xl md:text-4xl font-light text-white">Projects</h2>
        </div>
        <HeadingDivider className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {projects.map((project, i) => (
            <motion.div
              key={`${project.title}-${i}`}
              className="bg-black p-8 group hover:bg-white/[0.02] transition-colors duration-300"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-base font-light text-white transition-colors">{project.title}</h3>
                {project.featured && (
                  <span className="text-xs border border-white/15 text-white px-2 py-0.5 shrink-0">Featured</span>
                )}
              </div>
              <p className="text-sm text-white leading-relaxed mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.map((tech: string) => (
                  <span key={tech} className="text-xs text-white border border-white/10 px-2 py-0.5">{tech}</span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-white transition-colors">GitHub →</a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-white transition-colors">Live Demo →</a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
