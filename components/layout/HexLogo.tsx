"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/** Hexagon mark + RL — same interaction model as the nav header. */
export default function HexLogo() {
  return (
    <Link href="/" aria-label="Home">
      <motion.div
        className="relative flex items-center justify-center w-14 h-14"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <motion.div
          className="absolute pointer-events-none"
          style={{
            inset: "-20px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.20) 40%, transparent 70%)",
            filter: "blur(14px)",
          }}
          variants={{
            rest: { opacity: 0, scale: 0.7 },
            hover: { opacity: 1, scale: 1.0 },
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />

        <motion.svg
          viewBox="0 0 40 40"
          className="absolute inset-0 w-full h-full"
          style={{
            transformOrigin: "center",
            filter:
              "drop-shadow(0 0 4px rgba(255,255,255,0.55)) drop-shadow(0 0 12px rgba(255,255,255,0.22))",
          }}
          variants={{
            rest: { rotate: 0 },
            hover: { rotate: 30 },
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.polygon
            points="20,2 36,11 36,29 20,38 4,29 4,11"
            fill="none"
            strokeWidth="1"
            variants={{
              rest: { stroke: "rgba(255,255,255,0.45)" },
              hover: { stroke: "rgba(255,255,255,0.85)" },
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.svg>

        <motion.span
          className="absolute inset-0 flex items-center justify-center text-white font-light tracking-[0.15em] text-sm uppercase pl-[0.15em]"
          variants={{
            rest: {
              textShadow:
                "0 0 8px rgba(255,255,255,0.55), 0 0 20px rgba(255,255,255,0.20)",
            },
            hover: {
              textShadow:
                "0 0 8px rgba(255,255,255,0.95), 0 0 24px rgba(255,255,255,0.55)",
            },
          }}
          transition={{ duration: 0.4 }}
        >
          RL
        </motion.span>
      </motion.div>
    </Link>
  );
}
