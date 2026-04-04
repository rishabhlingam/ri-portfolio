"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import HexLogo from "@/components/layout/HexLogo";

const mainLinks = [
  { href: "/#about", label: "About", id: "about" },
  { href: "/#skills", label: "Skills", id: "skills" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/#publications", label: "Publications", id: "publications" },
  { href: "/#education", label: "Education", id: "education" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

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
    queueMicrotask(() => setMobileOpen(false));
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
          scrolled ? "bg-black/20 backdrop-blur-md border-b border-white/8" : "bg-transparent"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <nav className="px-10 md:px-20 h-20 pt-2 flex items-center justify-between">
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
                    className={`nav-link-border text-xs tracking-wider uppercase whitespace-nowrap transition-colors duration-200 cursor-pointer text-white ${
                      isActive ? "font-medium" : ""
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
              className={`nav-beyond-code text-xs tracking-wider uppercase whitespace-nowrap text-white ${
                pathname.startsWith("/beyond-code") ? "font-medium" : ""
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
                <p className="text-xs text-white tracking-[0.3em] uppercase">Navigation</p>
                {mainLinks.map((link, i) => {
                  const isActive = pathname === "/" && activeSection === link.id;
                  return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className={`text-2xl text-white transition-colors cursor-pointer ${
                        isActive ? "font-medium" : "font-light"
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                  );
                })}
              </div>

              <div className="w-full h-px bg-white/10" />

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: mainLinks.length * 0.05 }}
              >
                <Link
                  href="/beyond-code"
                  className={`text-2xl text-white transition-colors ${
                    pathname.startsWith("/beyond-code") ? "font-medium" : "font-light"
                  }`}
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
