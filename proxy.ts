import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DISABLED_PREFIXES = ["/writings", "/photography", "/recipes", "/rants"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  for (const prefix of DISABLED_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return NextResponse.rewrite(new URL("/disabled-subroutes", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/writings",
    "/writings/:path*",
    "/photography",
    "/photography/:path*",
    "/recipes",
    "/recipes/:path*",
    "/rants",
    "/rants/:path*",
  ],
};
