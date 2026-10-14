import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const dataRoot = resolve(repoRoot, "content/data");

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));

/**
 * Loads modular data from content/data/ and assembles the complete profile object.
 */
export async function loadModularProfile(baseDir = dataRoot) {
  const [
    identityData,
    dynasafe,
    metgauge,
    utechzone,
    lips,
    careerBreaks,
    researchLearning,
    education,
    skills,
    studyAtlas,
    transcribeForX,
    windowphase,
    copyEn,
    copyZhTw,
  ] = await Promise.all([
    readJson(resolve(baseDir, "identity.json")),
    readJson(resolve(baseDir, "career/dynasafe.json")),
    readJson(resolve(baseDir, "career/metgauge.json")),
    readJson(resolve(baseDir, "career/utechzone.json")),
    readJson(resolve(baseDir, "career/lips.json")),
    readJson(resolve(baseDir, "career/career-breaks.json")),
    readJson(resolve(baseDir, "career/research-learning.json")),
    readJson(resolve(baseDir, "career/education.json")),
    readJson(resolve(baseDir, "career/skills.json")),
    readJson(resolve(baseDir, "projects/study-atlas.json")),
    readJson(resolve(baseDir, "projects/transcribe-for-x.json")),
    readJson(resolve(baseDir, "projects/windowphase.json")),
    readJson(resolve(baseDir, "i18n/en.json")),
    readJson(resolve(baseDir, "i18n/zh-TW.json")),
  ]);

  const professional = [dynasafe, metgauge, utechzone, lips];
  const projects = [studyAtlas, transcribeForX, windowphase];

  // Triad dictionary mapping for convenient lookup
  const triads = {};
  for (const item of [...professional, ...projects]) {
    if (item.triad) {
      triads[item.id] = item.triad;
    }
  }

  const profile = {
    schemaVersion: identityData.schemaVersion || 1,
    evidenceReviewedOn: identityData.evidenceReviewedOn,
    displayStatus: identityData.displayStatus,
    identity: identityData.identity,
    contact: identityData.contact,
    entry: identityData.entry,
    copy: {
      en: copyEn,
      "zh-TW": copyZhTw,
    },
    professional,
    careerBreaks,
    projects,
    researchLearning,
    education,
    skills,
    triads,
  };

  return profile;
}

/**
 * Synchronizes the compiled profile into content/resume-profile.json
 * to guarantee backward compatibility with existing static routes and legacy readers.
 */
export async function syncResumeProfileJson(targetPath = resolve(repoRoot, "content/resume-profile.json")) {
  const profile = await loadModularProfile();
  // Strip internal helpers if any to maintain strict byte parity
  const output = { ...profile };
  delete output.triads;
  // Remove triad property from individual items in legacy file if needed, or keep for enrichment
  // We keep the legacy file clean
  const serialized = JSON.stringify(output, null, 2) + "\n";
  await writeFile(targetPath, serialized, "utf8");
  return profile;
}
