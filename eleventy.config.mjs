// ============================================================
// SULJETT — configuração do Eleventy (11ty)
//
// FASE 1: páginas internas migradas para .njk com layout único (chrome).
// FASE 3: blog em Markdown (src/blog/posts/*.md), coleção "post",
//         listagem /blog/, feed.xml (RSS) e sitemap.xml.
// FASE 4: home migrada para o Eleventy (index.njk → layout home.njk),
//         reusando o chrome único. build.mjs eliminado: o CSS/JS da home
//         é injetado inline via src/_data/home.js e o assets/site.css das
//         internas é gerado por site-css.njk (dados em src/_data/shared.js).
//
// Pipeline: `npm run build` → eleventy (tudo).
// ============================================================
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  // Assets estáticos (fontes, imagens, vídeos, fichas.js, site.js, vendor):
  // copiados como estão. index.html e assets/site.css agora são GERADOS.
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());

  // ── Filtros de data (pt-BR) ──
  const toDate = (d) => (d instanceof Date ? d : new Date(d));
  eleventyConfig.addFilter("dateBR", (d) =>
    toDate(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("dateISO", (d) => toDate(d).toISOString());

  // ── Feed RSS do blog (gerado automaticamente) ──
  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: { name: "post", limit: 20 },
    metadata: {
      language: "pt-BR",
      title: "Blog — Suljett do Brasil",
      subtitle: "Codificação e marcação industrial Hitachi: CIJ, TIJ, TTO e insumos.",
      base: "https://suljett.com/",
      author: { name: "Suljett do Brasil", email: "contato@suljett.com" },
    },
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "src/_includes",
      data: "src/_data",
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
