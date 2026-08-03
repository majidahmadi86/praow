import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "mockup", "v2");
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  ["home", "index.html"],
  ["treatments", "treatments.html"],
  ["results", "results.html"],
  ["consult", "consult.html"],
  ["booking", "booking.html"],
];

const viewports = [
  ["390", { width: 390, height: 844 }],
  ["1440", { width: 1440, height: 900 }],
];

async function setLang(context, lang) {
  await context.addInitScript((l) => {
    localStorage.setItem("praow-lang", l);
  }, lang);
}

async function shoot() {
  const browser = await chromium.launch({ headless: true });
  for (const lang of ["en", "th"]) {
    for (const [vpName, vp] of viewports) {
      for (const [name, file] of pages) {
        const context = await browser.newContext({
          viewport: vp,
          deviceScaleFactor: 1,
        });
        await setLang(context, lang);
        const page = await context.newPage();
        const url = "file://" + path.join(root, file).replace(/\\/g, "/");
        await page.goto(url, { waitUntil: "networkidle" });
        await page.waitForTimeout(900);
        // force reveals + hero ready
        await page.evaluate(() => {
          document.querySelectorAll(".reveal").forEach((el) => el.classList.add("revealed"));
          const hero = document.querySelector(".hero");
          if (hero) hero.classList.add("is-ready");
        });
        await page.waitForTimeout(200);
        const shot = path.join(outDir, `${name}-${vpName}-${lang}.png`);
        await page.screenshot({ path: shot, fullPage: false });
        console.log("ok", shot);
        await context.close();
      }
    }
  }

  // full-page home EN+TH
  for (const lang of ["en", "th"]) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    await setLang(context, lang);
    const page = await context.newPage();
    await page.goto("file://" + path.join(root, "index.html").replace(/\\/g, "/"), {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("revealed"));
      const hero = document.querySelector(".hero");
      if (hero) hero.classList.add("is-ready");
    });
    await page.waitForTimeout(400);
    const shot = path.join(outDir, `home-full-${lang}.png`);
    await page.screenshot({ path: shot, fullPage: true });
    console.log("ok", shot);
    await context.close();
  }

  // consult filled state
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    await setLang(context, "en");
    const page = await context.newPage();
    await page.goto("file://" + path.join(root, "consult.html").replace(/\\/g, "/"), {
      waitUntil: "networkidle",
    });
    await page.fill("#cf-name", "Mai Thonglor");
    await page.fill("#cf-line", "mai.praow");
    await page.fill("#cf-concern", "Uneven tone on cheeks after sun. Looking at skin booster options.");
    await page.waitForTimeout(200);
    const shot = path.join(outDir, "consult-filled-en.png");
    await page.screenshot({ path: shot, fullPage: false });
    console.log("ok", shot);
    await context.close();
  }

  // BA zoom same-person check
  {
    const context = await browser.newContext({
      viewport: { width: 900, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto("file://" + path.join(root, "results.html").replace(/\\/g, "/"), {
      waitUntil: "networkidle",
    });
    const slider = page.locator(".ba-slider").first();
    await slider.scrollIntoViewIfNeeded();
    await slider.screenshot({ path: path.join(outDir, "ba-pair-zoom.png") });
    console.log("ok ba-pair-zoom");
    await context.close();
  }

  // Thai ascender check crop
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    });
    await setLang(context, "th");
    const page = await context.newPage();
    await page.goto("file://" + path.join(root, "index.html").replace(/\\/g, "/"), {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("revealed"));
      const hero = document.querySelector(".hero");
      if (hero) hero.classList.add("is-ready");
    });
    const title = page.locator(".hero .display");
    await title.screenshot({ path: path.join(outDir, "thai-anuphan-check.png") });
    console.log("ok thai-anuphan-check");
    await context.close();
  }

  // demo ribbon count
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto("file://" + path.join(root, "index.html").replace(/\\/g, "/"), {
      waitUntil: "networkidle",
    });
    const n = await page.locator(".demo-ribbon").count();
    console.log("demo-ribbon-count", n);
    await context.close();
  }

  await browser.close();
}

shoot().catch((e) => {
  console.error(e);
  process.exit(1);
});
