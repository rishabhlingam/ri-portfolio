"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import Divider from "@/components/ui/Divider";
import { formatYear } from "@/lib/utils";

const fallbackPublications = [
  {
    title: "Efficient Attention Mechanisms for Long-Range Dependencies in Transformers",
    authors: ["R. Lingam", "J. Smith", "A. Kumar"],
    venue: "NeurIPS 2023",
    publishedDate: "2023-12-01",
    abstract: "We propose a novel sparse attention mechanism that reduces complexity from O(n²) to O(n log n) while maintaining model expressivity.",
    url: "#",
    type: "conference",
  },
  {
    title: "Towards Reliable ML Systems: A Study of Failure Modes in Production",
    authors: ["R. Lingam", "M. Johnson"],
    venue: "ICML Workshop 2022",
    publishedDate: "2022-07-01",
    abstract: "An empirical study of failure modes in production machine learning systems, with recommendations for building more reliable ML pipelines.",
    url: "#",
    type: "workshop",
  },
];

interface PublicationsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
}

export default function Publications({ data }: PublicationsProps) {
  const publications = data || fallbackPublications;
  if (publications.length === 0) return null;

  return (
    <Section id="publications">
      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <div className="mb-12">
          <p className="text-xs text-white/30 tracking-[0.4em] uppercase mb-3">04</p>
          <h2 className="text-3xl md:text-4xl font-light text-white">Publications</h2>
        </div>
        <Divider className="mb-12" />
        <div>
          {publications.map((pub, i) => (
            <motion.div
              key={`${pub.title}-${i}`}
              className="py-10 border-b border-white/5 last:border-0 group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs border border-white/15 text-white/30 px-2 py-0.5 uppercase tracking-wider">{pub.type}</span>
                    <span className="text-xs text-white/25">{pub.venue} · {formatYear(pub.publishedDate)}</span>
                  </div>
                  <h3 className="text-base font-light text-white/80 group-hover:text-white transition-colors mb-2 leading-snug">{pub.title}</h3>
                  <p className="text-xs text-white/35 mb-3">{pub.authors.join(", ")}</p>
                  {pub.abstract && (
                    <p className="text-sm text-white/35 leading-relaxed max-w-2xl">{pub.abstract}</p>
                  )}
                </div>
                {pub.url && pub.url !== "#" && (
                  <a href={pub.url} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-white/25 hover:text-white/60 transition-colors border border-white/10 hover:border-white/30 px-3 py-1.5 shrink-0">
                    Read →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
