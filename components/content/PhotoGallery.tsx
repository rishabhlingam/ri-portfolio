"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/lib/sanity/client";
import { formatDate } from "@/lib/utils";

interface Photo {
  title: string;
  slug: { current: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  location?: string;
  dateTaken?: string;
  description?: string;
  tags?: string[];
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<Photo | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5">
        {photos.map((photo, i) => (
          <motion.button key={photo.slug.current}
            className="aspect-square bg-black overflow-hidden group cursor-pointer"
            onClick={() => setSelected(photo)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
            {photo.image ? (
              <Image src={urlFor(photo.image).width(400).height(400).url()} alt={photo.title}
                width={400} height={400}
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 group-hover:opacity-80" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/5">
                <span className="text-white text-2xl">📷</span>
              </div>
            )}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}>
            <motion.div className="max-w-4xl w-full"
              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }} transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}>
              {selected.image && (
                <div className="relative w-full max-h-[70vh] flex justify-center mb-6">
                  <Image src={urlFor(selected.image).width(1200).height(800).url()} alt={selected.title}
                    width={1200} height={800} className="max-h-[70vh] w-auto object-contain" />
                </div>
              )}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-light text-white mb-1">{selected.title}</h3>
                  <div className="flex items-center gap-3">
                    {selected.location && <span className="text-xs text-white">{selected.location}</span>}
                    {selected.dateTaken && <span className="text-xs text-white">{formatDate(selected.dateTaken)}</span>}
                  </div>
                  {selected.description && <p className="text-sm text-white mt-2 max-w-lg">{selected.description}</p>}
                </div>
                <button onClick={() => setSelected(null)} className="text-white transition-colors text-sm">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
