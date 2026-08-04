/* PRAOW Owner Panel · seeded weeks + localStorage overlay · Mikaro Studio */
(function (global) {
  "use strict";

  var BASE_SEED = 0x5052414f; /* PRWO */
  var STORE_KEY = "praow-owner-demo-v1";
  var DEPOSIT = 500;
  var HOURS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  var NAMES = [
    "คุณแพร", "คุณมายด์", "คุณเบล", "คุณนุ่น", "คุณฟ้า",
    "คุณมุก", "คุณพลอย", "คุณเจน", "คุณมิ้นท์", "คุณเอิร์ธ",
    "คุณแอน", "คุณโบว์", "คุณแก้ว", "คุณฝ้าย", "คุณน้ำ",
    "คุณเอม", "คุณพีช", "คุณหลิน", "คุณไซน์", "คุณเมย์"
  ];

  var SERVICES = [
    { key: "botox", en: "Botox", th: "โบท็อกซ์", duration: 30 },
    { key: "filler", en: "Filler", th: "ฟิลเลอร์", duration: 45 },
    { key: "booster", en: "Skin booster", th: "สกินบูสเตอร์", duration: 40 },
    { key: "pico", en: "Pico", th: "ปิโก", duration: 60 }
  ];

  var STATUSES = ["confirmed", "arrived", "done", "no-show"];
  var ALL_STATUSES = STATUSES.concat(["cancelled"]);

  function mulberry32(a) {
    return function () {
      var t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function ymd(d) {
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }

  function parseYmd(s) {
    var p = s.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  function startOfDay(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function weekMonday(ref) {
    var d = startOfDay(ref);
    var day = d.getDay();
    var offset = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + offset);
    return d;
  }

  function weekDays(ref) {
    var mon = weekMonday(ref);
    var days = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date(mon);
      d.setDate(mon.getDate() + i);
      days.push(d);
    }
    return days;
  }

  /* ISO-ish week number for deterministic seeding */
  function weekNumber(ref) {
    var mon = weekMonday(ref);
    var y = mon.getFullYear();
    var jan1 = new Date(y, 0, 1);
    var days = Math.floor((mon - jan1) / 86400000);
    return y * 100 + Math.floor(days / 7) + 1;
  }

  function weekSeed(ref) {
    return (BASE_SEED ^ (weekNumber(ref) * 2654435761)) >>> 0;
  }

  function phoneFrom(rand) {
    var d = Math.floor(rand() * 10);
    var end = 10 + Math.floor(rand() * 90);
    return "08" + d + "-xxx-xx" + pad2(end);
  }

  function pick(rand, arr) {
    return arr[Math.floor(rand() * arr.length)];
  }

  function svcByKey(key) {
    for (var i = 0; i < SERVICES.length; i++) {
      if (SERVICES[i].key === key) { return SERVICES[i]; }
    }
    return SERVICES[0];
  }

  /* Past weeks ~history density, current ~44, future weeks intentionally sparser. */
  function densityForWeek(mon, today) {
    var monY = ymd(mon);
    var todayMon = ymd(weekMonday(today));
    if (monY === todayMon) { return 44; }
    if (monY < todayMon) { return 38; }
    return 16;
  }

  function generateWeekBookings(refDate, realToday) {
    var today = startOfDay(realToday || new Date());
    var days = weekDays(refDate);
    var mon = days[0];
    var rand = mulberry32(weekSeed(mon));
    var target = densityForWeek(mon, today);

    var todayIdx = -1;
    for (var ti = 0; ti < days.length; ti++) {
      if (ymd(days[ti]) === ymd(today)) { todayIdx = ti; break; }
    }

    var occupied = {};
    for (var di = 0; di < 7; di++) { occupied[di] = {}; }

    var list = [];
    var noShowBudget = target >= 30 ? (1 + (rand() < 0.45 ? 1 : 0)) : (rand() < 0.5 ? 1 : 0);
    var attempts = 0;

    while (list.length < target && attempts < 700) {
      attempts++;
      var dayBias = Math.floor(rand() * 7);
      if (rand() < 0.35 && todayIdx >= 0) { dayBias = todayIdx; }
      else if (rand() < 0.25) { dayBias = 1 + Math.floor(rand() * 4); }

      var hour = pick(rand, HOURS);
      var svc = pick(rand, SERVICES);
      var span = Math.ceil(svc.duration / 60);
      var clash = false;
      for (var h = 0; h < span; h++) {
        if (occupied[dayBias][hour + h]) { clash = true; break; }
      }
      if (clash) { continue; }
      for (var h2 = 0; h2 < span; h2++) {
        occupied[dayBias][hour + h2] = true;
      }

      var dayDate = days[dayBias];
      var status;
      if (noShowBudget > 0 && rand() < 0.04) {
        status = "no-show";
        noShowBudget--;
      } else if (ymd(dayDate) < ymd(today)) {
        status = rand() < 0.88 ? "done" : "no-show";
        if (status === "no-show") {
          if (noShowBudget <= 0) { status = "done"; }
          else { noShowBudget--; }
        }
      } else if (ymd(dayDate) === ymd(today)) {
        if (hour < today.getHours()) {
          status = pick(rand, ["done", "arrived", "confirmed"]);
        } else {
          status = pick(rand, ["confirmed", "confirmed", "arrived"]);
        }
      } else {
        status = "confirmed";
      }

      /* deterministic unique id: week + day + hour + seq */
      var id = "PRW-" + String(weekNumber(mon) % 10000) +
        pad2(dayBias) + pad2(hour) + pad2(list.length);

      list.push({
        id: id,
        date: ymd(dayDate),
        hour: hour,
        time: pad2(hour) + ":00",
        name: pick(rand, NAMES),
        service: svc.key,
        serviceEn: svc.en,
        serviceTh: svc.th,
        duration: svc.duration,
        deposit: rand() < 0.82 ? "paid" : "pending",
        depositAmount: DEPOSIT,
        status: status,
        phone: phoneFrom(rand),
        seeded: true
      });
    }

    var nos = 0;
    for (var n = 0; n < list.length; n++) {
      if (list[n].status === "no-show") { nos++; }
    }
    if (nos === 0 && list.length && target >= 20) {
      list[Math.floor(rand() * list.length)].status = "no-show";
      nos = 1;
    }
    while (nos > 2) {
      for (var n2 = 0; n2 < list.length && nos > 2; n2++) {
        if (list[n2].status === "no-show") {
          list[n2].status = "confirmed";
          nos--;
        }
      }
    }

    list.sort(function (a, b) {
      if (a.date === b.date) { return a.hour - b.hour; }
      return a.date < b.date ? -1 : 1;
    });
    return list;
  }

  /* ---------- localStorage overlay ---------- */

  function emptyStore() {
    return { created: [], edits: {}, cancelled: [], blocks: [] };
  }

  function loadStore() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) { return emptyStore(); }
      var data = JSON.parse(raw);
      return {
        created: data.created || [],
        edits: data.edits || {},
        cancelled: data.cancelled || [],
        blocks: data.blocks || []
      };
    } catch (e) {
      return emptyStore();
    }
  }

  function saveStore(store) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch (e) {}
  }

  var store = loadStore();
  var viewRef = weekMonday(new Date());
  var seedCache = {};
  var bookings = [];

  function getSeedWeek(ref) {
    var mon = weekMonday(ref);
    var key = ymd(mon);
    if (!seedCache[key]) {
      seedCache[key] = generateWeekBookings(mon, new Date());
    }
    return seedCache[key].map(function (b) {
      return Object.assign({}, b);
    });
  }

  function isCancelled(id) {
    return store.cancelled.indexOf(id) !== -1;
  }

  function rebuild() {
    var seeded = getSeedWeek(viewRef);
    var map = {};
    for (var i = 0; i < seeded.length; i++) {
      map[seeded[i].id] = seeded[i];
    }

    var mon = weekMonday(viewRef);
    var sun = new Date(mon);
    sun.setDate(mon.getDate() + 6);
    var monS = ymd(mon);
    var sunS = ymd(sun);

    for (var c = 0; c < store.created.length; c++) {
      var cr = store.created[c];
      if (cr.date >= monS && cr.date <= sunS) {
        map[cr.id] = Object.assign({}, cr);
      }
    }

    var editIds = Object.keys(store.edits);
    for (var e = 0; e < editIds.length; e++) {
      var eid = editIds[e];
      var patch = store.edits[eid];
      if (map[eid]) {
        map[eid] = Object.assign({}, map[eid], patch);
        if (map[eid].date < monS || map[eid].date > sunS) {
          delete map[eid];
        }
      } else if (patch && patch.date >= monS && patch.date <= sunS) {
        var orig = lookupRaw(eid);
        if (orig) {
          map[eid] = Object.assign({}, orig, patch);
        }
      }
    }

    /* also pull created that were edited */
    bookings = [];
    var ids = Object.keys(map);
    for (var k = 0; k < ids.length; k++) {
      var b = map[ids[k]];
      if (isCancelled(b.id)) {
        b = Object.assign({}, b, { status: "cancelled" });
      }
      if (store.edits[b.id] && store.edits[b.id].status === "cancelled") {
        b.status = "cancelled";
      }
      bookings.push(b);
    }

    bookings.sort(function (a, b2) {
      if (a.date === b2.date) { return a.hour - b2.hour; }
      return a.date < b2.date ? -1 : 1;
    });
  }

  rebuild();

  function setViewWeek(ref) {
    viewRef = weekMonday(ref || new Date());
    rebuild();
    return viewRef;
  }

  function getViewWeek() {
    return weekDays(viewRef);
  }

  function activeBookings(list) {
    list = list || bookings;
    return list.filter(function (b) { return b.status !== "cancelled"; });
  }

  function bookingsForDate(dateStr, includeCancelled) {
    return bookings.filter(function (b) {
      if (b.date !== dateStr) { return false; }
      if (!includeCancelled && b.status === "cancelled") { return false; }
      return true;
    });
  }

  function todayStr(ref) {
    return ymd(startOfDay(ref || new Date()));
  }

  function weekBounds(ref) {
    var days = weekDays(ref || viewRef);
    return { days: days, monday: days[0], sunday: days[6] };
  }

  function blockKey(date, hour) {
    return date + "|" + (hour == null ? "all" : hour);
  }

  function isBlocked(date, hour) {
    for (var i = 0; i < store.blocks.length; i++) {
      var bl = store.blocks[i];
      if (bl.date !== date) { continue; }
      if (bl.allDay) { return true; }
      if (bl.hour === hour) { return true; }
    }
    return false;
  }

  function getBlocksForWeek() {
    var days = getViewWeek();
    var monS = ymd(days[0]);
    var sunS = ymd(days[6]);
    return store.blocks.filter(function (b) {
      return b.date >= monS && b.date <= sunS;
    });
  }

  function setBlock(date, hour, on) {
    /* hour null => whole day */
    if (hour == null) {
      store.blocks = store.blocks.filter(function (b) { return b.date !== date; });
      if (on) {
        store.blocks.push({ date: date, allDay: true });
      }
    } else {
      var hasAll = store.blocks.some(function (b) { return b.date === date && b.allDay; });
      if (hasAll) {
        store.blocks = store.blocks.filter(function (b) {
          return !(b.date === date && b.allDay);
        });
        for (var i = 0; i < HOURS.length; i++) {
          if (HOURS[i] === hour) {
            if (on) {
              store.blocks.push({ date: date, hour: hour, allDay: false });
            }
          } else {
            store.blocks.push({ date: date, hour: HOURS[i], allDay: false });
          }
        }
      } else {
        store.blocks = store.blocks.filter(function (b) {
          return !(b.date === date && b.hour === hour);
        });
        if (on) {
          store.blocks.push({ date: date, hour: hour, allDay: false });
        }
      }
    }
    saveStore(store);
    rebuild();
  }

  function toggleBlock(date, hour) {
    if (hour == null) {
      var allOn = store.blocks.some(function (b) { return b.date === date && b.allDay; });
      setBlock(date, null, !allOn);
      return;
    }
    setBlock(date, hour, !isBlocked(date, hour));
  }

  function freeSlots(date, excludeId) {
    var taken = {};
    var dayBooks = bookings.filter(function (b) {
      return b.date === date && b.status !== "cancelled" && b.id !== excludeId;
    });
    for (var i = 0; i < dayBooks.length; i++) {
      var span = Math.ceil(dayBooks[i].duration / 60);
      for (var s = 0; s < span; s++) {
        taken[dayBooks[i].hour + s] = true;
      }
    }
    var free = [];
    for (var h = 0; h < HOURS.length; h++) {
      var hour = HOURS[h];
      if (taken[hour]) { continue; }
      if (isBlocked(date, hour)) { continue; }
      free.push(hour);
    }
    return free;
  }

  function stats(ref) {
    var t = todayStr(ref);
    var weekList = activeBookings(bookings);
    var todayList = weekList.filter(function (b) { return b.date === t; });
    var paidSum = 0;
    var noshow = 0;
    for (var i = 0; i < weekList.length; i++) {
      if (weekList[i].deposit === "paid") {
        paidSum += weekList[i].depositAmount;
      }
      if (weekList[i].status === "no-show") { noshow++; }
    }
    var rate = weekList.length ? (noshow / weekList.length) * 100 : 0;
    return {
      todayCount: todayList.length,
      depositSum: paidSum,
      noshowRate: Math.round(rate * 10) / 10,
      noshowCount: noshow,
      total: weekList.length
    };
  }

  function nextFreeSlot(ref) {
    var now = ref || new Date();
    var days = weekDays(viewRef);
    var todayY = ymd(startOfDay(now));
    var nowHour = now.getHours();
    var viewMon = ymd(days[0]);
    var viewSun = ymd(days[6]);

    for (var di = 0; di < days.length; di++) {
      var ds = ymd(days[di]);
      if (ds < todayY) { continue; }
      var free = freeSlots(ds);
      for (var fi = 0; fi < free.length; fi++) {
        var h = free[fi];
        if (ds === todayY && h <= nowHour) { continue; }
        return { date: ds, hour: h, time: pad2(h) + ":00", day: days[di] };
      }
    }
    /* if viewing current week and nothing, still ok */
    if (todayY >= viewMon && todayY <= viewSun) { return null; }
    return null;
  }

  function lookupRaw(id) {
    for (var c = 0; c < store.created.length; c++) {
      if (store.created[c].id === id) { return store.created[c]; }
    }
    var keys = Object.keys(seedCache);
    for (var k = 0; k < keys.length; k++) {
      var arr = seedCache[keys[k]];
      for (var j = 0; j < arr.length; j++) {
        if (arr[j].id === id) { return arr[j]; }
      }
    }
    /* scan nearby weeks so edits can move across weeks */
    for (var w = -8; w <= 8; w++) {
      var d = new Date(viewRef);
      d.setDate(d.getDate() + w * 7);
      var arr2 = getSeedWeek(d);
      for (var j2 = 0; j2 < arr2.length; j2++) {
        if (arr2[j2].id === id) { return arr2[j2]; }
      }
    }
    return null;
  }

  function findById(id) {
    for (var i = 0; i < bookings.length; i++) {
      if (bookings[i].id === id) { return bookings[i]; }
    }
    var raw = lookupRaw(id);
    if (!raw) { return null; }
    var b = Object.assign({}, raw, store.edits[id] || {});
    if (isCancelled(id)) { b.status = "cancelled"; }
    return b;
  }

  function nextId() {
    var n = 1000 + Math.floor(Math.random() * 9000);
    var id = "PRW-" + n;
    while (findById(id)) {
      n = 1000 + Math.floor(Math.random() * 9000);
      id = "PRW-" + n;
    }
    return id;
  }

  function createBooking(input) {
    var svc = svcByKey(input.service);
    var hour = +input.hour;
    var booking = {
      id: nextId(),
      date: input.date,
      hour: hour,
      time: pad2(hour) + ":00",
      name: input.name,
      service: svc.key,
      serviceEn: svc.en,
      serviceTh: svc.th,
      duration: svc.duration,
      deposit: input.deposit === "pending" ? "pending" : "paid",
      depositAmount: DEPOSIT,
      status: input.status || "confirmed",
      phone: input.phone || "080-xxx-xx00",
      seeded: false
    };
    store.created.push(booking);
    saveStore(store);
    rebuild();
    return booking;
  }

  function updateBooking(id, patch) {
    var cur = findById(id);
    if (!cur) { return null; }

    var next = Object.assign({}, cur, patch);
    if (patch.service) {
      var svc = svcByKey(patch.service);
      next.service = svc.key;
      next.serviceEn = svc.en;
      next.serviceTh = svc.th;
      next.duration = svc.duration;
    }
    if (patch.hour != null) {
      next.hour = +patch.hour;
      next.time = pad2(next.hour) + ":00";
    }
    if (patch.deposit) {
      next.deposit = patch.deposit;
    }

    var inCreated = -1;
    for (var i = 0; i < store.created.length; i++) {
      if (store.created[i].id === id) { inCreated = i; break; }
    }
    if (inCreated >= 0) {
      store.created[inCreated] = Object.assign({}, store.created[inCreated], next, { seeded: false });
      delete store.edits[id];
    } else {
      store.edits[id] = Object.assign({}, store.edits[id] || {}, {
        date: next.date,
        hour: next.hour,
        time: next.time,
        name: next.name,
        service: next.service,
        serviceEn: next.serviceEn,
        serviceTh: next.serviceTh,
        duration: next.duration,
        deposit: next.deposit,
        status: next.status,
        phone: next.phone
      });
    }
    if (next.status === "cancelled" && store.cancelled.indexOf(id) === -1) {
      store.cancelled.push(id);
    }
    saveStore(store);
    rebuild();
    return findById(id);
  }

  function setStatus(id, status) {
    if (ALL_STATUSES.indexOf(status) === -1) { return findById(id); }
    if (status === "cancelled") {
      return cancelBooking(id);
    }
    /* uncancel if needed */
    var idx = store.cancelled.indexOf(id);
    if (idx !== -1) {
      store.cancelled.splice(idx, 1);
    }
    return updateBooking(id, { status: status });
  }

  function cancelBooking(id) {
    if (store.cancelled.indexOf(id) === -1) {
      store.cancelled.push(id);
    }
    var edit = store.edits[id] || {};
    edit.status = "cancelled";
    store.edits[id] = edit;
    saveStore(store);
    rebuild();
    return findById(id);
  }

  function resetDemo() {
    store = emptyStore();
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    seedCache = {};
    rebuild();
  }

  function filterBookings(opts) {
    opts = opts || {};
    var list = bookings.slice();
    if (opts.includeCancelled) {
      /* keep */
    } else if (opts.onlyActive !== false) {
      /* list already has cancelled marked; filter for export/list */
    }

    if (opts.q) {
      var q = String(opts.q).toLowerCase().trim();
      list = list.filter(function (b) {
        return b.name.toLowerCase().indexOf(q) !== -1 ||
          b.id.toLowerCase().indexOf(q) !== -1;
      });
    }
    if (opts.service && opts.service !== "all") {
      list = list.filter(function (b) { return b.service === opts.service; });
    }
    if (opts.status && opts.status !== "all") {
      list = list.filter(function (b) { return b.status === opts.status; });
    } else if (!opts.includeCancelled) {
      /* default list can show cancelled struck-through when in date view */
    }
    if (opts.from) {
      list = list.filter(function (b) { return b.date >= opts.from; });
    }
    if (opts.to) {
      list = list.filter(function (b) { return b.date <= opts.to; });
    }
    return list;
  }

  function toCsv(list) {
    list = list || activeBookings(bookings);
    var headers = [
      "Booking code", "Date", "Time", "Customer", "Service",
      "Deposit", "Status", "Phone"
    ];
    var lines = [headers.join(",")];
    for (var i = 0; i < list.length; i++) {
      var b = list[i];
      var row = [
        b.id,
        b.date,
        b.time,
        b.name,
        b.serviceEn,
        b.deposit === "paid" ? "paid 500" : "pending 500",
        b.status,
        b.phone
      ];
      lines.push(row.map(function (cell) {
        var s = String(cell);
        if (/[",\n]/.test(s) || /[^\x00-\x7F]/.test(s)) {
          return '"' + s.replace(/"/g, '""') + '"';
        }
        return s;
      }).join(","));
    }
    return "\uFEFF" + lines.join("\r\n") + "\r\n";
  }

  function downloadCsv(list, filename) {
    var csv = toCsv(list);
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename || "praow-bookings-this-week.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 500);
    return csv;
  }

  global.PraowOwnerData = {
    DEPOSIT: DEPOSIT,
    HOURS: HOURS,
    SERVICES: SERVICES,
    STATUSES: STATUSES,
    ALL_STATUSES: ALL_STATUSES,
    NAMES: NAMES,
    STORE_KEY: STORE_KEY,
    get bookings() { return bookings; },
    bookingsForDate: bookingsForDate,
    activeBookings: activeBookings,
    todayStr: todayStr,
    weekBounds: weekBounds,
    weekDays: weekDays,
    weekMonday: weekMonday,
    weekNumber: weekNumber,
    stats: stats,
    nextFreeSlot: nextFreeSlot,
    freeSlots: freeSlots,
    toCsv: toCsv,
    downloadCsv: downloadCsv,
    findById: findById,
    setStatus: setStatus,
    createBooking: createBooking,
    updateBooking: updateBooking,
    cancelBooking: cancelBooking,
    resetDemo: resetDemo,
    setViewWeek: setViewWeek,
    getViewWeek: getViewWeek,
    isBlocked: isBlocked,
    setBlock: setBlock,
    toggleBlock: toggleBlock,
    getBlocksForWeek: getBlocksForWeek,
    filterBookings: filterBookings,
    rebuild: rebuild,
    ymd: ymd,
    pad2: pad2,
    parseYmd: parseYmd,
    svcByKey: svcByKey
  };
})(typeof window !== "undefined" ? window : globalThis);
