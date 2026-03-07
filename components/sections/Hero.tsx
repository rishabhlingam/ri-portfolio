"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface Profile {
  name?: string;
  tagline?: string;
  bio?: string;
}

interface HeroProps {
  profile?: Profile;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// Split "First Last" into two lines; fallback to defaults
function splitName(name?: string): [string, string] {
  if (!name) return ["Rishabh", "Lingam"];
  const parts = name.trim().split(" ");
  if (parts.length === 1) return [parts[0], ""];
  const last = parts.pop()!;
  return [parts.join(" "), last];
}

export default function Hero({ profile }: HeroProps) {
  const [firstName, lastName] = splitName(profile?.name);
  const tagline =
    profile?.tagline ??
    "Software engineer & researcher exploring the intersection of systems, machine learning, and human-centered design.";
  const bio =
    profile?.bio ??
    "I build things that matter — from low-level systems to intelligent applications. When I'm not coding, I'm writing, cooking, or photographing the world.";

  return (
    <section id="about" className="min-h-screen relative pt-16">
      <div className="max-w-5xl mx-auto px-10 md:px-20 min-h-[calc(100vh-4rem)] flex items-center pt-10 pb-24">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl w-full">
          <motion.p
            variants={item}
            className="text-xs text-white/40 tracking-[0.4em] uppercase mb-8"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] mb-6"
          >
            {firstName}
            {lastName && (
              <>
                <br />
                <span className="text-white/40">{lastName}</span>
              </>
            )}
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-white/50 font-light mb-4 max-w-xl leading-relaxed"
          >
            {tagline}
          </motion.p>

          <motion.div variants={item} className="w-12 h-px bg-white/20 mb-8" />

          <motion.p
            variants={item}
            className="text-sm text-white/35 max-w-lg leading-relaxed mb-12"
          >
            {bio}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <Button href="/#projects" variant="outline" size="md">
              View Work
            </Button>
            <Button href="/#contact" variant="outline" size="md">
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
