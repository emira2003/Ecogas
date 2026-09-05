import { Check } from "lucide-react";

export type Step = 1 | 2 | 3;

const STEPS: { n: Step; label: string }[] = [
  { n: 1, label: "Choose" },
  { n: 2, label: "Pick jobs" },
  { n: 3, label: "Your estimate" },
];

/** "1 Choose · 2 Pick jobs · 3 Your estimate" — a real sequence, so numbered (PLAN.md D4). */
export function Stepper({ current }: { current: Step }) {
  return (
    <ol className="stepper" aria-label="Estimate steps">
      {STEPS.map(({ n, label }) => {
        const state = n < current ? "done" : n === current ? "current" : "todo";
        return (
          <li key={n} className={`stepper__step stepper__step--${state}`} aria-current={state === "current" ? "step" : undefined}>
            <span className="stepper__dot" aria-hidden="true">
              <span className="stepper__fill" />
              <span className="stepper__num">{state === "done" ? <Check size={14} strokeWidth={3} /> : n}</span>
            </span>
            <span>
              <span className="sr-only">
                Step {n}
                {state === "done" ? ", completed" : state === "current" ? ", current step" : ""}:{" "}
              </span>
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
