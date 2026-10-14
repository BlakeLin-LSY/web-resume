import { readFile, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const tokensDir = resolve(repoRoot, "content/design-tokens");
const readJson = async (p) => JSON.parse(await readFile(p, "utf8"));

// Calculate relative luminance for a given hex color string (#RRGGBB)
function getLuminance(hex) {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const toLinear = c => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

// Calculate contrast ratio between two hex colors
function getContrastRatio(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export async function checkWcagAndViewport() {
  console.log("▶ [Invariant Gate 3] Checking WCAG AA contrast ratio and viewport overflow rules...");
  let errors = [];

  // 1. Verify WCAG AA Contrast across all theme tokens
  const tokenFiles = (await readdir(tokensDir)).filter(f => f.endsWith(".json"));
  for (const file of tokenFiles) {
    const theme = await readJson(resolve(tokensDir, file));
    const themeName = theme.themeName || file;

    for (const mode of ["light", "dark"]) {
      const colors = theme[mode];
      if (!colors) {
        errors.push(`Theme ${themeName}: missing "${mode}" mode definition`);
        continue;
      }

      // Check text vs background (WCAG AA: >= 4.5:1)
      const textBgRatio = getContrastRatio(colors.text, colors.background);
      if (textBgRatio < 4.5) {
        errors.push(`Theme ${themeName} [${mode}]: text (${colors.text}) vs background (${colors.background}) contrast is ${textBgRatio.toFixed(2)}:1 (minimum 4.5:1 required)`);
      } else {
        console.log(`  ✓ ${themeName} [${mode}] text/background: ${textBgRatio.toFixed(2)}:1 (Pass >= 4.5)`);
      }

      // Check text vs panel (WCAG AA: >= 4.5:1)
      const textPanelRatio = getContrastRatio(colors.text, colors.panel);
      if (textPanelRatio < 4.5) {
        errors.push(`Theme ${themeName} [${mode}]: text (${colors.text}) vs panel (${colors.panel}) contrast is ${textPanelRatio.toFixed(2)}:1 (minimum 4.5:1 required)`);
      }

      // Check actionText vs accent (Buttons / Badges: >= 3.0:1)
      const actionRatio = getContrastRatio(colors.actionText, colors.accent);
      if (actionRatio < 3.0) {
        errors.push(`Theme ${themeName} [${mode}]: actionText (${colors.actionText}) vs accent (${colors.accent}) contrast is ${actionRatio.toFixed(2)}:1 (minimum 3.0:1 required)`);
      }
    }
  }

  // 2. Verify Viewport Anti-Overflow Rules in CSS and SVG generators
  const css = await readFile(resolve(repoRoot, "content/resume-layout.css"), "utf8");
  
  // Must contain overflow protection on SVG wrapper (handles both minified and spaced CSS)
  if (!/\.resume-svg-wrapper\s*\{[^}]*overflow-x:\s*auto/i.test(css)) {
    errors.push("Missing .resume-svg-wrapper overflow-x: auto container rule in resume-layout.css (risk of mobile horizontal blowout)");
  } else {
    console.log("  ✓ Verified responsive .resume-svg-wrapper with horizontal containment scroll");
  }

  // Must contain mobile viewport media queries (e.g. max-width or min-width)
  if (!/@media\s*\(\s*(max-width|min-width):/i.test(css)) {
    errors.push("Missing responsive media query rules in resume-layout.css");
  } else {
    console.log("  ✓ Verified responsive media query breakpoints for mobile/desktop viewports");
  }

  // Check SVG generators for valid viewBox
  const genDir = resolve(repoRoot, "scripts/generators/components");
  const genFiles = (await readdir(genDir)).filter(f => f.startsWith("svg-") && f.endsWith(".mjs"));
  for (const file of genFiles) {
    const code = await readFile(resolve(genDir, file), "utf8");
    if (!code.includes("viewBox=")) {
      errors.push(`Generator component ${file} does not set standard viewBox for vector responsiveness`);
    } else {
      console.log(`  ✓ Verified scalable vector viewBox in ${file}`);
    }
  }

  if (errors.length) {
    console.error(`❌ WCAG and viewport check FAILED with ${errors.length} error(s):`);
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log("✓ WCAG AA contrast and mobile viewport protection PASSED.");
}

if (process.argv[1] && process.argv[1].endsWith("check-wcag-and-viewport.mjs")) {
  checkWcagAndViewport().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
