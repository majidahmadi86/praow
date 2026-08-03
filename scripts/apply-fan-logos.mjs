import fs from "fs";

const ROSE = "#C08A6B";

function fanSvg(extraClass = "") {
  const lines = [];
  for (let i = 0; i <= 8; i++) {
    const t = Math.abs(i - 4) / 4;
    const len = 14 - 6 * t;
    const deg = 180 - i * 22.5;
    const rad = (deg * Math.PI) / 180;
    const x2 = (16 + Math.cos(rad) * len).toFixed(2);
    const y2 = (26 - Math.sin(rad) * len).toFixed(2);
    lines.push(
      `<line class="fan-ray" data-ray="${i}" x1="16" y1="26" x2="${x2}" y2="${y2}" stroke="${ROSE}" stroke-width="1.2" stroke-linecap="round"/>`
    );
  }
  const cls = ("logo-fan " + extraClass).trim();
  return `<svg class="${cls}" viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" fill="none"><line x1="6" y1="26" x2="26" y2="26" stroke="${ROSE}" stroke-width="1" stroke-linecap="round"/>${lines.join("")}</svg>`;
}

function heroFanSvg() {
  const cx = 100;
  const cy = 160;
  const lines = [];
  for (let i = 0; i <= 8; i++) {
    const t = Math.abs(i - 4) / 4;
    const len = 90 - 35 * t;
    const deg = 180 - i * 22.5;
    const rad = (deg * Math.PI) / 180;
    const x2 = (cx + Math.cos(rad) * len).toFixed(2);
    const y2 = (cy - Math.sin(rad) * len).toFixed(2);
    lines.push(
      `<line class="fan-ray" data-ray="${i}" x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${ROSE}" stroke-width="2" stroke-linecap="round"/>`
    );
  }
  return `<svg class="hero-fan" viewBox="0 0 200 180" aria-hidden="true" fill="none"><line x1="40" y1="${cy}" x2="160" y2="${cy}" stroke="${ROSE}" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/>${lines.join("")}</svg>`;
}

const navFan = fanSvg();
const footFan = fanSvg("footer-fan");
const archRe = /<svg class="logo-arch"[^>]*>[\s\S]*?<\/svg>/g;

fs.writeFileSync("partials/logo-fan.svg", navFan);
fs.writeFileSync("partials/hero-fan.svg", heroFanSvg());

for (const f of ["index.html", "treatments.html", "results.html", "consult.html", "booking.html"]) {
  let c = fs.readFileSync(f, "utf8");
  c = c.replace(archRe, navFan);
  c = c.replace(
    /(<div class="footer-brand">[\s\S]*?<div class="logo">)\s*<svg class="logo-fan[\s\S]*?<\/svg>/,
    `$1${footFan}`
  );
  // compact one-line footers
  c = c.replace(
    /(<div class="footer-brand">[\s\S]*?<div class="logo"><svg class="logo-fan)(?! footer-fan)/,
    `$1 footer-fan`
  );
  c = c.replace(/praow-v3-b0e5421/g, "praow-v4-pending");
  // ensure footer fan has footer-fan class
  const parts = c.split("site-footer");
  if (parts.length > 1) {
    parts[1] = parts[1].replace(/class="logo-fan"/g, 'class="logo-fan footer-fan"');
    c = parts.join("site-footer");
  }
  fs.writeFileSync(f, c);
  console.log("updated", f);
}

console.log("logos replaced");
