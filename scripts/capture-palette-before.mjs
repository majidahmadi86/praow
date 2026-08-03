import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "mockup", "v4");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto("https://praow.mikaro.studio/", { waitUntil: "networkidle" });
await page.evaluate(() => {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("revealed"));
});
const foot = page.locator(".site-footer");
await foot.scrollIntoViewIfNeeded();
await foot.screenshot({ path: path.join(out, "palette-before-footer.png") });

await page.setContent(`<!DOCTYPE html><html><head>
<link rel="stylesheet" href="file://${root.replace(/\\/g, "/")}/css/style.css">
<link rel="stylesheet" href="file://${root.replace(/\\/g, "/")}/fonts/fonts.css">
</head><body style="background:#FAF6F0;padding:48px">
<div style="display:flex;gap:14px;flex-wrap:wrap">
<a class="btn" href="#">Book now</a>
<a class="btn ghost" href="#">Free consultation</a>
<a class="btn bronze" href="#">Confirm booking</a>
</div></body></html>`);
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(out, "palette-before-buttons.png") });
await browser.close();
console.log("palette before ok");
