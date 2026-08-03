import sharp from "sharp";

async function label(buf, text) {
  const meta = await sharp(buf).metadata();
  const svg = Buffer.from(
    `<svg width="${meta.width}" height="28"><rect width="100%" height="100%" fill="#32261F"/><text x="12" y="19" fill="#FAF6F0" font-family="Arial" font-size="13">${text}</text></svg>`
  );
  return sharp({
    create: { width: meta.width, height: meta.height + 28, channels: 3, background: "#FAF6F0" },
  })
    .composite([
      { input: svg, top: 0, left: 0 },
      { input: buf, top: 28, left: 0 },
    ])
    .png()
    .toBuffer();
}

const beforeB = await sharp("mockup/v4/palette-before-buttons.png").resize({ width: 700 }).toBuffer();
const afterB = await sharp("mockup/v4/palette-after-buttons.png").resize({ width: 700 }).toBuffer();
const beforeF = await sharp("mockup/v4/palette-before-footer.png").resize({ width: 700 }).toBuffer();
const afterF = await sharp("mockup/v4/palette-after-footer.png").resize({ width: 700 }).toBuffer();

const bb = await label(beforeB, "BEFORE · buttons (black + gold)");
const ab = await label(afterB, "AFTER · buttons (cacao + rose gold)");
const bf = await label(beforeF, "BEFORE · footer");
const af = await label(afterF, "AFTER · footer");

const mb = await sharp(bb).metadata();
const ma = await sharp(ab).metadata();
await sharp({
  create: {
    width: mb.width * 2 + 16,
    height: Math.max(mb.height, ma.height) + 20,
    channels: 3,
    background: "#E8DFD4",
  },
})
  .composite([
    { input: bb, top: 10, left: 8 },
    { input: ab, top: 10, left: mb.width + 16 },
  ])
  .png()
  .toFile("mockup/v4/palette-strip-buttons.png");

const mf = await sharp(bf).metadata();
const mfa = await sharp(af).metadata();
await sharp({
  create: {
    width: mf.width * 2 + 16,
    height: Math.max(mf.height, mfa.height) + 20,
    channels: 3,
    background: "#E8DFD4",
  },
})
  .composite([
    { input: bf, top: 10, left: 8 },
    { input: af, top: 10, left: mf.width + 16 },
  ])
  .png()
  .toFile("mockup/v4/palette-strip-footer.png");

console.log("palette strips written");
