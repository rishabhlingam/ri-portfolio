import { NextResponse } from "next/server";
import { Resend } from "resend";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// In-memory rate limiter — 3 requests per IP per 60-second window.
// Resets on redeploy (fine for a portfolio; use Redis for anything heavier).
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// Periodically purge stale entries so the map doesn't grow forever
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, RATE_LIMIT_WINDOW_MS);

// ---------------------------------------------------------------------------
// Input constraints
// ---------------------------------------------------------------------------
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 320; // RFC 5321 max
const MAX_MESSAGE_LENGTH = 5000;

function sanitize(str: unknown, maxLen: number): string | null {
  if (typeof str !== "string") return null;
  const trimmed = str.trim();
  if (trimmed.length === 0 || trimmed.length > maxLen) return null;
  return trimmed;
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(req: Request) {
  try {
    // --- Rate limiting ---
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // --- API key check ---
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 }
      );
    }

    // --- Parse & validate body ---
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { name: rawName, email: rawEmail, message: rawMessage } =
      body as Record<string, unknown>;

    const name = sanitize(rawName, MAX_NAME_LENGTH);
    const email = sanitize(rawEmail, MAX_EMAIL_LENGTH);
    const message = sanitize(rawMessage, MAX_MESSAGE_LENGTH);

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error: `Invalid input. Name max ${MAX_NAME_LENGTH} chars, email max ${MAX_EMAIL_LENGTH} chars, message max ${MAX_MESSAGE_LENGTH} chars.`,
        },
        { status: 400 }
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // --- Send email ---
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `New message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
