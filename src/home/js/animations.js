/* =============================================================
   SULJETT HOME — INTRO + GSAP
   ============================================================= */
(() => {
  const body = document.body;
  const curtain = document.getElementById('introCurtain');
  if (!curtain) return;

  gsap.registerPlugin(ScrollTrigger);

  // Always play intro on load (refresh replays too)
  body.classList.add('no-scroll');

  const logoEl = document.getElementById('introMark');
  const left = document.getElementById('introLeft');
  const right = document.getElementById('introRight');
  const bar = document.getElementById('introBar');
  const tag = document.getElementById('introTag');

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      body.classList.remove('no-scroll');
      runReveal();
    }
  });

  tl.to([left, right], { opacity: 1, duration: 0.5, stagger: 0.05 })
    .to(bar, { width: '100%', duration: 1.4, ease: 'power2.inOut' }, 0.1)
    .to(tag, { opacity: 1, duration: 0.5 }, 0.15)
    .to(logoEl, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out' }, 0.35)
    .to([tag, left, right], { opacity: 0, duration: 0.3 }, '>+0.35')
    .to(logoEl, { opacity: 0, y: -30, scale: 0.96, duration: 0.45, ease: 'power3.in' }, '>-0.1')
    .to(curtain, { yPercent: -100, duration: 0.8, ease: 'expo.inOut', onStart(){ curtain.classList.add('is-out'); } }, '>-0.2');

  function runReveal() {
    const hero = document.querySelector('.hero');
    hero?.classList.add('is-loaded');

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 900px)').matches;

    /* ── Lenis smooth scroll ──────────────────────────────── */
    let lenis;
    if (window.Lenis && !prefersReduced) {
      lenis = new window.Lenis({ lerp: 0.15, smoothWheel: true, wheelMultiplier: 1, syncTouch: false, duration: 0.9 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // Global ScrollTrigger defaults — fire earlier, never choke
    ScrollTrigger.defaults({ toggleActions: 'play none none none' });

    /* ── Word-mask splitter ───────────────────────────────── */
    const splitWords = (el) => {
      if (el.dataset.split === '1') return;
      el.dataset.split = '1';
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      const textNodes = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);
      textNodes.forEach((node) => {
        const parent = node.parentNode;
        const words = node.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        words.forEach((w) => {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
          const mask = document.createElement('span');
          mask.className = 'w-mask';
          const inner = document.createElement('span');
          inner.className = 'w-inner';
          inner.textContent = w;
          mask.appendChild(inner);
          frag.appendChild(mask);
        });
        parent.replaceChild(frag, node);
      });
    };

    /* ── Hero: title word-mask + immediate reveals ────────── */
    document.querySelectorAll('.hero-title .line').forEach(splitWords);
    const heroMasks = document.querySelectorAll('.hero-title .w-mask');
    heroMasks.forEach((m, i) => setTimeout(() => m.classList.add('is-in'), 100 + i * 40));

    gsap.utils.toArray('.hero .reveal').forEach(el => {
      const d = parseInt(el.dataset.revealDelay || '0', 10) / 1000;
      gsap.fromTo(el, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.25 + d * 0.5, ease: 'power3.out' });
    });

    // hero product showcase removed

    /* ── Clear CSS reveal gate immediately (never trust ScrollTrigger alone) ── */
    gsap.set('.reveal, .reveal-up', { clearProps: 'opacity,transform' });

    /* ── Section headings + generic reveals: bulletproof scroll-based ── */
    const headingTargets = gsap.utils.toArray('.section .h-display, .section .h-medium');
    const headingQueue = [];
    headingTargets.forEach(h => {
      splitWords(h);
      h.style.opacity = '1';  // override .reveal-up { opacity: 0 }
      const masks = h.querySelectorAll('.w-mask');
      headingQueue.push({ el: h, masks, done: false });
    });

    const genericTargets = gsap.utils.toArray('.reveal-up').filter(el => !el.matches('.h-display, .h-medium'));
    const genericQueue = [];
    genericTargets.forEach(el => {
      gsap.set(el, { opacity: 0, y: 24 });
      genericQueue.push({ el, done: false });
    });

    const checkReveals = () => {
      const vh = window.innerHeight;
      const threshold = vh * 0.92;
      headingQueue.forEach(item => {
        if (item.done) return;
        const top = item.el.getBoundingClientRect().top;
        if (top < threshold) {
          item.done = true;
          item.masks.forEach((m, i) => {
            setTimeout(() => m.classList.add('is-in'), i * 30);
          });
        }
      });
      genericQueue.forEach(item => {
        if (item.done) return;
        const top = item.el.getBoundingClientRect().top;
        if (top < threshold) {
          item.done = true;
          gsap.to(item.el, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' });
        }
      });
    };
    checkReveals();
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => { checkReveals(); scrollTicking = false; });
    }, { passive: true });
    window.addEventListener('resize', checkReveals, { passive: true });

    /* ── Hero parallax ─────────────────────────────────────── */
    gsap.to('.hero-video', { yPercent: 16, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    /* ── Image parallax (app cards + blog) ────────────────── */
    gsap.utils.toArray('.app-card__img, .blog-media img').forEach(img => {
      gsap.fromTo(img, { yPercent: -8 }, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: img.closest('.app-card, .blog-card'), start: 'top bottom', end: 'bottom top', scrub: 0.6 }
      });
    });

    /* ── Testimonial image zoom on scroll ─────────────────── */
    gsap.utils.toArray('.testim-card').forEach(card => {
      const img = card.querySelector('.testim-img');
      if (!img) return;
      gsap.fromTo(img, { scale: 1.2 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
      });
    });

    /* ── Counters ─────────────────────────────────────────── */
    gsap.utils.toArray('[data-counter]').forEach(el => {
      const target = parseInt(el.dataset.counter, 10);
      const prefix = el.dataset.prefix || '';
      gsap.fromTo({ v: 0 }, { v: 0 }, {
        v: target, duration: 1.6, ease: 'power2.out',
        onUpdate() { el.textContent = prefix + Math.round(this.targets()[0].v).toLocaleString('pt-BR'); },
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });

    /* ── Proof stats: scale up on scrub ────────────────────── */
    const proof = document.querySelector('.section--proof');
    if (proof && isDesktop) {
      gsap.fromTo(proof.querySelectorAll('.proof-item'), { scale: 0.94, opacity: 0.5 }, {
        scale: 1, opacity: 1, ease: 'power2.out', stagger: 0.06,
        scrollTrigger: { trigger: proof, start: 'top 75%', end: 'top 25%', scrub: 0.6 }
      });
    }

    /* ── HORIZONTAL SCROLL: Applications (pin só nos cards) ──
       O título "Onde a Suljett opera" rola normal; só o bloco
       .apps-pin-target (cards + barra) é pinado enquanto os cards
       deslizam lateralmente. */
    const pinTarget = document.querySelector('.apps-pin-target');
    const hScroll = document.querySelector('[data-hscroll]');
    const hTrack = hScroll?.querySelector('[data-hscroll-track]');
    const hMeta = document.querySelector('.hscroll-meta');
    if (pinTarget && hScroll && hTrack && isDesktop && !prefersReduced) {
      const getDist = () => Math.max(0, hTrack.scrollWidth - window.innerWidth + 120);
      gsap.to(hTrack, {
        x: () => -getDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinTarget,
          start: 'top top',
          end: () => '+=' + (getDist() * 0.9),
          pin: pinTarget,
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (hMeta) hMeta.style.setProperty('--hsp', Math.round(self.progress * 100) + '%');
          }
        }
      });
    }

    /* ── Magnetic buttons ─────────────────────────────────── */
    if (!prefersReduced && matchMedia('(hover: hover)').matches) {
      document.querySelectorAll('.btn--cta, .btn--lg').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          const mx = e.clientX - r.left - r.width / 2;
          const my = e.clientY - r.top - r.height / 2;
          gsap.to(btn, { x: mx * 0.15, y: my * 0.2, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
      });
    }

    /* ── CIJ Modelos: carrossel (setas trocam slide + painel) ── */
    document.querySelectorAll('[data-model-carousel]').forEach((root) => {
      const slides = [...root.querySelectorAll('.ms-slide')];
      const specs = [...root.querySelectorAll('.ms-specs')];
      const panels = [...root.querySelectorAll('.ms-panel')];
      const counter = root.querySelector('.ms-counter b');
      const total = slides.length;
      let idx = 0;
      const go = (n) => {
        idx = (n + total) % total;
        [slides, specs, panels].forEach((group) =>
          group.forEach((el, i) => el.classList.toggle('is-active', i === idx)));
        if (counter) counter.textContent = String(idx + 1).padStart(2, '0');
      };
      root.querySelector('[data-prev]')?.addEventListener('click', () => go(idx - 1));
      root.querySelector('[data-next]')?.addEventListener('click', () => go(idx + 1));
      go(0);
    });

    // Final CTA gradient drift
    gsap.to('.section--final .h-display', {
      backgroundPosition: '200% 0', duration: 9, repeat: -1, ease: 'none'
    });

    /* ── Refresh ──────────────────────────────────────────── */
    window.addEventListener('load', () => ScrollTrigger.refresh());
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    // Also refresh after any async img loads (testim/hero)
    setTimeout(() => ScrollTrigger.refresh(), 500);
  }
})();
