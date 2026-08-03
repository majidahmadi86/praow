/**
 * PRAOW design v4 verification captures from live preview.
 */
import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "mockup", "v4");
fs.mkdirSync(out, { recursive: true });
const BASE = process.env.PRAOW_BASE || "https://praow.mikaro.studio";

async function prep(page) {
  await page.evaluate(() => {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("revealed"));
    document.querySelectorAll(".section-ivory, .section-blush").forEach((el) => el.classList.add("in-view"));
    const hero = document.querySelector(".hero");
    if (hero) hero.classList.add("is-ready");
    const foot = document.querySelector(".site-footer");
    if (foot) foot.classList.add("is-lit");
  });
  await page.waitForTimeout(700);
}

const browser = await chromium.launch({ headless: true });
const report = { base: BASE, build: null, shots: [], lh: [] };

// Logo zoom
{
  const ctx = await browser.newContext({ viewport: { width: 720, height: 200 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate(() => {
    const logo = document.querySelector(".logo");
    document.body.innerHTML =
      '<div style="padding:28px;background:#FAF6F0;display:flex;align-items:center;gap:20px">' +
      logo.outerHTML +
      '<img src="favicon.svg" width="48" height="48" alt="favicon">' +
      '<img src="favicon-32x32.png" width="32" height="32" alt="32">' +
      "</div>";
  });
  await page.screenshot({ path: path.join(out, "logo-lockup.png") });
  report.shots.push("logo-lockup.png");
  await ctx.close();
}

// Palette after
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 60000 });
  await prep(page);
  report.build = await page.evaluate(() => {
    const m = document.querySelector('meta[name="praow-build"]');
    return { meta: m && m.getAttribute("content"), data: document.documentElement.getAttribute("data-praow-build") };
  });
  const foot = page.locator(".site-footer");
  await foot.scrollIntoViewIfNeeded();
  await foot.screenshot({ path: path.join(out, "palette-after-footer.png") });
  await page.setContent(`<!DOCTYPE html><html><head>
<link rel="stylesheet" href="${BASE}/css/style.css">
<link rel="stylesheet" href="${BASE}/fonts/fonts.css">
</head><body style="background:#FAF6F0;padding:48px">
<div style="display:flex;gap:14px;flex-wrap:wrap">
<a class="btn" href="#">Book now</a>
<a class="btn ghost" href="#">Free consultation</a>
<a class="btn bronze" href="#">Confirm booking</a>
</div></body></html>`);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(out, "palette-after-buttons.png") });
  report.shots.push("palette-after-footer.png", "palette-after-buttons.png");
  await ctx.close();
}

// Heroes
for (const lang of ["en", "th"]) {
  for (const [name, vp] of [
    ["1440", { width: 1440, height: 900 }],
    ["390", { width: 390, height: 844 }],
    ["360", { width: 360, height: 740 }],
  ]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
    await ctx.addInitScript((l) => localStorage.setItem("praow-lang", l), lang);
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 60000 });
    await prep(page);
    const file = `hero-${name}-${lang}.png`;
    await page.screenshot({ path: path.join(out, file), fullPage: false });
    report.shots.push(file);
    console.log("ok", file);
    await ctx.close();
  }
}

// Hero load frames
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => localStorage.setItem("praow-lang", "en"));
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.evaluate(() => {
    const hero = document.querySelector(".hero");
    if (hero) hero.classList.remove("is-ready");
  });
  for (let i = 0; i < 6; i++) {
    if (i === 1) {
      await page.evaluate(() => {
        const hero = document.querySelector(".hero");
        if (hero) hero.classList.add("is-ready");
      });
    }
    await page.waitForTimeout(i === 0 ? 80 : 180);
    const file = `hero-load-frame-0${i + 1}.png`;
    await page.screenshot({ path: path.join(out, file), fullPage: false });
    report.shots.push(file);
    console.log("ok", file);
  }
  await ctx.close();
}

// Booking ticket EN + TH
for (const lang of ["en", "th"]) {
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1200 } });
  await ctx.addInitScript((l) => localStorage.setItem("praow-lang", l), lang);
  const page = await ctx.newPage();
  await page.goto(BASE + "/booking", { waitUntil: "networkidle", timeout: 60000 });
  await prep(page);
  await page.click("[data-service='0']").catch(() => {});
  await page.click("[data-to-step='2']");
  await page.waitForTimeout(200);
  await page.click("[data-day='0']").catch(() => {});
  const slot = page.locator(".slot-btn:not([disabled])").first();
  await slot.click();
  await page.click("[data-to-step='3']");
  await page.waitForTimeout(300);
  await page.click("[data-confirm='1']");
  await page.waitForTimeout(800);
  const file = `ticket-${lang}.png`;
  await page.screenshot({ path: path.join(out, file), fullPage: false });
  report.shots.push(file);
  console.log("ok", file);
  await ctx.close();
}

// Footer after
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 60000 });
  await prep(page);
  const foot = page.locator(".site-footer");
  await foot.scrollIntoViewIfNeeded();
  await foot.screenshot({ path: path.join(out, "footer-fan.png") });
  report.shots.push("footer-fan.png");
  await ctx.close();
}

fs.writeFileSync(path.join(out, "report.json"), JSON.stringify(report, null, 2));
console.log("BUILD", JSON.stringify(report.build));
await browser.close();
