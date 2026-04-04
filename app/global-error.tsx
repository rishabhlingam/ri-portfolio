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
      <body className="bg-black antialiased text-white">
        <ErrorPageFrame
          standalone
          code="Error"
          title="Something went wrong"
          description="A critical error occurred. Please reload the page."
        >
          <button
            type="button"
            onClick={reset}
            className="text-xs tracking-wider uppercase px-5 py-2.5 rounded border border-white/35 text-white hover:bg-white/10 hover:border-white/50 transition-colors"
          >
            Try again
          </button>
        </ErrorPageFrame>
      </body>
    </html>
  );
}
