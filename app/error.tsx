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
        className="text-xs tracking-wider uppercase px-5 py-2.5 rounded border border-red-500/40 text-red-300/90 hover:bg-red-950/40 hover:border-red-400/50 transition-colors"
      >
        Try again
      </button>
      <Link
        href="/"
        className="text-xs tracking-wider uppercase text-red-400/90 hover:text-red-300 transition-colors"
      >
        ← Back to home
      </Link>
    </ErrorPageFrame>
  );
}
