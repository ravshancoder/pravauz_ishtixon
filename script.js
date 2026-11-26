/* =====================================================
   SOZLAMALAR — faqat shu yerni o'zgartiring
   ===================================================== */
const CONFIG = {
  brand: "PRAVA_UZ ISHTIXON",
  telegram: "Farxod2626",        // admin Telegram (@siz)
  instagram: "pravauz_ishtixon",
  phone: "",                     // masalan: "+998 90 123 45 67"  (bo'sh bo'lsa ko'rsatilmaydi)
  address: "",                   // masalan: "Ishtixon tumani, ... ko'chasi"
  hours: "",                     // masalan: "Dushanba–Shanba, 09:00–18:00"
  github: { owner: "ravshancoder", repo: "pravauz_ishtixon", folder: "natijalar" },
  resultFiles: []                // zaxira: GitHub API ishlamasa, rasm nomlarini shu yerga yozing
};

/* Toifalar (kurslar) — narx va davomiylikni o'zgartiring */
const COURSES = [
  { id: "a", letter: "A", name: "A toifa", sub: "Mototsikl va motoroller",
    text: "Ikki g'ildirakli transport vositalarini xavfsiz boshqarishni o'rganing.",
    points: ["Nazariya", "Amaliy haydash", "Imtihonga tayyorlov"], price: "", duration: "" },
  { id: "b", letter: "B", name: "B toifa", sub: "Yengil avtomobil",
    text: "Eng ommabop yo'nalish: yengil avtomobilni noldan ishonch bilan boshqarishgacha.",
    points: ["Nazariya + testlar", "Shahar va yo'lda haydash", "Imtihonga tayyorlov"], price: "", duration: "" },
  { id: "c", letter: "C", name: "C toifa", sub: "Yuk avtomobili",
    text: "Yuk tashish uchun zarur bilim va ko'nikmalar: yuklash, manevr, xavfsizlik.",
    points: ["Nazariya", "Yuk avtomobilida amaliyot", "Imtihonga tayyorlov"], price: "", duration: "" },
  { id: "d", letter: "D", name: "D toifa", sub: "Avtobus (yo'lovchi tashish)",
    text: "Yo'lovchi tashish qoidalari va avtobusni boshqarish bo'yicha mukammal tayyorgarlik.",
    points: ["Nazariya", "Avtobusda amaliyot", "Imtihonga tayyorlov"], price: "", duration: "" },
  { id: "bc", letter: "BC", name: "B + C toifa", sub: "Yengil va yuk avtomobili birga",
    text: "Ikki toifani birga o'qib, vaqt va xarajatni tejang.",
    points: ["Ikki toifa bitta dasturda", "Moslashuvchan jadval", "Imtihonga tayyorlov"], price: "", duration: "" },
  { id: "e", letter: "E", name: "E toifa", sub: "Tirkamali transport",
    text: "Tirkama bilan harakatlanish va uni ulash/uzish bo'yicha amaliy o'qitish.",
    points: ["Nazariya", "Tirkama bilan amaliyot", "Imtihonga tayyorlov"], price: "", duration: "" }
];

const NAV = [
  ["index.html", "Bosh sahifa"],
  ["kurslar.html", "Kurslar"],
  ["test.html", "Onlayn test"],
  ["natijalar.html", "Natijalar"],
  ["aloqa.html", "Aloqa"]
];

/* ===================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const tgBase = `https://t.me/${CONFIG.telegram}`;
const igUrl = `https://www.instagram.com/${CONFIG.instagram}/`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const page = (location.pathname.split("/").pop() || "index.html");

/* ---------- header / footer / fab ---------- */
function mountChrome() {
  const h = $("#site-header");
  if (h) {
    h.outerHTML = `
<header class="header" id="header"><div class="container nav">
  <a href="index.html" class="logo"><img src="logo.png" alt="Prava_UZ Ishtixon logotipi"><span>PRAVA_UZ<small>ISHTIXON · AVTO TEST</small></span></a>
  <nav class="menu" id="menu">${NAV.map(([u, t]) => `<a href="${u}" class="${page === u ? "active" : ""}">${t}</a>`).join("")}</nav>
  <a href="aloqa.html" class="btn btn-red btn-sm" style="white-space:nowrap">Yozilish</a>
  <button class="burger" id="burger" aria-label="Menyu"><span></span><span></span><span></span></button>
</div></header>`;
    $("#burger").addEventListener("click", () => $("#menu").classList.toggle("open"));
  }
  const f = $("#site-footer");
  if (f) {
    const contacts = [
      `<li>✈️ <a href="${tgBase}" target="_blank" rel="noopener">@${CONFIG.telegram}</a></li>`,
      `<li>📸 <a href="${igUrl}" target="_blank" rel="noopener">@${CONFIG.instagram}</a></li>`,
      CONFIG.phone ? `<li>📞 <a href="tel:${CONFIG.phone.replace(/[^+\d]/g, "")}">${esc(CONFIG.phone)}</a></li>` : "",
      CONFIG.address ? `<li>📍 ${esc(CONFIG.address)}</li>` : `<li>📍 Ishtixon tumani, Samarqand viloyati</li>`
    ].join("");
    f.outerHTML = `
<footer class="footer"><div class="container">
  <div class="footer-grid">
    <div><div class="logo"><img src="logo.png" alt=""><span>PRAVA_UZ<small>ISHTIXON · AVTO TEST</small></span></div>
      <p>Haydovchilik guvohnomasini olishga ishonchli tayyorgarlik: nazariya, amaliyot va onlayn testlar.</p></div>
    <div><h4>Bo'limlar</h4><ul>${NAV.map(([u, t]) => `<li><a href="${u}">${t}</a></li>`).join("")}</ul></div>
    <div><h4>Aloqa</h4><ul>${contacts}</ul></div>
  </div>
  <div class="footer-bottom"><span>© ${new Date().getFullYear()} ${CONFIG.brand}. Barcha huquqlar himoyalangan.</span><span>Prava oling — ishonch bilan!</span></div>
</div></footer>`;
  }
  if (!$(".fab")) {
    document.body.insertAdjacentHTML("beforeend", `<a class="fab" href="${tgBase}" target="_blank" rel="noopener" aria-label="Telegramda yozish">✈️ <span>Telegramda yozish</span></a>`);
  }
  $$("[data-tg]").forEach(a => { a.href = tgBase; a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-ig]").forEach(a => { a.href = igUrl; a.target = "_blank"; a.rel = "noopener"; });
}

/* ---------- reveal ---------- */
function mountReveal() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  }), { threshold: 0.1 });
  $$(".reveal").forEach(el => io.observe(el));
}

/* ---------- kurslar ---------- */
function mountCourses() {
  const cards = $("#catCards");
  if (cards) {
    cards.innerHTML = COURSES.map(c => `
<a class="cat reveal" href="kurslar.html#${c.id}">
  <div class="letter">${c.letter}</div><h3>${esc(c.name)}</h3>
  <p>${esc(c.sub)}. ${esc(c.text)}</p><span class="more">Batafsil →</span></a>`).join("");
  }
  const list = $("#courseList");
  if (list) {
    list.innerHTML = COURSES.map(c => `
<article class="course-row reveal" id="${c.id}">
  <div class="big">${c.letter}</div>
  <div><h3>${esc(c.name)} — ${esc(c.sub)}</h3><p>${esc(c.text)}</p>
    <ul>${c.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
    ${c.duration ? `<p style="margin-top:10px"><b>Davomiyligi:</b> ${esc(c.duration)}</p>` : ""}</div>
  <div class="side"><div class="price">${c.price ? esc(c.price) : "Narx: admin bilan kelishiladi"}</div>
    <a class="btn btn-red btn-sm" href="aloqa.html?toifa=${encodeURIComponent(c.name)}">Yozilish</a></div>
</article>`).join("");
  }
}

/* ---------- ariza formasi ---------- */
function mountForm() {
  const form = $("#leadForm");
  if (!form) return;
  const sel = $("#course");
  sel.innerHTML = COURSES.map(c => `<option>${esc(c.name)}</option>`).join("") + "<option>Hali bilmayman</option>";
  const pre = new URLSearchParams(location.search).get("toifa");
  if (pre) sel.value = pre;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#name").value.trim(), phone = $("#phone").value.trim(), course = sel.value;
    const err = $("#formError");
    const show = m => { err.textContent = m; err.hidden = false; };
    if (name.length < 2) return show("Iltimos, ismingizni kiriting.");
    if (phone.replace(/\D/g, "").length < 9) return show("Telefon raqamini to'g'ri kiriting.");
    err.hidden = true;
    const text = `Assalomu alaykum! Pravaga o'qish uchun ariza:\n👤 Ism: ${name}\n📞 Tel: ${phone}\n🚗 Toifa: ${course}`;
    window.open(`${tgBase}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });
}

/* ---------- natijalar (rasmlar) ---------- */
const byNewest = (a, b) => b.localeCompare(a, undefined, { numeric: true });
async function getResults() {
  const g = CONFIG.github;
  try {
    const r = await fetch(`https://api.github.com/repos/${g.owner}/${g.repo}/contents/${g.folder}`);
    if (r.ok) {
      const d = await r.json();
      const f = d.filter(x => x.type === "file" && /\.(jpe?g|png|webp|gif)$/i.test(x.name)).map(x => x.name);
      if (f.length) return f.sort(byNewest);
    }
  } catch (e) { /* zaxira ro'yxatga o'tamiz */ }
  return [...CONFIG.resultFiles].sort(byNewest);
}
const rSrc = n => `${CONFIG.github.folder}/${encodeURIComponent(n)}`;
const rCap = n => { const c = n.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim(); return /^\d+$/.test(c) ? "" : c; };

let lbList = [], lbI = 0;
function lbShow() { $("#lbImg").src = rSrc(lbList[lbI]); }
function openLb(i) { lbI = i; $("#lb").classList.add("open"); lbShow(); }
function mountLightbox() {
  document.body.insertAdjacentHTML("beforeend",
    `<div class="lb" id="lb"><button class="x" aria-label="Yopish">✕</button><button class="pv" aria-label="Oldingi">‹</button><img id="lbImg" alt="Test varog'i"><button class="nx" aria-label="Keyingi">›</button></div>`);
  const lb = $("#lb");
  const close = () => lb.classList.remove("open");
  const step = d => { lbI = (lbI + d + lbList.length) % lbList.length; lbShow(); };
  $(".x", lb).onclick = close; $(".pv", lb).onclick = () => step(-1); $(".nx", lb).onclick = () => step(1);
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close(); if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1);
  });
}
async function mountResults() {
  const full = $("#gallery"), prev = $("#resultsPreview");
  if (!full && !prev) return;
  mountLightbox();
  lbList = await getResults();
  const draw = (el, list, offset) => {
    el.innerHTML = list.map((n, i) => `<figure data-i="${i + offset}"><img loading="lazy" src="${rSrc(n)}" alt="Imtihon test varog'i ${esc(rCap(n))}">${rCap(n) ? `<figcaption>${esc(rCap(n))}</figcaption>` : ""}</figure>`).join("");
    $$("figure", el).forEach(f => f.addEventListener("click", () => openLb(+f.dataset.i)));
  };
  if (!lbList.length) {
    const msg = `<div class="empty"><h3>Natijalar tez orada yangilanadi</h3><p>Imtihondan o'tgan o'quvchilarimizning test varoqlari shu yerda joylanadi.</p></div>`;
    if (full) full.innerHTML = msg; if (prev) prev.innerHTML = msg; return;
  }
  if (full) { draw(full, lbList, 0); const c = $("#resCount"); if (c) c.textContent = lbList.length; }
  if (prev) { draw(prev, lbList.slice(0, 4), 0); }
}

/* ---------- boshlash ---------- */
mountChrome();
mountCourses();
mountForm();
mountResults();
mountReveal();
