"use client";

import { useEffect, useState } from "react";

/**
 * TEMPORARY. Delete this file and its use in layout.tsx once the iPhone header question is
 * settled. It renders nothing unless the address ends in `?diag=1`.
 *
 * It measures the real header on the real device, because the preview used during development
 * has no notch, no collapsing address bar and no pinch zoom, and reports zero for all of them.
 */
const STAMP = "stacking-fix";

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

    const read = () => {
      const header = document.querySelector("header");
      const r = header?.getBoundingClientRect();
      const cs = header ? getComputedStyle(header) : null;
      const probeCs = getComputedStyle(probe);
      const vv = window.visualViewport;
      setRows([
        ["build", STAMP],
        ["header position", cs?.position ?? "?"],
        ["header top", r ? `${Math.round(r.top)}px` : "?"],
        ["GAP ABOVE BAR", r ? `${Math.round(Math.max(0, r.top))}px` : "?"],
        ["safe-area top", probeCs.paddingTop],
        ["scrollY", `${Math.round(window.scrollY)}px`],
        ["window height", `${window.innerHeight}px`],
        ["visual vp height", vv ? `${Math.round(vv.height)}px` : "n/a"],
        ["visual vp offsetTop", vv ? `${Math.round(vv.offsetTop)}px` : "n/a"],
        ["ZOOM (should be 1.00)", vv ? vv.scale.toFixed(2) : "n/a"],
      ]);
    };

    read();
    const opts = { passive: true } as const;
    window.addEventListener("scroll", read, opts);
    window.addEventListener("resize", read);
    window.visualViewport?.addEventListener("resize", read);
    window.visualViewport?.addEventListener("scroll", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
      window.visualViewport?.removeEventListener("resize", read);
      window.visualViewport?.removeEventListener("scroll", read);
      probe.remove();
    };
  }, []);

  if (!on) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 8,
        bottom: 8,
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
