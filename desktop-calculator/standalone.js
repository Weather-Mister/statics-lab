(() => {
  'use strict';

  const toggle = document.getElementById('calculatorToggle');
  const panel = document.getElementById('scientificCalc');
  const close = document.getElementById('calcClose');
  const input = document.getElementById('calcExpression');

  if (toggle && panel && !panel.classList.contains('open')) toggle.click();

  const requestFit = () => {
    if (!panel || !window.desktopAPI?.resizeToFit) return;
    requestAnimationFrame(() => {
      const desiredHeight = Math.ceil(panel.scrollHeight + 2);
      window.desktopAPI.resizeToFit({ width: 440, height: desiredHeight });
    });
  };

  if (close && window.desktopAPI) {
    close.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.desktopAPI.hideWindow();
    }, true);
  }

  window.addEventListener('keydown', (event) => {
    const altC = event.altKey && !event.ctrlKey && !event.metaKey && String(event.key || '').toLowerCase() === 'c';
    if (altC) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (event.key === 'Escape' && window.desktopAPI) {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.desktopAPI.hideWindow();
    }
  }, true);

  if (window.desktopAPI) {
    window.desktopAPI.onFocusExpression(() => {
      if (!panel.classList.contains('open') && toggle) toggle.click();
      requestAnimationFrame(() => {
        input?.focus({ preventScroll: true });
        if (input) input.setSelectionRange(input.value.length, input.value.length);
      });
    });
  }

  requestAnimationFrame(() => {
    input?.focus({ preventScroll: true });
    if (input) input.setSelectionRange(input.value.length, input.value.length);
    requestFit();
  });

  setTimeout(requestFit, 80);
  if (document.fonts?.ready) document.fonts.ready.then(requestFit);
})();
