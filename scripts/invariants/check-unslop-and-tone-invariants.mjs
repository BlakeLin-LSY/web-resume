import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

// Decorative emojis (banned from UI cards, badges, SVG diagrams, and copy)
const DECORATIVE_EMOJI_REGEX = /[\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{26A0}\u{26D4}\u{26A1}\u{2705}\u{2728}\u{1F600}-\u{1F64F}]/u;

// Em dash character banned from bilingual and data text
const EM_DASH = "\u2014";

// Banned buzzwords, self-deprecating audit depositions, and drifted claims
const BANNED_PATTERNS = [
  "手術刀",
  "反脆弱",
  "宣稱無 AI 工具協助",
  "我診斷了什麼？",
  "Staff Reviewer",
  "次微秒硬體觸發同步",
  "次微秒硬體同步匯流排"
];

// Active SVG generator files that must guard language parameter overloading
const ACTIVE_SVG_GENERATORS = [
  "scripts/generators/components/svg-topology.mjs",
  "scripts/generators/components/svg-pipeline.mjs",
  "scripts/generators/components/svg-circuit-breaker.mjs"
];

const SCAN_DIRECTORIES = [
  "content/data",
  "scripts/modules"
];

const INDIVIDUAL_FILES = [
  "content/cv-candidate.json",
  "scripts/generators/components/architecture-duel.mjs",
  "scripts/generators/components/intent-contract.mjs",
  "scripts/generators/components/proof-receipt.mjs"
];

async function collectFiles(dir) {
  const fullDir = resolve(repoRoot, dir);
  const entries = await readdir(fullDir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(fullDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(join(dir, entry.name))));
    } else if (entry.isFile()) {
      files.push(join(dir, entry.name));
    }
  }
  return files;
}

export async function checkUnslopAndToneInvariants() {
  console.log("▶ [Invariant Gate 9] Checking Anti-Slop, Professional Tone, and SVG Contract Invariants...");
  const errors = [];

  const allFiles = [...INDIVIDUAL_FILES, ...ACTIVE_SVG_GENERATORS];
  for (const dir of SCAN_DIRECTORIES) {
    allFiles.push(...(await collectFiles(dir)));
  }

  for (const relPath of allFiles) {
    const fullPath = resolve(repoRoot, relPath);
    let content;
    try {
      content = await readFile(fullPath, "utf8");
    } catch (err) {
      errors.push(`${relPath}: cannot read file (${err.message})`);
      continue;
    }

    // 1. Check for decorative emojis
    const emojiMatch = content.match(DECORATIVE_EMOJI_REGEX);
    if (emojiMatch) {
      errors.push(`${relPath}: contains banned decorative emoji "${emojiMatch[0]}"`);
    }

    // 2. Check for em dashes in data and candidate files
    if (relPath.endsWith(".json") && content.includes(EM_DASH)) {
      errors.push(`${relPath}: contains em dash (\\u2014); use hyphens or structural separators instead`);
    }

    // 3. Check for banned buzzwords and slop phrases
    for (const banned of BANNED_PATTERNS) {
      if (content.includes(banned)) {
        errors.push(`${relPath}: contains banned slop/audit phrase "${banned}"`);
      }
    }
  }

  // 4. Verify SVG generator signature overload protection
  for (const svgRelPath of ACTIVE_SVG_GENERATORS) {
    const fullPath = resolve(repoRoot, svgRelPath);
    const content = await readFile(fullPath, "utf8");
    if (!content.includes('typeof options === "string"') && !content.includes("typeof options === 'string'")) {
      errors.push(`${svgRelPath}: missing defensive overload check for language string argument`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Anti-Slop and Tone Invariants check failed:\n  - ${errors.join("\n  - ")}`);
  }

  console.log("  ✓ Zero decorative emojis verified across active components, SVG generators, and data.");
  console.log("  ✓ Zero em-dashes (\\u2014) verified across all content data files.");
  console.log("  ✓ Zero banned slop or self-deprecating phrases verified.");
  console.log("  ✓ SVG generator parameter overload defensive contracts verified.");
  console.log("✓ Anti-Slop, Professional Tone, and SVG Contract Invariants PASSED.");
}

if (process.argv[1] && process.argv[1].endsWith("check-unslop-and-tone-invariants.mjs")) {
  checkUnslopAndToneInvariants().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
