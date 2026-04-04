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
        className="text-xs tracking-wider uppercase text-white hover:opacity-90 transition-opacity"
      >
        ← Back to home
      </Link>
    </ErrorPageFrame>
  );
}
