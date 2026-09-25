import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/data/business";
import { breadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Eco Gas" },
  description: "How Eco Gas uses the details you give us when you call, WhatsApp or email, how long we keep them, and your rights.",
  alternates: { canonical: "/privacy-policy" },
};

/** Update this when the policy changes. */
const LAST_UPDATED = "25 September 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Privacy policy", path: "/privacy-policy" }])]} />
      <Section bg="plaster" padding="compact" className="pt-12 lg:pt-20">
        <h1 className="h1 max-w-3xl">Privacy policy</h1>
        <p className="mt-4 text-ink-soft">Last updated {LAST_UPDATED}</p>
      </Section>

      <Section>
        <div className="prose-eco max-w-[70ch]">
          <h2 className="h3">Who we are</h2>
          <p>
            {business.name}, {business.address.full}. We are the “data controller” for any personal details you give us.
            You can reach us on {business.phone} or at {business.email}.
          </p>

          <h2 className="h3">What we collect</h2>
          <p>
            This website has no forms, and nothing is collected from you just by visiting it. The instant estimate tool
            works entirely in your browser: nothing you pick is sent to us unless you choose to send it on WhatsApp.
            When you call, WhatsApp or email us, we have the details you choose to give us, usually your name, phone
            number, address and what the job is.
          </p>

          <h2 className="h3">Why we collect it</h2>
          <p>
            To reply to your enquiry, give you a price and, if you go ahead, do the work. That is the only reason. We
            don’t use your details for marketing and we never sell or share them for anyone else’s purposes.
          </p>

          <h2 className="h3">How long we keep it</h2>
          <p>
            Only as long as we need them to answer your enquiry, unless you become a customer, in which case the details
            we need for your job, warranty and any legal record (such as a gas safety certificate) are kept for as long
            as those require.
          </p>

          <h2 className="h3">Who handles it for us</h2>
          <ul>
            <li>
              <strong>WhatsApp</strong> carries any message you send us there, under WhatsApp’s own privacy policy.
            </li>
            <li>
              <strong>Vercel</strong> hosts this website and provides simple visitor statistics that do not use cookies
              and cannot identify you.
            </li>
            <li>
              <strong>Google</strong> provides our email and the map on our contact page. When that map loads, Google may set its own
              cookies under Google’s privacy policy. The rest of the site sets no tracking cookies, so there is no cookie
              banner.
            </li>
          </ul>

          <h2 className="h3">Your rights</h2>
          <p>
            Under UK GDPR you can ask to see the personal details we hold about you, ask us to correct or delete them,
            or object to how we use them. Email {business.email} or call {business.phone} and we’ll deal with it promptly.
            If you’re unhappy with how we’ve handled your details, you can complain to the Information Commissioner’s
            Office at ico.org.uk.
          </p>

          <h2 className="h3">Contact</h2>
          <p>
            Questions about this policy: {business.email}, {business.phone}, or write to {business.name},{" "}
            {business.address.full}.
          </p>
          <p>
            <Link href="/contact" className="font-semibold text-ember underline underline-offset-4">
              Contact page
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
