/**
 * Build site images from v3-src + favicon PNGs from the arch mark.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = path.join(root, "images", "v3-src");
const opt = path.join(root, "images", "opt");
fs.mkdirSync(opt, { recursive: true });

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#FAF6F0"/>
  <path d="M12 52V30a20 20 0 0 1 40 0v22" stroke="#241F1B" stroke-width="2.4" stroke-linecap="round"/>
  <circle cx="32" cy="12" r="3.2" fill="#A67C46"/>
</svg>`;

async function cropSave(input, output, { width, height, left, top, w, h, quality = 80 }) {
  const meta = await sharp(input).metadata();
  const extract = {
    left: Math.round(meta.width * left),
    top: Math.round(meta.height * top),
    width: Math.round(meta.width * w),
    height: Math.round(meta.height * h),
  };
  await sharp(input)
    .extract(extract)
    .resize(width, height, { fit: "cover" })
    .jpeg({ quality, mozjpeg: true })
    .toFile(output);
  console.log(path.basename(output), fs.statSync(output).size);
}

async function main() {
  // Hero: tall portrait, face-forward
  await cropSave(path.join(src, "hero-src.jpg"), path.join(opt, "hero.jpg"), {
    width: 1200,
    height: 1600,
    left: 0.12,
    top: 0.05,
    w: 0.76,
    h: 0.85,
    quality: 82,
  });

  // Botox: temple/brow profile portrait (from calm hero source)
  await cropSave(path.join(src, "hero-src.jpg"), path.join(opt, "botox-card.jpg"), {
    width: 900,
    height: 1125,
    left: 0.18,
    top: 0.02,
    w: 0.64,
    h: 0.55,
    quality: 80,
  });

  // Filler: lips/cheek
  await cropSave(path.join(src, "filler-src.jpg"), path.join(opt, "filler-card.jpg"), {
    width: 900,
    height: 1125,
    left: 0.2,
    top: 0.38,
    w: 0.6,
    h: 0.48,
    quality: 80,
  });

  // Skin: glowing bare-skin cheek macro
  await cropSave(path.join(src, "praow-ba-src-01.jpg"), path.join(opt, "skin-card.jpg"), {
    width: 900,
    height: 1125,
    left: 0.32,
    top: 0.42,
    w: 0.42,
    h: 0.38,
    quality: 80,
  });

  // Interior: calm wood room
  await sharp(path.join(src, "interior-src.jpg"))
    .resize(1000, 1250, { fit: "cover", position: "centre" })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(opt, "interior.jpg"));
  console.log("interior.jpg", fs.statSync(path.join(opt, "interior.jpg")).size);

  // Delete banned map
  const map = path.join(opt, "map.jpg");
  if (fs.existsSync(map)) {
    fs.unlinkSync(map);
    console.log("deleted map.jpg");
  }
  const mapRoot = path.join(root, "images", "map.jpg");
  if (fs.existsSync(mapRoot)) fs.unlinkSync(mapRoot);

  // Favicons
  const svgBuf = Buffer.from(MARK_SVG);
  fs.writeFileSync(path.join(root, "favicon.svg"), MARK_SVG);
  for (const size of [32, 180, 512]) {
    const out = path.join(root, `favicon-${size}.png`);
    await sharp(svgBuf).resize(size, size).png().toFile(out);
    console.log(`favicon-${size}.png`);
  }
  // also apple-touch / icon aliases
  await sharp(svgBuf).resize(180, 180).png().toFile(path.join(root, "apple-touch-icon.png"));
  await sharp(svgBuf).resize(32, 32).png().toFile(path.join(root, "favicon-32x32.png"));

  console.log("site images ready");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
