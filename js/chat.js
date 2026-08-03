/* PRAOW CLINIC · AI receptionist widget · Mikaro Studio */
(function () {
  "use strict";

  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z"/><path d="M9 11h.01M13 11h.01M17 11h.01"/></svg>';

  function esc(t) {
    var d = document.createElement("div");
    d.textContent = t;
    return d.innerHTML;
  }

  function lang() {
    return (window.PraowI18n && window.PraowI18n.getLang()) || document.documentElement.lang || "en";
  }

  function tt(key) {
    return (window.PraowI18n && window.PraowI18n.t(key)) || key;
  }

  function localBrain(q) {
    var s = q.toLowerCase();
    var th = lang() === "th";
    if (/ราคา|price|cost|เท่าไหร่|botox|โบท็อก|filler|ฟิลเลอร์|pico|บูสเตอร์|booster/.test(s)) {
      return th
        ? "โบท็อกซ์เริ่ม 6,500 บาทต่อจุด ฟิลเลอร์เริ่ม 12,900 บาทต่อซีซี ผิวใสบูสเตอร์และปิโกเริ่ม 3,900 บาทค่ะ แผนละเอียดได้จากปรึกษาแพทย์ฟรีที่หน้า Consult"
        : "Botox from 6,500 THB per area, filler from 12,900 THB per cc, skin booster and pico from 3,900 THB. For a personal plan, use the free consultation page.";
    }
    if (/จอง|book|appointment|คิว/.test(s)) {
      return th
        ? "จองได้ที่หน้า Booking เลือกบริการ วัน เวลา แล้วมัดจำ 500 บาทเพื่อล็อกคิวค่ะ"
        : "You can book on the Booking page: pick a service, day and time, then lock the slot with a ฿500 deposit.";
    }
    if (/ปรึกษา|consult/.test(s)) {
      return th
        ? "ส่งรูปและความกังวลได้ที่หน้า Consult แพทย์ประเมินแล้วส่งแผนพร้อมราคาภายใน 24 ชม. ค่ะ"
        : "Send a photo and your concern on the Consult page. A doctor reviews and returns a plan with pricing within 24 hours.";
    }
    if (/hurt|pain|เจ็บ|ปวด|safe|อันตราย|ผลลัพธ์|promise|guarantee/.test(s)) {
      return th
        ? "เรื่องความรู้สึกและความเหมาะสมต้องให้แพทย์ประเมินที่คลินิกโดยตรงค่ะ เราไม่ให้คำแนะนำทางการแพทย์หรือการันตีผลลัพธ์"
        : "Comfort and suitability are assessed in person by the doctor. I cannot give medical advice or promise results.";
    }
    if (/real|จริง|ai|เอไอ|mikaro/.test(s)) {
      return th
        ? "ใช่ค่ะ เว็บนี้เป็นเดโม่สดที่ Mikaro Studio สร้าง และ AI ตัวนี้ทำงานแบบเดียวกับที่ตั้งให้คลินิกของผู้ซื้อได้จริง"
        : "Yes. This site is a live demo built by Mikaro Studio, and this AI works exactly like this for the buyer's own clinic.";
    }
    return th
      ? "ถามเรื่องราคา จองคิว หรือปรึกษาฟรีได้เลยค่ะ หรือกดปุ่มด้านล่าง"
      : "Ask about prices, booking, or a free consult, or use the chips below.";
  }

  function mount(root) {
    var th = lang() === "th";
    root.innerHTML =
      '<div class="chat">' +
      '<div class="chat-bar"><span class="av">P</span>PRAOW · receptionist<span class="on">online</span></div>' +
      '<div class="chat-log" aria-live="polite"></div>' +
      '<div class="chat-chips">' +
      '<button type="button" data-q="' + (th ? "ราคา" : "Prices") + '">' + tt("chat.chip1") + "</button>" +
      '<button type="button" data-q="' + (th ? "จองคิว" : "Book") + '">' + tt("chat.chip2") + "</button>" +
      '<button type="button" data-q="' + (th ? "ปรึกษาฟรี" : "Consult") + '">' + tt("chat.chip3") + "</button>" +
      "</div>" +
      '<form class="chat-in">' +
      '<input type="text" placeholder="' + tt("chat.ph") + '" autocomplete="off" aria-label="Message">' +
      '<button type="submit" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>' +
      "</form></div>";

    var log = root.querySelector(".chat-log");
    var form = root.querySelector(".chat-in");
    var input = form.querySelector("input");
    var chips = root.querySelector(".chat-chips");
    var HIST = [];

    function add(cls, html) {
      var m = document.createElement("div");
      m.className = "msg " + cls;
      m.innerHTML = html;
      log.appendChild(m);
      log.scrollTop = log.scrollHeight;
      return m;
    }

    function showBot(text) {
      var t = add("bot typing", "<i></i><i></i><i></i>");
      window.setTimeout(function () {
        t.classList.remove("typing");
        t.innerHTML = esc(text).replace(/\n/g, "<br>");
        log.scrollTop = log.scrollHeight;
      }, 450);
    }

    async function aiReply(q) {
      var t = add("bot typing", "<i></i><i></i><i></i>");
      try {
        var r = await fetch("/api/praow", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: HIST })
        });
        if (!r.ok) { throw 0; }
        var d = await r.json();
        if (!d.reply) { throw 0; }
        HIST.push({ role: "assistant", content: d.reply });
        t.classList.remove("typing");
        t.innerHTML = esc(d.reply).replace(/\n/g, "<br>");
        log.scrollTop = log.scrollHeight;
      } catch (err) {
        t.remove();
        var fallback = localBrain(q);
        HIST.push({ role: "assistant", content: fallback });
        showBot(fallback);
      }
    }

    function handle(q, label) {
      add("user", esc(label || q));
      HIST.push({ role: "user", content: q });
      aiReply(q);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = input.value.trim();
      if (!q) { return; }
      input.value = "";
      handle(q);
    });
    chips.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) { return; }
      handle(b.getAttribute("data-q"), b.textContent);
    });

    showBot(tt("chat.hi"));
  }

  function boot() {
    if (document.body.hasAttribute("data-no-fab")) { return; }
    if (document.querySelector(".praow-fab")) { return; }

    var fab = document.createElement("button");
    fab.className = "praow-fab";
    fab.setAttribute("aria-label", "Chat with PRAOW");
    fab.innerHTML = ICON + '<span class="pulse"></span>';

    var panel = document.createElement("div");
    panel.className = "praow-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "PRAOW receptionist");

    document.body.appendChild(panel);
    document.body.appendChild(fab);

    var mounted = false;
    fab.addEventListener("click", function () {
      if (!mounted) {
        mount(panel);
        mounted = true;
      } else if (!panel.classList.contains("open")) {
        // remount chips language if panel closed then reopened after lang change
        panel.innerHTML = "";
        mount(panel);
      }
      panel.classList.toggle("open");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { panel.classList.remove("open"); }
    });

    document.addEventListener("praow:lang", function () {
      if (panel.classList.contains("open")) {
        panel.innerHTML = "";
        mount(panel);
      } else {
        mounted = false;
        panel.innerHTML = "";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
