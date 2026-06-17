// ============================================================
// SULJETT — configuração do Eleventy (11ty)
//
// FASE 0 (andaime, não-destrutivo): o site continua sendo gerado
// pelo build.mjs (home + assets/site.css). O Eleventy apenas EMPACOTA
// os artefatos finais em _site/ via passthrough copy — sem reprocessar
// HTML como template. Saída idêntica ao site atual.
//
// Pipeline: `npm run build`  →  node build.mjs  &&  eleventy
//   1. build.mjs gera index.html + assets/site.css (como sempre)
//   2. eleventy copia *.html + assets/ para _site/
//
// Próximas fases habilitarão Nunjucks/Markdown (layouts, chrome único,
// blog) trocando templateFormats e movendo conteúdo para o pipeline 11ty.
// ============================================================
export default function (eleventyConfig) {
  // Copia os artefatos já gerados, sem processá-los como templates.
  eleventyConfig.addPassthroughCopy("*.html");
  eleventyConfig.addPassthroughCopy("assets");

  return {
    dir: {
      input: ".",
      output: "_site",
    },
    // Fase 0: nada é tratado como template — apenas passthrough copy.
    templateFormats: [],
  };
}
