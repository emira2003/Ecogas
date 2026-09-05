/**
 * Enquiry form rules (PLAN.md D5), shared by the browser (inline messages) and the
 * API route (the real check). One place, so the two can never disagree.
 */
import { z } from "zod";

export const BEST_TIMES = ["Morning", "Afternoon", "Evening", "Any"] as const;
export type BestTime = (typeof BEST_TIMES)[number];

/** Digits, spaces and a leading +, 10–15 characters in total. */
const UK_PHONE = /^\+?[0-9 ]{10,15}$/;
/** Lenient UK postcode: "BL5 1AQ", "bl51aq", "M1 1AA", "SW1A 1AA" */
const UK_POSTCODE = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/;

export const estimateLineSchema = z.object({
  name: z.string().trim().max(120),
  qty: z.number().int().min(1).max(10),
  price: z.string().trim().max(40),
});

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 letters).")
    .max(60, "Please keep your name under 60 characters."),
  phone: z
    .string()
    .trim()
    .regex(UK_PHONE, "Please enter a UK phone number, digits only, e.g. 01204 000000."),
  email: z.email("Please enter a valid email address, e.g. name@example.com."),
  postcode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(UK_POSTCODE, "Please enter a UK postcode, e.g. BL5 1AQ."),
  /** One of the seven services, "Something else", or (on the estimate page) left empty */
  service: z.string().trim().max(80).optional().default(""),
  bestTime: z.enum(BEST_TIMES).optional().default("Any"),
  message: z.string().trim().max(1000, "Please keep your message under 1,000 characters.").optional().default(""),
  /** Honeypot — real people never see or fill this field */
  company: z.string().max(200).optional().default(""),
  /** Which page the form was on, e.g. "/contact" */
  page: z.string().max(200).optional().default(""),
  /** Lines and total from the estimate tool, when sent from there */
  estimate: z
    .object({
      lines: z.array(estimateLineSchema).max(40),
      total: z.string().trim().max(60),
    })
    .optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

/** Field name → first error message, for showing inline next to each field. */
export const fieldErrors = (error: z.ZodError): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
};
