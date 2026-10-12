import { describe, expect, it } from "vitest";
import { copyrightYears } from "./site";

describe("copyrightYears", () => {
  it("shows a single year in the year of the first push", () => {
    expect(copyrightYears(2025)).toBe("2025");
  });

  it("shows a range from the first push to the current year", () => {
    expect(copyrightYears(2026)).toBe("2025–2026");
    expect(copyrightYears(2030)).toBe("2025–2030");
  });
});
