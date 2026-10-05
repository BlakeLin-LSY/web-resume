import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { resolve } from "node:path";
import { loadResumeSource, readingTokenCss, repoRoot } from "./lib/resume-source.mjs";
import { renderResume, escapeHtml } from "./lib/resume-markup.mjs";
import { resumeReadingScript } from "./lib/resume-reading.mjs";

const override = process.argv.indexOf("--profile");
const { profile, tokens, cases, assets } = await loadResumeSource(override >= 0 ? resolve(process.argv[override + 1]) : undefined);
const notes = JSON.parse(await readFile(resolve(repoRoot, "content/engineering-notes.json"), "utf8"));
const layout = await readFile(resolve(repoRoot, "content/resume-layout.css"), "utf8");
const tokenCss = readingTokenCss(tokens);
const overview = `<!doctype html>\n<!-- Generated from canonical resume profile, shared renderer and design tokens. -->\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>${escapeHtml(profile.identity.name)} — AI Software Engineer</title><meta name="description" content="${escapeHtml(profile.copy.en.metadataDescription)}"><style>${tokenCss}${layout}</style></head><body>${renderResume(profile, cases, assets, ".", notes)}<script>${resumeReadingScript(profile)}</script><noscript><style>[data-js-control]{display:none!important}[data-resume-locale]{display:block!important}</style></noscript></body></html>\n`;
const outputs = [
  [resolve(repoRoot, "app/app/resume-tokens.css"), `/* Generated from content/design-tokens.json. */\n${tokenCss}`],
  [resolve(repoRoot, "app/public/resume-overview.html"), overview],
];
// Validate every input and assemble every output before replacing a good artifact.
for (const [destination, content] of outputs) {
  await mkdir(resolve(destination, ".."), { recursive: true });
  await writeFile(`${destination}.tmp`, content, "utf8");
}
for (const [destination] of outputs) await rename(`${destination}.tmp`, destination);
console.log(`Generated portable overview (${Buffer.byteLength(overview)} bytes) and shared reading tokens.`);
