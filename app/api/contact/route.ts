import { NextResponse } from "next/server";

// In-memory rate limiting map: ip -> timestamp array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(req: Request) {
  try {
    // 1. IP rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    const now = Date.now();
    const timestamps = (rateLimitMap.get(ip) || []).filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );

    if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, message, botField } = body;

    // 2. Honeypot check for bots
    if (botField && typeof botField === "string" && botField.trim().length > 0) {
      // Silently accept bot submission without sending email
      return NextResponse.json({ success: true });
    }

    // 3. Validate input field types and length limits
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { error: "Please provide a valid name (2 to 100 characters)." },
        { status: 400 }
      );
    }

    if (
      !email ||
      typeof email !== "string" ||
      email.length > 120 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "Please provide a valid email address (max 120 characters)." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5 || message.trim().length > 4000) {
      return NextResponse.json(
        { error: "Please provide a message between 5 and 4000 characters." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // Record submission for rate limiting
    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);

    const resendApiKey = process.env.RESEND_API_KEY;

    // If Resend API Key is configured, attempt sending email directly
    if (resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["nomanpatel07059@gmail.com"],
            subject: `New Portfolio Message from ${cleanName}`,
            reply_to: cleanEmail,
            text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
          }),
        });

        if (res.ok) {
          return NextResponse.json({ success: true, method: "resend" });
        }
      } catch (err) {
        console.warn("Resend API failed, falling back to mailto", err);
      }
    }

    // Fallback: return success with mailto link for client
    const mailtoSubject = encodeURIComponent(`Portfolio Inquiry from ${cleanName}`);
    const mailtoBody = encodeURIComponent(`Hi Noman,\n\n${cleanMessage}\n\nBest regards,\n${cleanName}\n${cleanEmail}`);
    const mailto = `mailto:nomanpatel07059@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    return NextResponse.json({
      success: true,
      method: "fallback",
      mailto,
      message: "Message prepared! If Resend is unconfigured, we will open your mail client.",
    });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}
