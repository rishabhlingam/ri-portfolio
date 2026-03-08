"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Calculates the distance from the screen edge to the inner content boundary.
 * Mirrors the layout: max-w-5xl (1024px) centred + px-10/px-20 padding.
 * Done in JS so it works identically in dev, production build, and after merges
 * (CSS custom properties with calc/max don't survive some build pipelines).
 */
function getInset(): number {
  if (typeof window === "undefined") return 80;
  const vw = window.innerWidth;
  return vw < 768
    ? 40                                    // px-10
    : Math.max(80, (vw - 1024) / 2 + 80);  // md:px-20 + auto centering margin
}

export default function SectionEndDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [inset, setInset] = useState(80);

  useEffect(() => {
    const update = () => setInset(getInset());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div ref={ref} className="relative w-full h-px">
      {/* Line draws left → right to the right screen edge */}
      <motion.div
        className="absolute top-0 right-0 h-px bg-white/35"
        style={{ left: inset, transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Circle at the left (content-boundary) end */}
      <motion.div
        className="absolute w-[7px] h-[7px] rounded-full bg-white/60"
        style={{ top: "-3px", left: inset - 3 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 }}
        transition={{ duration: 0.35, delay: isInView ? 1.0 : 0 }}
      />
    </div>
  );
}
