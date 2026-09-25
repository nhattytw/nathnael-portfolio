import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { unstable_cache } from "next/cache";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LIVE_STATUS_CODES = [200, 301, 302, 307, 308, 401, 403, 405, 406, 429, 503];
const HEAD_TIMEOUT_MS = 3000;
const GET_TIMEOUT_MS = 8000;

// 2xx/3xx, plus codes that mean "up but refusing this request":
// 401 (login required), 403 (WAF), 405 (no HEAD), 406 (filtered headers),
// 429 (rate limited), 503 (often a Cloudflare challenge page).
function isLiveStatus(status: number) {
  return LIVE_STATUS_CODES.includes(status) || (status >= 200 && status < 400);
}

async function probe(url: string, init: RequestInit, timeoutMs: number): Promise<boolean> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      redirect: "manual",
    });
    return isLiveStatus(response.status);
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Checks whether a project's site responds. Some hosts answer HEAD slowly or
 * not at all (e.g. Vercel redirects), so a failed or slow HEAD falls back to a
 * tiny ranged GET before the site is treated as down.
 */
async function checkSiteReachable(url: string): Promise<boolean> {
  if (!url) return false;

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  };

  try {
    if (await probe(url, { method: "HEAD", headers }, HEAD_TIMEOUT_MS)) return true;
  } catch {
    // Timed out or network error: try GET below.
  }
  try {
    return await probe(
      url,
      { method: "GET", headers: { ...headers, Range: "bytes=0-50" } },
      GET_TIMEOUT_MS
    );
  } catch {
    return false;
  }
}

/** Cached for 30 minutes so a slow or down site doesn't stall every request. */
export const isSiteReachable = unstable_cache(checkSiteReachable, ["site-reachable"], {
  revalidate: 1800,
});
