(() => {
  "use strict";

  var host = document.getElementById("lessonContentHost");
  if (!host || window.__STATICS_WORKED_VISUALS__) return;
  window.__STATICS_WORKED_VISUALS__ = true;

  function arrow(id, color) {
    return '<defs><marker id="' + id + '" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="' + color + '"></path></marker></defs>';
  }

  function frame(title, subtitle, body, note) {
    return '<aside class="exViz" data-example-visual><div class="exVizHead"><span>EXAMPLE MAP</span><div><strong>' + title + '</strong><small>' + subtitle + '</small></div></div><div class="exVizBody">' + body + '</div>' + (note ? '<div class="exVizNote">' + note + '</div>' : '') + '</aside>';
  }

  function unitExamples() {
    return frame(
      "See what each conversion is doing",
      "The numbers change because the unit scale changes; the physical quantity does not.",
      '<div class="exMiniGrid">' +
        '<div><span>WEIGHT</span><svg viewBox="0 0 210 120">' + arrow("ewu","#a25f2f") + '<rect x="80" y="25" width="50" height="38" fill="#e3dccf" stroke="#5d6862"/><line x1="105" y1="63" x2="105" y2="108" stroke="#a25f2f" stroke-width="5" marker-end="url(#ewu)"/><text x="116" y="98">W = mg</text></svg><b>1 kg × 9.81 m/s²</b><strong>9.81 N</strong></div>' +
        '<div><span>AREA</span><svg viewBox="0 0 210 120"><rect x="58" y="24" width="92" height="68" fill="rgba(47,119,116,.05)" stroke="#2f7774" stroke-width="2"/><text x="74" y="112">each length × 0.0254</text><text x="72" y="58">in² → m²</text></svg><b>both dimensions convert</b><strong>factor gets squared</strong></div>' +
        '<div><span>MOMENT UNIT</span><svg viewBox="0 0 210 120"><line x1="35" y1="82" x2="165" y2="82" stroke="#626d67" stroke-width="6"/><path d="M115 78 A32 32 0 1 0 115 30" fill="none" stroke="#2f7774" stroke-width="4"/><text x="52" y="108">force × distance</text></svg><b>convert force and length</b><strong>kN·m → lbf·in</strong></div>' +
      '</div>',
      "For squared or cubed units, the length conversion factor must also be squared or cubed."
    );
  }

  function twoForce() {
    return frame(
      "40 N + 60 N: build the geometry before the law of cosines",
      "P is 20° above +x. Q is another 25° above P, so Q is 45° above +x.",
      '<div class="exTwoPanel"><div><span>1 · ORIGINAL VECTORS</span><svg class="exSvg" viewBox="0 0 430 235">' +
        arrow("etfa","#a25f2f") + arrow("etfr","#2f7774") +
        '<line x1="55" y1="190" x2="390" y2="190" stroke="#a8a399"/><circle cx="85" cy="190" r="5" fill="#303b37"/>' +
        '<line x1="85" y1="190" x2="225" y2="139" stroke="#a25f2f" stroke-width="5" marker-end="url(#etfa)"/>' +
        '<line x1="85" y1="190" x2="222" y2="53" stroke="#a25f2f" stroke-width="5" marker-end="url(#etfa)"/>' +
        '<line x1="85" y1="190" x2="365" y2="78" stroke="#2f7774" stroke-width="6" marker-end="url(#etfr)"/>' +
        '<path d="M120 190 A35 35 0 0 0 117 178" fill="none" stroke="#b86d31" stroke-width="3"/><text x="124" y="180">20°</text>' +
        '<text x="202" y="150">P = 40 N</text><text x="177" y="47">Q = 60 N</text><text x="315" y="95" class="exAccent">R</text></svg></div>' +
        '<div><span>2 · FORCE TRIANGLE</span><svg class="exSvg" viewBox="0 0 430 235">' +
        arrow("etft","#2f7774") +
        '<line x1="70" y1="180" x2="220" y2="125" stroke="#a25f2f" stroke-width="5"/>' +
        '<line x1="220" y1="125" x2="340" y2="30" stroke="#a25f2f" stroke-width="5"/>' +
        '<line x1="70" y1="180" x2="340" y2="30" stroke="#2f7774" stroke-width="6" marker-end="url(#etft)"/>' +
        '<text x="120" y="145">40 N</text><text x="265" y="82">60 N</text><text x="190" y="92" class="exAccent">R = 97.73 N</text>' +
        '<text x="205" y="153">155°</text></svg></div></div>' +
        '<div class="exWhyRow"><div><b>Why 155°?</b><span>The force directions differ by 25°. The interior angle of the head-to-tail force triangle is the supplement: 180° − 25° = 155°.</span></div><div><b>Then</b><span>Law of cosines finds R. Law of sines finds the small direction correction A.</span></div></div>'
    );
  }

  function tugboat() {
    return frame(
      "Minimum tension becomes a right-triangle problem",
      "At the minimum-T₂ condition, the two rope-force directions are perpendicular.",
      '<div class="exTwoPanel"><div><span>FORCE TRIANGLE AT THE MINIMUM</span><svg class="exSvg" viewBox="0 0 430 230">' +
        '<path d="M70 185 L335 185 L335 35 Z" fill="rgba(47,119,116,.05)" stroke="#66736d" stroke-width="2"/>' +
        '<path d="M315 185 L315 165 L335 165" fill="none" stroke="#918d83" stroke-width="2"/>' +
        '<path d="M105 185 A35 35 0 0 0 100 167" fill="none" stroke="#b86d31" stroke-width="3"/>' +
        '<text x="111" y="169">30°</text><text x="180" y="207">T₁ ≈ 4330 lbf</text><text x="350" y="125" transform="rotate(-90 350 125)">T₂,min = 2500 lbf</text><text x="175" y="92" transform="rotate(-29 175 92)" class="exAccent">R = 5000 lbf</text></svg></div>' +
        '<div class="exSolveStack"><div><span>opposite 30°</span><strong>T₂,min = 5000 sin 30° = 2500 lbf</strong></div><div><span>adjacent 30°</span><strong>T₁ = 5000 cos 30° ≈ 4330 lbf</strong></div><div><span>physical idea</span><strong>The rope directions being 90° apart makes the required T₂ as small as possible.</strong></div></div></div>',
      "This panel shows the minimum-condition force triangle, not a scaled drawing of the boats."
    );
  }

  function fourForce() {
    return frame(
      "After resolving all four forces, the problem is just one right triangle",
      "The individual forces have already been compressed into Rx = 199.1 N and Ry = 14.3 N.",
      '<div class="exTwoPanel"><svg class="exSvg exWide" viewBox="0 0 500 245">' +
        arrow("effx","#a25f2f") + arrow("effy","#6b7d91") + arrow("effr","#2f7774") +
        '<circle cx="70" cy="185" r="5" fill="#303b37"/><line x1="70" y1="185" x2="390" y2="185" stroke="#a25f2f" stroke-width="5" marker-end="url(#effx)"/>' +
        '<line x1="390" y1="185" x2="390" y2="162" stroke="#6b7d91" stroke-width="5" marker-end="url(#effy)"/>' +
        '<line x1="70" y1="185" x2="390" y2="162" stroke="#2f7774" stroke-width="6" marker-end="url(#effr)"/>' +
        '<text x="190" y="211">Rx = 199.1 N</text><text x="405" y="180">Ry = 14.3 N</text><text x="235" y="151" class="exAccent">R = 199.6 N</text><text x="142" y="177">4.1°</text></svg>' +
        '<div class="exSolveStack"><div><span>magnitude</span><strong>R = √(Rx² + Ry²)</strong></div><div><span>direction</span><strong>α = atan2(Ry, Rx) ≈ 4.1°</strong></div></div></div>'
    );
  }

  function equilibriumExamples() {
    return frame(
      "Turn each physical setup into a force picture first",
      "The source values are kept; where the full lecture geometry is not reproduced on the site, the drawings below are schematic.",
      '<div class="exTwoPanel"><div class="exSchematic"><span>SHIP UNLOADING · SCHEMATIC</span><svg class="exSvg" viewBox="0 0 430 245">' +
        arrow("esua","#2f7774") + arrow("esub","#a25f2f") + arrow("esuw","#6b7d91") +
        '<circle cx="215" cy="115" r="8" fill="#303b37"/>' +
        '<line x1="215" y1="115" x2="75" y2="35" stroke="#2f7774" stroke-width="5" marker-end="url(#esua)"/>' +
        '<line x1="215" y1="115" x2="360" y2="45" stroke="#a25f2f" stroke-width="5" marker-end="url(#esub)"/>' +
        '<line x1="215" y1="115" x2="215" y2="220" stroke="#6b7d91" stroke-width="5" marker-end="url(#esuw)"/>' +
        '<text x="65" y="27">T_AB ≈ 3570 lbf</text><text x="310" y="36">T_AC ≈ 144 lbf</text><text x="225" y="210">3500 lbf</text></svg><p>At the junction, all three force vectors must close to zero.</p></div>' +
        '<div class="exSchematic"><span>SAILBOAT · FORCE INVENTORY</span><div class="exForceInventory"><div class="known"><b>KNOWN</b><span>T_AB = 40 lbf</span><span>T_AE = 60 lbf</span><span>α = 60.26°</span><span>β = 20.56°</span></div><div class="unknown"><b>SOLVE</b><span>T_AC ≈ 42.9 lbf</span><span>F_D ≈ 19.66 lbf</span></div></div><div class="exEquationPath"><span>resolve every cable force</span><i>→</i><span>ΣFx = 0</span><i>+</i><span>ΣFy = 0</span></div></div></div>',
      "For the ship and sailboat examples, use the exact lecture angles/attachment geometry when reproducing the full FBD. The site text currently preserves the stated forces/results but not every geometric detail."
    );
  }

  function guyWire() {
    return frame(
      "The 2500-N guy wire is magnitude × direction",
      "The geometry gives a direction change of −40 i + 80 j + 30 k from A to B.",
      '<div class="exTwoPanel"><svg class="exSvg exWide" viewBox="0 0 500 280">' +
        arrow("egw","#2f7774") +
        '<line x1="125" y1="215" x2="440" y2="215" stroke="#99988f"/><line x1="125" y1="215" x2="125" y2="40" stroke="#99988f"/><line x1="125" y1="215" x2="55" y2="255" stroke="#99988f"/>' +
        '<circle cx="265" cy="185" r="6" fill="#a25f2f"/><circle cx="395" cy="75" r="6" fill="#2f7774"/><line x1="265" y1="185" x2="395" y2="75" stroke="#2f7774" stroke-width="6" marker-end="url(#egw)"/>' +
        '<text x="246" y="176">A</text><text x="405" y="72">B</text><text x="285" y="112" class="exAccent">A → B</text><text x="330" y="235">Δx = −40</text><text x="130" y="55">Δy = +80</text><text x="52" y="268">Δz = +30</text></svg>' +
        '<div class="exSolveStack"><div><span>1 · length</span><strong>|AB| ≈ 94.3 m</strong></div><div><span>2 · unit vector</span><strong>λ ≈ (−0.424, 0.848, 0.318)</strong></div><div><span>3 · force</span><strong>F = 2500 λ ≈ (−1060, 2120, 795) N</strong></div></div></div>',
      "The signs come from the A→B coordinate changes. Reversing the point order would reverse the force direction."
    );
  }

  function lever() {
    return frame(
      "Moment depends on perpendicular distance, not just lever length",
      "The same required moment can be created by different force magnitudes if their moment arms differ.",
      '<div class="exThreePanel"><div><span>100-lb VERTICAL FORCE</span><svg class="exSvg" viewBox="0 0 300 200">' +
        arrow("elv","#a25f2f") + '<circle cx="55" cy="155" r="7" fill="#303b37"/><line x1="55" y1="155" x2="205" y2="68" stroke="#62706a" stroke-width="7"/><line x1="205" y1="68" x2="205" y2="160" stroke="#a25f2f" stroke-width="6" marker-end="url(#elv)"/><line x1="55" y1="174" x2="205" y2="174" stroke="#8f8c83" stroke-dasharray="5 4"/><text x="105" y="49">24 in @ 60°</text><text x="98" y="194">d⊥ = 12 in</text><text x="215" y="125">100 lb</text></svg><b>M = 100(12) = 1200 lb·in</b></div>' +
        '<div><span>HORIZONTAL FORCE</span><svg class="exSvg" viewBox="0 0 300 200">' + arrow("elh","#2f7774") + '<circle cx="55" cy="155" r="7" fill="#303b37"/><line x1="55" y1="155" x2="205" y2="68" stroke="#62706a" stroke-width="7"/><line x1="205" y1="68" x2="270" y2="68" stroke="#2f7774" stroke-width="6" marker-end="url(#elh)"/><line x1="35" y1="68" x2="35" y2="155" stroke="#8f8c83" stroke-dasharray="5 4"/><text x="43" y="112">20.8 in</text><text x="210" y="57">57.7 lb</text></svg><b>Same M with a longer moment arm</b></div>' +
        '<div><span>SMALLEST POSSIBLE FORCE</span><svg class="exSvg" viewBox="0 0 300 200">' + arrow("elp","#6b7d91") + '<circle cx="55" cy="155" r="7" fill="#303b37"/><line x1="55" y1="155" x2="205" y2="68" stroke="#62706a" stroke-width="7"/><line x1="205" y1="68" x2="260" y2="163" stroke="#6b7d91" stroke-width="6" marker-end="url(#elp)"/><path d="M198 74 l13 8 l8 -13" fill="none" stroke="#8f8c83" stroke-width="2"/><text x="212" y="185">Fmin = 50 lb</text></svg><b>Force ⟂ OA → full 24-in moment arm</b></div></div>'
    );
  }

  function cableMoment() {
    return frame(
      "3D cable moment: direction first, moment second",
      "Every vector has a job. Do not cross arbitrary coordinates together.",
      '<div class="exPipeline"><div><b>1</b><span>Position to force point</span><strong>r_C/A = (0.30, 0, 0.08) m</strong></div><i>→</i><div><b>2</b><span>Cable direction C→D</span><strong>(−0.30, 0.24, −0.32) m</strong></div><i>→</i><div><b>3</b><span>Normalize and scale by 200 N</span><strong>F = (−120, 96, −128) N</strong></div><i>→</i><div><b>4</b><span>Moment about A</span><strong>M_A = r_C/A × F</strong></div></div>' +
        '<div class="exVectorMeaning"><div><span>r starts at</span><b>A</b><small>the moment center</small></div><div><span>r ends at</span><b>C</b><small>where the force acts</small></div><div><span>F points</span><b>C → D</b><small>along the cable tension</small></div><div><span>result</span><b>(−7.68, 28.8, 28.8)</b><small>N·m</small></div></div>',
      "This uses the exact intermediate vectors already given in the detailed lesson."
    );
  }

  function cubeExample() {
    return frame(
      "One point moment can be projected onto different axes",
      "The cube example is really about changing what component of the same turning tendency you ask for.",
      '<div class="exTwoPanel"><svg class="exSvg exWide" viewBox="0 0 470 260"><path d="M95 205 L255 205 L355 150 L195 150 Z M95 205 L95 75 L195 25 L195 150 M255 205 L255 75 L355 25 L355 150 M95 75 L255 75 L355 25" fill="rgba(47,119,116,.04)" stroke="#707a73" stroke-width="2"/><circle cx="95" cy="205" r="5" fill="#303b37"/><text x="78" y="226">A</text><line x1="95" y1="205" x2="255" y2="205" stroke="#a25f2f" stroke-width="5"/><text x="168" y="225">axis AB</text><line x1="95" y1="205" x2="355" y2="25" stroke="#2f7774" stroke-width="5"/><text x="210" y="104" class="exAccent">axis AG</text></svg><div class="exSolveStack"><div><span>full point moment about A</span><strong>M_A = (aP/√2)(i+j+k)</strong></div><div><span>project onto AB</span><strong>M_AB = aP/√2</strong></div><div><span>project onto AG</span><strong>M_AG = −aP/√6</strong></div><div><span>same geometry also gives shortest distance</span><strong>d = a/√6</strong></div></div></div>',
      "The drawing is a schematic cube orientation; use the lecture face/edge labels for the exact force line."
    );
  }

  function beamReduction() {
    return frame(
      "Beam reduction: preserve total force and total moment",
      "The source beam is 4.8 m long with four vertical forces.",
      '<div class="exBeam"><svg class="exSvg" viewBox="0 0 760 280">' +
        arrow("ebup","#2f7774") + arrow("ebdn","#a25f2f") + arrow("ebr","#6b7d91") +
        '<line x1="70" y1="145" x2="690" y2="145" stroke="#626d67" stroke-width="7"/>' +
        '<line x1="70" y1="140" x2="70" y2="70" stroke="#2f7774" stroke-width="5" marker-end="url(#ebup)"/><text x="48" y="62">+150</text>' +
        '<line x1="277" y1="65" x2="277" y2="140" stroke="#a25f2f" stroke-width="5" marker-end="url(#ebdn)"/><text x="250" y="55">−600</text>' +
        '<line x1="432" y1="140" x2="432" y2="92" stroke="#2f7774" stroke-width="5" marker-end="url(#ebup)"/><text x="410" y="84">+100</text>' +
        '<line x1="690" y1="65" x2="690" y2="140" stroke="#a25f2f" stroke-width="5" marker-end="url(#ebdn)"/><text x="662" y="55">−250</text>' +
        '<line x1="474" y1="175" x2="474" y2="245" stroke="#6b7d91" stroke-width="7" marker-end="url(#ebr)"/><text x="490" y="225" class="exAccent">R = −600 N</text>' +
        '<text x="55" y="170">A · 0</text><text x="255" y="170">1.6 m</text><text x="410" y="170">2.8 m</text><text x="655" y="170">B · 4.8 m</text><text x="438" y="270">x = 3.13 m</text></svg></div>' +
        '<div class="exWhyRow"><div><b>Force check</b><span>150 − 600 + 100 − 250 = −600 N.</span></div><div><b>Moment check about A</b><span>−600(1.6) + 100(2.8) − 250(4.8) = −1880 N·m.</span></div><div><b>Place the one force</b><span>x(−600) = −1880 → x ≈ 3.13 m.</span></div></div>'
    );
  }

  function crane() {
    return frame(
      "Crane: choose A as the moment point to delete two unknowns",
      "The geometry in the lesson gives the horizontal rocker reaction B a 1.5-m moment arm about A.",
      '<div class="exTwoPanel"><svg class="exSvg exWide" viewBox="0 0 500 275">' +
        arrow("ecrh","#2f7774") + arrow("ecrv","#a25f2f") +
        '<circle cx="105" cy="95" r="8" fill="#303b37"/><text x="83" y="85">A</text><line x1="105" y1="95" x2="105" y2="225" stroke="#67716c" stroke-width="7"/><circle cx="105" cy="225" r="8" fill="#303b37"/><text x="83" y="250">B</text>' +
        '<line x1="105" y1="225" x2="220" y2="225" stroke="#2f7774" stroke-width="6" marker-end="url(#ecrh)"/><text x="150" y="214">B</text>' +
        '<line x1="270" y1="80" x2="270" y2="205" stroke="#a25f2f" stroke-width="6" marker-end="url(#ecrv)"/><text x="285" y="150">9.81 kN @ 2 m</text>' +
        '<line x1="420" y1="45" x2="420" y2="205" stroke="#a25f2f" stroke-width="6" marker-end="url(#ecrv)"/><text x="340" y="35">23.5 kN @ 6 m</text><text x="115" y="168">1.5 m</text></svg><div class="exSolveStack"><div><span>take moments about A</span><strong>B(1.5) − 9.81(2) − 23.5(6) = 0</strong></div><div><span>immediate result</span><strong>B = 107.1 kN</strong></div><div><span>then force balance</span><strong>A_x = −107.1 kN, A_y = 33.3 kN</strong></div></div></div>',
      "Because A_x and A_y pass through A, neither creates a moment about A."
    );
  }

  function roof() {
    return frame(
      "Roof frame: resolve the cable before writing equilibrium",
      "The 4.5–6–7.5 triangle turns the 150-kN cable into +90 kN horizontal and −120 kN vertical.",
      '<div class="exTwoPanel"><svg class="exSvg exWide" viewBox="0 0 500 275">' +
        arrow("erfx","#2f7774") + arrow("erfy","#a25f2f") +
        '<circle cx="85" cy="215" r="8" fill="#303b37"/><text x="63" y="240">E</text><line x1="85" y1="215" x2="385" y2="85" stroke="#65716b" stroke-width="7"/>' +
        '<line x1="320" y1="95" x2="410" y2="95" stroke="#2f7774" stroke-width="6" marker-end="url(#erfx)"/><text x="330" y="83">+90 kN</text>' +
        '<line x1="320" y1="95" x2="320" y2="215" stroke="#a25f2f" stroke-width="6" marker-end="url(#erfy)"/><text x="333" y="165">−120 kN</text>' +
        '<path d="M320 95 L410 95 L410 27 Z" fill="none" stroke="#9a968c" stroke-width="2"/><text x="360" y="116">6</text><text x="416" y="67">4.5</text><text x="365" y="51">7.5</text></svg><div class="exSolveStack"><div><span>horizontal balance</span><strong>E_x + 90 = 0</strong></div><div><span>vertical balance</span><strong>E_y − 80 − 120 = 0</strong></div><div><span>moment balance</span><strong>M_E = 180 kN·m</strong></div></div></div>',
      "The frame drawing is schematic; the 4.5–6–7.5 cable component triangle and listed equilibrium values are the lesson data."
    );
  }

  function ring() {
    return frame(
      "Eccentric ring: choose axes along the incline",
      "The clever step is taking moments about O so N and the ring weight disappear from that moment equation.",
      '<div class="exTwoPanel"><svg class="exSvg exWide" viewBox="0 0 500 280">' +
        arrow("erngn","#2f7774") + arrow("erngf","#a25f2f") + arrow("erngw","#6b7d91") +
        '<line x1="45" y1="225" x2="445" y2="115" stroke="#77766f" stroke-width="5"/><circle cx="250" cy="140" r="62" fill="rgba(47,119,116,.04)" stroke="#58655f" stroke-width="4"/><circle cx="250" cy="140" r="6" fill="#303b37"/><text x="260" y="136">O</text>' +
        '<circle cx="285" cy="106" r="7" fill="#a25f2f"/><line x1="285" y1="106" x2="285" y2="230" stroke="#6b7d91" stroke-width="5" marker-end="url(#erngw)"/><text x="296" y="190">m₀g</text>' +
        '<line x1="225" y1="201" x2="193" y2="85" stroke="#2f7774" stroke-width="5" marker-end="url(#erngn)"/><text x="180" y="80">N</text>' +
        '<line x1="225" y1="201" x2="330" y2="172" stroke="#a25f2f" stroke-width="5" marker-end="url(#erngf)"/><text x="335" y="172">F</text></svg><div class="exSolveStack"><div><span>moment about O</span><strong>Fr − m₀gb sinθ = 0</strong></div><div><span>along incline</span><strong>F − (m+m₀)g sinα = 0</strong></div><div><span>eliminate F and g</span><strong>sinθ = (r/b)(1+m/m₀) sinα</strong></div></div></div>',
      "The contact-force directions follow the lesson model: N normal to the incline and F along the incline."
    );
  }

  function synthesis() {
    return frame(
      "The four synthesis examples as pictures",
      "Use the diagram to identify the method before reading the algebra.",
      '<div class="exSynGrid">' +
        '<div><span>1 · 3D FORCE</span><svg class="exSvg" viewBox="0 0 300 185">' + arrow("esyn1","#2f7774") + '<line x1="65" y1="145" x2="245" y2="145" stroke="#9b978e"/><line x1="65" y1="145" x2="65" y2="25" stroke="#9b978e"/><line x1="65" y1="145" x2="210" y2="55" stroke="#2f7774" stroke-width="6" marker-end="url(#esyn1)"/><line x1="210" y1="55" x2="210" y2="145" stroke="#6b7d91" stroke-dasharray="5 4"/><text x="80" y="35">Fy = 250 N</text><text x="105" y="165">Fh = 433 N</text><text x="145" y="80">F = 500 N</text></svg><b>First split vertical vs horizontal, then split horizontal into x and z.</b></div>' +
        '<div><span>2 · AXIS MOMENT</span><div class="exTinyFlow"><b>r × F</b><i>→</i><b>M_O</b><i>→ dot λ_OB →</i><strong>−120 N·m</strong></div><small>Cross product creates the moment; dot product projects it onto OB.</small></div>' +
        '<div><span>3 · BEAM EQUILIBRIUM</span><svg class="exSvg" viewBox="0 0 300 185">' + arrow("esyn3","#a25f2f") + arrow("esyn3u","#2f7774") + '<line x1="35" y1="120" x2="265" y2="120" stroke="#626d67" stroke-width="6"/><polygon points="35,120 20,145 50,145" fill="#d8d0c3" stroke="#626d67"/><circle cx="265" cy="136" r="8" fill="none" stroke="#626d67"/><line x1="112" y1="45" x2="112" y2="115" stroke="#a25f2f" stroke-width="5" marker-end="url(#esyn3)"/><line x1="227" y1="45" x2="227" y2="115" stroke="#a25f2f" stroke-width="5" marker-end="url(#esyn3)"/><line x1="265" y1="120" x2="265" y2="65" stroke="#2f7774" stroke-width="5" marker-end="url(#esyn3u)"/><text x="95" y="35">8 kN</text><text x="207" y="35">12 kN</text><text x="245" y="58">By</text></svg><b>Take ΣM_A first so A_x and A_y disappear.</b></div>' +
        '<div><span>4 · SYSTEM REDUCTION</span><div class="exTinyFlow"><b>ΣF = −100 N</b><i>+</i><b>ΣM_A = −270 N·m</b><i>→</i><strong>x = 2.70 m</strong></div><small>The single resultant must match both the force and the moment.</small></div>' +
      '</div>'
    );
  }

  var rules = [
    [/Lecture examples: mass, weight, and unit conversion/i, unitExamples],
    [/Two-force resultant: 40 N and 60 N/i, twoForce],
    [/Tugboats and minimum tension/i, tugboat],
    [/Four-force component sum/i, fourForce],
    [/Equilibrium examples from the lecture/i, equilibriumExamples],
    [/2500-N guy wire/i, guyWire],
    [/Lever example: same moment, different forces/i, lever],
    [/3D moment from a cable force|Rectangular-plate cable moment: every intermediate step/i, cableMoment],
    [/Cube: point moment, axis moment, and distance/i, cubeExample],
    [/Beam force-system reduction/i, beamReduction],
    [/Lecture crane: why the moment point makes the solution easy/i, crane],
    [/Lecture roof frame: resolve the cable before equilibrium/i, roof],
    [/Lecture eccentric ring: derive the formula instead of memorizing it/i, ring],
    [/Four complete synthesis examples/i, synthesis]
  ];

  function inject() {
    var sections = host.querySelectorAll(".workedSection .sectionContent");
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      if (section.querySelector(":scope > [data-example-visual]")) continue;
      var h = section.querySelector(":scope > h3");
      if (!h) continue;
      var title = h.textContent.trim();
      for (var r = 0; r < rules.length; r++) {
        if (!rules[r][0].test(title)) continue;
        var temp = document.createElement("div");
        temp.innerHTML = rules[r][1]();
        var node = temp.firstElementChild;
        var anchor = h;
        if (h.nextElementSibling && h.nextElementSibling.tagName === "P") anchor = h.nextElementSibling;
        anchor.insertAdjacentElement("afterend", node);
        break;
      }
    }
  }

  new MutationObserver(function() {
    requestAnimationFrame(inject);
  }).observe(host, {childList:true, subtree:true});

  inject();
})();