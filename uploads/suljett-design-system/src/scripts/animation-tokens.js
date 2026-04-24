/**
 * SULJETT — Animation Tokens
 * Princípio: MECÂNICO, não fofo.
 * Ease expo, snap — NUNCA bounce ou elastic.
 *
 * Use estes tokens em GSAP e CSS transitions para consistência total.
 */

export const ANIMATION = {
  ease: {
    smooth:     [0.25, 0.1, 0.25, 1],    // Entrada padrão (CSS ease)
    mechanical: [0.76, 0, 0.24, 1],      // Ease out expo — parece alavanca
    snap:       [0.87, 0, 0.13, 1],      // Snap rígido — clique de máquina
    reveal:     [0.16, 1, 0.3, 1],       // Revelação suave (títulos)
  },

  // Valores GSAP (string)
  gsap: {
    smooth:     'power2.out',
    mechanical: 'expo.out',
    snap:       'power4.out',
    reveal:     'expo.out',
    hero:       'expo.out',
  },

  duration: {
    micro:  0.15,   // Hover states, micro-interações
    short:  0.35,   // Transições de componente, dropdown
    medium: 0.65,   // Entrada de seção
    long:   1.2,    // Hero / scroll cinematic
    counter: 2.0,   // Contadores Social Proof
  },

  stagger: {
    words:    0.08,  // Splitting.js — palavras do hero
    chars:    0.03,  // Splitting.js — caracteres individuais
    cards:    0.10,  // Grade de cards (models, blog)
    specs:    0.08,  // Spec items na CIJ showcase
    partners: 0.05,  // Logos no carousel
  },

  delay: {
    hero:    0.3,    // Delay inicial da página
    section: 0.15,   // Delay após entrar no viewport
  },

  // Regras inegociáveis
  forbidden: [
    'bounce',
    'elastic',
    'back',    // back.out pode ser usado com tensão MUITO baixa (max 1.2)
  ],
};

/**
 * Converte array cubic-bezier para string CSS
 * @param {number[]} bezier - Array [x1, y1, x2, y2]
 * @returns {string} CSS cubic-bezier()
 */
export function toCSSEase(bezier) {
  return `cubic-bezier(${bezier.join(', ')})`;
}

/**
 * Cria ScrollTrigger defaults para seções padrão
 */
export function getSectionTrigger(trigger, options = {}) {
  return {
    trigger,
    start: 'top 80%',
    toggleActions: 'play none none reverse',
    ...options,
  };
}

/**
 * Anima uma seção completa com fade + slide up
 * @param {string|Element} target - Seletor ou elemento
 * @param {import('gsap').GSAPTweenVars} vars - Vars extras
 */
export function animateSectionEntry(target, vars = {}) {
  const { gsap, ScrollTrigger } = window.__gsap ?? {};
  if (!gsap) return;

  gsap.from(target, {
    opacity: 0,
    y: 30,
    duration: ANIMATION.duration.medium,
    ease: ANIMATION.gsap.smooth,
    scrollTrigger: getSectionTrigger(target),
    ...vars,
  });
}
