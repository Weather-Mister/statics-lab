(() => {
  const tab = document.getElementById('bookDrillTab');
  const view = document.getElementById('bookView');
  const host = document.getElementById('bookDrillHost');
  if (!tab || !view || !host) return;

  const problems = [
    {id:'2.5', method:'Planar resultant · law of sines/cosines', level:'FOUNDATION', cell:0, answer:'(a) P = 101.4 N. (b) R = 196.6 N.'},
    {id:'2.35', method:'Planar resultant · rectangular components', level:'STANDARD', cell:1, answer:'R = 309 N; direction = 86.6°.'},
    {id:'2.49', method:'Particle equilibrium · two unknown tensions', level:'STANDARD', cell:2, answer:'T_CA = 134.6 N; T_CB = 110.4 N.'},
    {id:'2.55', method:'Particle equilibrium · cable system', level:'STANDARD', cell:3, answer:'(a) T_ACB = 269 lb. (b) T_CD = 37.0 lb.'},
    {id:'2.84', method:'3D force · Cartesian components and direction angle', level:'STANDARD', cell:4, answer:'(a) F_x = 507 N, F_y = 919 N, F_z = 582 N. (b) θ_z = 61.0°.'},
    {id:'2.94', method:'3D resultant · magnitude and coordinate direction angles', level:'HARD', cell:5, answer:'R = 913 lb; θ_x = 50.6°; θ_y = 117.6°; θ_z = 51.8°.'},
    {id:'2.96', method:'3D particle equilibrium · cable tensions', level:'HARD', cell:6, answer:'T_AB = 490 N; T_AD = 515 N.'},
    {id:'2.103', method:'3D particle equilibrium · symmetric cables', level:'HARD', cell:7, answer:'T_DA = 14.42 lb; T_DB = T_DC = 13.00 lb.'},
    {id:'3.23', method:'Moment about a point · vector cross product', level:'STANDARD', cell:8, answer:'M_O = (7.50 i − 6.00 j − 10.39 k) N·m.'},
    {id:'3.49', method:'Moment geometry · perpendicular distance', level:'HARD', cell:9, answer:'φ = 24.6°; d = 34.6 in.'},
    {id:'3.53', method:'Moment about an axis · scalar projection', level:'HARD', cell:10, answer:'T_DE = 283 lb.'},
    {id:'3.57', method:'Moment about an axis · triple-product route', level:'HARD', cell:11, answer:'M_axis = 290.0 N·m.'},
    {id:'3.70', method:'Couple · magnitude and equivalent force separation', level:'STANDARD', cell:12, answer:'(a) M = 7.33 N·m. (b) d = 91.6 mm.'},
    {id:'3.82', method:'Force-couple system · move force to another point', level:'HARD', cell:13, answer:'(a) F_A = 560 lb at 20.0°; M_A = 7720 lb·ft. (b) F_B = 560 lb at 20.0°; M_B = 4290 lb·ft.'},
    {id:'3.89', method:'Equivalent force-couple / single-resultant location', level:'HARD', cell:14, answer:'(a) F = 48.0 lb at 65.0°; M = 490 lb·in. (b) F = 48.0 lb at 65.0°, applied 17.78 in. to the left of B.'},
    {id:'4.1', method:'Rigid-body equilibrium · applied couple', level:'FOUNDATION', cell:15, answer:'42.0 N on each handle.'},
    {id:'4.13', method:'Rigid-body equilibrium · allowable position range', level:'STANDARD', cell:16, answer:'150.0 mm ≤ d ≤ 400 mm.'},
    {id:'4.31', method:'Rigid-body equilibrium · reactions and cable force', level:'HARD', cell:17, answer:'T = 2P/3; C = 0.577P downward.'}
  ];

  const groups = [
    {title:'UNIT 1 · Planar force addition / resultant', note:'Two direct textbook problems: triangle-law geometry and component addition.', ids:['2.5','2.35']},
    {title:'UNIT 1 · Particle equilibrium in 2D', note:'Two cable/particle equilibrium setups. Draw the particle FBD first.', ids:['2.49','2.55']},
    {title:'UNIT 2 · 3D force vectors and direction angles', note:'Two problems on Cartesian components, resultants, and coordinate direction angles.', ids:['2.84','2.94']},
    {title:'UNIT 2 · Particle equilibrium in 3D', note:'Two full three-dimensional cable-equilibrium problems.', ids:['2.96','2.103']},
    {title:'UNIT 2 · Moment of a force about a point', note:'Two problems using r × F or equivalent moment geometry.', ids:['3.23','3.49']},
    {title:'UNIT 3 · Moment about an axis', note:'Two direct arbitrary-axis moment problems: compute a moment, then project it onto the axis.', ids:['3.53','3.57']},
    {title:'UNIT 3 · Couples and equivalent force-couple systems', note:'Three problems: couple magnitude, moving forces, and replacing a force-couple system by an equivalent result.', ids:['3.70','3.82','3.89']},
    {title:'UNIT 3 · Rigid-body equilibrium in 2D', note:'Three textbook equilibrium problems spanning a basic couple, geometry limits, and reactions/cable force.', ids:['4.1','4.13','4.31']}
  ];

  const coords = Array.from({length:18}, (_, i) => ({
    col: i % 3,
    row: Math.floor(i / 3)
  }));

  const style = document.createElement('style');
  style.textContent = `
    #bookDrillHost{display:grid;gap:22px}
    .bookDrillIntro{border:1px solid #bfb6a7;background:#f8f3e9;padding:18px 20px;display:grid;gap:10px}
    .bookDrillIntroTop{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap}
    .bookDrillIntro h2{margin:0;color:#2d3934;font-size:24px;line-height:1.1}
    .bookDrillIntro p{margin:0;color:#626861;line-height:1.6;max-width:850px}
    .bookStats{display:flex;gap:7px;flex-wrap:wrap}
    .bookStats span{border:1px solid #b8afa1;background:#eee7da;padding:5px 8px;font:900 8px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.08em;color:#53605a}
    .bookAnswerControls{display:flex;gap:8px;flex-wrap:wrap}
    .bookAnswerControls button{border:1px solid #9f978a;background:#faf6ed;color:#42514a;padding:8px 10px;font:900 8px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.08em;cursor:pointer}
    .bookSourceNote{border-left:3px solid #2f7774;padding:8px 10px;background:#edf3ef;color:#58645e;font-size:10px;line-height:1.55}
    .bookMethod{display:grid;gap:10px}
    .bookMethodHead{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:end;border-bottom:1px solid #bcb3a5;padding-bottom:8px}
    .bookMethodHead h3{margin:0;color:#303b36;font-size:15px;letter-spacing:.01em}
    .bookMethodHead p{grid-column:1;margin:3px 0 0;color:#74766f;font-size:10px;line-height:1.45}
    .bookMethodCount{grid-column:2;grid-row:1 / span 2;align-self:center;border:1px solid #b7aea0;background:#eee7da;color:#64706a;padding:6px 8px;font:900 8px/1 ui-monospace,SFMono-Regular,Menlo,monospace}
    .bookProblemGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
    .bookProblem{min-width:0;border:1px solid #c4bbad;background:#fbf7ee;padding:11px;display:grid;gap:9px}
    .bookProblemHead{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
    .bookProblemId{font:900 9px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.09em;color:#2f7774}
    .bookDifficulty{font:900 7px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.08em;border:1px solid #b8afa1;background:#eee7da;color:#6b6f69;padding:4px 6px}
    .bookProblemMethod{font-size:10px;line-height:1.4;font-weight:800;color:#45514b}
    .bookScan{width:100%;aspect-ratio:5/3;position:relative;overflow:hidden;background:#fff;border:1px solid #cec5b7}
    .bookScan img{position:absolute;display:block;max-width:none;width:300%;height:600%;left:calc(var(--book-col) * -100%);top:calc(var(--book-row) * -100%);object-fit:fill;user-select:none;-webkit-user-drag:none;pointer-events:none}
    .bookAnswer{border-top:1px solid #d2c9bb;padding-top:7px}
    .bookAnswer summary{cursor:pointer;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:8px;font:900 8px/1.25 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.08em;color:#2f7774;padding:4px 0}
    .bookAnswer summary::-webkit-details-marker{display:none}
    .bookAnswer summary::after{content:'REVEAL';font-size:7px;color:#74766f;border:1px solid #b7aea0;background:#faf6ed;padding:4px 6px}
    .bookAnswer[open] summary::after{content:'HIDE'}
    .bookAnswerBody{margin-top:7px;border-left:3px solid #9f7450;background:#f1e8da;padding:9px 10px;color:#3f4944;font-size:11px;line-height:1.55}
    .bookAnswerSource{display:block;margin-top:6px;color:#7a7a73;font:700 7px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.04em}
    @media(max-width:780px){.bookProblemGrid{grid-template-columns:1fr}.bookMethodHead{grid-template-columns:1fr}.bookMethodCount{grid-column:1;grid-row:auto;justify-self:start}.bookDrillIntro h2{font-size:20px}}
  `;
  document.head.appendChild(style);

  function problemCard(p) {
    const pos = coords[p.cell];
    return `
      <article class="bookProblem">
        <div class="bookProblemHead">
          <span class="bookProblemId">TEXTBOOK PROBLEM ${p.id}</span>
          <span class="bookDifficulty">${p.level}</span>
        </div>
        <div class="bookProblemMethod">${p.method}</div>
        <div class="bookScan" aria-label="Exact textbook scan for Problem ${p.id}" style="--book-col:${pos.col};--book-row:${pos.row}">
          <img src="./book-drill-sprite.webp?v=44" alt="Textbook Problem ${p.id}" loading="lazy" decoding="async" />
        </div>
        <details class="bookAnswer">
          <summary>Checked textbook answer</summary>
          <div class="bookAnswerBody">
            ${p.answer}
            <span class="bookAnswerSource">Checked against the book's Answers to Problems appendix.</span>
          </div>
        </details>
      </article>`;
  }

  function renderBook() {
    if (host.dataset.ready === '1') return;
    host.innerHTML = `
      <section class="bookDrillIntro">
        <div class="bookDrillIntroTop">
          <div>
            <div class="sheetKicker">QUIZ I · EXACT TEXTBOOK DRILL</div>
            <h2>Book problems, grouped by solving method</h2>
          </div>
          <div class="bookStats"><span>18 EXACT PROBLEMS</span><span>8 METHODS</span><span>COURSE UNITS 1–3</span><span>TEXTBOOK CH. 2–4</span></div>
        </div>
        <p>These are direct scans from your provided <em>Vector Mechanics for Engineers: Statics</em> textbook—not rewritten variants. The selection follows pre-Quiz-I course Units 1–3 and their solving methods. Most methods have 2–3 problems; only the basic entry-level methods stay lighter.</p>
        <div class="bookSourceNote"><b>Answer check:</b> every displayed answer below was cross-checked against the textbook's own <em>Answers to Problems</em> appendix. Use the scan as the authoritative problem statement and figure.</div>
        <div class="bookAnswerControls"><button type="button" data-book-open>SHOW ALL ANSWERS</button><button type="button" data-book-close>HIDE ALL ANSWERS</button></div>
      </section>
      ${groups.map(g => `
        <section class="bookMethod">
          <div class="bookMethodHead">
            <div><h3>${g.title}</h3><p>${g.note}</p></div>
            <span class="bookMethodCount">${g.ids.length} PROBLEM${g.ids.length===1?'':'S'}</span>
          </div>
          <div class="bookProblemGrid">${g.ids.map(id => problemCard(problems.find(p => p.id === id))).join('')}</div>
        </section>`).join('')}
    `;
    host.querySelector('[data-book-open]')?.addEventListener('click', () => host.querySelectorAll('.bookAnswer').forEach(d => d.open = true));
    host.querySelector('[data-book-close]')?.addEventListener('click', () => host.querySelectorAll('.bookAnswer').forEach(d => d.open = false));
    host.dataset.ready = '1';
  }

  function syncBookAvailability() {
    const quizSelected = document.getElementById('lessonSelect')?.value === 's05';
    tab.hidden = !quizSelected;
    if (!quizSelected && view.classList.contains('active')) {
      document.querySelector('.studyTab[data-tab="lesson"]')?.click();
    }
  }

  tab.addEventListener('click', () => {
    renderBook();
    document.querySelectorAll('.studyTab').forEach(b => b.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    view.classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
  });

  document.querySelectorAll('.studyTab:not(#bookDrillTab)').forEach(btn => {
    btn.addEventListener('click', () => tab.classList.remove('active'));
  });

  document.getElementById('lessonSelect')?.addEventListener('change', () => setTimeout(syncBookAvailability, 0));
  const banner = document.getElementById('bannerTitle');
  if (banner) new MutationObserver(syncBookAvailability).observe(banner, {childList:true, subtree:true, characterData:true});

  renderBook();
  syncBookAvailability();
})();