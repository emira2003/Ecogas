/**
 * House style: this site does not use em dashes. Run with `npm test`.
 *
 * Xhezmi asked for them gone and to stay gone, so this fails the build rather than relying on
 * anyone remembering. If it trips, rewrite the sentence: a colon, a comma or a full stop is
 * almost always clearer anyway. Do not "fix" it by pasting a hyphen into the middle of prose.
 *
 * Ordinary hyphens (Glow-worm, 10-year, call-out) are fine and are not checked. En dashes are
 * not checked either: none are left in visitor-facing copy, and the ones in code are numeric
 * ranges where an en dash is correct.
 */
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, it } from "node:test";

// Built from its code point, so this file does not itself trip the check it performs.
const EM_DASH = String.fromCharCode(0x2014);
const CHECKED = new Set([".ts", ".tsx", ".css", ".mjs", ".json"]);
const SRC = join(process.cwd(), "src");

/** Every checked file under src/, recursively. */
function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (CHECKED.has(extname(name))) {
      out.push(full);
    }
  }
  return out;
}

describe("house style", () => {
  it("uses no em dashes anywhere in src/", () => {
    const offences: string[] = [];

    for (const file of walk(SRC)) {
      const lines = readFileSync(file, "utf8").split("\n");
      lines.forEach((line, i) => {
        if (line.includes(EM_DASH)) {
          const where = `${file.slice(SRC.length + 1).replace(/\\/g, "/")}:${i + 1}`;
          offences.push(`${where}  ${line.trim().slice(0, 100)}`);
        }
      });
    }

    assert.deepEqual(offences, [], `Em dashes found. Rewrite these lines:\n${offences.join("\n")}`);
  });
});
