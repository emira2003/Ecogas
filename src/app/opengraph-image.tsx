import { ImageResponse } from "next/og";
import { business } from "@/data/business";

/**
 * The one social-preview image, reused by every page (PLAN.md Part G / Phase 8):
 * dark, the wordmark, "Boiler replacement in Bolton · from £1,999".
 * TODO: swap the wordmark for the client's logo once logo-ecogas.png arrives.
 */
export const alt = "Eco Gas: boiler replacement in Bolton from £1,999";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#262b33",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* pilot flame */}
          <svg width="44" height="64" viewBox="0 0 48 72">
            <path d="M24 6c5 12 16 18 16 34a16 16 0 0 1-32 0c0-8 4-13 8-17 0 6 2 10 6 10 4-5 4-15 2-27z" fill="#f26b21" />
            <path d="M24 30c3 6 8 9 8 16a8 8 0 0 1-16 0c0-4 2-6 4-8 0 3 1 5 3 5 2-3 2-8 1-13z" fill="#ffd68c" />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>{business.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>
            Boiler replacement in Bolton
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                padding: "14px 28px",
                borderRadius: 10,
                background: "#f26b21",
                color: "#1b1f24",
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              <span style={{ fontSize: 30 }}>from</span>
              <span style={{ fontSize: 48, fontWeight: 800 }}>£1,999</span>
            </div>
            <div style={{ fontSize: 32, color: "#cbc9c7" }}>10-year manufacturer’s warranty</div>
          </div>
          <div style={{ fontSize: 28, color: "#cbc9c7" }}>Gas Safe registered · Trading since 2000 · Bolton and the North West</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
