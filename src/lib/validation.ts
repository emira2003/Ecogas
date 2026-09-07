/**
 * Enquiry form rules (PLAN.md D5), shared by the browser (inline messages) and the
 * API route (the real check). One place, so the two can never disagree.
 *
 * Uses the small "zod/mini" build so the browser only downloads a few KB of it.
 */
import * as z from "zod/mini";

export const BEST_TIMES = ["Morning", "Afternoon", "Evening", "Any"] as const;
export type BestTime = (typeof BEST_TIMES)[number];

/** Digits, spaces and a leading +, 10-15 characters in total. */
const UK_PHONE = /^\+?[0-9 ]{10,15}$/;
/** Lenient UK postcode: "BL5 1AQ", "bl51aq", "M1 1AA", "SW1A 1AA" */
const UK_POSTCODE = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/;

const optionalText = (max: number, message?: string) =>
  z._default(z.optional(z.string().check(z.trim(), z.maxLength(max, message))), "");

export const estimateLineSchema = z.object({
  name: z.string().check(z.trim(), z.maxLength(120)),
  qty: z.number().check(z.int(), z.minimum(1), z.maximum(10)),
  price: z.string().check(z.trim(), z.maxLength(40)),
});

export const enquirySchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, "Please enter your name (at least 2 letters)."),
      z.maxLength(60, "Please keep your name under 60 characters."),
    ),
  phone: z.string().check(z.trim(), z.regex(UK_PHONE, "Please enter a UK phone number, digits only, e.g. 01204 000000.")),
  email: z.email("Please enter a valid email address, e.g. name@example.com."),
  postcode: z.string().check(z.trim(), z.toUpperCase(), z.regex(UK_POSTCODE, "Please enter a UK postcode, e.g. BL5 1AQ.")),
  /** One of the seven services, "Something else", or (on the estimate page) left empty */
  service: optionalText(80),
  bestTime: z._default(z.optional(z.enum(BEST_TIMES)), "Any"),
  message: optionalText(1000, "Please keep your message under 1,000 characters."),
  /** Honeypot: real people never see or fill this field */
  company: optionalText(200),
  /** Which page the form was on, e.g. "/contact" */
  page: optionalText(200),
  /** Lines and total from the estimate tool, when sent from there */
  estimate: z.optional(
    z.object({
      lines: z.array(estimateLineSchema).check(z.maxLength(40)),
      total: z.string().check(z.trim(), z.maxLength(60)),
    }),
  ),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

/** Field name → first error message, for showing inline next to each field. */
export const fieldErrors = (error: { issues: { path: PropertyKey[]; message: string }[] }): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
};
