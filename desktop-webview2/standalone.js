(() => {
  'use strict';

  const toggle = document.getElementById('calculatorToggle');
  const panel = document.getElementById('scientificCalc');
  const close = document.getElementById('calcClose');
  const input = document.getElementById('calcExpression');
  const topbar = panel?.querySelector('.calcTopbar');
  const host = window.chrome?.webview;
  const fallback = document.getElementById('bootFallback');

  const send = (message) => {
    try { host?.postMessage(message); } catch (_) {}
  };

  if (!panel) {
    if (fallback) {
      fallback.hidden = false;
      fallback.textContent = 'Calculator failed to initialize. Please reopen the app.';
    }
    send('fit:220');
    return;
  }

  if (fallback) fallback.remove();
  if (toggle && !panel.classList.contains('open')) toggle.click();

  if (close) {
    close.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      send('close');
    }, true);
  }

  if (topbar) {
    topbar.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      if (event.target.closest('button,input,a,[role="button"]')) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      send('drag');
    }, true);
  }

  window.addEventListener('keydown', (event) => {
    const altC = event.altKey && !event.ctrlKey && !event.metaKey && String(event.key || '').toLowerCase() === 'c';
    if (altC) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      send('close');
    }
  }, true);

  let lastHeight = 0;
  let fitTimer = 0;
  const requestFit = () => {
    clearTimeout(fitTimer);
    fitTimer = setTimeout(() => {
      const rect = panel?.getBoundingClientRect();
      const height = Math.ceil(rect?.height || panel?.scrollHeight || 0);
      if (Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      send('fit:' + height);
    }, 20);
  };

  requestAnimationFrame(() => {
    input?.focus({ preventScroll: true });
    if (input) input.setSelectionRange(input.value.length, input.value.length);
    requestFit();
  });

  window.addEventListener('load', requestFit, { once: true });
  if (window.ResizeObserver && panel) {
    new ResizeObserver(requestFit).observe(panel);
  }

  if (document.fonts?.ready) document.fonts.ready.then(requestFit);
})();
