import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const portableTextComponents: any = {
  block: {
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-base text-white/60 leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-light text-white mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl font-light text-white mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l border-white/20 pl-6 my-6 text-white/40 italic">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="text-white font-medium">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic text-white/70">{children}</em>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="bg-white/5 border border-white/10 px-1.5 py-0.5 text-sm font-mono text-white/70">{children}</code>
    ),
    link: ({ value, children }: { value?: { href: string }; children: React.ReactNode }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer"
        className="text-white underline underline-offset-2 decoration-white/30 hover:decoration-white transition-colors">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-none space-y-2 mb-5">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 mb-5 text-white/60">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="text-white/60 pl-4 relative before:absolute before:left-0 before:content-['—'] before:text-white/20">{children}</li>
    ),
  },
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => (
      <div className="my-8">
        <Image src={urlFor(value).width(900).url()} alt={value.alt || ""} width={900} height={600} className="w-full" />
        {value.caption && <p className="text-xs text-white/30 text-center mt-2">{value.caption}</p>}
      </div>
    ),
  },
};
