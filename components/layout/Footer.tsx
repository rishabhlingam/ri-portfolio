import Link from "next/link";
import Divider from "@/components/ui/Divider";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 px-10 md:px-20">
      <div className="max-w-5xl mx-auto">
        <Divider className="mb-10" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <Link href="/" className="text-white font-light tracking-[0.2em] text-sm uppercase">
              RL
            </Link>
            <p className="text-white/30 text-xs mt-2 tracking-wide">
              Rishabh Lingam · {year}
            </p>
          </div>
          <Link
            href="/beyond-code"
            className="text-xs text-white/30 hover:text-white/60 transition-colors tracking-wider uppercase"
          >
            Beyond Code →
          </Link>
        </div>
      </div>
    </footer>
  );
}
