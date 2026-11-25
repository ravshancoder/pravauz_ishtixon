/* ====== SOZLAMALAR — faqat shu yerni o'zgartiring ====== */
const CONFIG = {
  telegram: "Farxod2626",          // admin Telegram username (@siz)
  instagram: "pravauz_ishtixon"
};
/* ======================================================= */

const tgBase = `https://t.me/${CONFIG.telegram}`;

// Barcha Telegram havolalari
document.querySelectorAll("[data-tg]").forEach(a => {
  a.href = tgBase;
  a.target = "_blank";
  a.rel = "noopener";
});

// Yil
document.getElementById("year").textContent = new Date().getFullYear();

// Menyu
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
burger.addEventListener("click", () => menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

// Header soyasi
const header = document.getElementById("header");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 10), { passive: true });

// Paydo bo'lish animatsiyasi
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Sanagich
const counters = document.querySelectorAll("[data-count]");
const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count;
    const suffix = el.dataset.suffix || (el.hasAttribute("data-plus") ? "+" : "");
    const t0 = performance.now(), dur = 1400;
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cio.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => cio.observe(c));

// Kurs tugmasi — formadagi toifani tanlaydi
document.querySelectorAll("[data-course]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("course").value = btn.dataset.course;
  });
});

// Ariza formasi -> Telegram
document.getElementById("leadForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const course = document.getElementById("course").value;
  const err = document.getElementById("formError");

  const digits = phone.replace(/\D/g, "");
  if (name.length < 2) return showErr("Iltimos, ismingizni kiriting.");
  if (digits.length < 9) return showErr("Telefon raqamini to'g'ri kiriting.");

  err.hidden = true;
  const text = `Assalomu alaykum! Pravaga o'qish uchun ariza:\n👤 Ism: ${name}\n📞 Tel: ${phone}\n🚗 Toifa: ${course}`;
  window.open(`${tgBase}?text=${encodeURIComponent(text)}`, "_blank", "noopener");

  function showErr(msg) { err.textContent = msg; err.hidden = false; }
});
