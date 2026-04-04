"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import HeadingDivider from "@/components/ui/HeadingDivider";
import WorkInProgress from "@/components/ui/WorkInProgress";

export default function Interests() {
  return (
    <Section id="interests">
      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <div className="mb-12">
          <p className="text-xs text-white tracking-[0.4em] uppercase mb-3">07</p>
          <h2 className="text-3xl md:text-4xl font-light text-white">Beyond Code</h2>
          <p className="text-base text-white max-w-md leading-relaxed mt-4">
            Life outside the terminal. Things I do/think/create when I&apos;m not building software.
          </p>
        </div>

        <HeadingDivider className="mb-12" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <WorkInProgress />
        </motion.div>
      </div>
    </Section>
  );
}
