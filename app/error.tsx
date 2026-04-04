"use client";

import Link from "next/link";
import { useEffect } from "react";
import ErrorPageFrame from "@/components/ui/ErrorPageFrame";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPageFrame
      code="Error"
      title="Something went wrong"
      description="An unexpected error occurred. You can try again or return home."
    >
      <button
        type="button"
        onClick={reset}
        className="text-xs tracking-wider uppercase px-5 py-2.5 rounded border border-white/35 text-white hover:bg-white/10 hover:border-white/50 transition-colors"
      >
        Try again
      </button>
      <Link
        href="/"
        className="text-xs tracking-wider uppercase text-white hover:opacity-90 transition-opacity"
      >
        ← Back to home
      </Link>
    </ErrorPageFrame>
  );
}
