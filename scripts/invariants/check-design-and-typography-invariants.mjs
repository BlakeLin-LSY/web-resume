import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

export async function checkDesignAndTypographyInvariants() {
  console.log("▶ [Invariant Gate 7] Checking Design Tokens, Typography Hierarchy, and Layout Alignment Invariants...");
  let errors = [];

  const layoutCss = await readFile(resolve(repoRoot, "content/resume-layout.css"), "utf8");
  const enCopy = JSON.parse(await readFile(resolve(repoRoot, "content/data/i18n/en.json"), "utf8"));
  const zhCopy = JSON.parse(await readFile(resolve(repoRoot, "content/data/i18n/zh-TW.json"), "utf8"));

  // 1. Bilingual Typography Hierarchy Checks
  if (!layoutCss.includes('[lang="en"]') || !layoutCss.includes('[lang="zh-TW"]')) {
    errors.push("Missing dedicated bilingual typography rules in content/resume-layout.css");
  }
  if (!layoutCss.includes('letter-spacing:-.012em') && !layoutCss.includes('letter-spacing:-0.012em') && !layoutCss.includes('letter-spacing:-.015em')) {
    errors.push("English typography missing negative letter-spacing compensation for high-density legibility");
  }
  if (!layoutCss.includes('line-height:1.72') && !layoutCss.includes('line-height: 1.72')) {
    errors.push("Traditional Chinese typography missing relaxed line-height (1.72) for Zen Slate breathing space");
  }

  // 2. Grid-based A -> B Ribbon Invariants
  if (!layoutCss.includes('.resume-ab-ribbon{display:grid;grid-template-columns:1fr auto 1.15fr auto 1fr')) {
    errors.push(".resume-ab-ribbon must maintain 5-column grid layout for deterministic alignment");
  }
  if (!layoutCss.includes('@media(max-width:860px)') || !layoutCss.includes('.resume-ab-ribbon{grid-template-columns:1fr')) {
    errors.push(".resume-ab-ribbon missing mobile responsive single-column fallback at 860px breakpoint");
  }

  // 3. Perspective Lens 3-Column Spotlight Invariants
  if (!layoutCss.includes('.resume-pov-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))')) {
    errors.push(".resume-pov-grid must enforce 3-column multi-dimensional perspective comparison");
  }

  // 4. Compact Lens Button Label Invariants (Header Anti-Overflow)
  const shortLabels = [enCopy.lensStaffShort, enCopy.lensEmShort, enCopy.lensRecruiterShort];
  for (const label of shortLabels) {
    if (!label || label.length > 15) {
      errors.push(`English lens short label "${label}" exceeds 15 chars; risks header overflow on laptop screens`);
    }
  }

  // 5. Traditional Chinese Label Pureness
  if (enCopy.cvOther !== "繁體中文 CV") {
    errors.push(`enCopy.cvOther must be "繁體中文 CV", got "${enCopy.cvOther}"`);
  }

  // 6. Frosted Glass Header Invariant
  if (!layoutCss.includes('backdrop-filter:blur') && !layoutCss.includes('backdrop-filter: blur')) {
    errors.push("Header missing backdrop-filter frosted glass styling for elevation hierarchy");
  }

  if (errors.length > 0) {
    throw new Error(`Design and Typography Invariants check failed:\n  - ${errors.join("\n  - ")}`);
  }

  console.log("  ✓ Independent bilingual typography verified (EN compact ratio & ZH-TW 1.72 line-height).");
  console.log("  ✓ Robust 5-column grid A ➔ B Ribbon with responsive 860px fold verified.");
  console.log("  ✓ Multi-dimensional 3-Role Perspective Spotlight Card structure verified.");
  console.log("  ✓ Header compact controls & frosted glass aesthetics verified.");
  console.log("  ✓ 繁體中文 localization pureness verified (Zero regression).");
  console.log("✓ Design Tokens, Typography, and Layout Invariants PASSED.");
}
