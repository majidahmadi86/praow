/* PRAOW Owner Panel · seeded demo bookings · Mikaro Studio */
(function (global) {
  "use strict";

  var SEED = 0x5052414f; /* PRWO */
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

  function startOfDay(d) {
    var x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return x;
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

  function phoneFrom(rand) {
    var d = Math.floor(rand() * 10);
    var end = 10 + Math.floor(rand() * 90);
    return "08" + d + "-xxx-xx" + pad2(end);
  }

  function pick(rand, arr) {
    return arr[Math.floor(rand() * arr.length)];
  }

  function generateBookings(refDate) {
    var rand = mulberry32(SEED);
    var days = weekDays(refDate || new Date());
    var today = startOfDay(refDate || new Date());
    var todayIdx = -1;
    for (var ti = 0; ti < days.length; ti++) {
      if (ymd(days[ti]) === ymd(today)) { todayIdx = ti; break; }
    }

    var occupied = {};
    for (var di = 0; di < 7; di++) { occupied[di] = {}; }

    var target = 44;
    var list = [];
    var noShowBudget = 1 + (rand() < 0.45 ? 1 : 0);
    var attempts = 0;

    while (list.length < target && attempts < 600) {
      attempts++;
      var dayBias = Math.floor(rand() * 7);
      /* denser mid-week + today */
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

      var status;
      if (noShowBudget > 0 && rand() < 0.04) {
        status = "no-show";
        noShowBudget--;
      } else {
        var dayDate = days[dayBias];
        if (ymd(dayDate) < ymd(today)) {
          status = rand() < 0.85 ? "done" : "no-show";
          if (status === "no-show") {
            if (noShowBudget <= 0) { status = "done"; }
            else { noShowBudget--; }
          }
        } else if (ymd(dayDate) === ymd(today)) {
          if (hour < (refDate || new Date()).getHours()) {
            status = pick(rand, ["done", "arrived", "confirmed"]);
          } else {
            status = pick(rand, ["confirmed", "confirmed", "arrived"]);
          }
        } else {
          status = "confirmed";
        }
      }

      var deposit = rand() < 0.82 ? "paid" : "pending";
      var idNum = 1000 + Math.floor(rand() * 9000);
      list.push({
        id: "PRW-" + idNum,
        date: ymd(days[dayBias]),
        hour: hour,
        time: pad2(hour) + ":00",
        name: pick(rand, NAMES),
        service: svc.key,
        serviceEn: svc.en,
        serviceTh: svc.th,
        duration: svc.duration,
        deposit: deposit,
        depositAmount: DEPOSIT,
        status: status,
        phone: phoneFrom(rand)
      });
    }

    /* guarantee at least one no-show if generator missed */
    var nos = 0;
    for (var n = 0; n < list.length; n++) {
      if (list[n].status === "no-show") { nos++; }
    }
    if (nos === 0 && list.length) {
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

  var bookings = generateBookings(new Date());

  function bookingsForDate(dateStr) {
    return bookings.filter(function (b) { return b.date === dateStr; });
  }

  function todayStr(ref) {
    return ymd(startOfDay(ref || new Date()));
  }

  function weekBounds(ref) {
    var days = weekDays(ref || new Date());
    return { days: days, monday: days[0], sunday: days[6] };
  }

  function stats(ref) {
    var t = todayStr(ref);
    var todayList = bookingsForDate(t);
    var paidSum = 0;
    var paidCount = 0;
    var noshow = 0;
    for (var i = 0; i < bookings.length; i++) {
      if (bookings[i].deposit === "paid") {
        paidSum += bookings[i].depositAmount;
        paidCount++;
      }
      if (bookings[i].status === "no-show") { noshow++; }
    }
    var rate = bookings.length ? (noshow / bookings.length) * 100 : 0;
    return {
      todayCount: todayList.length,
      depositSum: paidSum,
      depositCount: paidCount,
      noshowRate: Math.round(rate * 10) / 10,
      noshowCount: noshow,
      total: bookings.length
    };
  }

  function nextFreeSlot(ref) {
    var now = ref || new Date();
    var days = weekDays(now);
    var todayY = ymd(startOfDay(now));
    var nowHour = now.getHours();

    for (var di = 0; di < days.length; di++) {
      var ds = ymd(days[di]);
      if (ds < todayY) { continue; }
      var taken = {};
      var dayBooks = bookingsForDate(ds);
      for (var b = 0; b < dayBooks.length; b++) {
        var span = Math.ceil(dayBooks[b].duration / 60);
        for (var s = 0; s < span; s++) {
          taken[dayBooks[b].hour + s] = true;
        }
      }
      for (var hi = 0; hi < HOURS.length; hi++) {
        var h = HOURS[hi];
        if (ds === todayY && h <= nowHour) { continue; }
        if (!taken[h]) {
          return { date: ds, hour: h, time: pad2(h) + ":00", day: days[di] };
        }
      }
    }
    return null;
  }

  function toCsv() {
    var headers = [
      "Booking code", "Date", "Time", "Customer", "Service",
      "Deposit", "Status", "Phone"
    ];
    var lines = [headers.join(",")];
    for (var i = 0; i < bookings.length; i++) {
      var b = bookings[i];
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

  function downloadCsv() {
    var csv = toCsv();
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "praow-bookings-this-week.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 500);
    return csv;
  }

  function findById(id) {
    for (var i = 0; i < bookings.length; i++) {
      if (bookings[i].id === id) { return bookings[i]; }
    }
    return null;
  }

  function setStatus(id, status) {
    var b = findById(id);
    if (!b) { return null; }
    if (STATUSES.indexOf(status) === -1) { return b; }
    b.status = status;
    return b;
  }

  global.PraowOwnerData = {
    DEPOSIT: DEPOSIT,
    HOURS: HOURS,
    SERVICES: SERVICES,
    STATUSES: STATUSES,
    NAMES: NAMES,
    bookings: bookings,
    bookingsForDate: bookingsForDate,
    todayStr: todayStr,
    weekBounds: weekBounds,
    weekDays: weekDays,
    stats: stats,
    nextFreeSlot: nextFreeSlot,
    toCsv: toCsv,
    downloadCsv: downloadCsv,
    findById: findById,
    setStatus: setStatus,
    ymd: ymd,
    pad2: pad2
  };
})(typeof window !== "undefined" ? window : globalThis);
