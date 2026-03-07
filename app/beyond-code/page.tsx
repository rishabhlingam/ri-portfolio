"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const sections = [
  {
    title: "Writings",
    href: "/writings",
    description: "Essays on technology, philosophy, and the human condition. Thinking in public.",
    number: "01",
  },
  {
    title: "Photography",
    href: "/photography",
    description: "Capturing fleeting moments — street photography, landscapes, and the geometry of everyday life.",
    number: "02",
  },
  {
    title: "Recipes",
    href: "/recipes",
    description: "Cooking is applied chemistry. A collection of recipes I've developed and refined.",
    number: "03",
  },
  {
    title: "Rants",
    href: "/rants",
    description: "Unfiltered thoughts on tech, society, and everything in between.",
    number: "04",
  },
];

export default function BeyondCodePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-10 md:px-20 min-h-[calc(100vh-4rem)] flex flex-col justify-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <button
            onClick={() => router.back()}
            className="text-xs text-white/25 hover:text-white/50 transition-colors tracking-wider mb-10 block"
          >
            ← Back
          </button>
          <p className="text-xs text-white/30 tracking-[0.4em] uppercase mb-4">Personal</p>
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4">Beyond Code</h1>
          <p className="text-base text-white/40 max-w-md leading-relaxed">
            Life outside the terminal. A collection of things I do, think about, and create
            when I&apos;m not building software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {sections.map((section, i) => (
            <motion.div
              key={section.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            >
              <Link
                href={section.href}
                className="group bg-black hover:bg-white/[0.025] transition-colors duration-300 p-10 flex flex-col gap-4 h-full block"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs text-white/20 tracking-[0.3em]">{section.number}</span>
                  <span className="text-white/20 group-hover:text-white/50 transition-colors text-lg">→</span>
                </div>
                <h2 className="text-2xl font-light text-white/70 group-hover:text-white transition-colors">
                  {section.title}
                </h2>
                <p className="text-sm text-white/35 leading-relaxed">{section.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
