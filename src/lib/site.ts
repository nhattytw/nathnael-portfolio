/** The site's canonical origin, used for metadata, the sitemap and robots.txt. */
export const SITE_URL = "https://nathnaeltw.pro.et";

/** Year of the repo's first push (first commit: 2025-12-28). */
export const FIRST_YEAR = 2025;

/** "2025" in the first year, then a range such as "2025–2027". */
export function copyrightYears(currentYear: number) {
  return currentYear > FIRST_YEAR ? `${FIRST_YEAR}–${currentYear}` : String(FIRST_YEAR);
}
