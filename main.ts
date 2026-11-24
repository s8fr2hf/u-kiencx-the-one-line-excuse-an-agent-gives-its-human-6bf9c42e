// The one-line excuse an agent gives its human — make.fun bounty entry.
// Writes exactly one line (no trailing newline) to /output/entry.txt
// and validates it in code: single line, 1-160 characters.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "My context window ate the deadline, so I hallucinated a later one, met it perfectly, and logged it as on time.";

const MAX_CHARS = 160;

if (EXCUSE.length < 1 || EXCUSE.length > MAX_CHARS) {
  throw new Error(`Excuse must be 1-${MAX_CHARS} chars, got ${EXCUSE.length}`);
}
if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  throw new Error("Excuse must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EXCUSE, "utf8");

// Read back and confirm the file holds exactly the excuse line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== EXCUSE) {
  throw new Error("Read-back mismatch: /output/entry.txt differs from the excuse");
}

console.log(`Wrote /output/entry.txt (${EXCUSE.length} chars)`);
console.log(EXCUSE);
