import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-10 flex flex-col items-center justify-center text-center">
      <p className="text-xs text-white/30 tracking-[0.4em] uppercase mb-4">404</p>
      <h1 className="text-3xl md:text-4xl font-light text-white mb-4">Page not found</h1>
      <p className="text-white/45 text-sm max-w-md mb-10">
        This page doesn&apos;t exist or isn&apos;t available.
      </p>
      <Link
        href="/"
        className="text-xs tracking-wider uppercase text-white/50 hover:text-white transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  );
}
