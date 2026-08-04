import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { createReadStream, existsSync, statSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "mockup", "owner");
fs.mkdirSync(outDir, { recursive: true });

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".txt": "text/plain; charset=utf-8"
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      if (urlPath === "/") { urlPath = "/index.html"; }
      if (urlPath.endsWith("/")) { urlPath += "index.html"; }
      const filePath = path.join(root, urlPath.replace(/^\//, ""));
      if (!filePath.startsWith(root) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
        res.writeHead(404); res.end("not found"); return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      createReadStream(filePath).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, base: `http://127.0.0.1:${port}` });
    });
  });
}

async function shot(page, name) {
  const file = path.join(outDir, name);
  await page.screenshot({ path: file, fullPage: false });
  console.log("shot", name);
  return file;
}

const { server, base } = await startServer();
const browser = await chromium.launch();
const report = [];

try {
  // Auth redirect test
  const ctx0 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p0 = await ctx0.newPage();
  await p0.goto(`${base}/owner/dashboard.html`, { waitUntil: "networkidle" });
  await p0.waitForTimeout(300);
  const redirected = p0.url().includes("/owner/index.html") || p0.url().endsWith("/owner/") || p0.url().includes("/owner/index");
  report.push(`auth-redirect: ${redirected ? "PASS" : "FAIL"} url=${p0.url()}`);
  await ctx0.close();

  // Login 1440
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => localStorage.setItem("praow-lang", "en"));
  await page.goto(`${base}/owner/index.html`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await shot(page, "login-1440.png");

  // Login 390
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(200);
  await shot(page, "login-390.png");

  // Sign in
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.click("#owner-login-form button[type=submit]");
  await page.waitForURL(/dashboard/);
  await page.waitForTimeout(1100);
  await shot(page, "dashboard-1440-en.png");

  // Status dropdown change
  const select = page.locator(".status-select").first();
  if (await select.count()) {
    const before = await select.getAttribute("data-status");
    const next = before === "arrived" ? "done" : "arrived";
    await select.selectOption(next);
    await page.waitForTimeout(300);
    const after = await select.getAttribute("data-status");
    report.push(`status-change: ${before} -> ${after} ${after === next ? "PASS" : "FAIL"}`);
    await shot(page, "dashboard-status-changed.png");
  } else {
    report.push("status-change: SKIP (no today rows)");
  }

  // Calendar popover
  const block = page.locator(".cal-block").first();
  if (await block.count()) {
    await block.click();
    await page.waitForTimeout(250);
    const popVisible = await page.locator("#cal-popover:not([hidden])").count();
    report.push(`popover: ${popVisible ? "PASS" : "FAIL"}`);
    await shot(page, "dashboard-popover.png");
    await page.mouse.click(10, 10);
  } else {
    report.push("popover: SKIP");
  }

  // TH
  await page.click('.lang-toggle button[data-lang="th"]');
  await page.waitForTimeout(400);
  await shot(page, "dashboard-1440-th.png");

  // Mobile day view EN
  await page.click('.lang-toggle button[data-lang="en"]');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollTo(0, 520));
  await page.waitForTimeout(200);
  await shot(page, "dashboard-390-en-day.png");

  // CSV via page evaluate
  const csv = await page.evaluate(() => window.PraowOwnerData.toCsv());
  const csvPath = path.join(outDir, "praow-bookings-this-week.csv");
  fs.writeFileSync(csvPath, csv, "utf8");
  const lines = csv.replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
  report.push(`csv-bom: ${csv.charCodeAt(0) === 0xfeff ? "PASS" : "FAIL"}`);
  report.push(`csv-count-lines: ${lines.length}`);
  report.push("csv-first-6:");
  lines.slice(0, 6).forEach((l, i) => report.push(`  ${i + 1}|${l}`));
  const hasThai = /[\u0E00-\u0E7F]/.test(csv);
  report.push(`csv-thai: ${hasThai ? "PASS" : "FAIL"}`);

  // Booking count
  const count = await page.evaluate(() => window.PraowOwnerData.bookings.length);
  const noshow = await page.evaluate(() => window.PraowOwnerData.bookings.filter(b => b.status === "no-show").length);
  report.push(`bookings: ${count} noshow: ${noshow}`);

  // noindex meta
  const robots = await page.evaluate(() => {
    const m = document.querySelector('meta[name="robots"]');
    return m ? m.getAttribute("content") : null;
  });
  report.push(`noindex-meta: ${robots === "noindex,nofollow" ? "PASS" : "FAIL"} (${robots})`);

  fs.writeFileSync(path.join(outDir, "report.txt"), report.join("\n") + "\n");
  console.log(report.join("\n"));
} finally {
  await browser.close();
  server.close();
}
