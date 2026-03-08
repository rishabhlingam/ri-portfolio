"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Replaces the <div className="max-w-5xl..."><Divider /></div> blocks
 * between sections in page.tsx.  Must NOT be wrapped in a max-width container.
 *
 * Line starts at the content left edge (--content-inset) and draws
 * left → right to the screen edge.  Small hollow circle at the right end.
 *
 *   content-left-edge ━━━━━━━━━━━━━━━━━━━━━━━━━● screen-right (100vw)
 */
export default function SectionEndDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative w-full h-px">
      {/* Line — draws left → right */}
      <motion.div
        className="absolute top-0 right-0 h-px bg-white/35"
        style={{
          left: "var(--content-inset)",
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Circle at the left (content) end — where the line begins */}
      <motion.div
        className="absolute w-[7px] h-[7px] rounded-full bg-white/60"
        style={{ top: "-3px", left: "calc(var(--content-inset) - 3px)" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0,
        }}
        transition={{ duration: 0.35, delay: isInView ? 1.0 : 0 }}
      />
    </div>
  );
}
