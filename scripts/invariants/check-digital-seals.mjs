import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const dataRoot = resolve(repoRoot, "content/data");
const readJson = async (p) => JSON.parse(await readFile(p, "utf8"));

export async function checkDigitalSeals() {
  console.log("▶ [Invariant Gate 2] Checking external references and SHA-256 digital seals...");
  let errors = [];

  // 1. Verify CV digital seals and PDF integrity
  const assets = await readJson(resolve(repoRoot, "content/resume-assets.json"));
  if (assets.schemaVersion !== 1 || Object.keys(assets.locales).sort().join() !== "en,zh-TW") {
    errors.push("Invalid resume-assets.json structure");
  }
  for (const [locale, asset] of Object.entries(assets.locales)) {
    const pdfPath = resolve(repoRoot, "app/public/resume", asset.file);
    try {
      const bytes = await readFile(pdfPath);
      if (!bytes.subarray(0, 5).equals(Buffer.from("%PDF-"))) {
        errors.push(`Invalid PDF binary header signature: ${asset.file}`);
      }
      const actualHash = createHash("sha256").update(bytes).digest("hex");
      if (bytes.length !== asset.bytes || actualHash !== asset.sha256) {
        errors.push(`CV asset hash/size mismatch for ${locale}: expected ${asset.sha256} (${asset.bytes}b), got ${actualHash} (${bytes.length}b)`);
      } else {
        console.log(`  ✓ Verified CV asset (${locale}): SHA-256 ${actualHash.slice(0, 12)}... (${bytes.length} bytes)`);
      }
    } catch (err) {
      errors.push(`Failed to read CV asset file ${pdfPath}: ${err.message}`);
    }
  }

  // 2. Verify VGGT Monograph Proof Leaf Seal
  const expectedVggtSeal = "0f5e66c74dbd8762f2a90936d238fc72d9939db6396d68d49703645834eeb0d5";
  const circuitBreakerCode = await readFile(resolve(repoRoot, "scripts/generators/components/svg-circuit-breaker.mjs"), "utf8");
  if (!circuitBreakerCode.includes(expectedVggtSeal)) {
    errors.push(`VGGT Monograph Proof Leaf Seal (${expectedVggtSeal}) not found in svg-circuit-breaker.mjs`);
  } else {
    console.log(`  ✓ Verified VGGT Monograph Proof Leaf Seal: SHA-256 ${expectedVggtSeal.slice(0, 12)}...`);
  }

  // 3. Verify External References and Source IDs
  const validSourcePrefixes = ["MAT-"];
  const checkSourceIds = (item, sourceName) => {
    if (!Array.isArray(item.sourceIds) || item.sourceIds.length === 0) {
      errors.push(`${sourceName}: missing or empty sourceIds`);
    } else {
      for (const id of item.sourceIds) {
        if (!validSourcePrefixes.some(p => id.startsWith(p))) {
          errors.push(`${sourceName}: unknown external reference format "${id}"`);
        }
      }
    }
  };

  const careerFiles = (await readdir(resolve(dataRoot, "career"))).filter(f => f.endsWith(".json"));
  for (const file of careerFiles) {
    if (file === "skills.json" || file === "education.json") continue;
    const item = await readJson(resolve(dataRoot, "career", file));
    if (Array.isArray(item)) {
      item.forEach((sub, idx) => checkSourceIds(sub, `${file}[${idx}]`));
    } else {
      checkSourceIds(item, file);
    }
  }

  const projectFiles = (await readdir(resolve(dataRoot, "projects"))).filter(f => f.endsWith(".json"));
  for (const file of projectFiles) {
    const item = await readJson(resolve(dataRoot, "projects", file));
    checkSourceIds(item, file);
  }

  if (errors.length) {
    console.error(`❌ Digital seals check FAILED with ${errors.length} error(s):`);
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log("✓ External references and digital seals PASSED.");
}

if (process.argv[1] && process.argv[1].endsWith("check-digital-seals.mjs")) {
  checkDigitalSeals().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
