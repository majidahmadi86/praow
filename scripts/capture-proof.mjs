import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";

const BASE = process.env.RAVEE_URL || "https://ravee-preview.vercel.app";
const OUT = path.resolve("mockup");
const pages = ["", "treatments", "results", "consult", "booking"];
const langs = ["en", "th"];
const widths = [390, 1440];

async function setLang(page, lang) {
  await page.addInitScript((l) => {
    localStorage.setItem("ravee-lang", l);
  }, lang);
}

async function shot(page, name) {
  const file = path.join(OUT, name);
  await page.waitForTimeout(700);
  await page.screenshot({ path: file, fullPage: true });
  console.log("wrote", name);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext();

  for (const lang of langs) {
    for (const w of widths) {
      for (const p of pages) {
        const page = await context.newPage();
        await page.setViewportSize({ width: w, height: w === 390 ? 844 : 900 });
        await setLang(page, lang);
        const url = `${BASE}/${p}`;
        await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
        await page.waitForTimeout(1200);
        const slug = p || "index";
        await shot(page, `${slug}-${lang}-${w}.png`);
        await page.close();
      }
    }
  }

  // Booking flow at 390
  {
    const page = await context.newPage();
    await page.setViewportSize({ width: 390, height: 844 });
    await setLang(page, "en");
    await page.goto(`${BASE}/booking`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    await shot(page, "flow-booking-1-service-390.png");
    await page.click('[data-to-step="2"]');
    await page.waitForTimeout(400);
    await shot(page, "flow-booking-2-slots-390.png");
    const slot = page.locator(".slot-btn:not([disabled])").first();
    await slot.click();
    await page.click('[data-to-step="3"]');
    await page.waitForTimeout(400);
    await shot(page, "flow-booking-3-deposit-390.png");
    await page.click("[data-confirm]");
    await page.waitForTimeout(400);
    await shot(page, "flow-booking-4-success-390.png");
    await page.close();
  }

  // Consult funnel with upload
  {
    const page = await context.newPage();
    await page.setViewportSize({ width: 390, height: 844 });
    await setLang(page, "th");
    await page.goto(`${BASE}/consult`, { waitUntil: "networkidle" });
    await page.fill('textarea[name="concern"]', "อยากปรึกษาเรื่องผิวไม่เรียบ");
    await page.fill('input[name="name"]', "ทดสอบ");
    await page.fill('input[name="line"]', "demo.ravee");
    await page.setInputFiles('input[type="file"]', path.resolve("images/skin-macro.jpg"));
    await page.waitForTimeout(400);
    await shot(page, "flow-consult-1-form-390.png");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
    await shot(page, "flow-consult-2-success-390.png");
    await page.close();
  }

  await browser.close();
  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
