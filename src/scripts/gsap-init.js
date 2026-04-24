/**
 * SULJETT — GSAP + ScrollTrigger Init
 * Todas as animações scroll-driven da home.
 * Princípio: MECÂNICO. ease expo, snap — nunca bounce ou elastic.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Configuração Global ─────────────────────────────────────
gsap.defaults({
  ease: 'power2.out',
  duration: 0.65,
});

// matchMedia para desabilitar animações pesadas em mobile
const mm = gsap.matchMedia();

// ─── Hero Timeline ───────────────────────────────────────────
function initHeroAnimations() {
  const heroTL = gsap.timeline({ delay: 0.3, paused: false });

  heroTL
    .from('.hero-badge', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out',
    })
    .from(
      '[data-splitting] .word',
      {
        opacity: 0,
        y: 60,
        stagger: 0.08,
        duration: 0.9,
        ease: 'expo.out',
      },
      '-=0.2'
    )
    .from(
      '.hero-subtitle',
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.4'
    )
    .from(
      '.hero-ctas',
      {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=0.3'
    )
    .from(
      '.hero-specs span',
      {
        opacity: 0,
        x: -20,
        stagger: 0.15,
        duration: 0.4,
        ease: 'power2.out',
      },
      '-=0.2'
    )
    .from(
      '.scroll-indicator',
      {
        opacity: 0,
        duration: 0.4,
      },
      '-=0.2'
    );
}

// ─── Hero Video Parallax ─────────────────────────────────────
function initHeroParallax() {
  gsap.to('.hero-video', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

// ─── Social Proof Counters ───────────────────────────────────
function initCounters() {
  document.querySelectorAll('[data-counter]').forEach((el) => {
    const target = parseInt(el.dataset.counter, 10);
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate() {
        el.textContent = Math.round(obj.val).toLocaleString('pt-BR');
      },
    });
  });
}

// ─── CIJ Showcase — Scroll Storytelling ─────────────────────
function initCIJShowcase() {
  // Pin da imagem do produto enquanto specs se revelam
  ScrollTrigger.create({
    trigger: '.cij-showcase',
    start: 'top top',
    end: '+=200vh',
    pin: '.cij-product-visual',
    pinSpacing: false,
  });

  // Rotação do produto ao scroll
  const cijTL = gsap.timeline({
    scrollTrigger: {
      trigger: '.cij-showcase',
      start: 'top top',
      end: '+=250%',
      pin: '.cij-product-img',
      scrub: 1,
    },
  });

  cijTL
    .from('.cij-product-img', { rotationY: -15, scale: 0.95, duration: 1 })
    .to('.cij-product-img', { rotationY: 25, scale: 1.05, duration: 1 })
    .to('.cij-product-img', { rotationY: -10, scale: 1, duration: 1 });

  // Specs aparecem uma a uma
  gsap.utils.toArray('.spec-item').forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      x: 40,
      scrollTrigger: {
        trigger: item,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      duration: 0.5,
      delay: i * 0.08,
      ease: 'power2.out',
    });
  });

  // Grade de modelos — stagger de baixo para cima
  gsap.utils.toArray('.model-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      duration: 0.5,
      delay: i * 0.1,
      ease: 'power2.out',
    });
  });
}

// ─── How It Works — SVG Stroke ───────────────────────────────
function initHowItWorks() {
  gsap.from('.process-line', {
    strokeDashoffset: 1000,
    ease: 'none',
    scrollTrigger: {
      trigger: '.how-it-works',
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 1,
    },
  });

  // Ícones das etapas
  gsap.utils.toArray('.process-step').forEach((step, i) => {
    gsap.from(step, {
      opacity: 0,
      scale: 0.8,
      scrollTrigger: {
        trigger: step,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      duration: 0.5,
      delay: i * 0.15,
      ease: 'back.out(1.2)',
    });
  });
}

// ─── Original vs Paralelo — Entrada das colunas ──────────────
function initCompetitorSection() {
  gsap.from('.original-col', {
    opacity: 0,
    x: -80,
    scrollTrigger: {
      trigger: '.competitor-section',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
    duration: 0.7,
    ease: 'cubic-bezier(0.76, 0, 0.24, 1)', // ease mechanical
  });

  gsap.from('.parallel-col', {
    opacity: 0,
    x: 80,
    scrollTrigger: {
      trigger: '.competitor-section',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
    duration: 0.7,
    ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
  });
}

// ─── Blog Preview — Fade Stagger ─────────────────────────────
function initBlogPreview() {
  gsap.utils.toArray('.blog-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      duration: 0.5,
      delay: i * 0.1,
      ease: 'power2.out',
    });
  });
}

// ─── Seções Genéricas — Fade ao entrar no viewport ───────────
function initSectionReveal() {
  gsap.utils.toArray('.reveal-section').forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 30,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      duration: 0.65,
      ease: 'power2.out',
    });
  });
}

// ─── Inicialização ────────────────────────────────────────────
export function initAllAnimations() {
  // Desktop: animações completas
  mm.add('(min-width: 768px)', () => {
    initHeroParallax();
    initCIJShowcase();
    initHowItWorks();
    initCompetitorSection();

    return () => {
      // Cleanup ao sair do breakpoint
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  });

  // Todas as telas
  initHeroAnimations();
  initCounters();
  initBlogPreview();
  initSectionReveal();
}
