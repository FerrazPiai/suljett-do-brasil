/* =============================================================
   SULJETT DO BRASIL · comportamentos comuns (home e internas)
   Header/footer vêm prontos do build (partials/). Aqui: cortina de
   abertura (1x por sessão), header, menu, H1 da abertura, FAQ e
   rolagem para âncoras. Reveals de seção são CSS puro (01-base.css).
   Leads e medição ficam em assets/leads.js.
   ============================================================= */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Cortina de abertura: 1x por sessão, curta, sem travar a rolagem ── */
  let firstVisit = false;
  try { firstVisit = !sessionStorage.getItem('sj-introShown'); sessionStorage.setItem('sj-introShown', '1'); } catch (e) {}
  if (firstVisit && !reduced) {
    document.body.insertAdjacentHTML('afterbegin', `<div class="intro-curtain" id="introCurtain" aria-hidden="true">
      <div class="intro-logo-wrap"><img src="/assets/logo-suljett.webp" alt="" width="320" height="128" /></div>
      <span class="intro-bar"></span></div>`);
    const curtain = document.getElementById('introCurtain');
    requestAnimationFrame(() => requestAnimationFrame(() => curtain.classList.add('is-in')));
    setTimeout(() => curtain.classList.add('is-out'), 550);
    setTimeout(() => curtain.remove(), 1100);
  }

  /* ─── H1 da abertura: palavras sobem em sequência ─────────── */
  document.querySelector('.page-hero, .hero')?.classList.add('is-loaded');
  if (!reduced) {
    document.querySelectorAll('[data-split]').forEach((h) => {
      const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((node) => {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((w) => {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.append(w); return; }
          const mask = document.createElement('span');
          mask.className = 'w-mask';
          mask.innerHTML = '<span class="w-inner"></span>';
          mask.firstChild.textContent = w;
          frag.append(mask);
        });
        node.replaceWith(frag);
      });
      const delay = firstVisit ? 600 : 60;
      h.querySelectorAll('.w-mask').forEach((m, i) => setTimeout(() => m.classList.add('is-in'), delay + i * 30));
    });
  }

  /* ─── Header: some ao descer, volta ao subir ─────────────── */
  const header = document.getElementById('siteHeader');
  let lastY = scrollY, raf = 0;
  const onScroll = () => {
    raf = 0;
    const y = scrollY, dy = y - lastY;
    header.classList.toggle('is-scrolled', y > 40);
    if (y > 200 && dy > 10) header.classList.add('is-hidden');
    else if (dy < -10 || y < 80) header.classList.remove('is-hidden');
    lastY = y;
  };
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(onScroll); }, { passive: true });
  addEventListener('mousemove', (e) => { if (e.clientY < 90) header.classList.remove('is-hidden'); }, { passive: true });
  onScroll();

  /* ─── Mega menu: hover com atraso para fechar, clique no toque ── */
  document.querySelectorAll('.has-dropdown').forEach((dd) => {
    const btn = dd.querySelector('.nav-link--dropdown');
    let t = 0;
    const set = (open) => { clearTimeout(t); dd.classList.toggle('is-open', open); btn?.setAttribute('aria-expanded', String(open)); };
    btn?.addEventListener('click', (e) => { e.stopPropagation(); set(!dd.classList.contains('is-open')); });
    dd.addEventListener('mouseenter', () => set(true));
    dd.addEventListener('mouseleave', () => { clearTimeout(t); t = setTimeout(() => set(false), 320); });
    dd.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); btn?.focus(); } });
  });
  document.addEventListener('click', (e) => {
    if (e.target.closest('.has-dropdown')) return;
    document.querySelectorAll('.has-dropdown.is-open').forEach((d) => {
      d.classList.remove('is-open');
      d.querySelector('.nav-link--dropdown')?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ─── Menu mobile ────────────────────────────────────────── */
  const ham = document.getElementById('hamburger');
  const mm = document.getElementById('mobileMenu');
  const setMenu = (open) => {
    ham?.setAttribute('aria-expanded', String(open));
    mm?.classList.toggle('is-open', open);
    mm?.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  ham?.addEventListener('click', () => setMenu(ham.getAttribute('aria-expanded') !== 'true'));
  mm?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* ─── FAQ ────────────────────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q?.addEventListener('click', () => {
      const open = item.classList.toggle('is-open');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
      q.setAttribute('aria-expanded', String(open));
    });
  });

  /* ─── Âncoras internas (desconta o header fixo) ──────────── */
  document.querySelectorAll('[data-jump]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const tgt = document.querySelector(el.getAttribute('href'));
      if (!tgt) return;
      e.preventDefault();
      scrollTo({ top: tgt.getBoundingClientRect().top + scrollY - 100, behavior: reduced ? 'auto' : 'smooth' });
    });
  });
})();
