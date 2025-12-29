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
    // Reduced timeout to 1.5s to speed up server response time
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-store",
      headers: headers,
    });

    clearTimeout(timeoutId);
    return response.status >= 200 && response.status < 400;
  } catch (error) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);
      const response = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        headers: { ...headers, Range: "bytes=0-10" },
      });
      clearTimeout(timeoutId);
      return response.status >= 200 && response.status < 400;
    } catch {
      return false;
    }
  }
}
