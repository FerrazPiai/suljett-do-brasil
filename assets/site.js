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
            <div class="mega-col mega-col--featured">
              <span class="mega-label">Em destaque</span>
              <a href="ficha-tecnica-fispq.html" class="mega-item mega-item--featured mega-item--accent">
                <span class="mega-ico" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z M14 3v6h6 M8 14h8 M8 17h5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></span>
                <span><strong>★ Ficha Técnica (FISPQ)</strong><em>Baixe FISPQ + part number</em></span>
              </a>
              <a href="aplicacoes-garrafas-pet.html" class="mega-item">
                <span class="mega-ico" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 3h8l-1 4 2 3v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9l2-3-1-4z M8 10h8" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></span>
                <span><strong>Aplicações</strong><em>Por substrato e embalagem</em></span>
              </a>
            </div>
            <div class="mega-col">
              <span class="mega-label">Produtos</span>
              <a href="produtos-cij-hitachi.html" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg></span><span><strong>CIJ Hitachi</strong></span></a>
              <a href="produtos-cij-hitachi.html#comparativo" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6"/><rect x="12" y="7" width="3" height="10"/><rect x="17" y="13" width="3" height="4"/></svg></span><span><strong>Comparativo Hitachi</strong></span></a>
              <a class="mega-item mega-item--simple is-soon" aria-disabled="true"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0z"/></svg></span><span><strong>TIJ — Jato Termal</strong></span></a>
              <a class="mega-item mega-item--simple is-soon" aria-disabled="true"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="8" cy="12" r="2.5"/><circle cx="16" cy="12" r="2.5"/></svg></span><span><strong>TTO — Transf. Térmica</strong></span></a>
              <a href="produtos-cij-hitachi.html#insumos" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.7S5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2.7 12 2.7z"/></svg></span><span><strong>Insumos Hitachi</strong></span></a>
              <a href="empresa.html#parcerias" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></span><span><strong>Detectores Fortress</strong></span></a>
            </div>
            <div class="mega-col">
              <span class="mega-label">Indústrias</span>
              <a href="index.html#aplicacoes" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.85-5.4 5.08-6"/></svg></span><span><strong>Alimentícia</strong></span></a>
              <a href="industrias-bebidas.html" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h11v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M16 9h2a2 2 0 0 1 0 4h-2"/><path d="M8 3v2M11 3v2"/></svg></span><span><strong>Bebidas</strong></span></a>
              <a href="index.html#aplicacoes" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-4 0-6.5 6-6.5 10a6.5 6.5 0 0 0 13 0C18.5 9 16 3 12 3z"/></svg></span><span><strong>Ovos / Avícolas</strong></span></a>
              <a href="index.html#aplicacoes" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2h8M9 2l-1 4v13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6l-1-4"/><path d="M8 10h8"/></svg></span><span><strong>Laticínios</strong></span></a>
              <a href="index.html#aplicacoes" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 20.5 3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7z"/><path d="m8.5 8.5 7 7"/></svg></span><span><strong>Farmacêutica</strong></span></a>
              <a href="index.html#aplicacoes" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h14M3 17v-3.5a2 2 0 0 1 .6-1.4L6 10l1.5-4A2 2 0 0 1 9.4 5h5.2a2 2 0 0 1 1.9 1.4L18 10l2.4 2.1a2 2 0 0 1 .6 1.4V17"/><circle cx="7.5" cy="17.5" r="1.6"/><circle cx="16.5" cy="17.5" r="1.6"/></svg></span><span><strong>Automotiva</strong></span></a>
              <a href="index.html#aplicacoes" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="9" height="13" rx="2"/><path d="M11 8V5a2 2 0 0 1 2-2 2 2 0 0 1 2 2v3"/><path d="M5 4h2M4 6h2M5 8h1"/></svg></span><span><strong>Cosméticos</strong></span></a>
              <a href="index.html#aplicacoes" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg></span><span><strong>Eletrônicos</strong></span></a>
              <a href="index.html#aplicacoes" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6c5 0 5 12 10 12s5-12 8-12"/><path d="M2 6h3M19 18h3"/></svg></span><span><strong>Fios, Cabos e Dutos</strong></span></a>
              <a href="index.html#aplicacoes" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16v-1a8 8 0 0 1 16 0v1"/><path d="M10 5.4a8 8 0 0 1 4 0M12 4v3.5"/><path d="M2 19a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2H2z"/></svg></span><span><strong>Construção</strong></span></a>
            </div>
            <div class="mega-col">
              <span class="mega-label">Serviços</span>
              <a href="servicos-assistencia-tecnica.html" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.8-2.8z"/></svg></span><span><strong>Assistência Técnica</strong></span></a>
              <a href="servicos-assistencia-tecnica.html#manutencao" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M22 12h-3M5 12H2M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7 5.6 5.6"/></svg></span><span><strong>Manutenção</strong></span></a>
              <a href="servicos-assistencia-tecnica.html" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v11M8 10l4 4 4-4"/><path d="M4 18h16"/></svg></span><span><strong>Instalação</strong></span></a>
              <a href="servicos-assistencia-tecnica.html" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 9 12 5 2 9l10 4 10-4z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/></svg></span><span><strong>Treinamento técnico</strong></span></a>
              <a href="servicos-assistencia-tecnica.html#contrato" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/></svg></span><span><strong>Contratos de serviço</strong></span></a>
              <a href="servicos-assistencia-tecnica.html#chamado" class="mega-item mega-item--simple"><span class="mega-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13v-1a8 8 0 0 1 16 0v1"/><path d="M5 12a2 2 0 0 0-1 1.7v1.6A2 2 0 0 0 6 17h1v-5H6a2 2 0 0 0-1 0z"/><path d="M19 12a2 2 0 0 1 1 1.7v1.6A2 2 0 0 1 18 17h-1v-5h1a2 2 0 0 1 1 0z"/><path d="M18 17v1a3 3 0 0 1-3 3h-3"/></svg></span><span><strong>Help Desk</strong></span></a>
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
      <a href="produtos-cij-hitachi.html#comparativo">Comparativo Hitachi</a>
      <a class="is-soon" aria-disabled="true">TIJ — Jato Termal</a>
      <a class="is-soon" aria-disabled="true">TTO — Transf. Térmica</a>
      <a href="produtos-cij-hitachi.html#insumos">Insumos Hitachi</a>
      <a href="empresa.html#parcerias">Detectores Fortress</a>
      <span class="mobile-sublabel">Indústrias</span>
      <a href="index.html#aplicacoes">Alimentícia</a>
      <a href="industrias-bebidas.html">Bebidas</a>
      <a href="index.html#aplicacoes">Ovos / Avícolas</a>
      <a href="index.html#aplicacoes">Laticínios</a>
      <a href="index.html#aplicacoes">Farmacêutica</a>
      <a href="index.html#aplicacoes">Automotiva</a>
      <a href="index.html#aplicacoes">Cosméticos</a>
      <a href="index.html#aplicacoes">Eletrônicos</a>
      <a href="index.html#aplicacoes">Fios, Cabos e Dutos</a>
      <a href="index.html#aplicacoes">Construção</a>
      <span class="mobile-sublabel">Serviços</span>
      <a href="servicos-assistencia-tecnica.html">Assistência Técnica</a>
      <a href="servicos-assistencia-tecnica.html#manutencao">Manutenção</a>
      <a href="servicos-assistencia-tecnica.html">Instalação</a>
      <a href="servicos-assistencia-tecnica.html">Treinamento técnico</a>
      <a href="servicos-assistencia-tecnica.html#contrato">Contratos de serviço</a>
      <a href="servicos-assistencia-tecnica.html#chamado">Help Desk</a>
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
            <a class="footer-soc" href="https://www.linkedin.com/company/suljett-do-brasil" target="_blank" rel="noopener" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.25 8.25h4.5V24H.25zM8.5 8.25H12.8v2.15h.06c.6-1.13 2.06-2.32 4.24-2.32 4.54 0 5.38 2.99 5.38 6.88V24h-4.5v-6.96c0-1.66-.03-3.8-2.32-3.8-2.32 0-2.68 1.81-2.68 3.68V24H8.5z"/></svg></a>
            <a class="footer-soc" href="https://www.instagram.com/suljettdobrasil/" target="_blank" rel="noopener" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
            <a class="footer-soc" href="https://www.youtube.com/@suljett" target="_blank" rel="noopener" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.5zM9.75 15.5v-7l6 3.5z"/></svg></a>
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
            <a href="mailto:contato@suljett.com">contato@suljett.com</a>
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
  // Hover-intent: fechar só após um delay, para dar tempo de mover o
  // mouse do botão até o painel sem o menu sumir no caminho.
  const DD_CLOSE_DELAY = 320;
  document.querySelectorAll('.has-dropdown').forEach((dd) => {
    const btn = dd.querySelector('.nav-link--dropdown');
    let closeTimer = null;
    const open = () => { clearTimeout(closeTimer); dd.classList.add('is-open'); btn?.setAttribute('aria-expanded', 'true'); };
    const close = () => { clearTimeout(closeTimer); dd.classList.remove('is-open'); btn?.setAttribute('aria-expanded', 'false'); };
    btn?.addEventListener('click', (e) => { e.stopPropagation(); dd.classList.contains('is-open') ? close() : open(); });
    dd.addEventListener('mouseenter', open);
    dd.addEventListener('mouseleave', () => { clearTimeout(closeTimer); closeTimer = setTimeout(close, DD_CLOSE_DELAY); });
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
