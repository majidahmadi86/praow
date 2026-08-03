/**
 * Fetch IMAGE-LAW compliant source portraits for PRAOW v3.
 * Verifies downloads are portraits (min dimensions) before saving.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const out = path.join(root, "images", "v3-src");
fs.mkdirSync(out, { recursive: true });

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const FILES = {
  // Hero: warm golden side-light, calm bare-skin beauty (Asian-reading)
  "hero-src.jpg":
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1600&h=2000&q=90",
  // Botox card: temple/brow profile-adjacent portrait
  "botox-src.jpg":
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&h=1500&q=88",
  // Filler: lips/cheek macro (bare-skin portrait, no mask/towel)
  "filler-src.jpg":
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&h=1750&q=90",
  // Skin quality: glowing bare-skin macro
  "skin-src.jpg":
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&h=1500&q=88",
  // Doctor block: calm wood/linen interior (no dental)
  "interior-src.jpg":
    "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&h=1750&q=88",
  // BA sources · 6 different people · ≥3 Asian-reading
  "praow-ba-src-01.jpg":
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1400&h=1750&q=90",
  "praow-ba-src-02.jpg":
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1400&h=1750&q=90",
  "praow-ba-src-03.jpg":
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&h=1750&q=90",
  "praow-ba-src-04.jpg":
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1400&h=1750&q=90",
  "praow-ba-src-05.jpg":
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1400&h=1750&q=90",
  "praow-ba-src-06.jpg":
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&h=1750&q=90",
};

function fetchBuf(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers: { "User-Agent": UA, Accept: "image/*" } },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuf(res.headers.location).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      }
    );
    req.on("error", reject);
  });
}

async function main() {
  for (const [name, url] of Object.entries(FILES)) {
    process.stdout.write(`fetch ${name} … `);
    const buf = await fetchBuf(url);
    const meta = await sharp(buf).metadata();
    if (!meta.width || meta.width < 400 || meta.height < 400) {
      throw new Error(`${name} too small: ${meta.width}x${meta.height}`);
    }
    // strip EXIF by re-encode
    const clean = await sharp(buf)
      .rotate()
      .jpeg({ quality: 90, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(path.join(out, name), clean);
    console.log(`${meta.width}x${meta.height} → ${clean.length}b`);
  }
  console.log("done → images/v3-src/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
