/**
 * Builds the encrypted certificate previews served by /api/cert/[id].
 *
 * Originals live in private/certificates/ as `<id>-original.<ext>` and are
 * git-ignored (the repo is public). Each one is downscaled to a WebP preview and
 * encrypted with AES-256-GCM into `<id>.enc`, so only ciphertext is committed.
 * The key is read from CERT_KEY (base64, 32 bytes); if missing, one is generated
 * and appended to .env.local.
 *
 * Usage: pnpm cert:build
 */
import { readFile, writeFile, appendFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { randomBytes, createCipheriv } from "node:crypto";
import sharp from "sharp";

const DIR = "private/certificates";

async function loadKey() {
  let key = process.env.CERT_KEY;
  if (!key && existsSync(".env.local")) {
    const env = await readFile(".env.local", "utf8");
    key = env.match(/^CERT_KEY=(.+)$/m)?.[1]?.trim();
  }
  if (!key) {
    key = randomBytes(32).toString("base64");
    await appendFile(".env.local", `\nCERT_KEY=${key}\n`);
    console.log("Generated CERT_KEY and saved it to .env.local");
  }
  const buf = Buffer.from(key, "base64");
  if (buf.length !== 32) throw new Error("CERT_KEY must be 32 bytes, base64-encoded");
  return buf;
}

const key = await loadKey();
const originals = (await readdir(DIR)).filter((f) => /-original\.(jpe?g|png|webp)$/i.test(f));
if (originals.length === 0) console.log(`No *-original images found in ${DIR}`);

for (const file of originals) {
  const id = file.replace(/-original\.[^.]+$/, "");
  const preview = await sharp(path.join(DIR, file))
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  // Layout: [12-byte IV][16-byte auth tag][ciphertext]
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(preview), cipher.final()]);
  await writeFile(path.join(DIR, `${id}.enc`), Buffer.concat([iv, cipher.getAuthTag(), encrypted]));
  console.log(`${id}: ${(preview.length / 1024).toFixed(0)} KB preview, encrypted`);
}
