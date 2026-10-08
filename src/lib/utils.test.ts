import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { checkSiteReachable, isLiveStatus } from "./utils";

describe("isLiveStatus", () => {
  it.each([200, 204, 301, 302, 304, 307, 308])("treats %i as live", (status) => {
    expect(isLiveStatus(status)).toBe(true);
  });

  // Up, but refusing this particular request (auth, WAF, no HEAD, rate limit, challenge page).
  it.each([401, 403, 405, 406, 429, 503])("treats %i as live", (status) => {
    expect(isLiveStatus(status)).toBe(true);
  });

  it.each([0, 100, 400, 404, 410, 500, 502, 504])("treats %i as down", (status) => {
    expect(isLiveStatus(status)).toBe(false);
  });
});

describe("checkSiteReachable", () => {
  const URL = "https://example.com/";
  const fetchMock = vi.fn<typeof fetch>();

  const respond = (status: number) => Promise.resolve(new Response(null, { status }));
  const networkError = () => Promise.reject(new TypeError("fetch failed"));
  /** Never answers; rejects only when the caller aborts, like a real hung request. */
  const hang = (_url: RequestInfo | URL, init?: RequestInit) =>
    new Promise<Response>((_, reject) => {
      init?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
    });

  const methods = () => fetchMock.mock.calls.map(([, init]) => init?.method);

  beforeEach(() => {
    vi.useFakeTimers();
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("returns false for an empty URL without touching the network", async () => {
    expect(await checkSiteReachable("")).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("stops at a live HEAD response", async () => {
    fetchMock.mockImplementationOnce(() => respond(200));

    expect(await checkSiteReachable(URL)).toBe(true);
    expect(methods()).toEqual(["HEAD"]);
  });

  it("does not follow redirects, so a 3xx counts as live on its own", async () => {
    fetchMock.mockImplementationOnce(() => respond(308));

    expect(await checkSiteReachable(URL)).toBe(true);
    expect(fetchMock.mock.calls[0][1]?.redirect).toBe("manual");
  });

  it("falls back to a small ranged GET when HEAD answers with a down status", async () => {
    fetchMock.mockImplementationOnce(() => respond(404)).mockImplementationOnce(() => respond(206));

    expect(await checkSiteReachable(URL)).toBe(true);
    expect(methods()).toEqual(["HEAD", "GET"]);
    const headers = fetchMock.mock.calls[1][1]?.headers as Record<string, string>;
    expect(headers.Range).toBe("bytes=0-50");
    expect(headers["User-Agent"]).toMatch(/Mozilla/);
  });

  it("falls back to GET when HEAD hits a network error", async () => {
    fetchMock.mockImplementationOnce(networkError).mockImplementationOnce(() => respond(200));

    expect(await checkSiteReachable(URL)).toBe(true);
    expect(methods()).toEqual(["HEAD", "GET"]);
  });

  it("aborts a HEAD that takes longer than 3s and falls back to GET", async () => {
    fetchMock.mockImplementationOnce(hang).mockImplementationOnce(() => respond(200));

    const result = checkSiteReachable(URL);
    await vi.advanceTimersByTimeAsync(2999);
    expect(methods()).toEqual(["HEAD"]);

    await vi.advanceTimersByTimeAsync(1);
    expect(await result).toBe(true);
    expect(fetchMock.mock.calls[0][1]?.signal?.aborted).toBe(true);
    expect(methods()).toEqual(["HEAD", "GET"]);
  });

  it("reports down when both HEAD and GET return down statuses", async () => {
    fetchMock.mockImplementationOnce(() => respond(500)).mockImplementationOnce(() => respond(502));

    expect(await checkSiteReachable(URL)).toBe(false);
    expect(methods()).toEqual(["HEAD", "GET"]);
  });

  it("reports down when both requests fail at the network level", async () => {
    fetchMock.mockImplementation(networkError);

    expect(await checkSiteReachable(URL)).toBe(false);
  });

  it("gives the GET 8s before giving up", async () => {
    fetchMock.mockImplementationOnce(networkError).mockImplementationOnce(hang);

    let settled = false;
    const result = checkSiteReachable(URL).finally(() => (settled = true));
    await vi.advanceTimersByTimeAsync(7999);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    expect(await result).toBe(false);
  });

  it("clears its timers once a request settles", async () => {
    fetchMock.mockImplementationOnce(() => respond(404)).mockImplementationOnce(() => respond(200));

    await checkSiteReachable(URL);
    expect(vi.getTimerCount()).toBe(0);
  });
});
