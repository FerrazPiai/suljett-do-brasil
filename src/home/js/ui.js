/* =============================================================
   SULJETT HOME · só o que é exclusivo da home.
   Header, menu, cortina e H1 vêm do assets/site.js (comum).
   ============================================================= */
(() => {
  /* ─── CIJ Modelos: setas trocam slide + specs + painel ─────── */
  document.querySelectorAll('[data-model-carousel]').forEach((root) => {
    const groups = ['.ms-slide', '.ms-specs', '.ms-panel'].map((s) => [...root.querySelectorAll(s)]);
    const counter = root.querySelector('.ms-counter b');
    const total = groups[0].length;
    let idx = 0;
    const go = (n) => {
      idx = (n + total) % total;
      groups.forEach((g) => g.forEach((el, i) => el.classList.toggle('is-active', i === idx)));
      if (counter) counter.textContent = String(idx + 1).padStart(2, '0');
    };
    root.querySelector('[data-prev]')?.addEventListener('click', () => go(idx - 1));
    root.querySelector('[data-next]')?.addEventListener('click', () => go(idx + 1));
  });

  /* ─── Vídeo da abertura: só em computador com boa conexão e sem
     reduced-motion. Nos demais casos fica o poster (que é o LCP). ── */
  const v = document.querySelector('[data-hero-video]');
  const c = navigator.connection || {};
  const skip = matchMedia('(prefers-reduced-motion: reduce), (max-width: 1023px)').matches
    || c.saveData || /(^|-)[23]g$/.test(c.effectiveType || '');
  if (v && !skip) {
    v.querySelectorAll('source').forEach((s) => { s.src = s.dataset.src; });
    v.load();
    addEventListener('load', () => v.play().catch(() => {}), { once: true });
  }
})();
