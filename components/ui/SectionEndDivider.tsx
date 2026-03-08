"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/** Mirrors the CSS --content-inset formula in JS for reliable cross-build support. */
function calcInset(): number {
  if (typeof window === "undefined") return 80; // SSR safe fallback
  const vw = window.innerWidth;
  // mobile: px-10 = 40px  |  md+: max(px-20=80, centering + px-20)
  return vw < 768 ? 40 : Math.max(80, (vw - 1024) / 2 + 80);
}

/**
 * Replaces the <div className="max-w-5xl..."><Divider /></div> blocks in page.tsx.
 * Must NOT be wrapped in a max-width container.
 * Line draws left → right from the content edge to the right screen edge on scroll-into-view.
 * Circle at the left (content-boundary) end.
 *
 *   content-left-edge ●━━━━━━━━━━━━━━━━━━━━━━━━━ screen-right
 */
export default function SectionEndDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [inset, setInset] = useState(80);

  useEffect(() => {
    const update = () => setInset(calcInset());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div ref={ref} className="relative w-full h-px">
      {/* Line — draws left → right */}
      <motion.div
        className="absolute top-0 right-0 h-px bg-white/35"
        style={{ left: inset, transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Circle at the left (content) end */}
      <motion.div
        className="absolute w-[7px] h-[7px] rounded-full bg-white/60"
        style={{ top: "-3px", left: inset - 3 }}
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
