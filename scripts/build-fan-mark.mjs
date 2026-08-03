/**
 * Radiant-fan logomark + favicon set for PRAOW v4.
 * 9 rays, 22.5° spacing, rose gold #C08A6B on ivory square.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const ROSE = "#C08A6B";
const IVORY = "#FAF6F0";

function fanRays(cx, cy, stroke, scale = 1) {
  const lines = [];
  for (let i = 0; i <= 8; i++) {
    const t = Math.abs(i - 4) / 4;
    const len = (14 - 6 * t) * scale;
    const deg = 180 - i * 22.5;
    const rad = (deg * Math.PI) / 180;
    const x2 = cx + Math.cos(rad) * len;
    const y2 = cy - Math.sin(rad) * len;
    lines.push(
      `<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${ROSE}" stroke-width="${stroke}" stroke-linecap="round"/>`
    );
  }
  return lines.join("");
}

/** Inline nav/footer mark · 32×32, baseline 20px, rays up */
export function fanMarkSvg(attrs = 'class="logo-fan" viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"') {
  const cx = 16;
  const cy = 26;
  const baseline = `<line x1="6" y1="${cy}" x2="26" y2="${cy}" stroke="${ROSE}" stroke-width="1" stroke-linecap="round"/>`;
  return `<svg ${attrs} fill="none">${baseline}${fanRays(cx, cy, 1.2, 1)}</svg>`;
}

/** Favicon · fan on warm ivory rounded square */
function faviconSvg() {
  const cx = 32;
  const cy = 48;
  const baseline = `<line x1="14" y1="${cy}" x2="50" y2="${cy}" stroke="${ROSE}" stroke-width="1.6" stroke-linecap="round"/>`;
  // scale rays ~1.4 for larger canvas
  const lines = [];
  for (let i = 0; i <= 8; i++) {
    const t = Math.abs(i - 4) / 4;
    const len = (14 - 6 * t) * 1.55;
    const deg = 180 - i * 22.5;
    const rad = (deg * Math.PI) / 180;
    const x2 = cx + Math.cos(rad) * len;
    const y2 = cy - Math.sin(rad) * len;
    lines.push(
      `<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${ROSE}" stroke-width="1.8" stroke-linecap="round"/>`
    );
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="${IVORY}"/>
  ${baseline}${lines.join("")}
</svg>`;
}

/** Large decorative fan for hero backdrop */
export function heroFanSvg() {
  const cx = 100;
  const cy = 160;
  const lines = [];
  for (let i = 0; i <= 8; i++) {
    const t = Math.abs(i - 4) / 4;
    const len = (90 - 35 * t);
    const deg = 180 - i * 22.5;
    const rad = (deg * Math.PI) / 180;
    const x2 = cx + Math.cos(rad) * len;
    const y2 = cy - Math.sin(rad) * len;
    lines.push(
      `<line class="fan-ray" data-ray="${i}" x1="${cx}" y1="${cy}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${ROSE}" stroke-width="2" stroke-linecap="round"/>`
    );
  }
  return `<svg class="hero-fan" viewBox="0 0 200 180" aria-hidden="true" fill="none">
  <line x1="40" y1="${cy}" x2="160" y2="${cy}" stroke="${ROSE}" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/>
  ${lines.join("")}
</svg>`;
}

async function main() {
  const mark = fanMarkSvg();
  fs.mkdirSync(path.join(root, "partials"), { recursive: true });
  fs.writeFileSync(path.join(root, "partials", "logo-fan.svg"), mark);
  fs.writeFileSync(path.join(root, "favicon.svg"), faviconSvg());

  const svgBuf = Buffer.from(faviconSvg());
  for (const size of [32, 180, 512]) {
    await sharp(svgBuf).resize(size, size).png().toFile(path.join(root, `favicon-${size}.png`));
    console.log(`favicon-${size}.png`);
  }
  await sharp(svgBuf).resize(180, 180).png().toFile(path.join(root, "apple-touch-icon.png"));
  await sharp(svgBuf).resize(32, 32).png().toFile(path.join(root, "favicon-32x32.png"));

  // delete arch+dot reference
  const old = path.join(root, "partials", "logo-mark.svg");
  if (fs.existsSync(old)) {
    fs.unlinkSync(old);
    console.log("deleted partials/logo-mark.svg");
  }

  console.log("fan mark ready");
  console.log(mark);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
