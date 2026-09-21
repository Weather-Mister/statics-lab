const SUPABASE_URL = 'https://ibkirlsqpzmhuwssdcjj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_gJRYvB2xFG38UrWiWOUu0A_ZtckUPmx';
const USERNAME_KEY = 'staticsCloudUsername';
const PROFILE_PREFIX = 'staticsProfileState:';
const ANON_KEY = 'staticsAnonState';
const META_PREFIX = 'staticsCloudMeta:';
const NOTES_OPEN_KEY = 'staticsNotesOpen';

const lessonSlots = [
  {id:'s01',week:1,kind:'lesson',available:true,coverage:'loaded',unit:'WEEK 01 · LECTURE 01',title:'Introduction & Statics of Particles I',desc:'Official Week 1 topic. Current uploaded material covers the introduction to mechanics, fundamental concepts, unit systems and conversions, problem-solving method, numerical accuracy, trigonometry, and vector review.'},
  {id:'s02',week:2,kind:'lesson',available:true,coverage:'loaded',unit:'WEEK 02 · LECTURES 02–03',title:'Statics of Particles II & Rigid Bodies I',desc:'Official Week 2 topic. Lectures 02–03 now cover planar particle statics, 3D force vectors and direction cosines, rigid-body force concepts, transmissibility, vector products, and moments of a force about a point.'},
  {id:'s03',week:3,kind:'holiday',available:false,coverage:'event',unit:'WEEK 03',title:'Holiday',desc:''},
  {id:'s04',week:4,kind:'lesson',available:true,coverage:'loaded',unit:'WEEK 04 · LECTURE 04',title:'Rigid Bodies II & Equilibrium of Rigid Bodies',desc:'Lecture 04 completes the pre-Quiz-I rigid-body material: scalar and mixed triple products, moments about axes, couples, equivalent force-couple systems, force-system reduction, rigid-body free-body diagrams, 2D support reactions, and 2D rigid-body equilibrium.'},
  {id:'s05',week:5,kind:'quiz',available:true,coverage:'quizprep',unit:'WEEK 05 · QUIZ I PREP',title:'Quiz I',desc:'Complete review of all material available before Quiz I, built from ME1005 Lectures 01–04 with textbook support. Includes a scope map, formula checklist, immediate-feedback review problems, and a mixed mock set.'},
  {id:'s06',week:6,kind:'lesson',available:false,coverage:'planned',unit:'WEEK 06',title:'Distributed Forces: Centroids and Centers of Gravity',desc:''},
  {id:'s07',week:7,kind:'lesson',available:false,coverage:'planned',unit:'WEEK 07',title:'Analysis of Structures',desc:''},
  {id:'s08',week:8,kind:'exam',available:false,coverage:'event',unit:'WEEK 08',title:'Midterm Exam',desc:''},
  {id:'s09',week:9,kind:'lesson',available:false,coverage:'planned',unit:'WEEK 09',title:'Internal Forces and Moments I',desc:''},
  {id:'s10',week:10,kind:'lesson',available:false,coverage:'planned',unit:'WEEK 10',title:'Internal Forces and Moments II & Friction I',desc:''},
  {id:'s11',week:11,kind:'lesson',available:false,coverage:'planned',unit:'WEEK 11',title:'Friction II',desc:''},
  {id:'s12',week:12,kind:'exam',available:false,coverage:'event',unit:'WEEK 12',title:'Quiz II',desc:''},
  {id:'s13',week:13,kind:'lesson',available:false,coverage:'planned',unit:'WEEK 13',title:'Distributed Forces: Moments of Inertia I',desc:''},
  {id:'s14',week:14,kind:'lesson',available:false,coverage:'planned',unit:'WEEK 14',title:'Distributed Forces: Moments of Inertia II & Method of Virtual Work I',desc:''},
  {id:'s15',week:15,kind:'lesson',available:false,coverage:'planned',unit:'WEEK 15',title:'Method of Virtual Work II',desc:''},
  {id:'s16',week:16,kind:'exam',available:false,coverage:'event',unit:'WEEK 16',title:'Final Exam',desc:''}
];

const loadedIds = new Set(lessonSlots.filter(x=>x.available).map(x=>x.id));

function texHtml(strings,...values){
  return String.raw(strings,...values)
    .replace(/\\\\\(/g,'\\(')
    .replace(/\\\\\)/g,'\\)')
    .replace(/\\\\\[/g,'\\[')
    .replace(/\\\\\]/g,'\\]');
}

const lessonHtml = {
  s01: texHtml`
    <div class="sourceStrip"><span>PRIMARY</span><b>ME1005-01-2026.pdf</b><span>SUPPORT</span><b>Vector Mechanics for Engineers: Statics, 12e · Chapter 1</b></div>
    <div class="sheetKicker">LECTURE 01 · CHAPTER 1</div>
    <h2>Introduction to Mechanics</h2>
    <p class="lessonLead">This lesson establishes the language and bookkeeping rules used throughout Statics. The important distinction is that mechanics is not just equation manipulation: first identify the physical system, then choose a consistent model and unit system, and only then calculate.</p>

    <section class="lessonSection">
      <div class="sectionNo">1.1</div>
      <div class="sectionContent">
        <h3>What mechanics studies</h3>
        <p><strong>Mechanics</strong> studies bodies under the action of forces. In the course structure, rigid-body mechanics divides into <strong>statics</strong> and <strong>dynamics</strong>: statics treats bodies at rest or moving with constant velocity, while dynamics treats accelerating bodies. The lecture also distinguishes deformable-solid mechanics and fluid mechanics.</p>
        <div class="conceptGrid twoCol">
          <div class="conceptBox"><span>STATICS</span><strong>Zero acceleration</strong><p>Rest or constant velocity. The force system must satisfy equilibrium conditions.</p></div>
          <div class="conceptBox"><span>DYNAMICS</span><strong>Nonzero acceleration</strong><p>The resultant force is related to mass and acceleration.</p></div>
        </div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">1.2</div>
      <div class="sectionContent">
        <h3>Fundamental concepts and idealizations</h3>
        <div class="termMatrix">
          <div><b>Space</b><span>Locates a point relative to an origin using coordinates.</span></div>
          <div><b>Time</b><span>Needed together with position to specify an event.</span></div>
          <div><b>Mass</b><span>Characterizes a body's response in mechanical experiments.</span></div>
          <div><b>Force</b><span>Action of one body on another; characterized by application point, magnitude, and direction.</span></div>
          <div><b>Particle</b><span>A model in which body size and shape do not affect the solution.</span></div>
          <div><b>Rigid body</b><span>An idealized body whose particles remain at fixed positions relative to one another.</span></div>
        </div>
        <div class="formulaBanner"><span>NEWTON'S SECOND LAW</span><code>\\(\mathbf F = m\mathbf a\\)</code><small>The lecture uses this relation to define a consistent fourth kinetic unit from the other three.</small></div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">1.2B</div>
      <div class="sectionContent">
        <h3>Six fundamental principles named in the course</h3>
        <div class="principleList">
          <div><b>Parallelogram law</b><span>Two forces on a particle may be replaced by their vector resultant, represented by the parallelogram diagonal.</span></div>
          <div><b>Principle of transmissibility</b><span>For a rigid body, moving a force along the same line of action does not change the external equilibrium or motion effect.</span></div>
          <div><b>Newton's first law</b><span>If the resultant force on a particle is zero, it remains at rest or continues at constant speed in a straight line.</span></div>
          <div><b>Newton's second law</b><span>The resultant force determines acceleration according to \\(\mathbf F=m\mathbf a\\).</span></div>
          <div><b>Newton's third law</b><span>Action and reaction forces between contacting bodies are equal in magnitude, collinear, and opposite in sense.</span></div>
          <div><b>Newton's gravitation law</b><span>Two masses attract one another with equal and opposite gravitational forces.</span></div>
        </div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">1.3</div>
      <div class="sectionContent">
        <h3>Systems of units</h3>
        <p>The four kinetic quantities are length, time, mass, and force. Three are selected as base units; the fourth must be compatible with \\(F=ma\\).</p>
        <div class="dataTableWrap"><table class="dataTable"><thead><tr><th>System</th><th>Length</th><th>Time</th><th>Mass</th><th>Force</th></tr></thead><tbody>
          <tr><td>SI</td><td>meter (m)</td><td>second (s)</td><td>kilogram (kg)</td><td>newton (N), derived</td></tr>
          <tr><td>U.S. customary</td><td>foot (ft)</td><td>second (s)</td><td>slug, derived</td><td>pound-force (lbf)</td></tr>
        </tbody></table></div>
        <div class="equationRow"><code>\\(1\,\mathrm N = 1\,\mathrm{kg}\cdot\mathrm m/\mathrm{s}^2\\)</code><code>\\(1\,\mathrm{slug}=1\,\mathrm{lbf}\cdot\mathrm{s}^2/\mathrm{ft}\\)</code></div>
        <div class="lessonNote"><b>Notation used on this site:</b> <strong>lbm</strong> means pound mass and <strong>lbf</strong> means pound-force. This avoids the common ambiguity of writing both as “lb”.</div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">1.4</div>
      <div class="sectionContent">
        <h3>Conversions you are expected to handle</h3>
        <div class="conversionTiles">
          <div><b>Length</b><span>1 ft = 0.3048 m</span><span>1 in = 25.4 mm</span><span>1 mi = 1.60934 km</span></div>
          <div><b>Force / mass</b><span>1 lbf = 4.448 N</span><span>1 kgf = 9.81 N</span><span>1 slug = 14.59 kg</span></div>
          <div><b>Temperature</b><span>°F = (9/5)°C + 32</span><span>K = °C + 273.15</span></div>
          <div><b>Volume</b><span>1 L = 1000 cm³</span><span>1 m³ = 1000 L</span></div>
        </div>
        <div class="prefixRail"><span>G · 10⁹</span><span>M · 10⁶</span><span>k · 10³</span><span>m · 10⁻³</span><span>μ · 10⁻⁶</span><span>n · 10⁻⁹</span></div>
      </div>
    </section>

    <section class="lessonSection workedSection">
      <div class="sectionNo">EX</div>
      <div class="sectionContent">
        <h3>Lecture examples: mass, weight, and unit conversion</h3>
        <div class="workedGrid">
          <article class="workedExample"><span>WEIGHT</span><p>For a 1 kg mass near Earth's surface, use \\(W=mg\\):</p><code>\\(W=(1)(9.81)=9.81\,\mathrm N\\)</code></article>
          <article class="workedExample"><span>SLUG</span><p>A 1 slug mass under standard U.S. gravity has weight:</p><code>\\(W=(1)(32.2)=32.2\,\mathrm{lbf}\\)</code></article>
          <article class="workedExample"><span>AREA</span><p>Convert 5000 in² to m²:</p><code>\\(5000(0.0254)^2=3.2258\,\mathrm{m}^2\\)</code></article>
          <article class="workedExample"><span>MOMENT UNIT</span><p>The lecture uses conversion factors directly; for 6 kN·m:</p><code>\\(6\,\mathrm{kN\,m}\approx5.31\times10^4\,\mathrm{lbf\,in}\\)</code></article>
        </div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">1.5</div>
      <div class="sectionContent">
        <h3>Method of solving mechanics problems</h3>
        <div class="methodSteps">
          <div><span>1</span><b>Problem statement</b><p>Identify the given data, what must be found, and the geometry.</p></div>
          <div><span>2</span><b>Free-body diagrams</b><p>Draw a separate diagram for each selected body and show all forces acting on it.</p></div>
          <div><span>3</span><b>Fundamental principles</b><p>Write equations justified by mechanics, then solve the resulting algebra.</p></div>
          <div><span>4</span><b>Solution check</b><p>Check units, reasoning, and—when possible—substitute into an unused relation.</p></div>
        </div>
        <div class="lessonNote"><b>Textbook connection:</b> the textbook organizes the same discipline as Strategy → Modeling → Analysis → Reflect & Think.</div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">1.6</div>
      <div class="sectionContent">
        <h3>Numerical accuracy</h3>
        <p>A computed answer cannot be more accurate than the least accurate input. The lecture's engineering rule of thumb is to report values beginning with 1 using four significant digits and most other values using three significant digits.</p>
        <div class="workedExample compactExample"><span>LECTURE EXAMPLE</span><p>The average of 10.1 kg, 9.81 kg, and 10.20 kg is 10.0366… kg, but the source reports it as <strong>10.0 kg</strong> because the least precise data control the final precision.</p></div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">MATH</div>
      <div class="sectionContent">
        <h3>Trigonometry and vector review used by Statics</h3>
        <div class="formulaBoard">
          <div><b>Right-triangle ratios</b><code>\\(\sin A=\frac{\text{opposite}}{\text{hypotenuse}},\quad \cos A=\frac{\text{adjacent}}{\text{hypotenuse}},\quad \tan A=\frac{\text{opposite}}{\text{adjacent}}\\)</code></div>
          <div><b>Pythagorean theorem</b><code>\\(c^2=a^2+b^2\\)</code></div>
          <div><b>Law of sines</b><code>\\(\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}\\)</code></div>
          <div><b>Law of cosines</b><code>\\(a^2=b^2+c^2-2bc\cos A\\)</code></div>
          <div><b>Dot product</b><code>\\(\mathbf a\cdot\mathbf b=a_1b_1+a_2b_2+a_3b_3\\)</code></div>
          <div><b>Cross product</b><code>\\(\mathbf a\times\mathbf b=(a_2b_3-a_3b_2)\mathbf i+(a_3b_1-a_1b_3)\mathbf j+(a_1b_2-a_2b_1)\mathbf k\\)</code></div>
        </div>
      </div>
    </section>

    <div class="coverageBoundary"><b>Syllabus boundary</b><span>The official Week 1 title also says “Statics of Particles I.” The currently uploaded ME1005-01 file contains the Chapter 1 introduction plus trigonometry/vector review, so no additional particle-statics material is inserted here unless a matching Week 1 source is provided.</span></div>
  `,

  s02: texHtml`
    <div class="sourceStrip"><span>PRIMARY</span><b>ME1005-02.pdf</b><span>SUPPORT</span><b>Vector Mechanics for Engineers: Statics, 12e · Chapter 2 §§2.1–2.3</b></div>
    <div class="sheetKicker">LECTURE 02 · CHAPTER 2</div>
    <h2>Statics of Particles: Planar Forces & Equilibrium</h2>
    <p class="lessonLead">This lesson treats a body as a particle: its size and shape are not important to the force analysis, so all forces can be treated as acting at one point. The uploaded lesson develops planar force addition, rectangular components, and particle equilibrium through free-body diagrams.</p>

    <section class="lessonSection">
      <div class="sectionNo">2.1</div>
      <div class="sectionContent">
        <h3>Force as a vector and the resultant of two forces</h3>
        <p>A force is characterized by its <strong>point of application</strong>, <strong>magnitude</strong>, <strong>line of action</strong>, and <strong>sense</strong>. Two forces acting on the same particle combine vectorially; their single equivalent force is the <strong>resultant</strong>.</p>
        <div class="vectorSketch" aria-hidden="true">
          <svg viewBox="0 0 520 190" role="img">
            <defs><marker id="arrA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#b45633"/></marker><marker id="arrB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#2a6870"/></marker></defs>
            <circle cx="95" cy="145" r="5" fill="#293a40"/><line x1="95" y1="145" x2="225" y2="115" stroke="#b45633" stroke-width="4" marker-end="url(#arrA)"/><line x1="95" y1="145" x2="170" y2="45" stroke="#b45633" stroke-width="4" marker-end="url(#arrA)"/><line x1="95" y1="145" x2="300" y2="15" stroke="#2a6870" stroke-width="5" marker-end="url(#arrB)"/><line x1="225" y1="115" x2="300" y2="15" stroke="#809092" stroke-width="2" stroke-dasharray="7 6"/><line x1="170" y1="45" x2="300" y2="15" stroke="#809092" stroke-width="2" stroke-dasharray="7 6"/><text x="220" y="105">P</text><text x="160" y="36">Q</text><text x="285" y="34">R</text>
          </svg>
        </div>
        <div class="formulaBanner"><span>VECTOR SUM</span><code>\\(\mathbf R=\mathbf P+\mathbf Q\\)</code><small>The same vector addition can be drawn with the parallelogram rule or the triangle rule.</small></div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">VEC</div>
      <div class="sectionContent">
        <h3>Vector language used in the lecture</h3>
        <div class="termMatrix">
          <div><b>Vector</b><span>Has magnitude and direction and obeys vector-addition rules.</span></div>
          <div><b>Scalar</b><span>Has magnitude but no direction.</span></div>
          <div><b>Fixed / bound vector</b><span>Its point of application is essential to the analysis.</span></div>
          <div><b>Free vector</b><span>May be moved in space without changing its mathematical effect.</span></div>
          <div><b>Sliding vector</b><span>May move along its line of action without changing its external effect on a rigid body.</span></div>
          <div><b>Concurrent forces</b><span>Forces whose lines of action pass through a common point.</span></div>
        </div>
        <div class="formulaBoard">
          <div><b>Vector subtraction</b><code>\\(\mathbf P-\mathbf Q=\mathbf P+(-\mathbf Q)\\)</code></div>
          <div><b>Commutative addition</b><code>\\(\mathbf P+\mathbf Q=\mathbf Q+\mathbf P\\)</code></div>
          <div><b>Law of cosines</b><code>\\(R^2=P^2+Q^2-2PQ\cos B\\)</code></div>
          <div><b>Law of sines</b><code>\\(\frac{\sin A}{Q}=\frac{\sin B}{R}=\frac{\sin C}{P}\\)</code></div>
        </div>
      </div>
    </section>

    <section class="lessonSection workedSection">
      <div class="sectionNo">EX 2.1</div>
      <div class="sectionContent">
        <h3>Two-force resultant: 40 N and 60 N</h3>
        <p>The lecture example has \\(P=40\,\mathrm N\\) at 20° and \\(Q=60\,\mathrm N\\) another 25° above P. The interior triangle angle opposite R is 155°.</p>
        <div class="workedFlow">
          <div><span>1</span><p>Law of cosines</p><code>\\(R^2=40^2+60^2-2(40)(60)\cos155^\circ\\)</code></div>
          <div><span>2</span><p>Magnitude</p><code>\\(R=97.73\,\mathrm N\\)</code></div>
          <div><span>3</span><p>Law of sines gives the small triangle angle</p><code>\\(A\approx15.04^\circ\\)</code></div>
          <div><span>4</span><p>Direction from the horizontal</p><code>\\(\alpha=20^\circ+A\approx35.04^\circ\\)</code></div>
        </div>
        <div class="answerStamp">LECTURE RESULT · \\(R\approx97.7\,\mathrm N\\), \\(\alpha\approx35.0^\circ\\)</div>
      </div>
    </section>

    <section class="lessonSection workedSection">
      <div class="sectionNo">EX 2.2</div>
      <div class="sectionContent">
        <h3>Tugboats and minimum tension</h3>
        <p>For the lecture's 5000-lbf resultant along the barge axis with \\(\alpha=45^\circ\\), the trigonometric solution gives approximately \\(T_1=3660\,\mathrm{lbf}\\) and \\(T_2=2590\,\mathrm{lbf}\\). The minimum possible \\(T_2\\) occurs when the two rope-force directions are perpendicular.</p>
        <div class="equationRow"><code>\\(T_{2,\min}=5000\sin30^\circ=2500\,\mathrm{lbf}\\)</code><code>\\(T_1=5000\cos30^\circ\approx4330\,\mathrm{lbf}\\)</code></div>
        <div class="answerStamp">MINIMUM CONDITION · \\(\alpha=60^\circ\\)</div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">2.2</div>
      <div class="sectionContent">
        <h3>Rectangular components and unit vectors</h3>
        <p>Resolving forces into perpendicular x and y components is the standard analytical route for several concurrent forces.</p>
        <div class="formulaBoard">
          <div><b>Cartesian form</b><code>\\(\mathbf F=F_x\mathbf i+F_y\mathbf j\\)</code></div>
          <div><b>Components from angle θ</b><code>\\(F_x=F\cos\theta,\qquad F_y=F\sin\theta\\)</code></div>
          <div><b>Resultant components</b><code>\\(R_x=\sum F_x,\qquad R_y=\sum F_y\\)</code></div>
          <div><b>Magnitude and direction</b><code>\\(R=\sqrt{R_x^2+R_y^2},\qquad \theta=\tan^{-1}(R_y/R_x)\\)</code></div>
        </div>
        <div class="lessonNote"><b>Quadrant check:</b> \\(\tan^{-1}(R_y/R_x)\\) alone may not identify the correct quadrant. Always use the signs of \\(R_x\\) and \\(R_y\\) (or an atan2 calculation) to confirm the direction.</div>
      </div>
    </section>

    <section class="lessonSection workedSection">
      <div class="sectionNo">EX 2.3</div>
      <div class="sectionContent">
        <h3>Four-force component sum</h3>
        <p>In the lecture's bolt example, resolving every force gives a resultant component sum of \\(R_x=+199.1\,\mathrm N\\) and \\(R_y=+14.3\,\mathrm N\\).</p>
        <div class="equationRow"><code>\\(R=\sqrt{199.1^2+14.3^2}=199.6\,\mathrm N\\)</code><code>\\(\alpha=\tan^{-1}(14.3/199.1)\approx4.1^\circ\\)</code></div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">2.3</div>
      <div class="sectionContent">
        <h3>Equilibrium of a particle</h3>
        <p>A particle is in equilibrium when the resultant of all forces acting on it is zero. For a planar force system, this vector condition becomes two independent scalar equations.</p>
        <div class="formulaBanner"><span>PLANAR PARTICLE EQUILIBRIUM</span><code>\\(\sum F_x=0,\qquad \sum F_y=0\\)</code><small>These two equations can determine at most two independent unknown force quantities without additional information.</small></div>
        <div class="conceptGrid twoCol">
          <div class="conceptBox"><span>TWO FORCES</span><strong>Equal, opposite, collinear</strong><p>If only two forces act on an equilibrium particle, these conditions must all hold.</p></div>
          <div class="conceptBox"><span>THREE OR MORE</span><strong>Closed force polygon</strong><p>Graphically the force vectors close; algebraically their x and y component sums are zero.</p></div>
        </div>
      </div>
    </section>

    <section class="lessonSection">
      <div class="sectionNo">FBD</div>
      <div class="sectionContent">
        <h3>Space diagram vs. free-body diagram</h3>
        <div class="fbdCompare">
          <div><b>Space diagram</b><p>Shows the physical arrangement and geometry of the actual situation.</p></div>
          <div><b>Free-body diagram</b><p>Isolates the selected particle and shows only the external forces acting on that particle.</p></div>
        </div>
        <ol class="referenceChecklist compactList">
          <li>Choose the particle or junction to isolate.</li>
          <li>Remove the surroundings and replace each interaction with the force it exerts.</li>
          <li>Show known geometry or force directions needed to resolve components.</li>
          <li>Choose coordinate axes and write \\(\sum F_x=0\\), \\(\sum F_y=0\\).</li>
          <li>Check signs, units, and whether the final force directions are physically sensible.</li>
        </ol>
      </div>
    </section>

    <section class="lessonSection workedSection">
      <div class="sectionNo">EX</div>
      <div class="sectionContent">
        <h3>Equilibrium examples from the lecture</h3>
        <div class="workedGrid">
          <article class="workedExample"><span>SHIP UNLOADING</span><p>A 3500-lbf automobile is supported at a junction by two cables. The force-triangle solution in the lecture gives:</p><code>\\(T_{AB}\approx3570\,\mathrm{lbf},\qquad T_{AC}\approx144\,\mathrm{lbf}\\)</code></article>
          <article class="workedExample"><span>SAILBOAT MODEL</span><p>With \\(T_{AB}=40\,\mathrm{lbf}\\), \\(T_{AE}=60\,\mathrm{lbf}\\), \\(\alpha=60.26^\circ\\), and \\(\beta=20.56^\circ\\), component equilibrium gives:</p><code>\\(T_{AC}\approx42.9\,\mathrm{lbf},\qquad F_D\approx19.66\,\mathrm{lbf}\\)</code></article>
        </div>
      </div>
    </section>

    `
};

const practiceBank = {
  s01: [
    {id:'s01q1',type:'mcq',prompt:'Which statement best matches the lecture definition of mechanics?',options:['Study of energy only','Study of bodies under the action of forces','Study of deformable solids only','Study of bodies only when they accelerate'],correct:'b',explain:'The lecture defines mechanics as the study of bodies under the action of forces.'},
    {id:'s01q2',type:'mcq',prompt:'In the lecture classification, a rigid body moving with constant velocity belongs to:',options:['Statics','Dynamics','Fluid mechanics','Thermodynamics'],correct:'a',explain:'The lecture places rest and constant-velocity rigid-body cases under statics.'},
    {id:'s01q3',type:'mcq',prompt:'Which quantity is the derived kinetic unit in SI mechanics?',options:['Length','Time','Mass','Force'],correct:'d',explain:'SI uses meter, second, and kilogram as base units; force is derived from F = ma.'},
    {id:'s01q4',type:'numeric',prompt:'Using the lecture conversion, how many kilograms are in 1 slug?',answer:14.59,tol:0.03,unit:'kg',explain:'1 slug = 14.59 kg.'},
    {id:'s01q5',type:'numeric',prompt:'Convert 3 kN to kgf using 1 kgf = 9.81 N.',answer:305.81,tol:0.25,unit:'kgf',explain:'3000 N ÷ 9.81 N/kgf = 305.81 kgf.'},
    {id:'s01q6',type:'numeric',prompt:'Convert 5000 in² to m². Use 1 in = 0.0254 m.',answer:3.2258,tol:0.005,unit:'m²',explain:'Area conversion squares the length factor: 5000(0.0254)² = 3.2258 m².'},
    {id:'s01q7',type:'mcq',prompt:'The data 10.1 kg, 9.81 kg, and 10.20 kg average to 10.0366… kg. Following the lecture’s accuracy rule, which reported value is used?',options:['10.0367 kg','10.04 kg','10.0 kg','10 kg exactly'],correct:'c',explain:'The least precise data control the reported precision; the lecture records 10.0 kg.'},
    {id:'s01q8',type:'numeric',prompt:'For a = [1, 2, 3] and b = [4, −1, 2], evaluate a · b.',answer:8,tol:0.001,unit:'',explain:'a · b = 1(4) + 2(−1) + 3(2) = 8.'}
  ],
  s02: [
    {id:'s02q1',type:'mcq',prompt:'A set of forces is concurrent when:',options:['All forces have equal magnitude','Their lines of action pass through one common point','All forces are horizontal','Their vector sum is always zero'],correct:'b',explain:'Concurrent forces have lines of action that intersect at one point.'},
    {id:'s02q2',type:'numeric',prompt:'For the lecture example P = 40 N and Q = 60 N with the geometry shown in class, what is the resultant magnitude?',answer:97.73,tol:0.2,unit:'N',explain:'Using the force triangle and the law of cosines gives R = 97.73 N.'},
    {id:'s02q3',type:'numeric',prompt:'For that same 40 N / 60 N lecture example, what is the resultant direction α measured from the horizontal?',answer:35.04,tol:0.25,unit:'°',explain:'The law of sines gives A ≈ 15.04°, so α = 20° + A ≈ 35.04°.'},
    {id:'s02q4',type:'numeric',prompt:'A 100 N force acts 30° above the +x axis. What is its x-component?',answer:86.6025,tol:0.15,unit:'N',explain:'Fx = F cos θ = 100 cos 30° = 86.6 N.'},
    {id:'s02q5',type:'numeric',prompt:'In the lecture four-force bolt example, Rx = 199.1 N and Ry = 14.3 N. What is the resultant magnitude?',answer:199.6,tol:0.3,unit:'N',explain:'R = √(199.1² + 14.3²) ≈ 199.6 N.'},
    {id:'s02q6',type:'mcq',prompt:'For a particle in planar equilibrium, which pair is sufficient to express the vector equilibrium condition?',options:['ΣFx = 0 and ΣFy = 0','ΣFx = 1 and ΣFy = 1','ΣM = 0 only','Fx = Fy'],correct:'a',explain:'For a planar particle, R = ΣF = 0 resolves into ΣFx = 0 and ΣFy = 0.'},
    {id:'s02q7',type:'numeric',prompt:'In the ship-unloading lecture example, approximately what is the tension TAC?',answer:144,tol:2,unit:'lbf',explain:'The lecture’s force-triangle solution gives TAC ≈ 144 lbf.'},
    {id:'s02q8',type:'numeric',prompt:'In the sailboat lecture example, approximately what is the tension TAC?',answer:42.9,tol:0.35,unit:'lbf',explain:'Resolving the equilibrium equations gives TAC ≈ 42.9 lbf.'}
  ]
};

function safeTeXHtml(s){
  return String(s||'')
    .split(String.raw`\boldsymbol\lambda`).join(String.raw`\lambda`)
    .split(String.raw`\boldsymbol`).join(String.raw`\mathbf`);
}
const teaching=window.STATICS_TEACHING||null;
if(teaching){
  lessonHtml.s01 += safeTeXHtml(teaching.lessonS01Deep);
  lessonHtml.s02 += safeTeXHtml(teaching.lessonS02ParticleDeep);
}
if(window.PREQUIZ){
  lessonHtml.s02 += safeTeXHtml(window.PREQUIZ.lessonS02Append);
  lessonHtml.s04 = safeTeXHtml(window.PREQUIZ.lessonS04);
  lessonHtml.s05 = safeTeXHtml(window.PREQUIZ.lessonS05);
  // Keep only the conceptual/fresh base checks; remove lecture-answer recall items now that fresh geometry covers those skills.
  practiceBank.s02 = [...(practiceBank.s02||[]).filter(q=>!['s02q2','s02q3','s02q5','s02q7','s02q8'].includes(q.id)),...(window.PREQUIZ.practiceS02Extra||[])];
  practiceBank.s04 = window.PREQUIZ.practiceS04||[];
  practiceBank.s05 = window.PREQUIZ.practiceS05||[];
}
if(teaching){
  lessonHtml.s02 += safeTeXHtml(teaching.lessonS02RigidDeep);
  lessonHtml.s04 += safeTeXHtml(teaching.lessonS04Deep);
  lessonHtml.s05 += safeTeXHtml(teaching.lessonS05Deep);
  for(const [id,qs] of Object.entries(teaching.practiceAdditions||{})) practiceBank[id]=[...(practiceBank[id]||[]),...qs];
}
const masteryBank = {s05:window.PREQUIZ?.masteryS05||[]};
if(teaching){
  for(const [id,qs] of Object.entries(teaching.masteryAdditions||{})){
    const additions=(id==='s05'&&window.QUIZ1_HARD_ONLY)
      ? qs.filter(q=>(window.QUIZ1_HARD_TEACHING_IDS||[]).includes(q.id)).map(q=>({...q,section:'HARD SYNTHESIS · UNFAMILIAR GEOMETRY'}))
      : qs;
    masteryBank[id]=[...(masteryBank[id]||[]),...additions];
  }
}

function referenceHtml(){return `
  <div class="referenceSearchBar">
    <label for="referenceSearch">SEARCH CURRENT REFERENCE</label>
    <input id="referenceSearch" type="search" placeholder="slug, resultant, law of sines, FBD…" autocomplete="off" />
    <span id="referenceCount">All current items</span>
  </div>

  <section class="referenceCard syllabusCard referenceItem" data-reference="syllabus course me1005 chien kai wang week schedule quiz midterm final centroid structures friction inertia virtual work required english">
    <div class="referenceSectionTitle"><span>00</span><div><strong>OFFICIAL COURSE MAP</strong><small>ME 1005 · Statics · 2 credits · required · taught in English</small></div></div>
    <div class="syllabusMeta">
      <div><b>Instructor</b><span>CHIEN-KAI WANG</span></div>
      <div><b>Class</b><span>01</span></div>
      <div><b>Meeting</b><span>Tuesday 3–4 · 10:20–12:10</span></div>
      <div><b>Designated reading</b><span>Vector Mechanics for Engineers: Statics · Beer, Johnston & Mazurek</span></div>
    </div>
    <div class="syllabusPolicy"><b>CONTENT RULE</b><span>The syllabus fixes the semester roadmap. Detailed lesson content is populated only when the matching lecture material is available; future topics remain blank rather than being filled from general knowledge.</span></div>
    <div class="syllabusRoadmap">
      ${lessonSlots.map(l=>`<div class="syllabusWeek ${l.kind!=='lesson'?'event':''} ${l.available?'loaded':''}"><span>W${String(l.week).padStart(2,'0')}</span><b>${escapeHtml(l.title)}</b><small>${l.kind==='quiz'?'QUIZ I PREP READY':l.available?(l.coverage==='partial'?'CURRENT PDF · PARTIAL':'CURRENT PDF LOADED'):(l.kind==='lesson'?'BLANK UNTIL LECTURE MATERIAL':l.kind.toUpperCase())}</small></div>`).join('')}
    </div>
    <div class="syllabusObjectives">
      <b>Course targets from the syllabus</b>
      <span>Force equilibrium · free-body diagrams · force analysis of components/supports · structural stability · principle of virtual work</span>
    </div>
  </section>

  <section class="converterPanel referenceItem" data-reference="unit conversion converter length force mass speed area volume moment pressure temperature si customary">
    <div class="referenceSectionTitle"><span>01</span><div><strong>UNIT CONVERTER</strong><small>Conversions appearing in Lecture 01 and its exercises</small></div></div>
    <div class="converterGrid">
      <label><span>TYPE</span><select id="convertType">
        <option value="length">Length</option><option value="force">Force</option><option value="mass">Mass</option><option value="speed">Speed</option><option value="area">Area</option><option value="volume">Volume</option><option value="moment">Moment / torque</option><option value="pressure">Pressure</option><option value="temperature">Temperature</option>
      </select></label>
      <label><span>VALUE</span><input id="convertValue" type="number" inputmode="decimal" value="1" step="any" /></label>
      <label><span>FROM</span><select id="convertFrom"></select></label>
      <label><span>TO</span><select id="convertTo"></select></label>
      <div class="converterResult"><span>RESULT</span><strong id="convertResult">—</strong><small id="convertEquation"></small></div>
    </div>
    <div class="conversionQuickList"><span>1 ft = 0.3048 m</span><span>1 in = 25.4 mm</span><span>1 lbf = 4.448 N</span><span>1 slug = 14.59 kg</span><span>1 kgf = 9.81 N</span><span>1 mi = 1.60934 km</span></div>
  </section>

  <section class="referenceGrid formulaGrid">
    <article class="referenceCard referenceItem" data-reference="si us customary units newton slug pound force mass weight gravity prefixes">
      <div class="referenceSectionTitle"><span>02</span><div><strong>UNITS & PREFIXES</strong><small>Lecture 01</small></div></div>
      <div class="formulaLine"><b>SI force</b><code>1 N = 1 kg·m/s²</code></div>
      <div class="formulaLine"><b>U.S. mass unit</b><code>1 slug = 1 lbf·s²/ft</code></div>
      <div class="formulaLine"><b>Weight</b><code>W = mg</code></div>
      <div class="formulaLine"><b>Gravity used in examples</b><code>g ≈ 9.81 m/s² ≈ 32.2 ft/s²</code></div>
      <div class="prefixRail smallPrefixes"><span>G 10⁹</span><span>M 10⁶</span><span>k 10³</span><span>m 10⁻³</span><span>μ 10⁻⁶</span><span>n 10⁻⁹</span></div>
    </article>

    <article class="referenceCard referenceItem" data-reference="trigonometry sine cosine tangent pythagorean law sines law cosines triangle">
      <div class="referenceSectionTitle"><span>03</span><div><strong>TRIGONOMETRY</strong><small>Lecture 01 review + Lecture 02 force triangles</small></div></div>
      <div class="formulaLine"><b>Right triangle</b><code>sin A = opp/hyp, cos A = adj/hyp, tan A = opp/adj</code></div>
      <div class="formulaLine"><b>Pythagorean</b><code>c² = a² + b²</code></div>
      <div class="formulaLine"><b>Law of sines</b><code>a/sin A = b/sin B = c/sin C</code></div>
      <div class="formulaLine"><b>Law of cosines</b><code>a² = b² + c² − 2bc cos A</code></div>
    </article>

    <article class="referenceCard referenceItem" data-reference="vectors scalar components dot product cross product i j k resultant">
      <div class="referenceSectionTitle"><span>04</span><div><strong>VECTOR TOOLBOX</strong><small>Lecture 01 review</small></div></div>
      <div class="formulaLine"><b>Dot product</b><code>a·b = a₁b₁ + a₂b₂ + a₃b₃</code></div>
      <div class="formulaLine"><b>Cross product</b><code>a×b = (a₂b₃−a₃b₂)i + (a₃b₁−a₁b₃)j + (a₁b₂−a₂b₁)k</code></div>
      <div class="referenceNote">i, j, and k are unit vectors along the x, y, and z axes.</div>
    </article>

    <article class="referenceCard referenceItem" data-reference="planar force rectangular components unit vectors resultant magnitude direction components sum forces">
      <div class="referenceSectionTitle"><span>05</span><div><strong>PLANAR FORCE COMPONENTS</strong><small>Lecture 02 §2.2</small></div></div>
      <div class="formulaLine"><b>Force</b><code>F = Fₓi + Fᵧj</code></div>
      <div class="formulaLine"><b>Components</b><code>Fₓ = F cos θ, Fᵧ = F sin θ</code></div>
      <div class="formulaLine"><b>Resultant components</b><code>Rₓ = ΣFₓ, Rᵧ = ΣFᵧ</code></div>
      <div class="formulaLine"><b>Magnitude</b><code>R = √(Rₓ² + Rᵧ²)</code></div>
      <div class="formulaLine"><b>Direction</b><code>θ = atan2(Rᵧ, Rₓ)</code></div>
    </article>

    <article class="referenceCard referenceItem" data-reference="particle equilibrium newton first law sum fx fy force polygon closed">
      <div class="referenceSectionTitle"><span>06</span><div><strong>PARTICLE EQUILIBRIUM</strong><small>Lecture 02 §2.3</small></div></div>
      <div class="formulaLine"><b>Vector condition</b><code>R = ΣF = 0</code></div>
      <div class="formulaLine"><b>Planar equations</b><code>ΣFₓ = 0, ΣFᵧ = 0</code></div>
      <div class="referenceNote">With only two forces, equilibrium requires equal magnitude, the same line of action, and opposite sense.</div>
    </article>

    <article class="referenceCard referenceItem" data-reference="numerical accuracy significant figures precision four digits three digits solution check">
      <div class="referenceSectionTitle"><span>07</span><div><strong>NUMERICAL ACCURACY</strong><small>Lecture 01 §1.6</small></div></div>
      <div class="formulaLine"><b>Data beginning with 1</b><code>typically 4 significant digits</code></div>
      <div class="formulaLine"><b>Other data</b><code>typically 3 significant digits</code></div>
      <div class="referenceNote">Never report a computed result as more accurate than the least accurate input data.</div>
    </article>
  </section>

  <section class="referenceGrid">
    <article class="referenceCard referenceItem" data-reference="free body diagram fbd space diagram particle external forces checklist">
      <div class="referenceSectionTitle"><span>08</span><div><strong>PARTICLE FBD CHECKLIST</strong><small>Lecture 02</small></div></div>
      <ol class="referenceChecklist">
        <li>Select and isolate the particle or junction.</li>
        <li>Replace each interaction with the external force acting on the particle.</li>
        <li>Show cable tensions along their cable directions and show the weight/load in its stated direction.</li>
        <li>Carry over only the geometry needed to define force directions.</li>
        <li>Choose x and y axes.</li>
        <li>Write ΣFₓ = 0 and ΣFᵧ = 0.</li>
        <li>Check units, signs, and physical direction.</li>
      </ol>
    </article>

    <article class="referenceCard referenceItem" data-reference="glossary mechanics statics dynamics particle rigid body force vector scalar fixed bound free sliding concurrent resultant component equilibrium space diagram free body diagram line action sense">
      <div class="referenceSectionTitle"><span>09</span><div><strong>CURRENT GLOSSARY</strong><small>Only terms introduced in Lectures 01–02</small></div></div>
      <dl class="glossaryList">
        <div><dt>Mechanics</dt><dd>Study of bodies under the action of forces.</dd></div>
        <div><dt>Statics</dt><dd>Rigid-body mechanics for zero acceleration: rest or constant velocity.</dd></div>
        <div><dt>Dynamics</dt><dd>Rigid-body mechanics for accelerating motion.</dd></div>
        <div><dt>Particle</dt><dd>Idealization in which body size and shape do not affect the force solution.</dd></div>
        <div><dt>Rigid body</dt><dd>Idealized body whose particles keep fixed positions relative to one another.</dd></div>
        <div><dt>Force</dt><dd>Action of one body on another, defined by application point, magnitude, line of action, and sense/direction.</dd></div>
        <div><dt>Vector</dt><dd>Quantity having magnitude and direction and obeying vector-addition rules.</dd></div>
        <div><dt>Scalar</dt><dd>Quantity having magnitude but no direction.</dd></div>
        <div><dt>Resultant</dt><dd>Single vector with the same combined effect as a set of vectors on the particle.</dd></div>
        <div><dt>Component</dt><dd>One of the vectors into which a vector is resolved.</dd></div>
        <div><dt>Concurrent forces</dt><dd>Forces whose lines of action pass through a common point.</dd></div>
        <div><dt>Equilibrium</dt><dd>State in which the resultant force on the particle is zero.</dd></div>
        <div><dt>Space diagram</dt><dd>Sketch of the physical arrangement and geometry of the problem.</dd></div>
        <div><dt>Free-body diagram</dt><dd>Sketch of the isolated body/particle showing only forces acting on it.</dd></div>
      </dl>
    </article>

    <article class="referenceCard referenceItem" data-reference="problem solution strategy modeling analysis reflect check method four steps">
      <div class="referenceSectionTitle"><span>10</span><div><strong>PROBLEM-SOLVING DISCIPLINE</strong><small>Lecture 01 + textbook support</small></div></div>
      <ol class="referenceChecklist">
        <li>State the givens and the required unknown.</li>
        <li>Model the correct body and draw its free-body diagram.</li>
        <li>Apply the mechanics principles and solve the equations.</li>
        <li>Check units, signs, unused relations, and reasonableness.</li>
      </ol>
    </article>
  </section>
  ${safeTeXHtml(window.PREQUIZ?.referenceExtra||'')}
`}

function blankState(){return {version:4,currentLesson:'s01',completed:{},practiceAnswers:{},questionBoards:{},mainBoard:{strokes:[],updatedAt:0},notesList:[],activeNoteId:null,tab:'lesson',_savedAt:0};}
function cryptoId(){return (globalThis.crypto?.randomUUID?.()||('n_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2)));}
function clamp01(v){v=Number(v);return Number.isFinite(v)?Math.max(0,Math.min(1,v)):0;}
function normalizeQuestionBoard(board){
  const raw=board&&typeof board==='object'&&!Array.isArray(board)?board:{};
  const strokes=Array.isArray(raw.strokes)?raw.strokes.slice(-300).map(s=>{
    const tool=s?.tool==='eraser'?'eraser':'pen';
    const color=/^#[0-9a-f]{6}$/i.test(String(s?.color||''))?String(s.color):'#172033';
    const width=Math.max(1,Math.min(18,Number(s?.width)||3));
    const points=Array.isArray(s?.points)?s.points.slice(-5000).map(p=>Array.isArray(p)?[clamp01(p[0]),clamp01(p[1]),Math.max(.08,Math.min(1,Number(p[2])||.55))]:[clamp01(p?.x),clamp01(p?.y),Math.max(.08,Math.min(1,Number(p?.p)||.55))]):[];
    return {tool,color,width,points};
  }).filter(s=>s.points.length):[];
  return {strokes,updatedAt:Number(raw.updatedAt)||0};
}
function normalizeState(raw){
  const s={...blankState(),...(raw&&typeof raw==='object'?raw:{})};
  if(!lessonSlots.some(x=>x.id===s.currentLesson))s.currentLesson='s01';
  if(!s.completed||typeof s.completed!=='object'||Array.isArray(s.completed))s.completed={};
  s.completed=Object.fromEntries(Object.entries(s.completed).filter(([id])=>loadedIds.has(id)));
  if(!s.practiceAnswers||typeof s.practiceAnswers!=='object'||Array.isArray(s.practiceAnswers))s.practiceAnswers={};
  if(!s.questionBoards||typeof s.questionBoards!=='object'||Array.isArray(s.questionBoards))s.questionBoards={};
  s.questionBoards=Object.fromEntries(Object.entries(s.questionBoards).map(([id,board])=>[id,normalizeQuestionBoard(board)]).filter(([,board])=>board.strokes.length||board.updatedAt));
  s.mainBoard=normalizeQuestionBoard(s.mainBoard);
  if(!Array.isArray(s.notesList))s.notesList=[];
  s.notesList=s.notesList.map(n=>({id:String(n.id||cryptoId()),title:String(n.title||'Untitled note'),body:String(n.body||''),updatedAt:Number(n.updatedAt)||0}));
  if(!['lesson','practice','mastery','reference'].includes(s.tab))s.tab='lesson';
  if(s.activeNoteId&&!s.notesList.some(n=>n.id===s.activeNoteId))s.activeNoteId=s.notesList[0]?.id||null;
  s.version=4;
  return s;
}
function persistentSnapshot(s){return normalizeState(JSON.parse(JSON.stringify(s)));}
function profileKey(name){return PROFILE_PREFIX+name;}
function loadJson(key){try{return JSON.parse(localStorage.getItem(key)||'null');}catch(_){return null;}}
function saveJson(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(_){}}
function normalizeUsername(v){return String(v||'').trim().toLowerCase();}
function validUsername(v){return /^[a-z0-9_]{2,32}$/.test(v);}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
function escapeAttr(s){return escapeHtml(s);}

let cloudUsername=normalizeUsername(localStorage.getItem(USERNAME_KEY)||'');
let state=normalizeState(cloudUsername?loadJson(profileKey(cloudUsername)):loadJson(ANON_KEY));
let cloudReady=false,cloudLoading=false,cloudRevision=0,cloudBaseState=null,cloudDirty=false,cloudTimer=null,cloudSavePromise=null;
const openQuestionBoards=new Set();
const questionBoardRedo=new Map();

function currentSlot(){return lessonSlots.find(x=>x.id===state.currentLesson)||lessonSlots[0];}
function slotIndex(){return Math.max(0,lessonSlots.findIndex(x=>x.id===state.currentLesson));}
function instructionalSlotCount(){return lessonSlots.filter(l=>l.kind==='lesson').length;}
function completedCount(){return lessonSlots.filter(l=>l.kind==='lesson'&&l.available&&state.completed[l.id]).length;}
function progressPercent(){return Math.round(completedCount()/instructionalSlotCount()*100);}
function touchState(){state._savedAt=Date.now();}
function persist({sync=true,touch=true}={}){
  if(touch)touchState();
  const snap=persistentSnapshot(state);
  if(cloudUsername)saveJson(profileKey(cloudUsername),snap);else saveJson(ANON_KEY,snap);
  if(sync&&cloudUsername){cloudDirty=true;scheduleCloudSave();}
}
let mathJaxTypesetQueue=Promise.resolve();
const mathJaxNodeGeneration=new WeakMap();
function typeset(node){
  if(!node)return;
  const generation=(mathJaxNodeGeneration.get(node)||0)+1;
  mathJaxNodeGeneration.set(node,generation);
  let tries=0;
  const enqueue=()=>{
    tries++;
    const mj=window.MathJax;
    if(!mj?.typesetPromise){
      if(tries<100)setTimeout(enqueue,100);
      else console.error('[Statics MathJax] MathJax did not become ready');
      return;
    }
    mathJaxTypesetQueue=mathJaxTypesetQueue
      .catch(err=>console.error('[Statics MathJax] previous job failed',err))
      .then(async()=>{
        if(!node.isConnected||mathJaxNodeGeneration.get(node)!==generation)return;
        if(mj.startup?.promise)await mj.startup.promise;
        if(!node.isConnected||mathJaxNodeGeneration.get(node)!==generation)return;
        try{
          mj.typesetClear?.([node]);
          await mj.typesetPromise([node]);
        }catch(err){
          console.error('[Statics MathJax] first typeset failed',err);
          await new Promise(r=>setTimeout(r,80));
          if(!node.isConnected||mathJaxNodeGeneration.get(node)!==generation)return;
          try{
            mj.typesetClear?.([node]);
            await mj.typesetPromise([node]);
          }catch(err2){
            console.error('[Statics MathJax] retry failed',err2);
          }
        }
      });
  };
  setTimeout(enqueue,30);
}

function render(){
  renderCourseMap();
  renderMain();
  renderNotes();
  renderTabs();
  renderProgress();
  if(state.tab==='practice')renderPractice();
  else if(state.tab==='mastery')renderMastery();
  else if(state.tab==='reference')renderReference();
  updateCloudUi();
  if(state.tab==='lesson')setupWhiteboard();
}

function renderCourseMap(){
  const select=document.getElementById('lessonSelect');
  select.innerHTML=lessonSlots.map(l=>`<option value="${l.id}" ${l.id===state.currentLesson?'selected':''}>W${String(l.week).padStart(2,'0')} · ${escapeHtml(l.title)}</option>`).join('');
  const cur=currentSlot();
  document.getElementById('lessonPosition').textContent=`Week ${cur.week} of ${lessonSlots.length}`;
  const status=cur.kind==='quiz'?'Quiz prep ready':cur.kind!=='lesson'?'Schedule event':cur.available?(state.completed[cur.id]?'Completed':cur.coverage==='partial'?'Partially loaded':'Not completed'):'Awaiting lecture';
  document.getElementById('lessonStatus').textContent=status;
  document.getElementById('completedCount').textContent=`${completedCount()} / ${instructionalSlotCount()}`;
  document.getElementById('courseOutline').innerHTML=lessonSlots.map(l=>`<button class="outlineItem ${l.id===state.currentLesson?'active':''} ${l.available?'':'emptySlot'} ${l.kind!=='lesson'?'eventSlot':''}" data-lesson="${l.id}" type="button"><span class="outlineDot ${state.completed[l.id]?'done':''}">${state.completed[l.id]?'✓':String(l.week).padStart(2,'0')}</span><span class="outlineText"><strong>${escapeHtml(l.title)}</strong><small>${escapeHtml(l.unit)}${l.kind==='quiz'?' · PREP READY':l.coverage==='partial'?' · PARTIAL':l.kind==='lesson'&&!l.available?' · BLANK':''}</small></span></button>`).join('');
  document.querySelectorAll('.outlineItem').forEach(btn=>btn.addEventListener('click',()=>selectLesson(btn.dataset.lesson)));
}

function renderMain(){
  const cur=currentSlot();
  document.getElementById('bannerUnit').textContent=cur.unit;
  document.getElementById('bannerTitle').textContent=cur.title;
  document.getElementById('bannerDescription').textContent=cur.available?cur.desc:'';
  const host=document.getElementById('lessonContentHost');
  try{window.MathJax?.typesetClear?.([host]);}catch(_){}
  if(cur.available){host.innerHTML=lessonHtml[cur.id]||'';}else{host.innerHTML='<div class="intentionalBlank tallBlank"><span>—</span></div>';}
  document.getElementById('lessonActions').style.display=cur.available&&cur.kind==='lesson'?'flex':'none';
  if(cur.available&&cur.kind==='lesson'){
    document.getElementById('markCompleteBtn').textContent=state.completed[cur.id]?'Mark as not complete':'Mark lesson complete';
    const idx=slotIndex();
    const nextLoaded=lessonSlots.slice(idx+1).find(x=>x.available);
    const next=document.getElementById('nextLessonBtn');
    next.disabled=!nextLoaded;next.style.opacity=nextLoaded?'1':'.45';
  }
  typeset(host);
}

function renderProgress(){
  const p=progressPercent();
  document.getElementById('progressPercent').textContent=p+'%';
  document.getElementById('progressFill').style.width=p+'%';
}

function renderTabs(){
  document.querySelectorAll('.studyTab').forEach(b=>b.classList.toggle('active',b.dataset.tab===state.tab));
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById(state.tab+'View')?.classList.add('active');
}

function selectLesson(id){
  if(!lessonSlots.some(l=>l.id===id))return;
  state.currentLesson=id;persist();render();window.scrollTo({top:0,behavior:'smooth'});
}
function toggleComplete(){const cur=currentSlot();if(!cur.available||cur.kind!=='lesson')return;if(state.completed[cur.id])delete state.completed[cur.id];else state.completed[cur.id]=Date.now();persist();render();}
function nextLoadedLesson(){const idx=slotIndex();const next=lessonSlots.slice(idx+1).find(x=>x.available);if(next)selectLesson(next.id);}
function setTab(tab){if(!['lesson','practice','mastery','reference'].includes(tab))return;state.tab=tab;persist();renderTabs();if(tab==='lesson')setupWhiteboard();if(tab==='practice')renderPractice();if(tab==='mastery')renderMastery();if(tab==='reference')renderReference();}
function resetProgress(){if(!confirm('Reset lesson completion and practice answers? Notes and question whiteboards will be kept.'))return;state.completed={};state.practiceAnswers={};state.currentLesson='s01';state.tab='lesson';persist();render();}

function renderQuestionGroups(qs){
  let lastSection=null;
  return qs.map((q,i)=>{
    const section=String(q.section||'').trim();
    const header=section&&section!==lastSection
      ? `<div class="questionSectionHeader"><span>${escapeHtml(section)}</span><small>${section.includes('LECTURE')?'SOURCE-MATCHED / FIGURE-BASED':'MULTI-STEP / MEASURING'}</small></div>`
      : '';
    if(section)lastSection=section;
    return header+practiceQuestionHtml(q,i);
  }).join('');
}

function renderPractice(){
  const cur=currentSlot();const host=document.getElementById('practiceContentHost');
  if(!cur.available){host.innerHTML='<div class="intentionalBlank tallBlank"><span>—</span></div>';return;}
  const qs=practiceBank[cur.id]||[];
  if(!qs.length){host.innerHTML='<div class="intentionalBlank tallBlank"><span>—</span></div>';return;}
  const answered=qs.filter(q=>state.practiceAnswers[q.id]).length;
  const correct=qs.filter(q=>state.practiceAnswers[q.id]?.correct).length;
  host.innerHTML=`
    <div class="sheetKicker">PRACTICE · ${escapeHtml(cur.unit)}</div>
    <h2>${escapeHtml(cur.title)}</h2>
    <p class="lessonLead">Questions below use only concepts and numerical relationships already present in the uploaded lecture. Feedback appears immediately after each answer.</p>
    <div class="practiceSummary"><span><b>${answered}</b> answered</span><span><b>${correct}</b> correct</span><button id="resetPracticeBtn" type="button">RESET THIS SET</button></div>
    <div class="practiceList">${renderQuestionGroups(qs)}</div>`;
  host.querySelectorAll('[data-choice]').forEach(btn=>btn.addEventListener('click',()=>answerChoice(btn.dataset.q,btn.dataset.choice)));
  host.querySelectorAll('[data-check-numeric]').forEach(btn=>btn.addEventListener('click',()=>answerNumeric(btn.dataset.checkNumeric)));
  host.querySelectorAll('.numericAnswerInput').forEach(inp=>inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();answerNumeric(inp.dataset.q);}}));
  host.querySelectorAll('[data-board-toggle]').forEach(btn=>btn.addEventListener('click',()=>toggleQuestionBoard(btn.dataset.boardToggle)));
  document.getElementById('resetPracticeBtn')?.addEventListener('click',()=>{if(!confirm('Clear answers for this lesson practice set? Question whiteboards will be kept.'))return;qs.forEach(q=>delete state.practiceAnswers[q.id]);persist();renderPractice();});
  setupQuestionBoards(host);
  typeset(host);
}

function renderMastery(){
  const cur=currentSlot();const host=document.getElementById('masteryContentHost');if(!host)return;
  const qs=masteryBank[cur.id]||[];
  if(!qs.length){host.innerHTML='<div class="intentionalBlank tallBlank"><span>—</span></div>';return;}
  const answered=qs.filter(q=>state.practiceAnswers[q.id]).length;
  const correct=qs.filter(q=>state.practiceAnswers[q.id]?.correct).length;
  host.innerHTML=`
    <div class="sheetKicker">VERIFY · ${escapeHtml(cur.unit)}</div>
    <h2>Quiz I Mixed Mock Set</h2>
    <p class="lessonLead">Hard-only verification: source-matched lecture geometry first, then unfamiliar multi-step synthesis. Easy recognition and one-step substitution items are excluded.</p>
    <div class="practiceSummary masterySummary"><span><b>${answered}</b> answered</span><span><b>${correct}</b> correct</span><span><b>${qs.length}</b> total</span><button id="resetMasteryBtn" type="button">RESET MOCK SET</button></div>
    <div class="practiceList">${renderQuestionGroups(qs)}</div>`;
  host.querySelectorAll('[data-choice]').forEach(btn=>btn.addEventListener('click',()=>answerChoice(btn.dataset.q,btn.dataset.choice)));
  host.querySelectorAll('[data-check-numeric]').forEach(btn=>btn.addEventListener('click',()=>answerNumeric(btn.dataset.checkNumeric)));
  host.querySelectorAll('.numericAnswerInput').forEach(inp=>inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();answerNumeric(inp.dataset.q);}}));
  host.querySelectorAll('[data-board-toggle]').forEach(btn=>btn.addEventListener('click',()=>toggleQuestionBoard(btn.dataset.boardToggle)));
  document.getElementById('resetMasteryBtn')?.addEventListener('click',()=>{if(!confirm('Clear answers for the Quiz I mock set? Question whiteboards will be kept.'))return;qs.forEach(q=>delete state.practiceAnswers[q.id]);persist();renderMastery();});
  setupQuestionBoards(host);
  typeset(host);
}

function correctAnswerText(q){
  if(q.type==='mcq'){
    const idx=String(q.correct||'a').charCodeAt(0)-97;
    const opt=Array.isArray(q.options)?q.options[idx]:'';
    return `${String(q.correct||'').toUpperCase()}${opt?` — ${opt}`:''}`;
  }
  return `${q.answer}${q.unit?` ${q.unit}`:''}`;
}
function workedSolutionText(q){
  const base=String(q.solution||q.explain||'').trim();
  if(base)return base;
  return q.type==='mcq'?'Use the governing definition or equilibrium rule from the lesson to eliminate the other choices.':'Apply the method introduced in the related lesson and carry the units through to the keyed result.';
}
function workedSolutionBlock(q,{fullscreen=false,showFbd=false}={}){
  const fbd=showFbd&&Array.isArray(q.fbdCheck)&&q.fbdCheck.length?`<div class="workedFbdCheck"><b>FBD CHECK</b><ul>${q.fbdCheck.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></div>`:'';
  return `<section class="workedSolutionBlock ${fullscreen?'fullscreenWorkedSolution':''}">
    <div class="workedAnswer"><span>FINAL ANSWER</span><strong>${escapeHtml(correctAnswerText(q))}</strong></div>
    <div class="workedSteps"><span>WORKED SOLUTION</span><p>${escapeHtml(workedSolutionText(q)).replace(/\n/g,'<br>')}</p></div>
    ${fbd}
  </section>`;
}
function fullscreenProblemBlock(q,i){
  const opts=q.type==='mcq'&&Array.isArray(q.options)&&q.options.length?`<div class="fullscreenChoices"><span>CHOICES</span><ol class="fullscreenProblemOptions">${q.options.map((o,idx)=>`<li><b>${String.fromCharCode(65+idx)}</b><span>${escapeHtml(o)}</span></li>`).join('')}</ol></div>`:'';
  const diagram=q.diagram?`<div class="fullscreenProblemDiagram">${q.diagram}</div>`:'';
  const instructions=q.instructions?`<p class="fullscreenProblemInstructions">${escapeHtml(q.instructions)}</p>`:'';
  return `<section class="fullscreenProblemContext">
    <div class="fullscreenProblemLabel"><span>QUESTION ${String(i+1).padStart(2,'0')}</span>${q.meta?`<b>${escapeHtml(q.meta)}</b>`:''}${q.fbdRequired?'<em>FBD REQUIRED</em>':''}</div>
    <h3>${escapeHtml(q.prompt)}</h3>${instructions}${opts}${diagram}
  </section>`;
}

function practiceQuestionHtml(q,i){
  const a=state.practiceAnswers[q.id];
  let body='';
  if(q.type==='mcq'){
    body=`<div class="choiceGrid">${q.options.map((opt,idx)=>{const key=String.fromCharCode(97+idx);const selected=a?.value===key;const cls=a?(key===q.correct?'correctChoice':selected?'wrongChoice':''):(selected?'selectedChoice':'');return `<button type="button" data-choice="${key}" data-q="${q.id}" class="choiceBtn ${cls}" ${a?'disabled':''}><span>${key.toUpperCase()}</span>${escapeHtml(opt)}</button>`}).join('')}</div>`;
  }else{
    body=`<div class="numericRow"><input class="numericAnswerInput" data-q="${q.id}" type="number" step="any" inputmode="decimal" placeholder="Enter number" value="${a?escapeAttr(a.value):''}" ${a?'disabled':''}><span>${escapeHtml(q.unit||'')}</span><button type="button" data-check-numeric="${q.id}" ${a?'disabled':''}>CHECK</button></div>`;
  }
  const feedback=a?`<div class="answerFeedback ${a.correct?'good':'bad'}"><b>${a.correct?'Correct':'Not correct'}</b>${workedSolutionBlock(q,{showFbd:true})}</div>`:'';
  const meta=q.meta||q.fbdRequired?`<div class="questionMeta">${q.meta?`<span>${escapeHtml(q.meta)}</span>`:''}${q.fbdRequired?'<b>FBD REQUIRED</b>':''}</div>`:'';
  const diagram=q.diagram?`<div class="questionDiagram">${q.diagram}</div>`:'';
  const instructions=q.instructions?`<p class="questionInstructions">${escapeHtml(q.instructions)}</p>`:'';
  const board=state.questionBoards[q.id];
  const hasInk=!!board?.strokes?.length;
  const open=openQuestionBoards.has(q.id);
  const scratch=`<section class="questionBoard ${open?'open':''}" data-question-board="${q.id}">
    <button class="questionBoardToggle" type="button" data-board-toggle="${q.id}" aria-expanded="${open?'true':'false'}"><span>WHITEBOARD</span><small>${hasInk?'saved work':'scratch space'}</small><b>${open?'CLOSE −':'OPEN +'}</b></button>
    ${open?`<div class="questionBoardBody">
      ${fullscreenProblemBlock(q,i)}
      <div class="questionBoardToolbar proWhiteboardToolbar">
        <div class="questionBoardTools"><button type="button" class="qbTool active" data-wb-tool="pen">PEN</button><button type="button" class="qbTool" data-wb-tool="eraser" title="Click to select · hold temporarily · E key on desktop">ERASE</button><button type="button" class="qbTool" data-wb-tool="drag" title="Drag the canvas to pan around your work">DRAG</button></div>
        <div class="qbInkGroup"><button class="wbPreset inkBlack" type="button" data-wb-preset="#172033" title="Black ink · double tap for custom color"></button><button class="wbPreset inkBlue" type="button" data-wb-preset="#245f8f" title="Blue ink · double tap for custom color"></button><button class="wbPreset inkRed" type="button" data-wb-preset="#a94f49" title="Red ink · double tap for custom color"></button><button class="wbPreset inkGreen" type="button" data-wb-preset="#39745d" title="Green ink · double tap for custom color"></button><label class="qbColor" title="Custom pen color"><input type="color" value="#172033" data-wb-color></label></div>
        <label class="qbWidth"><span>WIDTH</span><input type="range" min="1" max="12" value="3" data-wb-width></label>
        <div class="qbModes"><span data-wb-zoom>100%</span></div>
        <div class="qbHistory"><button type="button" data-wb-undo>UNDO</button><button type="button" data-wb-redo>REDO</button><button type="button" class="danger" data-wb-clear>CLEAR</button><button type="button" data-wb-fullscreen>FULLSCREEN</button></div>
      </div>
      <div class="questionBoardCanvasShell" data-wb-viewport><canvas data-pro-canvas data-qb-canvas="${q.id}"></canvas><span>Q${String(i+1).padStart(2,'0')} · SCRATCH</span></div>
      <details class="fullscreenSolutionReveal">
        <summary><span>ANSWER + WORKED SOLUTION</span><b>REVEAL</b></summary>
        ${workedSolutionBlock(q,{fullscreen:true,showFbd:true})}
      </details>
      <!-- Question is permanently visible in the fullscreen problem context above. -->
    </div>`:''}
  </section>`;
  return `<article class="practiceQuestion ${a?(a.correct?'answeredCorrect':'answeredWrong'):''} ${q.fbdRequired?'fbdQuestion':''}"><div class="questionIndex">${String(i+1).padStart(2,'0')}</div><div class="questionBody">${meta}<h3>${escapeHtml(q.prompt)}</h3>${instructions}${diagram}${body}${feedback}${scratch}</div></article>`;
}
function toggleQuestionBoard(id){
  if(openQuestionBoards.has(id))openQuestionBoards.delete(id);else openQuestionBoards.add(id);
  if(state.tab==='mastery')renderMastery();else renderPractice();
}
function setupQuestionBoards(host){
  if(!window.StaticsWhiteboardPro)return;
  host.querySelectorAll('.questionBoard.open').forEach(module=>{
    const id=module.dataset.questionBoard;
    const canvas=module.querySelector('[data-pro-canvas]');
    if(!id||!canvas||canvas.dataset.proReady==='1')return;
    const q=findQuestion(id);
    window.StaticsWhiteboardPro.enhance({
      root:module,
      canvas,
      viewport:module.querySelector('[data-wb-viewport]'),
      fullscreenTarget:module,
      questionText:q?.prompt||'',
      getBoard:()=>state.questionBoards[id]||(state.questionBoards[id]={strokes:[],updatedAt:0}),
      save:()=>persist(),
      onInk:()=>{const status=module.querySelector('.questionBoardToggle small');if(status)status.textContent=(state.questionBoards[id]?.strokes?.length?'saved work':'scratch space');}
    });
  });
}
function findQuestion(id){for(const arr of [...Object.values(practiceBank),...Object.values(masteryBank)]){const q=arr.find(x=>x.id===id);if(q)return q;}return null;}
function refreshQuestionSet(){if(state.tab==='mastery')renderMastery();else renderPractice();}
function answerChoice(id,value){const q=findQuestion(id);if(!q||state.practiceAnswers[id])return;state.practiceAnswers[id]={value,correct:value===q.correct,at:Date.now()};persist();refreshQuestionSet();}
function answerNumeric(id){const q=findQuestion(id);if(!q||state.practiceAnswers[id])return;const input=document.querySelector(`.numericAnswerInput[data-q="${CSS.escape(id)}"]`);const v=Number(input?.value);if(!Number.isFinite(v))return;const correct=Math.abs(v-q.answer)<=q.tol;state.practiceAnswers[id]={value:v,correct,at:Date.now()};persist();refreshQuestionSet();}

function renderReference(){
  const host=document.getElementById('referenceContentHost');if(!host||host.dataset.built==='1')return;
  host.innerHTML=referenceHtml();host.dataset.built='1';
  setupReferenceSearch();setupConverter();typeset(host);
}
function setupReferenceSearch(){
  const input=document.getElementById('referenceSearch'),count=document.getElementById('referenceCount');if(!input||!count)return;
  const items=[...document.querySelectorAll('#referenceContentHost .referenceItem')];
  const apply=()=>{const q=input.value.trim().toLowerCase();let shown=0;items.forEach(item=>{const hay=(item.dataset.reference+' '+item.textContent).toLowerCase();const on=!q||hay.includes(q);item.style.display=on?'':'none';if(on)shown++;});count.textContent=q?`${shown} matching item${shown===1?'':'s'}`:'All current items';};
  input.addEventListener('input',apply);apply();
}

const unitGroups={
  length:{base:'m',units:{m:1,cm:.01,mm:.001,ft:.3048,in:.0254,yd:.9144,km:1000,mi:1609.34}},
  force:{base:'N',units:{N:1,kN:1000,lbf:4.448,kgf:9.81}},
  mass:{base:'kg',units:{kg:1,g:.001,lbm:.45359,slug:14.59}},
  speed:{base:'m/s',units:{'m/s':1,'ft/s':.3048,'km/h':1000/3600,mph:1609.34/3600}},
  area:{base:'m²',units:{'m²':1,'cm²':1e-4,'mm²':1e-6,'ft²':.09290304,'in²':.00064516}},
  volume:{base:'m³',units:{'m³':1,L:.001,'cm³':1e-6,'ft³':.028316846592,'in³':.000016387064}},
  moment:{base:'N·m',units:{'N·m':1,'kN·m':1000,'lbf·ft':1.35581795,'lbf·in':.112984829}},
  pressure:{base:'Pa',units:{Pa:1,kPa:1000,psi:6894.75729,'lbf/ft²':47.88025898}},
  temperature:{special:true,units:{'°C':1,'°F':1,K:1}}
};
function setupConverter(){
  const type=document.getElementById('convertType'),from=document.getElementById('convertFrom'),to=document.getElementById('convertTo'),value=document.getElementById('convertValue');if(!type||!from||!to||!value)return;
  const populate=()=>{const group=unitGroups[type.value];const names=Object.keys(group.units);from.innerHTML=names.map(x=>`<option>${x}</option>`).join('');to.innerHTML=names.map(x=>`<option>${x}</option>`).join('');to.selectedIndex=Math.min(1,names.length-1);convertUnits();};
  type.addEventListener('change',populate);from.addEventListener('change',convertUnits);to.addEventListener('change',convertUnits);value.addEventListener('input',convertUnits);populate();
}
function temperatureToC(v,u){if(u==='°C')return v;if(u==='°F')return (v-32)*5/9;return v-273.15;}
function cToTemperature(c,u){if(u==='°C')return c;if(u==='°F')return c*9/5+32;return c+273.15;}
function formatNumber(n){if(!Number.isFinite(n))return '—';const a=Math.abs(n);if((a!==0&&a<1e-4)||a>=1e7)return n.toExponential(6).replace(/0+e/,'e');return Number(n.toPrecision(8)).toString();}
function convertUnits(){
  const type=document.getElementById('convertType'),from=document.getElementById('convertFrom'),to=document.getElementById('convertTo'),value=document.getElementById('convertValue'),result=document.getElementById('convertResult'),eq=document.getElementById('convertEquation');if(!type||!from||!to||!value||!result||!eq)return;
  const v=Number(value.value);if(!Number.isFinite(v)){result.textContent='—';eq.textContent='Enter a number';return;}
  const group=unitGroups[type.value];let out;
  if(group.special){out=cToTemperature(temperatureToC(v,from.value),to.value);}else{out=v*group.units[from.value]/group.units[to.value];}
  result.textContent=`${formatNumber(out)} ${to.value}`;eq.textContent=`${formatNumber(v)} ${from.value} → ${formatNumber(out)} ${to.value}`;
}

function renderNotes(){
  const panel=document.getElementById('notesPanel');const open=localStorage.getItem(NOTES_OPEN_KEY)==='1';panel.classList.toggle('open',open||panel.classList.contains('expanded'));
  document.getElementById('notesCount').textContent=`${state.notesList.length} ${state.notesList.length===1?'note':'notes'}`;
  document.getElementById('notesChevron').textContent=(open||panel.classList.contains('expanded'))?'⌃':'⌄';
  const tabs=document.getElementById('noteTabs');
  tabs.innerHTML=state.notesList.map(n=>`<button class="noteTab ${n.id===state.activeNoteId?'active':''}" data-note="${escapeAttr(n.id)}" type="button">${escapeHtml(n.title||'Untitled note')}</button>`).join('');
  tabs.querySelectorAll('.noteTab').forEach(b=>b.addEventListener('click',()=>{state.activeNoteId=b.dataset.note;persist();renderNotes();}));
  const host=document.getElementById('noteEditorHost');const note=state.notesList.find(n=>n.id===state.activeNoteId);
  if(!note){host.innerHTML='<div class="emptyNotes">Create a note for formulas, questions, or lecture reminders.</div>';return;}
  host.innerHTML=`<div class="noteEditor"><input id="noteTitleInput" class="noteTitleInput" value="${escapeAttr(note.title)}" placeholder="Note title"><textarea id="notesTextarea" class="notesTextarea" placeholder="Write your note…">${escapeHtml(note.body)}</textarea><div class="noteFooter"><span class="noteStatus">Saved automatically</span><div class="noteActions"><button id="noteDeleteBtn" class="noteDelete" type="button">Delete</button></div></div></div>`;
  document.getElementById('noteTitleInput').addEventListener('input',e=>updateNote(note.id,{title:e.target.value}));
  document.getElementById('notesTextarea').addEventListener('input',e=>updateNote(note.id,{body:e.target.value}));
  document.getElementById('noteDeleteBtn').addEventListener('click',()=>deleteNote(note.id));
}
function addNote(){const n={id:cryptoId(),title:'New note',body:'',updatedAt:Date.now()};state.notesList.push(n);state.activeNoteId=n.id;persist();localStorage.setItem(NOTES_OPEN_KEY,'1');renderNotes();setTimeout(()=>document.getElementById('noteTitleInput')?.select(),0);}
function updateNote(id,patch){const n=state.notesList.find(x=>x.id===id);if(!n)return;Object.assign(n,patch,{updatedAt:Date.now()});persist();document.getElementById('notesCount').textContent=`${state.notesList.length} ${state.notesList.length===1?'note':'notes'}`;}
function deleteNote(id){if(!confirm('Delete this note?'))return;const i=state.notesList.findIndex(n=>n.id===id);if(i<0)return;state.notesList.splice(i,1);state.activeNoteId=state.notesList[Math.min(i,state.notesList.length-1)]?.id||state.notesList[0]?.id||null;persist();renderNotes();}
function toggleNotes(){const now=localStorage.getItem(NOTES_OPEN_KEY)!=='1';localStorage.setItem(NOTES_OPEN_KEY,now?'1':'0');renderNotes();}
function expandNotes(){const panel=document.getElementById('notesPanel');panel.classList.toggle('expanded');if(panel.classList.contains('expanded'))localStorage.setItem(NOTES_OPEN_KEY,'1');renderNotes();}

async function callRpc(name,body,{keepalive=false}={}){
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12000);
  try{
    const res=await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`,{method:'POST',headers:{apikey:SUPABASE_PUBLISHABLE_KEY,'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify(body),cache:'no-store',keepalive,signal:controller.signal});
    const raw=await res.text();let data=null;try{data=raw?JSON.parse(raw):null;}catch(_){data=raw;}
    if(!res.ok)throw new Error(data?.message||data?.error||`Cloud request failed (${res.status})`);return data;
  }catch(err){if(err?.name==='AbortError')throw new Error('Cloud request timed out');throw err;}finally{clearTimeout(timer);}
}
async function loadCloudProfile(username){const data=await callRpc('load_statics_profile_v1',{p_username:username});return Array.isArray(data)?data[0]:data;}
async function saveCloudProfile(username,snapshot,revision,options={}){const data=await callRpc('save_statics_profile_v1',{p_username:username,p_state:snapshot,p_expected_revision:revision},options);return Array.isArray(data)?data[0]:data;}
function mergeStates(a,b){
  a=normalizeState(a);b=normalizeState(b);const newer=(Number(a._savedAt)||0)>=(Number(b._savedAt)||0)?a:b;const out=normalizeState(newer);
  out.completed={...b.completed,...a.completed};
  const answers={...b.practiceAnswers};
  Object.entries(a.practiceAnswers||{}).forEach(([id,answer])=>{const old=answers[id];if(!old||(Number(answer?.at)||0)>=(Number(old?.at)||0))answers[id]=answer;});
  out.practiceAnswers=answers;
  const boards={...b.questionBoards};
  Object.entries(a.questionBoards||{}).forEach(([id,board])=>{const old=boards[id];if(!old||(Number(board?.updatedAt)||0)>=(Number(old?.updatedAt)||0))boards[id]=board;});
  out.questionBoards=boards;
  out.mainBoard=(Number(a.mainBoard?.updatedAt)||0)>=(Number(b.mainBoard?.updatedAt)||0)?a.mainBoard:b.mainBoard;
  const notes=new Map();[...(b.notesList||[]),...(a.notesList||[])].forEach(n=>{const old=notes.get(n.id);if(!old||(Number(n.updatedAt)||0)>=(Number(old.updatedAt)||0))notes.set(n.id,{...n});});out.notesList=[...notes.values()];
  if(!out.notesList.some(n=>n.id===out.activeNoteId))out.activeNoteId=out.notesList[0]?.id||null;out._savedAt=Math.max(Number(a._savedAt)||0,Number(b._savedAt)||0);return normalizeState(out);
}
function metaKey(username){return META_PREFIX+username;}
function storeMeta(username,revision,base){saveJson(metaKey(username),{revision,baseState:persistentSnapshot(base),savedAt:Date.now()});}
function scheduleCloudSave(){if(!cloudUsername)return;cloudDirty=true;clearTimeout(cloudTimer);if(cloudLoading){setCloudIndicator('saving',`@${cloudUsername} · connecting…`);return;}if(!cloudReady){setCloudIndicator('offline',`@${cloudUsername} · local copy`);return;}setCloudIndicator('saving',`@${cloudUsername} · saving…`);cloudTimer=setTimeout(()=>void performCloudSave(),650);}
async function performCloudSave(force=false,options={}){
  if(!cloudUsername||(!cloudReady&&!force))return false;if(cloudSavePromise)return cloudSavePromise;const username=cloudUsername;
  cloudSavePromise=(async()=>{for(let attempt=0;attempt<4&&cloudUsername===username;attempt++){
    try{
      const local=persistentSnapshot(state);const result=await saveCloudProfile(username,local,cloudRevision,options);
      if(result?.saved){cloudRevision=Number(result.revision)||cloudRevision;cloudBaseState=normalizeState(result.state||local);cloudDirty=false;storeMeta(username,cloudRevision,cloudBaseState);saveJson(profileKey(username),local);setCloudIndicator('synced',`@${username} · synced`);updateCloudUi();return true;}
      const remote=normalizeState(result?.state||{});cloudRevision=Number(result?.revision)||0;cloudBaseState=remote;state=mergeStates(state,remote);saveJson(profileKey(username),state);cloudDirty=true;render();
    }catch(err){setCloudIndicator('offline',`@${username} · local only`);if(force)setCloudStatus('Could not reach cloud storage. Your work is still saved on this device.','bad');return false;}
  }setCloudIndicator('offline',`@${username} · retry later`);return false;})().finally(()=>{cloudSavePromise=null;});return cloudSavePromise;
}
async function connectCloudProfile(username,{interactive=false}={}){
  username=normalizeUsername(username);if(!validUsername(username)){if(interactive)setCloudStatus('Use 2–32 lowercase letters, numbers, or underscores only.','bad');return false;}
  const previous=cloudUsername;if(previous&&previous!==username){if(cloudReady&&cloudDirty)await performCloudSave(true);saveJson(profileKey(previous),state);}
  const anonBefore=!previous?persistentSnapshot(state):null;const localForProfile=normalizeState(loadJson(profileKey(username)));cloudUsername=username;cloudLoading=true;cloudReady=false;setCloudIndicator('saving',`@${username} · connecting…`);
  try{
    const profile=await loadCloudProfile(username);const remote=normalizeState(profile?.state||{});cloudRevision=Number(profile?.revision)||0;cloudBaseState=remote;localStorage.setItem(USERNAME_KEY,username);
    const remoteMeaningful=Object.keys(remote.completed).length||Object.keys(remote.practiceAnswers).length||Object.keys(remote.questionBoards).length||remote.mainBoard?.strokes?.length||remote.notesList.length||remote._savedAt;const localMeaningful=Object.keys(localForProfile.completed).length||Object.keys(localForProfile.practiceAnswers).length||Object.keys(localForProfile.questionBoards).length||localForProfile.mainBoard?.strokes?.length||localForProfile.notesList.length||localForProfile._savedAt;
    if(profile?.created||!remoteMeaningful){state=localMeaningful?localForProfile:(anonBefore||blankState());}else if(localMeaningful){state=mergeStates(localForProfile,remote);}else{state=remote;}
    state=normalizeState(state);saveJson(profileKey(username),state);storeMeta(username,cloudRevision,cloudBaseState);cloudReady=true;cloudLoading=false;cloudDirty=JSON.stringify(persistentSnapshot(state))!==JSON.stringify(persistentSnapshot(cloudBaseState));render();
    if(cloudDirty)await performCloudSave(true);else setCloudIndicator('synced',`@${username} · synced`);if(interactive)setCloudStatus(profile?.created?'Profile created and Statics progress is synced.':'Cloud progress loaded.','good');return true;
  }catch(err){cloudLoading=false;cloudReady=false;cloudDirty=true;state=localForProfile._savedAt?localForProfile:(anonBefore||state);saveJson(profileKey(username),state);render();setCloudIndicator('offline',`@${username} · local only`);if(interactive)setCloudStatus('Cloud is unavailable right now. Your local Statics progress is safe.','bad');return false;}
}
async function signOut({switching=false}={}){clearTimeout(cloudTimer);const outgoing=cloudUsername;if(outgoing){if(cloudReady&&cloudDirty)await performCloudSave(true);saveJson(profileKey(outgoing),state);}cloudUsername='';cloudReady=false;cloudLoading=false;cloudRevision=0;cloudBaseState=null;cloudDirty=false;localStorage.removeItem(USERNAME_KEY);state=normalizeState(loadJson(ANON_KEY));render();setCloudIndicator('', 'Local workspace');setCloudStatus(switching?'Enter another username. Profiles remain separate on this device.':'Signed out. Your named Statics profile remains saved separately.','info');}
async function forceSync(){if(!cloudUsername){openCloudModal();return;}setCloudStatus('Syncing…','info');if(!cloudReady){const ok=await connectCloudProfile(cloudUsername);if(!ok){setCloudStatus('Cloud is still unavailable. Local progress is safe.','bad');return;}}const ok=await performCloudSave(true);if(ok)setCloudStatus('Synced successfully.','good');}
function setCloudIndicator(mode,text){const dot=document.getElementById('cloudDot');dot.className='cloudDot'+(mode?' '+mode:'');document.getElementById('cloudProfileMainText').textContent=text||(cloudUsername?`@${cloudUsername}`:'Local workspace');const footer=document.getElementById('saveFooterNote');if(cloudUsername&&mode==='synced')footer.textContent=`Progress, practice answers, question whiteboards, and notes are synced to @${cloudUsername} and cached locally.`;else if(cloudUsername&&mode==='saving')footer.textContent=`Saving Statics progress to @${cloudUsername}…`;else if(cloudUsername)footer.textContent='Cloud sync is unavailable right now. Changes remain saved locally.';else footer.textContent='Your work is saved locally on this device. Sign in to sync progress, practice, question whiteboards, and notes.';}
function setCloudStatus(text,type='info'){const el=document.getElementById('cloudStatus');if(!text){el.className='cloudStatus';el.textContent='';return;}el.className='cloudStatus show '+type;el.textContent=text;}
function updateCloudUi(){const login=document.getElementById('cloudLoginSection'),card=document.getElementById('cloudSignedInCard');login.style.display=cloudUsername?'none':'grid';card.classList.toggle('show',!!cloudUsername);document.getElementById('cloudSignedInName').textContent=cloudUsername?`@${cloudUsername}`:'';document.getElementById('cloudSignedInMeta').textContent=cloudUsername?(cloudReady?`${completedCount()} of ${instructionalSlotCount()} instructional weeks complete · revision ${cloudRevision}`:'Using local copy until cloud reconnects'):'';}
function openCloudModal(){setCloudStatus('');document.getElementById('cloudModal').classList.add('open');document.getElementById('cloudModal').setAttribute('aria-hidden','false');updateCloudUi();if(!cloudUsername)setTimeout(()=>document.getElementById('cloudUsernameInput')?.focus(),30);}
function closeCloudModal(){document.getElementById('cloudModal').classList.remove('open');document.getElementById('cloudModal').setAttribute('aria-hidden','true');}

function setupWhiteboard(){
  if(!window.StaticsWhiteboardPro)return;
  const root=document.querySelector('.whiteboardCard'),canvas=document.getElementById('boardCanvas');
  if(!root||!canvas)return;
  if(root._wbPro){root._wbPro.paint();return;}
  window.StaticsWhiteboardPro.enhance({
    root,
    canvas,
    viewport:root.querySelector('[data-wb-viewport]')||root.querySelector('.canvasShell'),
    fullscreenTarget:root,
    getBoard:()=>state.mainBoard||(state.mainBoard={strokes:[],updatedAt:0}),
    save:()=>persist()
  });
}

function setupEvents(){
  document.getElementById('lessonSelect').addEventListener('change',e=>selectLesson(e.target.value));
  document.getElementById('markCompleteBtn').addEventListener('click',toggleComplete);document.getElementById('nextLessonBtn').addEventListener('click',nextLoadedLesson);
  document.querySelectorAll('.studyTab').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));
  document.getElementById('notesToggle').addEventListener('click',toggleNotes);document.getElementById('addNoteBtn').addEventListener('click',addNote);document.getElementById('expandNotesBtn').addEventListener('click',expandNotes);
  document.getElementById('resetBtn').addEventListener('click',resetProgress);document.getElementById('syncBtn').addEventListener('click',forceSync);
  document.getElementById('cloudProfileButton').addEventListener('click',openCloudModal);document.getElementById('closeCloudModal').addEventListener('click',closeCloudModal);document.getElementById('cloudModal').addEventListener('click',e=>{if(e.target.id==='cloudModal')closeCloudModal();});
  document.getElementById('cloudUsernameInput').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();document.getElementById('cloudSignInBtn').click();}});
  document.getElementById('cloudSignInBtn').addEventListener('click',async()=>{const input=document.getElementById('cloudUsernameInput');const ok=await connectCloudProfile(input.value,{interactive:true});if(ok)input.value='';updateCloudUi();});
  document.getElementById('modalSyncBtn').addEventListener('click',forceSync);document.getElementById('signOutBtn').addEventListener('click',()=>signOut());document.getElementById('switchUsernameBtn').addEventListener('click',async()=>{await signOut({switching:true});updateCloudUi();setTimeout(()=>document.getElementById('cloudUsernameInput')?.focus(),30);});
  window.addEventListener('online',()=>{if(cloudUsername){if(cloudReady)void performCloudSave(true);else void connectCloudProfile(cloudUsername);}});window.addEventListener('offline',()=>{if(cloudUsername)setCloudIndicator('offline',`@${cloudUsername} · local only`);});
  window.addEventListener('pagehide',()=>{if(cloudUsername&&cloudReady&&cloudDirty)void performCloudSave(true,{keepalive:true});});
}

setupEvents();
render();
const startBackgroundSync=()=>{if(cloudUsername)void connectCloudProfile(cloudUsername);else setCloudIndicator('', 'Local workspace');};
if('requestIdleCallback' in window)requestIdleCallback(startBackgroundSync,{timeout:1200});else setTimeout(startBackgroundSync,250);