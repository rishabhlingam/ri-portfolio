"use client";

import { useEffect } from "react";
import ErrorPageFrame from "@/components/ui/ErrorPageFrame";

// Do not import `./globals.css` here — it is already loaded by `app/layout.tsx`.
// A second import breaks Turbopack (runtime: "No link element found for chunk … globals…css").
// After a normal load, Tailwind utilities from that sheet still apply to this tree.

export default function GlobalError({
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
    <html lang="en">
      <body className="bg-black antialiased text-red-100">
        <ErrorPageFrame
          standalone
          code="Error"
          title="Something went wrong"
          description="A critical error occurred. Please reload the page."
        >
          <button
            type="button"
            onClick={reset}
            className="text-xs tracking-wider uppercase px-5 py-2.5 rounded border border-red-500/40 text-red-300/90 hover:bg-red-950/40 hover:border-red-400/50 transition-colors"
          >
            Try again
          </button>
        </ErrorPageFrame>
      </body>
    </html>
  );
}
