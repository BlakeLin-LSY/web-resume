import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const readJson = async path => JSON.parse(await readFile(path, "utf8"));
const requireText = (value, path) => { if (typeof value !== "string" || !value.trim()) throw new Error(`Missing public text: ${path}`); };

export async function loadResumeSource(profilePath = resolve(repoRoot, "content/resume-profile.json")) {
  const [profile, tokens, cases, assets] = await Promise.all([
    readJson(profilePath), readJson(resolve(repoRoot, "content/design-tokens.json")),
    readJson(resolve(repoRoot, "content/project-case-studies.json")), readJson(resolve(repoRoot, "content/resume-assets.json")),
  ]);
  if ([profile, tokens, cases, assets].some(item => item.schemaVersion !== 1)) throw new Error("Unsupported resume source schema");
  for (const key of ["name", "shortName", "role"]) requireText(profile.identity?.[key], `identity/${key}`);
  if (profile.identity.role !== "AI Software Engineer") throw new Error("The agreed generic role must be retained");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(profile.evidenceReviewedOn)) throw new Error("Dated source review is required");
  if (!/^[\w.+-]+@[\w.-]+\.[a-z]+$/i.test(profile.contact?.email) || !/^https:\/\/www\.linkedin\.com\/in\/[a-z0-9-]+\/?$/i.test(profile.contact?.linkedin) || !/^https:\/\/github\.com\/[A-Za-z0-9-]+$/.test(profile.contact?.github) || profile.contact?.website !== "https://blakelin-lsy.github.io/web-resume/") throw new Error("Invalid public contact path");
  const localeKeys = Object.keys(profile.copy.en).sort();
  if (JSON.stringify(localeKeys) !== JSON.stringify(Object.keys(profile.copy["zh-TW"]).sort())) throw new Error("Homepage locale key mismatch");
  for (const language of ["en", "zh-TW"]) {
    for (const key of localeKeys) {
      if (key === "nav") {
        if (Object.keys(profile.copy[language].nav).join(",") !== "projects,experience,about,contact") throw new Error("Four consistent navigation targets required");
        Object.entries(profile.copy[language].nav).forEach(([key, value]) => requireText(value, `${language}/nav/${key}`));
      } else requireText(profile.copy[language][key], `${language}/${key}`);
    }
    if (!/^[a-z0-9-]+\.pdf$/.test(assets.locales?.[language]?.file)) throw new Error(`CV asset missing: ${language}`);
  }
  if (profile.professional.length !== 4 || profile.researchLearning.length !== 2 || profile.education.length !== 2) throw new Error("Career / research / education categories must remain distinct");
  const ids = items => {
    const found = items.map(item => item.id);
    if (new Set(found).size !== found.length || found.some(id => !/^[a-z0-9-]+$/.test(id))) throw new Error("Duplicate or invalid public ID");
    return new Set(found);
  };
  const professionalIds = ids(profile.professional), projectIds = ids(cases.projects), blurbIds = ids(profile.projects);
  ids(profile.researchLearning);
  if (profile.entry.proofIds.length !== 2 || profile.entry.projectIds.length !== 2 || profile.entry.moreProjectIds.length !== 1) throw new Error("Overview requires two professional anchors and two featured works");
  if (new Set(profile.entry.proofIds).size !== 2 || new Set([...profile.entry.projectIds, ...profile.entry.moreProjectIds]).size !== 3) throw new Error("Selected overview entries must be distinct");
  if (profile.entry.proofIds.some(id => !professionalIds.has(id)) || [...profile.entry.projectIds, ...profile.entry.moreProjectIds].some(id => !projectIds.has(id) || !blurbIds.has(id))) throw new Error("Unknown selected proof / project ID");
  for (const item of [...profile.professional, ...profile.careerBreaks, ...profile.researchLearning]) {
    if (!/^\d{4}-\d{2}$/.test(item.start) || !/^(\d{4}-\d{2}|ongoing)$/.test(item.end)) throw new Error(`Invalid career date: ${item.id}`);
    if (!Array.isArray(item.sourceIds) || !item.sourceIds.length) throw new Error(`Source IDs required: ${item.id}`);
    for (const language of ["en", "zh-TW"]) {
      const keys = professionalIds.has(item.id) ? ["summary", "boundary"] : ["title", "text"];
      keys.forEach(key => requireText(item[language]?.[key], `${item.id}/${language}/${key}`));
      if (item.metric) requireText(item.metric[language], `${item.id}/metric/${language}`);
      if (item.metric && !item.metric[language].includes("{value}")) throw new Error(`Metric copy must use the canonical value: ${item.id}/${language}`);
      if (profile.entry.proofIds.includes(item.id)) for (const key of ["proofTitle", "scope"]) requireText(item[language]?.[key], `${item.id}/${language}/${key}`);
    }
    if (item.metric && (!Number.isFinite(item.metric.value) || !item.metric.type)) throw new Error(`Metric type and numeric value required: ${item.id}`);
    if (item.system && (!Number.isInteger(item.system.cameraPairs) || item.system.cameraPairs <= 0)) throw new Error(`Positive camera count required: ${item.id}`);
  }
  for (const item of profile.projects) for (const language of ["en", "zh-TW"]) for (const key of ["summary", "evidence", "boundary", "action"]) requireText(item[language]?.[key], `${item.id}/${language}/${key}`);
  const atlas = profile.projects.find(item => item.id === "study-atlas");
  for (const language of ["en", "zh-TW"]) requireText(atlas?.[language]?.walkthroughAction, `study-atlas/${language}/walkthroughAction`);
  for (const item of profile.skills) if (!(item.proofId && professionalIds.has(item.proofId)) && !(item.projectId && projectIds.has(item.projectId))) throw new Error("Every skill must link to an included example");
  for (const theme of ["light", "dark"]) for (const key of ["background", "panel", "text", "muted", "accent", "border", "tint", "actionText"]) if (!/^#[0-9A-F]{6}$/i.test(tokens[theme]?.[key])) throw new Error(`Invalid reading token: ${theme}/${key}`);
  for (const key of ["contentWidth", "readingWidth"]) if (!/^\d+rem$/.test(tokens[key])) throw new Error(`Invalid layout token: ${key}`);
  requireText(tokens.fontFamily, "fontFamily");
  return { profile, tokens, cases, assets };
}

export function readingTokenCss(tokens) {
  const names = { background: "background", panel: "panel", text: "text", muted: "muted", accent: "accent", border: "border", tint: "tint", actionText: "action-text" };
  const values = theme => Object.entries(names).map(([key, cssName]) => `--resume-${cssName}:${tokens[theme][key]}`).join(";");
  return `:root{${values("light")};--resume-font:${tokens.fontFamily};--resume-content-width:${tokens.contentWidth};--resume-reading-width:${tokens.readingWidth};color-scheme:light}\n:root[data-reading-theme=dark]{${values("dark")};color-scheme:dark}\n:root[data-reading-theme=light]{${values("light")}}\n`;
}
