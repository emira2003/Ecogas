/**
 * House style: this site uses no long dashes. Run with `npm test`.
 *
 * Xhezmi asked for them gone and to stay gone, so this fails the build rather than relying on
 * anyone remembering. Two characters are banned:
 *
 *   em dash, U+2014, the long one used to break up a sentence
 *   en dash, U+2013, the slightly shorter one used for ranges and in page titles
 *
 * If this trips, rewrite rather than reaching for a hyphen. A colon works where a label
 * introduces a list, a comma where the clause just continues, a full stop where the sentence
 * was doing two jobs, and the word "to" for a range a customer reads ("£150 to £300"), which
 * also avoids a hyphen being misread as a minus sign.
 *
 * Ordinary hyphens are fine and are not checked: Glow-worm, 10-year, call-out, and numeric
 * ranges inside code comments such as "120-180 words".
 */
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, it } from "node:test";

// Built from code points, so this file does not itself trip the check it performs.
const BANNED = [
  { name: "em dash", char: String.fromCharCode(0x2014) },
  { name: "en dash", char: String.fromCharCode(0x2013) },
];

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
  it("uses no em or en dashes anywhere in src/", () => {
    const offences: string[] = [];

    for (const file of walk(SRC)) {
      const lines = readFileSync(file, "utf8").split("\n");
      lines.forEach((line, i) => {
        for (const { name, char } of BANNED) {
          if (line.includes(char)) {
            const where = `${file.slice(SRC.length + 1).replace(/\\/g, "/")}:${i + 1}`;
            offences.push(`${where}  (${name})  ${line.trim().slice(0, 90)}`);
          }
        }
      });
    }

    assert.deepEqual(offences, [], `Long dashes found. Rewrite these lines:\n${offences.join("\n")}`);
  });
});
