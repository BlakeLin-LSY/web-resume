import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

const SIDE_PROJECT_FILES = [
  "app/public/projects/study-atlas.html",
  "app/public/projects/transcribe-for-x.html",
  "app/public/projects/windowphase.html",
  "app/public/engineering-notes.html"
];

export function validateSideProjectHtml(html, relPath) {
  const errors = [];
  // 1. Frosted Glass Sticky Header Invariant
  if (!html.includes("position:sticky") || !html.includes("top:0")) {
    errors.push(`${relPath}: missing position:sticky top:0 on header`);
  }
  if (!html.includes("backdrop-filter:blur") && !html.includes("backdrop-filter: blur")) {
    errors.push(`${relPath}: missing backdrop-filter:blur frosted glass effect`);
  }
  if (!html.includes("-webkit-backdrop-filter:blur") && !html.includes("-webkit-backdrop-filter: blur")) {
    errors.push(`${relPath}: missing -webkit-backdrop-filter:blur for Safari/WebKit parity`);
  }
  if (!html.includes("color-mix(in srgb,")) {
    errors.push(`${relPath}: missing color-mix translucent header background for frosted glass refraction`);
  }
  if (!html.includes(".header-inner")) {
    errors.push(`${relPath}: missing .header-inner layout container for full-width frosted glass backdrop`);
  }

  // 2. Independent Bilingual Typography Engine Invariant
  if (!html.includes('[lang="en"]') || !html.includes('[lang="zh-TW"]')) {
    errors.push(`${relPath}: missing independent bilingual typography rules`);
  }
  if (!html.includes("letter-spacing:-.012em") && !html.includes("letter-spacing:-0.012em")) {
    errors.push(`${relPath}: English typography missing negative letter-spacing compensation (-.012em)`);
  }
  if (!html.includes("line-height:1.72") && !html.includes("line-height: 1.72")) {
    errors.push(`${relPath}: Traditional Chinese typography missing relaxed line-height (1.72)`);
  }
  if (!html.includes('font-feature-settings:"palt"') && !html.includes("font-feature-settings: 'palt'")) {
    errors.push(`${relPath}: Traditional Chinese typography missing 'palt' proportional alternate metric spacing`);
  }

  // 3. Zero Raw Slash UI Strings Invariant (Designer Taste)
  const rawSlashPatterns = [
    "Download HTML / 下載 HTML",
    "← Projects / 返回專案",
    "Personal project / 個人專案",
    "Back to projects / 返回專案",
    "Skip to content / 跳至內容",
    "Implementation references / 實作參考"
  ];
  for (const pattern of rawSlashPatterns) {
    if (html.includes(pattern)) {
      errors.push(`${relPath}: contains raw slash unlocalized UI string "${pattern}"`);
    }
  }

  // 4. Accessible Viewport & Color-Scheme Invariants
  if (!html.includes('name="viewport"') || !html.includes("width=device-width")) {
    errors.push(`${relPath}: missing mobile responsive viewport meta tag`);
  }
  if (!html.includes('name="color-scheme"') || !html.includes("light dark")) {
    errors.push(`${relPath}: missing color-scheme light dark meta tag`);
  }
  if (!html.includes("overflow-wrap:anywhere")) {
    errors.push(`${relPath}: missing overflow-wrap:anywhere anti-blowout protection`);
  }

  // 5. Card Elevation Invariants
  if (!html.includes("box-shadow:0 3px 12px rgba(0,0,0,0.03)") && !html.includes("box-shadow:0 2px 8px rgba(0,0,0,0.02)")) {
    errors.push(`${relPath}: missing physical card elevation box-shadow styling`);
  }

  // 6. Skip Navigation Link
  if (!html.includes('class="skip"') || !html.includes('href="#')) {
    errors.push(`${relPath}: missing accessible skip to content link`);
  }

  return errors;
}

export async function checkSideProjectInvariants(files = SIDE_PROJECT_FILES) {
  console.log("▶ [Invariant Gate 8] Checking Side Project & Engineering Notes Parity & Designer Taste Invariants...");
  let errors = [];

  for (const relPath of files) {
    const fullPath = resolve(repoRoot, relPath);
    let html;
    try {
      html = await readFile(fullPath, "utf8");
    } catch (err) {
      errors.push(`${relPath}: file could not be read (${err.message})`);
      continue;
    }

    const fileErrors = validateSideProjectHtml(html, relPath);
    if (fileErrors.length > 0) {
      errors.push(...fileErrors);
    } else {
      console.log(`  ✓ ${relPath}: Frosted glass header, bilingual typography, zero raw slash, and viewport invariants verified.`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Side project invariants check failed:\n  - ${errors.join("\n  - ")}`);
  }

  console.log("✓ Side Project Pages Parity and Designer Taste Invariants PASSED.");
}

if (process.argv[1] && process.argv[1].endsWith("check-side-project-invariants.mjs")) {
  checkSideProjectInvariants().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
