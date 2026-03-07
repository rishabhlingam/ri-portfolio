"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

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

export default function Hero() {
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
            Rishabh
            <br />
            <span className="text-white/40">Lingam</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-white/50 font-light mb-4 max-w-xl leading-relaxed"
          >
            Software engineer &amp; researcher exploring the intersection of systems,
            machine learning, and human-centered design.
          </motion.p>

          <motion.div variants={item} className="w-12 h-px bg-white/20 mb-8" />

          <motion.p
            variants={item}
            className="text-sm text-white/35 max-w-lg leading-relaxed mb-12"
          >
            I build things that matter — from low-level systems to intelligent
            applications. When I&apos;m not coding, I&apos;m writing, cooking,
            or photographing the world.
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
