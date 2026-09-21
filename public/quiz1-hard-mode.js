(() => {
  const P = window.PREQUIZ;
  if (!P) return;
  const I = window.LECTURE_IMAGES || {};
  const figure = (key, alt) => I[key]
    ? `<figure class="lectureExactFigure"><img src="${I[key]}" alt="${alt}" loading="lazy" decoding="async"><figcaption>LECTURE-SOURCE FIGURE · geometry intentionally not pre-resolved</figcaption></figure>`
    : '';

  const lectureQuestions = [
    {
      id:'lx01', section:'LECTURE CHALLENGE · EXACT SOURCE FIGURES', type:'numeric',
      meta:'LECTURE 03 · EXACT GUY-WIRE GEOMETRY',
      prompt:'In the lecture tower guy-wire problem, the wire AB carries 2500 N. Using only the geometry shown, determine the direction angle θx of the force acting at A.',
      answer:115.1, tol:.12, unit:'°',
      diagram:figure('guyWire','Tower guy-wire geometry with 80 m, 40 m, and 30 m dimensions'),
      instructions:'Do not read a component from memory. Build AB, normalize it, obtain the x direction cosine, then compute the angle.',
      solution:'From A to B, AB = (−40 i + 80 j + 30 k) m and |AB| = 94.3 m. Therefore F = 2500 AB/|AB| = (−1060 i + 2120 j + 795 k) N. Since cos θx = Fx/F = −1060/2500, θx = 115.1°.'
    },
    {
      id:'lx02', section:'LECTURE CHALLENGE · EXACT SOURCE FIGURES', type:'mcq',
      meta:'LECTURE 04 · EXACT PLATE + WIRE',
      prompt:'The lecture asks for the moment about A of the 200-N force exerted by wire CD at C. Which complete moment vector is correct?',
      options:[
        '(−7.68 i + 28.8 j + 28.8 k) N·m',
        '(+7.68 i + 28.8 j − 28.8 k) N·m',
        '(−7.68 i − 28.8 j + 28.8 k) N·m',
        '(−120 i + 96 j − 128 k) N·m'
      ],
      correct:'a',
      diagram:figure('plateWire','Rectangular plate supported at A and B with wire CD and dimensions'),
      instructions:'Do not choose by inspection. Build C→D, normalize it to get the 200-N force, form r_CA, and evaluate the full cross product.',
      solution:'Using the shown geometry, r_CA=(0.300 i + 0.080 k) m. CD=(−0.300 i +0.240 j−0.320 k) m, |CD|=0.500 m, so F=(−120 i+96 j−128 k) N. Therefore M_A=r_CA×F=(−7.68 i+28.8 j+28.8 k) N·m.'
    },
    {
      id:'lx03', section:'LECTURE CHALLENGE · EXACT SOURCE FIGURES', type:'mcq',
      meta:'LECTURE 04 · EXACT CUBE / MOMENT ABOUT AXIS',
      prompt:'For the lecture cube problem shown, a force of magnitude P acts along face diagonal FC. Which expression is the scalar moment of P about diagonal AG?',
      options:['−aP/√6','+aP/√6','aP/√2','0'],
      correct:'a',
      diagram:figure('cubeAxis','Cube of side a with force P along face diagonal FC and diagonal AG'),
      instructions:'Compute the moment about A first, then project that moment onto the AG unit vector.',
      solution:'The lecture construction gives M_A=(aP/√2)(i+j+k). The unit vector along AG is (1/√3)(i−j−k). Their dot product is M_AG=(aP/√6)(1−1−1)=−aP/√6.'
    },
    {
      id:'lx04', section:'LECTURE CHALLENGE · EXACT SOURCE FIGURES', type:'mcq',
      meta:'LECTURE 04 · EXACT COUPLE SYSTEM',
      prompt:'For the two couples shown in the lecture figure, what is the complete equivalent single-couple vector M?',
      options:[
        '(−540 i + 240 j + 180 k) lb·in',
        '(540 i + 240 j − 180 k) lb·in',
        '(−540 i − 240 j + 180 k) lb·in',
        '(−300 i + 200 j + 180 k) lb·in'
      ],
      correct:'a',
      diagram:figure('coupleSystem','Lecture couple system with 30-lb and 20-lb force pairs and dimensions'),
      instructions:'Treat each force pair as a couple vector. Determine all three signed components before selecting an answer.',
      solution:'The 30-lb pair gives Mx=−(30)(18)=−540 lb·in. The 20-lb pairs give My=+(20)(12)=+240 lb·in and Mz=+(20)(9)=+180 lb·in. Adding the couple vectors gives M=(−540 i+240 j+180 k) lb·in.'
    },

  ];

  // The Quiz I SOLVE tab gets a distinct lecture-source section first.
  const oldPractice = (P.practiceS05 || []).filter(q => !String(q.id || '').startsWith('lx')).map(q=>({...q,section:q.section||'QUIZ I REVIEW · FRESH GEOMETRY'}));
  P.practiceS05 = [...lectureQuestions, ...oldPractice];

  // VERIFY is intentionally rebuilt: no recognition-only definitions, trivial components,
  // or one-step formula substitution. Keep only multi-step setup/synthesis problems.
  const hardIds = new Set([
    'q1m09','q1m14',
    'q1h01','q1h02','q1h04','q1h05',
    'q1x02','q1x04','q1x05'
  ]);
  const existingHard = (P.masteryS05 || [])
    .filter(q => hardIds.has(q.id))
    .map(q => ({...q, section:'HARD SYNTHESIS · UNFAMILIAR GEOMETRY'}));

  const lectureMastery = lectureQuestions.map((q, i) => ({
    ...q,
    id:`mlx${String(i+1).padStart(2,'0')}`,
    section:'LECTURE EXACT · SOURCE-MATCHED',
    meta:q.meta.replace('LECTURE', 'MASTERY · LECTURE')
  }));

  P.masteryS05 = [...lectureMastery, ...existingHard];
  window.QUIZ1_HARD_ONLY = true;
  window.QUIZ1_HARD_TEACHING_IDS = ['q1x02','q1x04','q1x05'];

  const cards = lectureQuestions.map(q => `
    <article class="lectureChallengeCard">
      ${q.diagram}
      <div class="lectureChallengeCopy">
        <span>${q.meta}</span>
        <b>${q.prompt}</b>
        <small>Loaded as a scored question in SOLVE and VERIFY.</small>
      </div>
    </article>`).join('');

  P.lessonS05 += `
    <section class="lessonSection workedSection lectureChallengeSection">
      <div class="sectionNo">LQ</div>
      <div class="sectionContent">
        <h3>Lecture Challenge Bank</h3>
        <p>This section uses the same source geometry as the lecture examples. The dimensions are left in the figures on purpose: you have to extract the geometry, choose the model, build the vectors/FBD, and then solve. These are not recognition questions.</p>
        <div class="lectureChallengeGrid">${cards}</div>
        <div class="lessonNote"><b>Quiz I change:</b> the four source-matched figure problems appear first in SOLVE and are also included in VERIFY. VERIFY has been stripped down to the harder multi-step set only.</div>
      </div>
    </section>`;
})();