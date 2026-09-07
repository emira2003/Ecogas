import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { DayTimelineMotion } from "./DayTimelineMotion";

interface Stage {
  title: string;
  text: string;
  art: ReactNode;
}

/* Simple stroke drawings. Every path has pathLength=1 so CSS can draw it from nothing. */
const p = (d: string, j: number) => <path key={d} d={d} pathLength={1} style={{ "--j": j } as CSSProperties} />;

const stages: Stage[] = [
  {
    title: "Arrival",
    text: "We arrive at the time we agreed, walk through the job with you and cover the floors where we’ll be working.",
    art: (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        {p("M12 62V38h44l14 14h14a4 4 0 0 1 4 4v6H12z", 0)}
        {p("M56 38v14h14", 1)}
        {p("M22 66a6 6 0 1 0 12 0a6 6 0 1 0-12 0", 2)}
        {p("M66 66a6 6 0 1 0 12 0a6 6 0 1 0-12 0", 3)}
      </svg>
    ),
  },
  {
    title: "Old boiler out",
    text: "Gas and water are isolated, the old boiler is drained and disconnected, and it comes off the wall.",
    art: (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        {p("M22 18h40v52H22z", 0)}
        {p("M34 30h16v8H34z", 1)}
        {p("M30 70v12M42 70v12M54 70v12", 2)}
        {p("M68 44h20", 3)}
        {p("M82 38l6 6-6 6", 4)}
      </svg>
    ),
  },
  {
    title: "New boiler in",
    text: "The new boiler goes on the wall with its flue, pipework, valves and filter, all to the manufacturer’s specification.",
    art: (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        {p("M30 14h40v52H30z", 0)}
        {p("M42 24h16v8H42z", 1)}
        {p("M45 48a5 5 0 1 0 10 0a5 5 0 1 0-10 0", 2)}
        {p("M38 66v18M50 66v18M62 66v18", 3)}
        {p("M50 14V4", 4)}
      </svg>
    ),
  },
  {
    title: "Flushed and tested",
    text: "The system is flushed, filled and pressure-tested, then fired up and checked with a flue gas analyser.",
    art: (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        {p("M18 34h64v40H18z", 0)}
        {p("M28 34v40M38 34v40M48 34v40M58 34v40M68 34v40", 1)}
        {p("M30 24c3-5 6-5 9 0s6 5 9 0s6-5 9 0s6 5 9 0", 2)}
        {p("M18 66h-6M82 66h6", 3)}
      </svg>
    ),
  },
  {
    title: "Handover and warranty",
    text: "We show you the controls, hand over the paperwork and the manufacturer’s warranty details, and leave the place as we found it.",
    art: (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        {p("M30 12h28l14 14v62H30z", 0)}
        {p("M58 12v14h14", 1)}
        {p("M40 40h24M40 50h18", 2)}
        {p("M40 66l8 8 16-18", 3)}
      </svg>
    ),
  },
];

/**
 * "How the day goes" (PLAN.md D3, F2-S3). Boiler Replacement page only. A real sequence,
 * so it is numbered. Desktop: pinned, scrolls sideways, the line draws as you go and each
 * drawing sketches itself in. Mobile: vertical, the line draws downward.
 */
export function DayTimeline() {
  return (
    <Section id="day" bg="plaster" aria-labelledby="day-title" className="timeline">
      <Reveal as="h2" split id="day-title" className="h2">
        How the day goes
      </Reveal>
      <p className="lead mt-4 max-w-xl text-ink-soft">A like-for-like boiler swap, from knock on the door to handover.</p>

      <div className="timeline__viewport mt-10">
        <ol className="timeline__track">
          {stages.map((stage, i) => (
            <li key={stage.title} className="stage">
              <div className="stage__head">
                <span className="stage__num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="h3">{stage.title}</h3>
              </div>
              <div className="stage__art">{stage.art}</div>
              <p className="text-ink-soft">{stage.text}</p>
            </li>
          ))}
        </ol>
      </div>

      <DayTimelineMotion />
    </Section>
  );
}
