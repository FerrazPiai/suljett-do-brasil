/* =============================================================
   SULJETT HOME · só o que é exclusivo da home.
   Header, menu, cortina e H1 vêm do assets/site.js (comum).
   ============================================================= */
(() => {
  /* ─── Botões principais "magnéticos": só com mouse e sem reduced-motion.
     Usa a propriedade `translate`, separada do `transform` do clique. ── */
  if (matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
    document.querySelectorAll('.btn--cta.btn--lg').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.15}px ${(e.clientY - r.top - r.height / 2) * 0.2}px`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.translate = ''; });
    });
  }

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
