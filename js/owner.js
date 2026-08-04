/* PRAOW Owner Panel · UI, i18n, widgets · Mikaro Studio */
(function () {
  "use strict";

  var AUTH_KEY = "praow-owner-auth";
  var Data = window.PraowOwnerData;
  if (!Data) { return; }

  var dict = {
    en: {
      "own.title": "PRAOW · Owner",
      "own.login.sub": "Clinic schedule · Thonglor",
      "own.email": "Email",
      "own.pass": "Password",
      "own.signin": "เข้าสู่ระบบ / Sign in",
      "own.demo": "เดโม่ · ข้อมูลจำลองทั้งหมด / Demo · all data simulated",
      "own.brand": "PRAOW · Owner",
      "own.dash": "Dashboard",
      "own.export": "Export ▾",
      "own.export.csv": "Bookings this week (CSV)",
      "own.stat.today": "Today's bookings",
      "own.stat.deposit": "Deposits this week",
      "own.stat.noshow": "No-show rate",
      "own.stat.next": "Next free slot",
      "own.stat.next.none": "No free slot this week",
      "own.today": "Today",
      "own.today.meta": "appointments",
      "own.today.empty": "No bookings scheduled for today",
      "own.week": "Week calendar",
      "own.week.meta": "Mon · Sun · 10:00 · 20:00",
      "own.dep.paid": "Paid ✦ ฿500",
      "own.dep.pending": "Pending ✦ ฿500",
      "own.st.confirmed": "Confirmed",
      "own.st.arrived": "Arrived",
      "own.st.done": "Done",
      "own.st.no-show": "No-show",
      "own.pop.service": "Service",
      "own.pop.time": "Time",
      "own.pop.deposit": "Deposit",
      "own.pop.status": "Status",
      "own.pop.phone": "Phone",
      "own.pop.duration": "Duration",
      "own.min": "min",
      "own.footer": "PRAOW Owner Panel · demo by Mikaro Studio · ข้อมูลทั้งหมดเป็นข้อมูลจำลอง",
      "own.dow.0": "Mon",
      "own.dow.1": "Tue",
      "own.dow.2": "Wed",
      "own.dow.3": "Thu",
      "own.dow.4": "Fri",
      "own.dow.5": "Sat",
      "own.dow.6": "Sun",
      "own.svc.botox": "Botox",
      "own.svc.filler": "Filler",
      "own.svc.booster": "Skin booster",
      "own.svc.pico": "Pico"
    },
    th: {
      "own.title": "PRAOW · Owner",
      "own.login.sub": "ตารางคลินิก · ทองหล่อ",
      "own.email": "อีเมล",
      "own.pass": "รหัสผ่าน",
      "own.signin": "เข้าสู่ระบบ / Sign in",
      "own.demo": "เดโม่ · ข้อมูลจำลองทั้งหมด / Demo · all data simulated",
      "own.brand": "PRAOW · Owner",
      "own.dash": "แดชบอร์ด",
      "own.export": "ส่งออก ▾",
      "own.export.csv": "การจองสัปดาห์นี้ (CSV)",
      "own.stat.today": "คิววันนี้",
      "own.stat.deposit": "มัดจำสัปดาห์นี้",
      "own.stat.noshow": "อัตราโนโชว์",
      "own.stat.next": "คิวว่างถัดไป",
      "own.stat.next.none": "ไม่มีคิวว่างสัปดาห์นี้",
      "own.today": "วันนี้",
      "own.today.meta": "คิว",
      "own.today.empty": "ไม่มีคิววันนี้",
      "own.week": "ปฏิทินสัปดาห์",
      "own.week.meta": "จ · อา · 10:00 · 20:00",
      "own.dep.paid": "ชำระแล้ว ✦ ฿500",
      "own.dep.pending": "รอชำระ ✦ ฿500",
      "own.st.confirmed": "ยืนยันแล้ว",
      "own.st.arrived": "มาถึงแล้ว",
      "own.st.done": "เสร็จสิ้น",
      "own.st.no-show": "โนโชว์",
      "own.pop.service": "บริการ",
      "own.pop.time": "เวลา",
      "own.pop.deposit": "มัดจำ",
      "own.pop.status": "สถานะ",
      "own.pop.phone": "โทร",
      "own.pop.duration": "ระยะเวลา",
      "own.min": "นาที",
      "own.footer": "PRAOW Owner Panel · demo by Mikaro Studio · ข้อมูลทั้งหมดเป็นข้อมูลจำลอง",
      "own.dow.0": "จ",
      "own.dow.1": "อ",
      "own.dow.2": "พ",
      "own.dow.3": "พฤ",
      "own.dow.4": "ศ",
      "own.dow.5": "ส",
      "own.dow.6": "อา",
      "own.svc.botox": "โบท็อกซ์",
      "own.svc.filler": "ฟิลเลอร์",
      "own.svc.booster": "สกินบูสเตอร์",
      "own.svc.pico": "ปิโก"
    }
  };

  var lang = "en";
  try { lang = window.localStorage.getItem("praow-lang") || "en"; } catch (e) {}
  if (lang !== "en" && lang !== "th") { lang = "en"; }

  function t(key) {
    return (dict[lang] && dict[lang][key]) || dict.en[key] || key;
  }

  function applyLang() {
    document.documentElement.setAttribute("lang", lang);
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].innerHTML = t(nodes[i].getAttribute("data-i18n"));
    }
    var toggles = document.querySelectorAll(".lang-toggle button");
    for (var k = 0; k < toggles.length; k++) {
      toggles[k].classList.toggle("on", toggles[k].getAttribute("data-lang") === lang);
    }
    document.dispatchEvent(new CustomEvent("praow:owner-lang", { detail: { lang: lang, t: t } }));
  }

  function setLang(next) {
    lang = next;
    try { window.localStorage.setItem("praow-lang", next); } catch (e) {}
    applyLang();
  }

  function bindLangToggles() {
    var toggles = document.querySelectorAll(".lang-toggle button");
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener("click", function () {
        setLang(this.getAttribute("data-lang"));
      });
    }
  }

  function isAuthed() {
    try { return sessionStorage.getItem(AUTH_KEY) === "1"; } catch (e) { return false; }
  }

  function setAuthed() {
    try { sessionStorage.setItem(AUTH_KEY, "1"); } catch (e) {}
  }

  function formatDateLabel(d) {
    var opts = { weekday: "short", day: "numeric", month: "short", year: "numeric" };
    try {
      return d.toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", opts);
    } catch (e) {
      return Data.ymd(d);
    }
  }

  function svcLabel(key) {
    return t("own.svc." + key);
  }

  function countUp(el, target, prefix, suffix, ms) {
    if (!el) { return; }
    prefix = prefix || "";
    suffix = suffix || "";
    ms = ms || 900;
    var reduce = false;
    try { reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    if (reduce) {
      el.textContent = prefix + target.toLocaleString("en-US") + suffix;
      return;
    }
    var start = performance.now();
    function frame(now) {
      var p = Math.min(1, (now - start) / ms);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = prefix + val.toLocaleString("en-US") + suffix;
      if (p < 1) { requestAnimationFrame(frame); }
    }
    requestAnimationFrame(frame);
  }

  /* ---------- login ---------- */
  function initLogin() {
    applyLang();
    bindLangToggles();
    var form = document.getElementById("owner-login-form");
    if (!form) { return; }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      setAuthed();
      window.location.href = "dashboard.html";
    });
  }

  /* ---------- dashboard ---------- */
  var mobileDay = 0;

  function initDashboard() {
    if (!isAuthed()) {
      window.location.replace("index.html");
      return;
    }

    applyLang();
    bindLangToggles();

    var now = new Date();
    var dateEl = document.getElementById("owner-date");
    if (dateEl) { dateEl.textContent = formatDateLabel(now); }

    var bounds = Data.weekBounds(now);
    mobileDay = 0;
    for (var i = 0; i < bounds.days.length; i++) {
      if (Data.ymd(bounds.days[i]) === Data.todayStr(now)) {
        mobileDay = i;
        break;
      }
    }

    renderStats();
    renderToday();
    renderCalendar();
    bindExport();

    document.addEventListener("praow:owner-lang", function () {
      if (dateEl) { dateEl.textContent = formatDateLabel(new Date()); }
      renderStats(true);
      renderToday();
      renderCalendar();
    });
  }

  function renderStats(skipAnim) {
    var s = Data.stats();
    var next = Data.nextFreeSlot();

    var elToday = document.getElementById("stat-today");
    var elDep = document.getElementById("stat-deposit");
    var elNo = document.getElementById("stat-noshow");
    var elNext = document.getElementById("stat-next");
    var elNextHint = document.getElementById("stat-next-hint");

    if (elToday) { elToday.textContent = String(s.todayCount); }
    if (elNo) { elNo.textContent = s.noshowRate.toFixed(1) + "%"; }

    if (elDep) {
      if (skipAnim) {
        elDep.textContent = "฿" + s.depositSum.toLocaleString("en-US");
      } else {
        countUp(elDep, s.depositSum, "฿", "", 1000);
      }
    }

    if (elNext && elNextHint) {
      if (next) {
        var days = Data.weekBounds().days;
        var idx = 0;
        for (var i = 0; i < days.length; i++) {
          if (Data.ymd(days[i]) === next.date) { idx = i; break; }
        }
        elNext.textContent = next.time;
        elNextHint.textContent = t("own.dow." + idx) + " · " + next.date.slice(5);
      } else {
        elNext.textContent = "·";
        elNextHint.textContent = t("own.stat.next.none");
      }
    }
  }

  function statusOptions(selected) {
    var html = "";
    var sts = Data.STATUSES;
    for (var i = 0; i < sts.length; i++) {
      html += '<option value="' + sts[i] + '"' +
        (sts[i] === selected ? " selected" : "") + ">" +
        t("own.st." + sts[i]) + "</option>";
    }
    return html;
  }

  function renderToday() {
    var root = document.getElementById("today-list");
    var meta = document.getElementById("today-meta");
    if (!root) { return; }
    var list = Data.bookingsForDate(Data.todayStr());
    if (meta) {
      meta.textContent = list.length + " " + t("own.today.meta");
    }
    if (!list.length) {
      root.innerHTML = '<p class="empty-note">' + t("own.today.empty") + "</p>";
      return;
    }
    var html = "";
    for (var i = 0; i < list.length; i++) {
      var b = list[i];
      html += '<div class="today-row" data-id="' + b.id + '">' +
        '<span class="time">' + b.time + "</span>" +
        '<span class="name">' + b.name + "</span>" +
        '<span class="svc-chip ' + b.service + '">' + svcLabel(b.service) + "</span>" +
        '<span class="dep-state ' + b.deposit + '">' +
          t(b.deposit === "paid" ? "own.dep.paid" : "own.dep.pending") +
        "</span>" +
        '<select class="status-select" data-status="' + b.status + '" aria-label="Status">' +
          statusOptions(b.status) +
        "</select>" +
      "</div>";
    }
    root.innerHTML = html;

    var selects = root.querySelectorAll(".status-select");
    for (var s = 0; s < selects.length; s++) {
      selects[s].addEventListener("change", function () {
        var row = this.closest(".today-row");
        var id = row.getAttribute("data-id");
        var val = this.value;
        Data.setStatus(id, val);
        this.setAttribute("data-status", val);
        renderCalendar();
        renderStats(true);
      });
    }
  }

  function closePopover() {
    var pop = document.getElementById("cal-popover");
    if (pop) { pop.hidden = true; }
  }

  function openPopover(booking, anchor) {
    var pop = document.getElementById("cal-popover");
    if (!pop) { return; }
    pop.innerHTML =
      '<button type="button" class="pop-close" aria-label="Close">&times;</button>' +
      '<div class="pop-id">' + booking.id + "</div>" +
      '<div class="pop-name">' + booking.name + "</div>" +
      '<div class="pop-row"><span class="k">' + t("own.pop.service") + '</span><span>' + svcLabel(booking.service) + "</span></div>" +
      '<div class="pop-row"><span class="k">' + t("own.pop.time") + '</span><span>' + booking.date + " · " + booking.time + "</span></div>" +
      '<div class="pop-row"><span class="k">' + t("own.pop.duration") + '</span><span>' + booking.duration + " " + t("own.min") + "</span></div>" +
      '<div class="pop-row"><span class="k">' + t("own.pop.deposit") + '</span><span>' +
        t(booking.deposit === "paid" ? "own.dep.paid" : "own.dep.pending") + "</span></div>" +
      '<div class="pop-row"><span class="k">' + t("own.pop.status") + '</span><span>' + t("own.st." + booking.status) + "</span></div>" +
      '<div class="pop-row"><span class="k">' + t("own.pop.phone") + '</span><span>' + booking.phone + "</span></div>";

    pop.hidden = false;
    var rect = anchor.getBoundingClientRect();
    var pw = pop.offsetWidth;
    var ph = pop.offsetHeight;
    var left = rect.left + rect.width / 2 - pw / 2;
    var top = rect.bottom + 8;
    if (left < 12) { left = 12; }
    if (left + pw > window.innerWidth - 12) { left = window.innerWidth - pw - 12; }
    if (top + ph > window.innerHeight - 12) { top = rect.top - ph - 8; }
    if (top < 12) { top = 12; }
    pop.style.left = left + "px";
    pop.style.top = top + "px";

    var closeBtn = pop.querySelector(".pop-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", closePopover);
    }
  }

  function renderCalendar() {
    var grid = document.getElementById("cal-grid");
    var switcher = document.getElementById("day-switcher");
    if (!grid) { return; }

    var bounds = Data.weekBounds();
    var days = bounds.days;
    var todayY = Data.todayStr();
    var hours = Data.HOURS;

    if (switcher) {
      var sh = "";
      for (var d = 0; d < 7; d++) {
        var isToday = Data.ymd(days[d]) === todayY;
        sh += '<button type="button" class="day-chip' +
          (d === mobileDay ? " on" : "") +
          (isToday ? " today-mark" : "") +
          '" data-day="' + d + '">' +
          t("own.dow." + d) + " " + days[d].getDate() +
          "</button>";
      }
      switcher.innerHTML = sh;
      var chips = switcher.querySelectorAll(".day-chip");
      for (var c = 0; c < chips.length; c++) {
        chips[c].addEventListener("click", function () {
          mobileDay = parseInt(this.getAttribute("data-day"), 10);
          renderCalendar();
        });
      }
    }

    var bySlot = {};
    for (var bi = 0; bi < Data.bookings.length; bi++) {
      var bk = Data.bookings[bi];
      var key = bk.date + "|" + bk.hour;
      if (!bySlot[key]) { bySlot[key] = []; }
      bySlot[key].push(bk);
    }

    var html = '<div class="cal-head cal-corner"></div>';
    for (var h = 0; h < 7; h++) {
      var y = Data.ymd(days[h]);
      var todayClass = y === todayY ? " today-col" : "";
      var show = h === mobileDay ? " show-day" : "";
      html += '<div class="cal-head' + todayClass + show + '">' +
        t("own.dow." + h) +
        '<span class="dnum">' + days[h].getDate() + "</span></div>";
    }

    for (var hi = 0; hi < hours.length; hi++) {
      var hour = hours[hi];
      html += '<div class="cal-hour">' + Data.pad2(hour) + "</div>";
      for (var di = 0; di < 7; di++) {
        var ds = Data.ymd(days[di]);
        var tc = ds === todayY ? " today-col" : "";
        var sd = di === mobileDay ? " show-day" : "";
        var slotKey = ds + "|" + hour;
        var items = bySlot[slotKey] || [];
        html += '<div class="cal-cell' + tc + sd + '">';
        for (var j = 0; j < items.length; j++) {
          var item = items[j];
          html += '<button type="button" class="cal-block ' + item.service +
            '" data-id="' + item.id + '">' +
            '<span class="bn">' + item.name + "</span>" +
            '<span class="bs">' + svcLabel(item.service) + "</span>" +
            "</button>";
        }
        html += "</div>";
      }
    }

    grid.innerHTML = html;
    closePopover();

    var blocks = grid.querySelectorAll(".cal-block");
    for (var b = 0; b < blocks.length; b++) {
      blocks[b].addEventListener("click", function (e) {
        e.stopPropagation();
        var booking = Data.findById(this.getAttribute("data-id"));
        if (booking) { openPopover(booking, this); }
      });
    }
  }

  function bindExport() {
    var btn = document.getElementById("export-btn");
    var menu = document.getElementById("export-menu");
    var csvBtn = document.getElementById("export-csv");
    if (!btn || !menu) { return; }

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.hidden = !menu.hidden;
    });

    if (csvBtn) {
      csvBtn.addEventListener("click", function () {
        Data.downloadCsv();
        menu.hidden = true;
      });
    }

    document.addEventListener("click", function () {
      menu.hidden = true;
      closePopover();
    });

    var pop = document.getElementById("cal-popover");
    if (pop) {
      pop.addEventListener("click", function (e) { e.stopPropagation(); });
    }
  }

  var page = document.body.getAttribute("data-owner-page");
  if (page === "login") { initLogin(); }
  else if (page === "dashboard") { initDashboard(); }

  window.PraowOwner = { t: t, setLang: setLang, isAuthed: isAuthed };
})();
