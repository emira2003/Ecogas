"use client";

import { useEffect, useState } from "react";

/**
 * TEMPORARY. Delete this file and its use in layout.tsx once the iPhone header question is
 * settled. It renders nothing unless the address ends in `?diag=1`.
 *
 * It measures the real header on the real device, because the preview used during development
 * has no notch, no collapsing address bar and no pinch zoom, and reports zero for all of them.
 */
const STAMP = "grain-z45";

/**
 * Whether Safari (iOS 26 and later) would accept the header as the element that colours the
 * strip behind the clock. Mirrors the checks in WebKit's `fixedContainerEdges`. Returns "yes"
 * or the first reason it would be turned down.
 */
function headerCandidate(header: Element | null): string {
  if (!header) return "no header";
  const r = header.getBoundingClientRect();
  const cs = getComputedStyle(header);
  if (cs.position !== "sticky" && cs.position !== "fixed") return `position ${cs.position}`;
  if (r.width < (window.innerWidth - 8) * 0.9) return "narrower than 90% of screen";
  if (r.height <= 10) return "10px tall or less";
  if (Number(cs.opacity) < 0.1) return "opacity under 0.1";
  const filter = cs.getPropertyValue("backdrop-filter") || cs.getPropertyValue("-webkit-backdrop-filter");
  if (filter && filter !== "none") return "has backdrop-filter";
  const bg = cs.backgroundColor;
  if (bg === "transparent" || /,\s*0\)$/.test(bg)) return "no background colour";
  if (/^rgba\(/.test(bg)) return `background not opaque: ${bg}`;
  return "yes";
}

export function HeaderDiagnostic() {
  const [rows, setRows] = useState<[string, string][]>([]);
  const on = rows.length > 0;

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("diag")) return;

    const probe = document.createElement("div");
    probe.style.cssText =
      "position:fixed;top:0;left:0;width:0;height:0;pointer-events:none;" +
      "padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom);";
    document.body.appendChild(probe);

    // Scroll events on iOS are coarse and stop firing mid-flick, so the worst moment was
    // never being caught. Sampling every frame and keeping the high-water mark does catch it.
    let worstGap = 0;
    let worstOffset = 0;
    let frame = 0;
    // Redrawing the panel every frame would itself cost enough to change what is being
    // measured. Measure every frame, repaint the numbers four times a second.
    let lastPaint = 0;
    let rowsPainted = false;

    const read = () => {
      const header = document.querySelector("header");
      const r = header?.getBoundingClientRect();
      const cs = header ? getComputedStyle(header) : null;
      const probeCs = getComputedStyle(probe);
      const vv = window.visualViewport;
      if (r) worstGap = Math.max(worstGap, r.top);
      if (vv) worstOffset = Math.max(worstOffset, vv.offsetTop);
      const now = performance.now();
      if (now - lastPaint < 250 && rowsPainted) {
        frame = requestAnimationFrame(read);
        return;
      }
      lastPaint = now;
      rowsPainted = true;

      // The decisive facts for the strip behind the clock. JavaScript cannot read the colour
      // Safari paints there, so these report the conditions for it instead: the pass or fail
      // itself is what you see on the phone.
      const ua = navigator.userAgent;
      const version = ua.match(/Version\/(\d+\.\d+)/)?.[1];
      const otherBrowser = /CriOS|FxiOS|EdgiOS/.test(ua);
      const standalone =
        (navigator as Navigator & { standalone?: boolean }).standalone === true ||
        window.matchMedia("(display-mode: standalone)").matches;
      const grain = getComputedStyle(document.body, "::after");
      const grainZ = Number.parseInt(grain.zIndex, 10);
      const headerZ = cs ? Number.parseInt(cs.zIndex, 10) : NaN;
      const grainFixed = grain.position === "fixed" && grain.display !== "none";
      const grainVerdict = !grainFixed
        ? "not fixed, OK"
        : grainZ < headerZ
          ? `z ${grainZ} under header ${headerZ}, OK`
          : `z ${grainZ} OVER header ${headerZ}, BLOCKS`;
      const overflowX = document.documentElement.scrollWidth - window.innerWidth;

      setRows([
        ["build", STAMP],
        ["safari", otherBrowser ? "not Safari" : version ? `${version} (strip rule: 26+)` : "?"],
        ["mode", standalone ? "home-screen app" : "safari tab"],
        ["GRAIN vs HEADER", grainVerdict],
        ["header qualifies", headerCandidate(header)],
        ["sideways overflow", overflowX > 0 ? `${overflowX}px (should be 0)` : "0px"],
        ["header position", cs?.position ?? "?"],
        ["header top", r ? `${Math.round(r.top)}px` : "?"],
        ["WORST GAP SEEN", `${Math.round(worstGap)}px`],
        ["safe-area top", probeCs.paddingTop],
        ["scrollY", `${Math.round(window.scrollY)}px`],
        ["window height", `${window.innerHeight}px`],
        ["visual vp height", vv ? `${Math.round(vv.height)}px` : "n/a"],
        ["visual vp offsetTop", vv ? `${Math.round(vv.offsetTop)}px` : "n/a"],
        ["worst vp offsetTop", `${Math.round(worstOffset)}px`],
        ["ZOOM (should be 1.00)", vv ? vv.scale.toFixed(2) : "n/a"],
      ]);
      frame = requestAnimationFrame(read);
    };

    read();
    return () => {
      cancelAnimationFrame(frame);
      probe.remove();
    };
  }, []);

  if (!on) return null;

  // Kept clear of the top and bottom edges of the screen on purpose. Safari tests a point 4px
  // inside each of those edges to pick the colour for its own bars, and ignores
  // `pointer-events` when it does, so a panel sitting on one would change what it measures.
  return (
    <div
      style={{
        position: "fixed",
        left: 8,
        bottom: 16,
        zIndex: 9999,
        background: "rgba(0,0,0,0.88)",
        color: "#fff",
        font: "12px/1.45 ui-monospace, monospace",
        padding: "10px 12px",
        borderRadius: 8,
        pointerEvents: "none",
        minWidth: 230,
      }}
    >
      {rows.map(([k, v]) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <span style={{ opacity: 0.65 }}>{k}</span>
          <strong>{v}</strong>
        </div>
      ))}
    </div>
  );
}
