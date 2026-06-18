// ============================================================
// Dados COMPARTILHADOS das páginas internas para o Eleventy.
//
// Concatena tokens.css + src/shared/css/*.css (ordem = prefixo numérico)
// e expõe como `shared.css`. O template site-css.njk grava isso em
// /assets/site.css. Substitui a parte do build.mjs que gerava o site.css.
// ============================================================
const fs = require("node:fs");
const path = require("node:path");

const TOKENS = path.join(__dirname, "..", "tokens", "tokens.css");
const SHARED = path.join(__dirname, "..", "shared", "css");

const concatCss = (dir) =>
  fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".css"))
    .sort()
    .map((f) => fs.readFileSync(path.join(dir, f), "utf8"))
    .join("");

module.exports = {
  css: fs.readFileSync(TOKENS, "utf8") + concatCss(SHARED),
};
