(() => {
  'use strict';
  var host = document.getElementById('lessonContentHost');
  if (!host || window.__STATICS_VISUAL_EXPLAINERS__) return;
  window.__STATICS_VISUAL_EXPLAINERS__ = true;

  function wrap(title, subtitle, body, note) {
    return '<aside class="vxCard" data-vx-card><div class="vxHead"><span>VISUAL EXPLANATION</span><div><strong>' + title + '</strong><small>' + subtitle + '</small></div></div><div class="vxBody">' + body + '</div>' + (note ? '<div class="vxNote">' + note + '</div>' : '') + '</aside>';
  }

  function arrow(id, color) {
    return '<defs><marker id="' + id + '" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="' + color + '"></path></marker></defs>';
  }

  function trig() {
    return wrap('See the triangle before using trig', 'The angle decides which side is adjacent and which is opposite.',
      '<div class="vxSplit"><svg class="vxSvg" viewBox="0 0 420 245"><path d="M65 200 L335 200 L335 50 Z" fill="rgba(47,119,116,.06)" stroke="#61706a" stroke-width="2"/><path d="M315 200 L315 180 L335 180" fill="none" stroke="#8b887e" stroke-width="2"/><path d="M90 200 A35 35 0 0 1 120 182" fill="none" stroke="#b86d31" stroke-width="3"/><text x="113" y="180" class="vxAccent">θ</text><text x="170" y="224">adjacent → F cos θ</text><text x="350" y="145" transform="rotate(-90 350 145)">opposite → F sin θ</text><text x="185" y="108" transform="rotate(-31 185 108)">hypotenuse = F</text></svg><div class="vxSteps"><div><b>1</b><span>Find where θ is measured from.</span></div><div><b>2</b><span>Touching side = cosine component.</span></div><div><b>3</b><span>Across side = sine component.</span></div></div></div>',
      'Do not memorize “x uses cosine.” If θ is measured from y, the y-component is the adjacent/cosine side.'
    );
  }

  function resultant() {
    return wrap('A resultant replaces several forces with one', 'It must preserve the combined direction and magnitude.',
      '<div class="vxSplit"><svg class="vxSvg" viewBox="0 0 440 245">' + arrow('vxra','#a25f2f') + arrow('vxrr','#2f7774') + '<circle cx="70" cy="190" r="5" fill="#303b37"/><line x1="70" y1="190" x2="250" y2="155" stroke="#a25f2f" stroke-width="5" marker-end="url(#vxra)"/><line x1="70" y1="190" x2="165" y2="65" stroke="#a25f2f" stroke-width="5" marker-end="url(#vxra)"/><line x1="250" y1="155" x2="350" y2="30" stroke="#96968e" stroke-width="2" stroke-dasharray="6 6"/><line x1="165" y1="65" x2="350" y2="30" stroke="#96968e" stroke-width="2" stroke-dasharray="6 6"/><line x1="70" y1="190" x2="350" y2="30" stroke="#2f7774" stroke-width="6" marker-end="url(#vxrr)"/><text x="225" y="145">P</text><text x="145" y="57">Q</text><text x="260" y="82" class="vxAccent">R = P + Q</text></svg><div class="vxRule"><b>Resultant question</b><span>“What single arrow has the same total effect?”</span><strong>R = ΣF</strong></div></div>'
    );
  }

  function components() {
    return wrap('Resolve one force into x and y', 'Drag the angle. The two component arrows update live.',
      '<div class="vxInteractive" data-vx-components><svg class="vxSvg vxPlot" viewBox="0 0 460 280">' + arrow('vxcf','#2f7774') + arrow('vxcx','#a25f2f') + arrow('vxcy','#6b7d91') + '<line x1="80" y1="220" x2="410" y2="220" stroke="#a5a096"/><line x1="80" y1="220" x2="80" y2="25" stroke="#a5a096"/><line data-vx-f x1="80" y1="220" x2="330" y2="80" stroke="#2f7774" stroke-width="6" marker-end="url(#vxcf)"/><line data-vx-x x1="80" y1="220" x2="330" y2="220" stroke="#a25f2f" stroke-width="4" marker-end="url(#vxcx)"/><line data-vx-y x1="330" y1="220" x2="330" y2="80" stroke="#6b7d91" stroke-width="4" marker-end="url(#vxcy)"/><line data-vx-dx x1="330" y1="80" x2="330" y2="220" stroke="#99978e" stroke-dasharray="5 5"/><line data-vx-dy x1="80" y1="80" x2="330" y2="80" stroke="#99978e" stroke-dasharray="5 5"/><text x="90" y="244">+x</text><text x="54" y="35">+y</text></svg><div class="vxControls"><label><span>ANGLE θ</span><input data-vx-angle type="range" min="0" max="360" value="35"><b data-vx-angle-out>35°</b></label><div><span>Fx = F cos θ</span><strong data-vx-fx>81.9 N</strong></div><div><span>Fy = F sin θ</span><strong data-vx-fy>57.4 N</strong></div><p>Signs come from the arrow direction: left is −x, down is −y.</p></div></div>',
      'This is the picture behind almost every planar force equation.'
    );
  }

  function resultVsEq() {
    return wrap('Resultant and equilibrium are different questions', 'They use the same vectors but impose different goals.',
      '<div class="vxCompare"><div><span>RESULTANT</span><strong>Replace the force system</strong><code>R = ΣF</code><small>R is usually not zero.</small></div><i>VS</i><div><span>EQUILIBRIUM</span><strong>Find forces that make it balance</strong><code>ΣF = 0</code><small>Zero is the equilibrium condition.</small></div></div>'
    );
  }

  function equilibrium() {
    return wrap('Equilibrium means the arrows cancel', 'Zero resultant does not mean “no forces.”',
      '<div class="vxSplit"><svg class="vxSvg" viewBox="0 0 430 245">' + arrow('vxea','#2f7774') + arrow('vxeb','#a25f2f') + arrow('vxec','#6b7d91') + '<circle cx="215" cy="120" r="8" fill="#303b37"/><line x1="215" y1="120" x2="90" y2="65" stroke="#2f7774" stroke-width="5" marker-end="url(#vxea)"/><line x1="215" y1="120" x2="355" y2="75" stroke="#a25f2f" stroke-width="5" marker-end="url(#vxeb)"/><line x1="215" y1="120" x2="215" y2="220" stroke="#6b7d91" stroke-width="5" marker-end="url(#vxec)"/><text x="80" y="53">T₁</text><text x="347" y="62">T₂</text><text x="228" y="212">W</text></svg><div class="vxSteps"><div><b>x</b><span>right = left</span></div><div><b>y</b><span>up = down</span></div><div class="vxEm"><strong>ΣFx = 0</strong><strong>ΣFy = 0</strong></div></div></div>'
    );
  }

  function fbd() {
    return wrap('The FBD is the physics model', 'Erase the surroundings; keep only the forces they exert.',
      '<div class="vxFbd"><div><span>SPACE DIAGRAM</span><svg class="vxSvg" viewBox="0 0 280 190"><line x1="35" y1="30" x2="140" y2="115" stroke="#70776f" stroke-width="5"/><line x1="245" y1="30" x2="140" y2="115" stroke="#70776f" stroke-width="5"/><rect x="115" y="115" width="50" height="48" fill="#d9d1c4" stroke="#5f6862" stroke-width="2"/></svg></div><i>→ isolate →</i><div><span>FREE-BODY DIAGRAM</span><svg class="vxSvg" viewBox="0 0 280 190">' + arrow('vxf1','#2f7774') + arrow('vxf2','#a25f2f') + arrow('vxf3','#6b7d91') + '<circle cx="140" cy="90" r="7" fill="#303b37"/><line x1="140" y1="90" x2="55" y2="25" stroke="#2f7774" stroke-width="5" marker-end="url(#vxf1)"/><line x1="140" y1="90" x2="230" y2="25" stroke="#a25f2f" stroke-width="5" marker-end="url(#vxf2)"/><line x1="140" y1="90" x2="140" y2="175" stroke="#6b7d91" stroke-width="5" marker-end="url(#vxf3)"/><text x="45" y="18">T₁</text><text x="225" y="18">T₂</text><text x="151" y="168">W</text></svg></div></div>',
      'A cable disappears from the FBD and becomes a tension arrow along the cable direction.'
    );
  }

  function direction3d() {
    return wrap('3D direction is a pipeline, not a formula dump', 'Points → direction vector → unit vector → force.',
      '<div class="vxPipeline"><div><b>1</b><span>Subtract points</span><code>d = B − A</code><small>A→B means B minus A.</small></div><i>→</i><div><b>2</b><span>Normalize</span><code>λ = d / |d|</code><small>Keep direction, remove magnitude.</small></div><i>→</i><div><b>3</b><span>Scale</span><code>F = Fλ</code><small>Magnitude × direction.</small></div></div><svg class="vxSvg vxWide" viewBox="0 0 700 220">' + arrow('vxd3','#2f7774') + '<line x1="115" y1="175" x2="610" y2="175" stroke="#98988f"/><line x1="115" y1="175" x2="115" y2="30" stroke="#98988f"/><line x1="115" y1="175" x2="45" y2="215" stroke="#98988f"/><circle cx="235" cy="145" r="6" fill="#a25f2f"/><circle cx="500" cy="65" r="6" fill="#2f7774"/><line x1="235" y1="145" x2="500" y2="65" stroke="#2f7774" stroke-width="6" marker-end="url(#vxd3)"/><text x="218" y="135">A</text><text x="510" y="62">B</text><text x="330" y="88" class="vxAccent">d = B − A</text><text x="620" y="180">x</text><text x="105" y="20">z</text><text x="28" y="218">y</text></svg>'
    );
  }

  function moment() {
    return wrap('Moment is turning tendency', 'Change the angle and see why perpendicular force creates the largest moment.',
      '<div class="vxInteractive" data-vx-moment><svg class="vxSvg vxPlot" viewBox="0 0 470 270">' + arrow('vxmf','#a25f2f') + '<circle cx="75" cy="210" r="9" fill="#303b37"/><line x1="75" y1="210" x2="350" y2="210" stroke="#65716b" stroke-width="6"/><circle cx="350" cy="210" r="6" fill="#2f7774"/><line data-vx-mf x1="350" y1="210" x2="350" y2="75" stroke="#a25f2f" stroke-width="6" marker-end="url(#vxmf)"/><text x="62" y="240">O</text><text x="170" y="198">r = 2.0 m</text></svg><div class="vxControls"><label><span>ANGLE BETWEEN r AND F</span><input data-vx-m-angle type="range" min="0" max="180" value="90"><b data-vx-m-angle-out>90°</b></label><div><span>|M| = rF sin θ</span><strong data-vx-m-out>200.0 N·m</strong></div><p>Here r = 2 m and F = 100 N. Parallel → 0. Perpendicular → maximum.</p></div></div>',
      'The cross product magnitude is just force × perpendicular distance to the line of action.'
    );
  }

  function axisMoment() {
    return wrap('Moment about an axis is a projection', 'Find the full moment first, then keep the part along the requested axis.',
      '<div class="vxPipeline"><div><b>A</b><span>Position</span><code>r</code><small>From a point on the axis to the force point.</small></div><i>×</i><div><b>B</b><span>Full moment</span><code>M = r × F</code><small>3D turning tendency.</small></div><i>·</i><div><b>C</b><span>Axis component</span><code>Maxis = λ · M</code><small>Project M onto the axis direction.</small></div></div>'
    );
  }

  function operations() {
    return wrap('Dot, cross, and triple products answer different questions', 'Choose the operation from the geometry.',
      '<div class="vxOps"><div><span>DOT ·</span><b>Projection / angle</b><small>“How much lies along this direction?”</small></div><div><span>CROSS ×</span><b>Perpendicular / moment</b><small>“What turning effect do these vectors create?”</small></div><div><span>TRIPLE ·(×)</span><b>Axis moment / volume</b><small>“Project a cross product along a direction.”</small></div></div>'
    );
  }

  function support() {
    return wrap('Support reactions come from blocked motion', 'Do not memorize arrows. Start by asking which motions the support makes impossible.',
      `<div class="vxSupportLesson">
        <section class="vxSupportIdea">
          <div class="vxSupportIdeaText">
            <span class="vxEyebrow">THE CORE IDEA</span>
            <strong>A rigid body in 2D has three possible motions.</strong>
            <p>It can translate in <b>x</b>, translate in <b>y</b>, and rotate. A support creates a reaction only in the motion directions that it prevents.</p>
          </div>
          <div class="vxDof">
            <div><b>↔</b><span>x translation</span><small>Can it slide left/right?</small></div>
            <div><b>↕</b><span>y translation</span><small>Can it move up/down?</small></div>
            <div><b>↻</b><span>rotation</span><small>Can it turn?</small></div>
          </div>
        </section>

        <div class="vxSupportRule">
          <b>ONE BLOCKED MOTION → ONE REACTION UNKNOWN</b>
          <span>The reaction acts in whatever direction is needed to enforce that constraint. If your assumed arrow is wrong, the solved value simply comes out negative.</span>
        </div>

        <div class="vxSupports">
          <div>
            <span>ROLLER / SMOOTH CONTACT</span>
            <svg viewBox="0 0 200 120"><line x1="25" y1="50" x2="175" y2="50" stroke="#5e6862" stroke-width="7"/><circle cx="80" cy="70" r="10" fill="none" stroke="#2f7774" stroke-width="4"/><circle cx="120" cy="70" r="10" fill="none" stroke="#2f7774" stroke-width="4"/><line x1="35" y1="87" x2="165" y2="87" stroke="#8c897f" stroke-width="3"/><path d="M100 48 L100 15" stroke="#a25f2f" stroke-width="5"/></svg>
            <b>1 reaction</b>
            <small>Blocks motion <em>through</em> the surface. It can still slide along the surface and rotate.</small>
            <code>N ⟂ surface</code>
          </div>
          <div>
            <span>PIN / HINGE</span>
            <svg viewBox="0 0 200 120"><line x1="25" y1="50" x2="175" y2="50" stroke="#5e6862" stroke-width="7"/><circle cx="100" cy="50" r="13" fill="#eee8dc" stroke="#2f7774" stroke-width="4"/><path d="M100 45 L100 15 M95 50 L55 50" stroke="#a25f2f" stroke-width="5"/></svg>
            <b>2 reactions</b>
            <small>Stops translation in both planar directions, but the body can still rotate about the pin.</small>
            <code>Aₓ , Aᵧ</code>
          </div>
          <div>
            <span>FIXED SUPPORT</span>
            <svg viewBox="0 0 200 120"><rect x="28" y="20" width="22" height="72" fill="#d8d0c3" stroke="#5e6862" stroke-width="3"/><line x1="50" y1="55" x2="165" y2="55" stroke="#5e6862" stroke-width="7"/><path d="M85 50 L85 15 M80 55 L55 55" stroke="#a25f2f" stroke-width="5"/><path d="M128 82 A28 28 0 1 0 128 35" fill="none" stroke="#2f7774" stroke-width="4"/></svg>
            <b>3 reactions</b>
            <small>Stops x translation, y translation, and rotation.</small>
            <code>Aₓ , Aᵧ , M_A</code>
          </div>
        </div>

        <section class="vxSupportDetails">
          <div>
            <span class="vxEyebrow">WHY THE ARROWS LOOK LIKE THIS</span>
            <h4>Think in constraints, not support names</h4>
            <p>A reaction is the force or couple the surroundings exert on the body so that the forbidden motion does not occur. The support picture tells you what is forbidden; your free-body diagram replaces the support picture with those unknown reactions.</p>
            <div class="vxSupportMatrix">
              <div class="head">Connection</div><div class="head">What it can do</div><div class="head">What appears on the FBD</div>
              <div><b>Roller / smooth surface</b></div><div>slide tangentially + rotate</div><div>one normal force</div>
              <div><b>Pin / hinge</b></div><div>rotate only</div><div>two force components</div>
              <div><b>Fixed</b></div><div>no planar motion</div><div>two force components + one couple moment</div>
              <div><b>Cable</b></div><div>can only pull along itself</div><div>one tension force along the cable</div>
              <div><b>Short link</b></div><div>force transmitted along its axis</div><div>one force along the link; tension or compression</div>
            </div>
          </div>

          <div>
            <span class="vxEyebrow">CABLES AND LINKS</span>
            <h4>Direction can be known even when magnitude is not</h4>
            <div class="vxMiniCases">
              <div><b>Cable</b><p>The line of action is known: it lies along the cable. A cable cannot push, so the force is tension and pulls away from the body.</p><code>T along cable</code></div>
              <div><b>Short link</b><p>If the link is a two-force member, the end forces must be collinear with the link. The unknown may turn out to be tension or compression.</p><code>F along link</code></div>
              <div><b>Smooth contact</b><p>No friction means the contact cannot exert a tangential force. Only the normal reaction remains.</p><code>N ⟂ surface</code></div>
            </div>
          </div>
        </section>

        <section class="vxSupportWalk">
          <span class="vxEyebrow">HOW TO DRAW SUPPORT REACTIONS ON AN FBD</span>
          <h4>Use the same four questions every time</h4>
          <div class="vxSteps">
            <div><b>1</b><span><strong>Isolate the body.</strong> Remove the wall, floor, pin, cable, or other surrounding object from the drawing.</span></div>
            <div><b>2</b><span><strong>Ask what motion that connection prevented.</strong> Horizontal? Vertical? Rotation? Along or normal to a surface?</span></div>
            <div><b>3</b><span><strong>Replace each blocked motion with an unknown reaction.</strong> Do not add reactions for motions the support allows.</span></div>
            <div><b>4</b><span><strong>Then write equilibrium.</strong> For a planar rigid body: <code>ΣFₓ = 0</code>, <code>ΣFᵧ = 0</code>, <code>ΣM = 0</code>.</span></div>
          </div>
        </section>

        <section class="vxSupportExample">
          <div>
            <span class="vxEyebrow">CLASSIC BEAM EXAMPLE</span>
            <h4>Pin at A + roller at B</h4>
            <p>The pin at A blocks x and y translation, so it contributes <b>Aₓ</b> and <b>Aᵧ</b>. The roller at B sits on a horizontal surface, so it contributes only the vertical reaction <b>Bᵧ</b>. The beam can rotate at both connections, so neither one contributes a reaction moment.</p>
            <div class="vxEquationStrip"><code>unknowns: Aₓ, Aᵧ, Bᵧ</code><span>↔</span><code>equations: ΣFₓ=0, ΣFᵧ=0, ΣM=0</code></div>
            <p class="vxSupportPunch"><strong>This is why a pin + roller is so common:</strong> in 2D it gives exactly three external reaction unknowns, matching the three independent rigid-body equilibrium equations.</p>
          </div>
          <svg class="vxBeamSvg" viewBox="0 0 520 235">
            <defs><marker id="vxsupA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#a25f2f"/></marker><marker id="vxsupB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#2f7774"/></marker></defs>
            <line x1="90" y1="105" x2="430" y2="105" stroke="#5e6862" stroke-width="10"/>
            <circle cx="115" cy="105" r="12" fill="#eee8dc" stroke="#2f7774" stroke-width="4"/>
            <polygon points="92,145 138,145 115,117" fill="#d8d0c3" stroke="#6f756f" stroke-width="2"/>
            <circle cx="405" cy="130" r="11" fill="none" stroke="#2f7774" stroke-width="4"/>
            <line x1="375" y1="148" x2="435" y2="148" stroke="#8c897f" stroke-width="3"/>
            <line x1="115" y1="100" x2="115" y2="40" stroke="#a25f2f" stroke-width="5" marker-end="url(#vxsupA)"/>
            <line x1="110" y1="105" x2="52" y2="105" stroke="#a25f2f" stroke-width="5" marker-end="url(#vxsupA)"/>
            <line x1="405" y1="125" x2="405" y2="55" stroke="#2f7774" stroke-width="5" marker-end="url(#vxsupB)"/>
            <text x="124" y="48">Aᵧ</text><text x="48" y="94">Aₓ</text><text x="415" y="62">Bᵧ</text><text x="105" y="172">pin A</text><text x="386" y="172">roller B</text>
          </svg>
        </section>

        <section class="vxSupportMistakes">
          <span class="vxEyebrow">COMMON MISTAKES</span>
          <div>
            <p><b>Adding a horizontal force at a frictionless roller.</b><br>The roller allows tangential sliding, so there is no tangential reaction.</p>
            <p><b>Adding a moment at a pin.</b><br>A pin allows rotation, so it cannot supply a reaction couple in the ideal 2D model.</p>
            <p><b>Forcing the guessed arrow direction to be correct.</b><br>Choose a convenient direction. A negative answer means the real reaction acts opposite to your arrow.</p>
            <p><b>Drawing a cable force in x and y immediately.</b><br>The cable has one unknown magnitude and a known line of action. Resolve it into components only when writing equations.</p>
          </div>
        </section>
      </div>`,
      'Quick check: cover the reaction arrows in any support diagram and ask, “Which x/y/rotation motions are impossible?” The reactions should follow from your answer.'
    );
  }

  function forceCouple() {
    return wrap('Moving a force requires a couple', 'Otherwise you changed the turning effect of the original force.',
      '<div class="vxFbd"><div><span>ORIGINAL</span><svg class="vxSvg" viewBox="0 0 280 160">' + arrow('vxfc1','#a25f2f') + '<circle cx="55" cy="120" r="6" fill="#303b37"/><line x1="55" y1="120" x2="200" y2="120" stroke="#68736d" stroke-width="5"/><line x1="200" y1="115" x2="200" y2="35" stroke="#a25f2f" stroke-width="6" marker-end="url(#vxfc1)"/></svg></div><i>≡</i><div><span>MOVED TO O</span><svg class="vxSvg" viewBox="0 0 280 160">' + arrow('vxfc2','#a25f2f') + '<circle cx="70" cy="120" r="6" fill="#303b37"/><line x1="70" y1="115" x2="70" y2="35" stroke="#a25f2f" stroke-width="6" marker-end="url(#vxfc2)"/><path d="M125 115 A45 45 0 1 0 125 50" fill="none" stroke="#2f7774" stroke-width="5"/><text x="145" y="70">M = r × F</text></svg></div></div>'
    );
  }

  function reduction() {
    return wrap('Reduce a force system by preserving force and moment', 'Matching ΣF alone can give the wrong rigid-body effect.',
      '<div class="vxCompare"><div><span>ORIGINAL SYSTEM</span><strong>Many applied forces and couples</strong><code>ΣF, ΣM</code><small>Compute both.</small></div><i>→</i><div><span>EQUIVALENT AT O</span><strong>One resultant force + one resultant moment</strong><code>R = ΣF<br>M₀ = Σ(r×F)+ΣM</code><small>Same external effect.</small></div></div>'
    );
  }

  function rigidEq() {
    return wrap('A rigid body must satisfy translation and rotation equilibrium', 'A body can have zero net force and still rotate.',
      '<div class="vxCompare"><div><span>TRANSLATION</span><strong>No linear acceleration</strong><code>ΣFx = 0<br>ΣFy = 0</code><small>Forces balance.</small></div><i>+</i><div><span>ROTATION</span><strong>No angular acceleration</strong><code>ΣM = 0</code><small>Moments balance.</small></div></div>'
    );
  }

  function triple() {
    return wrap('The scalar triple product is signed volume', 'Zero volume means the three vectors are coplanar.',
      '<div class="vxSplit"><svg class="vxSvg" viewBox="0 0 430 245"><path d="M90 200 L240 200 L330 150 L180 150 Z M90 200 L90 95 L180 40 L180 150 M240 200 L240 95 L330 40 L330 150 M90 95 L240 95 L330 40" fill="rgba(47,119,116,.04)" stroke="#747d76" stroke-width="2"/><line x1="90" y1="200" x2="240" y2="200" stroke="#2f7774" stroke-width="5"/><line x1="90" y1="200" x2="180" y2="150" stroke="#a25f2f" stroke-width="5"/><line x1="90" y1="200" x2="90" y2="95" stroke="#6b7d91" stroke-width="5"/><text x="165" y="222">a</text><text x="125" y="163">b</text><text x="72" y="140">c</text></svg><div class="vxSteps"><div><b>1</b><span>a × b gives a normal to the base plane.</span></div><div><b>2</b><span>Dot with c measures height along that normal.</span></div><div><b>0</b><span>If the result is zero, c lies in the plane.</span></div></div></div>'
    );
  }

  function workflow() {
    return wrap('Use a workflow instead of hunting for formulas', 'The diagram tells you which equation comes next.',
      '<div class="vxFlow"><div><b>1</b><span>Choose body / particle</span></div><i>→</i><div><b>2</b><span>Draw FBD + geometry</span></div><i>→</i><div><b>3</b><span>Resolve vectors</span></div><i>→</i><div><b>4</b><span>Use ΣF, r×F, axis projection, or ΣM</span></div><i>→</i><div><b>5</b><span>Check sign, direction, units</span></div></div>'
    );
  }

  var rules = [
    [/trigonometry and vector review/i, trig],
    [/force as a vector and the resultant/i, resultant],
    [/rectangular components and unit vectors/i, components],
    [/resultant problems and equilibrium problems/i, resultVsEq],
    [/equilibrium of a particle/i, equilibrium],
    [/space diagram vs\. free-body diagram|particle fbd: the full reasoning chain/i, fbd],
    [/adding forces in space|3d direction: the order of points|3d force from an axis angle/i, direction3d],
    [/moment of a force about a point|moment: what .* is actually measuring/i, moment],
    [/moment of a force about a given axis/i, axisMoment],
    [/what the vector operations are for|dot, cross, or triple product/i, operations],
    [/mixed triple product|triple-product sign and the coplanar test/i, triple],
    [/move a force by adding a couple/i, forceCouple],
    [/reduce a general force system|beam force-system reduction|when a force-couple system can become one force/i, reduction],
    [/2d support and connection reactions|support reactions come from constrained motion/i, support],
    [/equilibrium of a rigid body in two dimensions|how to solve a rigid-body equilibrium problem without guessing/i, rigidEq],
    [/quiz problem workflow/i, workflow]
  ];

  function inject() {
    var sections = host.querySelectorAll('.sectionContent');
    for (var s = 0; s < sections.length; s++) {
      var section = sections[s];
      if (section.querySelector(':scope > [data-vx-card]')) continue;
      var h = section.querySelector(':scope > h3');
      if (!h) continue;
      var title = h.textContent.trim();
      for (var r = 0; r < rules.length; r++) {
        if (!rules[r][0].test(title)) continue;
        var tmp = document.createElement('div');
        tmp.innerHTML = rules[r][1]();
        var node = tmp.firstElementChild;
        var anchor = h.nextElementSibling && h.nextElementSibling.tagName === 'P' ? h.nextElementSibling : h;
        anchor.insertAdjacentElement('afterend', node);
        break;
      }
    }
    bind();
  }

  function bind() {
    var comps = host.querySelectorAll('[data-vx-components]:not([data-vx-ready])');
    for (var i = 0; i < comps.length; i++) {
      (function(root) {
        root.dataset.vxReady = '1';
        var slider = root.querySelector('[data-vx-angle]');
        var out = root.querySelector('[data-vx-angle-out]');
        var fx = root.querySelector('[data-vx-fx]');
        var fy = root.querySelector('[data-vx-fy]');
        var f = root.querySelector('[data-vx-f]');
        var x = root.querySelector('[data-vx-x]');
        var y = root.querySelector('[data-vx-y]');
        var dx = root.querySelector('[data-vx-dx]');
        var dy = root.querySelector('[data-vx-dy]');
        function update() {
          var deg = Number(slider.value);
          var rad = deg * Math.PI / 180;
          var ox = 230, oy = 142, len = 125;
          var ex = ox + len * Math.cos(rad);
          var ey = oy - len * Math.sin(rad);
          f.setAttribute('x1',ox); f.setAttribute('y1',oy); f.setAttribute('x2',ex); f.setAttribute('y2',ey);
          x.setAttribute('x1',ox); x.setAttribute('y1',oy); x.setAttribute('x2',ex); x.setAttribute('y2',oy);
          y.setAttribute('x1',ex); y.setAttribute('y1',oy); y.setAttribute('x2',ex); y.setAttribute('y2',ey);
          dx.setAttribute('x1',ex); dx.setAttribute('x2',ex); dx.setAttribute('y1',ey); dx.setAttribute('y2',oy);
          dy.setAttribute('x1',ox); dy.setAttribute('x2',ex); dy.setAttribute('y1',ey); dy.setAttribute('y2',ey);
          var sx = 100 * Math.cos(rad), sy = 100 * Math.sin(rad);
          if (Math.abs(sx) < 1e-10) sx = 0;
          if (Math.abs(sy) < 1e-10) sy = 0;
          out.textContent = deg + '°';
          fx.textContent = sx.toFixed(1) + ' N';
          fy.textContent = sy.toFixed(1) + ' N';
        }
        slider.addEventListener('input', update);
        update();
      })(comps[i]);
    }

    var moments = host.querySelectorAll('[data-vx-moment]:not([data-vx-ready])');
    for (var j = 0; j < moments.length; j++) {
      (function(root) {
        root.dataset.vxReady = '1';
        var slider = root.querySelector('[data-vx-m-angle]');
        var out = root.querySelector('[data-vx-m-angle-out]');
        var mout = root.querySelector('[data-vx-m-out]');
        var line = root.querySelector('[data-vx-mf]');
        function update() {
          var deg = Number(slider.value);
          var rad = deg * Math.PI / 180;
          var ox = 350, oy = 210, len = 120;
          line.setAttribute('x2', ox + len * Math.cos(rad));
          line.setAttribute('y2', oy - len * Math.sin(rad));
          var m = 200 * Math.sin(rad);
          if (Math.abs(m) < 1e-10) m = 0;
          out.textContent = deg + '°';
          mout.textContent = m.toFixed(1) + ' N·m';
        }
        slider.addEventListener('input', update);
        update();
      })(moments[j]);
    }
  }

  new MutationObserver(function() { requestAnimationFrame(inject); }).observe(host, {childList:true, subtree:true});
  inject();
})();