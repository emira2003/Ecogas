/**
 * POST /api/enquiry (PLAN.md D5)
 *
 * parse → validate → honeypot? say "ok" and drop it → build a readable email →
 * send through Web3Forms → { ok: true } or { ok: false, error }.
 * Rate limit: 5 enquiries per IP address per 10 minutes, kept in memory.
 */
import { business } from "@/data/business";
import { enquirySchema, fieldErrors, type Enquiry } from "@/lib/validation";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const CALL_US = `Please try again or call ${business.phone}.`;

const attempts = new Map<string, number[]>();

/** true if this IP has already sent 5 in the last 10 minutes */
const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    attempts.set(ip, recent);
    return true;
  }
  recent.push(now);
  attempts.set(ip, recent);
  // Keep the map small
  if (attempts.size > 5000) {
    for (const [key, times] of attempts) if (times.every((t) => now - t >= RATE_WINDOW_MS)) attempts.delete(key);
  }
  return false;
};

const clientIp = (request: Request): string =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";

/** Plain-text email the client can read at a glance. */
const buildEmail = (data: Enquiry): string => {
  const when = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/London",
  }).format(new Date());

  const lines: string[] = [
    "New website enquiry – Eco Gas",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Postcode: ${data.postcode}`,
    `Service needed: ${data.service || (data.estimate ? "See estimate below" : "Not given")}`,
    `Best time to call: ${data.bestTime}`,
    "",
    "Message:",
    data.message || "(none)",
  ];

  if (data.estimate) {
    lines.push("", "Estimate from the website tool:");
    for (const line of data.estimate.lines) lines.push(`- ${line.qty} × ${line.name}: ${line.price}`);
    lines.push(data.estimate.total);
  }

  lines.push("", `Sent from: ${data.page || "the website"}`, `Time: ${when}`);
  return lines.join("\n");
};

const json = (body: Record<string, unknown>, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return json({ ok: false, error: `That's a lot of enquiries in a short time. Please wait a few minutes, or call ${business.phone}.` }, 429);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: `We couldn't read that. ${CALL_US}` }, 400);
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return json({ ok: false, error: "Please check the highlighted fields.", fields: fieldErrors(parsed.error) }, 400);
  }
  const data = parsed.data;

  // Honeypot: bots fill every field. Pretend it worked and throw it away.
  if (data.company) return json({ ok: true });

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("[enquiry] WEB3FORMS_ACCESS_KEY is not set, enquiry not sent");
    return json({ ok: false, error: `Email sending isn't switched on yet. ${CALL_US}` }, 500);
  }

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "New website enquiry – Eco Gas",
        from_name: "Eco Gas website",
        replyto: data.email,
        name: data.name,
        email: data.email,
        message: buildEmail(data),
      }),
    });
    const result = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };
    if (!response.ok || !result.success) {
      console.error("[enquiry] Web3Forms rejected the enquiry", response.status, result.message);
      return json({ ok: false, error: `We couldn't send that. ${CALL_US}` }, 502);
    }
    return json({ ok: true });
  } catch (error) {
    console.error("[enquiry] Web3Forms request failed", error);
    return json({ ok: false, error: `We couldn't send that. ${CALL_US}` }, 502);
  }
}
