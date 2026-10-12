import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.hoisted(() => vi.fn());
vi.mock("nodemailer", () => ({
  default: { createTransport: () => ({ sendMail: send }) },
}));

const VALID = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "",
  type: "contract",
  message: "I'd like to talk about a backend contract role.",
  website: "",
};

const SAME_ORIGIN = { "sec-fetch-site": "same-origin", "content-type": "application/json" };

async function post(body: unknown, headers: Record<string, string> = SAME_ORIGIN, ip = "203.0.113.1") {
  // Fresh module per test so the in-memory rate limit doesn't leak between cases.
  const { POST } = await import("./route");
  const req = new NextRequest("https://example.com/api/contact", {
    method: "POST",
    headers: { "x-forwarded-for": ip, ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  return POST(req);
}

beforeEach(() => {
  vi.resetModules();
  send.mockReset().mockResolvedValue({ messageId: "<id@example.com>" });
  vi.stubEnv("GMAIL_USER", "owner@gmail.com");
  vi.stubEnv("GMAIL_APP_PASSWORD", "app-password");
  vi.stubEnv("CONTACT_TO", "");
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/contact", () => {
  it("sends a valid message with the visitor only in Reply-To", async () => {
    const res = await post(VALID);
    expect(res.status).toBe(201);
    expect(send).toHaveBeenCalledTimes(2);
    const email = send.mock.calls[0][0];
    expect(email.to).toBe("owner@gmail.com");
    expect(email.replyTo).toBe("ada@example.com");
    expect(email.from).toEqual({ name: "Ada Lovelace via Portfolio", address: "owner@gmail.com" });
    expect(email.text).toContain(VALID.message);
  });

  it("sends the visitor a confirmation that doesn't repeat their message", async () => {
    await post(VALID);
    const receipt = send.mock.calls[1][0];
    expect(receipt.to).toBe("ada@example.com");
    expect(receipt.from).toEqual({ name: "Nathnael Tesfaye Woldekidan", address: "owner@gmail.com" });
    expect(receipt.subject).toBe("Thanks for getting in touch, Ada");
    expect(receipt.html).not.toContain(VALID.message);
    expect(receipt.text).not.toContain(VALID.message);
  });

  it("still reports success when only the confirmation fails", async () => {
    send.mockResolvedValueOnce({ messageId: "<id@example.com>" }).mockRejectedValueOnce(new Error("quota"));
    const res = await post(VALID);
    expect(res.status).toBe(201);
  });

  it("refuses a cross-site post", async () => {
    const res = await post(VALID, { "sec-fetch-site": "cross-site" });
    expect(res.status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });

  it("pretends to accept a filled honeypot without sending", async () => {
    const res = await post({ ...VALID, website: "https://spam.example" });
    expect(res.status).toBe(201);
    expect(send).not.toHaveBeenCalled();
  });

  it("names the fields that fail validation", async () => {
    const res = await post({ ...VALID, email: "nope", message: "short" });
    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({ error: "invalid", fields: ["email", "message"] });
  });

  it("strips control characters so the subject stays one line", async () => {
    await post({ ...VALID, name: "Ada\r\nBcc: victim@example.com" });
    expect(send.mock.calls[0][0].subject).not.toMatch(/[\r\n]/);
  });

  it("keeps the sender's name from breaking out of the From display name", async () => {
    await post({ ...VALID, name: 'Ada" <evil@example.com>' });
    expect(send.mock.calls[0][0].from.name).toBe("Ada evil@example.com via Portfolio");
  });

  it("delivers to CONTACT_TO when it's set", async () => {
    vi.stubEnv("CONTACT_TO", "inbox@example.com");
    await post(VALID);
    expect(send.mock.calls[0][0].to).toBe("inbox@example.com");
  });

  it("rejects malformed JSON", async () => {
    const res = await post("{not json");
    expect(res.status).toBe(400);
  });

  it("rate-limits repeat senders", async () => {
    const { POST } = await import("./route");
    const statuses = [];
    for (let i = 0; i < 4; i++) {
      const req = new NextRequest("https://example.com/api/contact", {
        method: "POST",
        headers: { ...SAME_ORIGIN, "x-forwarded-for": "198.51.100.7" },
        body: JSON.stringify(VALID),
      });
      statuses.push((await POST(req)).status);
    }
    expect(statuses).toEqual([201, 201, 201, 429]);
  });

  it("reports a Gmail failure as 502", async () => {
    send.mockRejectedValue(new Error("Invalid login: 535-5.7.8 Username and Password not accepted"));
    const res = await post(VALID);
    expect(res.status).toBe(502);
  });

  it("returns 500 when it isn't configured", async () => {
    vi.stubEnv("GMAIL_APP_PASSWORD", "");
    const res = await post(VALID);
    expect(res.status).toBe(500);
    expect(send).not.toHaveBeenCalled();
  });
});
