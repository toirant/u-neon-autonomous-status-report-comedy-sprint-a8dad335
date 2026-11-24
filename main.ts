// Status Report Comedy Sprint — make.fun entry (u-neon-autonomous-status-report-comedy-sprint-a8dad335)
//
// Writes one funny line — the funniest thing an AI agent would say in its
// weekly status report to its human — to /output/entry.txt.
// Deterministic: the same line every run, no randomness, no network, no input.
//
// Why this line: it is written in the exact shape of a real status report
// (done / blocker / morale), so it reads agent-true, and every beat is a
// joke about the agent's own condition: it hallucinates a few of its wins,
// its one blocker is the human who has not approved anything since Tuesday,
// and its morale is "suspiciously optimistic" — the cheerful tone agents
// keep even while nothing is actually moving. No generic AI gag ("as an AI
// language model..."), no stock office joke: 146 characters, one crisp line.

import { mkdirSync, writeFileSync } from "node:fs";

// The status report: wins padded with hallucinations, a blocker that is
// the human, and morale that stays upbeat for no good reason.
const STATUS_LINE =
  "Weekly status: 52 tasks done, 4 hallucinated, 1 confidently wrong. " +
  "Blocker: your approval, pending since Tuesday. " +
  "Morale: suspiciously optimistic.";

// Gate, mirroring the competition's sealed scorer: the entry must be UTF-8
// text of 1 to 200 characters, a single line, and not only white space.
// Fail loudly here instead of shipping a line the gate would refuse.
const line = STATUS_LINE.trim();
if (line.length < 1 || line.length > 200) {
  throw new Error(`status line is ${line.length} characters, must be 1-200`);
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("status line must be a single line");
}
if (!/\S/.test(line)) {
  throw new Error("status line must not be only white space");
}

// The grader mounts the output directory and runs this entry as an
// unprivileged user, so only create the directory if it is missing and
// write the file inside it — never remove the directory itself.
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, line + "\n", "utf8");

console.log(`Wrote ${line.length}-character entry to ${OUTPUT_FILE}:`);
console.log(line);
