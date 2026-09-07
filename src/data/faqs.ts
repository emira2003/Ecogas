/**
 * Home page FAQs.
 *
 * To add one: copy a block, give it a new unique `id`, write the question and answer.
 * Keep answers short and specific. Anything in [SQUARE BRACKETS] needs the client. See TODO.md.
 */
import { business } from "./business";

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const homeFaqs: Faq[] = [
  {
    id: "how-long",
    question: "How long does a boiler replacement take?",
    answer:
      "A like-for-like swap is usually done in a day. Moving the boiler or changing the type of system can take two. We tell you exactly how long when we confirm your price.",
  },
  {
    id: "gas-safe",
    question: "Are you Gas Safe registered?",
    answer: `Yes. Our registration number is ${business.gasSafeNumber}. You can check us on the Gas Safe Register website.`,
  },
  {
    id: "warranty",
    question: "What warranty do I get on a new boiler?",
    answer:
      "Up to a 10-year manufacturer’s warranty on the boilers we fit [CONFIRM the £1,999 offer always includes 10 years].",
  },
  {
    id: "areas",
    question: "Which areas do you cover?",
    answer:
      "Based in Bolton, covering Greater Manchester, Lancashire, Merseyside and Cheshire: the Bolton, Manchester, Blackburn, Oldham, Stockport, Warrington, Wigan, Liverpool and Preston postcode areas.",
  },
  {
    id: "estimate",
    question: "How does the instant estimate work?",
    answer:
      "Pick your job from the list and you’ll see our typical price straight away. It’s an estimate, not a bill: we confirm the exact price once we’ve seen the job, and there’s no obligation.",
  },
  {
    id: "payment",
    question: "How do I pay?",
    answer:
      "[CLIENT TO CONFIRM - e.g. bank transfer or card on completion; deposit for boiler installs?]",
  },
];
