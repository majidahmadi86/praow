import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { readFile } from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const out = path.join(root, "mockup", "treatments-content");
fs.mkdirSync(out, { recursive: true });

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".json": "application/json"
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        const url = new URL(req.url || "/", "http://127.0.0.1");
        let rel = decodeURIComponent(url.pathname);
        if (rel === "/") rel = "/index.html";
        const file = path.join(root, rel.replace(/^\//, ""));
        if (!file.startsWith(root)) {
          res.writeHead(403); res.end(); return;
        }
        const data = await readFile(file);
        res.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" });
        res.end(data);
      } catch {
        res.writeHead(404); res.end("not found");
      }
    });
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, base: `http://127.0.0.1:${port}` });
    });
  });
}

async function setLang(page, lang) {
  await page.evaluate((l) => {
    localStorage.setItem("praow-lang", l);
  }, lang);
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.evaluate((l) => {
    document.querySelectorAll(`.lang-toggle button[data-lang="${l}"]`).forEach((b) => b.click());
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("revealed"));
  }, lang);
  await page.waitForTimeout(300);
}

async function shotSection(page, index, name) {
  const section = page.locator(".treat-section").nth(index);
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await section.screenshot({ path: path.join(out, name) });
}

const { server, base } = await startServer();
const browser = await chromium.launch();
const report = { shots: [], checks: {} };

try {
  for (const lang of ["en", "th"]) {
    for (const [w, h, label] of [[1440, 900, "1440"], [390, 844, "390"]]) {
      const page = await browser.newPage({ viewport: { width: w, height: h } });
      await page.goto(`${base}/treatments.html`, { waitUntil: "networkidle" });
      await setLang(page, lang);
      const names = ["botox", "filler", "skin"];
      for (let i = 0; i < 3; i++) {
        const file = `${names[i]}-${label}-${lang}.png`;
        await shotSection(page, i, file);
        report.shots.push(file);
      }
      await page.close();
    }
  }

  // booking preselect proof
  const book = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await book.goto(`${base}/booking.html?service=filler`, { waitUntil: "networkidle" });
  await book.waitForTimeout(500);
  const selected = await book.evaluate(() => {
    const on = document.querySelector(".service-card.on");
    return on ? { text: on.textContent.trim(), index: on.getAttribute("data-service") } : null;
  });
  await book.screenshot({ path: path.join(out, "booking-preselect-filler.png"), fullPage: false });
  report.shots.push("booking-preselect-filler.png");
  report.checks.bookingPreselect = selected;

  // structural checks on treatments
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}/treatments.html`, { waitUntil: "networkidle" });
  await setLang(page, "en");
  report.checks.structure = await page.evaluate(() => {
    return [...document.querySelectorAll(".treat-section")].map((el) => {
      const title = el.querySelector(".title");
      const imgs = el.querySelectorAll(":scope > .media img, :scope > .media picture");
      const media = el.querySelectorAll(":scope > .media");
      return {
        id: el.id,
        mediaCount: media.length,
        imgCount: imgs.length,
        title: title?.textContent,
        titleClip: title ? title.scrollHeight - title.clientHeight : null,
        hasBody: !!el.querySelector(".treat-body"),
        chipCount: el.querySelectorAll(".treat-chips li").length,
        hasConsult: !!el.querySelector(".treat-consult-link"),
        hasBook: !!el.querySelector(".treat-book-pill"),
        bookHref: el.querySelector(".treat-book-pill")?.getAttribute("href")
      };
    });
  });
  await page.close();
  await book.close();
} finally {
  await browser.close();
  server.close();
}

fs.writeFileSync(path.join(out, "REPORT.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
