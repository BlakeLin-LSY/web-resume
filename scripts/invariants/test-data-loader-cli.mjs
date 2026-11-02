import assert from "node:assert/strict";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const tempRoot = await mkdtemp(resolve(tmpdir(), "data-loader-cli-"));
const expectedRole = "Regression fixture role";
const compiledPath = resolve(tempRoot, "content/resume-profile.json");

try {
  await mkdir(resolve(tempRoot, "content"), { recursive: true });
  await mkdir(resolve(tempRoot, "scripts/lib"), { recursive: true });
  await cp(resolve(repoRoot, "content/data"), resolve(tempRoot, "content/data"), { recursive: true });
  await cp(resolve(repoRoot, "content/resume-profile.json"), compiledPath);
  const loaderPath = resolve(tempRoot, "scripts/lib/data-loader.mjs");
  await cp(resolve(repoRoot, "scripts/lib/data-loader.mjs"), loaderPath);

  const identityPath = resolve(tempRoot, "content/data/identity.json");
  const identityData = JSON.parse(await readFile(identityPath, "utf8"));
  identityData.identity.role = expectedRole;
  await writeFile(identityPath, `${JSON.stringify(identityData, null, 2)}\n`);

  const cli = spawnSync(process.execPath, ["scripts/lib/data-loader.mjs"], {
    cwd: tempRoot,
    encoding: "utf8",
  });
  assert.equal(cli.status, 0, `data-loader CLI exited ${cli.status}: ${cli.stderr}`);
  const cliProfile = JSON.parse(await readFile(compiledPath, "utf8"));

  const { syncResumeProfileJson } = await import(pathToFileURL(loaderPath).href);
  const positiveControlPath = resolve(tempRoot, "positive-control-profile.json");
  await syncResumeProfileJson(positiveControlPath);
  const positiveControl = JSON.parse(await readFile(positiveControlPath, "utf8"));
  assert.equal(positiveControl.identity.role, expectedRole);
  console.log("positive control passed: exported sync wrote the changed modular role");

  assert.equal(cliProfile.identity.role, expectedRole, "running data-loader.mjs should sync the changed modular role");
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}
