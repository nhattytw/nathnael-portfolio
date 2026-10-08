import { describe, expect, it } from "vitest";
import { CONTACT_LIMITS, validateContact, type ContactValues } from "./contact";

const valid: ContactValues = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "",
  message: "I'd like to talk about a backend contract role.",
  type: "contract",
};

describe("validateContact", () => {
  it("accepts a complete submission", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("trims whitespace before measuring length", () => {
    expect(validateContact({ ...valid, name: "  A  " }).name).toMatch(/at least 2/);
    expect(validateContact({ ...valid, name: "  Al  " })).toEqual({});
  });

  it("enforces the name length bounds", () => {
    expect(validateContact({ ...valid, name: "x".repeat(CONTACT_LIMITS.name.max) })).toEqual({});
    expect(validateContact({ ...valid, name: "x".repeat(CONTACT_LIMITS.name.max + 1) }).name).toMatch(/under 80/);
  });

  it.each(["", "ada", "ada@", "ada@example", "ada@example.c", "ada lovelace@example.com"])(
    "rejects the malformed email %j",
    (email) => {
      expect(validateContact({ ...valid, email }).email).toBeDefined();
    },
  );

  it("rejects an email longer than the limit", () => {
    const email = `${"a".repeat(CONTACT_LIMITS.email.max)}@example.com`;
    expect(validateContact({ ...valid, email }).email).toBeDefined();
  });

  it("allows an empty company but caps its length", () => {
    expect(validateContact({ ...valid, company: "" })).toEqual({});
    expect(validateContact({ ...valid, company: "x".repeat(CONTACT_LIMITS.company.max + 1) }).company).toBeDefined();
  });

  it("counts how many message characters are missing", () => {
    expect(validateContact({ ...valid, message: "x".repeat(19) }).message).toBe(
      "Add a little more detail: 1 more character needed.",
    );
    expect(validateContact({ ...valid, message: "x".repeat(15) }).message).toBe(
      "Add a little more detail: 5 more characters needed.",
    );
  });

  it("caps the message length", () => {
    expect(validateContact({ ...valid, message: "x".repeat(CONTACT_LIMITS.message.max) })).toEqual({});
    expect(validateContact({ ...valid, message: "x".repeat(CONTACT_LIMITS.message.max + 1) }).message).toMatch(/under 2000/);
  });

  it("reports every failing field at once", () => {
    const errors = validateContact({ name: "", email: "nope", company: "", message: "", type: "other" });
    expect(Object.keys(errors)).toEqual(["name", "email", "message"]);
  });
});
