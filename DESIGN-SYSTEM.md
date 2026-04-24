# Suljett Design System — "PRECISION INDUSTRIAL"

> "A precisão de uma gota de tinta que nunca falha."

Stack: **Astro 4.x + Tailwind CSS 3.x + GSAP 3 + Lenis + React Islands**

---

## Identidade Visual

### Paleta de Cores

| Token | Hex | Uso |
|-------|-----|-----|
| `sj-red` | `#CC1A1A` | **CTAs e alertas apenas** — nunca fundo de seções |
| `sj-red-dark` | `#A01010` | Hover dos CTAs |
| `steel-950` | `#0A0F1A` | Background hero (Obsidian) |
| `steel-900` | `#111827` | Seções tech escuras |
| `steel-800` | `#1A2535` | Cards escuros |
| `steel-700` | `#243045` | Bordas dark mode |
| `steel-500` | `#4B6280` | Texto secundário escuro |
| `steel-300` | `#8DA0B8` | Texto terciário / labels |
| `steel-100` | `#E8EDF5` | Backgrounds claros |
| `steel-50` | `#F4F6FA` | Background padrão light |
| `ink-950` | `#080C12` | Títulos light mode |
| `ink-600` | `#374151` | Body text |
| `laser-red` | `#FF2020` | Neon — **apenas seção Laser** |

### Tipografia

| Família | Uso | Pesos |
|---------|-----|-------|
| **Manrope** | Display, títulos, navegação, CTAs | 400, 600, 700, 800 |
| **IBM Plex Mono** | **TODAS as specs técnicas** — sem exceções | 400, 500 |

#### Escala Tipográfica
```css
--text-hero:  clamp(3rem, 7vw, 6.5rem)   /* H1 hero */
--text-h1:    clamp(2rem, 4vw, 3.5rem)
--text-h2:    clamp(1.5rem, 3vw, 2.25rem)
--text-h3:    clamp(1.125rem, 2vw, 1.5rem)
--text-body:  1rem
--text-small: 0.875rem
--text-mono:  0.8125rem                   /* specs técnicas */
```

---

## Grid e Espaçamento

- **Sistema base:** 8px
- **Grid:** 12 colunas, gap 24px
- **Max-width container:** 1280px
- **Padding lateral mobile:** 20px
- **Padding lateral desktop:** 48px

### Padding de Seções
| Tipo | Desktop | Mobile |
|------|---------|--------|
| Padrão | 96px | 64px |
| Destaque | 128px | 64px |
| Hero | 100vh | 100svh |

---

## Tokens de Animação

| Nome | Cubic-bezier | GSAP | Uso |
|------|-------------|------|-----|
| `smooth` | `[0.25, 0.1, 0.25, 1]` | `power2.out` | Entrada padrão |
| `mechanical` | `[0.76, 0, 0.24, 1]` | `expo.out` | Alavanca mecânica |
| `snap` | `[0.87, 0, 0.13, 1]` | `power4.out` | Clique de máquina |
| `reveal` | `[0.16, 1, 0.3, 1]` | `expo.out` | Revelação de títulos |

### Durações
| Nome | Valor | Uso |
|------|-------|-----|
| `micro` | 0.15s | Hover states |
| `short` | 0.35s | Dropdown, componente |
| `medium` | 0.65s | Entrada de seção |
| `long` | 1.2s | Hero / cinematic |

**NUNCA usar:** `bounce`, `elastic`, `back.out` (com tensão > 1.2)

---

## Componentes UI

### Button

```astro
<Button variant="primary" size="lg" href="/contato">
  Solicitar Orçamento →
</Button>
```

Variantes: `primary` | `secondary` | `ghost` | `outline`
Tamanhos: `sm` | `md` | `lg`

**Regras inegociáveis:**
- `border-radius: 4px` (nunca pill)
- Hover: `translateY(-2px)` + sombra vermelha
- sj-red **somente** em `variant="primary"`

### Badge

```astro
<Badge variant="brand" dot>
  Distribuidor Oficial Hitachi
</Badge>
```

Variantes: `brand` | `tech` | `success` | `neutral`

### SpecCard

```astro
<SpecCard
  label="VELOCIDADE DE IMPRESSÃO"
  value="18.000"
  unit="impressões/hora"
  description="Produção contínua sem redução de velocidade"
/>
```

Label: **IBM Plex Mono** obrigatório. Valor: Manrope 800.

---

## Estrutura de Componentes

```
src/components/
├── layout/
│   ├── Header.astro       — Sticky glassmorphism
│   └── Footer.astro       — Completo com selos
├── home/
│   ├── Hero.astro          — Fullscreen, vídeo, GSAP timeline
│   ├── SocialProof.astro   — Contadores + logos carousel
│   ├── CIJShowcase.astro   — ★ Principal (scroll storytelling)
│   ├── HowItWorks.astro    — SVG animado + 4 etapas
│   ├── ApplicationsGrid.astro — 6 setores hover expandido
│   ├── OriginalVsParallel.astro — Educação de mercado
│   ├── ServicesStrip.astro — 4 pilares (fundo sj-red)
│   ├── LeadMagnet.tsx      — React Island (formulário)
│   ├── Testimonials.astro  — Embla + autoplay 4s
│   └── BlogPreview.astro   — Grid 3 colunas + stagger
└── ui/
    ├── Button.astro
    ├── Badge.astro
    └── SpecCard.astro
```

---

## Scripts

| Arquivo | Função |
|---------|--------|
| `lenis.js` | Smooth scroll + header scroll state |
| `gsap-init.js` | Todas as animações scroll-driven |
| `splitting-init.js` | Text splitting para animação palavra-a-palavra |
| `animation-tokens.js` | Constantes de animação (eases, durations, stagger) |

---

## Regras Inegociáveis (10 mandamentos)

1. **sj-red `#CC1A1A` SOMENTE em CTAs e alertas críticos** — nunca fundo de seções
2. **TODA spec técnica usa IBM Plex Mono** — sem exceções
3. **Nenhum popup** que bloqueie a experiência do usuário
4. **Botões primários:** `border-radius: 4px`, hover `translateY(-2px)` + sombra
5. **Logo sempre flat** nos fundos escuros
6. **Animações MECÂNICAS:** ease expo/snap — nunca bounce/elastic
7. **Seções escuras** (steel-900+) = tecnologia. **Seções claras** = leitura
8. **Grid 12 colunas, 8px base, max-width 1280px** sempre respeitado
9. **Mobile-first:** ScrollTrigger pesado desabilitado em < 768px via matchMedia
10. **Vídeos:** sempre `autoplay muted loop playsinline preload="metadata"`

---

## Bibliotecas Externas

| Lib | Versão | Função |
|-----|--------|--------|
| `@studio-freight/lenis` | ^1.0 | Smooth scroll cinema-grade |
| `gsap` + `ScrollTrigger` | ^3.12 | Animações scroll-driven |
| `splitting` | ^1.0 | Animação texto por palavra/char |
| `embla-carousel` | ^8.3 | Carousel touch-friendly |
| `@tsparticles/*` | ^3.7 | Partículas "poeira industrial" |
| `react-hook-form` | ^7.53 | Formulário lead magnet |
| `zod` | ^3.23 | Validação do formulário |

---

## SEO Técnico

### Schema.org
- `Organization` no BaseLayout (global)
- `Product` no ProductLayout (páginas de produto)
- `BlogPosting` nos posts de blog

### Core Web Vitals — Metas
| Métrica | Meta | Como |
|---------|------|------|
| LCP | < 1.5s | Astro estático + AVIF |
| FID | < 50ms | Zero JS desnecessário |
| CLS | < 0.05 | Dimensões explícitas nas imgs |
| PageSpeed mobile | > 90 | |
| PageSpeed desktop | > 98 | |

---

## Instalação e Desenvolvimento

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```
