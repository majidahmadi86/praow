/* PRAOW CLINIC · engine: i18n, reveals, booking, consult, BA · Mikaro Studio */
(function () {
  "use strict";

  var PRAOW_BUILD = "praow-v5-e50da49";
  try {
    document.documentElement.setAttribute("data-praow-build", PRAOW_BUILD);
    var meta = document.querySelector('meta[name="praow-build"]');
    if (meta) { meta.setAttribute("content", PRAOW_BUILD); }
    console.info("[praow]", PRAOW_BUILD);
  } catch (e) {}

  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e2) {}

  var FAN_SVG = '<svg class="logo-fan" viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" fill="none"><line x1="6" y1="26" x2="26" y2="26" stroke="#C08A6B" stroke-width="1" stroke-linecap="round"/><line class="fan-ray" data-ray="0" x1="16" y1="26" x2="8" y2="26" stroke="#C08A6B" stroke-width="1.2" stroke-linecap="round"/><line class="fan-ray" data-ray="1" x1="16" y1="26" x2="7.22" y2="22.36" stroke="#C08A6B" stroke-width="1.2" stroke-linecap="round"/><line class="fan-ray" data-ray="2" x1="16" y1="26" x2="8.22" y2="18.22" stroke="#C08A6B" stroke-width="1.2" stroke-linecap="round"/><line class="fan-ray" data-ray="3" x1="16" y1="26" x2="11.22" y2="14.45" stroke="#C08A6B" stroke-width="1.2" stroke-linecap="round"/><line class="fan-ray" data-ray="4" x1="16" y1="26" x2="16" y2="12" stroke="#C08A6B" stroke-width="1.2" stroke-linecap="round"/><line class="fan-ray" data-ray="5" x1="16" y1="26" x2="20.78" y2="14.45" stroke="#C08A6B" stroke-width="1.2" stroke-linecap="round"/><line class="fan-ray" data-ray="6" x1="16" y1="26" x2="23.78" y2="18.22" stroke="#C08A6B" stroke-width="1.2" stroke-linecap="round"/><line class="fan-ray" data-ray="7" x1="16" y1="26" x2="24.78" y2="22.36" stroke="#C08A6B" stroke-width="1.2" stroke-linecap="round"/><line class="fan-ray" data-ray="8" x1="16" y1="26" x2="24" y2="26" stroke="#C08A6B" stroke-width="1.2" stroke-linecap="round"/></svg>';

  var HERO_FAN = '<svg class="hero-fan" viewBox="0 0 200 180" aria-hidden="true" fill="none"><line x1="40" y1="160" x2="160" y2="160" stroke="#C08A6B" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/><line class="fan-ray" data-ray="0" x1="100" y1="160" x2="45" y2="160" stroke="#C08A6B" stroke-width="2" stroke-linecap="round"/><line class="fan-ray" data-ray="1" x1="100" y1="160" x2="41.1" y2="135.6" stroke="#C08A6B" stroke-width="2" stroke-linecap="round"/><line class="fan-ray" data-ray="2" x1="100" y1="160" x2="48.73" y2="108.73" stroke="#C08A6B" stroke-width="2" stroke-linecap="round"/><line class="fan-ray" data-ray="3" x1="100" y1="160" x2="68.91" y2="84.93" stroke="#C08A6B" stroke-width="2" stroke-linecap="round"/><line class="fan-ray" data-ray="4" x1="100" y1="160" x2="100" y2="70" stroke="#C08A6B" stroke-width="2" stroke-linecap="round"/><line class="fan-ray" data-ray="5" x1="100" y1="160" x2="131.09" y2="84.93" stroke="#C08A6B" stroke-width="2" stroke-linecap="round"/><line class="fan-ray" data-ray="6" x1="100" y1="160" x2="151.27" y2="108.73" stroke="#C08A6B" stroke-width="2" stroke-linecap="round"/><line class="fan-ray" data-ray="7" x1="100" y1="160" x2="158.9" y2="135.6" stroke="#C08A6B" stroke-width="2" stroke-linecap="round"/><line class="fan-ray" data-ray="8" x1="100" y1="160" x2="155" y2="160" stroke="#C08A6B" stroke-width="2" stroke-linecap="round"/></svg>';

  var dict = {
    en: {
      "brand.mark": "PRAOW",
      "brand.clinic": "CLINIC · THONGLOR",
      "brand.sub": "Aesthetic Medicine · Thonglor",
      "nav.treatments": "Treatments",
      "nav.results": "Results",
      "nav.consult": "Consult",
      "nav.booking": "Book",
      "nav.book": "Book now",
      "ribbon": "DEMO · Built by Mikaro Studio in 48h",
      "ribbon.href": "https://mikaro.studio/business",
      "hero.l1": "Skin,",
      "hero.l2": "treated like",
      "hero.l3": "a <em class=\"ital\">craft</em>.",
      "hero.micro": "Aesthetic Medicine ✦ Thonglor, Bangkok ✦ Est. 2019",
      "hero.title": "Skin, treated like a <em class=\"ital\">craft</em>.",
      "hero.lede": "Botox, fillers and skin quality · planned by doctors, booked in one minute.",
      "hero.chip": "4.9 · 128 Google reviews",
      "hero.slot": "Next slot today · 14:30",
      "hero.deposit": "฿500 locks your slot",
      "hero.stat1n": "12",
      "hero.stat1": "years practice",
      "hero.stat2": "128 reviews",
      "hero.stat3n": "24h",
      "hero.stat3": "Replies within 24h",
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
      "ba.cap1": "Botox · 1 session",
      "ba.cap2": "Filler · 1 session",
      "ba.cap3": "Skin quality · 2 sessions",
      "ba.cap4": "Botox · 2 sessions",
      "ba.cap5": "Filler · 1 session",
      "ba.cap6": "Skin quality · 3 sessions",
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
      "foot.legal": "Demo preview by Mikaro Studio",
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
      "cf.s1t": "Share",
      "cf.s2t": "Review",
      "cf.s3t": "Plan",
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
      "bk.pay.prompt.s": "สแกนด้วยแอปธนาคาร / Scan with your banking app",
      "bk.pay.card": "Card",
      "bk.pay.card.s": "Visa · Mastercard · JCB",
      "bk.confirm": "Confirm booking",
      "bk.ok.title": "Slot locked (demo)",
      "bk.ok.text": "Your deposit would lock this appointment on a live site. Nothing was charged here.",
      "bk.t.service": "Service",
      "bk.t.date": "Date",
      "bk.t.time": "Time",
      "bk.t.deposit": "Deposit",
      "bk.t.paid": "Paid ✦ ฿500 (demo)",
      "bk.t.code": "Booking code",
      "bk.t.save": "Save to phone",
      "bk.t.new": "New booking",
      "bk.t.save.note": "Screenshot this ticket to keep your demo booking.",
      "bk.today": "Today",
      "chat.hi": "Hello · I am the PRAOW CLINIC receptionist. Ask about prices, booking, or a free consult.",
      "chat.ph": "Ask about treatments…",
      "chat.chip1": "Prices",
      "chat.chip2": "Book",
      "chat.chip3": "Consult",
      "seo.home.title": "PRAOW CLINIC · Aesthetic medicine in Thonglor, Bangkok",
      "seo.home.desc": "Botox, fillers and skin quality planned by doctors. Free consultation, online booking with a 500 THB deposit. Thonglor, Bangkok.",
      "seo.treatments.title": "PRAOW CLINIC · Treatments · Botox, filler and skin quality",
      "seo.treatments.desc": "Clear from-prices for Botox, filler and skin quality at PRAOW in Thonglor. Session time and downtime explained before you book.",
      "seo.results.title": "PRAOW CLINIC · Before and after results · Thonglor",
      "seo.results.desc": "Compare skin-texture before and after crops from Botox, filler and skin quality treatments. Results vary by individual.",
      "seo.consult.title": "PRAOW CLINIC · Free consultation · Doctor plan in 24h",
      "seo.consult.desc": "Send a photo and your concern. A PRAOW doctor reviews and returns a plan with pricing within 24 hours. Thonglor, Bangkok.",
      "seo.booking.title": "PRAOW CLINIC · Book online · 500 THB deposit",
      "seo.booking.desc": "Book Botox, filler or skin quality at PRAOW Thonglor. Pick a slot and lock it with a 500 THB deposit deducted from treatment.",
      "alt.hero": "Warm neutral clinical-calm beauty portrait",
      "alt.botox": "Temple and brow portrait crop",
      "alt.filler": "Lips and cheek portrait crop",
      "alt.skin": "Glowing bare-skin cheek macro",
      "alt.interior": "Calm wood and linen consult room",
      "ba.alt1.b": "Botox result, before",
      "ba.alt1.a": "Botox result, after",
      "ba.alt2.b": "Filler result, before",
      "ba.alt2.a": "Filler result, after",
      "ba.alt3.b": "Skin booster result, before",
      "ba.alt3.a": "Skin booster result, after",
      "ba.alt4.b": "Botox result, before",
      "ba.alt4.a": "Botox result, after",
      "ba.alt5.b": "Filler result, before",
      "ba.alt5.a": "Filler result, after",
      "ba.alt6.b": "Skin quality result, before",
      "ba.alt6.a": "Skin quality result, after",
      "a11y.ba": "Compare before and after",
      "a11y.menu": "Open menu",
      "a11y.close": "Close menu"
    },
    th: {
      "brand.mark": "PRAOW",
      "brand.clinic": "CLINIC · THONGLOR",
      "brand.sub": "เวชศาสตร์ความงาม · ทองหล่อ",
      "nav.treatments": "ทรีตเมนต์",
      "nav.results": "ผลลัพธ์",
      "nav.consult": "ปรึกษา",
      "nav.booking": "จองคิว",
      "nav.book": "จองคิวเลย",
      "ribbon": "เดโม่ · สร้างโดย Mikaro Studio ใน 48 ชม.",
      "ribbon.href": "https://mikaro.studio/th/business",
      "hero.l1": "ผิว<em class=\"ital\">พราว</em>",
      "hero.l2": "ดูแลอย่าง",
      "hero.l3": "งานฝีมือ",
      "hero.micro": "เวชศาสตร์ความงาม ✦ ทองหล่อ กรุงเทพฯ",
      "hero.title": "ผิวพราว ดูแลอย่าง<em class=\"ital\">งานฝีมือ</em>",
      "hero.lede": "โบท็อกซ์ ฟิลเลอร์ และผิวสุขภาพดี วางแผนโดยแพทย์ จองได้ในหนึ่งนาที",
      "hero.chip": "4.9 · รีวิว Google 128 รายการ",
      "hero.slot": "คิวว่างวันนี้ · 14:30",
      "hero.deposit": "มัดจำ 500.- ล็อกคิว",
      "hero.stat1n": "12",
      "hero.stat1": "ปี ประสบการณ์",
      "hero.stat2": "128 รีวิว",
      "hero.stat3n": "24 ชม.",
      "hero.stat3": "ตอบภายใน 24 ชม.",
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
      "ba.cap1": "โบท็อกซ์ · 1 ครั้ง",
      "ba.cap2": "ฟิลเลอร์ · 1 ครั้ง",
      "ba.cap3": "ผิวใส · 2 ครั้ง",
      "ba.cap4": "โบท็อกซ์ · 2 ครั้ง",
      "ba.cap5": "ฟิลเลอร์ · 1 ครั้ง",
      "ba.cap6": "ผิวใส · 3 ครั้ง",
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
      "foot.legal": "เว็บตัวอย่างโดย Mikaro Studio",
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
      "cf.s1t": "ส่งข้อมูล",
      "cf.s2t": "ประเมิน",
      "cf.s3t": "รับแผน",
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
      "bk.pay.prompt.s": "สแกนด้วยแอปธนาคาร / Scan with your banking app",
      "bk.pay.card": "บัตร",
      "bk.pay.card.s": "Visa · Mastercard · JCB",
      "bk.confirm": "ยืนยันการจอง",
      "bk.ok.title": "ล็อกคิวแล้ว (เดโม่)",
      "bk.ok.text": "บนเว็บจริง มัดจำจะล็อกคิวนี้ ที่นี่ไม่มีการตัดเงิน",
      "bk.t.service": "บริการ",
      "bk.t.date": "วัน",
      "bk.t.time": "เวลา",
      "bk.t.deposit": "มัดจำ",
      "bk.t.paid": "ชำระแล้ว ✦ 500.- (เดโม่)",
      "bk.t.code": "รหัสจอง",
      "bk.t.save": "บันทึกลงมือถือ",
      "bk.t.new": "จองอีกครั้ง",
      "bk.t.save.note": "ถ่ายภาพหน้าจอตั๋วนี้เพื่อเก็บการจองเดโม่",
      "bk.today": "วันนี้",
      "chat.hi": "สวัสดีค่ะ · ฉันคือพนักงานต้อนรับ PRAOW CLINIC ถามเรื่องราคา จองคิว หรือปรึกษาฟรีได้เลย",
      "chat.ph": "ถามเกี่ยวกับทรีตเมนต์…",
      "chat.chip1": "ราคา",
      "chat.chip2": "จองคิว",
      "chat.chip3": "ปรึกษาฟรี",
      "seo.home.title": "พราวคลินิก · เวชศาสตร์ความงาม ทองหล่อ",
      "seo.home.desc": "โบท็อกซ์ ฟิลเลอร์ และผิวสุขภาพดี วางแผนโดยแพทย์ ปรึกษาฟรี จองออนไลน์ มัดจำ 500 บาท ทองหล่อ กรุงเทพฯ",
      "seo.treatments.title": "พราวคลินิก · ทรีตเมนต์ · โบท็อกซ์ ฟิลเลอร์ ผิวใส",
      "seo.treatments.desc": "ราคาเริ่มต้นชัดเจนสำหรับโบท็อกซ์ ฟิลเลอร์ และผิวใส ที่พราวคลินิก ทองหล่อ อธิบายเวลาและ downtime ก่อนจอง",
      "seo.results.title": "พราวคลินิก · ผลลัพธ์ก่อน-หลัง · ทองหล่อ",
      "seo.results.desc": "เปรียบเทียบพื้นผิวก่อนและหลังจากโบท็อกซ์ ฟิลเลอร์ และผิวใส ผลลัพธ์ขึ้นกับแต่ละบุคคล",
      "seo.consult.title": "พราวคลินิก · ปรึกษาฟรี · รับแผนจากแพทย์ใน 24 ชม.",
      "seo.consult.desc": "ส่งรูปและความกังวล แพทย์พราวประเมินแล้วส่งแผนพร้อมราคาภายใน 24 ชั่วโมง ทองหล่อ กรุงเทพฯ",
      "seo.booking.title": "พราวคลินิก · จองออนไลน์ · มัดจำ 500 บาท",
      "seo.booking.desc": "จองโบท็อกซ์ ฟิลเลอร์ หรือผิวใส ที่พราว ทองหล่อ เลือกคิวแล้วล็อกด้วยมัดจำ 500 บาท หักจากค่าบริการ",
      "alt.hero": "ภาพพอร์ตเทรตโทนอุ่น บรรยากาศคลินิกสงบ",
      "alt.botox": "ภาพครอปขมับและคิ้ว",
      "alt.filler": "ภาพครอปริมฝีปากและแก้ม",
      "alt.skin": "ภาพมาโครผิวเปลือยเรืองแสง",
      "alt.interior": "ห้องปรึกษาไม้และผ้าลินินโทนสงบ",
      "ba.alt1.b": "ผลโบท็อกซ์ ก่อน",
      "ba.alt1.a": "ผลโบท็อกซ์ หลัง",
      "ba.alt2.b": "ผลฟิลเลอร์ ก่อน",
      "ba.alt2.a": "ผลฟิลเลอร์ หลัง",
      "ba.alt3.b": "ผลบูสเตอร์ผิว ก่อน",
      "ba.alt3.a": "ผลบูสเตอร์ผิว หลัง",
      "ba.alt4.b": "ผลโบท็อกซ์ ก่อน",
      "ba.alt4.a": "ผลโบท็อกซ์ หลัง",
      "ba.alt5.b": "ผลฟิลเลอร์ ก่อน",
      "ba.alt5.a": "ผลฟิลเลอร์ หลัง",
      "ba.alt6.b": "ผลผิวใส ก่อน",
      "ba.alt6.a": "ผลผิวใส หลัง",
      "a11y.ba": "เปรียบเทียบก่อนและหลัง",
      "a11y.menu": "เปิดเมนู",
      "a11y.close": "ปิดเมนู"
    }
  };

  var lang = "en";
  try { lang = window.localStorage.getItem("praow-lang") || "en"; } catch (e) {}
  if (lang !== "en" && lang !== "th") { lang = "en"; }

  function t(key) {
    return (dict[lang] && dict[lang][key]) || dict.en[key] || key;
  }

  function applySeoMeta() {
    var page = document.querySelector('meta[name="praow-page"]');
    var key = page ? page.getAttribute("content") : "home";
    var title = t("seo." + key + ".title");
    var desc = t("seo." + key + ".desc");
    if (title && title.indexOf("seo.") !== 0) {
      document.title = title;
      var md = document.querySelector('meta[name="description"]');
      if (md) { md.setAttribute("content", desc); }
      var ogt = document.querySelector('meta[property="og:title"]');
      if (ogt) { ogt.setAttribute("content", title); }
      var ogd = document.querySelector('meta[property="og:description"]');
      if (ogd) { ogd.setAttribute("content", desc); }
      var ogl = document.querySelector('meta[property="og:locale"]');
      if (ogl) { ogl.setAttribute("content", lang === "th" ? "th_TH" : "en_TH"); }
    }
    var alts = document.querySelectorAll("[data-i18n-alt]");
    for (var i = 0; i < alts.length; i++) {
      alts[i].setAttribute("alt", t(alts[i].getAttribute("data-i18n-alt")));
    }
    // Force Latin lockup everywhere
    var marks = document.querySelectorAll('[data-brand-lockup="mark"]');
    for (var m = 0; m < marks.length; m++) { marks[m].textContent = "PRAOW"; }
    var subs = document.querySelectorAll('[data-brand-lockup="clinic"]');
    for (var s = 0; s < subs.length; s++) { subs[s].textContent = "CLINIC · THONGLOR"; }
    var burger = document.querySelector(".burger");
    if (burger) { burger.setAttribute("aria-label", t("a11y.menu")); }
    var close = document.querySelector(".drawer .close-x");
    if (close) { close.setAttribute("aria-label", t("a11y.close")); }
    var handles = document.querySelectorAll(".ba-handle");
    for (var h = 0; h < handles.length; h++) {
      handles[h].setAttribute("aria-label", t("a11y.ba"));
    }
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
      ribbon.setAttribute("href", t("ribbon.href"));
      var span = ribbon.querySelector("span:not(.ribbon-48)");
      if (span) { span.textContent = t("ribbon"); }
    }
    applySeoMeta();
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
    var scrim = document.querySelector(".drawer-scrim");
    if (!burger || !drawer) { return; }

    var startX = 0;
    var tracking = false;

    function openDrawer() {
      drawer.hidden = false;
      if (scrim) { scrim.hidden = false; }
      requestAnimationFrame(function () {
        drawer.classList.add("open");
        if (scrim) { scrim.classList.add("open"); }
      });
      burger.setAttribute("aria-expanded", "true");
      document.body.classList.add("drawer-lock");
    }

    function closeDrawer() {
      drawer.classList.remove("open");
      if (scrim) { scrim.classList.remove("open"); }
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("drawer-lock");
      window.setTimeout(function () {
        if (!drawer.classList.contains("open")) {
          drawer.hidden = true;
          if (scrim) { scrim.hidden = true; }
        }
      }, 450);
    }

    burger.addEventListener("click", function () {
      if (drawer.classList.contains("open")) { closeDrawer(); }
      else { openDrawer(); }
    });
    var close = drawer.querySelector(".close-x");
    if (close) {
      close.addEventListener("click", function (e) {
        e.stopPropagation();
        closeDrawer();
      });
    }
    if (scrim) {
      scrim.addEventListener("click", closeDrawer);
    }
    var navLinks = drawer.querySelectorAll(".drawer-link, .drawer-book");
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", closeDrawer);
    }
    // lang toggle inside drawer should NOT close on click of buttons - keep open
    drawer.addEventListener("touchstart", function (e) {
      if (!drawer.classList.contains("open")) { return; }
      startX = e.touches[0].clientX;
      tracking = true;
    }, { passive: true });
    drawer.addEventListener("touchmove", function (e) {
      if (!tracking) { return; }
      var dx = e.touches[0].clientX - startX;
      if (dx > 70) {
        tracking = false;
        closeDrawer();
      }
    }, { passive: true });
    drawer.addEventListener("touchend", function () { tracking = false; });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("open")) { closeDrawer(); }
    });
  }

  function initReveals() {
    var items = document.querySelectorAll(".reveal");
    var sections = document.querySelectorAll(".section-ivory, .section-blush");
    // stagger within section
    for (var s = 0; s < sections.length; s++) {
      var kids = sections[s].querySelectorAll(".reveal");
      for (var k = 0; k < kids.length; k++) {
        kids[k].setAttribute("data-stagger", String((k % 4) + 1));
      }
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("revealed");
            en.target.classList.add("in-view");
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12 });
      for (var i = 0; i < items.length; i++) { io.observe(items[i]); }
      for (var j = 0; j < sections.length; j++) { io.observe(sections[j]); }
    }
    window.setTimeout(function () {
      var all = document.querySelectorAll(".reveal");
      for (var n = 0; n < all.length; n++) { all[n].classList.add("revealed"); }
      for (var m = 0; m < sections.length; m++) { sections[m].classList.add("in-view"); }
    }, 2500);
  }

  function initHeroCurtain() {
    var hero = document.querySelector(".hero");
    if (!hero) { return; }
    var wrap = hero.querySelector(".hero-fan-wrap");
    if (wrap && !wrap.querySelector("svg")) { wrap.innerHTML = HERO_FAN; }
    requestAnimationFrame(function () {
      hero.classList.add("is-ready");
    });
  }

  function initParallax() {
    if (reduceMotion) { return; }
    var layer = document.querySelector("[data-parallax]");
    if (!layer) { return; }
    var factor = parseFloat(layer.getAttribute("data-parallax")) || 0.85;
    function onScroll() {
      var y = window.scrollY || 0;
      if (y > 700) { return; }
      layer.style.transform = "translate3d(0," + (y * (1 - factor)) + "px,0)";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initStatCount() {
    var strip = document.getElementById("stat-strip");
    if (!strip) { return; }
    var done = false;
    function run() {
      if (done) { return; }
      done = true;
      var nodes = strip.querySelectorAll("[data-count]");
      for (var i = 0; i < nodes.length; i++) {
        (function (el) {
          var target = parseFloat(el.getAttribute("data-count"));
          var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
          if (reduceMotion || isNaN(target)) {
            el.textContent = decimals ? target.toFixed(decimals) : String(target);
            return;
          }
          var start = performance.now();
          var dur = 600;
          function frame(now) {
            var p = Math.min(1, (now - start) / dur);
            var val = target * p;
            el.textContent = decimals ? val.toFixed(decimals) : String(Math.round(val));
            if (p < 1) { requestAnimationFrame(frame); }
          }
          requestAnimationFrame(frame);
        })(nodes[i]);
      }
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { run(); io.disconnect(); }
        });
      }, { threshold: 0.4 });
      io.observe(strip);
    } else { run(); }
  }

  function initFooterFan() {
    var foot = document.querySelector(".site-footer");
    if (!foot) { return; }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            foot.classList.add("is-lit");
            io.disconnect();
          }
        });
      }, { threshold: 0.2 });
      io.observe(foot);
    } else {
      foot.classList.add("is-lit");
    }
  }

  function initBaSliders() {
    var sliders = document.querySelectorAll(".ba-slider");
    for (var i = 0; i < sliders.length; i++) {
      (function (root) {
        var wrap = root.querySelector(".ba-before-wrap");
        var handle = root.querySelector(".ba-handle");
        var beforeImg = wrap ? wrap.querySelector("img") : null;
        var dragging = false;
        var nudged = false;

        function size() {
          if (beforeImg) { beforeImg.style.setProperty("--ba-w", root.offsetWidth + "px"); beforeImg.style.width = root.offsetWidth + "px"; }
        }

        function setPos(clientX) {
          var rect = root.getBoundingClientRect();
          var x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
          var pct = (x / rect.width) * 100;
          setPct(pct);
        }

        function setPct(pct) {
          if (wrap) { wrap.style.width = pct + "%"; }
          if (handle) {
            handle.style.left = pct + "%";
            handle.setAttribute("aria-valuenow", String(Math.round(pct)));
          }
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

        if (handle) {
          handle.addEventListener("keydown", function (e) {
            var now = parseFloat(handle.getAttribute("aria-valuenow") || "50");
            if (e.key === "ArrowLeft") { setPct(Math.max(0, now - 5)); e.preventDefault(); }
            if (e.key === "ArrowRight") { setPct(Math.min(100, now + 5)); e.preventDefault(); }
          });
        }

        root.addEventListener("mousedown", start);
        root.addEventListener("touchstart", start, { passive: false });
        window.addEventListener("mousemove", move);
        window.addEventListener("touchmove", move, { passive: false });
        window.addEventListener("mouseup", end);
        window.addEventListener("touchend", end);

        if (!reduceMotion && "IntersectionObserver" in window) {
          var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
              if (en.isIntersecting && !nudged) {
                nudged = true;
                var base = 50;
                setPct(base);
                window.setTimeout(function () { setPct(base - (12 / root.offsetWidth) * 100); }, 120);
                window.setTimeout(function () { setPct(base + (12 / root.offsetWidth) * 100); }, 320);
                window.setTimeout(function () { setPct(base); }, 520);
                io.disconnect();
              }
            });
          }, { threshold: 0.35 });
          io.observe(root);
        }
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
      pay: "prompt",
      bookingCode: null
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
      var pp = root.querySelector("#pp-card") || root.querySelector(".pp-card");
      var cards = root.querySelector(".card-row");
      if (qr) { qr.style.display = "none"; }
      if (pp) { pp.style.display = state.pay === "prompt" ? "block" : "none"; }
      if (cards) { cards.style.display = state.pay === "card" ? "flex" : "none"; }

      var okSum = root.querySelector("#bk-ok-summary");
      if (okSum) {
        var lb3 = dayLabel(state.dayIndex);
        okSum.innerHTML = t(services[state.service]) + " · " + lb3.name + " " + lb3.num + " · " + state.slot + ":00 · " +
          (state.pay === "prompt" ? "PromptPay" : "Card") + " · ฿500";
      }

      if (state.step === 4) {
        fillTicket(dayLabel(state.dayIndex));
      }
    }

    function fillTicket(lb) {
      if (!state.bookingCode) {
        state.bookingCode = "PRW-" + String(1000 + Math.floor(Math.random() * 9000));
      }
      var code = state.bookingCode;
      var svc = root.querySelector("#tk-service");
      var date = root.querySelector("#tk-date");
      var time = root.querySelector("#tk-time");
      var codeEl = root.querySelector("#tk-code");
      var qr = root.querySelector("#tk-qr");
      var fan = root.querySelector(".ticket-fan");
      if (fan && !fan.querySelector("svg")) { fan.innerHTML = FAN_SVG; }
      if (svc) { svc.textContent = t(services[state.service]); }
      if (date) { date.textContent = lb.name + " " + lb.num; }
      if (time) { time.textContent = state.slot + ":00"; }
      if (codeEl) { codeEl.textContent = code; }
      if (qr) {
        qr.src = "https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=" + encodeURIComponent(code);
        qr.onerror = function () { qr.src = "images/opt/ticket-qr-demo.png"; };
      }
      var ticket = root.querySelector("#booking-ticket");
      if (ticket && !ticket.classList.contains("is-in")) {
        window.setTimeout(function () { ticket.classList.add("is-in"); }, 40);
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
        state.bookingCode = null;
        var ticket = root.querySelector("#booking-ticket");
        if (ticket) { ticket.classList.remove("is-in"); }
        render();
        return;
      }
      if (el.hasAttribute("data-restart")) {
        state.step = 1;
        state.slot = null;
        state.bookingCode = null;
        var ticket2 = root.querySelector("#booking-ticket");
        if (ticket2) { ticket2.classList.remove("is-in"); }
        render();
        return;
      }
    });

    var saveBtn = root.querySelector("#tk-save");
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        var code = (root.querySelector("#tk-code") || {}).textContent || "PRW";
        var text = "PRAOW · " + code;
        if (navigator.share) {
          navigator.share({ title: "PRAOW booking", text: text }).catch(function () {});
        } else {
          window.alert(t("bk.t.save.note"));
        }
      });
    }

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
    a.setAttribute("aria-label", t("ribbon"));
    a.innerHTML = FAN_SVG.replace('width="30" height="30"', 'width="14" height="14"') +
      "<span>" + t("ribbon") + "</span><span class=\"ribbon-48\" aria-hidden=\"true\">48h</span>";

    var expandTimer = null;
    a.addEventListener("click", function (e) {
      if (window.matchMedia("(max-width: 640px)").matches && !a.classList.contains("is-expanded")) {
        e.preventDefault();
        a.classList.add("is-expanded");
        if (expandTimer) { window.clearTimeout(expandTimer); }
        expandTimer = window.setTimeout(function () {
          a.classList.remove("is-expanded");
        }, 4000);
      }
    });
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
    initParallax();
    initStatCount();
    initFooterFan();
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
