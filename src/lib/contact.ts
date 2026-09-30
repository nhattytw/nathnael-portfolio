/**
 * Contact form rules, shared by the form. public/api/contact.php enforces the
 * same limits on the server, which is the check that actually counts.
 */

export const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "/api/contact.php";

/** Cloudflare Turnstile site key; the check is skipped when it isn't set. */
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { min: 6, max: 254 },
  company: { min: 0, max: 100 },
  message: { min: 20, max: 2000 },
} as const;

export const CONTACT_TYPES = ["full-time", "contract", "consulting", "other"] as const;
export type ContactType = (typeof CONTACT_TYPES)[number];

export type ContactField = keyof typeof CONTACT_LIMITS;
export type ContactValues = Record<ContactField, string> & { type: ContactType };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns a message for each field that fails, in the order they appear. */
export function validateContact(values: ContactValues): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const company = values.company.trim();
  const message = values.message.trim();

  if (name.length < CONTACT_LIMITS.name.min) errors.name = "Enter your name (at least 2 characters).";
  else if (name.length > CONTACT_LIMITS.name.max) errors.name = `Keep your name under ${CONTACT_LIMITS.name.max} characters.`;

  if (!EMAIL.test(email) || email.length > CONTACT_LIMITS.email.max)
    errors.email = "Enter an email address like you@company.com.";

  if (company.length > CONTACT_LIMITS.company.max)
    errors.company = `Keep the company name under ${CONTACT_LIMITS.company.max} characters.`;

  if (message.length < CONTACT_LIMITS.message.min) {
    const missing = CONTACT_LIMITS.message.min - message.length;
    errors.message = `Add a little more detail: ${missing} more character${missing === 1 ? "" : "s"} needed.`;
  } else if (message.length > CONTACT_LIMITS.message.max) {
    errors.message = `Keep your message under ${CONTACT_LIMITS.message.max} characters.`;
  }

  return errors;
}
