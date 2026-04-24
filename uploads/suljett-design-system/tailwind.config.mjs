/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // ─── Core Brand ───────────────────────────────────────────
        'sj-red':      '#CC1A1A',  // CTAs, alertas, destaques — USO EXCLUSIVO
        'sj-red-dark': '#A01010',  // Hover dos CTAs

        // ─── Steel Palette (substitui cinza genérico) ─────────────
        'steel-950': '#0A0F1A',  // Background hero escuro (Obsidian)
        'steel-900': '#111827',  // Seções tech escuras
        'steel-800': '#1A2535',  // Cards escuros
        'steel-700': '#243045',  // Bordas no dark mode
        'steel-500': '#4B6280',  // Texto secundário no escuro
        'steel-300': '#8DA0B8',  // Texto terciário / labels
        'steel-100': '#E8EDF5',  // Backgrounds claros (seções de leitura)
        'steel-50':  '#F4F6FA',  // Background padrão light

        // ─── Neutros ──────────────────────────────────────────────
        'ink-950':    '#080C12',  // Títulos no light mode
        'ink-600':    '#374151',  // Body text
        'pure-white': '#FFFFFF',

        // ─── Acento Técnico (laser only) ──────────────────────────
        'laser-red':  '#FF2020',               // Neon — apenas seção Laser
        'laser-glow': 'rgba(255,32,32,0.15)',  // Box-shadow / glow
      },

      fontFamily: {
        display: ['Manrope', 'sans-serif'],   // Títulos, navegação, CTAs
        mono:    ['IBM Plex Mono', 'monospace'], // Specs técnicas — OBRIGATÓRIO
      },

      fontSize: {
        'hero': ['clamp(3rem, 7vw, 6.5rem)', { lineHeight: '1.05', fontWeight: '800' }],
        'h1':   ['clamp(2rem, 4vw, 3.5rem)',  { lineHeight: '1.1',  fontWeight: '700' }],
        'h2':   ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'h3':   ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['1rem',       { lineHeight: '1.6' }],
        'sm':   ['0.875rem',   { lineHeight: '1.5' }],
        'mono-spec': ['0.8125rem', { lineHeight: '1.4', fontWeight: '500' }],
      },

      spacing: {
        // Sistema base 8px
        '1':  '8px',
        '2':  '16px',
        '3':  '24px',
        '4':  '32px',
        '5':  '40px',
        '6':  '48px',
        '8':  '64px',
        '10': '80px',
        '12': '96px',
        '16': '128px',
        '20': '160px',
      },

      maxWidth: {
        'container': '1280px',
      },

      borderRadius: {
        'btn': '4px',  // Botões: levemente arredondados, nunca pill
      },

      boxShadow: {
        'red-sm':  '0 4px 14px rgba(204, 26, 26, 0.3)',
        'red-md':  '0 8px 24px rgba(204, 26, 26, 0.4)',
        'laser':   '0 0 20px rgba(255, 32, 32, 0.5)',
        'card':    '0 2px 16px rgba(10, 15, 26, 0.12)',
        'card-dark': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },

      transitionTimingFunction: {
        'mechanical': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'snap':       'cubic-bezier(0.87, 0, 0.13, 1)',
        'reveal':     'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth':     'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },

      transitionDuration: {
        'micro':  '150ms',
        'short':  '350ms',
        'medium': '650ms',
        'long':   '1200ms',
      },

      animation: {
        'scroll-down': 'scrollDown 1.5s ease-in-out infinite',
        'fade-in':     'fadeIn 0.65s ease-out forwards',
        'slide-up':    'slideUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'counter':     'counter 2s ease-out forwards',
      },

      keyframes: {
        scrollDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%':      { transform: 'translateY(8px)', opacity: '0.4' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },

      backdropBlur: {
        'glass': '20px',
      },

      // Grid 12 colunas — 1280px max
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
