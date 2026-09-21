(() => {
  'use strict';

  const commandCenter = document.querySelector('.commandCenter');
  if (!commandCenter || document.getElementById('scientificCalc')) return;

  const STORAGE_HISTORY = 'staticsCalcHistoryV1';
  const STORAGE_ANGLE = 'staticsCalcAngleV1';
  const STORAGE_POSITION = 'staticsCalcPositionV1';
  const MAX_HISTORY = 30;
  let ans = 0;
  let history = [];
  let historyCursor = 0;
  let angleMode = localStorage.getItem(STORAGE_ANGLE) === 'RAD' ? 'RAD' : 'DEG';
  let previewFrame = 0;
  let lastResultValue = 0;
  let lastExactResult = null;
  let resultView = 'exact';

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_HISTORY) || '[]');
    if (Array.isArray(saved)) history = saved.slice(-MAX_HISTORY).filter(x => x && typeof x.expression === 'string');
  } catch (_) {}
  historyCursor = history.length;
  if (history.length && Number.isFinite(history[history.length - 1].value)) ans = history[history.length - 1].value;

  const toggle = document.createElement('button');
  toggle.id = 'calculatorToggle';
  toggle.className = 'calculatorToggle';
  toggle.type = 'button';
  toggle.title = 'Scientific calculator · Alt+C';
  toggle.setAttribute('aria-haspopup', 'dialog');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<span class="calculatorToggleTop">CALCULATOR</span><span class="calculatorToggleMain"><b>ƒx</b><span>ALT+C</span></span>';
  commandCenter.insertBefore(toggle, commandCenter.firstChild);

  const mobileToggle = document.createElement('button');
  mobileToggle.id = 'calculatorMobileToggle';
  mobileToggle.className = 'calculatorMobileToggle';
  mobileToggle.type = 'button';
  mobileToggle.title = 'Open scientific calculator';
  mobileToggle.setAttribute('aria-label', 'Open scientific calculator');
  mobileToggle.textContent = 'ƒx';
  document.body.appendChild(mobileToggle);

  const panel = document.createElement('section');
  panel.id = 'scientificCalc';
  panel.className = 'scientificCalc';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Scientific calculator');
  panel.setAttribute('aria-hidden', 'true');
  panel.innerHTML = `
    <div class="calcTopbar">
      <div class="calcIdentity">
        <span class="calcCode">SC-01</span>
        <div><strong>Scientific Calculator</strong><small>DRAG HERE TO MOVE · ALT+C · ENTER = SOLVE</small></div>
      </div>
      <div class="calcTopActions">
        <div class="calcAngleSwitch" role="group" aria-label="Angle unit">
          <button class="calcAngleOption" type="button" data-angle-mode="DEG" aria-pressed="true">DEG</button>
          <button class="calcAngleOption" type="button" data-angle-mode="RAD" aria-pressed="false">RAD</button>
        </div>
        <button class="calcCloseBtn" id="calcClose" type="button" aria-label="Close calculator">×</button>
      </div>
    </div>
    <div class="calcDisplay">
      <div class="calcDisplayMeta">
        <span id="calcModeReadout">DEG MODE</span>
        <span id="calcHistoryReadout">NO HISTORY</span>
      </div>
      <label class="calcInputWrap">
        <span class="srOnly">Calculator expression</span>
        <input id="calcExpression" class="calcExpression" inputmode="text" autocomplete="off" autocapitalize="none" spellcheck="false" aria-describedby="calcKeyboardHint" placeholder="e.g. 2*cos(35) + 4^2" />
      </label>
      <div class="calcResultRow">
        <span>=</span>
        <output id="calcResult" class="calcResult" aria-live="polite">0</output>
        <button id="calcApprox" class="calcApprox" type="button" title="Show decimal approximation" hidden>DECIMAL</button>
        <button id="calcCopy" class="calcCopy" type="button" title="Copy result">COPY</button>
      </div>
      <div id="calcKeyboardHint" class="calcKeyboardHint">← → move cursor · Home/End jump · Ctrl/Cmd+C/V/X/A work normally</div>
    </div>
    <div class="calcKeys" aria-label="Calculator keypad">
      <button type="button" class="calcKey calcFn" data-insert="sin(">sin</button>
      <button type="button" class="calcKey calcFn" data-insert="cos(">cos</button>
      <button type="button" class="calcKey calcFn" data-insert="tan(">tan</button>
      <button type="button" class="calcKey calcFn" data-insert="sqrt(">√</button>
      <button type="button" class="calcKey calcFn" data-action="square">x²</button>

      <button type="button" class="calcKey calcFn" data-insert="asin(">sin⁻¹</button>
      <button type="button" class="calcKey calcFn" data-insert="acos(">cos⁻¹</button>
      <button type="button" class="calcKey calcFn" data-insert="atan(">tan⁻¹</button>
      <button type="button" class="calcKey calcFn" data-insert="ln(">ln</button>
      <button type="button" class="calcKey calcFn" data-insert="log(">log</button>

      <button type="button" class="calcKey calcFn" data-insert="(">(</button>
      <button type="button" class="calcKey calcFn" data-insert=")">)</button>
      <button type="button" class="calcKey calcFn" data-insert="^">xʸ</button>
      <button type="button" class="calcKey calcFn" data-insert="pi">π</button>
      <button type="button" class="calcKey calcFn" data-insert="e">e</button>

      <button type="button" class="calcKey" data-insert="7">7</button>
      <button type="button" class="calcKey" data-insert="8">8</button>
      <button type="button" class="calcKey" data-insert="9">9</button>
      <button type="button" class="calcKey calcOperator" data-insert="/">÷</button>
      <button type="button" class="calcKey calcDanger" data-action="clear">AC</button>

      <button type="button" class="calcKey" data-insert="4">4</button>
      <button type="button" class="calcKey" data-insert="5">5</button>
      <button type="button" class="calcKey" data-insert="6">6</button>
      <button type="button" class="calcKey calcOperator" data-insert="*">×</button>
      <button type="button" class="calcKey calcUtility" data-action="backspace">⌫</button>

      <button type="button" class="calcKey" data-insert="1">1</button>
      <button type="button" class="calcKey" data-insert="2">2</button>
      <button type="button" class="calcKey" data-insert="3">3</button>
      <button type="button" class="calcKey calcOperator" data-insert="-">−</button>
      <button type="button" class="calcKey calcUtility" data-insert="ans">ANS</button>

      <button type="button" class="calcKey" data-insert="0">0</button>
      <button type="button" class="calcKey" data-insert=".">.</button>
      <button type="button" class="calcKey calcFn" data-action="sign">±</button>
      <button type="button" class="calcKey calcOperator" data-insert="+">+</button>
      <button type="button" class="calcKey calcEquals" data-action="equals">=</button>
    </div>
    <div class="calcFooter">
      <span>Supports implicit multiply: 2π, 3(4+1), 2sin(30)</span>
      <span>Exact roots/fractions shown first · DECIMAL toggles approximation</span>
    </div>
  `;
  document.body.appendChild(panel);

  const topbar = panel.querySelector('.calcTopbar');
  const input = panel.querySelector('#calcExpression');
  const result = panel.querySelector('#calcResult');
  const modeButtons = [...panel.querySelectorAll('[data-angle-mode]')];
  const modeReadout = panel.querySelector('#calcModeReadout');
  const historyReadout = panel.querySelector('#calcHistoryReadout');
  const copyBtn = panel.querySelector('#calcCopy');
  const approxBtn = panel.querySelector('#calcApprox');

  function isOpen() {
    return panel.classList.contains('open');
  }

  function clampPosition(left, top) {
    const rect = panel.getBoundingClientRect();
    const margin = 8;
    const width = Math.min(rect.width || 410, window.innerWidth - margin * 2);
    const height = Math.min(rect.height || 500, window.innerHeight - margin * 2);
    return {
      left: Math.max(margin, Math.min(left, window.innerWidth - width - margin)),
      top: Math.max(margin, Math.min(top, window.innerHeight - height - margin))
    };
  }

  function setPanelPosition(left, top, {save=true}={}) {
    const next = clampPosition(left, top);
    panel.style.left = next.left + 'px';
    panel.style.top = next.top + 'px';
    panel.style.right = 'auto';
    panel.classList.add('positioned');
    if (save) {
      try {
        localStorage.setItem(STORAGE_POSITION, JSON.stringify(next));
      } catch (_) {}
    }
  }

  function restorePanelPosition() {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_POSITION) || 'null');
    } catch (_) {}
    if (saved && Number.isFinite(saved.left) && Number.isFinite(saved.top)) {
      setPanelPosition(saved.left, saved.top, {save:false});
    }
  }

  function resetPanelPosition() {
    panel.classList.remove('positioned');
    panel.style.left = '';
    panel.style.top = '';
    panel.style.right = '';
    try { localStorage.removeItem(STORAGE_POSITION); } catch (_) {}
  }

  let dragState = null;
  topbar.addEventListener('pointerdown', event => {
    if (event.button !== 0 || event.target.closest('button')) return;
    const rect = panel.getBoundingClientRect();
    dragState = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    };
    panel.style.width = rect.width + 'px';
    panel.classList.add('dragging');
    topbar.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  topbar.addEventListener('pointermove', event => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    setPanelPosition(event.clientX - dragState.offsetX, event.clientY - dragState.offsetY);
  });

  function finishDrag(event) {
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    dragState = null;
    panel.classList.remove('dragging');
    try { topbar.releasePointerCapture(event.pointerId); } catch (_) {}
  }

  topbar.addEventListener('pointerup', finishDrag);
  topbar.addEventListener('pointercancel', finishDrag);
  topbar.addEventListener('dblclick', event => {
    if (event.target.closest('button')) return;
    resetPanelPosition();
  });

  window.addEventListener('resize', () => {
    if (!panel.classList.contains('positioned')) return;
    const rect = panel.getBoundingClientRect();
    setPanelPosition(rect.left, rect.top, {save:true});
  });

  function setOpen(next) {
    panel.classList.toggle('open', next);
    panel.setAttribute('aria-hidden', next ? 'false' : 'true');
    toggle.setAttribute('aria-expanded', next ? 'true' : 'false');
    mobileToggle.setAttribute('aria-expanded', next ? 'true' : 'false');
    if (next) {
      requestAnimationFrame(() => {
        restorePanelPosition();
        input.focus({preventScroll: true});
        input.setSelectionRange(input.value.length, input.value.length);
      });
    }
  }

  function toggleOpen() {
    setOpen(!isOpen());
  }

  function setAngleMode(mode) {
    angleMode = mode === 'RAD' ? 'RAD' : 'DEG';
    modeButtons.forEach(button => {
      const active = button.dataset.angleMode === angleMode;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    modeReadout.textContent = angleMode + ' MODE';
    localStorage.setItem(STORAGE_ANGLE, angleMode);
    schedulePreview();
  }

  function saveHistory() {
    try {
      localStorage.setItem(STORAGE_HISTORY, JSON.stringify(history.slice(-MAX_HISTORY)));
    } catch (_) {}
  }

  function updateHistoryReadout() {
    historyReadout.textContent = history.length ? history.length + ' SAVED' : 'NO HISTORY';
  }

  function flash(el, className = 'calcFlash') {
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
    setTimeout(() => el.classList.remove(className), 180);
  }

  function normalizeExpression(value) {
    return value
      .replace(/π/g, 'pi')
      .replace(/[×·]/g, '*')
      .replace(/÷/g, '/')
      .replace(/[−–—]/g, '-');
  }

  function tokenize(source) {
    source = normalizeExpression(source);
    const tokens = [];
    let i = 0;
    while (i < source.length) {
      const rest = source.slice(i);
      const ch = source[i];
      if (/\s/.test(ch)) { i++; continue; }

      const number = rest.match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/);
      if (number) {
        tokens.push({type: 'number', value: Number(number[0])});
        i += number[0].length;
        continue;
      }

      const ident = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
      if (ident) {
        tokens.push({type: 'id', value: ident[0].toLowerCase()});
        i += ident[0].length;
        continue;
      }

      if ('+-*/^()!%'.includes(ch)) {
        tokens.push({type: ch, value: ch});
        i++;
        continue;
      }

      throw new Error('Unsupported symbol: ' + ch);
    }
    tokens.push({type: 'eof', value: ''});
    return tokens;
  }

  function evaluateExpression(source) {
    if (!source.trim()) return 0;
    const tokens = tokenize(source);
    let pos = 0;
    const peek = () => tokens[pos];
    const take = type => {
      if (peek().type !== type) throw new Error('Expected ' + type);
      return tokens[pos++];
    };

    const toAngle = x => angleMode === 'DEG' ? x * Math.PI / 180 : x;
    const fromAngle = x => angleMode === 'DEG' ? x * 180 / Math.PI : x;
    const snapTrig = value => {
      if (Math.abs(value) < 1e-12) return 0;
      if (Math.abs(value - 1) < 1e-12) return 1;
      if (Math.abs(value + 1) < 1e-12) return -1;
      return value;
    };
    const functions = {
      sin: x => snapTrig(Math.sin(toAngle(x))),
      cos: x => snapTrig(Math.cos(toAngle(x))),
      tan: x => {
        const a = toAngle(x);
        const cosine = Math.cos(a);
        if (Math.abs(cosine) < 1e-12) throw new Error('Undefined');
        return snapTrig(Math.sin(a) / cosine);
      },
      asin: x => fromAngle(Math.asin(x)),
      acos: x => fromAngle(Math.acos(x)),
      atan: x => fromAngle(Math.atan(x)),
      sqrt: x => Math.sqrt(x),
      ln: x => Math.log(x),
      log: x => Math.log10(x),
      abs: x => Math.abs(x),
      exp: x => Math.exp(x),
      floor: x => Math.floor(x),
      ceil: x => Math.ceil(x),
      round: x => Math.round(x)
    };

    function startsPrimary(token) {
      return token.type === 'number' || token.type === 'id' || token.type === '(';
    }

    function factorial(n) {
      if (!Number.isInteger(n) || n < 0) throw new Error('Factorial needs a non-negative integer');
      if (n > 170) throw new Error('Factorial is too large');
      let out = 1;
      for (let k = 2; k <= n; k++) out *= k;
      return out;
    }

    function primary() {
      const token = peek();
      if (token.type === 'number') {
        pos++;
        return token.value;
      }
      if (token.type === '(') {
        pos++;
        const value = addSub();
        take(')');
        return value;
      }
      if (token.type === 'id') {
        pos++;
        const name = token.value;
        if (name === 'pi') return Math.PI;
        if (name === 'e') return Math.E;
        if (name === 'ans') return ans;
        const fn = functions[name];
        if (!fn) throw new Error('Unknown function: ' + name);
        take('(');
        const arg = addSub();
        take(')');
        const value = fn(arg);
        if (!Number.isFinite(value)) throw new Error('Result is outside the real-number range');
        return value;
      }
      throw new Error('Expected a number, constant, or function');
    }

    function postfix() {
      let value = primary();
      while (peek().type === '!' || peek().type === '%') {
        if (peek().type === '!') {
          pos++;
          value = factorial(value);
        } else {
          pos++;
          value /= 100;
        }
      }
      return value;
    }

    function power() {
      let value = postfix();
      if (peek().type === '^') {
        pos++;
        value = Math.pow(value, unary());
      }
      return value;
    }

    function unary() {
      if (peek().type === '+') { pos++; return unary(); }
      if (peek().type === '-') { pos++; return -unary(); }
      return power();
    }

    function multiplyDivide() {
      let value = unary();
      while (true) {
        if (peek().type === '*') {
          pos++;
          value *= unary();
        } else if (peek().type === '/') {
          pos++;
          const divisor = unary();
          if (divisor === 0) throw new Error('Division by zero');
          value /= divisor;
        } else if (startsPrimary(peek())) {
          value *= unary();
        } else {
          break;
        }
      }
      return value;
    }

    function addSub() {
      let value = multiplyDivide();
      while (peek().type === '+' || peek().type === '-') {
        const op = tokens[pos++].type;
        const right = multiplyDivide();
        value = op === '+' ? value + right : value - right;
      }
      return value;
    }

    const value = addSub();
    if (peek().type !== 'eof') throw new Error('Unexpected input');
    if (!Number.isFinite(value)) throw new Error('Result is outside the real-number range');
    return Object.is(value, -0) ? 0 : value;
  }

  function gcd(a, b) {
    a = Math.abs(Math.trunc(a));
    b = Math.abs(Math.trunc(b));
    while (b) [a, b] = [b, a % b];
    return a || 1;
  }

  function near(a, b) {
    return Math.abs(a - b) <= 1e-12 * Math.max(1, Math.abs(a), Math.abs(b));
  }

  function formatFraction(n, d) {
    if (d === 1) return String(n);
    return n + '/' + d;
  }

  function formatPiMultiple(n, d) {
    const sign = n < 0 ? '-' : '';
    n = Math.abs(n);
    const g = gcd(n, d);
    n /= g;
    d /= g;
    const coeff = n === 1 ? '' : String(n);
    if (d === 1) return sign + coeff + 'π';
    return sign + (coeff || '') + 'π/' + d;
  }

  function formatRadicalMultiple(n, d, radicand) {
    const sign = n < 0 ? '-' : '';
    n = Math.abs(n);
    const g = gcd(n, d);
    n /= g;
    d /= g;
    const coeff = n === 1 ? '' : String(n);
    const radical = coeff + '√' + radicand;
    return sign + (d === 1 ? radical : radical + '/' + d);
  }

  function exactResultForValue(value) {
    if (!Number.isFinite(value)) return null;
    if (near(value, Math.round(value))) return null;

    // Prefer simple rational answers when they are genuinely exact-looking.
    for (let d = 2; d <= 48; d++) {
      const n = Math.round(value * d);
      if (Math.abs(n) > 100000) continue;
      if (near(value, n / d)) {
        const g = gcd(n, d);
        return formatFraction(n / g, d / g);
      }
    }

    // Common exact radian answers such as π/6, 2π/3, -π/2.
    for (let d = 1; d <= 24; d++) {
      const n = Math.round(value * d / Math.PI);
      if (!n || Math.abs(n) > 48) continue;
      if (near(value, n * Math.PI / d)) return formatPiMultiple(n, d);
    }

    // Radical forms such as √2, √3/2, 2√3, 3√2/2.
    const squareFree = [];
    for (let r = 2; r <= 50; r++) {
      let sf = true;
      for (let k = 2; k * k <= r; k++) {
        if (r % (k * k) === 0) { sf = false; break; }
      }
      if (sf) squareFree.push(r);
    }
    for (const r of squareFree) {
      const root = Math.sqrt(r);
      for (let d = 1; d <= 24; d++) {
        const n = Math.round(value * d / root);
        if (!n || Math.abs(n) > 96) continue;
        if (near(value, n * root / d)) return formatRadicalMultiple(n, d, r);
      }
    }

    return null;
  }

  function updateResultDisplay() {
    const numeric = formatResult(lastResultValue);
    const hasExact = !!lastExactResult && lastExactResult !== numeric;
    approxBtn.hidden = !hasExact;
    if (!hasExact) {
      result.textContent = numeric;
      resultView = 'exact';
      return;
    }
    if (resultView === 'decimal') {
      result.textContent = numeric;
      approxBtn.textContent = 'EXACT';
      approxBtn.title = 'Show exact value';
    } else {
      result.textContent = lastExactResult;
      approxBtn.textContent = 'DECIMAL';
      approxBtn.title = 'Show decimal approximation';
    }
  }

  function formatResult(value) {
    if (!Number.isFinite(value)) return 'ERROR';
    if (value === 0) return '0';
    const a = Math.abs(value);
    if (a >= 1e12 || a < 1e-9) return value.toExponential(10).replace(/\.0+e/, 'e').replace(/(\.\d*?[1-9])0+e/, '$1e');
    return Number(value.toPrecision(12)).toString();
  }

  function showResult(value, explicit = false) {
    lastResultValue = value;
    lastExactResult = exactResultForValue(value);
    resultView = 'exact';
    updateResultDisplay();
    result.dataset.state = 'ok';
    if (explicit) flash(result);
  }

  function showError(message) {
    lastExactResult = null;
    approxBtn.hidden = true;
    result.textContent = message || 'ERROR';
    result.dataset.state = 'error';
    flash(result, 'calcErrorFlash');
  }

  function preview() {
    cancelAnimationFrame(previewFrame);
    previewFrame = requestAnimationFrame(() => {
      const expression = input.value.trim();
      if (!expression) {
        lastResultValue = 0;
        lastExactResult = null;
        resultView = 'exact';
        approxBtn.hidden = true;
        result.textContent = '0';
        result.dataset.state = 'ok';
        return;
      }
      try {
        showResult(evaluateExpression(expression), false);
      } catch (_) {
        result.textContent = '—';
        result.dataset.state = 'idle';
      }
    });
  }

  function schedulePreview() {
    preview();
  }

  function commitCalculation() {
    const expression = input.value.trim();
    if (!expression) return;
    try {
      const value = evaluateExpression(expression);
      ans = value;
      const formatted = exactResultForValue(value) || formatResult(value);
      const last = history[history.length - 1];
      if (!last || last.expression !== expression || last.result !== formatted || last.mode !== angleMode) {
        history.push({expression, result: formatted, value, mode: angleMode});
        if (history.length > MAX_HISTORY) history.shift();
        saveHistory();
      }
      historyCursor = history.length;
      updateHistoryReadout();
      showResult(value, true);
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Invalid expression');
    }
  }

  function insertText(text) {
    input.focus({preventScroll: true});
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    input.setRangeText(text, start, end, 'end');
    historyCursor = history.length;
    input.dispatchEvent(new Event('input', {bubbles: true}));
  }

  function backspace() {
    input.focus({preventScroll: true});
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    if (start !== end) {
      input.setRangeText('', start, end, 'end');
    } else if (start > 0) {
      input.setRangeText('', start - 1, start, 'end');
    }
    input.dispatchEvent(new Event('input', {bubbles: true}));
  }

  function squareSelection() {
    input.focus({preventScroll: true});
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    if (start !== end) {
      const selected = input.value.slice(start, end);
      input.setRangeText('(' + selected + ')^2', start, end, 'end');
    } else {
      insertText('^2');
      return;
    }
    input.dispatchEvent(new Event('input', {bubbles: true}));
  }

  function toggleSign() {
    input.focus({preventScroll: true});
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    if (start !== end) {
      const selected = input.value.slice(start, end);
      input.setRangeText('-(' + selected + ')', start, end, 'end');
    } else {
      insertText('-');
      return;
    }
    input.dispatchEvent(new Event('input', {bubbles: true}));
  }

  function clearInput() {
    input.value = '';
    historyCursor = history.length;
    input.focus({preventScroll: true});
    preview();
  }

  function browseHistory(direction) {
    if (!history.length) return;
    if (direction < 0) {
      historyCursor = Math.max(0, historyCursor - 1);
    } else {
      historyCursor = Math.min(history.length, historyCursor + 1);
    }
    if (historyCursor === history.length) {
      input.value = '';
    } else {
      const entry = history[historyCursor];
      input.value = entry.expression;
      if (entry.mode) setAngleMode(entry.mode);
    }
    input.setSelectionRange(input.value.length, input.value.length);
    preview();
  }

  async function copyResult() {
    const text = result.dataset.state === 'ok' ? result.textContent : '';
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = 'COPIED';
    } catch (_) {
      input.focus({preventScroll: true});
      input.select();
      copyBtn.textContent = 'SELECTED';
    }
    setTimeout(() => { copyBtn.textContent = 'COPY'; }, 850);
  }

  panel.querySelectorAll('.calcKey').forEach(button => {
    button.addEventListener('click', () => {
      const insert = button.dataset.insert;
      const action = button.dataset.action;
      if (insert != null) insertText(insert);
      else if (action === 'equals') commitCalculation();
      else if (action === 'clear') clearInput();
      else if (action === 'backspace') backspace();
      else if (action === 'square') squareSelection();
      else if (action === 'sign') toggleSign();
      if (navigator.vibrate) navigator.vibrate(4);
    });
  });

  input.addEventListener('input', () => {
    historyCursor = history.length;
    schedulePreview();
  });

  input.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      commitCalculation();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      browseHistory(-1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      browseHistory(1);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.altKey && !event.ctrlKey && !event.metaKey && event.key.toLowerCase() === 'c') {
      event.preventDefault();
      toggleOpen();
    } else if (event.key === 'Escape' && isOpen() && document.activeElement !== input) {
      setOpen(false);
    }
  });

  toggle.addEventListener('click', toggleOpen);
  mobileToggle.addEventListener('click', toggleOpen);
  panel.querySelector('#calcClose').addEventListener('click', () => setOpen(false));
  modeButtons.forEach(button => button.addEventListener('click', () => setAngleMode(button.dataset.angleMode)));
  approxBtn.addEventListener('click', () => {
    if (!lastExactResult) return;
    resultView = resultView === 'exact' ? 'decimal' : 'exact';
    updateResultDisplay();
    flash(result);
  });
  copyBtn.addEventListener('click', copyResult);

  setAngleMode(angleMode);
  updateHistoryReadout();
  preview();
})();