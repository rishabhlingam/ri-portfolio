import Link from "next/link";
import Divider from "@/components/ui/Divider";

const personalLinks = [
  { href: "/writings", label: "Writings" },
  { href: "/photography", label: "Photography" },
  { href: "/recipes", label: "Recipes" },
  { href: "/rants", label: "Rants" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 px-10 md:px-20">
      <div className="max-w-6xl mx-auto">
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

          <div className="flex flex-wrap gap-6">
            {personalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/30 hover:text-white/60 transition-colors tracking-wider uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
