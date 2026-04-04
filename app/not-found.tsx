import Link from "next/link";
import ErrorPageFrame from "@/components/ui/ErrorPageFrame";

export default function NotFound() {
  return (
    <ErrorPageFrame
      code="404"
      title="Page not found"
      description="This page doesn't exist or isn't available."
    >
      <Link
        href="/"
        className="text-xs tracking-wider uppercase text-red-400/90 hover:text-red-300 transition-colors"
      >
        ← Back to home
      </Link>
    </ErrorPageFrame>
  );
}
