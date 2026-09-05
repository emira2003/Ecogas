/**
 * Regenerates src/data/nw-map.ts — the coverage map's land outlines.
 *
 * You only need this if the map window changes, or a covered area is added outside the
 * current frame. The generated file is committed, so a normal build never runs this.
 *
 *   curl -sL -o lad.json https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/eng/lad.json
 *   node scripts/generate-map.mjs lad.json 1.2 map-out.json
 *
 * The source data is Ordnance Survey / ONS Local Authority Districts (December 2013) under the
 * Open Government Licence v3, which requires the attribution shown under the map on the page.
 * See IMAGE-CREDITS.md. The 9.6 MB source file is NOT committed — download it when needed.
 *
 * Output is map-out.json; the town coordinates it prints go into src/data/areas.ts, and the
 * paths are wrapped into src/data/nw-map.ts. Both are committed.
 */

import fs from "node:fs";

// Window over the North West, wide enough to hold every town we cover plus the coast.
const LON0 = -3.28, LON1 = -1.86, LAT0 = 53.20, LAT1 = 53.94;
const W = 600, H = 500;

const merc = (lon, lat) => [
  (lon * Math.PI) / 180,
  Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)),
];

const [mx0, my0] = merc(LON0, LAT0);
const [mx1, my1] = merc(LON1, LAT1);
// Fit while preserving aspect: whichever axis is tighter sets the scale.
const scale = Math.min(W / (mx1 - mx0), H / (my1 - my0));
const offX = (W - (mx1 - mx0) * scale) / 2;
const offY = (H - (my1 - my0) * scale) / 2;

const project = (lon, lat) => {
  const [mx, my] = merc(lon, lat);
  return [(mx - mx0) * scale + offX, H - ((my - my0) * scale + offY)];
};

// Douglas-Peucker, in projected pixels.
const sqSegDist = (p, a, b) => {
  let x = a[0], y = a[1], dx = b[0] - x, dy = b[1] - y;
  if (dx !== 0 || dy !== 0) {
    const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) { x = b[0]; y = b[1]; }
    else if (t > 0) { x += dx * t; y += dy * t; }
  }
  dx = p[0] - x; dy = p[1] - y;
  return dx * dx + dy * dy;
};
const simplify = (pts, tol) => {
  if (pts.length <= 2) return pts;
  const sq = tol * tol;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [first, last] = stack.pop();
    let maxD = 0, idx = -1;
    for (let i = first + 1; i < last; i++) {
      const d = sqSegDist(pts[i], pts[first], pts[last]);
      if (d > maxD) { maxD = d; idx = i; }
    }
    if (maxD > sq && idx > 0) {
      keep[idx] = 1;
      stack.push([first, idx], [idx, last]);
    }
  }
  return pts.filter((_, i) => keep[i]);
};

const inWindow = (lon, lat) => lon >= LON0 - 0.3 && lon <= LON1 + 0.3 && lat >= LAT0 - 0.2 && lat <= LAT1 + 0.2;

// Sutherland-Hodgman against the viewBox. Without this, districts that only clip the corner
// of the frame (Leeds, Sheffield, Lancaster) still contribute their whole outline.
const M = 2;
const clipEdge = (pts, inside, intersect) => {
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    const cur = pts[i], prev = pts[(i + pts.length - 1) % pts.length];
    const cIn = inside(cur), pIn = inside(prev);
    if (cIn) {
      if (!pIn) out.push(intersect(prev, cur));
      out.push(cur);
    } else if (pIn) {
      out.push(intersect(prev, cur));
    }
  }
  return out;
};
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const clipRect = (pts) => {
  let r = pts;
  r = clipEdge(r, (p) => p[0] >= -M, (a, b) => lerp(a, b, (-M - a[0]) / (b[0] - a[0])));
  if (!r.length) return r;
  r = clipEdge(r, (p) => p[0] <= W + M, (a, b) => lerp(a, b, (W + M - a[0]) / (b[0] - a[0])));
  if (!r.length) return r;
  r = clipEdge(r, (p) => p[1] >= -M, (a, b) => lerp(a, b, (-M - a[1]) / (b[1] - a[1])));
  if (!r.length) return r;
  r = clipEdge(r, (p) => p[1] <= H + M, (a, b) => lerp(a, b, (H + M - a[1]) / (b[1] - a[1])));
  return r;
};
const areaOf = (pts) => {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return Math.abs(a) / 2;
};

const geo = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const TOL = Number(process.argv[3] ?? 0.7);

const paths = [];
let kept = 0;
for (const f of geo.features) {
  const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
  const rings = [];
  for (const poly of polys) {
    for (const ring of poly) {
      // Keep a ring only if some of it falls inside the window.
      if (!ring.some(([lon, lat]) => inWindow(lon, lat))) continue;
      const clipped = clipRect(ring.map(([lon, lat]) => project(lon, lat)));
      if (clipped.length < 4 || areaOf(clipped) < 12) continue;
      const pts = simplify(clipped, TOL);
      if (pts.length < 4) continue;
      rings.push(pts);
    }
  }
  if (!rings.length) continue;
  kept++;
  const d = rings
    .map((r) => "M" + r.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L") + "Z")
    .join("");
  paths.push({ name: f.properties.LAD13NM, d });
}

const towns = {
  bolton: [-2.4282, 53.5769],
  manchester: [-2.2426, 53.4808],
  blackburn: [-2.487, 53.7486],
  oldham: [-2.1114, 53.5409],
  stockport: [-2.1575, 53.4106],
  warrington: [-2.597, 53.39],
  wigan: [-2.6318, 53.545],
  liverpool: [-2.9916, 53.4084],
  preston: [-2.7031, 53.7632],
};

const projected = Object.fromEntries(
  Object.entries(towns).map(([k, [lon, lat]]) => {
    const [x, y] = project(lon, lat);
    return [k, { x: +x.toFixed(0), y: +y.toFixed(0) }];
  }),
);

const total = paths.reduce((n, p) => n + p.d.length, 0);
console.log(`districts kept: ${kept}, path chars: ${total}`);
console.log(paths.map((p) => p.name).join(", "));
console.log(JSON.stringify(projected, null, 1));
fs.writeFileSync(process.argv[4] ?? "map-out.json", JSON.stringify({ paths, towns: projected }, null, 1));
