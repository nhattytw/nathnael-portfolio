import { describe, expect, it } from "vitest";
import { escapeHtml, renderConfirmationEmail, renderContactEmail } from "./contact-email";
import type { ContactValues } from "./contact";

const values: ContactValues = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  type: "contract",
  message: "Hello,\nI'd like to talk about a backend contract role.",
};

describe("renderContactEmail", () => {
  it("builds the subject from the enquiry type and name", () => {
    expect(renderContactEmail(values).subject).toBe("Contract enquiry from Ada Lovelace");
  });

  it("escapes everything the visitor typed", () => {
    const { html } = renderContactEmail({
      ...values,
      name: '<img src=x onerror="alert(1)">',
      company: "<b>Co</b>",
      message: "<script>alert(1)</script>",
    });
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img src=x");
    expect(html).not.toContain("<b>Co</b>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("keeps the message's line breaks", () => {
    expect(renderContactEmail(values).html).toContain("Hello,<br>I&#39;d like");
  });

  it("links the reply button to the visitor with a Re: subject", () => {
    expect(renderContactEmail(values).html).toContain(
      'href="mailto:ada%40example.com?subject=Re%3A%20Contract%20enquiry%20from%20Ada%20Lovelace"',
    );
  });

  it("marks a missing company and says so in the text part", () => {
    const { html, text } = renderContactEmail({ ...values, company: "" });
    expect(html).toContain("Not given");
    expect(text).toContain("Company: -");
  });

  it("shows the time in Addis Ababa", () => {
    const { text } = renderContactEmail(values, new Date("2026-10-12T09:30:00Z"));
    expect(text).toContain("12:30");
  });
});

describe("renderConfirmationEmail", () => {
  it("greets the visitor by first name and names the enquiry", () => {
    const { subject, text } = renderConfirmationEmail(values);
    expect(subject).toBe("Thanks for getting in touch, Ada");
    expect(text).toContain("Hi Ada,");
    expect(text).toContain("Thanks for reaching out about a contract role.");
  });

  it("drops the topic for Other", () => {
    expect(renderConfirmationEmail({ ...values, type: "other" }).text).toContain("Thanks for reaching out. Your message");
  });

  it("escapes the name in the greeting", () => {
    const { html } = renderConfirmationEmail({ ...values, name: "<b>Eve</b> Smith" });
    expect(html).toContain("Hi &lt;b&gt;Eve&lt;/b&gt;,");
    expect(html).not.toContain("<b>Eve</b>");
  });
});

describe("escapeHtml", () => {
  it("escapes the five HTML-special characters", () => {
    expect(escapeHtml(`&<>"'`)).toBe("&amp;&lt;&gt;&quot;&#39;");
  });
});
