import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function isSiteReachable(url: string): Promise<boolean> {
  if (!url) return false;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);
    return response.status >= 200 && response.status < 400;
  } catch (error) {
    // Fallback: If HEAD fails (some servers block it), try a very light GET
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const response = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        headers: { Range: "bytes=0-10" }, // Request tiny chunk
      });
      clearTimeout(timeoutId);
      return response.status >= 200 && response.status < 400;
    } catch {
      return false;
    }
  }
}
