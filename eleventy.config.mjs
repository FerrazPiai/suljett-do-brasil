// ============================================================
// SULJETT — configuração do Eleventy (11ty)
//
// FASE 1 (em andamento): migração incremental para layout único.
//   • Páginas MIGRADAS = `*.njk` na raiz (frontmatter + conteúdo), que usam
//     o layout src/_includes/base.njk → chrome (header/footer) renderizado
//     no BUILD a partir de uma FONTE ÚNICA (src/_includes/partials/).
//     `permalink` preserva a URL .html (ex.: /empresa.html).
//   • Páginas AINDA NÃO migradas + a home (index.html, gerada por build.mjs)
//     continuam como HTML estático e são servidas via passthrough copy.
//   • assets/site.js detecta o chrome já presente e não o reinjeta.
//
// Pipeline: `npm run build` → node build.mjs (home) && eleventy (internas+empacote)
// ============================================================
export default function (eleventyConfig) {
  // HTML legado (home + internas ainda não migradas) e assets: copiados como estão.
  eleventyConfig.addPassthroughCopy("*.html");
  eleventyConfig.addPassthroughCopy("assets");

  // Ano corrente para o rodapé (avaliado no build).
  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "src/_includes",
      data: "src/_data",
    },
    // Processa apenas os templates da migração (.njk) e Markdown (blog, fase 3).
    // O HTML legado é entregue via passthrough acima (não reprocessado).
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
