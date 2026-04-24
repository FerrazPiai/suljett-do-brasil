/**
 * SULJETT — Splitting.js Init
 * Divide headings em spans por palavra/caractere para animação GSAP.
 * Deve ser carregado antes do gsap-init.js.
 */

import Splitting from 'splitting';
import 'splitting/dist/splitting.css';

export function initSplitting() {
  // Divide todos os elementos com data-splitting
  Splitting();

  // Wrapper de overflow para animações de slide
  document.querySelectorAll('[data-splitting] .word').forEach((word) => {
    word.style.overflow = 'hidden';
    word.style.display = 'inline-block';
  });
}

// Auto-init ao importar
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplitting);
  } else {
    initSplitting();
  }
}
