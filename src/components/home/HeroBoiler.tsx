import type { CSSProperties } from "react";
import { business } from "@/data/business";

/**
 * The hero's right-hand side: a new boiler on the wall, drawn, with the makes we fit shown
 * where makes really appear, on the equipment itself.
 *
 * The boiler's badge turns through the three boiler makes and the wall thermostat beside it
 * through the two makers of controls, each in the maker's own colours on white casing, which
 * is the ground those marks were designed for. Beneath the boiler the copper pipework drops
 * away with a magnetic filter on the return, the one piece of kit in every package, and fades
 * into the band. The names underneath light up in step with the badges and are the real,
 * readable list; the drawing itself is decorative.
 *
 * Pure SVG and CSS: no photograph, no JavaScript. The badges change by opacity alone, so
 * nothing moves or resizes. With reduced motion the first make of each kind simply stays up.
 */
const BADGE = { cx: 180, cy: 150, w: 150 };
const DIAL = { cx: 350, cy: 214, w: 64, h: 40 };

export function HeroBoiler() {
  const boilers = business.brands.filter((b) => b.kind === "boiler" && b.logo);
  const controls = business.brands.filter((b) => b.kind === "controls" && b.logo);

  return (
    <div className="hero-boiler">
      <svg viewBox="0 0 400 520" className="hero-boiler__svg" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="hb-casing" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f2f4f6" />
            <stop offset="1" stopColor="#d5dbe2" />
          </linearGradient>
          <linearGradient id="hb-sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="0.18" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.85" stopColor="#1a212c" stopOpacity="0" />
            <stop offset="1" stopColor="#1a212c" stopOpacity="0.14" />
          </linearGradient>
          <radialGradient id="hb-warm" cx="0.1" cy="0.05" r="0.9">
            <stop offset="0" stopColor="#f36f21" stopOpacity="0.14" />
            <stop offset="0.6" stopColor="#f36f21" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hb-flue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#c9cfd6" />
            <stop offset="0.35" stopColor="#f4f6f8" />
            <stop offset="1" stopColor="#b9c0c8" />
          </linearGradient>
          <linearGradient id="hb-copper" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#9c5530" />
            <stop offset="0.4" stopColor="#e9a06c" />
            <stop offset="0.7" stopColor="#c47444" />
            <stop offset="1" stopColor="#8a4a28" />
          </linearGradient>
          <linearGradient id="hb-dial" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f7f8fa" />
            <stop offset="1" stopColor="#d9dee5" />
          </linearGradient>
          {/* The pipework fades out into the band rather than stopping at an edge */}
          <linearGradient id="hb-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.55" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="hb-pipes-mask" maskUnits="userSpaceOnUse" x="0" y="360" width="400" height="160">
            <rect x="0" y="360" width="400" height="160" fill="url(#hb-fade)" />
          </mask>
        </defs>

        {/* Flue, rising out of the top of the frame */}
        <g className="hero-boiler__flue">
          <rect x="161" y="-10" width="38" height="84" fill="url(#hb-flue)" />
          <rect x="156" y="56" width="48" height="12" rx="3" fill="url(#hb-flue)" />
        </g>

        {/* Pipework and the magnetic filter */}
        <g mask="url(#hb-pipes-mask)">
          {[112, 138, 164, 196, 250].map((x) => (
            <rect key={x} x={x} y="362" width="9" height="158" rx="2" fill="url(#hb-copper)" />
          ))}
          {[112, 138, 164, 196].map((x) => (
            <rect key={`v${x}`} x={x - 3} y="392" width="15" height="10" rx="2" fill="#2a323d" />
          ))}
          <rect x="239" y="404" width="31" height="54" rx="8" fill="#1b2129" />
          <rect x="239" y="420" width="31" height="6" fill="#3a4452" />
          <rect x="248" y="396" width="13" height="10" rx="2" fill="#2a323d" />
        </g>

        {/* The boiler */}
        <g className="hero-boiler__body">
          <rect x="70" y="68" width="220" height="300" rx="20" fill="url(#hb-casing)" />
          <rect x="70" y="68" width="220" height="300" rx="20" fill="url(#hb-sheen)" />
          <rect x="70" y="68" width="220" height="300" rx="20" fill="url(#hb-warm)" />
          {/* Seam between the front and the lower cover */}
          <path d="M72 300 H288" stroke="#1a212c" strokeOpacity="0.1" strokeWidth="1.5" />
          <rect x="70" y="68" width="220" height="300" rx="20" fill="none" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1" />

          {/* Control fascia */}
          <rect x="112" y="246" width="136" height="38" rx="9" fill="#1f2733" />
          <rect x="122" y="254" width="58" height="22" rx="4" fill="#0e1319" />
          <text x="151" y="270" textAnchor="middle" className="hero-boiler__lcd">
            60°
          </text>
          {[196, 211, 226].map((x) => (
            <circle key={x} cx={x} cy="265" r="4.5" fill="#3a4452" />
          ))}
          <circle cx="240" cy="265" r="2.5" className="hero-boiler__led" />

          {/* The badge: the boiler makes, one after another */}
          {boilers.map((b, i) => {
            const h = Math.round(b.logoHeight * 0.62);
            return (
              <image
                key={b.name}
                href={b.logo ?? undefined}
                x={BADGE.cx - BADGE.w / 2}
                y={BADGE.cy - h / 2}
                width={BADGE.w}
                height={h}
                preserveAspectRatio="xMidYMid meet"
                className="hero-boiler__logo"
                data-first={i === 0 ? "" : undefined}
                style={{ "--i": i } as CSSProperties}
              />
            );
          })}
        </g>

        {/* Wall thermostat, with the makers of controls */}
        <g className="hero-boiler__body">
          <circle cx={DIAL.cx} cy={DIAL.cy} r="44" fill="url(#hb-dial)" />
          <circle cx={DIAL.cx} cy={DIAL.cy} r="37" fill="none" stroke="#1a212c" strokeOpacity="0.1" />
          {controls.map((b, i) => (
            <image
              key={b.name}
              href={b.logo ?? undefined}
              x={DIAL.cx - DIAL.w / 2}
              y={DIAL.cy - DIAL.h / 2}
              width={DIAL.w}
              height={DIAL.h}
              preserveAspectRatio="xMidYMid meet"
              className="hero-boiler__logo hero-boiler__logo--controls"
              data-first={i === 0 ? "" : undefined}
              style={{ "--i": i } as CSSProperties}
            />
          ))}
        </g>
      </svg>

      {/* The real list. Each name lights up while its badge is showing. */}
      <div className="hero-boiler__makes">
        <p>
          <span className="hero-boiler__kind">Boilers</span>
          {boilers.map((b, i) => (
            <span key={b.name} className="hero-boiler__name" style={{ "--i": i } as CSSProperties}>
              {b.name}
            </span>
          ))}
        </p>
        <p>
          <span className="hero-boiler__kind">Controls</span>
          {controls.map((b, i) => (
            <span key={b.name} className="hero-boiler__name hero-boiler__name--controls" style={{ "--i": i } as CSSProperties}>
              {b.name}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
