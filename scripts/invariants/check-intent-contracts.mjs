import { readFile, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const dataRoot = resolve(repoRoot, "content/data");
const readJson = async (p) => JSON.parse(await readFile(p, "utf8"));

export async function checkIntentContracts() {
  console.log("▶ [Invariant Gate 6] Checking Intent Contracts, Mirror Duels, and PoV Highlights completeness...");
  let errors = [];

  const requiredFocalIds = [
    { dir: "career", id: "dynasafe" },
    { dir: "career", id: "metgauge" },
    { dir: "projects", id: "study-atlas" },
    { dir: "projects", id: "transcribe-for-x" }
  ];

  for (const { dir, id } of requiredFocalIds) {
    const filePath = resolve(dataRoot, dir, `${id}.json`);
    try {
      const data = await readJson(filePath);

      // 1. Check intentContract
      if (!data.intentContract) {
        errors.push(`${dir}/${id}.json: missing intentContract`);
      } else {
        const { strictInvariant, nonGoals, failureConditions } = data.intentContract;
        if (!strictInvariant || !strictInvariant.en || !strictInvariant["zh-TW"]) {
          errors.push(`${dir}/${id}.json: intentContract.strictInvariant missing en or zh-TW`);
        }
        if (!nonGoals || !Array.isArray(nonGoals.en) || !Array.isArray(nonGoals["zh-TW"]) || nonGoals.en.length === 0) {
          errors.push(`${dir}/${id}.json: intentContract.nonGoals missing non-empty en or zh-TW array`);
        }
        if (!failureConditions || !failureConditions.en || !failureConditions["zh-TW"]) {
          errors.push(`${dir}/${id}.json: intentContract.failureConditions missing en or zh-TW`);
        }
      }

      // 2. Check mirrorDuel
      if (!Array.isArray(data.mirrorDuel) || data.mirrorDuel.length === 0) {
        errors.push(`${dir}/${id}.json: missing or empty mirrorDuel list`);
      } else {
        for (let i = 0; i < data.mirrorDuel.length; i++) {
          const item = data.mirrorDuel[i];
          if (!item.challenger || !item.challenger.en || !item.challenger["zh-TW"]) {
            errors.push(`${dir}/${id}.json: mirrorDuel[${i}].challenger missing en or zh-TW`);
          }
          if (!item.defense || !item.defense.en || !item.defense["zh-TW"]) {
            errors.push(`${dir}/${id}.json: mirrorDuel[${i}].defense missing en or zh-TW`);
          }
        }
      }

      // 3. Check povHighlights
      if (!data.povHighlights) {
        errors.push(`${dir}/${id}.json: missing povHighlights`);
      } else {
        for (const role of ["staff", "em", "recruiter"]) {
          if (!data.povHighlights[role] || !data.povHighlights[role].en || !data.povHighlights[role]["zh-TW"]) {
            errors.push(`${dir}/${id}.json: povHighlights.${role} missing en or zh-TW`);
          }
        }
      }

      console.log(`  ✓ Verified Focal Block "${id}": Invariant Contract, ${data.mirrorDuel?.length || 0} Duels, and 3 PoVs.`);
    } catch (err) {
      errors.push(`Failed to read/validate ${dir}/${id}.json: ${err.message}`);
    }
  }

  if (errors.length > 0) {
    console.error("❌ Intent Contracts validation FAILED with errors:");
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log("✓ All Intent Contracts, Mirror Duels, and PoV Highlights PASSED (100% verified).\n");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  checkIntentContracts().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
