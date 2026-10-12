/**
 * The two emails the contact route sends: the notification to me and the
 * confirmation to the visitor. HTML email has to survive Gmail, Outlook and
 * phone clients, so this is table layout with inline styles and no external
 * images or fonts. Each has a plain-text part alongside it.
 */

import { CONTACT_TYPE_LABELS, type ContactType, type ContactValues } from "@/lib/contact";
import { generalData } from "@/lib/generalData";

// The site's light palette (src/app/globals.css).
const C = {
  page: "#f4f2ec",
  card: "#fbfaf6",
  ink: "#151513",
  muted: "#6b6a63",
  line: "#e2dfd5",
  primary: "#2e6cba",
  onPrimary: "#fbfaf6",
};
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";
const SITE = "nathnaeltw.pro.et";

/** Everything a visitor typed goes through this before it touches the HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function receivedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Addis_Ababa",
  }).format(date);
}

/** Page background, top label, the card with the blue strip, and a footnote. */
function layout({ title, preview, label, card, footnote }: Record<"title" | "preview" | "label" | "card" | "footnote", string>) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preview}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
    <tr><td style="padding:0 4px 14px;font:600 11px/1 ${SANS};letter-spacing:.14em;text-transform:uppercase;color:${C.muted};">
      ${SITE} &nbsp;·&nbsp; ${label}
    </td></tr>
    <tr><td style="background:${C.card};border:1px solid ${C.line};border-top:4px solid ${C.primary};border-radius:12px;padding:32px 32px 28px;">
      ${card}
    </td></tr>
    <tr><td style="padding:16px 4px 0;font:12px/1.6 ${SANS};color:${C.muted};">
      ${footnote}
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

function pill(text: string) {
  return `<span style="display:inline-block;padding:4px 12px;border-radius:999px;background:${C.primary};color:${C.onPrimary};font:600 12px/1.4 ${SANS};">${text}</span>`;
}

function button(href: string, text: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
        <tr><td style="border-radius:999px;background:${C.primary};">
          <a href="${href}" style="display:inline-block;padding:12px 26px;font:600 14px/1 ${SANS};color:${C.onPrimary};text-decoration:none;">${text}</a>
        </td></tr>
      </table>`;
}

function detailRow(label: string, valueHtml: string): string {
  return `<tr>
  <td style="padding:10px 0;border-top:1px solid ${C.line};width:96px;vertical-align:top;font:600 11px/1.6 ${SANS};letter-spacing:.08em;text-transform:uppercase;color:${C.muted};">${label}</td>
  <td style="padding:10px 0;border-top:1px solid ${C.line};vertical-align:top;font:15px/1.6 ${SANS};color:${C.ink};">${valueHtml}</td>
</tr>`;
}

/** The email I receive for each message. */
export function renderContactEmail(values: ContactValues, date = new Date()) {
  const type = CONTACT_TYPE_LABELS[values.type];
  const subject = `${type} enquiry from ${values.name}`;
  const when = receivedAt(date);

  const name = escapeHtml(values.name);
  const email = escapeHtml(values.email);
  const company = values.company ? escapeHtml(values.company) : `<span style="color:${C.muted};">Not given</span>`;
  const message = escapeHtml(values.message).replace(/\n/g, "<br>");
  const replyHref = `mailto:${encodeURIComponent(values.email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`;

  const html = layout({
    title: escapeHtml(subject),
    preview: escapeHtml(values.message.replace(/\s+/g, " ").slice(0, 110)),
    label: "Contact form",
    card: `${pill(type)}
      <h1 style="margin:16px 0 4px;font:400 30px/1.2 ${SERIF};color:${C.ink};">${name}</h1>
      <p style="margin:0 0 24px;font:14px/1.5 ${SANS};color:${C.muted};">sent you a message on ${when} (Addis Ababa time)</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        ${detailRow("Email", `<a href="mailto:${email}" style="color:${C.primary};text-decoration:none;">${email}</a>`)}
        ${detailRow("Company", company)}
        ${detailRow("About", type)}
      </table>

      <div style="padding:18px 20px;background:${C.page};border-left:3px solid ${C.primary};border-radius:0 8px 8px 0;font:15px/1.65 ${SANS};color:${C.ink};">${message}</div>

      ${button(replyHref, `Reply to ${name}`)}`,
    footnote: `Hitting reply in your mail app also goes straight to ${name}.`,
  });

  const text = [
    `${type} enquiry from ${values.name}`,
    `Received ${when} (Addis Ababa time)`,
    "",
    `Email:   ${values.email}`,
    `Company: ${values.company || "-"}`,
    "",
    values.message,
    "",
    "--",
    `Reply to this email to answer ${values.name}.`,
  ].join("\n");

  return { subject, html, text };
}

const ABOUT: Record<ContactType, string> = {
  "full-time": "about a full-time role",
  contract: "about a contract role",
  consulting: "about consulting work",
  other: "",
};

/**
 * The receipt the visitor gets. It never repeats what they wrote, so someone
 * who types a stranger's address can't use the form to send them anything.
 */
export function renderConfirmationEmail(values: Pick<ContactValues, "name" | "type">) {
  const first = values.name.split(/\s+/)[0] || values.name;
  const subject = `Thanks for getting in touch, ${first}`;
  const about = ABOUT[values.type];
  const { name, title } = generalData;
  const linkedin = generalData.socials.linkedin;

  const p = `margin:0 0 16px;font:15px/1.65 ${SANS};color:${C.ink};`;
  const html = layout({
    title: escapeHtml(subject),
    preview: "Your message reached me. I usually reply within one to two working days.",
    label: "Message received",
    card: `${pill("Message received")}
      <h1 style="margin:16px 0 20px;font:400 30px/1.2 ${SERIF};color:${C.ink};">Hi ${escapeHtml(first)},</h1>
      <p style="${p}">Thanks for reaching out${about ? ` ${about}` : ""}. Your message reached me, and I usually reply within one to two working days.</p>
      <p style="${p}">If it's time-sensitive, you can also find me on <a href="${linkedin}" style="color:${C.primary};text-decoration:none;">LinkedIn</a>.</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
        <tr><td style="padding-top:20px;border-top:1px solid ${C.line};">
          <div style="font:400 20px/1.3 ${SERIF};color:${C.ink};">${name}</div>
          <div style="margin-top:4px;font:13px/1.5 ${SANS};color:${C.muted};">${title} &nbsp;·&nbsp; <a href="https://${SITE}" style="color:${C.primary};text-decoration:none;">${SITE}</a></div>
        </td></tr>
      </table>

      ${button(`https://${SITE}/projects`, "See my recent work")}`,
    footnote: `You're getting this because you sent a message through the contact form on ${SITE}. If that wasn't you, you can ignore this email.`,
  });

  const text = [
    `Hi ${first},`,
    "",
    `Thanks for reaching out${about ? ` ${about}` : ""}. Your message reached me, and I usually reply within one to two working days.`,
    "",
    `If it's time-sensitive, you can also find me on LinkedIn: ${linkedin}`,
    "",
    name,
    `${title} · https://${SITE}`,
    "",
    "--",
    `You're getting this because you sent a message through the contact form on ${SITE}. If that wasn't you, you can ignore this email.`,
  ].join("\n");

  return { subject, html, text };
}
