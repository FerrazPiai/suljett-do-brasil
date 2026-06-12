// ============================================================
// SULJETT — build do site
//
// Gera os artefatos finais a partir dos módulos em src/:
//   src/home/layout.html      esqueleto da home (head + ordem das seções)
//   src/home/css/*.css        CSS da home, um arquivo por bloco (ordem = prefixo numérico)
//   src/home/sections/*.html  um arquivo por seção da home
//   src/home/js/*.js          scripts inline da home
//   src/shared/css/*.css      CSS compartilhado das páginas internas
//
// Saídas:
//   index.html        (home montada, CSS/JS inline como antes)
//   assets/site.css   (concatenação de src/shared/css/*)
//
// As páginas internas (empresa.html, contato.html, …) são editadas
// direto na raiz — são enxutas e usam assets/site.css + assets/site.js.
//
// Uso:
//   node build.mjs            gera os artefatos
//   node build.mjs --watch    regenera a cada alteração em src/
//
// Zero dependências — só Node (>= 18).
// ============================================================
import { readFileSync, writeFileSync, readdirSync, watch } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, 'src');
const HOME = join(SRC, 'home');

const BANNER =
  '<!--\n' +
  '  ⚠ ARQUIVO GERADO AUTOMATICAMENTE — NÃO EDITE DIRETAMENTE.\n' +
  '  Edite os módulos em src/home/ (sections, css, js, layout.html)\n' +
  '  e rode:  node build.mjs   (ou node build.mjs --watch)\n' +
  '-->\n';

const concatCss = (dir) =>
  readdirSync(dir)
    .filter((f) => f.endsWith('.css'))
    .sort()
    .map((f) => readFileSync(join(dir, f), 'utf8'))
    .join('');

function build({ banner = true } = {}) {
  // ── home: index.html ──
  const layout = readFileSync(join(HOME, 'layout.html'), 'utf8');
  let out = layout
    .replace(/^[ \t]*<!-- build:css -->\r?\n/m, () => concatCss(join(HOME, 'css')))
    .replace(/^[ \t]*<!-- build:section (\S+) -->\r?\n/gm, (_, name) =>
      readFileSync(join(HOME, 'sections', name), 'utf8')
    )
    .replace(/^[ \t]*<!-- build:js (\S+) -->\r?\n/gm, (_, name) =>
      readFileSync(join(HOME, 'js', name), 'utf8')
    );

  const missing = out.match(/<!-- build:[^>]+-->/g);
  if (missing) throw new Error('Placeholders não resolvidos: ' + missing.join(', '));

  if (banner) out = out.replace(/^(<!doctype html>\r?\n)/i, (m) => m + BANNER);
  writeFileSync(join(ROOT, 'index.html'), out);

  // ── páginas internas: assets/site.css ──
  const siteCss = concatCss(join(SRC, 'shared', 'css'));
  writeFileSync(join(ROOT, 'assets', 'site.css'), siteCss);

  console.log(
    `[build] index.html (${out.length.toLocaleString('pt-BR')} B) + assets/site.css (${siteCss.length.toLocaleString('pt-BR')} B) — ${new Date().toLocaleTimeString('pt-BR')}`
  );
}

build({ banner: !process.argv.includes('--no-banner') });

if (process.argv.includes('--watch')) {
  console.log('[watch] observando src/ — Ctrl+C para sair');
  let timer = null;
  for (const dir of [HOME, join(HOME, 'css'), join(HOME, 'sections'), join(HOME, 'js'), join(SRC, 'shared', 'css')]) {
    watch(dir, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        try { build(); } catch (e) { console.error('[build] erro:', e.message); }
      }, 80);
    });
  }
}
