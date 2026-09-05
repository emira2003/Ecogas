"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { business, telHref } from "@/data/business";
import { BEST_TIMES, enquirySchema, fieldErrors, type EnquiryInput } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

export interface EstimateForForm {
  lines: { name: string; qty: number; price: string }[];
  total: string;
}

interface EnquiryFormProps {
  /** "contact" shows the Service dropdown; "estimate" shows the chosen jobs instead */
  mode: "contact" | "estimate";
  /** From the estimate tool, when there is one */
  estimate?: EstimateForForm;
  /** Where the form lives, for the email ("/contact", "/estimate") */
  page: string;
  /** Prompt shown above the message box on the "Something else" route */
  messagePrompt?: string;
  /** Names for the "Service needed" dropdown (contact mode), passed in from the server */
  serviceNames?: string[];
  className?: string;
}

type Status = "idle" | "sending" | "success" | "error";

/**
 * The enquiry form (PLAN.md D5). Floating labels (F2-C1), inline errors next to the field
 * that has the problem, the first error focused, a progress fill on the button while sending
 * (F2-E5), a thank-you with one warm glow pulse on success, and the form kept on error.
 */
export function EnquiryForm({ mode, estimate, page, messagePrompt, serviceNames = [], className = "" }: EnquiryFormProps) {
  const id = useId();
  const serviceOptions = [...serviceNames, "Something else"];
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [sent, setSent] = useState<{ name: string; bestTime: string } | null>(null);

  const focusFirstError = (fields: Record<string, string>) => {
    const first = Object.keys(fields)[0];
    if (!first) return;
    formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const input: EnquiryInput = {
      name: raw.name ?? "",
      phone: raw.phone ?? "",
      email: raw.email ?? "",
      postcode: raw.postcode ?? "",
      service: raw.service ?? "",
      bestTime: (raw.bestTime as EnquiryInput["bestTime"]) ?? "Any",
      message: raw.message ?? "",
      company: raw.company ?? "",
      page,
      estimate,
    };

    const parsed = enquirySchema.safeParse(input);
    if (!parsed.success) {
      const fields = fieldErrors(parsed.error);
      setErrors(fields);
      setFormError(null);
      focusFirstError(fields);
      return;
    }

    setErrors({});
    setFormError(null);
    setStatus("sending");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Record<string, string> };
      if (response.ok && result.ok) {
        setSent({ name: parsed.data.name, bestTime: parsed.data.bestTime });
        setStatus("success");
        return;
      }
      if (result.fields) {
        setErrors(result.fields);
        focusFirstError(result.fields);
      }
      setFormError(result.error ?? `We couldn’t send that. Please try again or call ${business.phone}.`);
      setStatus("error");
    } catch {
      setFormError(`We couldn’t send that. Please try again or call ${business.phone}.`);
      setStatus("error");
    }
  };

  if (status === "success" && sent) {
    const when = sent.bestTime === "Any" ? "as soon as we can" : `${sent.bestTime.toLowerCase()} time`;
    return (
      <div className={`thanks ${className}`.trim()} role="status" aria-live="polite">
        <h3 className="h3">Thanks, {sent.name}.</h3>
        <p className="mt-3 max-w-xl">
          We’ve got your enquiry and will call you {when}. If it’s urgent, call{" "}
          <a href={telHref} className="font-semibold text-ember">
            {business.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const sending = status === "sending";
  const describedBy = (field: string) => (errors[field] ? `${id}-${field}-error` : undefined);

  return (
    <form ref={formRef} className={`enquiry ${className}`.trim()} onSubmit={onSubmit} noValidate>
      {/* Honeypot — hidden from people, tempting for bots. Not display:none, so bots still see it. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-name`} label="Your name" error={errors.name} errorId={describedBy("name")}>
          <input id={`${id}-name`} name="name" type="text" autoComplete="name" placeholder=" " required aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} />
        </Field>
        <Field id={`${id}-phone`} label="Phone number" error={errors.phone} errorId={describedBy("phone")}>
          <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder=" " required aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy("phone")} />
        </Field>
        <Field id={`${id}-email`} label="Email address" error={errors.email} errorId={describedBy("email")}>
          <input id={`${id}-email`} name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} placeholder=" " required aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} />
        </Field>
        <Field id={`${id}-postcode`} label="Postcode" error={errors.postcode} errorId={describedBy("postcode")}>
          <input id={`${id}-postcode`} name="postcode" type="text" autoComplete="postal-code" autoCapitalize="characters" spellCheck={false} placeholder=" " required aria-invalid={Boolean(errors.postcode)} aria-describedby={describedBy("postcode")} />
        </Field>

        {mode === "contact" ? (
          <Field id={`${id}-service`} label="Service needed" error={errors.service} errorId={describedBy("service")} select>
            <select id={`${id}-service`} name="service" defaultValue="" aria-describedby={describedBy("service")}>
              <option value="">Choose one…</option>
              {serviceOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </Field>
        ) : (
          <div className="sm:col-span-2">
            <p className="font-semibold">Jobs in your estimate</p>
            {estimate && estimate.lines.length > 0 ? (
              <ul className="mt-2 divide-y divide-line rounded-md border border-line bg-raised">
                {estimate.lines.map((line) => (
                  <li key={line.name} className="flex justify-between gap-4 px-4 py-2">
                    <span>
                      {line.qty > 1 ? `${line.qty} × ` : ""}
                      {line.name}
                    </span>
                    <span className="tabular flex-none font-semibold">{line.price}</span>
                  </li>
                ))}
                <li className="flex justify-between gap-4 bg-plaster px-4 py-2 font-semibold">
                  <span>{estimate.total.split(" £")[0]}</span>
                  <span className="tabular flex-none">£{estimate.total.split(" £").slice(1).join(" £")}</span>
                </li>
              </ul>
            ) : (
              <p className="mt-1 text-ink-soft">None yet. Describe what you need below.</p>
            )}
          </div>
        )}

        <Field id={`${id}-bestTime`} label="Best time to call" error={errors.bestTime} errorId={describedBy("bestTime")} select>
          <select id={`${id}-bestTime`} name="bestTime" defaultValue="Any" aria-describedby={describedBy("bestTime")}>
            {BEST_TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field id={`${id}-message`} label={messagePrompt ?? "Message"} error={errors.message} errorId={describedBy("message")}>
            <textarea id={`${id}-message`} name="message" rows={4} maxLength={1000} placeholder=" " aria-invalid={Boolean(errors.message)} aria-describedby={describedBy("message")} />
          </Field>
        </div>
      </div>

      {formError ? (
        <p className="mt-4 border-l-[3px] border-ember pl-3 font-semibold" role="alert">
          {formError}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" className={sending ? "is-sending" : ""} disabled={sending} aria-busy={sending} magnetic={false}>
          {mode === "estimate" ? "Send me this quote" : "Send enquiry"}
        </Button>
        <p className="small-text max-w-xs text-ink-soft">
          We only use your details to reply to your enquiry.{" "}
          <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-ember">
            Privacy policy
          </Link>
        </p>
      </div>

      <p className="small-text mt-4 text-ink-soft sm:hidden">
        Prefer to talk?{" "}
        <a href={telHref} className="inline-flex items-center gap-1 font-semibold text-ember">
          <Phone size={14} strokeWidth={2} aria-hidden="true" />
          Call {business.phone}
        </a>
      </p>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  errorId?: string;
  select?: boolean;
  children: ReactNode;
}

/** A field with a floating label (F2-C1) and its inline error message. */
function Field({ id, label, error, errorId, select = false, children }: FieldProps) {
  return (
    <div className={`field ${select ? "field--select" : ""} ${error ? "field--error" : ""}`.trim()}>
      {children}
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      {error ? (
        <p id={errorId} className="field__error small-text" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
