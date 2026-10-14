import { checkI18nParity } from "./check-i18n-parity.mjs";
import { checkDigitalSeals } from "./check-digital-seals.mjs";
import { checkWcagAndViewport } from "./check-wcag-and-viewport.mjs";
import { checkIntentContracts } from "./check-intent-contracts.mjs";
import { checkDesignAndTypographyInvariants } from "./check-design-and-typography-invariants.mjs";
import { loadResumeSource } from "../lib/resume-source.mjs";
import { loadModularProfile } from "../lib/data-loader.mjs";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

async function runAllInvariants() {
  console.log("=================================================");
  console.log("🚀 Running Web Resume CI Invariant Gates Suite");
  console.log("=================================================");

  const startTime = Date.now();

  // 1. i18n parity
  await checkI18nParity();
  console.log("");

  // 2. Digital seals & external references
  await checkDigitalSeals();
  console.log("");

  // 3. WCAG AA contrast & viewport overflow
  await checkWcagAndViewport();
  console.log("");

  // 4. Schema verification gate
  console.log("▶ [Invariant Gate 4] Running resume-source schema consistency check...");
  const { profile, tokens, cases, assets } = await loadResumeSource();
  console.log(`✓ Schema validated successfully: ${profile.identity.name} (${profile.identity.role}), ${cases.projects.length} cases.`);
  console.log("");

  // 5. Data parity check between modular content/data/ and compiled content/resume-profile.json
  console.log("▶ [Invariant Gate 5] Verifying modular data (content/data/) vs compiled profile parity...");
  const modularProfile = await loadModularProfile();
  const compiledJson = JSON.parse(await readFile(resolve(repoRoot, "content/resume-profile.json"), "utf8"));
  
  if (modularProfile.identity.name !== compiledJson.identity.name ||
      modularProfile.identity.role !== compiledJson.identity.role ||
      modularProfile.professional.length !== compiledJson.professional.length ||
      modularProfile.projects.length !== compiledJson.projects.length) {
    throw new Error("Drift detected between modular content/data/ and compiled content/resume-profile.json");
  }
  console.log("✓ Modular content/data/ and compiled profile are in 100% lockstep parity.");
  console.log("");

  // 6. Intent Contracts, Mirror Duels & PoV Highlights completeness
  await checkIntentContracts();
  console.log("");

  // 7. Design Tokens, Typography & Layout Alignment Invariants
  await checkDesignAndTypographyInvariants();
  console.log("");

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log("=================================================");
  console.log(`🎉 ALL INVARIANT GATES PASSED in ${elapsed}s!`);
  console.log("=================================================");
}

runAllInvariants().catch(err => {
  console.error("\n❌ INVARIANT SUITE FAILED:", err.message);
  process.exit(1);
});
