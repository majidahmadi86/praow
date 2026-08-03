/**
 * Image-by-image verification shots for PRAOW design v3.
 * Prefer LIVE base URL so CDN/immutable cache claims are real.
 */
import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "mockup", "v3");
fs.mkdirSync(outDir, { recursive: true });

const BASE = process.env.PRAOW_BASE || "https://praow.mikaro.studio";

const pages = [
  ["home", "/"],
  ["treatments", "/treatments"],
  ["results", "/results"],
  ["consult", "/consult"],
  ["booking", "/booking"],
];

const viewports = [
  ["390", { width: 390, height: 844 }],
  ["1440", { width: 1440, height: 900 }],
];

async function prep(page) {
  await page.evaluate(() => {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("revealed"));
    const hero = document.querySelector(".hero");
    if (hero) hero.classList.add("is-ready");
  });
  await page.waitForTimeout(400);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const report = { base: BASE, build: null, shots: [] };

  // First-viewport matrix
  for (const lang of ["en", "th"]) {
    for (const [vpName, vp] of viewports) {
      for (const [name, route] of pages) {
        const context = await browser.newContext({
          viewport: vp,
          deviceScaleFactor: 1,
        });
        await context.addInitScript((l) => localStorage.setItem("praow-lang", l), lang);
        const page = await context.newPage();
        await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 60000 });
        await prep(page);
        if (!report.build) {
          report.build = await page.evaluate(() => {
            const m = document.querySelector('meta[name="praow-build"]');
            return {
              meta: m ? m.getAttribute("content") : null,
              dataAttr: document.documentElement.getAttribute("data-praow-build"),
            };
          });
        }
        const file = `${name}-${vpName}-${lang}.png`;
        await page.screenshot({ path: path.join(outDir, file), fullPage: false });
        report.shots.push(file);
        console.log("ok", file);
        await context.close();
      }
    }
  }

  // 6 individual BA sliders from deployed results
  {
    const context = await browser.newContext({
      viewport: { width: 1100, height: 900 },
      deviceScaleFactor: 1,
    });
    await context.addInitScript(() => localStorage.setItem("praow-lang", "en"));
    const page = await context.newPage();
    await page.goto(BASE + "/results", { waitUntil: "networkidle", timeout: 60000 });
    await prep(page);
    const items = await page.$$(".ba-item");
    for (let i = 0; i < items.length; i++) {
      await items[i].scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      const file = `ba-slider-0${i + 1}.png`;
      await items[i].screenshot({ path: path.join(outDir, file) });
      report.shots.push(file);
      console.log("ok", file);
    }
    await context.close();
  }

  // Consult full form EN + TH
  for (const lang of ["en", "th"]) {
    const context = await browser.newContext({
      viewport: { width: 900, height: 1400 },
      deviceScaleFactor: 1,
    });
    await context.addInitScript((l) => localStorage.setItem("praow-lang", l), lang);
    const page = await context.newPage();
    await page.goto(BASE + "/consult", { waitUntil: "networkidle", timeout: 60000 });
    await prep(page);
    const form = await page.$("#consult-form");
    const file = `consult-form-${lang}.png`;
    if (form) await form.screenshot({ path: path.join(outDir, file) });
    else await page.screenshot({ path: path.join(outDir, file), fullPage: true });
    report.shots.push(file);
    console.log("ok", file);
    await context.close();
  }

  // Booking deposit + success
  {
    const context = await browser.newContext({
      viewport: { width: 900, height: 1100 },
      deviceScaleFactor: 1,
    });
    await context.addInitScript(() => localStorage.setItem("praow-lang", "en"));
    const page = await context.newPage();
    await page.goto(BASE + "/booking", { waitUntil: "networkidle", timeout: 60000 });
    await prep(page);
    // step 1 → pick service
    await page.click("[data-service='0']").catch(() => {});
    await page.click("[data-to-step='2']");
    await page.waitForTimeout(300);
    await page.click("[data-day='0']").catch(() => {});
    const slot = await page.$(".slot-btn:not([disabled])");
    if (slot) await slot.click();
    await page.click("[data-to-step='3']");
    await page.waitForTimeout(500);
    let file = "booking-deposit.png";
    await page.screenshot({ path: path.join(outDir, file), fullPage: false });
    report.shots.push(file);
    console.log("ok", file);
    await page.click("[data-confirm='1']");
    await page.waitForTimeout(600);
    file = "booking-success.png";
    await page.screenshot({ path: path.join(outDir, file), fullPage: false });
    report.shots.push(file);
    console.log("ok", file);
    await context.close();
  }

  // Footer EN + TH
  for (const lang of ["en", "th"]) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    await context.addInitScript((l) => localStorage.setItem("praow-lang", l), lang);
    const page = await context.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 60000 });
    await prep(page);
    const foot = await page.$(".site-footer");
    const file = `footer-${lang}.png`;
    if (foot) {
      await foot.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await foot.screenshot({ path: path.join(outDir, file) });
    }
    report.shots.push(file);
    console.log("ok", file);
    await context.close();
  }

  // Favicon / tab chrome (browser chrome limited in headless; capture logo + svg mark instead + document favicon request)
  {
    const context = await browser.newContext({
      viewport: { width: 720, height: 200 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    const faviconHits = [];
    page.on("response", (res) => {
      if (/favicon|apple-touch/i.test(res.url())) faviconHits.push({ url: res.url(), status: res.status() });
    });
    await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 60000 });
    await page.evaluate(() => {
      document.body.innerHTML =
        '<div style="display:flex;align-items:center;gap:16px;padding:24px;background:#FAF6F0;font-family:Georgia,serif">' +
        document.querySelector(".logo").outerHTML +
        '<img src="favicon.svg" width="48" height="48" alt="favicon">' +
        '<img src="favicon-32x32.png" width="32" height="32" alt="32">' +
        "</div>";
    });
    const file = "favicon-lockup.png";
    await page.screenshot({ path: path.join(outDir, file) });
    report.shots.push(file);
    report.faviconHits = faviconHits;
    console.log("ok", file, faviconHits);
    await context.close();
  }

  // Signature treatments title (clip check) 390 + 1440
  for (const [vpName, vp] of viewports) {
    const context = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
    await context.addInitScript(() => localStorage.setItem("praow-lang", "en"));
    const page = await context.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 60000 });
    await prep(page);
    const head = await page.$(".section-ivory .section-head");
    const file = `sig-title-${vpName}.png`;
    if (head) {
      await head.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await head.screenshot({ path: path.join(outDir, file) });
    }
    report.shots.push(file);
    console.log("ok", file);
    await context.close();
  }

  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
  console.log("BUILD", JSON.stringify(report.build));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
