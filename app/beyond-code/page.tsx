"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import WorkInProgress from "@/components/ui/WorkInProgress";

export default function BeyondCodePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-10 md:px-20 min-h-[calc(100vh-4rem)] flex flex-col justify-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="text-xs text-white transition-colors tracking-wider mb-10 block"
          >
            ← Back
          </button>
          <p className="text-xs text-white tracking-[0.4em] uppercase mb-4">Personal</p>
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4">Beyond Code</h1>
          <p className="text-base text-white max-w-md leading-relaxed">
            Life outside the terminal. Things I do/think/create when I&apos;m not building software.
          </p>
        </motion.div>

        <WorkInProgress />
      </div>
    </div>
  );
}
