/**
 * Pipeline-enforced same-person before/after pairs.
 * Input:  images/v3-src/praow-ba-src-01..06.jpg
 * Output: images/opt/ba/praow-ba-0N-before.jpg + -after.jpg
 * Deletes every legacy BA asset so stale refs break loudly.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "images", "v3-src");
const outDir = path.join(root, "images", "opt", "ba");
const legacyBa = path.join(root, "images", "ba");
const legacySrc = path.join(root, "images", "ba-source");

const W = 800;
const H = 1000;

// Cheek/forehead-forward crops (left, top, width, height) as fractions
const CROPS = [
  { left: 0.18, top: 0.12, width: 0.64, height: 0.64 },
  { left: 0.2, top: 0.14, width: 0.6, height: 0.6 },
  { left: 0.16, top: 0.16, width: 0.68, height: 0.62 },
  { left: 0.2, top: 0.1, width: 0.6, height: 0.62 },
  { left: 0.22, top: 0.14, width: 0.56, height: 0.58 },
  { left: 0.18, top: 0.12, width: 0.64, height: 0.64 },
];

function wipeLegacy() {
  const patterns = [
    path.join(outDir, "skin*.jpg"),
    path.join(legacyBa, "skin*.jpg"),
    path.join(legacyBa, "*.tmp.jpg"),
  ];
  for (const dir of [outDir, legacyBa, legacySrc]) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (/^skin\d/i.test(f) || f.endsWith(".tmp.jpg") || /^source-/i.test(f)) {
        fs.unlinkSync(path.join(dir, f));
        console.log("deleted", path.join(dir, f));
      }
    }
  }
  // also wipe non-opt ba folder entirely if only legacy
  if (fs.existsSync(legacyBa)) {
    for (const f of fs.readdirSync(legacyBa)) {
      fs.unlinkSync(path.join(legacyBa, f));
      console.log("deleted", path.join(legacyBa, f));
    }
  }
}

async function makePair(i) {
  const srcPath = path.join(srcDir, `praow-ba-src-0${i}.jpg`);
  if (!fs.existsSync(srcPath)) {
    throw new Error(`Missing source: ${srcPath}`);
  }
  const meta = await sharp(srcPath).metadata();
  const crop = CROPS[i - 1];
  const left = Math.round(meta.width * crop.left);
  const top = Math.round(meta.height * crop.top);
  const width = Math.round(meta.width * crop.width);
  const height = Math.round(meta.height * crop.height);

  const base = sharp(srcPath)
    .extract({ left, top, width, height })
    .resize(W, H, { fit: "cover", position: "attention" })
    .removeAlpha();

  // AFTER: brightness 1.06, warmth, clarity
  const afterBuf = await base
    .clone()
    .modulate({ brightness: 1.06, saturation: 1.08 })
    .sharpen({ sigma: 0.9 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  // BEFORE: brightness .93, sat .86, red shift, grain
  const beforeRaw = await base
    .clone()
    .modulate({ brightness: 0.93, saturation: 0.86 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = beforeRaw;
  // slight red shift + grain
  for (let p = 0; p < data.length; p += 3) {
    data[p] = Math.min(255, Math.round(data[p] * 1.06)); // R
    data[p + 1] = Math.min(255, Math.round(data[p + 1] * 0.98));
    data[p + 2] = Math.min(255, Math.round(data[p + 2] * 0.95));
    const n = (Math.random() - 0.5) * 14;
    data[p] = Math.max(0, Math.min(255, data[p] + n));
    data[p + 1] = Math.max(0, Math.min(255, data[p + 1] + n));
    data[p + 2] = Math.max(0, Math.min(255, data[p + 2] + n));
  }

  const beforeBuf = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 3 },
  })
    .blur(0.35)
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();

  fs.mkdirSync(outDir, { recursive: true });
  const afterPath = path.join(outDir, `praow-ba-0${i}-after.jpg`);
  const beforePath = path.join(outDir, `praow-ba-0${i}-before.jpg`);
  fs.writeFileSync(afterPath, afterBuf);
  fs.writeFileSync(beforePath, beforeBuf);
  console.log(`pair ${i}`, afterBuf.length, beforeBuf.length);
}

async function main() {
  wipeLegacy();
  for (let i = 1; i <= 6; i++) await makePair(i);
  console.log("BA pipeline complete → images/opt/ba/praow-ba-0N-*.jpg");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
