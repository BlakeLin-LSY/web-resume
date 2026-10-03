import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assets = JSON.parse(await readFile(resolve(root, "content/resume-assets.json"), "utf8"));
if (assets.schemaVersion !== 1 || Object.keys(assets.locales).sort().join() !== "en,zh-TW") throw new Error("Two CV locales required");
for (const [locale, asset] of Object.entries(assets.locales)) {
  if (!/^[a-z0-9-]+\.pdf$/.test(asset.file)) throw new Error("Invalid CV filename");
  const bytes = await readFile(resolve(root, "app/public/resume", asset.file));
  if (!bytes.subarray(0, 5).equals(Buffer.from("%PDF-"))) throw new Error("Invalid PDF signature");
  if (bytes.length !== asset.bytes || createHash("sha256").update(bytes).digest("hex") !== asset.sha256) throw new Error(`CV asset drift: ${locale}`);
  console.log(`Verified CV ${locale}: ${bytes.length} bytes, canonical snapshot ${assets.sourceVersion}`);
}
