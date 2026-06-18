// ============================================================
// Dados da HOME para o Eleventy.
//
// Lê os módulos-fonte em src/home/ (CSS, JS e seções) e os expõe
// como variáveis globais `home.*` para o layout src/_includes/home.njk.
//
// Substitui o antigo build.mjs: a home agora é montada pelo Eleventy
// (index.njk → layout home.njk), reusando o chrome único (header/footer
// em partials/). O CSS/JS continua INLINE, idêntico ao build anterior:
//   css  = tokens.css + concat(src/home/css/*.css)   (ordem = prefixo)
//   animJs / uiJs = scripts inline da home (dois <script>, como antes)
//   intro = src/home/sections/00-intro-curtain.html
//   sections = concat das seções de conteúdo (02..10) — header (01) e
//              footer (11) viram partials.
// ============================================================
const fs = require("node:fs");
const path = require("node:path");

const HOME = path.join(__dirname, "..", "home");
const TOKENS = path.join(__dirname, "..", "tokens", "tokens.css");

const read = (p) => fs.readFileSync(p, "utf8");

const concatCss = (dir) =>
  fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".css"))
    .sort()
    .map((f) => read(path.join(dir, f)))
    .join("");

const sectionsDir = path.join(HOME, "sections");
const sections = fs
  .readdirSync(sectionsDir)
  .filter((f) => f.endsWith(".html"))
  .sort()
  // 00 = intro (separado), 01 = header e 11 = footer agora vêm das partials.
  .filter((f) => !/^(00|01|11)-/.test(f))
  .map((f) => read(path.join(sectionsDir, f)))
  .join("\n");

module.exports = {
  css: read(TOKENS) + concatCss(path.join(HOME, "css")),
  animJs: read(path.join(HOME, "js", "animations.js")),
  uiJs: read(path.join(HOME, "js", "ui.js")),
  intro: read(path.join(sectionsDir, "00-intro-curtain.html")),
  sections,
};
