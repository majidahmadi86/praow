/**
 * BA realism pass v5 · texture→smoothness (not light→dark).
 * Output: images/opt/ba/praow-ba-0N-{before,after}-v5.jpg
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "images", "v3-src");
const outDir = path.join(root, "images", "opt", "ba");

const W = 800;
const H = 1000;

const CROPS = [
  { left: 0.18, top: 0.12, width: 0.64, height: 0.64 },
  { left: 0.2, top: 0.14, width: 0.6, height: 0.6 },
  { left: 0.16, top: 0.16, width: 0.68, height: 0.62 },
  { left: 0.2, top: 0.1, width: 0.6, height: 0.62 },
  { left: 0.22, top: 0.14, width: 0.56, height: 0.58 },
  { left: 0.18, top: 0.12, width: 0.64, height: 0.64 },
];

async function makePair(i) {
  const srcPath = path.join(srcDir, `praow-ba-src-0${i}.jpg`);
  if (!fs.existsSync(srcPath)) throw new Error(`Missing source: ${srcPath}`);
  const meta = await sharp(srcPath).metadata();
  const crop = CROPS[i - 1];
  const extract = {
    left: Math.round(meta.width * crop.left),
    top: Math.round(meta.height * crop.top),
    width: Math.round(meta.width * crop.width),
    height: Math.round(meta.height * crop.height),
  };

  const cropped = await sharp(srcPath)
    .extract(extract)
    .resize(W, H, { fit: "cover", position: "attention" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data: srcData, info } = cropped;
  const beforeData = Buffer.from(srcData);
  const afterData = Buffer.from(srcData);

  // BEFORE: sharpen-accentuated pores + red shift + brightness .94 + fine grain
  // Emulate sharpen by local contrast boost on luminance, then red shift
  for (let p = 0; p < beforeData.length; p += 3) {
    let r = beforeData[p];
    let g = beforeData[p + 1];
    let b = beforeData[p + 2];
    // mild local contrast (sharpen feel)
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const sharpened = lum + (lum - 128) * 0.4; // ~1.4 edge emphasis feel
    const scale = lum > 1 ? sharpened / lum : 1;
    r = Math.max(0, Math.min(255, r * scale));
    g = Math.max(0, Math.min(255, g * scale));
    b = Math.max(0, Math.min(255, b * scale));
    // brightness 0.94 + red shift
    r = Math.min(255, r * 0.94 * 1.07);
    g = Math.min(255, g * 0.94 * 0.97);
    b = Math.min(255, b * 0.94 * 0.93);
    const n = (Math.random() - 0.5) * 16;
    beforeData[p] = Math.max(0, Math.min(255, Math.round(r + n)));
    beforeData[p + 1] = Math.max(0, Math.min(255, Math.round(g + n)));
    beforeData[p + 2] = Math.max(0, Math.min(255, Math.round(b + n)));
  }

  const beforeBuf = await sharp(beforeData, {
    raw: { width: info.width, height: info.height, channels: 3 },
  })
    .sharpen({ sigma: 1.4 })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();

  // AFTER: gaussian blur 0.5 THEN mild sharpen 0.6 + brightness 1.05 + warm sat
  const afterBuf = await sharp(afterData, {
    raw: { width: info.width, height: info.height, channels: 3 },
  })
    .blur(0.5)
    .sharpen({ sigma: 0.6 })
    .modulate({ brightness: 1.05, saturation: 1.06 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  fs.mkdirSync(outDir, { recursive: true });
  const beforePath = path.join(outDir, `praow-ba-0${i}-before-v5.jpg`);
  const afterPath = path.join(outDir, `praow-ba-0${i}-after-v5.jpg`);
  // also sm variants for perf
  await sharp(beforeBuf).resize(560, 700).jpeg({ quality: 68, mozjpeg: true })
    .toFile(path.join(outDir, `praow-ba-0${i}-before-v5-sm.jpg`));
  await sharp(afterBuf).resize(560, 700).jpeg({ quality: 68, mozjpeg: true })
    .toFile(path.join(outDir, `praow-ba-0${i}-after-v5-sm.jpg`));
  fs.writeFileSync(beforePath, beforeBuf);
  fs.writeFileSync(afterPath, afterBuf);
  console.log(`pair ${i} v5`, beforeBuf.length, afterBuf.length);
}

async function main() {
  for (let i = 1; i <= 6; i++) await makePair(i);
  console.log("BA v5 complete");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
