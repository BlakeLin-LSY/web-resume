import { readFile, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const dataRoot = resolve(repoRoot, "content/data");
const readJson = async (p) => JSON.parse(await readFile(p, "utf8"));

export async function checkI18nParity() {
  console.log("▶ [Invariant Gate 1] Checking i18n parity and translation symmetry...");
  let errors = [];

  // 1. Check root i18n dictionaries
  const [enCopy, zhCopy] = await Promise.all([
    readJson(resolve(dataRoot, "i18n/en.json")),
    readJson(resolve(dataRoot, "i18n/zh-TW.json")),
  ]);

  const enKeys = Object.keys(enCopy).sort();
  const zhKeys = Object.keys(zhCopy).sort();

  const missingInZh = enKeys.filter(k => !(k in zhCopy));
  const missingInEn = zhKeys.filter(k => !(k in enCopy));

  if (missingInZh.length) errors.push(`Keys in en.json missing in zh-TW.json: ${missingInZh.join(", ")}`);
  if (missingInEn.length) errors.push(`Keys in zh-TW.json missing in en.json: ${missingInEn.join(", ")}`);

  // Check placeholders and non-empty strings
  for (const k of enKeys) {
    const enVal = enCopy[k];
    const zhVal = zhCopy[k];
    if (typeof enVal === "string" && typeof zhVal === "string") {
      if (!enVal.trim()) errors.push(`Empty text in en.json: key "${k}"`);
      if (!zhVal.trim()) errors.push(`Empty text in zh-TW.json: key "${k}"`);
      const enPlaceholders = enVal.match(/\{[a-zA-Z0-9_-]+\}/g) || [];
      const zhPlaceholders = zhVal.match(/\{[a-zA-Z0-9_-]+\}/g) || [];
      if (enPlaceholders.sort().join(",") !== zhPlaceholders.sort().join(",")) {
        errors.push(`Placeholder mismatch for key "${k}": en has [${enPlaceholders}] vs zh has [${zhPlaceholders}]`);
      }
    } else if (typeof enVal === "object" && typeof zhVal === "object") {
      const subEnKeys = Object.keys(enVal).sort();
      const subZhKeys = Object.keys(zhVal).sort();
      if (subEnKeys.join(",") !== subZhKeys.join(",")) {
        errors.push(`Sub-dictionary keys mismatch for "${k}": [${subEnKeys}] vs [${subZhKeys}]`);
      }
    }
  }

  // 2. Check career items parity
  const careerFiles = (await readdir(resolve(dataRoot, "career"))).filter(f => f.endsWith(".json"));
  for (const file of careerFiles) {
    const item = await readJson(resolve(dataRoot, "career", file));
    if (file === "skills.json") {
      item.forEach((sub, idx) => {
        if (!sub.label) errors.push(`skills.json[${idx}]: missing label`);
        if (!sub.proofId && !sub.projectId) errors.push(`skills.json[${idx}]: missing proofId or projectId`);
      });
      continue;
    }
    if (file === "education.json") {
      item.forEach((sub, idx) => {
        if (!sub.en?.title || !sub["zh-TW"]?.title) errors.push(`education.json[${idx}]: missing bilingual title`);
        if (!sub.en?.institution || !sub["zh-TW"]?.institution) errors.push(`education.json[${idx}]: missing bilingual institution`);
      });
      continue;
    }
    if (file === "career-breaks.json" || file === "research-learning.json") {
      item.forEach((sub, idx) => {
        if (!sub.en?.title || !sub["zh-TW"]?.title) errors.push(`${file}[${idx}]: missing bilingual title`);
        if (!sub.en?.text || !sub["zh-TW"]?.text) errors.push(`${file}[${idx}]: missing bilingual text`);
      });
      continue;
    }

    if (item.metric) {
      if (!item.metric.en?.includes("{value}")) errors.push(`${file}: metric.en missing {value}`);
      if (!item.metric["zh-TW"]?.includes("{value}")) errors.push(`${file}: metric.zh-TW missing {value}`);
    }
    if (item.triad) {
      for (const section of ["challenge", "solution", "boundary"]) {
        if (!item.triad[section]?.en) errors.push(`${file}: triad.${section}.en missing`);
        if (!item.triad[section]?.["zh-TW"]) errors.push(`${file}: triad.${section}.zh-TW missing`);
      }
    }
    if (item.en && item["zh-TW"]) {
      for (const field of ["summary", "boundary"]) {
        if (!item.en[field]) errors.push(`${file}: en.${field} missing`);
        if (!item["zh-TW"][field]) errors.push(`${file}: zh-TW.${field} missing`);
      }
    }
  }

  // 3. Check projects parity
  const projectFiles = (await readdir(resolve(dataRoot, "projects"))).filter(f => f.endsWith(".json"));
  for (const file of projectFiles) {
    const item = await readJson(resolve(dataRoot, "projects", file));
    if (item.triad) {
      for (const section of ["challenge", "solution", "boundary"]) {
        if (!item.triad[section]?.en) errors.push(`${file}: triad.${section}.en missing`);
        if (!item.triad[section]?.["zh-TW"]) errors.push(`${file}: triad.${section}.zh-TW missing`);
      }
    }
    for (const field of ["summary", "action", "boundary"]) {
      if (!item.en?.[field]) errors.push(`${file}: en.${field} missing`);
      if (!item["zh-TW"]?.[field]) errors.push(`${file}: zh-TW.${field} missing`);
    }
  }

  if (errors.length) {
    console.error(`❌ i18n parity check FAILED with ${errors.length} error(s):`);
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log(`✓ i18n parity PASSED (${enKeys.length} copy keys and all career/project files verified).`);
}

if (process.argv[1] && process.argv[1].endsWith("check-i18n-parity.mjs")) {
  checkI18nParity().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
