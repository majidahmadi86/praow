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
      "own.export.csv": "Bookings (CSV)",
      "own.stat.today": "Today's bookings",
      "own.stat.deposit": "Deposits this week",
      "own.stat.noshow": "No-show rate",
      "own.stat.next": "Next free slot",
      "own.stat.next.none": "No free slot this week",
      "own.today": "Today",
      "own.list": "Bookings",
      "own.today.meta": "appointments",
      "own.today.empty": "No bookings match these filters",
      "own.week": "Week calendar",
      "own.week.meta": "Mon · Sun · 10:00 · 20:00",
      "own.dep.paid": "Paid ✦ ฿500",
      "own.dep.pending": "Pending ✦ ฿500",
      "own.st.confirmed": "Confirmed",
      "own.st.arrived": "Arrived",
      "own.st.done": "Done",
      "own.st.no-show": "No-show",
      "own.st.cancelled": "Cancelled",
      "own.st.all": "All statuses",
      "own.pop.service": "Service",
      "own.pop.time": "Time",
      "own.pop.deposit": "Deposit",
      "own.pop.status": "Status",
      "own.pop.phone": "Phone",
      "own.pop.duration": "Duration",
      "own.min": "min",
      "own.footer": "PRAOW Owner Panel · demo by Mikaro Studio · ข้อมูลทั้งหมดเป็นข้อมูลจำลอง",
      "own.reset": "รีเซ็ตเดโม่ / Reset demo",
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
      "own.svc.pico": "Pico",
      "own.svc.all": "All",
      "own.new": "+ New booking / เพิ่มการจอง",
      "own.avail": "จัดการเวลาว่าง / Manage availability",
      "own.edit": "แก้ไข / Edit",
      "own.cancel": "ยกเลิก / Cancel booking",
      "own.cancel.confirm": "Cancel this booking?",
      "own.cancel.yes": "Yes, cancel",
      "own.cancel.no": "Keep booking",
      "own.save": "Save",
      "own.close": "Close",
      "own.modal.new": "New booking",
      "own.modal.edit": "Edit booking",
      "own.field.service": "Service",
      "own.field.date": "Date",
      "own.field.time": "Time",
      "own.field.name": "Customer name",
      "own.field.phone": "Phone",
      "own.field.deposit": "Deposit",
      "own.field.status": "Status",
      "own.time.none": "No free slots",
      "own.search": "Search name or code",
      "own.filter.from": "From",
      "own.filter.to": "To",
      "own.jump.today": "วันนี้ / Today",
      "own.legend.blocked": "เวลาที่ปิด / Blocked",
      "own.avail.title": "Manage availability",
      "own.avail.hint": "Tap hours to block or open. Use Day off for a full day.",
      "own.avail.dayoff": "Day off",
      "own.avail.clear": "Clear day"
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
      "own.export.csv": "การจอง (CSV)",
      "own.stat.today": "คิววันนี้",
      "own.stat.deposit": "มัดจำสัปดาห์นี้",
      "own.stat.noshow": "อัตราโนโชว์",
      "own.stat.next": "คิวว่างถัดไป",
      "own.stat.next.none": "ไม่มีคิวว่างสัปดาห์นี้",
      "own.today": "วันนี้",
      "own.list": "รายการจอง",
      "own.today.meta": "คิว",
      "own.today.empty": "ไม่พบคิวตามตัวกรอง",
      "own.week": "ปฏิทินสัปดาห์",
      "own.week.meta": "จ · อา · 10:00 · 20:00",
      "own.dep.paid": "ชำระแล้ว ✦ ฿500",
      "own.dep.pending": "รอชำระ ✦ ฿500",
      "own.st.confirmed": "ยืนยันแล้ว",
      "own.st.arrived": "มาถึงแล้ว",
      "own.st.done": "เสร็จสิ้น",
      "own.st.no-show": "โนโชว์",
      "own.st.cancelled": "ยกเลิก",
      "own.st.all": "ทุกสถานะ",
      "own.pop.service": "บริการ",
      "own.pop.time": "เวลา",
      "own.pop.deposit": "มัดจำ",
      "own.pop.status": "สถานะ",
      "own.pop.phone": "โทร",
      "own.pop.duration": "ระยะเวลา",
      "own.min": "นาที",
      "own.footer": "PRAOW Owner Panel · demo by Mikaro Studio · ข้อมูลทั้งหมดเป็นข้อมูลจำลอง",
      "own.reset": "รีเซ็ตเดโม่ / Reset demo",
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
      "own.svc.pico": "ปิโก",
      "own.svc.all": "ทั้งหมด",
      "own.new": "+ New booking / เพิ่มการจอง",
      "own.avail": "จัดการเวลาว่าง / Manage availability",
      "own.edit": "แก้ไข / Edit",
      "own.cancel": "ยกเลิก / Cancel booking",
      "own.cancel.confirm": "ยืนยันยกเลิกคิวนี้?",
      "own.cancel.yes": "ใช่ ยกเลิก",
      "own.cancel.no": "เก็บไว้",
      "own.save": "บันทึก",
      "own.close": "ปิด",
      "own.modal.new": "เพิ่มการจอง",
      "own.modal.edit": "แก้ไขการจอง",
      "own.field.service": "บริการ",
      "own.field.date": "วัน",
      "own.field.time": "เวลา",
      "own.field.name": "ชื่อลูกค้า",
      "own.field.phone": "โทร",
      "own.field.deposit": "มัดจำ",
      "own.field.status": "สถานะ",
      "own.time.none": "ไม่มีคิวว่าง",
      "own.search": "ค้นหาชื่อหรือรหัส",
      "own.filter.from": "จาก",
      "own.filter.to": "ถึง",
      "own.jump.today": "วันนี้ / Today",
      "own.legend.blocked": "เวลาที่ปิด / Blocked",
      "own.avail.title": "จัดการเวลาว่าง",
      "own.avail.hint": "แตะชั่วโมงเพื่อปิดหรือเปิด ใช้วันหยุดสำหรับทั้งวัน",
      "own.avail.dayoff": "วันหยุด",
      "own.avail.clear": "ล้างวัน"
    }
  };

  var lang = "en";
  try { lang = window.localStorage.getItem("praow-lang") || "en"; } catch (e) {}
  if (lang !== "en" && lang !== "th") { lang = "en"; }

  var filters = { q: "", service: "all", status: "all", from: "", to: "" };
  var mobileDay = 0;
  var editingId = null;

  function t(key) {
    return (dict[lang] && dict[lang][key]) || dict.en[key] || key;
  }

  function applyLang() {
    document.documentElement.setAttribute("lang", lang);
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].innerHTML = t(nodes[i].getAttribute("data-i18n"));
    }
    var ph = document.querySelectorAll("[data-i18n-placeholder]");
    for (var p = 0; p < ph.length; p++) {
      ph[p].setAttribute("placeholder", t(ph[p].getAttribute("data-i18n-placeholder")));
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
    try { if (sessionStorage.getItem(AUTH_KEY) === "1") { return true; } } catch (e) {}
    try { if (localStorage.getItem(AUTH_KEY) === "1") { return true; } } catch (e2) {}
    return false;
  }

  function setAuthed() {
    try { sessionStorage.setItem(AUTH_KEY, "1"); } catch (e) {}
    try { localStorage.setItem(AUTH_KEY, "1"); } catch (e2) {}
  }

  function goDashboard() {
    setAuthed();
    window.location.href = "/owner/dashboard";
  }

  function formatDateLabel(d) {
    var opts = { weekday: "short", day: "numeric", month: "short", year: "numeric" };
    try {
      return d.toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", opts);
    } catch (e) {
      return Data.ymd(d);
    }
  }

  function formatWeekRange(days) {
    var a = days[0];
    var b = days[6];
    if (lang === "th") {
      try {
        var opts = { day: "numeric", month: "short", year: "numeric" };
        return a.getDate() + " · " + b.toLocaleDateString("th-TH", opts);
      } catch (e) {}
    }
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (a.getMonth() === b.getMonth()) {
      return a.getDate() + " · " + b.getDate() + " " + months[a.getMonth()] + " " + a.getFullYear();
    }
    return a.getDate() + " " + months[a.getMonth()] + " · " + b.getDate() + " " + months[b.getMonth()] + " " + b.getFullYear();
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
      el.textContent = prefix + Math.round(target * eased).toLocaleString("en-US") + suffix;
      if (p < 1) { requestAnimationFrame(frame); }
    }
    requestAnimationFrame(frame);
  }

  function refreshAll(skipAnim) {
    renderWeekNav();
    renderStats(skipAnim);
    renderList();
    renderCalendar();
  }

  /* ---------- login ---------- */
  function initLogin() {
    if (isAuthed()) {
      window.location.replace("/owner/dashboard");
      return;
    }
    applyLang();
    bindLangToggles();
    var form = document.getElementById("owner-login-form");
    if (!form) { return; }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      goDashboard();
    });
    var btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        goDashboard();
      });
    }
  }

  /* ---------- dashboard ---------- */
  function initDashboard() {
    if (!isAuthed()) {
      window.location.replace("/owner/");
      return;
    }

    Data.setViewWeek(new Date());
    applyLang();
    bindLangToggles();

    var now = new Date();
    var dateEl = document.getElementById("owner-date");
    if (dateEl) { dateEl.textContent = formatDateLabel(now); }

    var days = Data.getViewWeek();
    mobileDay = 0;
    for (var i = 0; i < days.length; i++) {
      if (Data.ymd(days[i]) === Data.todayStr(now)) {
        mobileDay = i;
        break;
      }
    }

    /* default filter range = viewed week */
    filters.from = Data.ymd(days[0]);
    filters.to = Data.ymd(days[6]);
    var fromEl = document.getElementById("filter-from");
    var toEl = document.getElementById("filter-to");
    if (fromEl) { fromEl.value = filters.from; }
    if (toEl) { toEl.value = filters.to; }

    bindToolbar();
    bindExport();
    bindModals();
    bindWeekNav();
    bindReset();

    refreshAll(false);

    document.addEventListener("praow:owner-lang", function () {
      if (dateEl) { dateEl.textContent = formatDateLabel(new Date()); }
      refreshAll(true);
    });
  }

  function bindReset() {
    var link = document.getElementById("reset-demo");
    if (!link) { return; }
    link.addEventListener("click", function (e) {
      e.preventDefault();
      Data.resetDemo();
      refreshAll(true);
    });
  }

  function bindWeekNav() {
    var prev = document.getElementById("week-prev");
    var next = document.getElementById("week-next");
    var todayBtn = document.getElementById("week-today");
    var picker = document.getElementById("week-jump");

    if (prev) {
      prev.addEventListener("click", function () {
        var days = Data.getViewWeek();
        var d = new Date(days[0]);
        d.setDate(d.getDate() - 7);
        jumpToWeek(d);
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        var days = Data.getViewWeek();
        var d = new Date(days[0]);
        d.setDate(d.getDate() + 7);
        jumpToWeek(d);
      });
    }
    if (todayBtn) {
      todayBtn.addEventListener("click", function () {
        jumpToWeek(new Date());
      });
    }
    if (picker) {
      picker.addEventListener("change", function () {
        if (this.value) { jumpToWeek(Data.parseYmd(this.value)); }
      });
    }
  }

  function jumpToWeek(ref) {
    Data.setViewWeek(ref);
    var days = Data.getViewWeek();
    filters.from = Data.ymd(days[0]);
    filters.to = Data.ymd(days[6]);
    var fromEl = document.getElementById("filter-from");
    var toEl = document.getElementById("filter-to");
    if (fromEl) { fromEl.value = filters.from; }
    if (toEl) { toEl.value = filters.to; }
    mobileDay = 0;
    var todayY = Data.todayStr();
    for (var i = 0; i < days.length; i++) {
      if (Data.ymd(days[i]) === todayY) { mobileDay = i; break; }
    }
    refreshAll(true);
  }

  function renderWeekNav() {
    var label = document.getElementById("week-label");
    var days = Data.getViewWeek();
    if (label) { label.textContent = formatWeekRange(days); }
    var picker = document.getElementById("week-jump");
    if (picker) { picker.value = Data.ymd(days[0]); }
  }

  function bindToolbar() {
    var search = document.getElementById("filter-q");
    var status = document.getElementById("filter-status");
    var from = document.getElementById("filter-from");
    var to = document.getElementById("filter-to");
    var chips = document.getElementById("service-chips");

    if (search) {
      search.addEventListener("input", function () {
        filters.q = this.value;
        renderList();
      });
    }
    if (status) {
      status.addEventListener("change", function () {
        filters.status = this.value;
        renderList();
      });
    }
    if (from) {
      from.addEventListener("change", function () {
        filters.from = this.value;
        renderList();
      });
    }
    if (to) {
      to.addEventListener("change", function () {
        filters.to = this.value;
        renderList();
      });
    }
    if (chips) {
      chips.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-service]");
        if (!btn) { return; }
        filters.service = btn.getAttribute("data-service");
        var all = chips.querySelectorAll("[data-service]");
        for (var i = 0; i < all.length; i++) {
          all[i].classList.toggle("on", all[i].getAttribute("data-service") === filters.service);
        }
        renderList();
      });
    }

    var newBtn = document.getElementById("btn-new-booking");
    if (newBtn) {
      newBtn.addEventListener("click", function () { openBookingModal(null); });
    }
    var availBtn = document.getElementById("btn-availability");
    if (availBtn) {
      availBtn.addEventListener("click", function () { openAvailPanel(); });
    }
  }

  function filteredList(forList) {
    var opts = {
      q: filters.q,
      service: filters.service,
      status: filters.status,
      from: filters.from,
      to: filters.to,
      includeCancelled: !!forList
    };
    var list = Data.filterBookings(opts);
    if (forList && filters.status === "all") {
      /* include cancelled in list view */
      return list;
    }
    if (!forList) {
      return list.filter(function (b) { return b.status !== "cancelled"; });
    }
    return list;
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
        var days = Data.getViewWeek();
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

  function statusOptions(selected, includeCancelled) {
    var html = "";
    var sts = includeCancelled ? Data.ALL_STATUSES : Data.STATUSES;
    for (var i = 0; i < sts.length; i++) {
      if (sts[i] === "cancelled" && !includeCancelled) { continue; }
      html += '<option value="' + sts[i] + '"' +
        (sts[i] === selected ? " selected" : "") + ">" +
        t("own.st." + sts[i]) + "</option>";
    }
    return html;
  }

  function renderList() {
    var root = document.getElementById("today-list");
    var meta = document.getElementById("today-meta");
    if (!root) { return; }

    var list = filteredList(true);
    list = list.slice().sort(function (a, b) {
      if (a.date === b.date) { return a.hour - b.hour; }
      return a.date < b.date ? -1 : 1;
    });

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
      var cancelled = b.status === "cancelled";
      html += '<div class="today-row' + (cancelled ? " is-cancelled" : "") + '" data-id="' + b.id + '">' +
        '<span class="time">' + b.time + '</span>' +
        '<span class="name-block"><span class="name">' + b.name + '</span>' +
          '<span class="row-date">' + b.date + "</span></span>" +
        '<span class="svc-chip ' + b.service + '">' + svcLabel(b.service) + "</span>" +
        '<span class="dep-state ' + b.deposit + '">' +
          t(b.deposit === "paid" ? "own.dep.paid" : "own.dep.pending") +
        "</span>" +
        (cancelled
          ? '<span class="status-select" data-status="cancelled">' + t("own.st.cancelled") + "</span>"
          : '<select class="status-select" data-status="' + b.status + '" aria-label="Status">' +
              statusOptions(b.status, false) +
            "</select>") +
        '<button type="button" class="row-edit" data-edit="' + b.id + '">' + t("own.edit") + "</button>" +
      "</div>";
    }
    root.innerHTML = html;

    var selects = root.querySelectorAll("select.status-select");
    for (var s = 0; s < selects.length; s++) {
      selects[s].addEventListener("change", function () {
        var row = this.closest(".today-row");
        Data.setStatus(row.getAttribute("data-id"), this.value);
        refreshAll(true);
      });
    }
    var edits = root.querySelectorAll("[data-edit]");
    for (var e = 0; e < edits.length; e++) {
      edits[e].addEventListener("click", function (ev) {
        ev.stopPropagation();
        openBookingModal(this.getAttribute("data-edit"));
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
    var cancelled = booking.status === "cancelled";
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
      '<div class="pop-row"><span class="k">' + t("own.pop.phone") + '</span><span>' + booking.phone + "</span></div>" +
      (!cancelled
        ? '<div class="pop-actions">' +
            '<button type="button" class="btn ghost pop-edit">' + t("own.edit") + "</button>" +
          "</div>"
        : "");

    pop.hidden = false;
    var rect = anchor.getBoundingClientRect();
    var pw = pop.offsetWidth || 280;
    var ph = pop.offsetHeight || 200;
    var left = rect.left + rect.width / 2 - pw / 2;
    var top = rect.bottom + 8;
    if (left < 12) { left = 12; }
    if (left + pw > window.innerWidth - 12) { left = window.innerWidth - pw - 12; }
    if (top + ph > window.innerHeight - 12) { top = Math.max(12, rect.top - ph - 8); }
    pop.style.left = left + "px";
    pop.style.top = top + "px";

    var closeBtn = pop.querySelector(".pop-close");
    if (closeBtn) { closeBtn.addEventListener("click", closePopover); }
    var editBtn = pop.querySelector(".pop-edit");
    if (editBtn) {
      editBtn.addEventListener("click", function () {
        closePopover();
        openBookingModal(booking.id);
      });
    }
  }

  function renderCalendar() {
    var grid = document.getElementById("cal-grid");
    var switcher = document.getElementById("day-switcher");
    if (!grid) { return; }

    var days = Data.getViewWeek();
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
    var weekBooks = Data.bookings.filter(function (b) { return b.status !== "cancelled"; });
    for (var bi = 0; bi < weekBooks.length; bi++) {
      var bk = weekBooks[bi];
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
        var blocked = Data.isBlocked(ds, hour);
        var slotKey = ds + "|" + hour;
        var items = bySlot[slotKey] || [];
        html += '<div class="cal-cell' + tc + sd + (blocked ? " is-blocked" : "") + '">';
        if (blocked) {
          html += '<span class="block-hatch" title="' + t("own.legend.blocked") + '"></span>';
        }
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
        var list = filteredList(false);
        var from = filters.from || "all";
        var to = filters.to || "all";
        var name = "praow-bookings-" + from + "-to-" + to + ".csv";
        Data.downloadCsv(list, name);
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

  /* ---------- booking modal ---------- */
  function fillTimeOptions(date, excludeId, selectedHour) {
    var sel = document.getElementById("bk-time");
    if (!sel) { return; }
    var free = Data.freeSlots(date, excludeId);
    if (selectedHour != null && free.indexOf(+selectedHour) === -1) {
      free = free.concat([+selectedHour]).sort(function (a, b) { return a - b; });
    }
    if (!free.length) {
      sel.innerHTML = '<option value="">' + t("own.time.none") + "</option>";
      return;
    }
    var html = "";
    for (var i = 0; i < free.length; i++) {
      html += '<option value="' + free[i] + '"' +
        (+free[i] === +selectedHour ? " selected" : "") + ">" +
        Data.pad2(free[i]) + ":00</option>";
    }
    sel.innerHTML = html;
  }

  function openBookingModal(id) {
    editingId = id;
    var modal = document.getElementById("booking-modal");
    var title = document.getElementById("booking-modal-title");
    var cancelWrap = document.getElementById("cancel-wrap");
    var confirmWrap = document.getElementById("cancel-confirm-wrap");
    if (!modal) { return; }

    var days = Data.getViewWeek();
    var booking = id ? Data.findById(id) : null;
    if (title) {
      title.textContent = booking ? t("own.modal.edit") : t("own.modal.new");
    }

    var svcSel = document.getElementById("bk-service");
    var dateEl = document.getElementById("bk-date");
    var nameEl = document.getElementById("bk-name");
    var phoneEl = document.getElementById("bk-phone");
    var depPaid = document.getElementById("bk-dep-paid");
    var depPend = document.getElementById("bk-dep-pending");
    var statusEl = document.getElementById("bk-status");
    var statusField = document.getElementById("bk-status-field");

    if (svcSel) {
      var sh = "";
      for (var i = 0; i < Data.SERVICES.length; i++) {
        var s = Data.SERVICES[i];
        sh += '<option value="' + s.key + '">' + svcLabel(s.key) + "</option>";
      }
      svcSel.innerHTML = sh;
    }

    if (statusEl) {
      statusEl.innerHTML = statusOptions(booking ? booking.status : "confirmed", false);
    }
    if (statusField) {
      statusField.hidden = !booking;
    }

    var defaultDate = booking ? booking.date : (Data.todayStr());
    if (dateEl) {
      dateEl.value = defaultDate;
      dateEl.min = Data.ymd(days[0]);
      /* allow any date for flexibility */
    }
    if (nameEl) { nameEl.value = booking ? booking.name : ""; }
    if (phoneEl) { phoneEl.value = booking ? booking.phone : "08"; }
    if (svcSel && booking) { svcSel.value = booking.service; }
    if (depPaid && depPend) {
      var paid = !booking || booking.deposit === "paid";
      depPaid.checked = paid;
      depPend.checked = !paid;
    }
    if (statusEl && booking) { statusEl.value = booking.status === "cancelled" ? "confirmed" : booking.status; }

    fillTimeOptions(defaultDate, id, booking ? booking.hour : null);

    if (cancelWrap) { cancelWrap.hidden = !booking || booking.status === "cancelled"; }
    if (confirmWrap) { confirmWrap.hidden = true; }

    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeBookingModal() {
    var modal = document.getElementById("booking-modal");
    if (modal) { modal.hidden = true; }
    document.body.classList.remove("modal-open");
    editingId = null;
  }

  function bindModals() {
    var modal = document.getElementById("booking-modal");
    var form = document.getElementById("booking-form");
    var dateEl = document.getElementById("bk-date");
    var closeBtns = document.querySelectorAll("[data-close-modal]");
    for (var i = 0; i < closeBtns.length; i++) {
      closeBtns[i].addEventListener("click", closeBookingModal);
    }
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) { closeBookingModal(); }
      });
    }
    if (dateEl) {
      dateEl.addEventListener("change", function () {
        fillTimeOptions(this.value, editingId, null);
      });
    }
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var payload = {
          service: document.getElementById("bk-service").value,
          date: document.getElementById("bk-date").value,
          hour: document.getElementById("bk-time").value,
          name: document.getElementById("bk-name").value.trim(),
          phone: document.getElementById("bk-phone").value.trim(),
          deposit: document.getElementById("bk-dep-paid").checked ? "paid" : "pending",
          status: document.getElementById("bk-status")
            ? document.getElementById("bk-status").value
            : "confirmed"
        };
        if (!payload.hour || !payload.name || !payload.date) { return; }

        if (editingId) {
          Data.updateBooking(editingId, payload);
        } else {
          Data.createBooking(payload);
          /* jump view to booking week */
          Data.setViewWeek(Data.parseYmd(payload.date));
        }
        closeBookingModal();
        refreshAll(true);
      });
    }

    var cancelBtn = document.getElementById("btn-cancel-booking");
    var confirmYes = document.getElementById("btn-cancel-yes");
    var confirmNo = document.getElementById("btn-cancel-no");
    var cancelWrap = document.getElementById("cancel-wrap");
    var confirmWrap = document.getElementById("cancel-confirm-wrap");

    if (cancelBtn) {
      cancelBtn.addEventListener("click", function () {
        if (cancelWrap) { cancelWrap.hidden = true; }
        if (confirmWrap) { confirmWrap.hidden = false; }
      });
    }
    if (confirmNo) {
      confirmNo.addEventListener("click", function () {
        if (confirmWrap) { confirmWrap.hidden = true; }
        if (cancelWrap) { cancelWrap.hidden = false; }
      });
    }
    if (confirmYes) {
      confirmYes.addEventListener("click", function () {
        if (editingId) {
          Data.cancelBooking(editingId);
          closeBookingModal();
          refreshAll(true);
        }
      });
    }

    /* availability panel */
    var avail = document.getElementById("avail-modal");
    var availClose = document.querySelectorAll("[data-close-avail]");
    for (var a = 0; a < availClose.length; a++) {
      availClose[a].addEventListener("click", function () {
        if (avail) { avail.hidden = true; }
        document.body.classList.remove("modal-open");
      });
    }
    if (avail) {
      avail.addEventListener("click", function (e) {
        if (e.target === avail) {
          avail.hidden = true;
          document.body.classList.remove("modal-open");
        }
      });
    }
  }

  function openAvailPanel() {
    var avail = document.getElementById("avail-modal");
    var body = document.getElementById("avail-body");
    if (!avail || !body) { return; }

    var days = Data.getViewWeek();
    var html = '<p class="avail-hint">' + t("own.avail.hint") + "</p>";
    for (var d = 0; d < days.length; d++) {
      var ds = Data.ymd(days[d]);
      var allDay = Data.isBlocked(ds, 10) && Data.HOURS.every(function (h) { return Data.isBlocked(ds, h); });
      /* simpler allDay check via store */
      allDay = false;
      try {
        /* use hour 10 + check if all hours blocked */
        allDay = Data.HOURS.every(function (h) { return Data.isBlocked(ds, h); });
      } catch (e) {}

      html += '<div class="avail-day" data-date="' + ds + '">' +
        '<div class="avail-day-head">' +
          '<strong>' + t("own.dow." + d) + " " + days[d].getDate() + "</strong>" +
          '<button type="button" class="avail-dayoff" data-dayoff="' + ds + '">' + t("own.avail.dayoff") + "</button>" +
          '<button type="button" class="avail-clear" data-clearday="' + ds + '">' + t("own.avail.clear") + "</button>" +
        "</div>" +
        '<div class="avail-hours">';
      for (var hi = 0; hi < Data.HOURS.length; hi++) {
        var hour = Data.HOURS[hi];
        var on = Data.isBlocked(ds, hour);
        html += '<button type="button" class="avail-hour' + (on ? " on" : "") +
          '" data-block-date="' + ds + '" data-block-hour="' + hour + '">' +
          Data.pad2(hour) + "</button>";
      }
      html += "</div></div>";
    }
    body.innerHTML = html;

    body.querySelectorAll("[data-block-date]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var date = this.getAttribute("data-block-date");
        var hour = +this.getAttribute("data-block-hour");
        var currently = Data.isBlocked(date, hour);
        Data.setBlock(date, hour, !currently);
        openAvailPanel();
        renderCalendar();
        renderStats(true);
      });
    });
    body.querySelectorAll("[data-dayoff]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        Data.setBlock(this.getAttribute("data-dayoff"), null, true);
        openAvailPanel();
        renderCalendar();
      });
    });
    body.querySelectorAll("[data-clearday]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        Data.setBlock(this.getAttribute("data-clearday"), null, false);
        openAvailPanel();
        renderCalendar();
      });
    });

    avail.hidden = false;
    document.body.classList.add("modal-open");
  }

  var page = document.body.getAttribute("data-owner-page");
  if (page === "login") { initLogin(); }
  else if (page === "dashboard") { initDashboard(); }

  window.PraowOwner = {
    t: t,
    setLang: setLang,
    isAuthed: isAuthed,
    refreshAll: refreshAll,
    filteredList: filteredList,
    openBookingModal: openBookingModal,
    filters: filters
  };
})();
