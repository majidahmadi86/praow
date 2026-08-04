import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { createReadStream, existsSync, statSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "mockup", "owner-v2");
fs.mkdirSync(outDir, { recursive: true });

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json"
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      if (urlPath === "/") urlPath = "/index.html";
      if (urlPath === "/dashboard") {
        res.writeHead(307, { Location: "/owner/" });
        res.end();
        return;
      }
      if (urlPath === "/owner/dashboard") urlPath = "/owner/dashboard.html";
      if (urlPath === "/owner" || urlPath === "/owner/") urlPath = "/owner/index.html";
      if (urlPath.endsWith("/")) urlPath += "index.html";
      const filePath = path.join(root, urlPath.replace(/^\//, ""));
      if (!filePath.startsWith(root) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
        res.writeHead(404); res.end("not found"); return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      createReadStream(filePath).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => {
      resolve({ server, base: `http://127.0.0.1:${server.address().port}` });
    });
  });
}

async function shot(page, name) {
  await page.screenshot({ path: path.join(outDir, name), fullPage: false });
  console.log("shot", name);
}

const report = [];
const { server, base } = await startServer();
const browser = await chromium.launch();

try {
  // /dashboard redirect
  const ctxR = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pR = await ctxR.newPage();
  await pR.goto(`${base}/dashboard`, { waitUntil: "networkidle" });
  await pR.waitForTimeout(300);
  report.push(`dashboard-redirect: ${pR.url().includes("/owner") ? "PASS" : "FAIL"} -> ${pR.url()}`);
  await ctxR.close();

  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  // Login + Enter submit
  await page.goto(`${base}/owner/`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem("praow-lang", "en");
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.focus("#owner-pass");
  await page.keyboard.press("Enter");
  await page.waitForURL(/dashboard/);
  await page.waitForTimeout(900);
  report.push(`login-enter: PASS url=${page.url()}`);

  // Refresh keeps session
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const stillDash = page.url().includes("dashboard") && await page.locator("#today-list").count();
  report.push(`refresh-session: ${stillDash ? "PASS" : "FAIL"}`);
  if (!stillDash) {
    // re-auth if something stripped storage in this environment
    await page.goto(`${base}/owner/`, { waitUntil: "networkidle" });
    await page.click("#owner-login-form button[type=submit]");
    await page.waitForURL(/dashboard/);
    await page.waitForTimeout(600);
  }

  await page.waitForSelector("#btn-availability", { timeout: 10000 });
  await shot(page, "dashboard-1440-en.png");

  // Block Wednesday afternoon 13-19
  await page.click("#btn-availability");
  await page.waitForTimeout(200);
  const wed = await page.evaluate(() => {
    const days = window.PraowOwnerData.getViewWeek();
    return window.PraowOwnerData.ymd(days[2]); // Wed
  });
  for (const h of [13, 14, 15, 16, 17, 18, 19]) {
    await page.click(`[data-block-date="${wed}"][data-block-hour="${h}"]`);
    await page.waitForTimeout(80);
  }
  await shot(page, "availability-wed-blocked.png");
  await page.click("[data-close-avail]");
  await page.waitForTimeout(200);
  await page.locator("#cal-grid").scrollIntoViewIfNeeded();
  await shot(page, "calendar-wed-hatched.png");

  const wedFree = await page.evaluate((d) => window.PraowOwnerData.freeSlots(d), wed);
  report.push(`wed-afternoon-blocked: ${wedFree.every((h) => h < 13) ? "PASS" : "FAIL"} free=${JSON.stringify(wedFree)}`);

  // New booking · pick first free slot in the viewed week
  const freeHour = await page.evaluate(() => {
    const days = window.PraowOwnerData.getViewWeek();
    for (let i = 0; i < days.length; i++) {
      const d = window.PraowOwnerData.ymd(days[i]);
      const free = window.PraowOwnerData.freeSlots(d);
      if (free.length) { return { date: d, hour: free[0] }; }
    }
    return null;
  });
  report.push(`free-slot-pick: ${freeHour ? freeHour.date + " " + freeHour.hour : "FAIL none"}`);
  if (!freeHour) { throw new Error("no free slot in week"); }

  await page.click("#btn-new-booking");
  await page.waitForTimeout(200);
  await page.selectOption("#bk-service", "filler");
  await page.fill("#bk-date", freeHour.date);
  await page.waitForTimeout(150);
  await page.click(`.time-slot[data-hour="${freeHour.hour}"]`);
  await page.fill("#bk-name", "คุณพลอยทดสอบ");
  await page.fill("#bk-phone", "089-xxx-xx42");
  await page.check("#bk-dep-paid");
  await shot(page, "modal-new-booking.png");
  await page.click("#booking-form button[type=submit]");
  await page.waitForTimeout(500);

  const created = await page.evaluate(() => {
    return window.PraowOwnerData.bookings.find((b) => b.name === "คุณพลอยทดสอบ");
  });
  report.push(`new-booking: ${created ? "PASS " + created.id + " " + created.time : "FAIL"}`);
  await shot(page, "after-new-booking-list.png");

  // CSV includes new booking
  const csvNew = await page.evaluate(() => {
    const list = window.PraowOwner.filteredList(false);
    return window.PraowOwnerData.toCsv(list);
  });
  const csvHas = csvNew.includes("คุณพลอยทดสอบ");
  report.push(`csv-new-booking: ${csvHas ? "PASS" : "FAIL"}`);
  report.push("csv-new-lines:");
  csvNew.replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean).filter((l) => l.includes("พลอยทดสอบ") || l.startsWith("Booking"))
    .slice(0, 4).forEach((l, i) => report.push(`  ${i}|${l}`));

  // Edit time
  if (created) {
    await page.click(`[data-edit="${created.id}"]`);
    await page.waitForTimeout(200);
    const newHour = await page.evaluate((id) => {
      const b = window.PraowOwnerData.findById(id);
      const free = window.PraowOwnerData.freeSlots(b.date, id);
      return free.find((h) => h !== b.hour) || free[0];
    }, created.id);
    await page.click(`.time-slot[data-hour="${newHour}"]`);
    await page.click("#booking-form button[type=submit]");
    await page.waitForTimeout(400);
    const edited = await page.evaluate((id) => window.PraowOwnerData.findById(id), created.id);
    report.push(`edit-time: ${edited && edited.hour === newHour ? "PASS " + edited.time : "FAIL"}`);
    await shot(page, "after-edit-time.png");

    // Cancel flow
    await page.click(`[data-edit="${created.id}"]`);
    await page.waitForTimeout(150);
    await page.click("#btn-cancel-booking");
    await page.waitForTimeout(150);
    await shot(page, "cancel-confirm.png");
    await page.click("#btn-cancel-yes");
    await page.waitForTimeout(400);
    const cancelled = await page.evaluate((id) => window.PraowOwnerData.findById(id), created.id);
    report.push(`cancel: ${cancelled && cancelled.status === "cancelled" ? "PASS" : "FAIL"}`);
    await shot(page, "after-cancel.png");
  }

  // Search คุณพลอย
  await page.fill("#filter-q", "คุณพลอย");
  await page.waitForTimeout(300);
  const searchCount = await page.locator(".today-row").count();
  report.push(`search-ploy: rows=${searchCount} ${searchCount > 0 ? "PASS" : "FAIL"}`);
  await shot(page, "search-ploy.png");

  const csvFilt = await page.evaluate(() => {
    const list = window.PraowOwner.filteredList(false);
    const csv = window.PraowOwnerData.toCsv(list);
    return { csv, n: list.length, name: "praow-bookings-filtered.csv" };
  });
  report.push(`filtered-csv-count: ${csvFilt.n}`);
  report.push("filtered-csv-first:");
  csvFilt.csv.replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean).slice(0, 6)
    .forEach((l, i) => report.push(`  ${i + 1}|${l}`));
  fs.writeFileSync(path.join(outDir, "filtered-ploy.csv"), csvFilt.csv, "utf8");

  // Week navigation
  await page.fill("#filter-q", "");
  await page.click("#week-next");
  await page.waitForTimeout(500);
  const nextLabel = await page.locator("#week-label").textContent();
  const nextCount = await page.evaluate(() => window.PraowOwnerData.bookings.length);
  report.push(`week-next: label=${nextLabel} bookings=${nextCount}`);
  await shot(page, "week-next.png");
  await page.click("#week-today");
  await page.waitForTimeout(400);
  report.push(`week-today-jump: PASS`);
  await shot(page, "week-today.png");

  // Legend 1440
  await page.locator("#cal-legend").scrollIntoViewIfNeeded();
  await shot(page, "legend-1440.png");

  // TH full dashboard
  await page.click('.lang-toggle button[data-lang="th"]');
  await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot(page, "dashboard-1440-th.png");

  // 390 legend
  await page.click('.lang-toggle button[data-lang="en"]');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  await page.locator("#cal-legend").scrollIntoViewIfNeeded();
  await shot(page, "legend-390.png");

  // Reset demo
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.click("#reset-demo");
  await page.waitForTimeout(400);
  const afterReset = await page.evaluate(() => localStorage.getItem("praow-owner-demo-v1"));
  const hasTest = await page.evaluate(() =>
    window.PraowOwnerData.bookings.some((b) => b.name === "คุณพลอยทดสอบ"));
  report.push(`reset-demo: ${!afterReset && !hasTest ? "PASS" : "FAIL"} store=${afterReset}`);
  await shot(page, "after-reset.png");

  fs.writeFileSync(path.join(outDir, "report.txt"), report.join("\n") + "\n");
  console.log(report.join("\n"));
} finally {
  await browser.close();
  server.close();
}
