(() => {
  const qs  = (s, c=document) => c.querySelector(s);
  const qsa = (s, c=document) => [...c.querySelectorAll(s)];

  /* ─── Theme: forçado claro (sem toggle) ─────────────────── */
  document.documentElement.dataset.theme = 'light';
  try { localStorage.removeItem('sj-theme'); } catch (e) {}

  /* ─── Header auto-hide on scroll down, show on up / near top ── */
  const header = qs('#siteHeader');
  let lastY = window.scrollY;
  let hideRaf = 0;
  const HIDE_THRESHOLD = 12;
  const REVEAL_ZONE = 90;   // px from top of viewport that force-shows header
  const onScroll = () => {
    if (!header) return;
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    const dy = y - lastY;
    if (y > 180 && dy > HIDE_THRESHOLD) {
      header.classList.add('is-hidden');
    } else if (dy < -HIDE_THRESHOLD || y < 80) {
      header.classList.remove('is-hidden');
    }
    lastY = y;
  };
  window.addEventListener('scroll', () => {
    if (hideRaf) return;
    hideRaf = requestAnimationFrame(() => { hideRaf = 0; onScroll(); });
  }, { passive: true });
  window.addEventListener('mousemove', (e) => {
    if (!header) return;
    if (e.clientY < REVEAL_ZONE) header.classList.remove('is-hidden');
  }, { passive: true });
  onScroll();

  /* ─── Dropdown ──────────────────────────────────────────── */
  // Abre no hover (como nas páginas internas) e fecha com delay,
  // para dar tempo de mover o mouse do botão até o painel.
  const DD_CLOSE_DELAY = 320;
  qsa('.has-dropdown').forEach((dd) => {
    const btn = qs('.nav-link--dropdown', dd);
    let closeTimer = null;
    const open = () => { clearTimeout(closeTimer); dd.classList.add('is-open'); btn?.setAttribute('aria-expanded', 'true'); };
    const close = () => { clearTimeout(closeTimer); dd.classList.remove('is-open'); btn?.setAttribute('aria-expanded', 'false'); };
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      dd.classList.contains('is-open') ? close() : open();
    });
    dd.addEventListener('mouseenter', open);
    dd.addEventListener('mouseleave', () => { clearTimeout(closeTimer); closeTimer = setTimeout(close, DD_CLOSE_DELAY); });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      qsa('.has-dropdown.is-open').forEach((d) => {
        d.classList.remove('is-open');
        qs('.nav-link--dropdown', d)?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* ─── Mobile menu ───────────────────────────────────────── */
  const ham = qs('#hamburger');
  const mm  = qs('#mobileMenu');
  ham?.addEventListener('click', () => {
    const open = ham.getAttribute('aria-expanded') !== 'true';
    ham.setAttribute('aria-expanded', String(open));
    mm?.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  qsa('#mobileMenu a').forEach((a) => a.addEventListener('click', () => {
    ham?.setAttribute('aria-expanded', 'false');
    mm?.classList.remove('is-open');
    document.body.style.overflow = '';
  }));

  /* ─── Hero title / reveals / counters ─────────────────────
     Handled by the GSAP block above (Lenis + ScrollTrigger).
     Legacy splitter + IntersectionObserver + counter IO
     intentionally removed to avoid double-processing. */

  /* ─── How-it-works rail ─────────────────────────────────── */
  const hs = qs('.how-steps');
  if (hs) {
    const railIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { hs.classList.add('is-in'); railIO.disconnect(); } });
    }, { threshold: 0.3 });
    railIO.observe(hs);
  }

  /* ─── Hero live readout (simulate) ──────────────────────── */
  const rand = (min, max, dec=2) => (min + Math.random() * (max - min)).toFixed(dec);
  setInterval(() => {
    const chars = qs('[data-live="chars"]');
    const psi   = qs('[data-live="psi"]');
    const visc  = qs('[data-live="visc"]');
    if (chars) chars.textContent = (17800 + Math.round(Math.random() * 400)).toLocaleString('en-US');
    if (psi)   psi.textContent   = rand(3.18, 3.32, 2);
    if (visc)  visc.textContent  = rand(24.2, 25.1, 1) + ' cps';
  }, 1400);

  /* ─── Testimonials carousel v2 (fade) ──────────────────── */
  (function initTcar(){
    const root = document.getElementById('tcar');
    if (!root) return;
    const slides = Array.from(root.querySelectorAll('.tcar-slide'));
    const dots = Array.from(root.querySelectorAll('.tcar-dot'));
    const prevBtn = document.getElementById('tcarPrev');
    const nextBtn = document.getElementById('tcarNext');
    let idx = 0;
    let timer = null;
    function go(n) {
      idx = ((n % slides.length) + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    }
    function start() { stop(); timer = setInterval(() => go(idx + 1), 9000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    prevBtn && prevBtn.addEventListener('click', () => { go(idx - 1); start(); });
    nextBtn && nextBtn.addEventListener('click', () => { go(idx + 1); start(); });
    dots.forEach(d => d.addEventListener('click', () => { go(parseInt(d.dataset.idx, 10)); start(); }));
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    go(0);
    start();
  })();

  /* ─── Lead form ─────────────────────────────────────────── */
  qs('#leadForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    form.classList.add('is-success');
    form.querySelector('button[type=submit]').textContent = 'Download iniciado ✓';
  });

})();

