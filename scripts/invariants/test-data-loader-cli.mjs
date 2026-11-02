import assert from "node:assert/strict";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const tempRoot = await mkdtemp(resolve(tmpdir(), "data-loader-cli-"));
const expectedCopy = "Regression fixture copy";
const compiledPath = resolve(tempRoot, "content/resume-profile.json");

try {
  await cp(resolve(repoRoot, "content"), resolve(tempRoot, "content"), { recursive: true });
  await cp(resolve(repoRoot, "scripts"), resolve(tempRoot, "scripts"), { recursive: true });
  await cp(resolve(repoRoot, "app/public"), resolve(tempRoot, "app/public"), { recursive: true });
  const loaderPath = resolve(tempRoot, "scripts/lib/data-loader.mjs");

  const copyPath = resolve(tempRoot, "content/data/i18n/en.json");
  const copyData = JSON.parse(await readFile(copyPath, "utf8"));
  copyData.lensEmDesc = expectedCopy;
  await writeFile(copyPath, `${JSON.stringify(copyData, null, 2)}\n`);

  const compiledBeforeImport = await readFile(compiledPath, "utf8");
  const { syncResumeProfileJson } = await import(pathToFileURL(loaderPath).href);
  assert.equal(await readFile(compiledPath, "utf8"), compiledBeforeImport, "importing data-loader.mjs should not write the compiled profile");

  const positiveControlPath = resolve(tempRoot, "positive-control-profile.json");
  await syncResumeProfileJson(positiveControlPath);
  const positiveControl = JSON.parse(await readFile(positiveControlPath, "utf8"));
  assert.equal(positiveControl.copy.en.lensEmDesc, expectedCopy);
  console.log("positive control passed: exported sync wrote the changed modular copy");

  const cli = spawnSync(process.execPath, ["scripts/lib/data-loader.mjs"], {
    cwd: tempRoot,
    encoding: "utf8",
  });
  assert.equal(cli.status, 0, `data-loader CLI exited ${cli.status}: ${cli.stderr}`);
  const cliProfile = JSON.parse(await readFile(compiledPath, "utf8"));
  assert.equal(cliProfile.copy.en.lensEmDesc, expectedCopy, "running data-loader.mjs should sync the changed modular copy");
  console.log("data-loader CLI passed: compiled profile contains the changed modular copy");

  const suite = spawnSync(process.execPath, ["scripts/invariants/run-all-invariants.mjs"], {
    cwd: tempRoot,
    encoding: "utf8",
  });
  assert.equal(suite.status, 0, `invariant suite result: ${JSON.stringify({ status: suite.status, signal: suite.signal, error: suite.error?.message, stdout: suite.stdout, stderr: suite.stderr })}`);
  assert.match(suite.stdout, /ALL INVARIANT GATES PASSED/, "invariant suite should report a successful run");
  console.log("invariant suite passed against the synchronized profile");

  const driftedProfile = JSON.parse(await readFile(compiledPath, "utf8"));
  driftedProfile.professional[0].triad.boundary.en = "Regression fixture drift";
  await writeFile(compiledPath, `${JSON.stringify(driftedProfile, null, 2)}\n`);

  const drift = spawnSync(process.execPath, ["scripts/invariants/run-all-invariants.mjs"], {
    cwd: tempRoot,
    encoding: "utf8",
  });
  assert.equal(drift.status, 1, `nested profile drift should exit 1, got ${drift.status}:\n${drift.stdout}\n${drift.stderr}`);
  assert.match(drift.stdout, /Invariant Gate 5/, "nested profile drift should reach the data parity gate");
  assert.match(drift.stderr, /Drift detected between modular content\/data\/ and compiled content\/resume-profile\.json/, "data parity gate should report nested profile drift");
  console.log("negative control passed: invariant suite rejected nested compiled-profile drift");
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}
