"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface HeadingDividerProps {
  className?: string;
}

/** Mirrors the CSS --content-inset formula in JS for reliable cross-build support. */
function calcInset(): number {
  if (typeof window === "undefined") return 80; // SSR safe fallback
  const vw = window.innerWidth;
  // mobile: px-10 = 40px  |  md+: max(px-20=80, centering + px-20)
  return vw < 768 ? 40 : Math.max(80, (vw - 1024) / 2 + 80);
}

/**
 * Drop-in replacement for <Divider className="mb-12" /> inside sections.
 * Line draws right → left to the left screen edge on scroll-into-view.
 * Circle at the right (content-boundary) end.
 *
 *   screen-left ━━━━━━━━━━━━━━━━━━━━━━━━━● content-right-edge
 */
export default function HeadingDivider({ className = "" }: HeadingDividerProps) {
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
    <div
      ref={ref}
      className={`relative h-px ${className}`}
      style={{
        marginLeft: -inset,
        width: `calc(100% + ${inset}px)`,
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
