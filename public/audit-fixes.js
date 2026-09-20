(() => {
  const P=window.PREQUIZ;
  if(!P) return;

  const svg=(body,label)=>`<svg class="auditDiagram" viewBox="0 0 420 175" role="img" aria-label="${label}" preserveAspectRatio="xMidYMid meet" style="display:block;width:100%;height:auto"><style>
    .qd-line{stroke:#43534e;stroke-width:3;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .qd-force{stroke:#a65353;stroke-width:3;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .qd-cable{stroke:#2f7774;stroke-width:3;fill:none;stroke-linecap:round;stroke-linejoin:round}
    text{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;fill:#1f2b27}
    .forceLabel{font-weight:800;fill:#7d3f3f}
  </style>${body}</svg>`;
  const arrow=(x1,y1,x2,y2,t)=>{
    const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L;
    const bx=x2-ux*11,by=y2-uy*11,px=-uy*5,py=ux*5;
    const points=`${x2},${y2} ${bx+px},${by+py} ${bx-px},${by-py}`;
    const lx=x2+(Math.abs(uy)>.8?8:(ux>=0?8:-28));
    const ly=y2+(uy>0?16:-7);
    return `<line class="qd-force" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><polygon points="${points}" fill="#a65353"/><text class="forceLabel" x="${lx}" y="${ly}">${t}</text>`;
  };
  const fbdVisuals=String.raw`
  <section class="lessonSection workedSection auditUpgrade">
    <div class="sectionNo">FBD</div><div class="sectionContent">
      <h3>Physical picture → free-body diagram</h3>
      <p>Do not start equilibrium equations from the physical picture. First choose the body, mentally cut it away from every support/contact, and replace each removed interaction by the force or couple that interaction can exert. Geometry stays only when it is needed to locate a force or moment arm.</p>
      <div class="workedSynthesis">
        <article><b>1 · Pin + roller beam</b>${svg(`<line class="qd-line" x1="55" y1="85" x2="365" y2="85"/><polygon points="55,112 75,112 65,88" fill="none" stroke="#43534e" stroke-width="2"/><circle cx="350" cy="110" r="6" fill="none" stroke="#43534e"/><circle cx="370" cy="110" r="6" fill="none" stroke="#43534e"/>${arrow(210,25,210,75,'P')}<text x="45" y="135">pin A</text><text x="335" y="135">roller B</text>`,'Physical pin and roller beam')}<p><strong>FBD:</strong> replace the pin by \(A_x,A_y\), the roller by one normal reaction \(B_y\), and retain P. Do not draw the support hardware on the FBD.</p></article>
        <article><b>2 · Roller on an incline</b>${svg(`<line class="qd-line" x1="60" y1="135" x2="360" y2="55"/><circle cx="205" cy="83" r="24" fill="none" stroke="#43534e" stroke-width="3"/>${arrow(205,83,180,20,'N')}<text x="65" y="155">smooth surface</text>`,'Roller on inclined smooth surface')}<p>The reaction is <strong>normal to the surface</strong>, not automatically vertical. A smooth contact cannot supply a tangential force.</p></article>
        <article><b>3 · Cable attached to a beam</b>${svg(`<line class="qd-line" x1="55" y1="120" x2="315" y2="120"/><line class="qd-cable" x1="315" y1="120" x2="385" y2="40"/>${arrow(315,120,365,63,'T')}<text x="50" y="145">beam</text>`,'Cable force on beam')}<p>A cable can only pull. On the isolated beam, tension points <strong>away from the attachment point along the cable</strong>.</p></article>
        <article><b>4 · Fixed support</b>${svg(`<line class="qd-line" x1="85" y1="40" x2="85" y2="145"/><line class="qd-line" x1="85" y1="90" x2="340" y2="90"/>${arrow(85,90,145,90,'Aₓ')}${arrow(85,90,85,35,'Aᵧ')}<path d="M115 125 A25 25 0 1 0 145 105" class="qd-force"/><text x="150" y="130">Mₐ</text>`,'Fixed support FBD reactions')}<p>A fixed support prevents x-translation, y-translation, and rotation: two reaction-force components plus a reaction couple.</p></article>
        <article><b>5 · Short link</b>${svg(`<line class="qd-cable" x1="100" y1="125" x2="315" y2="45"/><circle cx="100" cy="125" r="6"/><circle cx="315" cy="45" r="6"/>${arrow(210,85,290,55,'F')}<text x="115" y="145">two-force member</text>`,'Short link force direction')}<p>If a link is loaded only at its two pins, its end forces must be collinear with the link. The unknown is normally its magnitude/sense, not an arbitrary x-y direction.</p></article>
        <article><b>6 · Applied couple</b>${svg(`<rect x="95" y="60" width="225" height="65" fill="none" stroke="#43534e" stroke-width="3"/><path d="M185 48 A38 38 0 1 1 230 42" class="qd-force"/><text x="235" y="42">M</text>`,'Rigid body with applied couple')}<p>An applied couple is already a free moment. Put it directly on the FBD; do not invent a point force or multiply it by another distance.</p></article>
      </div>
      <div class="lessonNote"><b>FBD checkpoint:</b> before writing equations, ask: (1) what body did I isolate? (2) which interactions cross its boundary? (3) what motion does each support prevent? (4) did I include every applied force/couple? (5) did I accidentally include an internal force?</div>
    </div>
  </section>`;
  P.lessonS04 += fbdVisuals;

  const expanded=String.raw`
  <section class="lessonSection workedSection auditUpgrade"><div class="sectionNo">EX+</div><div class="sectionContent">
    <h3>Finish the compressed examples: setup → operation → check</h3>
    <div class="workedSynthesis">
      <article><b>Moment about an arbitrary axis</b><p>Never jump directly to the axis moment.</p><ol><li>Choose the positive axis direction and normalize it: \(\boldsymbol\lambda=\mathbf d/|\mathbf d|\).</li><li>Choose any point O on that axis and form \(\mathbf r\) from O to any point on the force line.</li><li>Compute the full point moment \(\mathbf M_O=\mathbf r\times\mathbf F\).</li><li>Project: \(M_{axis}=\boldsymbol\lambda\cdot\mathbf M_O\).</li><li>The sign says whether the moment acts with or against the chosen positive axis.</li></ol></article>
      <article><b>Couple from two forces</b><p>For \(+\mathbf F\) and \(-\mathbf F\), choose \(\mathbf r\) from the line of action of the negative force to the positive force.</p><ol><li>Net force: \(\mathbf F-\mathbf F=0\).</li><li>Moment: \(\mathbf M=\mathbf r\times\mathbf F\).</li><li>Because the net force is zero, changing the origin cannot change this moment: a couple is a free vector.</li><li>For planar geometry, \(|M|=Fd_\perp\).</li></ol></article>
      <article><b>General force-system reduction</b><ol><li>Add every force: \(\mathbf R=\sum\mathbf F\).</li><li>About the chosen O, add every force moment and every applied couple: \(\mathbf M_O^R=\sum(\mathbf r\times\mathbf F)+\sum\mathbf M_c\).</li><li>The pair \((\mathbf R,\mathbf M_O^R)\) is the equivalent system at O.</li><li>A single-force replacement is possible only when a line of action can reproduce the required moment; in 3D this requires \(\mathbf R\cdot\mathbf M_O^R=0\). A component of moment parallel to R cannot be created merely by shifting R.</li></ol></article>
      <article><b>Pulley / motor equilibrium chain</b><ol><li>Isolate the pulley/shaft assembly.</li><li>Show both belt tensions, the pin reactions, and the applied motor couple.</li><li>Take moments about the shaft center first: pin reactions vanish from that equation, allowing the unknown belt tension to be found.</li><li>Then use \(\sum F_x=0\) and \(\sum F_y=0\) for pin-force components.</li><li>Finally compute the pin-force magnitude from its components and check that its direction opposes the net belt pull.</li></ol></article>
    </div>
  </div></section>`;
  P.lessonS04 += expanded;

  // Harder VERIFY: method is intentionally not announced in the prompt/meta.
  const hard=[
    {id:'q1h01',type:'numeric',meta:'MOCK · UNFAMILIAR',prompt:'A 260-N force acts from A=(2,−1,3) toward B=(−1,5,7). Point O is the origin. Find the z-component of its moment about O.',answer:157.119,tol:.4,unit:'N·m',explain:'d=(−3,6,4), |d|=√61, so F=260d/√61. Then Mz=xFy−yFx=2(199.74)−(−1)(−99.87)=299.61 N·m.'},
    {id:'q1h02',type:'numeric',meta:'MOCK · UNFAMILIAR',prompt:'A 6-m beam has a pin at A and a roller at B on a smooth 30° incline. A 18-kN downward load acts 4 m from A. Find the magnitude of the roller reaction.',answer:13.8564,tol:.05,unit:'kN',fbdRequired:true,fbdCheck:['Roller reaction is normal to the 30° incline, not vertical.','Pin A has Ax and Ay.','18-kN load is at x=4 m.'],explain:'The roller reaction is 60° above horizontal, so its vertical component is R sin60°. Moments about A: 6R sin60°−18(4)=0, hence R=13.86 kN.'},
    {id:'q1h03',type:'numeric',meta:'MOCK · UNFAMILIAR',prompt:'At O a force system reduces to R=(60,80,0) N and M_O=(12,−9,30) N·m. Compute R·M_O.',answer:0,tol:.01,unit:'N²·m',explain:'R·M=60(12)+80(−9)+0(30)=0. This zero dot product is the compatibility condition for replacing this force-couple pair by a single shifted force.'},
    {id:'q1h04',type:'numeric',meta:'MOCK · UNFAMILIAR',prompt:'A 5-m cantilever fixed at A carries F=(6,−8) kN at its free end and a 7 kN·m counterclockwise applied couple. Find the reaction moment at A, CCW positive.',answer:33,tol:.05,unit:'kN·m',fbdRequired:true,fbdCheck:['Fixed A has Ax, Ay and MA.','Only the vertical component of the end force creates moment about A.','Applied couple is included directly.'],explain:'The horizontal 6-kN component passes through A and gives zero moment. External moment is 5(−8)+7=−33 kN·m, so MA=+33 kN·m.'},
    {id:'q1h05',type:'numeric',meta:'MOCK · UNFAMILIAR',prompt:'Axis PQ runs from P=(1,0,1) to Q=(3,2,2). A force F=(20,−30,40) N acts at A=(2,3,0). Find the scalar moment about axis PQ.',answer:69.282,tol:.2,unit:'N·m',explain:'λPQ=(2,2,1)/3. Use r_PA=A−P=(1,3,−1). r×F=(90,−60,−90). Dot with λ gives (180−120−90)/3=−10 N·m.'},
    {id:'q1h06',type:'mcq',meta:'MOCK · MODEL FIRST',prompt:'A rigid body is held by a frictionless pin and a cable. Before doing any algebra, which set of unknown reactions is physically admissible in 2D?',options:['Two pin-force components plus one cable tension along the cable','Pin moment plus one arbitrary cable force','One pin force only plus two cable components','Two pin forces plus a cable couple'],correct:'a',explain:'A frictionless pin supplies two force components and no moment; a cable supplies one tension along its own line.'},
    {id:'q1h07',type:'numeric',meta:'MOCK · UNFAMILIAR',prompt:'Vertical forces +50 N at x=0, −180 N at x=1 m, +40 N at x=4 m and −30 N at x=6 m act with a 70 N·m CCW couple. Find the x-location of the equivalent single resultant.',answer:1,tol:.01,unit:'m',explain:'R=−120 N. M0=−180+160−180+70=−130 N·m, so x=M/R=1.0833 m.'},
    {id:'q1h08',type:'mcq',meta:'MOCK · MODEL FIRST',prompt:'A force is moved to a new point not on its original line of action. Which quantity must be preserved in addition to the force itself?',options:['Its moment about the new reference point','Its original coordinate values only','Its perpendicular component only','Nothing; rigid-body forces can move anywhere'],correct:'a',explain:'Off-line transfer requires an added couple so the new system preserves the original moment as well as the resultant force.'}
  ];
  // Correct intentionally hand-checked numerical keys.
  hard[0].answer=299.608;
  hard[4].answer=-10;
  hard[6].answer=1.08333;
  P.masteryS05=[...(P.masteryS05||[]),...hard];
})();