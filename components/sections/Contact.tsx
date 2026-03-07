"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/Button";

interface ContactProps {
  email?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export default function Contact({ email, github, linkedin, twitter }: ContactProps) {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const links = [
    { label: "GitHub", href: github || "https://github.com/rishabhlingam" },
    { label: "LinkedIn", href: linkedin || "https://linkedin.com/in/rishabhlingam" },
    { label: "Twitter", href: twitter || "https://twitter.com/rishabhlingam" },
    { label: "Email", href: `mailto:${email || "hello@rishabhlingam.com"}` },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <Section id="contact">
      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <div className="mb-12">
          <p className="text-xs text-white/30 tracking-[0.4em] uppercase mb-3">07</p>
          <h2 className="text-3xl md:text-4xl font-light text-white">Get in Touch</h2>
        </div>
        <Divider className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-base text-white/50 leading-relaxed mb-8 max-w-sm">
              I&apos;m always open to interesting projects, research collaborations,
              or just a good conversation. Don&apos;t hesitate to reach out.
            </p>
            <div className="space-y-3">
              {links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 border-b border-white/5 group">
                  <span className="text-sm text-white/40 group-hover:text-white transition-colors">{link.label}</span>
                  <span className="text-white/20 group-hover:text-white/50 transition-colors text-xs">→</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center"
              >
                <p className="text-white/60 text-lg font-light mb-2">Message sent.</p>
                <p className="text-white/30 text-sm">I&apos;ll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs text-white/30 tracking-wider uppercase mb-2">Name</label>
                  <input type="text" required value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                    placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs text-white/30 tracking-wider uppercase mb-2">Email</label>
                  <input type="email" required value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                    placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-xs text-white/30 tracking-wider uppercase mb-2">Message</label>
                  <textarea required rows={5} value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20 resize-none"
                    placeholder="What's on your mind?" />
                </div>
                <Button type="submit" variant="outline" size="md" disabled={status === "sending"} className="w-full justify-center">
                  {status === "sending" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
