window.PREQUIZ = (() => {
  const lessonS02Append = String.raw`
    <div class="sourceStrip continuationSource"><span>CONTINUATION</span><b>ME1005-03 (1).pdf</b><span>SUPPORT</span><b>Vector Mechanics for Engineers: Statics · Ch. 2.4 and Ch. 3</b></div>
    <div class="sheetKicker">LECTURE 03 · CHAPTER 2.4 + CHAPTER 3</div>
    <h2>Forces in Space & Rigid Bodies I</h2>
    <p class="lessonLead">Lecture 03 closes the particle-vector material needed before Quiz I and then changes the model from a particle to a rigid body. The central change is that <strong>where a force acts now matters</strong>, because forces can create moments.</p>

    <section class="lessonSection">
      <div class="sectionNo">2.4</div>
      <div class="sectionContent">
        <h3>Adding forces in space</h3>
        <p>A three-dimensional force can be resolved into Cartesian components either from geometric angles, from direction cosines, or from two points on its line of action.</p>
        <div class="formulaBoard">
          <div><b>Cartesian force</b><code>\(\mathbf F=F_x\mathbf i+F_y\mathbf j+F_z\mathbf k\)</code></div>
          <div><b>Direction-cosine form</b><code>\(\mathbf F=F(\cos\theta_x\mathbf i+\cos\theta_y\mathbf j+\cos\theta_z\mathbf k)\)</code></div>
          <div><b>Direction-cosine identity</b><code>\(\cos^2\theta_x+\cos^2\theta_y+\cos^2\theta_z=1\)</code></div>
          <div><b>Two-point direction</b><code>\(\mathbf d=(x_2-x_1)\mathbf i+(y_2-y_1)\mathbf j+(z_2-z_1)\mathbf k\)</code></div>
          <div><b>Unit vector</b><code>\(\lambda=\mathbf d/|\mathbf d|\)</code></div>
          <div><b>Force along line</b><code>\(\mathbf F=F\lambda\)</code></div>
        </div>
        <div class="lessonNote"><b>Sign discipline:</b> when the line goes from A to B, construct \(\mathbf r_{B/A}=\mathbf r_B-\mathbf r_A\). Reversing the point order reverses every component of the unit vector.</div>
      </div>
    </section>

    <section class="lessonSection workedSection">
      <div class="sectionNo">EX 2.4</div>
      <div class="sectionContent">
        <h3>2500-N guy wire</h3>
        <p>For the lecture geometry, the vector from A toward B is \((-40\,\mathbf i+80\,\mathbf j+30\,\mathbf k)\,\mathrm m\), with length approximately \(94.3\,\mathrm m\).</p>
        <div class="workedFlow">
          <div><span>1</span><p>Unit vector A → B</p><code>\(\lambda\approx-0.424\mathbf i+0.848\mathbf j+0.318\mathbf k\)</code></div>
          <div><span>2</span><p>Multiply by 2500 N</p><code>\(\mathbf F\approx-1060\mathbf i+2120\mathbf j+795\mathbf k\;\mathrm N\)</code></div>
          <div><span>3</span><p>Direction angle with +x</p><code>\(\theta_x\approx115.1^\circ\)</code></div>
          <div><span>4</span><p>Other direction angles</p><code>\(\theta_y\approx32.0^\circ,\quad\theta_z\approx71.5^\circ\)</code></div>
        </div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">3.1–3.2</div>
      <div class="sectionContent">
        <h3>From particles to rigid bodies</h3>
        <p>For a particle, only the net force matters. For a rigid body, its size and the points where forces act must be considered. Forces are separated into <strong>external</strong> and <strong>internal</strong> forces; a free-body diagram of the whole rigid body shows external forces, not the internal forces between parts of the body.</p>
        <div class="conceptGrid twoCol">
          <div class="conceptBox"><span>EXTERNAL</span><strong>Shown on the FBD</strong><p>Loads, weights, support reactions, cable forces, and other interactions from outside the isolated body.</p></div>
          <div class="conceptBox"><span>INTERNAL</span><strong>Not shown for the whole-body FBD</strong><p>Forces between parts within the isolated body cancel in pairs when the entire body is isolated.</p></div>
        </div>
        <div class="formulaBanner"><span>PRINCIPLE OF TRANSMISSIBILITY</span><code>same magnitude + same direction + same line of action</code><small>For a rigid body, moving a force anywhere along its own line of action does not change the external equilibrium or motion effect.</small></div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">3.3</div>
      <div class="sectionContent">
        <h3>Vector product / cross product</h3>
        <p>The cross product produces a vector perpendicular to the plane containing the two input vectors. Its direction follows the right-hand rule.</p>
        <div class="formulaBoard">
          <div><b>Definition</b><code>\(\mathbf P\times\mathbf Q=PQ\sin\theta\,\mathbf n\)</code></div>
          <div><b>Order matters</b><code>\(\mathbf Q\times\mathbf P=-(\mathbf P\times\mathbf Q)\)</code></div>
          <div><b>Distributive</b><code>\(\mathbf P\times(\mathbf Q_1+\mathbf Q_2)=\mathbf P\times\mathbf Q_1+\mathbf P\times\mathbf Q_2\)</code></div>
          <div><b>Cartesian determinant</b><code>\(\mathbf P\times\mathbf Q=\begin{vmatrix}\mathbf i&\mathbf j&\mathbf k\\P_x&P_y&P_z\\Q_x&Q_y&Q_z\end{vmatrix}\)</code></div>
        </div>
        <div class="lessonNote"><b>Unit-vector cycle:</b> \(\mathbf i\times\mathbf j=\mathbf k\), \(\mathbf j\times\mathbf k=\mathbf i\), \(\mathbf k\times\mathbf i=\mathbf j\). Reversing the order changes the sign.</div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">3.4</div>
      <div class="sectionContent">
        <h3>Moment of a force about a point</h3>
        <p>The moment measures the tendency of a force to rotate a rigid body about a point. The position vector must run from the moment center to any point on the force's line of action.</p>
        <div class="formulaBoard">
          <div><b>Vector moment</b><code>\(\mathbf M_O=\mathbf r\times\mathbf F\)</code></div>
          <div><b>Magnitude</b><code>\(|\mathbf M_O|=rF\sin\theta=Fd\)</code></div>
          <div><b>Right-hand rule</b><code>direction perpendicular to the \(\mathbf r\)-\(\mathbf F\) plane</code></div>
          <div><b>2D sign</b><code>counterclockwise +, clockwise −</code></div>
        </div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">3.5</div>
      <div class="sectionContent">
        <h3>Rectangular components of a moment & Varignon's theorem</h3>
        <div class="formulaBoard">
          <div><b>Moment components</b><code>\(\mathbf M_O=(yF_z-zF_y)\mathbf i+(zF_x-xF_z)\mathbf j+(xF_y-yF_x)\mathbf k\)</code></div>
          <div><b>Varignon</b><code>\(\mathbf r\times\sum\mathbf F_i=\sum(\mathbf r\times\mathbf F_i)\)</code></div>
          <div><b>Moment about B</b><code>\(\mathbf M_B=\mathbf r_{A/B}\times\mathbf F\)</code></div>
          <div><b>Planar shortcut</b><code>\(M_z=xF_y-yF_x\)</code></div>
        </div>
        <div class="lessonNote"><b>Common error:</b> the position vector is measured from the chosen moment point to the force application line—not from the global origin unless the origin is the chosen moment point.</div>
      </div>
    </section>

    <section class="lessonSection workedSection">
      <div class="sectionNo">EX 3.4</div>
      <div class="sectionContent">
        <h3>Lever example: same moment, different forces</h3>
        <p>A 100-lb vertical force acts at the end of a 24-in lever inclined 60° above horizontal.</p>
        <div class="workedGrid">
          <article class="workedExample"><span>ORIGINAL MOMENT</span><p>The perpendicular distance is \(24\cos60^\circ=12\) in.</p><code>\(M_O=-1200\;\mathrm{lb\cdot in}\)</code></article>
          <article class="workedExample"><span>HORIZONTAL FORCE AT A</span><p>The perpendicular distance is \(24\sin60^\circ=20.8\) in.</p><code>\(F\approx57.7\;\mathrm{lb}\)</code></article>
          <article class="workedExample"><span>SMALLEST FORCE AT A</span><p>Make the force perpendicular to OA so the moment arm is the full 24 in.</p><code>\(F_{\min}=50\;\mathrm{lb}\)</code></article>
          <article class="workedExample"><span>240-lb VERTICAL FORCE</span><p>It needs a 5-in perpendicular arm, giving \(OB=10\) in.</p><code>\(OB=10\;\mathrm{in}\)</code></article>
        </div>
      </div>
    </section>

    <div class="coverageBoundary"><b>Week 2 source boundary</b><span>Lecture 03 reaches through rectangular components of the moment of a force. Scalar products, moments about axes, couples, force-couple systems, force-system reduction, and rigid-body equilibrium continue in Lecture 04 / Week 4.</span></div>
  `;

  const lessonS04 = String.raw`
    <div class="sourceStrip"><span>PRIMARY</span><b>ME1005-04.pdf</b><span>SUPPORT</span><b>Vector Mechanics for Engineers: Statics · Ch. 3–4</b></div>
    <div class="sheetKicker">LECTURE 04 · CHAPTERS 3–4</div>
    <h2>Rigid Bodies II & Equilibrium of Rigid Bodies</h2>
    <p class="lessonLead">Lecture 04 completes the pre-Quiz-I rigid-body toolkit. The main chain is: compute moments → combine them into couples and force-couple systems → reduce a general force system → draw a rigid-body FBD → apply force and moment equilibrium.</p>

    <section class="lessonSection workedSection">
      <div class="sectionNo">3.5 EX</div>
      <div class="sectionContent">
        <h3>3D moment from a cable force</h3>
        <p>For the rectangular-plate example, the 200-N cable force at C is written from the geometry and the moment about A is found with \(\mathbf M_A=\mathbf r_{C/A}\times\mathbf F\).</p>
        <div class="answerStamp">LECTURE RESULT · \(\mathbf M_A=(-7.68\mathbf i+28.8\mathbf j+28.8\mathbf k)\;\mathrm{N\cdot m}\)</div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">3.6</div>
      <div class="sectionContent">
        <h3>Scalar / dot product</h3>
        <div class="formulaBoard">
          <div><b>Definition</b><code>\(\mathbf P\cdot\mathbf Q=PQ\cos\theta\)</code></div>
          <div><b>Cartesian form</b><code>\(\mathbf P\cdot\mathbf Q=P_xQ_x+P_yQ_y+P_zQ_z\)</code></div>
          <div><b>Angle</b><code>\(\cos\theta=\dfrac{\mathbf P\cdot\mathbf Q}{PQ}\)</code></div>
          <div><b>Projection on unit axis λ</b><code>\(P_{OL}=\mathbf P\cdot\lambda\)</code></div>
        </div>
        <div class="lessonNote"><b>Properties:</b> the dot product is commutative and distributive; the lecture explicitly notes that it is not associative as a three-vector product.</div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">3.7</div>
      <div class="sectionContent">
        <h3>Mixed triple product</h3>
        <p>The scalar triple product is a scalar and can be evaluated as a determinant. Its magnitude equals the volume of the parallelepiped built from the three vectors.</p>
        <div class="formulaBoard">
          <div><b>Definition</b><code>\(\mathbf S\cdot(\mathbf P\times\mathbf Q)\)</code></div>
          <div><b>Determinant</b><code>\(\mathbf S\cdot(\mathbf P\times\mathbf Q)=\begin{vmatrix}S_x&S_y&S_z\\P_x&P_y&P_z\\Q_x&Q_y&Q_z\end{vmatrix}\)</code></div>
          <div><b>Volume</b><code>\(V=|\mathbf a\cdot(\mathbf b\times\mathbf c)|\)</code></div>
          <div><b>Cyclic order</b><code>\(\mathbf S\cdot(\mathbf P\times\mathbf Q)=\mathbf P\cdot(\mathbf Q\times\mathbf S)=\mathbf Q\cdot(\mathbf S\times\mathbf P)\)</code></div>
        </div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">3.8</div>
      <div class="sectionContent">
        <h3>Moment of a force about a given axis</h3>
        <p>First compute the moment about a point on the axis, then project that moment vector onto the axis direction.</p>
        <div class="formulaBoard">
          <div><b>Moment about O</b><code>\(\mathbf M_O=\mathbf r\times\mathbf F\)</code></div>
          <div><b>Axis moment</b><code>\(M_{OL}=\lambda\cdot\mathbf M_O=\lambda\cdot(\mathbf r\times\mathbf F)\)</code></div>
          <div><b>Arbitrary axis through B</b><code>\(M_{BL}=\lambda\cdot(\mathbf r_{A/B}\times\mathbf F)\)</code></div>
          <div><b>Coordinate-axis components</b><code>\(M_x=yF_z-zF_y,\;M_y=zF_x-xF_z,\;M_z=xF_y-yF_x\)</code></div>
        </div>
        <div class="lessonNote"><b>Important:</b> the point B may be any point on the chosen axis. The scalar moment about that axis is independent of which point on the axis you use.</div>
      </div>
    </section>

    <section class="lessonSection workedSection">
      <div class="sectionNo">EX 3.8</div>
      <div class="sectionContent">
        <h3>Cube: point moment, axis moment, and distance</h3>
        <div class="workedGrid">
          <article class="workedExample"><span>ABOUT A</span><code>\(\mathbf M_A=\dfrac{aP}{\sqrt2}(\mathbf i+\mathbf j+\mathbf k)\)</code></article>
          <article class="workedExample"><span>ABOUT EDGE AB</span><code>\(M_{AB}=\dfrac{aP}{\sqrt2}\)</code></article>
          <article class="workedExample"><span>ABOUT DIAGONAL AG</span><code>\(M_{AG}=-\dfrac{aP}{\sqrt6}\)</code></article>
          <article class="workedExample"><span>DISTANCE AG TO FC</span><code>\(d=\dfrac{a}{\sqrt6}\)</code></article>
        </div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">3.9</div>
      <div class="sectionContent">
        <h3>Moment of a couple</h3>
        <p>A couple consists of two equal and opposite parallel forces whose lines of action are separated. The net force is zero, but the couple creates a pure moment.</p>
        <div class="formulaBoard">
          <div><b>Couple moment</b><code>\(\mathbf M=\mathbf r\times\mathbf F\)</code></div>
          <div><b>Magnitude</b><code>\(M=Fd\)</code></div>
          <div><b>Free vector</b><code>couple moment is independent of coordinate origin</code></div>
          <div><b>Add couples</b><code>\(\mathbf M_R=\sum\mathbf M_i\)</code></div>
        </div>
        <div class="lessonNote"><b>Equivalent couples:</b> same moment vector means the same external rotational effect, even if the individual force magnitudes and separation distances differ.</div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">3.10</div>
      <div class="sectionContent">
        <h3>Move a force by adding a couple</h3>
        <p>A force cannot generally be moved to a different point without changing the body's response. To move it, keep the same force and add the correct couple.</p>
        <div class="formulaBanner"><span>EQUIVALENT FORCE-COUPLE SYSTEM AT O</span><code>\(\mathbf F\;\text{at O},\qquad \mathbf M_O=\mathbf r\times\mathbf F\)</code><small>The added couple preserves the original moment of the force about O.</small></div>
        <div class="formulaLine"><b>Move force-couple system from O to O′</b><code>\(\mathbf M_{O'}=\mathbf M_O+\mathbf s\times\mathbf F\)</code></div>
        <div class="answerStamp">LECTURE COUPLE EXAMPLE · \(\mathbf M=(-540\mathbf i+240\mathbf j+180\mathbf k)\;\mathrm{lb\cdot in}\)</div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">3.11</div>
      <div class="sectionContent">
        <h3>Reduce a general force system</h3>
        <div class="formulaBoard">
          <div><b>Resultant force</b><code>\(\mathbf R=\sum\mathbf F\)</code></div>
          <div><b>Resultant couple at O</b><code>\(\mathbf M_O^R=\sum(\mathbf r\times\mathbf F)\)</code></div>
          <div><b>Move system to O′</b><code>\(\mathbf M_{O'}^R=\mathbf M_O^R+\mathbf s\times\mathbf R\)</code></div>
          <div><b>Single-force reduction</b><code>possible when the resultant force and resultant couple are mutually perpendicular</code></div>
        </div>
      </div>
    </section>

    <section class="lessonSection workedSection">
      <div class="sectionNo">EX 3.11</div>
      <div class="sectionContent">
        <h3>Beam force-system reduction</h3>
        <p>The lecture beam carries vertical forces of +150 N at A, −600 N at 1.6 m, +100 N at 2.8 m, and −250 N at B = 4.8 m.</p>
        <div class="workedGrid">
          <article class="workedExample"><span>RESULTANT FORCE</span><code>\(\mathbf R=-600\mathbf j\;\mathrm N\)</code></article>
          <article class="workedExample"><span>COUPLE AT A</span><code>\(\mathbf M_A^R=-1880\mathbf k\;\mathrm{N\cdot m}\)</code></article>
          <article class="workedExample"><span>COUPLE AT B</span><code>\(\mathbf M_B^R=+1000\mathbf k\;\mathrm{N\cdot m}\)</code></article>
          <article class="workedExample"><span>SINGLE RESULTANT LOCATION</span><code>\(x\approx3.13\;\mathrm m\;\text{from A}\)</code></article>
        </div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">4.1–4.2</div>
      <div class="sectionContent">
        <h3>Rigid-body equilibrium and the rigid-body FBD</h3>
        <div class="formulaBanner"><span>STATIC EQUILIBRIUM</span><code>\(\sum\mathbf F=\mathbf0,\qquad\sum\mathbf M_O=\mathbf0\)</code><small>A rigid body in static equilibrium neither translates nor rotates under the applied loads.</small></div>
        <ol class="referenceChecklist compactList">
          <li>Select and detach the rigid body from the ground, supports, and other bodies.</li>
          <li>Show all known external forces with their points of application.</li>
          <li>Replace supports/connections by the correct unknown reaction forces and moments.</li>
          <li>Include every dimension needed to compute moments.</li>
          <li>Choose axes and a useful moment point before writing equations.</li>
        </ol>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">4.3</div>
      <div class="sectionContent">
        <h3>2D support and connection reactions</h3>
        <div class="dataTableWrap"><table class="dataTable"><thead><tr><th>Support / connection</th><th>2D reaction model</th></tr></thead><tbody>
          <tr><td>Roller / rocker / frictionless surface</td><td>One force normal to the supporting surface</td></tr>
          <tr><td>Short cable</td><td>One force along the cable</td></tr>
          <tr><td>Short link</td><td>One force along the link</td></tr>
          <tr><td>Collar on frictionless rod / pin in frictionless slot</td><td>One reaction perpendicular to the permitted sliding direction</td></tr>
          <tr><td>Frictionless pin / hinge</td><td>Two unknown force components</td></tr>
          <tr><td>Fixed support</td><td>Two unknown force components plus one unknown couple moment</td></tr>
        </tbody></table></div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">4.4</div>
      <div class="sectionContent">
        <h3>Equilibrium of a rigid body in two dimensions</h3>
        <div class="formulaBoard">
          <div><b>Standard set</b><code>\(\sum F_x=0,\quad\sum F_y=0,\quad\sum M_A=0\)</code></div>
          <div><b>Unknown limit</b><code>3 independent scalar equations → at most 3 independent unknowns</code></div>
          <div><b>Alternate valid set</b><code>\(\sum F_x=0,\quad\sum M_A=0,\quad\sum M_B=0\)</code></div>
          <div><b>Moment-point strategy</b><code>choose a point that eliminates the most unknown reactions</code></div>
        </div>
      </div>
    </section>

    <section class="lessonSection workedSection">
      <div class="sectionNo">EX 4.4</div>
      <div class="sectionContent">
        <h3>Rigid-body equilibrium examples</h3>
        <div class="workedGrid">
          <article class="workedExample"><span>FIXED CRANE</span><p>1000-kg crane, 2400-kg load, pin at A and rocker at B.</p><code>\(B=107.1\;\mathrm{kN},\;A_x=-107.1\;\mathrm{kN},\;A_y=33.3\;\mathrm{kN}\)</code></article>
          <article class="workedExample"><span>ROOF FRAME</span><p>150-kN cable, fixed support at E.</p><code>\(E_x=-90.0\;\mathrm{kN},\;E_y=200\;\mathrm{kN},\;M_E=180\;\mathrm{kN\cdot m}\)</code></article>
          <article class="workedExample"><span>ECCENTRIC RING</span><p>For no slipping on an incline, the lecture derives the equilibrium orientation.</p><code>\(\theta=\sin^{-1}\!\left[\frac rb\left(1+\frac m{m_0}\right)\sin\alpha\right]\)</code></article>
          <article class="workedExample"><span>PULLEY / MOTOR</span><p>Using moment and force equilibrium gives the belt tension and pin-force components.</p><code>\(T=155.6\;\mathrm N,\;O_x=734.7\;\mathrm N,\;O_y=-960\;\mathrm N,\;R\approx1.21\;\mathrm{kN}\)</code></article>
        </div>
      </div>
    </section>

    <div class="coverageBoundary"><b>Quiz I boundary</b><span>Lecture 04 lists later Chapter 4 topics (statically indeterminate reactions and 3D rigid-body equilibrium), but the supplied pages develop only through 4.4 and its examples. Quiz I prep on this site therefore stops at 2D rigid-body equilibrium.</span></div>
  `;

  const lessonS05 = String.raw`
    <div class="sourceStrip"><span>QUIZ SCOPE</span><b>ME1005 Lectures 01–04</b><span>SUPPORT</span><b>Vector Mechanics for Engineers: Statics · Ch. 1–4 matching sections</b></div>
    <div class="sheetKicker">QUIZ I · COMPLETE PRE-QUIZ REVIEW</div>
    <h2>Quiz I Preparation</h2>
    <p class="lessonLead">This review is deliberately bounded by the four lecture PDFs you have before Quiz I. It does not introduce later Statics topics. Use the <strong>SOLVE</strong> tab for immediate-feedback review and <strong>VERIFY</strong> for a fresh mixed mock set.</p>

    <section class="lessonSection">
      <div class="sectionNo">SCOPE</div>
      <div class="sectionContent">
        <h3>What you should be able to do</h3>
        <div class="termMatrix quizScopeMatrix">
          <div><b>Units & mechanics basics</b><span>Distinguish mass and force, convert units consistently, apply sensible significant figures.</span></div>
          <div><b>Planar particle statics</b><span>Add forces, resolve components, draw particle FBDs, and solve \(\sum F_x=0,\sum F_y=0\).</span></div>
          <div><b>3D force vectors</b><span>Use direction cosines or two points to create unit vectors and force components.</span></div>
          <div><b>Rigid-body force concepts</b><span>Identify external/internal forces and use the principle of transmissibility correctly.</span></div>
          <div><b>Moments</b><span>Compute \(\mathbf r\times\mathbf F\), use \(Fd\), rectangular moment components, Varignon, and moments about an axis.</span></div>
          <div><b>Vector products</b><span>Use cross products, dot products, projections, and mixed triple products.</span></div>
          <div><b>Couples & equivalent systems</b><span>Compute couple moments, move forces using a couple, and reduce systems to \(\mathbf R\) and \(\mathbf M_O^R\).</span></div>
          <div><b>Rigid-body equilibrium</b><span>Draw a complete rigid-body FBD, replace supports correctly, and solve 2D equilibrium with forces and moments.</span></div>
        </div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">FORM</div>
      <div class="sectionContent">
        <h3>Formula checklist to know without hunting</h3>
        <div class="formulaBoard quizFormulaBoard">
          <div><b>Weight</b><code>\(W=mg\)</code></div>
          <div><b>Planar components</b><code>\(F_x=F\cos\theta,\;F_y=F\sin\theta\)</code></div>
          <div><b>3D direction</b><code>\(\mathbf F=F\lambda,\;\lambda=\mathbf d/|\mathbf d|\)</code></div>
          <div><b>Direction cosines</b><code>\(\cos^2\theta_x+\cos^2\theta_y+\cos^2\theta_z=1\)</code></div>
          <div><b>Particle equilibrium</b><code>\(\sum\mathbf F=0\)</code></div>
          <div><b>Moment about point</b><code>\(\mathbf M_O=\mathbf r\times\mathbf F\)</code></div>
          <div><b>Moment magnitude</b><code>\(M=Fd\)</code></div>
          <div><b>Dot product</b><code>\(\mathbf P\cdot\mathbf Q=PQ\cos\theta\)</code></div>
          <div><b>Projection</b><code>\(P_{OL}=\mathbf P\cdot\lambda\)</code></div>
          <div><b>Axis moment</b><code>\(M_{OL}=\lambda\cdot(\mathbf r\times\mathbf F)\)</code></div>
          <div><b>Couple</b><code>\(M=Fd\)</code></div>
          <div><b>System reduction</b><code>\(\mathbf R=\sum\mathbf F,\;\mathbf M_O^R=\sum(\mathbf r\times\mathbf F)\)</code></div>
          <div><b>Move force-couple</b><code>\(\mathbf M_{O'}^R=\mathbf M_O^R+\mathbf s\times\mathbf R\)</code></div>
          <div><b>2D rigid equilibrium</b><code>\(\sum F_x=0,\;\sum F_y=0,\;\sum M=0\)</code></div>
        </div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">FLOW</div>
      <div class="sectionContent">
        <h3>Quiz problem workflow</h3>
        <div class="methodSteps">
          <div><span>1</span><b>Classify the model</b><p>Particle or rigid body? 2D or 3D? Resultant problem or equilibrium problem?</p></div>
          <div><span>2</span><b>Draw / define geometry</b><p>Choose axes, identify coordinates, and build unit vectors from the actual line of action.</p></div>
          <div><span>3</span><b>Make the FBD</b><p>Isolate exactly one body/system and replace every removed support/contact by the correct reaction.</p></div>
          <div><span>4</span><b>Choose the equations</b><p>Components, dot/cross product, moment, or equilibrium—do not write equations before the model is clear.</p></div>
          <div><span>5</span><b>Exploit moment points</b><p>For rigid bodies, take moments about a point through unknown reactions when possible.</p></div>
          <div><span>6</span><b>Check the result</b><p>Units, sign/direction, significant figures, and whether the physical sense matches the geometry.</p></div>
        </div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">TRAPS</div>
      <div class="sectionContent">
        <h3>High-value mistakes to avoid</h3>
        <div class="principleList">
          <div><b>Wrong point order</b><span>\(\mathbf r_{B/A}=\mathbf r_B-\mathbf r_A\). Reversing it reverses the force direction.</span></div>
          <div><b>Wrong cross-product order</b><span>\(\mathbf r\times\mathbf F\neq\mathbf F\times\mathbf r\); reversing the order changes the sign.</span></div>
          <div><b>Using a force instead of its perpendicular arm</b><span>In \(M=Fd\), d is the shortest perpendicular distance to the line of action.</span></div>
          <div><b>Moving a force off its line of action for free</b><span>Transmissibility permits sliding only along the same line. Moving to a different line requires an added couple.</span></div>
          <div><b>Putting internal forces on a whole-body FBD</b><span>Show interactions from outside the isolated body; internal action-reaction pairs are not shown on the whole-body FBD.</span></div>
          <div><b>Inventing support reactions</b><span>A roller has one normal reaction, a pin has two force components, and a fixed support has two force components plus a moment in 2D.</span></div>
          <div><b>Forgetting moment equilibrium</b><span>A rigid body can have zero net force and still rotate. Static rigid-body equilibrium requires both force and moment balance.</span></div>
          <div><b>Trusting arctan without a quadrant check</b><span>Use component signs (or atan2) to place a resultant direction in the correct quadrant.</span></div>
        </div>
      </div>
    </section>

    <section class="lessonSection workedSection">
      <div class="sectionNo">CHECK</div>
      <div class="sectionContent">
        <h3>Source-result checkpoints worth recognizing</h3>
        <div class="workedGrid quizCheckpointGrid">
          <article class="workedExample"><span>LECTURE 02</span><p>40 N + 60 N force-triangle example</p><code>\(R\approx97.7\,\mathrm N,\;\alpha\approx35.0^\circ\)</code></article>
          <article class="workedExample"><span>LECTURE 03</span><p>2500-N guy wire</p><code>\(\mathbf F\approx-1060\mathbf i+2120\mathbf j+795\mathbf k\;\mathrm N\)</code></article>
          <article class="workedExample"><span>LECTURE 03</span><p>24-in lever, 100-lb vertical force</p><code>\(M_O=-1200\;\mathrm{lb\cdot in}\)</code></article>
          <article class="workedExample"><span>LECTURE 04</span><p>Rectangular-plate cable moment</p><code>\(\mathbf M_A=(-7.68\mathbf i+28.8\mathbf j+28.8\mathbf k)\;\mathrm{N\cdot m}\)</code></article>
          <article class="workedExample"><span>LECTURE 04</span><p>Beam force-system reduction</p><code>\(R=-600\,\mathrm N,\;M_A=-1880\,\mathrm{N\cdot m},\;x=3.13\,\mathrm m\)</code></article>
          <article class="workedExample"><span>LECTURE 04</span><p>Fixed crane reactions</p><code>\(B=107.1\,\mathrm{kN},\;A_x=-107.1\,\mathrm{kN},\;A_y=33.3\,\mathrm{kN}\)</code></article>
        </div>
      </div>
    </section>

    <div class="coverageBoundary"><b>Not included in Quiz I prep</b><span>No centroids, structures, internal-force diagrams, friction, moments of inertia, virtual work, or undeveloped Chapter 4.5–4.7 material is added here.</span></div>
  `;

  const practiceS02Extra = [
    {id:'s02q9',type:'mcq',prompt:'For a unit vector defined by direction angles θx, θy, θz, which relation must hold?',options:['cos²θx + cos²θy + cos²θz = 1','cosθx + cosθy + cosθz = 0','sin²θx + sin²θy + sin²θz = 0','θx + θy + θz = 90°'],correct:'a',explain:'The components of a unit vector are the direction cosines, so the sum of their squares must equal 1.'},
    {id:'s02q10',type:'numeric',prompt:'In the 2500-N guy-wire example, what is the x-component of the force acting from A toward B?',answer:-1060,tol:8,unit:'N',explain:'Using λx ≈ −0.424 gives Fx = 2500(−0.424) ≈ −1060 N.'},
    {id:'s02q11',type:'numeric',prompt:'In the same guy-wire example, what is the direction angle θx?',answer:115.1,tol:0.4,unit:'°',explain:'θx = cos⁻¹(−0.424) ≈ 115.1°.'},
    {id:'s02q12',type:'mcq',prompt:'When the entire rigid body is isolated, which forces belong on its free-body diagram?',options:['Only internal forces','Only external forces acting on the isolated body','No support reactions','Only forces whose magnitudes are known'],correct:'b',explain:'The whole-body FBD shows external interactions; internal forces between parts of the isolated body are not shown.'},
    {id:'s02q13',type:'mcq',prompt:'The principle of transmissibility allows a force on a rigid body to be moved without changing its external effect when it is moved:',options:['Anywhere in the body','Only along the same line of action','Only to the center of mass','Only parallel to its original line'],correct:'b',explain:'Transmissibility permits the same force to slide along its own line of action.'},
    {id:'s02q14',type:'numeric',prompt:'A 100-lb vertical force acts at the end of a 24-in lever inclined 60° above horizontal. Using counterclockwise positive, what is the moment about the base O?',answer:-1200,tol:2,unit:'lb·in',explain:'The perpendicular distance is 24 cos 60° = 12 in, and the force tends to rotate clockwise: M = −100(12) = −1200 lb·in.'},
    {id:'s02q15',type:'numeric',prompt:'For the same 24-in lever, what horizontal force at A produces a moment magnitude of 1200 lb·in?',answer:57.7,tol:0.3,unit:'lb',explain:'The perpendicular distance to a horizontal force at A is 24 sin 60° = 20.8 in, so F = 1200/20.8 ≈ 57.7 lb.'},
    {id:'s02q16',type:'numeric',prompt:'What is the smallest force applied at A that can produce a 1200 lb·in moment about O when OA = 24 in?',answer:50,tol:0.1,unit:'lb',explain:'The moment arm is maximized when the force is perpendicular to OA, so Fmin = 1200/24 = 50 lb.'}
  ];

  const practiceS04 = [
    {id:'s04q1',type:'numeric',prompt:'For P = (3, −2, 1) and Q = (4, 1, −2), evaluate P · Q.',answer:8,tol:0.001,unit:'',explain:'P · Q = 3(4) + (−2)(1) + 1(−2) = 8.'},
    {id:'s04q2',type:'numeric',prompt:'A vector P = (6, 8, 0) is projected onto the +x axis. What is the scalar projection?',answer:6,tol:0.001,unit:'',explain:'The +x unit vector is i, so P · i = 6.'},
    {id:'s04q3',type:'numeric',prompt:'Let S = (0,0,3), P = (1,0,0), and Q = (0,2,0). Evaluate S · (P × Q).',answer:6,tol:0.001,unit:'',explain:'P × Q = (0,0,2), so S · (P × Q) = 3(2) = 6.'},
    {id:'s04q4',type:'numeric',prompt:'In the rectangular-plate cable example, what is the j-component of MA?',answer:28.8,tol:0.1,unit:'N·m',explain:'The lecture result is MA = (−7.68 i + 28.8 j + 28.8 k) N·m.'},
    {id:'s04q5',type:'numeric',prompt:'In the cube example, what is MAB/(aP)?',answer:0.7071068,tol:0.003,unit:'',explain:'MAB = aP/√2, so MAB/(aP) = 1/√2 ≈ 0.7071.'},
    {id:'s04q6',type:'numeric',prompt:'Two equal and opposite 80-N forces form a couple with perpendicular separation 0.25 m. What is the couple-moment magnitude?',answer:20,tol:0.05,unit:'N·m',explain:'M = Fd = 80(0.25) = 20 N·m.'},
    {id:'s04q7',type:'numeric',prompt:'In the lecture equivalent-couple example, what is the x-component of the resultant couple?',answer:-540,tol:1,unit:'lb·in',explain:'The lecture gives M = (−540 i + 240 j + 180 k) lb·in.'},
    {id:'s04q8',type:'numeric',prompt:'For the lecture beam force system, what is the vertical resultant force Ry?',answer:-600,tol:0.5,unit:'N',explain:'150 − 600 + 100 − 250 = −600 N.'},
    {id:'s04q9',type:'numeric',prompt:'For that beam, what is the resultant couple moment about A?',answer:-1880,tol:2,unit:'N·m',explain:'ΣMA = −600(1.6) + 100(2.8) − 250(4.8) = −1880 N·m.'},
    {id:'s04q10',type:'numeric',prompt:'At what distance from A does the single −600 N resultant of the beam act?',answer:3.13,tol:0.03,unit:'m',explain:'Match the moment about A: x(−600) = −1880, so x = 1880/600 ≈ 3.13 m.'},
    {id:'s04q11',type:'mcq',prompt:'In a 2D free-body diagram, a frictionless pin or hinge is replaced by:',options:['One normal reaction only','Two unknown force components','One force and one couple only','A couple moment only'],correct:'b',explain:'A 2D frictionless pin prevents translation in both coordinate directions but does not resist a couple moment, so it supplies two force components.'},
    {id:'s04q12',type:'mcq',prompt:'In a 2D free-body diagram, a fixed support is replaced by:',options:['One force only','Two force components only','Two force components and a reaction moment','A reaction moment only'],correct:'c',explain:'A fixed support prevents both translations and rotation in 2D, so it supplies Ax, Ay, and a reaction moment.'},
    {id:'s04q13',type:'numeric',prompt:'In the fixed-crane lecture example, what is the rocker reaction B?',answer:107.1,tol:0.3,unit:'kN',explain:'Taking moments about A gives B = 107.1 kN.'},
    {id:'s04q14',type:'numeric',prompt:'In the fixed-crane example, what is Ay?',answer:33.3,tol:0.2,unit:'kN',explain:'Vertical equilibrium gives Ay − 9.81 − 23.5 = 0, so Ay = 33.3 kN.'},
    {id:'s04q15',type:'numeric',prompt:'In the roof-frame example, what is Ex at the fixed support E?',answer:-90,tol:0.2,unit:'kN',explain:'Horizontal equilibrium of the frame gives Ex = −90.0 kN.'},
    {id:'s04q16',type:'numeric',prompt:'In the roof-frame example, what reaction moment ME is required at E?',answer:180,tol:0.5,unit:'kN·m',explain:'The lecture moment equation about E gives ME = 180.0 kN·m.'},
    {id:'s04q17',type:'numeric',prompt:'In the pulley/motor example, what is the upper belt tension T?',answer:155.6,tol:0.4,unit:'N',explain:'Moment equilibrium about C gives (600 − T)(0.225) − 100 = 0, so T = 155.6 N.'},
    {id:'s04q18',type:'numeric',prompt:'Using Ox = 734.7 N and Oy = −960 N from the pulley example, what is the magnitude R of the pin force?',answer:1.209,tol:0.006,unit:'kN',explain:'R = √(734.7² + 960²) ≈ 1208.9 N = 1.209 kN.'}
  ];

  const practiceS05 = [
    {id:'s05q1',type:'mcq',prompt:'Which set contains the three independent scalar equations normally used for a 2D rigid body in equilibrium?',options:['ΣFx=0, ΣFy=0, ΣM=0','ΣFx=0 only','ΣM=0 only','Fx=Fy=M'],correct:'a',explain:'A general 2D rigid body requires two force-balance equations and one moment-balance equation.'},
    {id:'s05q2',type:'numeric',prompt:'Convert 3.00 kN to kgf using 1 kgf = 9.81 N.',answer:305.81,tol:0.3,unit:'kgf',explain:'3000 N ÷ 9.81 N/kgf = 305.81 kgf.'},
    {id:'s05q3',type:'numeric',prompt:'A 120-N force acts 30° above the +x axis. What is Fx?',answer:103.923,tol:0.2,unit:'N',explain:'Fx = 120 cos 30° = 103.923 N.'},
    {id:'s05q4',type:'mcq',prompt:'If the direction-cosine component λx is negative, then θx is:',options:['Less than 90°','Exactly 90°','Greater than 90°','Always 180°'],correct:'c',explain:'λx = cos θx. A negative cosine means θx lies between 90° and 180°.'},
    {id:'s05q5',type:'numeric',prompt:'For the 2500-N guy-wire example, what is the y-component of force?',answer:2120,tol:10,unit:'N',explain:'Fy = 2500(0.848) ≈ 2120 N.'},
    {id:'s05q6',type:'mcq',prompt:'Which statement correctly describes a rigid-body whole-system FBD?',options:['Internal forces are always drawn','Only external forces and couples acting on the isolated body are drawn','Support reactions are omitted','Moments never appear'],correct:'b',explain:'The whole-body FBD shows external loads, reactions, and applied couples; internal forces are not shown.'},
    {id:'s05q7',type:'mcq',prompt:'Which operation changes the sign of a cross product?',options:['Multiplying both vectors by 1','Reversing the vector order','Writing the determinant','Using Cartesian components'],correct:'b',explain:'Q × P = −(P × Q).'},
    {id:'s05q8',type:'numeric',prompt:'A 50-N vertical force acts downward at x = 0.40 m from O in a 2D problem. What is MO if counterclockwise is positive?',answer:-20,tol:0.05,unit:'N·m',explain:'The force causes clockwise rotation: M = xFy = 0.40(−50) = −20 N·m.'},
    {id:'s05q9',type:'numeric',prompt:'For P = (1,2,2) and Q = (2,0,1), compute P · Q.',answer:4,tol:0.001,unit:'',explain:'P · Q = 1(2)+2(0)+2(1)=4.'},
    {id:'s05q10',type:'numeric',prompt:'For P = (6,8,0) and unit axis λ = (0.8,0.6,0), what is the scalar projection P·λ?',answer:9.6,tol:0.01,unit:'',explain:'P · λ = 6(0.8)+8(0.6)=9.6.'},
    {id:'s05q11',type:'numeric',prompt:'Let a=(2,0,0), b=(0,3,0), c=(0,0,4). What is |a·(b×c)|?',answer:24,tol:0.001,unit:'',explain:'The vectors are mutually perpendicular, so the parallelepiped volume is 2·3·4 = 24.'},
    {id:'s05q12',type:'numeric',prompt:'If the moment vector about O is M=(4,−6,2) N·m and the axis is +z, what is the scalar moment about that axis?',answer:2,tol:0.001,unit:'N·m',explain:'Project M onto k: k·M = 2 N·m.'},
    {id:'s05q13',type:'numeric',prompt:'A 90-N couple has a perpendicular separation of 0.30 m. What is the couple-moment magnitude?',answer:27,tol:0.05,unit:'N·m',explain:'M = Fd = 90(0.30) = 27 N·m.'},
    {id:'s05q14',type:'mcq',prompt:'A force is moved from A to a different point O that is not on its original line of action. To preserve equivalence, you must:',options:['Change only the force magnitude','Add the couple MO = r×F','Delete the force and keep a moment only','Do nothing because transmissibility always applies'],correct:'b',explain:'Moving a force to a different line of action requires the same force at O plus the couple r×F.'},
    {id:'s05q15',type:'numeric',prompt:'The beam example has resultant R = −600 N and moment about A of −1880 N·m. How far from A does the equivalent single force act?',answer:3.13,tol:0.03,unit:'m',explain:'xR = MA gives x = (−1880)/(−600) = 3.13 m.'},
    {id:'s05q16',type:'mcq',prompt:'A roller on a horizontal frictionless surface produces which reaction in a 2D FBD?',options:['Horizontal only','Vertical only','Horizontal and vertical','A pure couple'],correct:'b',explain:'The roller reaction is normal to the supporting surface; for a horizontal surface, that is vertical.'},
    {id:'s05q17',type:'mcq',prompt:'A 2D pin support contributes how many independent reaction components?',options:['One','Two','Three','Four'],correct:'b',explain:'A pin supplies two unknown force components and no reaction moment.'},
    {id:'s05q18',type:'mcq',prompt:'A 2D fixed support contributes:',options:['One unknown','Two unknown force components','Two force components plus one reaction moment','Only one reaction moment'],correct:'c',explain:'A fixed support resists x-translation, y-translation, and rotation.'},
    {id:'s05q19',type:'numeric',prompt:'In the fixed-crane example, what is the horizontal pin reaction Ax?',answer:-107.1,tol:0.3,unit:'kN',explain:'Horizontal equilibrium gives Ax + B = 0, with B=107.1 kN, so Ax=−107.1 kN.'},
    {id:'s05q20',type:'numeric',prompt:'In the roof-frame example, what is the vertical reaction Ey?',answer:200,tol:0.5,unit:'kN',explain:'Vertical equilibrium gives Ey = 200 kN in the lecture solution.'}
  ];

  const masteryS05 = [
    {id:'m05q1',type:'numeric',prompt:'A 70-N force acts along the line whose direction vector is d=(2,−3,6). What is Fx?',answer:20,tol:0.05,unit:'N',explain:'|d|=7, so λ=(2/7,−3/7,6/7) and F=70λ=(20,−30,60) N.'},
    {id:'m05q2',type:'numeric',prompt:'For the same force with d=(2,−3,6), what is Fz?',answer:60,tol:0.05,unit:'N',explain:'The z direction cosine is 6/7, so Fz=70(6/7)=60 N.'},
    {id:'m05q3',type:'numeric',prompt:'A unit vector has λx=0.600. What is θx?',answer:53.13,tol:0.08,unit:'°',explain:'θx=cos⁻¹(0.600)=53.13°.'},
    {id:'m05q4',type:'mcq',prompt:'What is j × i?',options:['+k','−k','+i','0'],correct:'b',explain:'i × j = k, so reversing the order gives j × i = −k.'},
    {id:'m05q5',type:'numeric',prompt:'For r=(0.40,0.20,0) m and F=(50,−20,0) N, what is the z-component of MO=r×F?',answer:-18,tol:0.02,unit:'N·m',explain:'Mz=xFy−yFx=0.40(−20)−0.20(50)=−18 N·m.'},
    {id:'m05q6',type:'numeric',prompt:'A force produces a 30 N·m moment about O and has magnitude 120 N. What is the perpendicular distance from O to its line of action?',answer:0.25,tol:0.002,unit:'m',explain:'d=M/F=30/120=0.25 m.'},
    {id:'m05q7',type:'mcq',prompt:'Varignon’s theorem is most directly used to:',options:['Replace moment of a force by the sum of moments of its components','Replace a force by mass times velocity','Convert all forces into couples','Eliminate the need for an FBD'],correct:'a',explain:'Varignon states that the moment of a resultant/component sum equals the sum of the individual moments about the same point.'},
    {id:'m05q8',type:'numeric',prompt:'For P=(1,2,2) and Q=(2,0,1), what is the angle between P and Q?',answer:53.40,tol:0.12,unit:'°',explain:'P·Q=4, |P|=3, |Q|=√5, so cosθ=4/(3√5) and θ≈53.40°.'},
    {id:'m05q9',type:'numeric',prompt:'P=(6,8,0). What is its projection on the unit axis λ=(0.8,0.6,0)?',answer:9.6,tol:0.01,unit:'',explain:'P·λ=6(0.8)+8(0.6)=9.6.'},
    {id:'m05q10',type:'numeric',prompt:'Find the scalar triple product S·(P×Q) for S=(1,2,3), P=(1,0,0), Q=(0,1,0).',answer:3,tol:0.001,unit:'',explain:'P×Q=k, so S·k=3.'},
    {id:'m05q11',type:'numeric',prompt:'A moment vector is M=(8,−5,12) N·m. What is the scalar moment about the +y axis?',answer:-5,tol:0.001,unit:'N·m',explain:'Project M onto j: j·M=−5 N·m.'},
    {id:'m05q12',type:'mcq',prompt:'Which statement about a couple moment is correct?',options:['It depends on the chosen origin','It is a free vector','Its resultant force is nonzero','It can act only in one plane'],correct:'b',explain:'A couple has zero resultant force and its moment vector is independent of the origin, so it is a free vector.'},
    {id:'m05q13',type:'numeric',prompt:'Two couple vectors are M1=(10,0,0) N·m and M2=(−4,3,0) N·m. What is the magnitude of their resultant couple?',answer:6.7082,tol:0.02,unit:'N·m',explain:'MR=(6,3,0), so |MR|=√(6²+3²)=√45≈6.708 N·m.'},
    {id:'m05q14',type:'numeric',prompt:'A 30-N upward force acts at x=2.0 m from O. If moved to O, what couple moment must be added?',answer:60,tol:0.05,unit:'N·m',explain:'MO=r×F gives Mz=2.0(30)=60 N·m counterclockwise.'},
    {id:'m05q15',type:'numeric',prompt:'A planar system has vertical forces +50 N at x=0, −20 N at x=2 m, and +10 N at x=4 m. What is the resultant vertical force?',answer:40,tol:0.01,unit:'N',explain:'Ry=50−20+10=40 N upward.'},
    {id:'m05q16',type:'numeric',prompt:'For the same force system, what is the resultant moment about x=0?',answer:0,tol:0.01,unit:'N·m',explain:'M=−20(2)+10(4)=−40+40=0 N·m.'},
    {id:'m05q17',type:'mcq',prompt:'A roller rests on a smooth horizontal floor. Which reaction should appear on its FBD?',options:['One vertical reaction','One horizontal reaction','Two force components','A force and a moment'],correct:'a',explain:'A frictionless roller reaction is normal to the surface, so a horizontal floor gives one vertical reaction.'},
    {id:'m05q18',type:'numeric',prompt:'A fixed support at E carries a single 10-kN downward force 2.0 m to the right. What reaction moment magnitude is required at E?',answer:20,tol:0.05,unit:'kN·m',explain:'The load moment is 10(2)=20 kN·m clockwise, so the support must supply an equal counterclockwise reaction moment.'},
    {id:'m05q19',type:'numeric',prompt:'In the pulley example, Ox=734.7 N and Oy=−960 N. What is the pin-force magnitude?',answer:1208.9,tol:2,unit:'N',explain:'R=√(734.7²+960²)=1208.9 N.'},
    {id:'m05q20',type:'mcq',prompt:'A rigid body has ΣFx=0 and ΣFy=0 but ΣM≠0. Is it in static equilibrium?',options:['Yes, because force balance is enough','No, because moment equilibrium also must hold','Yes, if the body is rigid','No, unless all forces are vertical'],correct:'b',explain:'A nonzero resultant moment produces rotational tendency; rigid-body equilibrium requires both zero resultant force and zero resultant moment.'}
  ];

  const referenceExtra = String.raw`
    <section class="referenceGrid formulaGrid preQuizReference">
      <article class="referenceCard referenceItem" data-reference="3d force direction cosines unit vector two points line action components space">
        <div class="referenceSectionTitle"><span>11</span><div><strong>3D FORCE DIRECTION</strong><small>Lecture 03 · §2.4</small></div></div>
        <div class="formulaLine"><b>Direction vector</b><code>d = r₂ − r₁</code></div>
        <div class="formulaLine"><b>Unit vector</b><code>λ = d / |d|</code></div>
        <div class="formulaLine"><b>Force</b><code>F = F λ</code></div>
        <div class="formulaLine"><b>Direction cosines</b><code>cos²θx + cos²θy + cos²θz = 1</code></div>
      </article>
      <article class="referenceCard referenceItem" data-reference="cross product vector product right hand moment force point varignon rectangular moment">
        <div class="referenceSectionTitle"><span>12</span><div><strong>CROSS PRODUCT & MOMENT ABOUT A POINT</strong><small>Lecture 03 · §§3.3–3.5</small></div></div>
        <div class="formulaLine"><b>Cross product</b><code>P × Q = PQ sinθ n</code></div>
        <div class="formulaLine"><b>Moment</b><code>M_O = r × F</code></div>
        <div class="formulaLine"><b>Magnitude</b><code>M = Fd</code></div>
        <div class="formulaLine"><b>2D component</b><code>M_z = xF_y − yF_x</code></div>
        <div class="referenceNote">Counterclockwise is positive and clockwise negative in the lecture's 2D convention.</div>
      </article>
      <article class="referenceCard referenceItem" data-reference="dot scalar product angle projection axis mixed triple volume">
        <div class="referenceSectionTitle"><span>13</span><div><strong>DOT & MIXED TRIPLE PRODUCTS</strong><small>Lecture 04 · §§3.6–3.7</small></div></div>
        <div class="formulaLine"><b>Dot product</b><code>P · Q = PQ cosθ</code></div>
        <div class="formulaLine"><b>Projection</b><code>P_OL = P · λ</code></div>
        <div class="formulaLine"><b>Scalar triple</b><code>S · (P × Q)</code></div>
        <div class="formulaLine"><b>Volume</b><code>V = |a · (b × c)|</code></div>
      </article>
      <article class="referenceCard referenceItem" data-reference="moment about axis axis projection lambda arbitrary axis">
        <div class="referenceSectionTitle"><span>14</span><div><strong>MOMENT ABOUT AN AXIS</strong><small>Lecture 04 · §3.8</small></div></div>
        <div class="formulaLine"><b>Axis moment</b><code>M_OL = λ · (r × F)</code></div>
        <div class="formulaLine"><b>Arbitrary axis through B</b><code>M_BL = λ · (r_A/B × F)</code></div>
        <div class="referenceNote">Choose any point B on the desired axis; the scalar moment about that axis is unchanged.</div>
      </article>
      <article class="referenceCard referenceItem" data-reference="couple moment equivalent free vector force couple resolution reduction resultant system">
        <div class="referenceSectionTitle"><span>15</span><div><strong>COUPLES & FORCE-COUPLE SYSTEMS</strong><small>Lecture 04 · §§3.9–3.11</small></div></div>
        <div class="formulaLine"><b>Couple</b><code>M = Fd</code></div>
        <div class="formulaLine"><b>Move force to O</b><code>M_O = r × F</code></div>
        <div class="formulaLine"><b>Resultant</b><code>R = ΣF</code></div>
        <div class="formulaLine"><b>Resultant couple</b><code>M_O^R = Σ(r × F)</code></div>
        <div class="formulaLine"><b>Move system</b><code>M_O′^R = M_O^R + s × R</code></div>
      </article>
      <article class="referenceCard referenceItem" data-reference="support reactions roller pin hinge fixed support rigid body equilibrium fbd two dimensional">
        <div class="referenceSectionTitle"><span>16</span><div><strong>2D SUPPORTS & RIGID-BODY EQUILIBRIUM</strong><small>Lecture 04 · §§4.1–4.4</small></div></div>
        <div class="formulaLine"><b>Equilibrium</b><code>ΣF_x = 0, ΣF_y = 0, ΣM = 0</code></div>
        <div class="formulaLine"><b>Roller</b><code>1 reaction normal to surface</code></div>
        <div class="formulaLine"><b>Pin / hinge</b><code>2 force components</code></div>
        <div class="formulaLine"><b>Fixed support</b><code>2 force components + 1 moment</code></div>
      </article>
      <article class="referenceCard referenceItem" data-reference="glossary direction cosine unit vector transmissibility moment arm varignon projection couple force couple support reaction equilibrium rigid body">
        <div class="referenceSectionTitle"><span>17</span><div><strong>GLOSSARY · LECTURES 03–04</strong><small>New terms added before Quiz I</small></div></div>
        <dl class="glossaryList">
          <div><dt>Direction cosine</dt><dd>The cosine of the angle between a vector and a coordinate axis; it is also a component of the vector's unit direction vector.</dd></div>
          <div><dt>Unit vector</dt><dd>A vector of magnitude 1 used to specify direction.</dd></div>
          <div><dt>Principle of transmissibility</dt><dd>A rigid-body force may slide along the same line of action without changing its external effect.</dd></div>
          <div><dt>Moment arm</dt><dd>The shortest perpendicular distance from the moment point or axis to the force's line of action.</dd></div>
          <div><dt>Varignon's theorem</dt><dd>The moment of a resultant about a point equals the sum of the moments of its component forces about that point.</dd></div>
          <div><dt>Scalar projection</dt><dd>The signed component of a vector along a chosen axis, found with a dot product against the axis unit vector.</dd></div>
          <div><dt>Couple</dt><dd>Two equal, opposite, parallel forces separated by a distance, producing zero net force and a pure moment.</dd></div>
          <div><dt>Force-couple system</dt><dd>An equivalent representation consisting of a force applied at a chosen point plus a couple moment.</dd></div>
          <div><dt>Support reaction</dt><dd>The force and/or moment supplied by a support after that support is removed in a free-body diagram.</dd></div>
          <div><dt>Rigid-body equilibrium</dt><dd>A condition requiring both zero resultant force and zero resultant moment.</dd></div>
        </dl>
      </article>
      <article class="referenceCard referenceItem quizScopeRef" data-reference="quiz 1 scope formula pre quiz lectures 1 2 3 4 review">
        <div class="referenceSectionTitle"><span>Q1</span><div><strong>QUIZ I BOUNDARY</strong><small>Lectures 01–04 only</small></div></div>
        <ol class="referenceChecklist">
          <li>Introduction, units, conversions, numerical accuracy, trig/vector review.</li>
          <li>Planar particle forces, resultants, equilibrium, and FBDs.</li>
          <li>3D force vectors, unit vectors, direction cosines.</li>
          <li>Rigid-body forces, transmissibility, cross/dot/triple products.</li>
          <li>Moments about a point and axis, couples, force-couple systems, system reduction.</li>
          <li>Rigid-body FBDs, 2D support reactions, and 2D rigid-body equilibrium.</li>
        </ol>
      </article>
    </section>
  `;

  return {lessonS02Append, lessonS04, lessonS05, practiceS02Extra, practiceS04, practiceS05, masteryS05, referenceExtra};
})();