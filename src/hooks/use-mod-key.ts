import { useEffect, useState } from "react";

type NavigatorWithUAData = Navigator & { userAgentData?: { platform?: string } };

/**
 * "⌘" on Apple devices, "Ctrl" everywhere else. Starts as "Ctrl" because the
 * static page can't know the device, then switches right after mount.
 */
export function useModKey() {
  const [modKey, setModKey] = useState<"⌘" | "Ctrl">("Ctrl");

  useEffect(() => {
    const nav = navigator as NavigatorWithUAData;
    const platform = nav.userAgentData?.platform || nav.platform || nav.userAgent;
    if (/mac|iphone|ipad|ipod/i.test(platform)) setModKey("⌘");
  }, []);

  return modKey;
}
