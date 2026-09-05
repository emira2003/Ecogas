"use client";

import { useEffect, useRef, useState } from "react";
import { estimateCatalogue, findEstimateCategory, type EstimateCategoryId } from "@/data/estimate-catalogue";
import {
  calculateTotal,
  clampQty,
  formatLine,
  formatTotal,
  isCategoryId,
  linesFrom,
  sanitizeSelections,
  type Selections,
} from "@/lib/estimate";
import { prefersReducedMotion } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { CategoryCard } from "./CategoryCard";
import { EnquiryForm } from "./EnquiryForm";
import { EstimateSummary } from "./EstimateSummary";
import { JobRow } from "./JobRow";
import { RunningTotal } from "./RunningTotal";
import { Stepper, type Step } from "./Stepper";

const STORAGE_KEY = "eg-estimate";
const STEP_MS = 250;

interface WizardState {
  step: Step;
  category: EstimateCategoryId | null;
  selections: Selections;
  somethingElse: boolean;
}

type Phase = "idle" | "out" | "in";
type Direction = "forward" | "back";

const FRESH: WizardState = { step: 1, category: null, selections: {}, somethingElse: false };

/** Restore from this session, then let a ?cat= link override the category (PLAN.md D4 rules). Browser only. */
const restoredState = (): WizardState => {
  let saved: Partial<WizardState> = {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) saved = JSON.parse(raw) as Partial<WizardState>;
  } catch {
    /* nothing saved, or storage blocked — start fresh */
  }
  const linkCat = new URLSearchParams(window.location.search).get("cat");
  const savedCat = isCategoryId(saved.category) ? saved.category : null;
  const category = isCategoryId(linkCat) ? linkCat : savedCat;
  const selections = sanitizeSelections(saved.selections);
  const somethingElse = saved.somethingElse === true;

  let step: Step = saved.step === 2 || saved.step === 3 ? saved.step : 1;
  if (isCategoryId(linkCat) && linkCat !== savedCat) step = 2; // deep link skips to Step 2
  if (step === 2 && !category) step = 1;
  if (step === 3 && !somethingElse && Object.keys(selections).length === 0) step = 1;

  return { step, category, selections, somethingElse };
};

export function EstimateWizardInner() {
  // Step 1 renders on the server; saved progress / ?cat= is applied once running in the browser
  const [state, setState] = useState<WizardState>(FRESH);
  const [shown, setShown] = useState<{ step: Step; phase: Phase; dir: Direction }>({
    step: 1,
    phase: "idle",
    dir: "forward",
  });
  const [showForm, setShowForm] = useState(false);
  const [restored, setRestored] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const focusedStep = useRef<Step>(1);

  // Restore saved progress or a deep link (reads storage now, applies right after this render)
  useEffect(() => {
    const saved = restoredState();
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setState(saved);
      setRestored(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Remember everything for the session and keep ?cat= in the URL in step with the choice
  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage blocked — the tool still works, it just won't survive a refresh */
    }
    const url = new URL(window.location.href);
    if (state.category) url.searchParams.set("cat", state.category);
    else url.searchParams.delete("cat");
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, "", url);
  }, [state, restored]);

  // Step change: current panel slides out, the next slides in (F2-E2)
  useEffect(() => {
    if (state.step === shown.step) return;
    const dir: Direction = state.step > shown.step ? "forward" : "back";
    if (prefersReducedMotion()) {
      const id = requestAnimationFrame(() => setShown({ step: state.step, phase: "idle", dir }));
      return () => cancelAnimationFrame(id);
    }
    const raf = requestAnimationFrame(() => setShown((s) => ({ ...s, phase: "out", dir })));
    const t1 = window.setTimeout(() => setShown({ step: state.step, phase: "in", dir }), STEP_MS);
    const t2 = window.setTimeout(() => setShown((s) => ({ ...s, phase: "idle" })), STEP_MS * 2 + 20);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [state.step, shown.step]);

  // Announce each new step by moving focus to its heading
  useEffect(() => {
    if (focusedStep.current === shown.step) return;
    focusedStep.current = shown.step;
    headingRef.current?.focus();
  }, [shown.step]);

  // When the visitor asks to send the quote, bring the hand-off panel into view
  useEffect(() => {
    if (!showForm) return;
    const id = requestAnimationFrame(() => formRef.current?.scrollIntoView({ block: "start", behavior: "smooth" }));
    return () => cancelAnimationFrame(id);
  }, [showForm]);

  const lines = linesFrom(state.selections);
  const total = calculateTotal(lines);
  const count = lines.length;
  const category = state.category ? findEstimateCategory(state.category) : undefined;

  const choose = (id: EstimateCategoryId) => setState((s) => ({ ...s, category: id, step: 2 }));
  const toggle = (id: string) =>
    setState((s) => {
      const selections = { ...s.selections };
      if (selections[id]) delete selections[id];
      else selections[id] = 1;
      return { ...s, selections };
    });
  const setQty = (id: string, delta: 1 | -1) =>
    setState((s) => ({ ...s, selections: { ...s.selections, [id]: clampQty((s.selections[id] ?? 1) + delta) } }));
  const anotherCategory = () => setState((s) => ({ ...s, step: 1 }));
  const somethingElse = () => {
    setShowForm(true);
    setState((s) => ({ ...s, somethingElse: true, step: 3 }));
  };
  const seeEstimate = () => {
    setShowForm(false);
    setState((s) => ({ ...s, somethingElse: false, step: 3 }));
  };
  const back = () => setState((s) => ({ ...s, step: s.step === 3 && s.category ? 2 : 1 }));
  const startAgain = () => {
    setShowForm(false);
    setState({ step: 1, category: null, selections: {}, somethingElse: false });
  };

  const panelClass =
    shown.phase === "out" ? `step-panel--out-${shown.dir}` : shown.phase === "in" ? `step-panel--in-${shown.dir}` : "";

  const pickedIn = (id: EstimateCategoryId) =>
    lines.filter((l) => findEstimateCategory(id)?.items.some((i) => i.id === l.item.id)).length;

  return (
    <div className="wizard">
      <Stepper current={shown.step} />

      <div className={`step-panel mt-8 ${panelClass}`.trim()}>
        {shown.step === 1 ? (
          <section aria-labelledby="step-heading">
            <h2 id="step-heading" ref={headingRef} tabIndex={-1} className="h2 outline-none">
              What do you need help with?
            </h2>
            {count > 0 ? (
              <p className="mt-3 text-ink-soft">
                You’ve picked {count} {count === 1 ? "job" : "jobs"} so far. They stay in your estimate while you add
                more.
              </p>
            ) : null}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {estimateCatalogue.map((c) => (
                <CategoryCard key={c.id} category={c} pickedCount={pickedIn(c.id)} onSelect={choose} />
              ))}
            </div>
            {count > 0 ? (
              <div className="mt-8">
                <Button onClick={seeEstimate}>See my estimate</Button>
              </div>
            ) : null}
          </section>
        ) : null}

        {shown.step === 2 && category ? (
          <section aria-labelledby="step-heading">
            <h2 id="step-heading" ref={headingRef} tabIndex={-1} className="h2 outline-none">
              Pick the jobs you need
            </h2>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-3 text-ink-soft">
              <span>
                <span className="font-semibold text-ink">{category.name}</span>: {category.tagline}
              </span>
              <button type="button" className="font-semibold text-ember underline underline-offset-4" onClick={anotherCategory}>
                Change
              </button>
            </p>

            <ul className="mt-6 border-t border-line" aria-label={`Jobs in ${category.name}`}>
              {category.items.map((item) => (
                <JobRow
                  key={item.id}
                  item={item}
                  checked={Boolean(state.selections[item.id])}
                  qty={state.selections[item.id] ?? 1}
                  onToggle={toggle}
                  onQty={setQty}
                />
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button variant="secondary" onClick={anotherCategory} magnetic={false}>
                Add jobs from another category
              </Button>
              <Button variant="ghost" onClick={somethingElse} magnetic={false}>
                Something else / not sure
              </Button>
            </div>

            <RunningTotal total={total} count={count} onBack={back} onSee={seeEstimate} />
          </section>
        ) : null}

        {shown.step === 3 ? (
          <section aria-labelledby="step-heading">
            <h2 id="step-heading" ref={headingRef} tabIndex={-1} className="h2 outline-none">
              {state.somethingElse ? "Tell us what you need" : "Your estimate"}
            </h2>

            {state.somethingElse ? (
              <div className="mt-4 max-w-2xl">
                <p className="lead text-ink-soft">
                  No problem. Describe the job in your own words and we’ll come back to you with a price. If it’s
                  quicker, call or WhatsApp us.
                </p>
                {count > 0 ? (
                  <p className="mt-4 text-ink-soft">
                    The {count} {count === 1 ? "job" : "jobs"} you’ve already picked will come with your message.
                  </p>
                ) : null}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button variant="ghost" onClick={back} magnetic={false}>
                    Back
                  </Button>
                  <Button variant="ghost" onClick={startAgain} magnetic={false}>
                    Start again
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-6">
                <EstimateSummary lines={lines} total={total} onSend={() => setShowForm(true)} onStartAgain={startAgain} />
              </div>
            )}

            {showForm ? (
              <div ref={formRef} id="enquiry" className="mt-10 rounded-lg border border-ink bg-plaster p-6 sm:p-8">
                <h3 className="h3">{state.somethingElse ? "Send us your enquiry" : "Send us this estimate"}</h3>
                <p className="mt-2 max-w-xl text-ink-soft">
                  {state.somethingElse
                    ? "Your details and your message, and we’ll call you back with a price."
                    : "Your details and the jobs above, and we’ll call you back to confirm the price."}
                </p>
                <EnquiryForm
                  mode="estimate"
                  page="/estimate"
                  className="mt-6"
                  messagePrompt={state.somethingElse ? "Describe the job" : "Anything else we should know?"}
                  estimate={
                    count > 0
                      ? {
                          lines: lines.map((l) => ({ name: l.item.name, qty: l.qty, price: formatLine(l) })),
                          total: formatTotal(total),
                        }
                      : undefined
                  }
                />
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </div>
  );
}
