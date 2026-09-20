(()=>{
  'use strict';

  const lessonS01Deep=String.raw`
    <section class="lessonSection auditUpgrade workedSection">
      <div class="sectionNo">DEEP</div>
      <div class="sectionContent">
        <h3>Do not memorize the words — understand the model</h3>
        <p>Statics starts by replacing the real object with a model simple enough to analyze. The model choice controls which equations are valid. A <strong>particle</strong> ignores size and rotation; a <strong>rigid body</strong> keeps size and force locations because rotation can matter. This is why the same physical object may be modeled differently in different problems.</p>
        <div class="conceptGrid twoCol">
          <div class="conceptBox"><span>STATICS DOES NOT MEAN “NOT MOVING”</span><strong>It means zero acceleration.</strong><p>A body moving at constant velocity still satisfies the statics force condition because its acceleration is zero. For a particle, zero acceleration means the resultant external force is zero.</p></div>
          <div class="conceptBox"><span>MASS ≠ WEIGHT</span><strong>Mass measures inertia; weight is a force.</strong><p>Mass is measured in kg or slug. Weight is the gravitational force, \(W=mg\), measured in N or lbf. Never insert “kg” into a force balance unless it has first been converted to a force when needed.</p></div>
        </div>
        <div class="lessonNote"><b>Newton's third law trap:</b> an action–reaction pair acts on <em>two different bodies</em>. If both forces appear on the same free-body diagram, they are not a Newton-third-law pair. When you isolate one body, show only the force acting on that body.</div>
      </div>
    </section>

    <section class="lessonSection auditUpgrade">
      <div class="sectionNo">UNIT</div>
      <div class="sectionContent">
        <h3>Unit conversion as algebra, not memory</h3>
        <p>A conversion factor is a ratio equal to one. Multiply by factors arranged so unwanted units cancel. This prevents the two most common errors: using a conversion backward and forgetting to square or cube a length conversion.</p>
        <div class="workedSynthesis">
          <article><b>1 · Force conversion</b><p>Convert \(2.50\,\mathrm{lbf}\) to newtons using the lecture factor \(1\,\mathrm{lbf}=4.448\,\mathrm N\).</p><ol><li>Write the factor so lbf cancels.</li><li>\(2.50\,\mathrm{lbf}\left(\frac{4.448\,\mathrm N}{1\,\mathrm{lbf}}\right)=11.12\,\mathrm N\).</li><li>The surviving unit is N, so the factor orientation is correct.</li></ol></article>
          <article><b>2 · Area conversion</b><p>For area, the length factor must be squared.</p><ol><li>\(1\,\mathrm{in}=0.0254\,\mathrm m\).</li><li>\(5000\,\mathrm{in^2}\left(\frac{0.0254\,\mathrm m}{1\,\mathrm{in}}\right)^2\).</li><li>\(=3.2258\,\mathrm{m^2}\).</li></ol></article>
          <article><b>3 · Moment conversion</b><p>A moment contains both force and length, so convert both pieces.</p><ol><li>Start with \(6\,\mathrm{kN\,m}=6000\,\mathrm{N\,m}\).</li><li>Convert N → lbf and m → in as separate factors.</li><li>The result is about \(5.31\times10^4\,\mathrm{lbf\,in}\), matching the lecture example.</li></ol></article>
          <article><b>4 · Significant figures</b><p>Do not round every intermediate line.</p><ol><li>Carry extra calculator digits while solving.</li><li>Round the final engineering result to the precision justified by the data.</li><li>Use units and an unused equation as independent checks whenever possible.</li></ol></article>
        </div>
      </div>
    </section>

    <section class="lessonSection auditUpgrade">
      <div class="sectionNo">VEC+</div>
      <div class="sectionContent">
        <h3>What the vector operations are for</h3>
        <div class="principleList">
          <div><b>Components</b><span>Turn one directed quantity into signed x/y/z pieces. Signs come from the actual direction, not from the formula.</span></div>
          <div><b>Resultant</b><span>Combines several vectors into one equivalent vector. A resultant is not automatically zero; zero resultant is the special equilibrium case.</span></div>
          <div><b>Dot product</b><span>Produces a scalar and is used later for angles and projections: “how much of this vector lies along that direction?”</span></div>
          <div><b>Cross product</b><span>Produces a perpendicular vector and is used later for moments: “how strongly does this force tend to rotate about a point/axis?”</span></div>
        </div>
        <div class="lessonNote"><b>Angle discipline:</b> always identify which axis the angle is measured from. If an angle is measured from +x, x normally uses cosine and y uses sine. If it is measured from +y, those roles swap. Then apply signs from the quadrant.</div>
      </div>
    </section>`;

  const lessonS02ParticleDeep=String.raw`
    <section class="lessonSection auditUpgrade">
      <div class="sectionNo">2.X</div>
      <div class="sectionContent">
        <h3>Resultant problems and equilibrium problems are different questions</h3>
        <div class="conceptGrid twoCol">
          <div class="conceptBox"><span>RESULTANT</span><strong>What single force is equivalent?</strong><p>Add the forces: \(\mathbf R=\sum\mathbf F\). The resultant can have any magnitude and direction.</p></div>
          <div class="conceptBox"><span>EQUILIBRIUM</span><strong>What must the unknown forces be so the resultant vanishes?</strong><p>Impose \(\sum\mathbf F=\mathbf0\). In 2D this becomes two independent equations, \(\sum F_x=0\) and \(\sum F_y=0\).</p></div>
        </div>
        <p>Do not write equilibrium equations merely because forces are present. First ask whether the problem says the particle is in equilibrium, at rest, or moving with constant velocity.</p>
      </div>
    </section>

    <section class="lessonSection auditUpgrade workedSection">
      <div class="sectionNo">FBD+</div>
      <div class="sectionContent">
        <h3>Particle FBD: the full reasoning chain</h3>
        <p>A free-body diagram is not decoration. It is the step that decides which forces exist and therefore which equations you are allowed to write.</p>
        <div class="methodSteps">
          <div><span>1</span><b>Choose one particle/junction</b><p>Draw only that particle. Everything else becomes an interaction force.</p></div>
          <div><span>2</span><b>Replace each cable by tension</b><p>A cable can pull but not push, so its tension arrow points away from the isolated particle along the cable.</p></div>
          <div><span>3</span><b>Add known loads</b><p>Weight points vertically downward. Applied forces follow their stated direction.</p></div>
          <div><span>4</span><b>Resolve with the stated angle reference</b><p>If the angle is from vertical, horizontal components use sine and vertical components use cosine; from horizontal, the usual roles are reversed.</p></div>
          <div><span>5</span><b>Write two independent equations</b><p>For a planar particle: \(\sum F_x=0\), \(\sum F_y=0\).</p></div>
          <div><span>6</span><b>Interpret signs</b><p>A negative solved magnitude means your assumed arrow direction was opposite; it does not mean “negative tension.”</p></div>
        </div>
        <div class="workedSynthesis">
          <article><b>Complete fresh example</b><p>An 800-N load is held by a left cable 25° above horizontal and a right cable 50° above horizontal.</p><ol><li>FBD: \(T_L\) up-left, \(T_R\) up-right, 800 N downward.</li><li>Horizontal: \(-T_L\cos25^\circ+T_R\cos50^\circ=0\).</li><li>So \(T_R=T_L\cos25^\circ/\cos50^\circ\).</li><li>Vertical: \(T_L\sin25^\circ+T_R\sin50^\circ-800=0\).</li><li>Substitution gives \(T_L\approx532.4\,\mathrm N\), \(T_R\approx750.6\,\mathrm N\).</li><li>Check: both tensions are positive and their vertical components sum to 800 N.</li></ol></article>
          <article><b>Why two equations matter</b><p>The two unknown cable tensions are not found from one “force triangle formula.”</p><ol><li>The geometry fixes each force direction.</li><li>Horizontal equilibrium relates the two tensions.</li><li>Vertical equilibrium fixes their absolute size using the 800-N load.</li><li>If there were a third independent unknown magnitude, two planar equilibrium equations alone would not be enough.</li></ol></article>
        </div>
      </div>
    </section>`;

  const lessonS02RigidDeep=String.raw`
    <section class="lessonSection auditUpgrade">
      <div class="sectionNo">3.X</div>
      <div class="sectionContent">
        <h3>3D direction: the order of points carries physical meaning</h3>
        <p>If a cable pulls at A toward B, the direction vector is \(\mathbf d=\mathbf r_B-\mathbf r_A\). Dividing by its magnitude changes only the length, not the direction. Multiplying that unit vector by the force magnitude then gives the Cartesian force.</p>
        <div class="formulaBanner"><span>COMPLETE TWO-POINT PIPELINE</span><code>\(A,B\rightarrow\mathbf d=\mathbf r_B-\mathbf r_A\rightarrow|\mathbf d|\rightarrow\lambda=\mathbf d/|\mathbf d|\rightarrow\mathbf F=F\lambda\)</code><small>If a component of λ is negative, its corresponding direction angle is greater than 90° because \(\cos\theta_i=\lambda_i\).</small></div>
      </div>
    </section>

    <section class="lessonSection auditUpgrade workedSection">
      <div class="sectionNo">M WHY</div>
      <div class="sectionContent">
        <h3>Moment: what \(\mathbf r\times\mathbf F\) is actually measuring</h3>
        <p>A rigid body can rotate even when the same force magnitude is used. The rotation tendency depends on how far the <strong>line of action</strong> misses the chosen moment point. That is why a rigid-body problem cannot ignore force location.</p>
        <div class="principleList">
          <div><b>Why the cross product?</b><span>Only the component of \(\mathbf r\) perpendicular to \(\mathbf F\) creates rotation. The cross-product magnitude \(rF\sin\theta\) automatically extracts that perpendicular part.</span></div>
          <div><b>Why \(M=Fd\)?</b><span>The perpendicular distance is \(d=r\sin\theta\), so \(rF\sin\theta=Fd\). These are the same moment computed two ways.</span></div>
          <div><b>Why can r end anywhere on the line of action?</b><span>Sliding the force along its own line changes \(\mathbf r\) only by a vector parallel to \(\mathbf F\); a parallel vector crossed with \(\mathbf F\) contributes zero.</span></div>
          <div><b>When is the moment zero?</b><span>If the line of action passes through the moment center, the perpendicular distance is zero, so the force cannot create rotation about that point.</span></div>
        </div>
        <div class="lessonNote"><b>Units:</b> moment has units of force × distance, such as N·m or lbf·in. Do not write joules for a statics moment even though a joule is dimensionally N·m; moment and energy are different physical quantities.</div>
      </div>
    </section>

    <section class="lessonSection auditUpgrade">
      <div class="sectionNo">VAR</div>
      <div class="sectionContent">
        <h3>Varignon is a calculation strategy, not a new physical law</h3>
        <p>If \(\mathbf F=\mathbf F_x+\mathbf F_y+\mathbf F_z\), then distributivity of the cross product gives \(\mathbf r\times\mathbf F=\mathbf r\times\mathbf F_x+\mathbf r\times\mathbf F_y+\mathbf r\times\mathbf F_z\). Use whichever form makes the geometry easiest. The final moment must be the same.</p>
      </div>
    </section>`;

  const lessonS04Deep=String.raw`
    <section class="lessonSection auditUpgrade">
      <div class="sectionNo">DECIDE</div>
      <div class="sectionContent">
        <h3>Dot, cross, or triple product? Decide from the question</h3>
        <div class="principleList">
          <div><b>“Angle between vectors” or “component along an axis”</b><span>Use a dot product. It returns a scalar and measures alignment.</span></div>
          <div><b>“Moment about a point”</b><span>Use a cross product \(\mathbf r\times\mathbf F\). It returns the full moment vector.</span></div>
          <div><b>“Moment about an axis”</b><span>First form the point moment with a cross product, then project that moment onto the axis with a dot product: \(M_L=\lambda\cdot(\mathbf r\times\mathbf F)\).</span></div>
          <div><b>“Volume” or determinant of three vectors</b><span>Use the scalar triple product. Changing the cyclic order preserves sign; swapping two vectors reverses sign.</span></div>
        </div>
      </div>
    </section>

    <section class="lessonSection auditUpgrade workedSection">
      <div class="sectionNo">3.5 FULL</div>
      <div class="sectionContent">
        <h3>Rectangular-plate cable moment: every intermediate step</h3>
        <p>The lecture's 200-N cable example is a good model for almost every 3D force-moment problem: build the force direction first, then build the position vector, then cross them.</p>
        <div class="workedFlow">
          <div><span>1</span><p>Position from A to C</p><code>\(\mathbf r_{C/A}=(0.30\mathbf i+0\mathbf j+0.08\mathbf k)\,\mathrm m\)</code></div>
          <div><span>2</span><p>Cable direction C → D</p><code>\(\mathbf r_{D/C}=(-0.30\mathbf i+0.24\mathbf j-0.32\mathbf k)\,\mathrm m\)</code></div>
          <div><span>3</span><p>Normalize; its length is 0.50 m</p><code>\(\lambda_{CD}=(-0.60\mathbf i+0.48\mathbf j-0.64\mathbf k)\)</code></div>
          <div><span>4</span><p>Multiply by the 200-N tension</p><code>\(\mathbf F=(-120\mathbf i+96\mathbf j-128\mathbf k)\,\mathrm N\)</code></div>
          <div><span>5</span><p>Moment about A</p><code>\(\mathbf M_A=\mathbf r_{C/A}\times\mathbf F\)</code></div>
          <div><span>6</span><p>Expand the determinant</p><code>\(\mathbf M_A=(-7.68\mathbf i+28.8\mathbf j+28.8\mathbf k)\,\mathrm{N\,m}\)</code></div>
        </div>
        <div class="lessonNote"><b>Check before accepting:</b> the force vector must have magnitude 200 N; the position vector must start at A; every moment component must have force×length units.</div>
      </div>
    </section>

    <section class="lessonSection auditUpgrade">
      <div class="sectionNo">EQV</div>
      <div class="sectionContent">
        <h3>Three ideas that are easy to mix up</h3>
        <div class="termMatrix">
          <div><b>Slide a force along its own line</b><span>No couple is added. This is transmissibility.</span></div>
          <div><b>Move a force to a different parallel line / different point</b><span>Keep the same force and add \(\mathbf M=\mathbf r\times\mathbf F\) so the new system has the same rotational effect.</span></div>
          <div><b>Couple</b><span>Two equal/opposite separated forces give zero resultant force but a nonzero free moment. A couple can be moved anywhere without changing its external effect.</span></div>
          <div><b>General force system</b><span>At a chosen point O, preserve both \(\mathbf R=\sum\mathbf F\) and \(\mathbf M_O^R=\sum(\mathbf r\times\mathbf F)+\sum\mathbf M_{couple}\).</span></div>
        </div>
        <p>Equivalence means <strong>same net force and same net moment</strong>. Matching only one of these is not enough for a rigid body.</p>
      </div>
    </section>

    <section class="lessonSection auditUpgrade">
      <div class="sectionNo">FBD WHY</div>
      <div class="sectionContent">
        <h3>Support reactions come from constrained motion</h3>
        <p>Do not memorize the support table as arbitrary symbols. Ask: <strong>what motion does this support prevent?</strong> A reaction appears in each prevented direction, while permitted motion has no ideal reaction.</p>
        <div class="principleList">
          <div><b>Roller / smooth surface</b><span>Prevents motion normal to the surface but permits tangential sliding → one normal reaction.</span></div>
          <div><b>Pin</b><span>Prevents x and y translation but permits rotation → two force components, no reaction moment.</span></div>
          <div><b>Fixed support</b><span>Prevents x translation, y translation, and rotation → two force components plus a couple moment.</span></div>
          <div><b>Cable</b><span>Can carry tension only → one force along the cable, pulling away from the body.</span></div>
          <div><b>Short link</b><span>Two-force member → reaction acts along the link's axis.</span></div>
          <div><b>Rough surface</b><span>Can exert normal and tangential effects → represent by normal + friction/tangential component or their resultant.</span></div>
        </div>
      </div>
    </section>

    <section class="lessonSection auditUpgrade workedSection">
      <div class="sectionNo">4.4 FULL</div>
      <div class="sectionContent">
        <h3>How to solve a rigid-body equilibrium problem without guessing</h3>
        <div class="methodSteps">
          <div><span>1</span><b>Isolate one rigid body</b><p>Replace every support/contact with its reaction model. Include applied couples directly.</p></div>
          <div><span>2</span><b>Count unknowns</b><p>A general 2D rigid body gives three independent scalar equilibrium equations.</p></div>
          <div><span>3</span><b>Choose the best moment point</b><p>Take moments about a point through as many unknown reaction lines as possible so those unknowns contribute zero moment.</p></div>
          <div><span>4</span><b>Solve moments first when useful</b><p>Moment balance often isolates one reaction immediately.</p></div>
          <div><span>5</span><b>Use force balance</b><p>Then solve remaining x/y reactions.</p></div>
          <div><span>6</span><b>Interpret negative answers</b><p>A negative reaction means the actual direction is opposite the arrow you assumed on the FBD; the algebra is not “wrong.”</p></div>
        </div>
        <div class="workedSynthesis">
          <article><b>Fresh beam with oblique force</b><p>5-m beam, pin A, roller B. A 12-kN force acts at x=3 m, 40° below +x, and 5 kN acts downward at x=4 m.</p><ol><li>Resolve the oblique force: \(F_x=12\cos40^\circ=9.19\) kN, \(F_y=-12\sin40^\circ=-7.71\) kN.</li><li>FBD unknowns: \(A_x,A_y,B_y\).</li><li>\(\sum M_A=0:\;5B_y-(7.71)(3)-5(4)=0\).</li><li>\(B_y=8.63\) kN.</li><li>\(\sum F_x=0\Rightarrow A_x=-9.19\) kN.</li><li>\(\sum F_y=0\Rightarrow A_y=4.09\) kN.</li></ol></article>
          <article><b>Check the solution physically</b><p>The downward applied vertical load is \(7.71+5=12.71\) kN.</p><ol><li>The upward reactions are \(8.63+4.09=12.72\) kN (rounding difference only).</li><li>The horizontal pin reaction exactly opposes the 9.19-kN horizontal applied component.</li><li>Re-substituting the solved reactions in the moment equation returns approximately zero.</li></ol></article>
        </div>
      </div>
    </section>`;

  const lessonS05Deep=String.raw`
    <section class="lessonSection auditUpgrade">
      <div class="sectionNo">MASTER</div>
      <div class="sectionContent">
        <h3>What “ready for Quiz I” actually means</h3>
        <p>Recognizing a formula or remembering a lecture answer is not mastery. Count a topic as mastered only when you can start from an unfamiliar diagram, decide the model yourself, draw the FBD when needed, choose the equations, carry signs/units correctly, and explain why the result is physically sensible.</p>
        <div class="principleList">
          <div><b>Level 1 · Recognition</b><span>You can identify the relevant formula or support type.</span></div>
          <div><b>Level 2 · Execution</b><span>You can use the formula when all vectors, angles, and moment arms are already prepared for you.</span></div>
          <div><b>Level 3 · Setup</b><span>You can create the unit vector, FBD, force components, or position vector from raw geometry.</span></div>
          <div><b>Level 4 · Synthesis</b><span>You can chain several ideas—geometry → vector → moment → equilibrium—without being told which equation comes next.</span></div>
          <div><b>Level 5 · Verification</b><span>You can catch a wrong sign, impossible support reaction, wrong unit, or bad moment arm before looking at a key.</span></div>
        </div>
        <div class="lessonNote"><b>Hard-mode rule:</b> use VERIFY closed-book. Draw required FBDs before entering a number. Do not reveal the worked solution until you have either completed the problem or can state exactly where you became stuck.</div>
      </div>
    </section>`;

  const practiceAdditions={
    s01:[
      {id:'s01d1',type:'numeric',meta:'DEPTH · UNIT ALGEBRA',prompt:'Convert 2.50 lbf to newtons using 1 lbf = 4.448 N.',answer:11.12,tol:.01,unit:'N',solution:'Model: this is a single force-unit conversion.\nSetup: multiply by a ratio equal to one so lbf cancels.\nCalculation: 2.50 lbf × (4.448 N / 1 lbf) = 11.12 N.\nCheck: the unwanted lbf unit cancels and the surviving unit is N.'},
      {id:'s01d2',type:'numeric',meta:'DEPTH · AREA CONVERSION',prompt:'Convert 2500 mm² to m².',answer:.0025,tol:.000001,unit:'m²',solution:'Because this is area, square the length conversion. 1 mm = 10⁻³ m, so 2500 mm²(10⁻³ m/mm)² = 2500×10⁻⁶ m² = 2.50×10⁻³ m².'},
      {id:'s01d3',type:'mcq',meta:'DEPTH · NEWTON III',prompt:'A hand pushes a wall to the right. Which statement correctly identifies the Newton-third-law pair?',options:['The hand pushes the wall right; the wall pushes the hand left','The hand pushes the wall right; the wall weight acts down','The hand force and wall weight both act on the wall','The two forces cancel because they act on the same body'],correct:'a',solution:'Newton’s third law pairs interaction forces between two different bodies. The hand exerts a force on the wall, and the wall exerts an equal/opposite force on the hand. Because the forces act on different bodies, they do not cancel on a single-body FBD.'},
      {id:'s01d4',type:'mcq',meta:'DEPTH · MODEL CHOICE',prompt:'A rigid body moves in a straight line at constant velocity. In the lecture classification, which branch can describe its force balance?',options:['Statics','Dynamics only because it is moving','Fluid mechanics','No mechanics branch'],correct:'a',solution:'Constant velocity means acceleration is zero. The lecture classifies rigid bodies at rest or at constant velocity under statics. Motion itself does not force the problem into dynamics; acceleration does.'},
      {id:'s01d5',type:'mcq',meta:'DEPTH · NUMERICAL ACCURACY',prompt:'Which calculation habit best matches the lecture accuracy guidance?',options:['Keep guard digits during calculation and round the final result to justified precision','Round every intermediate line to one decimal place','Report every calculator digit','Ignore input precision if the calculator is accurate'],correct:'a',solution:'The source says solution accuracy is limited by the less accurate of the data and computation. Calculators make computation highly precise, so input-data accuracy usually controls. Keep guard digits to avoid extra rounding error, then report a sensible final precision.'}
    ],
    s02:[
      {id:'s02d1',type:'numeric',meta:'DEPTH · RESULTANT · MULTI-FORCE',prompt:'Three concurrent forces act on a particle: 200 N at 30°, 150 N at 150°, and 100 N vertically downward. Find the resultant magnitude.',answer:86.6025,tol:.1,unit:'N',solution:'Resolve every force in the same x-y axes. Rx=200cos30°+150cos150°+100cos(−90°)=43.30 N. Ry=200sin30°+150sin150°−100=75.00 N. Then R=√(Rx²+Ry²)=86.60 N. This is a resultant problem, so we add forces; we do not set the sums to zero.'},
      {id:'s02d2',type:'numeric',meta:'DEPTH · RESULTANT DIRECTION',prompt:'For the same three-force system (200 N at 30°, 150 N at 150°, 100 N downward), find the resultant direction counterclockwise from +x.',answer:60,tol:.1,unit:'°',solution:'From the component sum, Rx=43.30 N and Ry=75.00 N, both positive, so the resultant is in quadrant I. θ=atan2(75.00,43.30)=60.0°. The quadrant check is part of the solution.'},
      {id:'s02d3',type:'numeric',meta:'DEPTH · PARTICLE EQUILIBRIUM · FBD REQUIRED',fbdRequired:true,prompt:'An 800-N load hangs from a particle. The left cable is 25° above horizontal and the right cable is 50° above horizontal. Find the left-cable tension.',answer:532.37,tol:.4,unit:'N',fbdCheck:['Isolate only the junction.','Left and right tensions point away from the junction along their cables.','800-N force acts downward.','Angles are measured from horizontal, so horizontal components use cosine and vertical components use sine.'],solution:'FBD first: TL acts up-left, TR up-right, and 800 N acts down.\nHorizontal equilibrium: −TL cos25° + TR cos50° = 0, so TR = TL cos25°/cos50°.\nVertical equilibrium: TL sin25° + TR sin50° − 800 = 0.\nSubstitute the first equation into the second and solve: TL = 532.37 N. Then TR≈750.62 N.\nCheck: both tensions are positive and the vertical components sum to 800 N.'},
      {id:'s02d4',type:'numeric',meta:'DEPTH · TWO-POINT 3D FORCE',prompt:'A 210-N cable pulls from A=(1,−2,2) toward B=(−2,4,6). Find Fy.',answer:161.326,tol:.2,unit:'N',solution:'Direction first: d=B−A=(−3,6,4). Its length is √61. The unit vector is λ=d/√61. Force is F=210λ, so Fy=210(6/√61)=161.33 N. The positive sign agrees with B being above A in y.'},
      {id:'s02d5',type:'numeric',meta:'DEPTH · DIRECTION ANGLE',prompt:'For that same 210-N force from A=(1,−2,2) toward B=(−2,4,6), find the direction angle θx with +x.',answer:112.589,tol:.1,unit:'°',solution:'The x direction cosine is λx=−3/√61≈−0.3841. Since cosθx=λx, θx=cos⁻¹(−3/√61)=112.59°. The answer must be greater than 90° because the x component is negative.'},
      {id:'s02d6',type:'numeric',meta:'DEPTH · 3D MOMENT',prompt:'The same 210-N force acts at A=(1,−2,2) m toward B=(−2,4,6). Find Mx about O.',answer:-537.755,tol:.5,unit:'N·m',solution:'First build the force from the line: F≈(−80.663,161.326,107.551) N. Use r_A=(1,−2,2) m. Then M_O=r×F. The x component is Mx=yFz−zFy=(−2)(107.551)−(2)(161.326)=−537.755 N·m. Units are N·m because r contributes meters and F contributes newtons.'},
      {id:'s02d7',type:'mcq',meta:'DEPTH · MOMENT PHYSICS',prompt:'A force line of action passes exactly through point O. What is the moment of that force about O?',options:['Zero','Always F times the distance from the global origin','Equal to the force magnitude','Undefined because r=0 must be used'],correct:'a',solution:'Moment magnitude is Fd, where d is the perpendicular distance from O to the force line of action. If that line passes through O, d=0, so the moment is zero. In vector form, choose any point on the force line; the resulting r×F is also zero.'}
    ],
    s04:[
      {id:'s04d1',type:'mcq',meta:'DEPTH · METHOD CHOICE',prompt:'You need the scalar component of a force along a known unit axis λ. Which operation directly gives it?',options:['F·λ','r×F','F×λ','|F|d'],correct:'a',solution:'A scalar projection measures alignment with an axis, so use the dot product F·λ. A cross product is used when the question is about a perpendicular vector such as a moment.'},
      {id:'s04d2',type:'numeric',meta:'DEPTH · ARBITRARY AXIS · FULL CHAIN',prompt:'Axis OL has direction (1,−2,2). A force F=(30,50,−20) N acts at A=(2,1,−1) m. Find the scalar moment about OL.',answer:50,tol:.1,unit:'N·m',solution:'1) Normalize the axis: λ=(1,−2,2)/3.\n2) Position vector: r_A=(2,1,−1) m.\n3) Point moment: M_O=r×F=(30,10,70) N·m.\n4) Project on the axis: M_OL=λ·M_O=[30−20+140]/3=50 N·m.\nThe positive sign means the moment component points along the chosen positive OL direction.'},
      {id:'s04d3',type:'numeric',meta:'DEPTH · COUPLE',prompt:'Two equal and opposite 120-N forces form a couple with perpendicular separation 0.35 m. Find the couple-moment magnitude.',answer:42,tol:.02,unit:'N·m',solution:'A couple has zero resultant force but nonzero moment. Its magnitude is M=Fd=120(0.35)=42 N·m. The moment is independent of the point about which you compute it.'},
      {id:'s04d4',type:'numeric',meta:'DEPTH · EQUIVALENT COUPLE',prompt:'An equivalent couple must have magnitude 42 N·m using two forces separated by 0.20 m. What force magnitude is required?',answer:210,tol:.1,unit:'N',solution:'Equivalent couples must have the same moment vector. Using M=Fd, F=M/d=42/0.20=210 N. The individual forces may differ from another couple as long as the resulting moment vector is the same.'},
      {id:'s04d5',type:'numeric',meta:'DEPTH · FORCE TRANSFER',prompt:'F=(40,60,0) N acts at r=(0.30,−0.20,0) m from O. If the force is moved to O, what added couple Mz is required?',answer:26,tol:.03,unit:'N·m',solution:'Moving off the original line of action requires preserving the original moment. Mz=xFy−yFx=0.30(60)−(−0.20)(40)=18+8=26 N·m. The equivalent system at O is the same force F plus a +26 N·m couple.'},
      {id:'s04d6',type:'numeric',meta:'DEPTH · MIXED FORCE SYSTEM',prompt:'At O, F1=(100,0) N acts at r1=(0,2) m and F2=(0,−150) N acts at r2=(3,0) m. A +50 N·m CCW couple also acts. Find the resultant moment about O.',answer:-600,tol:.1,unit:'N·m',solution:'Compute every force moment plus any free couples. M1=0·0−2(100)=−200 N·m. M2=3(−150)−0·0=−450 N·m. Add the +50 N·m applied couple: M_O^R=−200−450+50=−600 N·m.'},
      {id:'s04d7',type:'numeric',meta:'DEPTH · RIGID BODY · FBD REQUIRED',fbdRequired:true,prompt:'A 5-m beam has a pin at A and vertical roller at B. A 12-kN force acts at x=3 m, directed 40° below +x. A 5-kN load acts downward at x=4 m. Find By.',answer:8.6281,tol:.03,unit:'kN',fbdCheck:['Pin A → Ax and Ay.','Roller B → vertical By only.','Resolve the 12-kN oblique force into horizontal and vertical components.','Only the vertical component of the force at x=3 m creates moment about A because the horizontal component acts along the beam axis.'],solution:'Resolve the 12-kN force: Fx=12cos40°=9.19 kN, Fy=−12sin40°=−7.71 kN. Take moments about A to eliminate Ax and Ay: 5By−(7.71)(3)−5(4)=0. Thus By=8.628 kN. Then force balance would give Ax=−9.19 kN and Ay≈4.09 kN, which provides a useful check.'},
      {id:'s04d8',type:'numeric',meta:'DEPTH · FIXED SUPPORT · FBD REQUIRED',fbdRequired:true,prompt:'A fixed support at O carries F=(3,−8,0) kN applied at r=(4,1,0) m and an applied +5 kN·m CCW couple. Find the required reaction moment at O (CCW positive).',answer:30,tol:.05,unit:'kN·m',fbdCheck:['Fixed support → Ox, Oy and reaction moment MO.','Force moment is r×F.','Applied couples enter moment equilibrium directly and do not need a moment arm.'],solution:'Force moment: M_F=xFy−yFx=4(−8)−1(3)=−35 kN·m. Add the applied +5 kN·m couple: total external moment is −30 kN·m. Equilibrium requires MO−30=0, so the support reaction moment is +30 kN·m CCW.'},
      {id:'s04d9',type:'mcq',meta:'DEPTH · SIGN INTERPRETATION',prompt:'You assume a support reaction Ay points upward, solve the equilibrium equations, and obtain Ay=−4.2 kN. What does this mean?',options:['The actual reaction is 4.2 kN downward','The equilibrium equations are invalid','The support supplies no reaction','Moments must be recomputed with absolute values'],correct:'a',solution:'Unknown reaction arrows may be assumed. A negative solution simply means the true force acts opposite the assumed direction. Keep signed equations throughout; do not replace values by absolute magnitude until interpreting the final result.'}
    ],
    s05:[
      {id:'q1h01',type:'numeric',meta:'HARD SYNTHESIS · 3D FORCE → AXIS MOMENT',prompt:'A 240-N force acts at A=(2,−1,1) m toward B=(−1,5,4). Find its scalar moment about the axis through O with direction (1,1,0).',answer:-415.692,tol:.5,unit:'N·m',solution:'1) Line direction d=B−A=(−3,6,3), |d|=√54.\n2) Force F=240d/√54≈(−97.98,195.96,97.98) N.\n3) Point moment M_O=r_A×F≈(−293.94,−293.94,293.94) N·m.\n4) Axis unit vector λ=(1,1,0)/√2.\n5) M_axis=λ·M_O=(−293.94−293.94)/√2=−415.69 N·m.\nCheck: the sign refers to the chosen positive axis direction.'},
      {id:'q1h02',type:'numeric',meta:'HARD SYNTHESIS · PARTICLE FBD',fbdRequired:true,prompt:'A 900-N load is supported by two cables meeting at a particle. The left cable is 35° above horizontal and the right cable is 50° above horizontal. Find the left-cable tension.',answer:580.719,tol:.5,unit:'N',fbdCheck:['Both cable tensions pull away from the particle.','900 N acts downward.','Angles are from horizontal.','Use both horizontal and vertical equilibrium.'],solution:'Horizontal equilibrium: −TLcos35°+TRcos50°=0, so TR=TLcos35°/cos50°. Vertical equilibrium: TLsin35°+TRsin50°=900. Substitution gives TL=580.72 N and TR≈740.05 N. Verify that horizontal components cancel and vertical components sum to 900 N.'},
      {id:'q1h03',type:'numeric',meta:'HARD SYNTHESIS · RIGID BODY + COUPLE',fbdRequired:true,prompt:'A 6-m beam has a pin at A and roller at B. A 14-kN force acts at x=2 m, 35° below +x; an 8-kN load acts downward at x=5 m; and a 10-kN·m clockwise couple acts. Find By.',answer:11.0100,tol:.04,unit:'kN',fbdCheck:['Pin A → Ax, Ay; roller B → By.','Resolve the 14-kN force; only its vertical component creates moment about A.','Include the 10-kN·m clockwise couple directly in ΣM_A.'],solution:'Vertical component of the oblique force is −14sin35°=−8.03 kN. Moment about A: 6By−(8.03)(2)−8(5)−10=0. Therefore By=11.010 kN. Horizontal and vertical force equations can then recover Ax and Ay and provide a check.'},
      {id:'q1h04',type:'numeric',meta:'HARD SYNTHESIS · FORCE SYSTEM',prompt:'At O, F1=(100,0) N acts at r1=(0,2) m and F2=(0,−150) N at r2=(3,0) m. A +50 N·m CCW couple also acts. Find the perpendicular offset d from O to an equivalent single resultant line of action.',answer:3.3282,tol:.01,unit:'m',solution:'Resultant force R=(100,−150) N, so |R|=√(100²+150²)=180.28 N. Resultant moment at O is −200−450+50=−600 N·m. For a single resultant, the perpendicular offset magnitude satisfies |M_O|=|R|d. Thus d=600/180.28=3.328 m.'},
      {id:'q1h05',type:'mcq',meta:'HARD CONCEPT · EQUIVALENCE',prompt:'A force is moved from point A to point O, and O is not on the original line of action. Which replacement is mechanically equivalent for a rigid body?',options:['The same force at O plus the couple r_A/O×F','The same force at O with no other change','Only the couple r_A/O×F','A force of doubled magnitude at O'],correct:'a',solution:'Moving a force off its original line changes its moment. Keep the same resultant force and add the original moment about O, r×F. This preserves both the net force and net moment, which is the definition of rigid-body equivalence used in the lecture.'},
      {id:'q1h06',type:'mcq',meta:'HARD CONCEPT · FBD',prompt:'On a whole-body FBD of a truck, which force should NOT appear?',options:['Internal force between the wheel and its axle when both are included in the isolated truck','Ground reaction on a tire','Weight of the truck','External towing force'],correct:'a',solution:'Forces between parts that are both inside the isolated system are internal and are not shown on the whole-body FBD. Ground reaction, weight, and towing force come from outside the isolated truck and therefore are external.'}
    ]
  };

  const masteryAdditions={s05:[
    {id:'q1x01',type:'numeric',meta:'MOCK HARD · ARBITRARY AXIS',prompt:'Axis OL has direction (2,−1,2). A force F=(−20,60,40) N acts at A=(1,2,−1) m. Find the scalar moment about OL.',answer:166.667,tol:.2,unit:'N·m',solution:'Normalize the axis: λ=(2,−1,2)/3. Point moment: M_O=(1,2,−1)×(−20,60,40)=(140,−20,100) N·m. Projection: M_OL=λ·M_O=[280+20+200]/3=166.67 N·m.'},
    {id:'q1x02',type:'numeric',meta:'MOCK HARD · PIN + CABLE + COUPLE',fbdRequired:true,prompt:'A 5-m horizontal beam is pinned at A. A cable at B is 50° above the beam. An 18-kN load acts downward at x=3 m and an 8-kN·m clockwise couple acts. Find the cable tension.',answer:16.1871,tol:.05,unit:'kN',fbdCheck:['Pin A → Ax, Ay.','Cable tension at B follows the cable.','18-kN load at 3 m.','Clockwise 8-kN·m couple is included directly in moment equilibrium.'],solution:'Take moments about A to eliminate the pin reactions. The cable contributes +(Tsin50°)(5), the load contributes −18(3), and the applied couple contributes −8. Thus 5Tsin50°−54−8=0, so T=16.187 kN.'},
    {id:'q1x03',type:'numeric',meta:'MOCK HARD · FIXED SUPPORT',fbdRequired:true,prompt:'A fixed support at O carries F=(6,−10,0) kN applied at r=(3,1,0) m and a +4 kN·m CCW couple. Find the required reaction moment at O.',answer:32,tol:.05,unit:'kN·m',fbdCheck:['Fixed support supplies Ox, Oy, MO.','Use r×F for force moment.','Add the applied couple algebraically.'],solution:'Force moment: M_F=3(−10)−1(6)=−36 kN·m. Add the +4 kN·m applied couple to get −32 kN·m external. Equilibrium requires MO=+32 kN·m.'},
    {id:'q1x04',type:'numeric',meta:'MOCK HARD · PARTICLE EQUILIBRIUM',fbdRequired:true,prompt:'A 700-N load hangs from two cables. The left cable is 28° above horizontal; the right cable is 62° above horizontal. Find the left-cable tension.',answer:328.630,tol:.4,unit:'N',fbdCheck:['Tensions pull away along both cables.','700-N load downward.','Angles are from horizontal.','Use both component equilibrium equations.'],solution:'Horizontal: TRcos62°=TLcos28°, so TR=TLcos28°/cos62°. Vertical: TLsin28°+TRsin62°=700. Substitution gives TL=328.63 N and TR≈618.06 N.'},
    {id:'q1x05',type:'numeric',meta:'MOCK HARD · RESULTANT + COUPLE',prompt:'Vertical forces +70 N at x=0, −180 N at x=2 m, +40 N at x=4 m, −30 N at x=6 m act with a +20 N·m CCW couple. Where from x=0 does the equivalent single resultant act?',answer:3.6,tol:.02,unit:'m',solution:'Resultant R=70−180+40−30=−100 N. Moment about x=0: M=−180(2)+40(4)−30(6)+20=−360 N·m. Match the moment with a single vertical resultant: x(−100)=−360, so x=3.60 m.'},
    {id:'q1x06',type:'mcq',meta:'MOCK HARD · INTERPRETATION',prompt:'A computed roller reaction is negative relative to the arrow you assumed on the FBD. What is the correct interpretation?',options:['The actual reaction acts opposite the assumed arrow','The body cannot be in equilibrium','The reaction magnitude must be set to zero','The moment equation must use absolute values'],correct:'a',solution:'The assumed arrow for an unknown reaction is arbitrary. A negative result means the true force direction is opposite your assumption. Keep the signed value in checks; do not change equilibrium equations to absolute values.'}
  ]};

  const lessonS01SourceDetails=String.raw`
    <section class="lessonSection auditUpgrade">
      <div class="sectionNo">PREFIX</div>
      <div class="sectionContent">
        <h3>Compound prefixes: treat the prefix as a power of ten</h3>
        <p>Lecture 01 includes compound-unit exercises because prefix mistakes can change an answer by factors of thousands or millions. Replace each prefix by its power of ten first, do the algebra, then choose a convenient final prefix.</p>
        <div class="workedFlow">
          <div><span>1</span><p>Example from the lecture style</p><code>\((50\,\mathrm{mN})(6\,\mathrm{GN})\)</code></div>
          <div><span>2</span><p>Expose the powers</p><code>\((50\times10^{-3})(6\times10^9)\,\mathrm{N^2}=3.00\times10^8\,\mathrm{N^2}\)</code></div>
          <div><span>3</span><p>Since \((\mathrm{kN})^2=10^6\,\mathrm{N^2}\)</p><code>\(3.00\times10^8\,\mathrm{N^2}=300\,\mathrm{kN^2}\)</code></div>
        </div>
        <div class="lessonNote"><b>Key distinction:</b> \(\mathrm{kN^2}\) means kilo-newton-squared only if the prefix belongs to the unit being squared. Keep parentheses mentally: \((\mathrm{kN})^2\).</div>
      </div>
    </section>`;

  const lessonS02SourceDetails=String.raw`
    <section class="lessonSection auditUpgrade">
      <div class="sectionNo">× PROP</div>
      <div class="sectionContent">
        <h3>One cross-product property that is easy to forget</h3>
        <p>The cross product is <strong>not commutative</strong> and also <strong>not associative</strong>. You may distribute it over addition, but you cannot move parentheses through chained cross products as if they were ordinary multiplication.</p>
        <div class="formulaBoard">
          <div><b>Anti-commutative</b><code>\(\mathbf P\times\mathbf Q=-(\mathbf Q\times\mathbf P)\)</code></div>
          <div><b>Distributive</b><code>\(\mathbf P\times(\mathbf Q+\mathbf S)=\mathbf P\times\mathbf Q+\mathbf P\times\mathbf S\)</code></div>
          <div><b>Not associative</b><code>\((\mathbf P\times\mathbf Q)\times\mathbf S\ne\mathbf P\times(\mathbf Q\times\mathbf S)\)</code></div>
        </div>
      </div>
    </section>`;

  const lessonS04SourceDetails=String.raw`
    <section class="lessonSection auditUpgrade">
      <div class="sectionNo">3.7+</div>
      <div class="sectionContent">
        <h3>Triple-product sign and the coplanar test</h3>
        <p>The six scalar triple products have the same magnitude, but swapping two vectors reverses the sign. Cyclic permutations preserve the sign. Geometrically, the absolute value is a volume, so the triple product is zero when the three vectors are coplanar.</p>
        <div class="formulaBoard">
          <div><b>Same sign under cyclic order</b><code>\(\mathbf S\cdot(\mathbf P\times\mathbf Q)=\mathbf P\cdot(\mathbf Q\times\mathbf S)=\mathbf Q\cdot(\mathbf S\times\mathbf P)\)</code></div>
          <div><b>Swap two → reverse sign</b><code>\(\mathbf S\cdot(\mathbf Q\times\mathbf P)=-\mathbf S\cdot(\mathbf P\times\mathbf Q)\)</code></div>
          <div><b>Coplanar test</b><code>\(\mathbf S\cdot(\mathbf P\times\mathbf Q)=0\)</code></div>
        </div>
      </div>
    </section>

    <section class="lessonSection auditUpgrade">
      <div class="sectionNo">3.11+</div>
      <div class="sectionContent">
        <h3>When a force-couple system can become one force</h3>
        <p>A general system reduced at O gives \(\mathbf R\) and \(\mathbf M_O^R\). It can be represented by a <strong>single force</strong> only when the required moment can be produced solely by shifting the line of action of \(\mathbf R\); therefore \(\mathbf M_O^R\) must be perpendicular to \(\mathbf R\).</p>
        <div class="conceptGrid twoCol">
          <div class="conceptBox"><span>COMMON CASES</span><strong>Concurrent, coplanar, or parallel force systems</strong><p>The lecture notes these systems produce a resultant force and resultant couple that are mutually perpendicular, allowing further reduction when the resultant force is nonzero.</p></div>
          <div class="conceptBox"><span>2D LOCATION</span><strong>Match moments</strong><p>For a planar resultant, move its line of action until \(\mathbf r\times\mathbf R=\mathbf M_O^R\). For a vertical resultant on a beam this often reduces to \(xR=M_O^R\).</p></div>
        </div>
      </div>
    </section>

    <section class="lessonSection auditUpgrade workedSection">
      <div class="sectionNo">CRANE</div>
      <div class="sectionContent">
        <h3>Lecture crane: why the moment point makes the solution easy</h3>
        <p>The crane has a 1000-kg self-weight \(9.81\,\mathrm{kN}\), a 2400-kg suspended load \(23.5\,\mathrm{kN}\), a pin at A, and a rocker reaction B acting horizontally 1.5 m below A.</p>
        <div class="workedFlow">
          <div><span>1</span><p>Unknown reactions</p><code>\(A_x,\;A_y,\;B\)</code></div>
          <div><span>2</span><p>Take moments about A; both A reactions vanish</p><code>\(B(1.5)-9.81(2)-23.5(6)=0\)</code></div>
          <div><span>3</span><p>Solve rocker reaction</p><code>\(B=107.1\,\mathrm{kN}\)</code></div>
          <div><span>4</span><p>Horizontal balance</p><code>\(A_x+B=0\Rightarrow A_x=-107.1\,\mathrm{kN}\)</code></div>
          <div><span>5</span><p>Vertical balance</p><code>\(A_y-9.81-23.5=0\Rightarrow A_y=33.3\,\mathrm{kN}\)</code></div>
          <div><span>6</span><p>Independent check</p><code>\(\sum M_B\approx0\)</code></div>
        </div>
        <div class="lessonNote"><b>Why this ordering is efficient:</b> using \(\sum M_A=0\) first eliminates two unknowns at once. Picking a poor moment point would produce an equation containing extra unknown reactions.</div>
      </div>
    </section>

    <section class="lessonSection auditUpgrade workedSection">
      <div class="sectionNo">ROOF</div>
      <div class="sectionContent">
        <h3>Lecture roof frame: resolve the cable before equilibrium</h3>
        <p>The 150-kN cable has a 4.5–6–7.5 geometry, so its components at the frame are \(+90\,\mathrm{kN}\) horizontally and \(-120\,\mathrm{kN}\) vertically. The fixed support E therefore supplies \(E_x,E_y,M_E\).</p>
        <div class="workedFlow">
          <div><span>1</span><p>Horizontal equilibrium</p><code>\(E_x+90=0\Rightarrow E_x=-90.0\,\mathrm{kN}\)</code></div>
          <div><span>2</span><p>Four roof loads total 80 kN downward</p><code>\(E_y-80-120=0\Rightarrow E_y=200\,\mathrm{kN}\)</code></div>
          <div><span>3</span><p>Moment about E</p><code>\(20(7.2)+20(5.4)+20(3.6)+20(1.8)-120(4.5)+M_E=0\)</code></div>
          <div><span>4</span><p>Reaction couple</p><code>\(M_E=180\,\mathrm{kN\,m}\)</code></div>
        </div>
      </div>
    </section>

    <section class="lessonSection auditUpgrade workedSection">
      <div class="sectionNo">RING</div>
      <div class="sectionContent">
        <h3>Lecture eccentric ring: derive the formula instead of memorizing it</h3>
        <p>Use axes along and normal to the incline. The rough contact supplies normal force N and friction F. Taking moments about the ring center O removes N and the ring's own weight from the moment equation.</p>
        <div class="workedFlow">
          <div><span>1</span><p>Moment about O</p><code>\(Fr-m_0gb\sin\theta=0\)</code></div>
          <div><span>2</span><p>Solve friction from moment balance</p><code>\(F=\dfrac{m_0gb}{r}\sin\theta\)</code></div>
          <div><span>3</span><p>Force balance along incline</p><code>\(F-(m+m_0)g\sin\alpha=0\)</code></div>
          <div><span>4</span><p>Eliminate F and g</p><code>\(\sin\theta=\dfrac rb\left(1+\dfrac m{m_0}\right)\sin\alpha\)</code></div>
          <div><span>5</span><p>Equilibrium orientation</p><code>\(\theta=\sin^{-1}\!\left[\dfrac rb\left(1+\dfrac m{m_0}\right)\sin\alpha\right]\)</code></div>
        </div>
        <div class="lessonNote"><b>Physical-domain check:</b> the expression inside \(\sin^{-1}\) must lie between −1 and +1. If it does not, the assumed no-slip equilibrium orientation cannot exist for those parameters.</div>
      </div>
    </section>`;

  practiceAdditions.s01.push(
    {id:'s01d6',type:'numeric',meta:'DEPTH · SI PREFIX ALGEBRA',prompt:'Evaluate (50 mN)(6 GN) and express the result in kN², treating kN² as (kN)².',answer:300,tol:.1,unit:'kN²',solution:'Replace the prefixes first: (50×10⁻³ N)(6×10⁹ N)=3.00×10⁸ N². Since (1 kN)²=(10³ N)²=10⁶ N², divide by 10⁶ to get 300 kN².'},
    {id:'s01d7',type:'numeric',meta:'DEPTH · LAW OF COSINES',prompt:'Two forces of 80 N and 120 N act at the same point with a 60° included angle. Find the magnitude of their resultant.',answer:174.356,tol:.2,unit:'N',solution:'The force vectors and their resultant form the parallelogram/force triangle. With included angle 60°, R²=80²+120²+2(80)(120)cos60°. Thus R=174.36 N. The + sign appears because the resultant diagonal corresponds to vector addition.'}
  );
  practiceAdditions.s02.push(
    {id:'s02d8',type:'mcq',meta:'DEPTH · CROSS-PRODUCT PROPERTY',prompt:'Which statement about the cross product is correct?',options:['It is distributive but not commutative and not associative','It is commutative and associative','It is associative but not distributive','It always produces a scalar'],correct:'a',solution:'The lecture lists the cross product as distributive, not commutative, and not associative. Reversing the order changes sign, and changing parentheses in a chained cross product can change the result.'}
  );
  practiceAdditions.s04.push(
    {id:'s04d10',type:'mcq',meta:'DEPTH · TRIPLE PRODUCT',prompt:'If S·(P×Q)=0, what geometric conclusion is supported?',options:['S, P and Q are coplanar (including degenerate cases)','S must be parallel to P','P and Q must have equal magnitudes','All three vectors must be zero'],correct:'a',solution:'The absolute scalar triple product is the volume of the parallelepiped formed by the three vectors. Zero volume means the three vectors are coplanar (or a degenerate case such as a zero vector).'},
    {id:'s04d11',type:'mcq',meta:'DEPTH · TRIPLE-PRODUCT SIGN',prompt:'How does S·(Q×P) compare with S·(P×Q)?',options:['It is the negative','It is always equal','It is the reciprocal','There is no relation'],correct:'a',solution:'Swapping P and Q reverses the cross product: Q×P=−(P×Q). Therefore S·(Q×P)=−S·(P×Q). Cyclic permutations preserve the sign.'},
    {id:'s04d12',type:'mcq',meta:'DEPTH · FORCE-SYSTEM REDUCTION',prompt:'Which condition permits a nonzero resultant force-couple system at O to be represented by one shifted resultant force?',options:['The resultant couple is perpendicular to the resultant force','The resultant couple is parallel to the resultant force','The resultant force must be horizontal','The chosen point O must be the origin'],correct:'a',solution:'A shift of the resultant force generates a moment r×R, which is necessarily perpendicular to R. Therefore the existing resultant couple must be perpendicular to R if it is to be absorbed solely by shifting the line of action.'}
  );

  const lessonS01Final=lessonS01Deep+lessonS01SourceDetails;
  const lessonS02RigidFinal=lessonS02RigidDeep+lessonS02SourceDetails;
  const lessonS04Final=lessonS04Deep+lessonS04SourceDetails;
  window.STATICS_TEACHING={lessonS01Deep:lessonS01Final,lessonS02ParticleDeep,lessonS02RigidDeep:lessonS02RigidFinal,lessonS04Deep:lessonS04Final,lessonS05Deep,practiceAdditions,masteryAdditions};
})();