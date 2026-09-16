/* App logic: nav, theme, progress, quizzes, glossary tooltips, search, widgets. */
(function () {
  const OMT = window.OMT;
  const root = document.documentElement;
  const body = document.body;
  const depth = body.dataset.depth === "1" ? "../" : "";
  const here = body.dataset.chapter || "";
  const P = (f) => depth + f;

  /* ---- theme ---- */
  const savedTheme = localStorage.getItem("omt-theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  function toggleTheme() {
    const cur = root.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("omt-theme", next);
  }

  /* ---- progress ---- */
  const KEY = "omt-progress";
  const getProgress = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } };
  const setProgress = (p) => localStorage.setItem(KEY, JSON.stringify(p));
  OMT.progress = { get: getProgress, set: setProgress };

  /* ---- sidebar ---- */
  function buildSidebar() {
    const side = document.getElementById("sidebar");
    if (!side) return;
    const prog = getProgress();
    let part = "";
    let html = `<a class="brand" href="${P("index.html")}"><span class="mark">O</span><span>Open Models<small>A field guide to open-source AI</small></span></a>
      <div class="search-box"><input type="search" id="search" placeholder="Search chapters…" aria-label="Search" autocomplete="off"><div class="search-results" id="search-results"></div></div>
      <div class="sidebar-tools"><button id="theme-toggle" title="Toggle dark mode">◐ Theme</button><button id="reset-progress" title="Clear reading progress">↺ Reset</button></div>
      <ul class="toc">`;
    OMT.chapters.forEach(c => {
      if (c.part !== part) { part = c.part; html += `<li class="part">${part}</li>`; }
      html += `<li><a href="${P(c.file)}" class="${c.id === here ? "active" : ""}"><span class="num">${c.num}</span><span>${c.title}</span>${prog[c.id] ? '<span class="done">✓</span>' : ""}</a></li>`;
    });
    html += `<li class="part">Reference</li>`;
    OMT.extraPages.forEach(x => {
      html += `<li><a href="${P(x.file)}" class="${location.pathname.endsWith(x.file) ? "active" : ""}"><span class="num">§</span><span>${x.title}</span></a></li>`;
    });
    html += `</ul><div class="progress-block" id="progress-block"></div>`;
    side.innerHTML = html;
    document.getElementById("theme-toggle").onclick = toggleTheme;
    document.getElementById("reset-progress").onclick = () => { if (confirm("Clear all reading progress and quiz scores?")) { localStorage.removeItem(KEY); location.reload(); } };
    renderProgress();
    setupSearch();
  }

  function renderProgress() {
    const el = document.getElementById("progress-block");
    if (!el) return;
    const prog = getProgress();
    const done = OMT.chapters.filter(c => prog[c.id]).length;
    const pct = Math.round(100 * done / OMT.chapters.length);
    el.innerHTML = `<div><b>${done}</b> of ${OMT.chapters.length} chapters complete · ${pct}%</div><div class="progress-bar"><i style="width:${pct}%"></i></div>`;
  }

  /* ---- mobile nav ---- */
  function setupMobile() {
    const btn = document.getElementById("menu-btn");
    const side = document.getElementById("sidebar");
    const scrim = document.getElementById("scrim");
    if (!btn || !side) return;
    const close = () => { side.classList.remove("open"); scrim && scrim.classList.remove("open"); };
    btn.onclick = () => { side.classList.toggle("open"); scrim && scrim.classList.toggle("open"); };
    scrim && (scrim.onclick = close);
  }

  /* ---- chapter chrome: meta, nav, completion ---- */
  function buildChapterChrome() {
    const idx = OMT.chapters.findIndex(c => c.id === here);
    if (idx < 0) return;
    const c = OMT.chapters[idx];
    const meta = document.getElementById("chapter-meta");
    if (meta) {
      const words = (document.querySelector(".content")?.innerText || "").split(/\s+/).length;
      meta.innerHTML = `<span>Chapter ${c.num} · ${c.part}</span><span>≈ ${Math.max(c.minutes, Math.round(words / 230))} min read</span>`;
    }
    const nav = document.getElementById("chapter-nav");
    if (nav) {
      const prev = OMT.chapters[idx - 1], next = OMT.chapters[idx + 1];
      nav.innerHTML = (prev ? `<a class="prev" href="${P(prev.file)}"><small>← Previous</small>${prev.num}. ${prev.title}</a>` : "<span></span>") +
        (next ? `<a class="next" href="${P(next.file)}"><small>Next →</small>${next.num}. ${next.title}</a>` : `<a class="next" href="${P("reading-list.html")}"><small>Continue →</small>Annotated reading list</a>`);
    }
    const row = document.getElementById("complete-row");
    if (row) {
      const render = () => {
        const done = !!getProgress()[c.id];
        row.classList.toggle("done", done);
        row.innerHTML = `<span>${done ? "✓ You've marked this chapter complete." : "Finished reading?"}</span><button class="btn ${done ? "" : "btn-primary"}" id="complete-btn">${done ? "Mark incomplete" : "Mark chapter complete"}</button>`;
        document.getElementById("complete-btn").onclick = () => {
          const p = getProgress(); if (done) delete p[c.id]; else p[c.id] = true; setProgress(p); render(); buildSidebar();
        };
      };
      render();
    }
  }

  /* ---- glossary tooltips ---- */
  function setupGlossary() {
    let tip;
    document.querySelectorAll("dfn[data-term]").forEach(el => {
      const key = el.dataset.term; const g = OMT.glossary[key]; if (!g) return;
      el.setAttribute("tabindex", "0"); el.setAttribute("aria-label", g[0] + ": " + g[1]);
      const show = () => {
        hide(); tip = document.createElement("div"); tip.className = "tip"; tip.innerHTML = `<b>${g[0]}</b>${g[1]}`;
        document.body.appendChild(tip);
        const r = el.getBoundingClientRect();
        let left = r.left + scrollX, top = r.bottom + scrollY + 6;
        if (left + 300 > innerWidth) left = innerWidth - 310;
        tip.style.left = left + "px"; tip.style.top = top + "px";
      };
      const hide = () => { if (tip) { tip.remove(); tip = null; } };
      el.addEventListener("mouseenter", show); el.addEventListener("mouseleave", hide);
      el.addEventListener("focus", show); el.addEventListener("blur", hide);
      el.addEventListener("click", (e) => { e.preventDefault(); tip ? hide() : show(); });
    });
  }

  /* ---- quizzes ---- */
  function setupQuizzes() {
    document.querySelectorAll("script[type='application/json'][data-quiz]").forEach(s => {
      let qs; try { qs = JSON.parse(s.textContent); } catch (e) { return; }
      const box = document.createElement("div"); box.className = "quiz";
      const qid = s.dataset.quiz;
      let html = `<h3>Check your understanding</h3>`;
      qs.forEach((q, i) => {
        html += `<div class="q" data-i="${i}" role="radiogroup" aria-labelledby="${qid}-question-${i}"><p class="stem" id="${qid}-question-${i}">${i + 1}. ${q.q}</p>`;
        q.a.forEach((opt, j) => { html += `<label><input type="radio" name="${qid}-${i}" value="${j}"> <span>${opt}</span></label>`; });
        html += `<div class="explain">${q.x}</div></div>`;
      });
      html += `<div class="score" id="${qid}-score" role="status"></div>`;
      box.innerHTML = html; s.replaceWith(box);
      let correct = 0, answered = 0;
      box.querySelectorAll(".q").forEach((qel, i) => {
        qel.querySelectorAll("input").forEach(inp => {
          inp.addEventListener("change", () => {
            if (qel.classList.contains("answered")) return;
            qel.classList.add("answered"); answered++;
            const j = +inp.value, ok = j === qs[i].c;
            if (ok) correct++;
            qel.querySelectorAll("label").forEach((l, k) => { if (k === qs[i].c) l.classList.add("correct"); else if (k === j) l.classList.add("wrong"); });
            qel.querySelectorAll("input").forEach(x => x.disabled = true);
            const sc = box.querySelector(".score");
            sc.textContent = `Score: ${correct} / ${answered}${answered === qs.length ? " · " + (correct === qs.length ? "Perfect." : correct >= qs.length * .7 ? "Solid." : "Worth a re-read.") : ""}`;
            if (answered === qs.length) { const p = getProgress(); p["quiz-" + qid] = correct + "/" + qs.length; setProgress(p); }
          });
        });
      });
    });
  }

  /* ---- search ---- */
  function setupSearch() {
    const input = document.getElementById("search"), out = document.getElementById("search-results");
    if (!input) return;
    const index = [...OMT.chapters.map(c => ({ t: `${c.num}. ${c.title}`, s: c.blurb, k: (c.title + " " + c.blurb + " " + c.keywords).toLowerCase(), f: c.file })),
      ...OMT.extraPages.map(x => ({ t: x.title, s: "", k: (x.title + " " + x.keywords).toLowerCase(), f: x.file })),
      ...Object.entries(OMT.glossary).map(([k, v]) => ({ t: "Glossary: " + v[0], s: v[1], k: (v[0] + " " + v[1]).toLowerCase(), f: "glossary.html#" + k }))];
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { out.classList.remove("open"); return; }
      const terms = q.split(/\s+/);
      const hits = index.filter(i => terms.every(t => i.k.includes(t))).slice(0, 12);
      out.innerHTML = hits.length ? hits.map(h => `<a href="${P(h.f)}">${h.t}<small>${h.s.slice(0, 110)}</small></a>`).join("") : `<a>No matches</a>`;
      out.classList.add("open");
    });
    document.addEventListener("click", e => { if (!e.target.closest(".search-box")) out.classList.remove("open"); });
  }

  /* ---- landing page cards ---- */
  function buildLanding() {
    const grid = document.getElementById("chapter-cards"); if (!grid) return;
    const prog = getProgress();
    grid.innerHTML = OMT.chapters.map(c => `<a class="card" href="${c.file}">${prog[c.id] ? '<span class="check">✓ done</span>' : ""}<span class="num">CHAPTER ${c.num} · ${c.part.toUpperCase()}</span><h3>${c.title}</h3><p>${c.blurb}</p><span class="meta"><span>≈ ${c.minutes} min</span>${prog["quiz-" + (c.quizId || c.id)] ? `<span>quiz ${prog["quiz-" + (c.quizId || c.id)]}</span>` : ""}</span></a>`).join("");
    const cont = document.getElementById("continue-btn");
    if (cont) { const next = OMT.chapters.find(c => !prog[c.id]) || OMT.chapters[0]; cont.href = next.file; cont.textContent = (Object.keys(prog).some(k => !k.startsWith("quiz-")) ? "Continue: " : "Start: ") + next.num + ". " + next.title; }
  }

  /* ---- timeline page ---- */
  function buildTimeline() {
    const host = document.getElementById("timeline"); if (!host) return;
    const cats = { model: "Models", research: "Research & essays", policy: "Policy", security: "Security", business: "Business" };
    const on = new Set(Object.keys(cats));
    const filters = document.getElementById("tl-filters");
    filters.innerHTML = Object.entries(cats).map(([k, v]) => `<button class="on" data-cat="${k}">${v}</button>`).join("");
    filters.querySelectorAll("button").forEach(b => b.onclick = () => { const k = b.dataset.cat; on.has(k) ? on.delete(k) : on.add(k); b.classList.toggle("on"); render(); });
    const fmt = d => { const [y, m] = d.split("-"); return new Date(+y, +m - 1, 1).toLocaleString("en-US", { month: "short", year: "numeric" }); };
    function render() {
      let year = "", html = "";
      OMT.timeline.forEach(e => {
        const y = e.d.slice(0, 4);
        if (y !== year) { year = y; html += `<div class="tl-year">${y}</div>`; }
        html += `<div class="tl-item cat-${e.cat} ${on.has(e.cat) ? "" : "hidden"}"><span class="date">${fmt(e.d)}</span><span class="cat">${cats[e.cat]}</span><b>${e.t}</b><p>${e.p}</p></div>`;
      });
      host.innerHTML = html;
    }
    render();
  }

  /* ---- glossary page ---- */
  function buildGlossaryPage() {
    const host = document.getElementById("glossary-list"); if (!host) return;
    host.innerHTML = Object.entries(OMT.glossary).sort((a, b) => a[1][0].localeCompare(b[1][0]))
      .map(([k, v]) => `<dt id="${k}">${v[0]}</dt><dd>${v[1]}</dd>`).join("");
  }

  /* ---- widgets ---- */
  function setupGradientWidget() {
    const w = document.getElementById("gradient-widget"); if (!w) return;
    const levels = [
      [
            "Fully closed",
            "Access remains inside the organisation.",
            [
                  "Ask who, if anyone, outside the organisation can inspect or query it."
            ]
      ],
      [
            "Gradual / staged access",
            "Access changes across selected participants, stages, or conditions.",
            [
                  "Record the current stage and the conditions for any later release."
            ]
      ],
      [
            "Hosted access",
            "People interact through a provider-controlled interface.",
            [
                  "An interface does not itself provide the underlying weights."
            ]
      ],
      [
            "Cloud / API access",
            "A program can call a provider-operated service.",
            [
                  "Record the service terms and controls separately from any other release."
            ]
      ],
      [
            "Downloadable access",
            "A release provides downloadable model artefacts such as weights.",
            [
                  "Check licences, runtime requirements, and missing training materials separately."
            ]
      ],
      [
            "Fully open",
            "The access framework extends to broadly available system materials.",
            [
                  "List the actual artefacts and their terms; the label alone does not demonstrate reproducibility."
            ]
      ]
];
    const r = w.querySelector("input"), panel = w.querySelector(".panel"), spans = w.querySelectorAll(".levels span");
    const render = () => { const i = +r.value; spans.forEach((s, j) => s.classList.toggle("on", i === j)); const l = levels[i]; r.setAttribute("aria-valuetext", `${i + 1}. ${l[0]}`); panel.innerHTML = `<b>${i + 1}. ${l[0]}</b>${l[1]}<ul>${l[2].map(x => `<li>${x}</li>`).join("")}</ul>`; };
    r.addEventListener("input", render); render();
  }

  function setupGapWidget() {
    const w = document.getElementById("gap-widget"); if (!w) return;
    const data = OMT.charts.find(c => c.id === "task-scores");
    w.querySelector(".chart-controls").innerHTML = '<label for="manual-weight">Manual-task weight: <output id="weight-value">50%</output></label><input id="manual-weight" type="range" min="0" max="100" step="10" value="50">';
    const input = w.querySelector("input");
    function render() {
      const weight = Number(input.value) / 100;
      w.querySelector("output").textContent = input.value + "%";
      input.setAttribute("aria-valuetext", input.value + "% manuals, " + (100-Number(input.value)) + "% arithmetic");
      const scores = data.rows.map(r => ({label:r.label, value:100 * (weight*r.manuals+(1-weight)*r.arithmetic)/r.total}));
      w.querySelector(".bars").innerHTML = scores.map(r => `<div class="bar open"><span>${r.label}</span><div class="track"><div class="fill" style="width:${r.value}%"></div></div><span class="val">${r.value.toFixed(1)}%</span></div>`).join("");
      w.querySelector(".note").textContent = `Fictional weighted means (${input.value}% manuals): ` + scores.map(r => `${r.label} ${r.value.toFixed(1)}%`).join("; ") + ". The underlying observations are unchanged; the static table gives the two worked examples.";
    }
    input.addEventListener("input", render); render();
  }
  function setupCatchupWidget() {
    const w = document.getElementById("catchup-widget"); if (!w) return;
    const data = OMT.charts.find(c => c.id === "threshold-delay");
    const max = Math.max(...data.rows.map(r => r.meadow-r.harbor));
    w.querySelector(".bars").innerHTML = data.rows.map(r => `<div class="bar open"><span>${r.label}</span><div class="track"><div class="fill" style="width:${100*(r.meadow-r.harbor)/max}%"></div></div><span class="val">${r.meadow-r.harbor} mo</span></div>`).join("");
  }

  /* ---- init ---- */
  document.addEventListener("DOMContentLoaded", () => {
    buildSidebar(); setupMobile(); buildChapterChrome(); setupGlossary(); setupQuizzes();
    buildLanding(); buildTimeline(); buildGlossaryPage(); setupGradientWidget(); setupGapWidget(); setupCatchupWidget();
    const tt = document.getElementById("theme-toggle-top"); if (tt) tt.onclick = toggleTheme;
  });
})();
