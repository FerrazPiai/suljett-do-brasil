/* =============================================================
   SULJETT DO BRASIL — SITE SYSTEM · shared chrome + interactions
   Injects header / mobile menu / footer / intro, then wires
   the reveal system, counters, FAQ accordion and form states.
   Each page sets <body data-page="..."> for active-nav state.
   ============================================================= */
(() => {
  const PAGE = document.body.dataset.page || '';
  const onSolucoes = ['produtos','industrias','aplicacoes','servicos','ficha'].includes(PAGE);
  const A = (p) => (PAGE === p ? ' is-active' : '');

  /* ─── Header markup ─────────────────────────────────────── */
  const headerHTML = `
  <header class="site-header" id="siteHeader" role="banner">
    <div class="container header-inner">
      <a href="index.html" class="logo" aria-label="Suljett do Brasil — Página inicial">
        <img src="assets/logo-suljett.png" alt="Suljett do Brasil" class="logo-img" />
      </a>
      <nav class="nav-links" aria-label="Navegação principal">
        <a class="nav-link${A('home')}" href="index.html">Home</a>
        <a class="nav-link${A('empresa')}" href="empresa.html">Empresa</a>
        <div class="has-dropdown" id="ddSolucoes">
          <button class="nav-link nav-link--dropdown${onSolucoes ? ' is-active' : ''}" aria-haspopup="true" aria-expanded="false">
            Soluções
            <svg class="chev" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="mega-menu" role="menu">
            <div class="mega-col">
              <span class="mega-label">Em destaque</span>
              <a href="ficha-tecnica-fispq.html" class="mega-item mega-item--featured mega-item--accent">
                <span class="mega-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z M14 3v6h6 M8 14h8 M8 17h5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></span>
                <span><strong>★ Ficha Técnica (FISPQ)</strong><em>Baixe FISPQ + part number</em></span>
              </a>
              <a href="aplicacoes-garrafas-pet.html" class="mega-item">
                <span class="mega-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 3h8l-1 4 2 3v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9l2-3-1-4z M8 10h8" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></span>
                <span><strong>Aplicações</strong><em>Por substrato e embalagem</em></span>
              </a>
            </div>
            <div class="mega-col">
              <span class="mega-label">Produtos</span>
              <a href="produtos-cij-hitachi.html" class="mega-item"><span><strong>CIJ Hitachi</strong></span></a>
              <a href="produtos-cij-hitachi.html#insumos" class="mega-item"><span><strong>Insumos Hitachi (S10)</strong></span></a>
              <a href="produtos-cij-hitachi.html" class="mega-item"><span><strong>Comparativo CIJ</strong></span></a>
              <span class="mega-label">Indústrias</span>
              <a href="industrias-bebidas.html" class="mega-item"><span><strong>Bebidas</strong></span></a>
            </div>
            <div class="mega-col">
              <span class="mega-label">Serviços</span>
              <a href="servicos-assistencia-tecnica.html" class="mega-item"><span><strong>Assistência Técnica</strong></span></a>
              <a href="servicos-assistencia-tecnica.html#contrato" class="mega-item"><span><strong>Contratos de serviço</strong></span></a>
              <a href="servicos-assistencia-tecnica.html#chamado" class="mega-item"><span><strong>Help Desk</strong></span></a>
              <span class="mega-label">Empresa</span>
              <a href="empresa.html" class="mega-item"><span><strong>Sobre a Suljett</strong></span></a>
            </div>
          </div>
        </div>
        <a class="nav-link${A('contato')}" href="contato.html">Contato</a>
      </nav>
      <div class="nav-actions">
        <a href="contato.html" class="btn btn--cta">
          Falar com Especialista
          <svg class="btn-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <button class="btn-hamburger" id="hamburger" aria-label="Abrir menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
  <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
    <div class="mobile-menu-inner">
      <a href="index.html" class="${PAGE==='home'?'is-active':''}">Home</a>
      <a href="empresa.html" class="${PAGE==='empresa'?'is-active':''}">Empresa</a>
      <span class="mobile-label">Soluções</span>
      <a href="ficha-tecnica-fispq.html" class="mobile-featured">★ Ficha Técnica (FISPQ)</a>
      <a href="aplicacoes-garrafas-pet.html">Aplicações</a>
      <span class="mobile-sublabel">Produtos</span>
      <a href="produtos-cij-hitachi.html">CIJ Hitachi</a>
      <a href="produtos-cij-hitachi.html#insumos">Insumos Hitachi (S10)</a>
      <span class="mobile-sublabel">Indústrias</span>
      <a href="industrias-bebidas.html">Bebidas</a>
      <span class="mobile-sublabel">Serviços</span>
      <a href="servicos-assistencia-tecnica.html">Assistência Técnica</a>
      <a href="contato.html" class="${PAGE==='contato'?'is-active':''}">Contato</a>
      <a href="contato.html" class="btn btn--cta" style="margin-top:1.25rem">Falar com Especialista →</a>
    </div>
  </div>`;

  /* ─── Footer markup ─────────────────────────────────────── */
  const footerHTML = `
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <span class="footer-logo-tile"><img src="assets/logo-suljett.png" alt="Suljett do Brasil" /></span>
          <p class="footer-tag">Distribuidora oficial Hitachi Industrial Equipment Systems no Sul e Nordeste do Brasil. Codificação industrial que não para.</p>
          <div class="footer-social">
            <a class="footer-soc" href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.25 8.25h4.5V24H.25zM8.5 8.25H12.8v2.15h.06c.6-1.13 2.06-2.32 4.24-2.32 4.54 0 5.38 2.99 5.38 6.88V24h-4.5v-6.96c0-1.66-.03-3.8-2.32-3.8-2.32 0-2.68 1.81-2.68 3.68V24H8.5z"/></svg></a>
            <a class="footer-soc" href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
            <a class="footer-soc" href="#" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.5zM9.75 15.5v-7l6 3.5z"/></svg></a>
          </div>
        </div>
        <div class="footer-cols">
          <div class="footer-col">
            <span class="footer-label">Soluções</span>
            <a href="produtos-cij-hitachi.html">CIJ Hitachi</a>
            <a href="industrias-bebidas.html">Indústrias</a>
            <a href="aplicacoes-garrafas-pet.html">Aplicações</a>
            <a href="servicos-assistencia-tecnica.html">Serviços</a>
            <a href="ficha-tecnica-fispq.html">Ficha técnica (FISPQ)</a>
          </div>
          <div class="footer-col">
            <span class="footer-label">Institucional</span>
            <a href="empresa.html">Sobre nós</a>
            <a href="empresa.html#iso">Política da Qualidade</a>
            <a href="contato.html#rh">Trabalhe conosco</a>
          </div>
          <div class="footer-col">
            <span class="footer-label">Contato</span>
            <a href="contato.html">Fale conosco</a>
            <a href="https://wa.me/5551980370198" class="footer-phone">(51) 98037-0198</a>
            <span>contato@suljett.com</span>
          </div>
          <div class="footer-col">
            <span class="footer-label">Unidades</span>
            <span>Porto Alegre · RS</span>
            <span>Joinville · SC</span>
            <span>Marechal Deodoro · AL</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Suljett do Brasil · CNPJ 13.197.778/0002-65 · Distribuidor oficial Hitachi</span>
        <span>Rastreabilidade · Automação · Inspeção · Codificação</span>
      </div>
    </div>
  </footer>`;

  /* ─── Intro curtain (once per browser session) ─────────── */
  const showIntro = !sessionStorage.getItem('sj-introShown');
  let introHTML = '';
  if (showIntro) {
    introHTML = `<div class="intro-curtain" id="introCurtain" aria-hidden="true">
      <div class="intro-logo-wrap" id="introLogo"><img src="assets/logo-suljett.png" alt="Suljett do Brasil" /></div>
      <span class="intro-bar" id="introBar"></span>
    </div>`;
  }

  /* ─── Inject ────────────────────────────────────────────── */
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  if (introHTML) document.body.insertAdjacentHTML('afterbegin', introHTML);

  /* ─── Intro animation ───────────────────────────────────── */
  const runReveal = () => {
    document.querySelector('.page-hero')?.classList.add('is-loaded');
    initReveals();
  };
  if (showIntro) {
    sessionStorage.setItem('sj-introShown', '1');
    document.body.classList.add('no-scroll');
    const curtain = document.getElementById('introCurtain');
    const logo = document.getElementById('introLogo');
    const bar = document.getElementById('introBar');
    requestAnimationFrame(() => {
      logo.style.transition = 'opacity .7s var(--ease-reveal), transform .7s var(--ease-reveal)';
      logo.style.opacity = '1'; logo.style.transform = 'translateY(0) scale(1)';
      bar.style.transition = 'width 1s cubic-bezier(.76,0,.24,1)'; bar.style.width = '100%';
    });
    setTimeout(() => {
      curtain.style.transition = 'transform .8s cubic-bezier(.87,0,.13,1), opacity .6s ease';
      curtain.style.transform = 'translateY(-100%)';
      curtain.classList.add('is-out');
      document.body.classList.remove('no-scroll');
      runReveal();
      setTimeout(() => curtain.remove(), 900);
    }, 1250);
  } else {
    runReveal();
  }

  /* ─── Header scroll behaviour ───────────────────────────── */
  const header = document.getElementById('siteHeader');
  let lastY = window.scrollY, hideRaf = 0;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    const dy = y - lastY;
    if (y > 200 && dy > 10) header.classList.add('is-hidden');
    else if (dy < -10 || y < 80) header.classList.remove('is-hidden');
    lastY = y;
  };
  window.addEventListener('scroll', () => { if (hideRaf) return; hideRaf = requestAnimationFrame(() => { hideRaf = 0; onScroll(); }); }, { passive: true });
  window.addEventListener('mousemove', (e) => { if (e.clientY < 90) header.classList.remove('is-hidden'); }, { passive: true });
  onScroll();

  /* ─── Mega dropdown ─────────────────────────────────────── */
  document.querySelectorAll('.has-dropdown').forEach((dd) => {
    const btn = dd.querySelector('.nav-link--dropdown');
    btn?.addEventListener('click', (e) => { e.stopPropagation(); const open = dd.classList.toggle('is-open'); btn.setAttribute('aria-expanded', String(open)); });
    dd.addEventListener('mouseenter', () => { dd.classList.add('is-open'); btn?.setAttribute('aria-expanded','true'); });
    dd.addEventListener('mouseleave', () => { dd.classList.remove('is-open'); btn?.setAttribute('aria-expanded','false'); });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) document.querySelectorAll('.has-dropdown.is-open').forEach((d) => { d.classList.remove('is-open'); d.querySelector('.nav-link--dropdown')?.setAttribute('aria-expanded','false'); });
  });

  /* ─── Mobile menu ───────────────────────────────────────── */
  const ham = document.getElementById('hamburger');
  const mm = document.getElementById('mobileMenu');
  ham?.addEventListener('click', () => {
    const open = ham.getAttribute('aria-expanded') !== 'true';
    ham.setAttribute('aria-expanded', String(open));
    mm.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mm?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { ham.setAttribute('aria-expanded','false'); mm.classList.remove('is-open'); document.body.style.overflow = ''; }));

  /* ─── Word-mask splitter ────────────────────────────────── */
  function splitWords(el) {
    if (el.dataset.split === '1') return; el.dataset.split = '1';
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const parent = node.parentNode;
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((w) => {
        if (!w) return;
        if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
        const mask = document.createElement('span'); mask.className = 'w-mask';
        const inner = document.createElement('span'); inner.className = 'w-inner'; inner.textContent = w;
        mask.appendChild(inner); frag.appendChild(mask);
      });
      parent.replaceChild(frag, node);
    });
  };

  /* ─── Reveal system ─────────────────────────────────────── */
  // Reveal a word-mask, then force-settle it to its final position with the
  // transition disabled — so the word ALWAYS lands visible even if the CSS
  // transform transition is throttled/frozen (and never stays clipped).
  function revealMask(m) {
    m.classList.add('is-in');
    setTimeout(() => {
      m.querySelectorAll('.w-inner').forEach((i) => { i.style.transition = 'none'; i.style.transform = 'translateY(0)'; });
    }, 760);
  }
  // Same idea for fade/slide elements: opacity is instant via CSS; settle the
  // transform so it never stays offset if the transition is frozen.
  function revealEl(el) {
    el.classList.add('is-in');
    setTimeout(() => { el.style.transition = 'none'; el.style.transform = 'translateY(0)'; }, 900);
  }

  function initReveals() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // hero heading: split + reveal immediately
    document.querySelectorAll('[data-split]').forEach((h) => {
      splitWords(h);
      const masks = h.querySelectorAll('.w-mask');
      masks.forEach((m, i) => setTimeout(() => revealMask(m), 120 + i * 45));
    });
    document.querySelectorAll('.page-hero .reveal, .page-hero .reveal-up').forEach((el, i) => {
      setTimeout(() => revealEl(el), 350 + i * 90);
    });

    if (reduced) {
      document.querySelectorAll('.reveal, .reveal-up').forEach((el) => el.classList.add('is-in'));
      document.querySelectorAll('[data-counter]').forEach(runCounter);
      return;
    }

    // section headings → split words
    const headings = document.querySelectorAll('.section .h-display, .section .h-medium');
    headings.forEach((h) => { splitWords(h); h.style.opacity = '1'; });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        if (el.matches('.h-display, .h-medium')) {
          el.querySelectorAll('.w-mask').forEach((m, i) => setTimeout(() => revealMask(m), i * 35));
        } else {
          revealEl(el);
        }
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.section .h-display, .section .h-medium, .section .reveal, .section .reveal-up').forEach((el) => io.observe(el));

    // counters
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.4 });
    document.querySelectorAll('[data-counter]').forEach((el) => cio.observe(el));
  }

  function runCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const dur = 1500; const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased).toLocaleString('pt-BR') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ─── FAQ accordion ─────────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q?.addEventListener('click', () => {
      const open = item.classList.toggle('is-open');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
      q.setAttribute('aria-expanded', String(open));
    });
  });

  /* ─── Form demo submit ──────────────────────────────────── */
  document.querySelectorAll('form[data-demo]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.classList.add('is-success');
      const btn = form.querySelector('button[type=submit], .btn[type=submit]');
      if (btn) { btn.textContent = form.dataset.demo === 'download' ? 'Download iniciado ✓' : 'Enviado ✓'; btn.disabled = true; }
    });
  });

  /* ─── Contact selector smooth focus ─────────────────────── */
  document.querySelectorAll('[data-jump]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const tgt = document.querySelector(el.getAttribute('href'));
      if (tgt) { e.preventDefault(); window.scrollTo({ top: tgt.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' }); tgt.classList.add('is-flash'); setTimeout(() => tgt.classList.remove('is-flash'), 1200); }
    });
  });
})();
