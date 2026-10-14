// ============================================================
// Dados da HOME para o Eleventy.
//
// Lê os módulos-fonte em src/home/ (CSS e JS) e os expõe
// como variáveis globais `home.*` para o layout src/_includes/home.njk.
//
// Substitui o antigo build.mjs: a home agora é montada pelo Eleventy
// (index.njk → layout home.njk), reusando o chrome único (header/footer
// em partials/). O CSS/JS continua INLINE, idêntico ao build anterior:
//   css  = tokens.css + concat(src/home/css/*.css)   (ordem = prefixo)
//   uiJs     = script inline exclusivo da home (o comum é assets/site.js)
// ============================================================
const fs = require("node:fs");
const path = require("node:path");

const HOME = path.join(__dirname, "..", "home");
const TOKENS = path.join(__dirname, "..", "tokens", "tokens.css");
// Camada visual v2 (header, mega-menu, cards de Soluções): a mesma das internas.
const SHARED_V2 = path.join(__dirname, "..", "shared", "css", "90-v2.css");

const read = (p) => fs.readFileSync(p, "utf8");

const concatCss = (dir) =>
  fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".css"))
    .sort()
    .map((f) => read(path.join(dir, f)))
    .join("");

module.exports = {
  css: read(TOKENS) + concatCss(path.join(HOME, "css")) + read(SHARED_V2),
  uiJs: read(path.join(HOME, "js", "ui.js")),
};
