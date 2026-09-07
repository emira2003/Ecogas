/**
 * Unit tests for the estimate maths. Run with `npm test`.
 * Uses Node's built-in test runner, so there is nothing extra to install.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { EstimateItem } from "@/data/estimate-catalogue";
import {
  calculateTotal,
  clampQty,
  formatLine,
  formatTotal,
  isCategoryId,
  lineFor,
  linesFrom,
  sanitizeSelections,
  totalKind,
} from "./estimate";

const fixed: EstimateItem = { id: "t-fixed", name: "Service", description: "", priceType: "fixed", price: 90 };
const from: EstimateItem = { id: "t-from", name: "Flush", description: "", priceType: "from", price: 350 };
const range: EstimateItem = { id: "t-range", name: "Repair", description: "", priceType: "range", min: 150, max: 300 };
const each: EstimateItem = { id: "t-each", name: "Radiator", description: "", priceType: "from", price: 180, unit: "each" };

describe("totalKind", () => {
  it("is 'total' when every job is a fixed price", () => {
    assert.equal(totalKind(["fixed", "fixed"]), "total");
  });
  it("is 'from' when any job is a from-price", () => {
    assert.equal(totalKind(["fixed", "from"]), "from");
  });
  it("is 'range' when any job is a range, even alongside from-prices", () => {
    assert.equal(totalKind(["from", "range", "fixed"]), "range");
  });
});

describe("calculateTotal", () => {
  it("adds fixed prices to an exact total", () => {
    const total = calculateTotal([lineFor(fixed, 1), lineFor(fixed, 1)]);
    assert.deepEqual(total, { kind: "total", low: 180, high: 180 });
    assert.equal(formatTotal(total), "Estimated total £180");
  });
  it("gives a from-total when a from-price is included", () => {
    const total = calculateTotal([lineFor(fixed, 1), lineFor(from, 1)]);
    assert.deepEqual(total, { kind: "from", low: 440, high: 440 });
    assert.equal(formatTotal(total), "Estimated from £440");
  });
  it("gives a low to high range when a range is included", () => {
    const total = calculateTotal([lineFor(fixed, 1), lineFor(range, 1)]);
    assert.deepEqual(total, { kind: "range", low: 240, high: 390 });
    assert.equal(formatTotal(total), "Estimated £240 to £390");
  });
  it("is zero with nothing picked", () => {
    assert.deepEqual(calculateTotal([]), { kind: "total", low: 0, high: 0 });
  });
  it("formats thousands with a comma", () => {
    const boiler: EstimateItem = { id: "b", name: "Boiler", description: "", priceType: "from", price: 1999 };
    assert.equal(formatTotal(calculateTotal([lineFor(boiler, 1)])), "Estimated from £1,999");
  });
});

describe("quantities", () => {
  it("multiplies 'each' items by the quantity", () => {
    const line = lineFor(each, 3);
    assert.equal(line.qty, 3);
    assert.equal(line.low, 540);
    assert.equal(formatLine(line), "from £540");
  });
  it("ignores quantity for whole-job items", () => {
    const line = lineFor(fixed, 5);
    assert.equal(line.qty, 1);
    assert.equal(line.low, 90);
  });
  it("clamps quantity to 1-10", () => {
    assert.equal(clampQty(0), 1);
    assert.equal(clampQty(11), 10);
    assert.equal(clampQty(4.6), 5);
    assert.equal(clampQty(Number.NaN), 1);
  });
  it("multiplies ranges by quantity", () => {
    const rangeEach: EstimateItem = { ...range, unit: "each" };
    const line = lineFor(rangeEach, 2);
    assert.equal(formatLine(line), "£300 to £600");
  });
});

describe("real catalogue", () => {
  it("prices the boiler offer at from £1,999", () => {
    const lines = linesFrom({ "new-combi-boiler": 1 });
    assert.equal(lines.length, 1);
    assert.equal(formatTotal(calculateTotal(lines)), "Estimated from £1,999");
  });
  it("ignores ids that are not in the catalogue", () => {
    const lines = linesFrom({ "not-a-real-job": 1, "annual-boiler-service": 1 });
    assert.equal(lines.length, 1);
    assert.equal(lines[0].item.id, "annual-boiler-service");
  });
  it("cleans up saved selections", () => {
    const clean = sanitizeSelections({ "radiator-replacement": 99, "annual-boiler-service": 7, junk: 1, nope: "x" });
    assert.deepEqual(clean, { "radiator-replacement": 10, "annual-boiler-service": 1 });
    assert.deepEqual(sanitizeSelections(null), {});
    assert.deepEqual(sanitizeSelections("nonsense"), {});
  });
  it("recognises category ids from the URL", () => {
    assert.equal(isCategoryId("boilers"), true);
    assert.equal(isCategoryId("gas-safety"), true);
    assert.equal(isCategoryId("kitchens"), false);
    assert.equal(isCategoryId(null), false);
  });
});
