import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";

/** Block dangerous URL schemes in CMS-authored links. */
function safePortableHref(href: string | undefined): string {
  if (!href || typeof href !== "string") return "#";
  const t = href.trim();
  const lower = t.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:")
  ) {
    return "#";
  }
  return t;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const portableTextComponents: any = {
  block: {
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-base text-white leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-light text-white mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl font-light text-white mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l border-white/20 pl-6 my-6 text-white italic">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="text-white font-medium">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic text-white">{children}</em>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="bg-white/5 border border-white/10 px-1.5 py-0.5 text-sm font-mono text-white">{children}</code>
    ),
    link: ({ value, children }: { value?: { href: string }; children: React.ReactNode }) => {
      const href = safePortableHref(value?.href);
      const external = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-white underline underline-offset-2 decoration-white/30 hover:decoration-white transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-none space-y-2 mb-5">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 mb-5 text-white">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="text-white pl-4 relative before:absolute before:left-0 before:content-['—'] before:text-white">{children}</li>
    ),
  },
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => (
      <div className="my-8">
        <Image src={urlFor(value).width(900).url()} alt={value.alt || ""} width={900} height={600} className="w-full" />
        {value.caption && <p className="text-xs text-white text-center mt-2">{value.caption}</p>}
      </div>
    ),
  },
};
