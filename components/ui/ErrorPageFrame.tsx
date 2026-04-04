"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const FLOAT = {
  duration: 2.2,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

/** Solid white fill for readability; red aura stays in `textShadow` only. */
const glowCode = {
  color: "#ffffff",
  textShadow:
    "0 0 12px rgba(248,113,113,0.85), 0 0 28px rgba(220,38,38,0.55), 0 0 48px rgba(185,28,28,0.35)",
};

const glowTitle = {
  color: "#ffffff",
  textShadow:
    "0 0 14px rgba(248,113,113,0.65), 0 0 32px rgba(220,38,38,0.4), 0 0 52px rgba(185,28,28,0.22)",
};

const glowBody = {
  color: "#ffffff",
  textShadow:
    "0 0 10px rgba(248,113,113,0.55), 0 0 22px rgba(220,38,38,0.35), 0 0 36px rgba(185,28,28,0.2)",
};

/** Prohibited / “no entry” mark — ring + diagonal bar, red traffic-sign style. */
function ProhibitedMark() {
  return (
    <div className="relative mb-8 flex items-center justify-center" aria-hidden>
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 160,
          height: 160,
          background:
            "radial-gradient(ellipse at center, rgba(220,38,38,0.35) 0%, rgba(185,28,28,0.12) 50%, transparent 72%)",
          filter: "blur(14px)",
        }}
        animate={{ scale: [0.88, 1.08, 0.88], opacity: [0.5, 0.95, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.svg
        viewBox="0 0 100 100"
        width={88}
        height={88}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-[1]"
        style={{
          filter:
            "drop-shadow(0 0 6px rgba(220,38,38,0.95)) drop-shadow(0 0 16px rgba(185,28,28,0.6)) drop-shadow(0 0 32px rgba(127,29,29,0.35))",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="38"
          stroke="rgb(185, 28, 28)"
          strokeWidth="9"
        />
        <line
          x1="24"
          y1="24"
          x2="76"
          y2="76"
          stroke="rgb(185, 28, 28)"
          strokeWidth="9"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}

export interface ErrorPageFrameProps {
  code: string;
  title: string;
  description: string;
  /** When true, page is not wrapped by root layout (e.g. `global-error`). */
  standalone?: boolean;
  children?: ReactNode;
}

export default function ErrorPageFrame({
  code,
  title,
  description,
  standalone = false,
  children,
}: ErrorPageFrameProps) {
  const shell = standalone
    ? "relative min-h-screen px-10 flex flex-col items-center justify-center text-center overflow-hidden py-16"
    : "relative min-h-screen pt-32 pb-24 px-10 flex flex-col items-center justify-center text-center overflow-hidden";

  return (
    <div className={shell}>
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div
          className="h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full opacity-45 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(248,113,113,0.24) 0%, rgba(185,28,28,0.09) 45%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-[1] flex flex-col items-center max-w-2xl">
        <motion.div
          className="flex justify-center w-full"
          animate={{ y: [0, -16, 0] }}
          transition={FLOAT}
        >
          <ProhibitedMark />
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-5 px-2">
          <span
            className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.22em] uppercase shrink-0 leading-none"
            style={glowCode}
          >
            {code}
          </span>
          <span
            className="text-2xl sm:text-3xl md:text-4xl font-light leading-none"
            style={glowTitle}
          >
            {title}
          </span>
        </div>

        <p className="text-sm max-w-md leading-relaxed font-light px-2" style={glowBody}>
          {description}
        </p>
      </div>

      <div className="relative z-[1] mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        {children}
      </div>
    </div>
  );
}
