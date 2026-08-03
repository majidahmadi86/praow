/* PRAOW CLINIC · engine: i18n, reveals, booking, consult, BA · Mikaro Studio */
(function () {
  "use strict";

  var dict = {
    en: {
      "brand.mark": "PRAOW",
      "brand.clinic": "Clinic",
      "brand.sub": "Aesthetic Medicine · Thonglor",
      "nav.treatments": "Treatments",
      "nav.results": "Results",
      "nav.consult": "Consult",
      "nav.booking": "Book",
      "nav.book": "Book now",
      "ribbon": "DEMO · Built by Mikaro Studio in 48h",
      "ribbon.href": "https://mikaro.studio/business",
      "hero.title": "Skin, treated like a <em class=\"ital\">craft</em>.",
      "hero.lede": "Botox, fillers and skin quality · planned by doctors, booked in one minute.",
      "hero.chip": "4.9 · 128 Google reviews",
      "hero.float": "Bookable in 1 minute",
      "hero.cta1": "Book now",
      "hero.cta2": "Free consultation",
      "sig.eyebrow": "Signature treatments",
      "sig.title": "Clear starting points, doctor-led <em class=\"ital\">plans</em>",
      "sig.lede": "Every visit begins with a free consultation. Prices below are from-prices before a personal plan.",
      "t1.name": "Botox",
      "t1.price": "From ฿6,500 per area",
      "t2.name": "Filler",
      "t2.price": "From ฿12,900 per cc",
      "t3.name": "Skin quality",
      "t3.price": "Booster + pico from ฿3,900",
      "more": "View details",
      "ba.eyebrow": "Results",
      "ba.title": "Texture you can <em class=\"ital\">compare</em>",
      "ba.lede": "Drag the handle. Skin-texture crops only · results vary by individual.",
      "ba.before": "Before",
      "ba.after": "After",
      "ba.cta": "See more results",
      "ba.cap1": "Skin booster · 2 sessions",
      "ba.cap2": "Pico · 3 sessions",
      "ba.cap3": "Skin quality plan · 4 weeks",
      "ba.cap4": "Booster · 2 sessions",
      "ba.cap5": "Texture focus · 3 sessions",
      "ba.cap6": "Pico + booster · 4 weeks",
      "ba.note": "Results vary by individual",
      "doc.eyebrow": "Clinical care",
      "doc.title": "Led by aesthetic physicians · 12 years of <em class=\"ital\">practice</em>",
      "doc.lede": "Plans are made in person. No named doctor photos in this demo · the focus stays on calm process and clear pricing.",
      "rev.eyebrow": "Guest notes",
      "rev.title": "Quiet feedback from recent <em class=\"ital\">visits</em>",
      "rev1": "Booked online on a Tuesday, deposit locked the slot, and the consult felt unhurried.",
      "rev1.who": "N. · Sukhumvit",
      "rev2": "I asked about filler pricing in chat, then used the free consult form with a photo the same evening.",
      "rev2.who": "P. · Thonglor",
      "rev3": "The site made downtime and session time clear before I committed to a plan.",
      "rev3.who": "A. · Ekkamai",
      "foot.tag": "Aesthetic medicine in Thonglor. Planned by doctors, booked in one minute.",
      "foot.pages": "Pages",
      "foot.visit": "Visit",
      "foot.addr": "88 Sukhumvit 55, Khlong Tan Nuea, Watthana, Bangkok",
      "foot.hours": "Daily 10:00 · 20:00",
      "foot.line": "Chat on LINE",
      "foot.legal": "Demo preview by Mikaro Studio · mikaro.studio",
      "page.treat.title": "Treatments",
      "page.treat.lede": "Plain language on what each treatment does, how long it takes, and what downtime to expect.",
      "page.results.title": "Results",
      "page.results.lede": "Six paired skin-texture crops. Drag each handle to compare.",
      "page.consult.title": "Free consultation",
      "page.consult.lede": "Send a photo and your concern. A doctor reviews and returns a plan with pricing within 24 hours.",
      "page.book.title": "Book a visit",
      "page.book.lede": "Pick a service, choose a slot, then lock it with a ฿500 deposit.",
      "tx.botox.h": "Botox",
      "tx.botox.p": "Softens dynamic lines by easing selected facial muscles. Areas and units are decided with the doctor after assessment.",
      "tx.botox.time": "20 · 40 min",
      "tx.botox.down": "Usually light redness for a few hours",
      "tx.botox.price": "From ฿6,500 / area",
      "tx.filler.h": "Filler",
      "tx.filler.p": "Restores volume or softens contours with hyaluronic filler. Amount in cc is planned to your face, not a fixed look.",
      "tx.filler.time": "30 · 60 min",
      "tx.filler.down": "Possible swelling for 1 · 3 days",
      "tx.filler.price": "From ฿12,900 / cc",
      "tx.skin.h": "Skin quality",
      "tx.skin.p": "Booster and pico sessions aimed at texture, tone and glow. Number of sessions depends on your baseline skin.",
      "tx.skin.time": "30 · 75 min",
      "tx.skin.down": "Mild flush or dryness for 1 · 2 days",
      "tx.skin.price": "From ฿3,900",
      "tx.meta.time": "Session time",
      "tx.meta.down": "Downtime",
      "tx.meta.price": "From price",
      "tx.note": "Every plan starts with a free doctor consultation",
      "cf.demo": "Demo mode · nothing is sent to a clinic. Form runs in your browser.",
      "cf.s1": "Send your photo and concern",
      "cf.s2": "Doctor reviews",
      "cf.s3": "Your plan and price within 24h",
      "cf.concern": "Your concern",
      "cf.concern.ph": "Describe what you would like assessed",
      "cf.photo": "Photo upload",
      "cf.photo.hint": "Drop a photo here, or tap to choose",
      "cf.name": "Name",
      "cf.line": "LINE ID",
      "cf.submit": "Send consultation",
      "cf.ok.title": "Sent · a doctor replies within 24h (demo mode)",
      "cf.ok.text": "In a live clinic build, this lands with the medical team. Here it stays on your device only.",
      "bk.demo": "Demo mode · deposits are not charged. Booking runs client-side.",
      "bk.step1": "1 · Service",
      "bk.step2": "2 · Date & time",
      "bk.step3": "3 · Deposit",
      "bk.service": "Choose a service",
      "bk.svc1": "Botox consultation",
      "bk.svc1.s": "From ฿6,500 / area",
      "bk.svc2": "Filler consultation",
      "bk.svc2.s": "From ฿12,900 / cc",
      "bk.svc3": "Skin quality consult",
      "bk.svc3.s": "From ฿3,900",
      "bk.date": "Next 7 days",
      "bk.time": "Available times",
      "bk.next": "Continue",
      "bk.back": "Back",
      "bk.deposit.title": "Deposit",
      "bk.deposit.lede": "฿500 deposit locks your slot · deducted from your treatment",
      "bk.pay.prompt": "PromptPay QR",
      "bk.pay.prompt.s": "Scan with your banking app",
      "bk.pay.card": "Card",
      "bk.pay.card.s": "Visa · Mastercard · JCB",
      "bk.confirm": "Confirm booking",
      "bk.ok.title": "Slot locked (demo)",
      "bk.ok.text": "Your deposit would lock this appointment on a live site. Nothing was charged here.",
      "bk.today": "Today",
      "chat.hi": "Hello · I am the PRAOW CLINIC receptionist. Ask about prices, booking, or a free consult.",
      "chat.ph": "Ask about treatments…",
      "chat.chip1": "Prices",
      "chat.chip2": "Book",
      "chat.chip3": "Consult"
    },
    th: {
      "brand.mark": "พราว",
      "brand.clinic": "คลินิก",
      "brand.sub": "เวชศาสตร์ความงาม · ทองหล่อ",
      "nav.treatments": "ทรีตเมนต์",
      "nav.results": "ผลลัพธ์",
      "nav.consult": "ปรึกษา",
      "nav.booking": "จองคิว",
      "nav.book": "จองคิวเลย",
      "ribbon": "เดโม่ · สร้างโดย Mikaro Studio ใน 48 ชม.",
      "ribbon.href": "https://mikaro.studio/th/business",
      "hero.title": "ผิวพราว ดูแลอย่าง<em class=\"ital\">งานฝีมือ</em>",
      "hero.lede": "โบท็อกซ์ ฟิลเลอร์ และผิวสุขภาพดี วางแผนโดยแพทย์ จองได้ในหนึ่งนาที",
      "hero.chip": "4.9 · รีวิว Google 128 รายการ",
      "hero.float": "จองได้ใน 1 นาที",
      "hero.cta1": "จองคิวเลย",
      "hero.cta2": "ปรึกษาฟรี",
      "sig.eyebrow": "ทรีตเมนต์ซิกเนเจอร์",
      "sig.title": "จุดเริ่มชัดเจน วางแผนโดย<em class=\"ital\">แพทย์</em>",
      "sig.lede": "ทุกครั้งเริ่มจากปรึกษาแพทย์ฟรี ราคาด้านล่างคือราคาเริ่มต้นก่อนแผนส่วนตัว",
      "t1.name": "โบท็อกซ์",
      "t1.price": "เริ่ม 6,500.- ต่อจุด",
      "t2.name": "ฟิลเลอร์",
      "t2.price": "เริ่ม 12,900.- ต่อซีซี",
      "t3.name": "ผิวใส",
      "t3.price": "บูสเตอร์ + ปิโก เริ่ม 3,900.-",
      "more": "ดูรายละเอียด",
      "ba.eyebrow": "ผลลัพธ์",
      "ba.title": "พื้นผิวที่<em class=\"ital\">เปรียบเทียบ</em>ได้",
      "ba.lede": "ลากแฮนเดิล ภาพครอปพื้นผิวเท่านั้น · ผลลัพธ์ขึ้นอยู่กับแต่ละบุคคล",
      "ba.before": "ก่อน",
      "ba.after": "หลัง",
      "ba.cta": "ดูผลลัพธ์เพิ่ม",
      "ba.cap1": "สกินบูสเตอร์ · 2 ครั้ง",
      "ba.cap2": "ปิโก · 3 ครั้ง",
      "ba.cap3": "แผนผิวใส · 4 สัปดาห์",
      "ba.cap4": "บูสเตอร์ · 2 ครั้ง",
      "ba.cap5": "โฟกัสพื้นผิว · 3 ครั้ง",
      "ba.cap6": "ปิโก + บูสเตอร์ · 4 สัปดาห์",
      "ba.note": "ผลลัพธ์ขึ้นอยู่กับแต่ละบุคคล",
      "doc.eyebrow": "การดูแลโดยแพทย์",
      "doc.title": "ดูแลโดยแพทย์เวชศาสตร์ความงาม ประสบการณ์ 12 <em class=\"ital\">ปี</em>",
      "doc.lede": "แผนการรักษาวางร่วมกันที่คลินิก เดโม่นี้ไม่ใช้ชื่อหรือรูปแพทย์สมมติ เพื่อโฟกัสที่กระบวนการและราคาที่ชัดเจน",
      "rev.eyebrow": "เสียงจากผู้มารับบริการ",
      "rev.title": "ข้อความสั้น ๆ จากผู้มารับบริการ<em class=\"ital\">ล่าสุด</em>",
      "rev1": "จองออนไลน์วันอังคาร มัดจำล็อกคิวได้ และปรึกษาแพทย์ไม่เร่งรีบ",
      "rev1.who": "น. · สุขุมวิท",
      "rev2": "ถามราคาฟิลเลอร์ในแชท แล้วส่งรูปผ่านฟอร์มปรึกษาฟรีคืนเดียวกัน",
      "rev2.who": "พ. · ทองหล่อ",
      "rev3": "เว็บบอก downtime และเวลาที่ใช้ชัดก่อนตัดสินใจทำแผน",
      "rev3.who": "อ. · เอกมัย",
      "foot.tag": "เวชศาสตร์ความงามย่านทองหล่อ วางแผนโดยแพทย์ จองได้ในหนึ่งนาที",
      "foot.pages": "หน้าเว็บ",
      "foot.visit": "ที่ตั้ง",
      "foot.addr": "88 สุขุมวิท 55 คลองตันเหนือ วัฒนา กรุงเทพฯ",
      "foot.hours": "เปิดทุกวัน 10:00 · 20:00",
      "foot.line": "แชททาง LINE",
      "foot.legal": "เว็บตัวอย่างโดย Mikaro Studio · mikaro.studio",
      "page.treat.title": "ทรีตเมนต์",
      "page.treat.lede": "อธิบายแบบเข้าใจง่าย ว่าแต่ละทรีตเมนต์ทำอะไร ใช้เวลานานเท่าไร และมี downtime อย่างไร",
      "page.results.title": "ผลลัพธ์",
      "page.results.lede": "คู่ภาพพื้นผิว 6 คู่ ลากแฮนเดิลเพื่อเปรียบเทียบ",
      "page.consult.title": "ปรึกษาฟรี",
      "page.consult.lede": "ส่งรูปและความกังวล แพทย์ประเมินแล้วส่งแผนพร้อมราคาภายใน 24 ชม.",
      "page.book.title": "จองคิว",
      "page.book.lede": "เลือกบริการ เลือกช่วงเวลา แล้วล็อกคิวด้วยมัดจำ 500.-",
      "tx.botox.h": "โบท็อกซ์",
      "tx.botox.p": "ช่วยผ่อนคลายกล้ามเนื้อที่ทำให้เกิดริ้วรอยจากการแสดงสีหน้า จุดและปริมาณตัดสินร่วมกับแพทย์หลังประเมิน",
      "tx.botox.time": "20 · 40 นาที",
      "tx.botox.down": "มักมีรอยแดงเล็กน้อยไม่กี่ชั่วโมง",
      "tx.botox.price": "เริ่ม 6,500.- / จุด",
      "tx.filler.h": "ฟิลเลอร์",
      "tx.filler.p": "เติมปริมาตรหรือปรับโครงเบา ๆ ด้วยฟิลเลอร์ไฮยาลูรอน ปริมาณซีซีวางแผนตามใบหน้า ไม่ใช่ลุคตายตัว",
      "tx.filler.time": "30 · 60 นาที",
      "tx.filler.down": "อาจบวม 1 · 3 วัน",
      "tx.filler.price": "เริ่ม 12,900.- / ซีซี",
      "tx.skin.h": "ผิวใส",
      "tx.skin.p": "บูสเตอร์และปิโกเพื่อพื้นผิว โทนสี และความเรียบเนียน จำนวนครั้งขึ้นกับสภาพผิวตั้งต้น",
      "tx.skin.time": "30 · 75 นาที",
      "tx.skin.down": "อาจแดงหรือแห้งเล็กน้อย 1 · 2 วัน",
      "tx.skin.price": "เริ่ม 3,900.-",
      "tx.meta.time": "เวลาต่อครั้ง",
      "tx.meta.down": "Downtime",
      "tx.meta.price": "ราคาเริ่มต้น",
      "tx.note": "ทุกแผนการรักษาเริ่มจากปรึกษาแพทย์ฟรี",
      "cf.demo": "โหมดเดโม่ · ไม่ส่งข้อมูลไปคลินิกจริง ฟอร์มทำงานในเบราว์เซอร์",
      "cf.s1": "ส่งรูปและความกังวลของคุณ",
      "cf.s2": "แพทย์ประเมิน",
      "cf.s3": "รับแผนและราคาใน 24 ชม.",
      "cf.concern": "ความกังวลของคุณ",
      "cf.concern.ph": "เล่าสิ่งที่อยากให้แพทย์ประเมิน",
      "cf.photo": "อัปโหลดรูป",
      "cf.photo.hint": "ลากรูปมาวาง หรือแตะเพื่อเลือกไฟล์",
      "cf.name": "ชื่อ",
      "cf.line": "LINE ID",
      "cf.submit": "ส่งคำปรึกษา",
      "cf.ok.title": "ส่งแล้ว · แพทย์จะตอบภายใน 24 ชั่วโมง (โหมดเดโม่)",
      "cf.ok.text": "บนเว็บจริง ข้อมูลจะถึงทีมแพทย์ ที่นี่ข้อมูลอยู่บนเครื่องคุณเท่านั้น",
      "bk.demo": "โหมดเดโม่ · ไม่ตัดมัดจำจริง โฟลว์จองทำงานในเบราว์เซอร์",
      "bk.step1": "1 · บริการ",
      "bk.step2": "2 · วันและเวลา",
      "bk.step3": "3 · มัดจำ",
      "bk.service": "เลือกบริการ",
      "bk.svc1": "ปรึกษาโบท็อกซ์",
      "bk.svc1.s": "เริ่ม 6,500.- / จุด",
      "bk.svc2": "ปรึกษาฟิลเลอร์",
      "bk.svc2.s": "เริ่ม 12,900.- / ซีซี",
      "bk.svc3": "ปรึกษาผิวใส",
      "bk.svc3.s": "เริ่ม 3,900.-",
      "bk.date": "7 วันข้างหน้า",
      "bk.time": "ช่วงเวลาว่าง",
      "bk.next": "ถัดไป",
      "bk.back": "ย้อนกลับ",
      "bk.deposit.title": "มัดจำ",
      "bk.deposit.lede": "มัดจำ 500.- เพื่อล็อกคิว หักจากค่าบริการวันจริง",
      "bk.pay.prompt": "PromptPay QR",
      "bk.pay.prompt.s": "สแกนด้วยแอปธนาคาร",
      "bk.pay.card": "บัตร",
      "bk.pay.card.s": "Visa · Mastercard · JCB",
      "bk.confirm": "ยืนยันการจอง",
      "bk.ok.title": "ล็อกคิวแล้ว (เดโม่)",
      "bk.ok.text": "บนเว็บจริง มัดจำจะล็อกคิวนี้ ที่นี่ไม่มีการตัดเงิน",
      "bk.today": "วันนี้",
      "chat.hi": "สวัสดีค่ะ · ฉันคือพนักงานต้อนรับ PRAOW CLINIC ถามเรื่องราคา จองคิว หรือปรึกษาฟรีได้เลย",
      "chat.ph": "ถามเกี่ยวกับทรีตเมนต์…",
      "chat.chip1": "ราคา",
      "chat.chip2": "จองคิว",
      "chat.chip3": "ปรึกษาฟรี"
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
      var key = nodes[i].getAttribute("data-i18n");
      nodes[i].innerHTML = t(key);
    }
    var attrs = document.querySelectorAll("[data-i18n-placeholder]");
    for (var j = 0; j < attrs.length; j++) {
      attrs[j].setAttribute("placeholder", t(attrs[j].getAttribute("data-i18n-placeholder")));
    }
    var toggles = document.querySelectorAll(".lang-toggle button");
    for (var k = 0; k < toggles.length; k++) {
      toggles[k].classList.toggle("on", toggles[k].getAttribute("data-lang") === lang);
    }
    var ribbon = document.querySelector(".demo-ribbon");
    if (ribbon) {
      ribbon.textContent = t("ribbon");
      ribbon.setAttribute("href", t("ribbon.href"));
    }
    document.dispatchEvent(new CustomEvent("praow:lang", { detail: { lang: lang, t: t } }));
  }

  function setLang(next) {
    lang = next;
    try { window.localStorage.setItem("praow-lang", next); } catch (e) {}
    applyLang();
    if (window.PraowBooking && window.PraowBooking.refresh) {
      window.PraowBooking.refresh();
    }
  }

  function markActiveNav() {
    var path = window.location.pathname.replace(/\.html$/, "").replace(/\/$/, "");
    var page = path.split("/").pop() || "index";
    var links = document.querySelectorAll("[data-page]");
    for (var i = 0; i < links.length; i++) {
      links[i].classList.toggle("active", links[i].getAttribute("data-page") === page);
    }
  }

  function initDrawer() {
    var burger = document.querySelector(".burger");
    var drawer = document.querySelector(".drawer");
    if (!burger || !drawer) { return; }
    burger.addEventListener("click", function () { drawer.classList.add("open"); });
    var close = drawer.querySelector(".close-x");
    if (close) {
      close.addEventListener("click", function () { drawer.classList.remove("open"); });
    }
    var links = drawer.querySelectorAll("a, button");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function () { drawer.classList.remove("open"); });
    }
  }

  function initReveals() {
    var items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("revealed");
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12 });
      for (var i = 0; i < items.length; i++) { io.observe(items[i]); }
    }
    window.setTimeout(function () {
      var all = document.querySelectorAll(".reveal");
      for (var j = 0; j < all.length; j++) { all[j].classList.add("revealed"); }
    }, 2500);
  }

  function initHeroCurtain() {
    var hero = document.querySelector(".hero");
    if (!hero) { return; }
    // Reveal immediately so the ivory curtain never delays LCP.
    hero.classList.add("is-ready");
  }

  function initBaSliders() {
    var sliders = document.querySelectorAll(".ba-slider");
    for (var i = 0; i < sliders.length; i++) {
      (function (root) {
        var wrap = root.querySelector(".ba-before-wrap");
        var handle = root.querySelector(".ba-handle");
        var beforeImg = wrap ? wrap.querySelector("img") : null;
        var dragging = false;

        function size() {
          if (beforeImg) { beforeImg.style.setProperty("--ba-w", root.offsetWidth + "px"); beforeImg.style.width = root.offsetWidth + "px"; }
        }

        function setPos(clientX) {
          var rect = root.getBoundingClientRect();
          var x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
          var pct = (x / rect.width) * 100;
          if (wrap) { wrap.style.width = pct + "%"; }
          if (handle) { handle.style.left = pct + "%"; }
        }

        size();
        window.addEventListener("resize", size);

        function start(e) {
          dragging = true;
          root.classList.add("dragging");
          var x = e.touches ? e.touches[0].clientX : e.clientX;
          setPos(x);
          e.preventDefault();
        }
        function move(e) {
          if (!dragging) { return; }
          var x = e.touches ? e.touches[0].clientX : e.clientX;
          setPos(x);
        }
        function end() {
          dragging = false;
          root.classList.remove("dragging");
        }

        root.addEventListener("mousedown", start);
        root.addEventListener("touchstart", start, { passive: false });
        window.addEventListener("mousemove", move);
        window.addEventListener("touchmove", move, { passive: false });
        window.addEventListener("mouseup", end);
        window.addEventListener("touchend", end);
      })(sliders[i]);
    }
  }

  function initConsult() {
    var form = document.getElementById("consult-form");
    if (!form) { return; }
    var zone = form.querySelector(".dropzone");
    var input = form.querySelector('input[type="file"]');
    var preview = form.querySelector(".dropzone .preview");
    var success = document.getElementById("consult-success");

    function setFile(file) {
      if (!file || !file.type || file.type.indexOf("image/") !== 0) { return; }
      var url = URL.createObjectURL(file);
      preview.src = url;
      zone.classList.add("has-file");
    }

    zone.addEventListener("click", function () { input.click(); });
    input.addEventListener("change", function () {
      if (input.files && input.files[0]) { setFile(input.files[0]); }
    });
    zone.addEventListener("dragover", function (e) {
      e.preventDefault();
      zone.classList.add("is-drag");
    });
    zone.addEventListener("dragleave", function () { zone.classList.remove("is-drag"); });
    zone.addEventListener("drop", function (e) {
      e.preventDefault();
      zone.classList.remove("is-drag");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setFile(e.dataTransfer.files[0]);
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.style.display = "none";
      if (success) { success.classList.add("show"); }
    });
  }

  function initBookingPage() {
    var root = document.getElementById("booking-app");
    if (!root) { return; }

    var state = {
      step: 1,
      service: 0,
      dayIndex: 0,
      slot: null,
      pay: "prompt"
    };

    var services = ["bk.svc1", "bk.svc2", "bk.svc3"];

    function dayLabel(offset) {
      var d = new Date();
      d.setDate(d.getDate() + offset);
      var namesEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      var namesTh = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
      var name = offset === 0 ? t("bk.today") : (lang === "th" ? namesTh[d.getDay()] : namesEn[d.getDay()]);
      return { name: name, num: d.getDate(), full: d };
    }

    function slotDisabled(dayIndex, hour) {
      return ((dayIndex * 7 + hour) % 5) === 0;
    }

    function render() {
      var stepEls = root.querySelectorAll(".book-step");
      for (var i = 0; i < stepEls.length; i++) {
        stepEls[i].classList.toggle("on", parseInt(stepEls[i].getAttribute("data-step"), 10) === state.step);
      }

      var markers = root.querySelectorAll("[data-step-marker]");
      for (var m = 0; m < markers.length; m++) {
        var n = parseInt(markers[m].getAttribute("data-step-marker"), 10);
        markers[m].classList.toggle("on", state.step >= n);
      }

      var svcCards = root.querySelector("#bk-services");
      if (svcCards) {
        var html = "";
        for (var s = 0; s < services.length; s++) {
          html += '<button type="button" class="service-card' + (state.service === s ? " on" : "") +
            '" data-service="' + s + '"><strong>' + t(services[s]) + "</strong><span>" +
            t(services[s] + ".s") + "</span></button>";
        }
        svcCards.innerHTML = html;
      }

      var days = root.querySelector("#bk-days");
      if (days) {
        var dhtml = "";
        for (var d = 0; d < 7; d++) {
          var lb = dayLabel(d);
          dhtml += '<button type="button" class="day-btn' + (state.dayIndex === d ? " on" : "") + '" data-day="' + d + '">' +
            lb.name + "<strong>" + lb.num + "</strong></button>";
        }
        days.innerHTML = dhtml;
      }

      var slots = root.querySelector("#bk-slots");
      if (slots) {
        var sh = "";
        for (var h = 10; h <= 19; h++) {
          var dis = slotDisabled(state.dayIndex, h);
          sh += '<button type="button" class="slot-btn' + (state.slot === h ? " on" : "") + '" data-slot="' + h + '"' +
            (dis ? " disabled" : "") + ">" + h + ":00</button>";
        }
        slots.innerHTML = sh;
      }

      var next2 = root.querySelector("[data-to-step='3']");
      if (next2) { next2.disabled = state.slot === null; }

      var summary = root.querySelector("#bk-summary");
      if (summary) {
        var lb2 = dayLabel(state.dayIndex);
        summary.innerHTML = "<strong>" + t(services[state.service]) + "</strong> · " +
          lb2.name + " " + lb2.num + " · " + (state.slot || "--") + ":00";
      }

      var pays = root.querySelectorAll(".pay-opt");
      for (var p = 0; p < pays.length; p++) {
        pays[p].classList.toggle("on", pays[p].getAttribute("data-pay") === state.pay);
      }
      var qr = root.querySelector(".qr-box");
      var cards = root.querySelector(".card-row");
      if (qr) { qr.style.display = state.pay === "prompt" ? "block" : "none"; }
      if (cards) { cards.style.display = state.pay === "card" ? "flex" : "none"; }

      var okSum = root.querySelector("#bk-ok-summary");
      if (okSum) {
        var lb3 = dayLabel(state.dayIndex);
        okSum.innerHTML = t(services[state.service]) + " · " + lb3.name + " " + lb3.num + " · " + state.slot + ":00 · " +
          (state.pay === "prompt" ? "PromptPay" : "Card") + " · ฿500";
      }
    }

    root.addEventListener("click", function (e) {
      var el = e.target.closest("button");
      if (!el) { return; }
      if (el.hasAttribute("data-service")) {
        state.service = parseInt(el.getAttribute("data-service"), 10) || 0;
        render();
        return;
      }
      if (el.hasAttribute("data-day")) {
        state.dayIndex = parseInt(el.getAttribute("data-day"), 10);
        state.slot = null;
        render();
        return;
      }
      if (el.hasAttribute("data-slot") && !el.disabled) {
        state.slot = parseInt(el.getAttribute("data-slot"), 10);
        render();
        return;
      }
      if (el.hasAttribute("data-pay")) {
        state.pay = el.getAttribute("data-pay");
        render();
        return;
      }
      if (el.hasAttribute("data-to-step")) {
        var next = parseInt(el.getAttribute("data-to-step"), 10);
        if (next === 2) { state.step = 2; }
        if (next === 3 && state.slot !== null) { state.step = 3; }
        if (next === 1) { state.step = 1; }
        if (next === 2 && state.step === 3) { state.step = 2; }
        render();
        return;
      }
      if (el.hasAttribute("data-confirm")) {
        state.step = 4;
        render();
      }
    });

    window.PraowBooking = { refresh: render };
    render();
  }

  function injectRibbon() {
    var existing = document.querySelectorAll(".demo-ribbon");
    if (existing.length > 1) {
      for (var i = 1; i < existing.length; i++) { existing[i].remove(); }
    }
    var a = existing[0];
    if (!a) {
      a = document.createElement("a");
      a.className = "demo-ribbon";
      a.id = "praow-demo-ribbon";
      a.target = "_blank";
      a.rel = "noopener";
      document.body.appendChild(a);
    }
    a.href = t("ribbon.href");
    a.textContent = t("ribbon");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggles = document.querySelectorAll(".lang-toggle button");
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener("click", function () {
        setLang(this.getAttribute("data-lang"));
      });
    }
    injectRibbon();
    applyLang();
    markActiveNav();
    initDrawer();
    initReveals();
    initHeroCurtain();
    initBaSliders();
    initConsult();
    initBookingPage();

    var hdr = document.querySelector(".site-header");
    if (hdr) {
      var onScroll = function () {
        hdr.classList.toggle("scrolled", window.scrollY > 8);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  });

  window.PraowI18n = {
    t: t,
    getLang: function () { return lang; }
  };
})();
