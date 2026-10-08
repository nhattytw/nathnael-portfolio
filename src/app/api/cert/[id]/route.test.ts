import { createCipheriv, randomBytes } from "node:crypto";
import path from "node:path";
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const readFile = vi.hoisted(() => vi.fn());
vi.mock("node:fs/promises", () => ({ readFile }));

const KEY = randomBytes(32);
const IMAGE = Buffer.from("RIFF....WEBPVP8 fake image bytes");

/** Same layout scripts/encrypt-cert.mjs writes: [12-byte IV][16-byte tag][ciphertext]. */
function encrypt(plain: Buffer, key = KEY): Buffer {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const body = Buffer.concat([cipher.update(plain), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), body]);
}

const SAME_ORIGIN_FETCH = { "sec-fetch-site": "same-origin", "sec-fetch-dest": "empty" };

async function get(id: string, headers: Record<string, string> = SAME_ORIGIN_FETCH) {
  // Fresh module per test so the in-memory decrypt cache doesn't leak between cases.
  const { GET } = await import("./route");
  const req = new NextRequest(`https://example.com/api/cert/${id}`, { headers });
  return GET(req, { params: Promise.resolve({ id }) });
}

beforeEach(() => {
  vi.resetModules();
  readFile.mockReset();
  vi.stubEnv("CERT_KEY", KEY.toString("base64"));
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("GET /api/cert/[id]", () => {
  it("returns 404 for an id outside the allowlist without touching the disk", async () => {
    const res = await get("../../.env.local");
    expect(res.status).toBe(404);
    expect(readFile).not.toHaveBeenCalled();
  });

  it("refuses a direct navigation to the URL", async () => {
    const res = await get("iimcs", { "sec-fetch-site": "none", "sec-fetch-dest": "document" });
    expect(res.status).toBe(403);
  });

  it("refuses a cross-site fetch", async () => {
    const res = await get("iimcs", { "sec-fetch-site": "cross-site", "sec-fetch-dest": "empty" });
    expect(res.status).toBe(403);
  });

  it("refuses an <img> embed even from the same origin", async () => {
    const res = await get("iimcs", { "sec-fetch-site": "same-origin", "sec-fetch-dest": "image" });
    expect(res.status).toBe(403);
  });

  it("falls back to the Referer host when Fetch Metadata is absent", async () => {
    readFile.mockResolvedValue(encrypt(IMAGE));
    expect((await get("iimcs", { referer: "https://example.com/about" })).status).toBe(200);
    expect((await get("iimcs", { referer: "https://evil.test/about" })).status).toBe(403);
    expect((await get("iimcs", {})).status).toBe(403);
  });

  it("decrypts and serves the preview with no-store, same-origin headers", async () => {
    readFile.mockResolvedValue(encrypt(IMAGE));
    const res = await get("iimcs");

    expect(res.status).toBe(200);
    expect(Buffer.from(await res.arrayBuffer())).toEqual(IMAGE);
    expect(res.headers.get("content-type")).toBe("image/webp");
    expect(res.headers.get("cache-control")).toContain("no-store");
    expect(res.headers.get("cross-origin-resource-policy")).toBe("same-origin");
    expect(readFile).toHaveBeenCalledWith(path.join(process.cwd(), "private/certificates/iimcs.enc"));
  });

  it("returns 503 when CERT_KEY is missing", async () => {
    vi.stubEnv("CERT_KEY", "");
    const res = await get("iimcs");
    expect(res.status).toBe(503);
  });

  it("returns 503 when the file was encrypted with a different key", async () => {
    readFile.mockResolvedValue(encrypt(IMAGE, randomBytes(32)));
    const res = await get("iimcs");
    expect(res.status).toBe(503);
  });

  it("returns 503 when the ciphertext has been tampered with", async () => {
    const data = encrypt(IMAGE);
    data[data.length - 1] ^= 0xff;
    readFile.mockResolvedValue(data);
    const res = await get("iimcs");
    expect(res.status).toBe(503);
  });
});
