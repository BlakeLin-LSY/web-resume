import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const tokensDir = resolve(repoRoot, "content/design-tokens");
export const targetTokenJson = resolve(repoRoot, "content/design-tokens.json");

export const availableThemes = ["zen-slate", "terminal-mono", "clean-swiss"];

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));

/**
 * Loads token definition for a given theme name.
 */
export async function loadThemeTokens(themeName = "zen-slate") {
  if (!availableThemes.includes(themeName)) {
    throw new Error(`Unknown theme: "${themeName}". Available themes: ${availableThemes.join(", ")}`);
  }
  const tokenPath = resolve(tokensDir, `${themeName}.json`);
  return await readJson(tokenPath);
}

/**
 * Compiles token definitions into CSS variables.
 */
export function compileThemeCss(tokens) {
  const names = {
    background: "background",
    panel: "panel",
    text: "text",
    muted: "muted",
    accent: "accent",
    border: "border",
    tint: "tint",
    actionText: "action-text"
  };
  const formatValues = theme => Object.entries(names)
    .map(([key, cssName]) => `--resume-${cssName}:${tokens[theme][key]}`)
    .join(";");

  return `:root{${formatValues("light")};--resume-font:${tokens.fontFamily};--resume-content-width:${tokens.contentWidth};--resume-reading-width:${tokens.readingWidth};color-scheme:light}\n:root[data-reading-theme=dark]{${formatValues("dark")};color-scheme:dark}\n:root[data-reading-theme=light]{${formatValues("light")}}\n`;
}

/**
 * Synchronizes the selected theme into content/design-tokens.json
 */
export async function syncDesignTokensJson(themeName = "zen-slate") {
  const tokens = await loadThemeTokens(themeName);
  const serialized = JSON.stringify(tokens, null, 2) + "\n";
  await writeFile(targetTokenJson, serialized, "utf8");
  return tokens;
}

// CLI entry point
if (process.argv[1] && process.argv[1].endsWith("theme-engine.mjs")) {
  const arg = process.argv.find(a => a.startsWith("--theme="));
  const themeName = arg ? arg.split("=")[1] : (process.env.RESUME_THEME || "zen-slate");
  syncDesignTokensJson(themeName).then(t => {
    console.log(`Successfully switched and synchronized active theme to: ${themeName} (${t.displayName})`);
  }).catch(err => {
    console.error(err.message);
    process.exit(1);
  });
}
