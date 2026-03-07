"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const mainLinks = [
  { href: "/#about", label: "About", id: "about" },
  { href: "/#skills", label: "Skills", id: "skills" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/#publications", label: "Publications", id: "publications" },
  { href: "/#education", label: "Education", id: "education" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

// Hexagon SVG drawn as a border around the logo
function HexLogo() {
  return (
    <Link href="/" aria-label="Home">
      <div className="relative flex items-center justify-center w-10 h-10 group">
        {/* Hexagon border */}
        <svg
          viewBox="0 0 40 40"
          className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:rotate-[30deg]"
          style={{ transformOrigin: "center" }}
        >
          <polygon
            points="20,2 36,11 36,29 20,38 4,29 4,11"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
            className="group-hover:stroke-white/60 transition-all duration-300"
          />
        </svg>
        {/* Text absolutely centered so it always aligns with the hex center */}
        <span className="absolute inset-0 flex items-center justify-center text-white font-light tracking-[0.15em] text-xs uppercase">
          RL
        </span>
      </div>
    </Link>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight active section while scrolling
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = mainLinks.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (pathname === "/") {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveSection(id);
        }
      } else {
        // Navigate to home then let the hash scroll handle it
        e.preventDefault();
        router.push(`/#${id}`);
      }
      setMobileOpen(false);
    },
    [pathname, router]
  );

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-sm border-b border-white/5" : "bg-transparent"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <nav className="px-10 md:px-20 h-16 flex items-center justify-between">
          {/* Hex Logo */}
          <HexLogo />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-5 lg:gap-6">
              {mainLinks.map((link) => {
                const isActive = pathname === "/" && activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`text-xs tracking-wider uppercase whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                      isActive ? "text-white" : "text-white/45 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
            <div className="w-px h-4 bg-white/20" />
            <Link
              href="/beyond-code"
              className={`text-xs tracking-wider uppercase transition-colors duration-200 whitespace-nowrap ${
                pathname.startsWith("/beyond-code") ||
                pathname.startsWith("/writings") ||
                pathname.startsWith("/photography") ||
                pathname.startsWith("/recipes") ||
                pathname.startsWith("/rants")
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              Beyond Code
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-5 h-px bg-white"
              animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block w-5 h-px bg-white"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block w-5 h-px bg-white"
              animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black flex flex-col pt-20 px-8 pb-12"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className="flex flex-col gap-8 mt-8">
              <div className="flex flex-col gap-5">
                <p className="text-xs text-white/30 tracking-[0.3em] uppercase">Navigation</p>
                {mainLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className="text-2xl font-light text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </div>

              <div className="w-full h-px bg-white/10" />

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: mainLinks.length * 0.05 }}
              >
                <Link
                  href="/beyond-code"
                  className="text-2xl font-light text-white/60 hover:text-white transition-colors"
                >
                  Beyond Code
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
