"use client";

import { motion } from "framer-motion";

interface WorkInProgressProps {
  message?: string;
}

export default function WorkInProgress({ message }: WorkInProgressProps) {
  return (
    <div className="pt-16 pb-32 flex flex-col items-center justify-center gap-10 text-center">

      {/* Glowing triangle warning icon */}
      <motion.div
      className="relative flex items-center justify-center"
      animate={{
        opacity: [0.7, 1, 0.7],
        y: [0, -18, 0],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      >
        {/* Outer bloom — large radial glow behind the triangle */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 140,
            height: 140,
            background:
              "radial-gradient(ellipse at center, rgba(251,191,36,0.25) 0%, rgba(251,191,36,0.08) 50%, transparent 75%)",
            filter: "blur(12px)",
          }}
          animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* SVG triangle — drawn as a stroked polygon so it glows cleanly */}
        <motion.svg
          viewBox="0 0 64 58"
          width={72}
          height={66}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter:
              "drop-shadow(0 0 6px rgba(251,191,36,0.95)) drop-shadow(0 0 18px rgba(251,191,36,0.55)) drop-shadow(0 0 36px rgba(251,191,36,0.25))",
          }}
        >
          {/* Triangle outline */}
          <polygon
            points="32,4 60,54 4,54"
            stroke="rgba(251,191,36,0.9)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Exclamation stem */}
          <line
            x1="32" y1="22"
            x2="32" y2="38"
            stroke="rgba(251,191,36,0.85)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Exclamation dot */}
          <circle
            cx="32" cy="45"
            r="1.8"
            fill="rgba(251,191,36,0.85)"
          />
        </motion.svg>
      </motion.div>

      {/* IN PROGRESS label */}
      <div className="flex flex-col items-center gap-4">
        <motion.p
          className="text-sm tracking-[0.5em] uppercase font-light"
          style={{ color: "rgba(251,191,36,0.85)" }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          In Progress
        </motion.p>

        {/* Thin amber line */}
        <div
          className="h-px w-24"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(251,191,36,0.5), transparent)",
          }}
        />

        {/* Message */}
        <p className="text-white text-sm font-light leading-relaxed max-w-xs">
          {message ?? "This section is being assembled. Come back soon."}
        </p>
      </div>

    </div>
  );
}
