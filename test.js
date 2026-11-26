/* Onlayn avto test dvigateli */
(function () {
  const root = document.getElementById("testRoot");
  const S = TEST_SETTINGS;
  const topics = [...new Set(QUESTIONS.map(q => q.topic))];
  let st = null, timerId = null;

  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const store = {
    get() { try { return JSON.parse(localStorage.getItem("pu_hist") || "[]"); } catch (e) { return []; } },
    add(x) { try { const h = store.get(); h.unshift(x); localStorage.setItem("pu_hist", JSON.stringify(h.slice(0, 8))); } catch (e) { } }
  };
  const prep = q => { const idx = shuffle(q.a.map((_, i) => i)); return { ...q, opts: idx.map(i => q.a[i]), ci: idx.indexOf(q.c) }; };

  function home() {
    clearInterval(timerId);
    const h = store.get();
    root.innerHTML = `
<div class="t-card">
  <div class="t-modes">
    <div class="mode"><h3>📝 Imtihon rejimi</h3>
      <p>${Math.min(S.examCount, QUESTIONS.length)} ta tasodifiy savol, ${S.examMinutes} daqiqa. ${S.maxMistakes} tagacha xato ruxsat etiladi. Natija oxirida ko'rsatiladi.</p>
      <button class="btn btn-red" id="mExam">Imtihonni boshlash</button></div>
    <div class="mode"><h3>📚 Mashq rejimi</h3>
      <p>Mavzuni tanlang: har bir javobdan keyin to'g'ri javob va izoh ko'rsatiladi.</p>
      <select id="topicSel"><option value="">Barcha mavzular</option>${topics.map(t => `<option>${t}</option>`).join("")}</select>
      <button class="btn btn-blue" id="mPrac">Mashqni boshlash</button></div>
  </div>
  <p class="notice">ℹ️ Bu — namunaviy mashq savollari (jami ${QUESTIONS.length} ta, ${topics.length} mavzu). Rasmiy imtihon savollari bilan to'liq tanishish uchun o'quv markazimizga murojaat qiling.</p>
  ${h.length ? `<div class="hist"><b>So'nggi natijalaringiz:</b><br>${h.map(x => `${x.d} — ${x.m}: ${x.s}/${x.n} ${x.p ? "✅" : "❌"}`).join("<br>")}</div>` : ""}
</div>`;
    document.getElementById("mExam").onclick = () => start("exam");
    document.getElementById("mPrac").onclick = () => start("prac", document.getElementById("topicSel").value);
  }

  function start(mode, topic) {
    let pool = QUESTIONS.filter(q => !topic || q.topic === topic);
    if (mode === "exam") pool = shuffle(pool).slice(0, S.examCount);
    else pool = shuffle(pool);
    st = { mode, list: pool.map(prep), i: 0, ans: [], left: S.examMinutes * 60, lock: false };
    if (mode === "exam") {
      clearInterval(timerId);
      timerId = setInterval(() => {
        st.left--;
        const t = document.getElementById("timer");
        if (t) { t.textContent = "⏱ " + fmt(Math.max(st.left, 0)); t.classList.toggle("low", st.left <= 60); }
        if (st.left <= 0) finish();
      }, 1000);
    }
    draw();
  }

  function chips() {
    return st.list.map((_, k) => {
      const a = st.ans[k];
      let c = k === st.i ? "cur" : "";
      if (a !== undefined) c = st.mode === "prac" ? (a === st.list[k].ci ? "ok" : "bad") : (k === st.i ? "cur" : "done");
      return `<button class="${c}" data-k="${k}">${k + 1}</button>`;
    }).join("");
  }

  function draw() {
    const q = st.list[st.i], a = st.ans[st.i], prac = st.mode === "prac", answered = a !== undefined;
    root.innerHTML = `
<div class="t-card">
  <div class="t-top"><span>Savol ${st.i + 1} / ${st.list.length}</span>
    ${st.mode === "exam" ? `<span class="timer" id="timer">⏱ ${fmt(st.left)}</span>` : `<span class="timer">Mashq</span>`}</div>
  <div class="chipsq" id="chips">${chips()}</div>
  <div class="q-topic">${q.topic}</div>
  <div class="q-text">${q.q}</div>
  ${q.img ? `<img class="q-img" src="${q.img}" alt="Savol rasmi">` : ""}
  <div class="opts">${q.opts.map((o, k) => {
      let cls = "";
      if (answered) {
        if (prac) cls = k === q.ci ? "ok" : (k === a ? "bad" : "");
        else cls = k === a ? "sel" : "";
      }
      return `<button class="opt ${cls}" data-k="${k}" ${answered && prac ? "disabled" : ""}><b>${"ABCDEF"[k]}</b><span>${o}</span></button>`;
    }).join("")}</div>
  ${answered && prac && q.e ? `<div class="expl">💡 ${q.e}</div>` : ""}
  <div class="t-nav">
    <button class="btn btn-line btn-sm" id="prev" ${st.i === 0 ? "disabled style='opacity:.4'" : ""}>← Oldingi</button>
    <button class="btn btn-line btn-sm" id="quit">Chiqish</button>
    ${st.i < st.list.length - 1
        ? `<button class="btn btn-blue btn-sm" id="next">Keyingi →</button>`
        : `<button class="btn btn-red btn-sm" id="fin">Yakunlash</button>`}
  </div>
</div>`;
    root.querySelectorAll(".opt").forEach(b => b.onclick = () => {
      if (prac && st.ans[st.i] !== undefined) return;
      st.ans[st.i] = +b.dataset.k; draw();
    });
    root.querySelectorAll("#chips button").forEach(b => b.onclick = () => { st.i = +b.dataset.k; draw(); });
    const $id = i => document.getElementById(i);
    $id("prev").onclick = () => { if (st.i > 0) { st.i--; draw(); } };
    $id("quit").onclick = () => { if (confirm("Testni tark etasizmi?")) home(); };
    if ($id("next")) $id("next").onclick = () => { st.i++; draw(); };
    if ($id("fin")) $id("fin").onclick = () => {
      const left = st.list.length - st.ans.filter(x => x !== undefined).length;
      if (left && !confirm(`${left} ta savolga javob berilmagan. Yakunlaysizmi?`)) return;
      finish();
    };
  }

  function finish() {
    clearInterval(timerId);
    const n = st.list.length;
    const right = st.list.filter((q, k) => st.ans[k] === q.ci).length;
    const mistakes = n - right;
    const pass = st.mode === "exam" ? mistakes <= S.maxMistakes : mistakes <= Math.floor(n * 0.1);
    store.add({ d: new Date().toLocaleDateString("uz-UZ"), m: st.mode === "exam" ? "Imtihon" : "Mashq", s: right, n, p: pass });
    root.innerHTML = `
<div class="t-card result">
  <h2>${pass ? "Tabriklaymiz! 🎉" : "Yana mashq qiling 💪"}</h2>
  <div class="score ${pass ? "pass" : "fail"}">${right} / ${n}</div>
  <p>${pass ? "Siz sinovdan o'tdingiz." : "Hozircha o'tish balliga yetmadingiz."} Xatolar soni: <b>${mistakes}</b>${st.mode === "exam" ? ` (ruxsat etilgan: ${S.maxMistakes})` : ""}.</p>
  <div class="t-nav" style="justify-content:center;gap:14px">
    <button class="btn btn-blue" id="again">Qayta urinish</button>
    <a class="btn btn-red" href="aloqa.html">Kursga yozilish</a>
  </div>
  <div class="review"><h3>Javoblar tahlili</h3>${st.list.map((q, k) => {
      const a = st.ans[k], ok = a === q.ci;
      return `<div><b>${k + 1}. ${q.q}</b><br>
      <small>Sizning javobingiz: <span class="${ok ? "pass" : "fail"}">${a === undefined ? "javob berilmagan" : q.opts[a]}</span></small>
      ${ok ? "" : `<br><small>To'g'ri javob: <b class="pass">${q.opts[q.ci]}</b></small>`}
      ${q.e ? `<br><small>💡 ${q.e}</small>` : ""}</div>`;
    }).join("")}</div>
</div>`;
    document.getElementById("again").onclick = home;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  home();
})();
