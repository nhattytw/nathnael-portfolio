"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generalData } from "@/lib/generalData";
import {
  CONTACT_ENDPOINT,
  CONTACT_LIMITS,
  CONTACT_TYPES,
  TURNSTILE_SITE_KEY,
  validateContact,
  type ContactField,
  type ContactValues,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

type Turnstile = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const EMPTY: ContactValues = { name: "", email: "", company: "", type: "full-time", message: "" };
const TYPE_LABELS: Record<ContactValues["type"], string> = {
  "full-time": "Full-time",
  contract: "Contract",
  consulting: "Consulting",
  other: "Other",
};

type ServerReply = { code: number; text: string; body: Record<string, unknown> };

async function fetchToken(): Promise<string | null> {
  try {
    const res = await fetch(`${CONTACT_ENDPOINT}?token=1`, { cache: "no-store" });
    const data = await res.json();
    return typeof data.token === "string" ? data.token : null;
  } catch {
    return null;
  }
}

function Counter({ value, max, always }: { value: string; max: number; always?: boolean }) {
  const n = value.length;
  if (!always && n < max * 0.8) return null;
  return (
    <span
      className={cn(
        "font-mono text-[11px] tabular-nums text-muted-foreground",
        n > max * 0.9 && "text-amber-600 dark:text-amber-400",
        n >= max && "font-bold text-destructive"
      )}
    >
      {n} / {max}
    </span>
  );
}

/** The request as it will be sent, rebuilt on every keystroke. */
function RequestPreview({ values, reply }: { values: ContactValues; reply: ServerReply | null }) {
  const str = (v: string, fallback = "…") => <span className="text-[#f2d98a]">&quot;{v || fallback}&quot;</span>;
  const key = (k: string) => <span className="text-[#88b0e0]">&quot;{k}&quot;</span>;
  const message = values.message.trim();
  return (
    <pre
      aria-label="Preview of the request this form sends"
      className="m-0 min-h-60 overflow-x-auto whitespace-pre-wrap break-words rounded-2xl border border-[#1f3a5f] bg-[#0a1626] p-5 font-mono text-[13px] leading-relaxed text-[#dfe8f5]"
    >
      <span className="text-[#8fd19e]">POST</span> /api/contact{"\n"}
      <span className="text-[#8ea3c0]">Content-Type: application/json</span>
      {"\n\n{\n  "}
      {key("name")}: {str(values.name.trim())},{"\n  "}
      {key("email")}: {str(values.email.trim())},{"\n  "}
      {key("company")}: {str(values.company.trim(), "")},{"\n  "}
      {key("type")}: {str(values.type)},{"\n  "}
      {key("message")}: {str(message.length > 60 ? `${message.slice(0, 60)}…` : message)}
      {"\n}"}
      {reply && (
        <>
          {"\n\n"}
          <span className={reply.code < 300 ? "text-[#8fd19e]" : "text-[#f59e8b]"}>
            HTTP/1.1 {reply.code} {reply.text}
          </span>
          {"\n"}
          {JSON.stringify(reply.body)}
        </>
      )}
    </pre>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [reply, setReply] = useState<ServerReply | null>(null);
  const tokenRef = useRef<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLDivElement>(null);
  const captchaIdRef = useRef<string | undefined>(undefined);
  const captchaTokenRef = useRef("");

  // A signed timestamp from the server: it proves the form was loaded here and
  // lets the server reject submissions that come in faster than a person types.
  const refreshToken = useCallback(async () => {
    tokenRef.current = await fetchToken();
  }, []);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  const renderCaptcha = useCallback(() => {
    if (!TURNSTILE_SITE_KEY || !window.turnstile || !captchaRef.current || captchaIdRef.current) return;
    captchaIdRef.current = window.turnstile.render(captchaRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      appearance: "interaction-only",
      callback: (token: string) => (captchaTokenRef.current = token),
      "expired-callback": () => (captchaTokenRef.current = ""),
    });
  }, []);

  useEffect(renderCaptcha, [renderCaptcha, sent]);

  const update = (field: keyof ContactValues, value: string) => {
    const nextValues = { ...values, [field]: value } as ContactValues;
    setValues(nextValues);
    // Once they've tried to send, re-check as they fix things.
    if (submitted) setErrors(validateContact(nextValues));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = (Object.keys(CONTACT_LIMITS) as ContactField[]).find((f) => found[f]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setSending(true);
    if (!tokenRef.current) await refreshToken();
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          type: values.type,
          message: values.message.trim(),
          website: honeypotRef.current?.value ?? "",
          token: tokenRef.current,
          turnstileToken: captchaTokenRef.current,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
      setReply({ code: res.status, text: res.statusText, body });

      if (res.ok) {
        setSent(true);
        toast.success("Message sent", { description: "Thanks. I'll reply by email." });
        return;
      }
      // Tokens are single-use in spirit; get a fresh one for the next attempt.
      refreshToken();
      if (captchaIdRef.current) window.turnstile?.reset(captchaIdRef.current);

      if (res.status === 422 && body.error === "too_fast") {
        toast.error("That was quick", { description: "Please wait a few seconds and send again." });
      } else if (res.status === 422 && Array.isArray(body.fields)) {
        const serverErrors: Partial<Record<ContactField, string>> = {};
        (body.fields as string[]).forEach((f) => {
          if (f in CONTACT_LIMITS) serverErrors[f as ContactField] = "Please check this field.";
        });
        setErrors(serverErrors);
      } else if (res.status === 422) {
        toast.error("Please send it again", { description: "The form expired. It's been refreshed." });
      } else if (res.status === 429) {
        toast.error("Too many messages", { description: "Please try again a little later." });
      } else if (res.status === 403) {
        toast.error("Couldn't verify the message", { description: "Please reload the page and try again." });
      } else {
        throw new Error(`Unexpected status ${res.status}`);
      }
    } catch {
      toast.error("Couldn't send right now", {
        description: `Please email me directly at ${generalData.contact.email}.`,
      });
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setSubmitted(false);
    setSent(false);
    setReply(null);
    captchaIdRef.current = undefined;
    refreshToken();
  };

  const field = (name: "name" | "email" | "company", label: string, type: string, autoComplete: string, optional?: boolean) => (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={`contact-${name}`} className="text-sm font-medium">
          {label}
          {optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
        </label>
        <Counter value={values[name]} max={CONTACT_LIMITS[name].max} />
      </div>
      <Input
        id={`contact-${name}`}
        type={type}
        autoComplete={autoComplete}
        maxLength={CONTACT_LIMITS[name].max}
        value={values[name]}
        onChange={(e) => update(name, e.target.value)}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
        className="bg-muted/50 border-border"
        disabled={sending}
      />
      {errors[name] && (
        <p id={`contact-${name}-error`} className="font-sans text-sm text-destructive">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
      {TURNSTILE_SITE_KEY && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={renderCaptcha} />
      )}

      {sent ? (
        <div className="space-y-3 rounded-2xl border-[1.5px] border-dashed border-primary bg-muted/30 p-6">
          <h4 className="text-xl font-bold">Thanks, your message is on its way.</h4>
          <p className="text-muted-foreground">I&apos;ll reply to the email address you gave.</p>
          <button type="button" onClick={reset} className="font-semibold text-primary underline underline-offset-4">
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            {field("name", "Name", "text", "name")}
            {field("email", "Email", "email", "email")}
          </div>
          {field("company", "Company", "text", "organization", true)}

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">What&apos;s it about?</legend>
            <div className="flex flex-wrap gap-2">
              {CONTACT_TYPES.map((t) => (
                <label key={t} className="cursor-pointer">
                  <input
                    type="radio"
                    name="contact-type"
                    value={t}
                    checked={values.type === t}
                    onChange={() => update("type", t)}
                    className="peer sr-only"
                    disabled={sending}
                  />
                  <span className="inline-block rounded-full border-[1.5px] border-border px-4 py-1.5 text-sm font-semibold text-muted-foreground transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                    {TYPE_LABELS[t]}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="contact-message" className="text-sm font-medium">
                Message
              </label>
              <Counter value={values.message} max={CONTACT_LIMITS.message.max} always />
            </div>
            <Textarea
              id="contact-message"
              placeholder="At least 20 characters: the role, the team, or the project."
              maxLength={CONTACT_LIMITS.message.max}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className="bg-muted/50 border-border resize-y min-h-32"
              disabled={sending}
            />
            {errors.message && (
              <p id="contact-message-error" className="font-sans text-sm text-destructive">
                {errors.message}
              </p>
            )}
          </div>

          {/* Hidden from people; bots that fill every field give themselves away. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="contact-website">Leave this empty</label>
            <input id="contact-website" ref={honeypotRef} tabIndex={-1} autoComplete="off" />
          </div>

          <div ref={captchaRef} />

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Button type="submit" className="h-12 px-8 text-base rounded-full" disabled={sending}>
              <Send className="mr-2 h-4 w-4" />
              {sending ? "Sending…" : "Send Message"}
            </Button>
            <span className="font-mono text-xs text-muted-foreground">Spam-protected · no tracking</span>
          </div>
        </form>
      )}

      <RequestPreview values={values} reply={reply} />
    </div>
  );
}
