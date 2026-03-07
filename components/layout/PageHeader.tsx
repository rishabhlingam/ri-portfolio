"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Divider from "@/components/ui/Divider";

interface PageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}

export default function PageHeader({
  title,
  description,
  backHref = "/",
  backLabel = "← Home",
}: PageHeaderProps) {
  return (
    <div className="pt-28 pb-12 px-10 md:px-20 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href={backHref}
          className="text-xs text-white/25 hover:text-white/50 transition-colors tracking-wider mb-8 block"
        >
          {backLabel}
        </Link>
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4">{title}</h1>
        {description && (
          <p className="text-base text-white/40 max-w-xl leading-relaxed">{description}</p>
        )}
      </motion.div>
      <Divider className="mt-10" />
    </div>
  );
}
