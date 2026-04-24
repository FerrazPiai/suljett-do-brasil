/**
 * SULJETT — Lenis Smooth Scroll
 * Cinema-grade scroll para experiência aveludada.
 * Conectado ao GSAP Ticker para sincronia perfeita com ScrollTrigger.
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease expo
  smoothWheel: true,
  smoothTouch: false, // Touch nativo é melhor no mobile
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

// Conecta Lenis ao GSAP Ticker — sincronia frame-perfect
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Zero lag smoothing para animações precisas
gsap.ticker.lagSmoothing(0);

// Mantém ScrollTrigger atualizado com posição real do Lenis
lenis.on('scroll', ScrollTrigger.update);

// Header scroll behavior
let header = null;
let lastScrollY = 0;

lenis.on('scroll', ({ scroll }) => {
  if (!header) {
    header = document.querySelector('.site-header');
  }

  if (!header) return;

  if (scroll > 80) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }

  lastScrollY = scroll;
});

// Expõe globalmente para outros scripts usarem
window.__lenis = lenis;

export default lenis;
