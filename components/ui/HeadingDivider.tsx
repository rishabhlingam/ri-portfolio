"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface HeadingDividerProps {
  className?: string;
}

/**
 * Drop-in replacement for <Divider className="mb-12" /> inside sections.
 * Stays inside the existing max-w-5xl padding container — no restructuring needed.
 *
 * Uses a negative left margin to break out of the container padding and
 * reach the left screen edge. Draws right → left on scroll-into-view.
 * Small hollow circle appears at the left screen edge after the line finishes.
 *
 *   screen-left (0px) ●━━━━━━━━━━━━━━━━━━━━━━━━━ content-right-edge
 */
export default function HeadingDivider({ className = "" }: HeadingDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  // once:true → only draws once; no margin so it triggers as soon as the element enters view
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={`relative h-px ${className}`}
      style={{
        // Pull the element left by the full content-inset so its left edge = screen left
        marginLeft: "calc(-1 * var(--content-inset))",
        // Widen to compensate so the right edge stays at the content right edge
        width: "calc(100% + var(--content-inset))",
      }}
    >
      {/* Line — draws right → left */}
      <motion.div
        className="absolute inset-0 bg-white/35"
        style={{ transformOrigin: "right" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Circle at the right (content) end */}
      <motion.div
        className="absolute right-0 w-[7px] h-[7px] rounded-full bg-white/60"
        style={{ top: "-3px" }}
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
