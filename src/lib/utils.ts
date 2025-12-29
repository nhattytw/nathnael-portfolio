import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function isSiteReachable(url: string): Promise<boolean> {
  if (!url) return false;

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    Connection: "close", // Close connection to return faster
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-store",
      headers: headers,
    });

    clearTimeout(timeoutId);

    // LOGIC:
    // 200-399: Success (OK, Redirects)
    // 401: Unauthorized (Live but requires login)
    // 403: Forbidden (Live but WAF blocked us)
    // 405: Method Not Allowed (Live but doesn't like HEAD requests)
    // 406: Not Acceptable (Live but WAF filtered headers)
    // 429: Too Many Requests (Live but rate limited)
    // 503: Service Unavailable (Often Cloudflare CAPTCHA page - Site is technically up)

    const liveStatusCodes = [
      200, 301, 302, 307, 308, 401, 403, 405, 406, 429, 503,
    ];

    return (
      liveStatusCodes.includes(response.status) ||
      (response.status >= 200 && response.status < 400)
    );
  } catch (error: any) {
    if (error.name !== "AbortError") {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const response = await fetch(url, {
          method: "GET",
          signal: controller.signal,
          headers: { ...headers, Range: "bytes=0-50" }, // Request just the first 50 bytes
        });
        clearTimeout(timeoutId);

        // Apply same lenient logic to GET
        const liveStatusCodes = [
          200, 301, 302, 307, 308, 401, 403, 405, 406, 429, 503,
        ];
        return (
          liveStatusCodes.includes(response.status) ||
          (response.status >= 200 && response.status < 400)
        );
      } catch {
        return false;
      }
    }
    return false;
  }
}
