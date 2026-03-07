"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/layout/Section";
import Divider from "@/components/ui/Divider";

const interests = [
  {
    title: "Writings",
    description:
      "Essays on technology, philosophy, and the human condition. Thinking in public.",
    href: "/writings",
    label: "Read →",
  },
  {
    title: "Photography",
    description:
      "Capturing fleeting moments — street photography, landscapes, and the geometry of everyday life.",
    href: "/photography",
    label: "View →",
  },
  {
    title: "Recipes",
    description:
      "Cooking is applied chemistry. A collection of recipes I've developed, from weeknight meals to ambitious projects.",
    href: "/recipes",
    label: "Cook →",
  },
  {
    title: "Rants",
    description:
      "Unfiltered thoughts on the state of tech, society, and everything in between.",
    href: "/rants",
    label: "Read →",
  },
];

export default function Interests() {
  return (
    <Section id="interests">
      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <div className="mb-12">
          <p className="text-xs text-white/30 tracking-[0.4em] uppercase mb-3">07</p>
          <h2 className="text-3xl md:text-4xl font-light text-white">Beyond Code</h2>
        </div>

        <Divider className="mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
          {interests.map((interest, i) => (
            <motion.div
              key={interest.title}
              className="bg-black p-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={interest.href} className="group block">
                <h3 className="text-xl font-light text-white/70 group-hover:text-white transition-colors mb-3">
                  {interest.title}
                </h3>
                <p className="text-sm text-white/35 leading-relaxed mb-5">
                  {interest.description}
                </p>
                <span className="text-xs text-white/25 group-hover:text-white/50 transition-colors">
                  {interest.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
