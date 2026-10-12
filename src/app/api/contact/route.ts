import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { renderConfirmationEmail, renderContactEmail } from "@/lib/contact-email";
import { generalData } from "@/lib/generalData";
import { CONTACT_LIMITS, CONTACT_TYPES, validateContact, type ContactField, type ContactType } from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_CHARS = 10_000;

// Best effort: counts live in this server instance's memory and reset on restart.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;
const hits = new Map<string, number[]>();

function json(status: number, body: Record<string, unknown>, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

/** Only this site's own pages may post here. */
function isSameOrigin(req: NextRequest): boolean {
  const site = req.headers.get("sec-fetch-site");
  if (site) return site === "same-origin";
  // Older browsers without Fetch Metadata: fall back to the Origin host.
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === req.nextUrl.host;
  } catch {
    return false;
  }
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => t > now - RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

/** One line of text: no control characters, so nothing can break out of the subject line. */
const line = (v: unknown) => (typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, "").trim() : "");
/** Multi-line text: keeps line breaks and tabs, drops every other control character. */
const text = (v: unknown) =>
  typeof v === "string" ? v.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim() : "";

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return json(403, { error: "forbidden" });

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("Contact form: GMAIL_USER or GMAIL_APP_PASSWORD is not set");
    return json(500, { error: "not_configured" });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_CHARS) return json(413, { error: "too_large" });
  let data: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") throw new Error("not an object");
    data = parsed as Record<string, unknown>;
  } catch {
    return json(400, { error: "bad_request" });
  }

  // Honeypot: bots fill it, people never see it. Pretend it worked.
  if (line(data.website)) return json(201, { status: "received" });

  const values = {
    name: line(data.name),
    email: line(data.email),
    company: line(data.company),
    message: text(data.message),
    type: (CONTACT_TYPES.includes(data.type as ContactType) ? data.type : "other") as ContactType,
  };
  const invalid = Object.keys(validateContact(values)).filter((f) => f in CONTACT_LIMITS) as ContactField[];
  if (invalid.length) return json(422, { error: "invalid", fields: invalid });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return json(429, { error: "rate_limited" }, { "Retry-After": "600" });

  // Gmail only sends as the signed-in account, so the message goes from that
  // account to CONTACT_TO (or back to itself).
  const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  try {
    await transport.sendMail({
      // Shows who wrote in the inbox list; quotes and brackets would break the header.
      from: { name: `${values.name.replace(/["<>\\]/g, "")} via Portfolio`, address: user },
      to: process.env.CONTACT_TO || user,
      // The visitor's address only ever goes in Reply-To, after validation.
      replyTo: values.email,
      ...renderContactEmail(values),
    });
  } catch (error) {
    console.error("Contact form: Gmail refused the message:", error);
    return json(502, { error: "send_failed" });
  }

  // The receipt is a courtesy: the message already reached me, so a failure
  // here is logged and the visitor still sees success.
  try {
    await transport.sendMail({
      from: { name: generalData.name, address: user },
      to: values.email,
      ...renderConfirmationEmail(values),
    });
  } catch (error) {
    console.error("Contact form: confirmation email failed:", error);
  }
  return json(201, { status: "received" });
}
