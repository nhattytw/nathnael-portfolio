import { readFile } from "node:fs/promises";
import path from "node:path";
import { createDecipheriv } from "node:crypto";
import type { NextRequest } from "next/server";
import { CERTIFICATE_IDS } from "@/lib/generalData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CERT_DIR = path.join(process.cwd(), "private/certificates");
const cache = new Map<string, Buffer>();

async function decryptPreview(id: string): Promise<Buffer> {
  const hit = cache.get(id);
  if (hit) return hit;
  const key = Buffer.from(process.env.CERT_KEY ?? "", "base64");
  if (key.length !== 32) throw new Error("CERT_KEY is missing or invalid");

  const data = await readFile(path.join(CERT_DIR, `${id}.enc`));
  const iv = data.subarray(0, 12);
  const tag = data.subarray(12, 28);
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const image = Buffer.concat([decipher.update(data.subarray(28)), decipher.final()]);
  cache.set(id, image);
  return image;
}

/** Only serve to fetch() calls made by this site's own pages. */
function isSameSiteFetch(req: NextRequest): boolean {
  const site = req.headers.get("sec-fetch-site");
  const dest = req.headers.get("sec-fetch-dest");
  if (site) {
    // Opening the URL directly (dest "document") or via <img> is refused.
    return site === "same-origin" && dest === "empty";
  }
  // Older browsers without Fetch Metadata: fall back to the Referer host.
  const referer = req.headers.get("referer");
  if (!referer) return false;
  try {
    return new URL(referer).host === req.nextUrl.host;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Allowlist: never build a file path from an unknown id.
  if (!CERTIFICATE_IDS.includes(id)) {
    return new Response("Not found", { status: 404 });
  }
  if (!isSameSiteFetch(req)) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const image = await decryptPreview(id);
    return new Response(new Uint8Array(image), {
      headers: {
        "Content-Type": "image/webp",
        "Content-Disposition": "inline",
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
        "Cross-Origin-Resource-Policy": "same-origin",
        "X-Robots-Tag": "noindex, noimageindex",
      },
    });
  } catch (error) {
    console.error(`Certificate preview "${id}" unavailable:`, error);
    return new Response("Unavailable", { status: 503 });
  }
}
