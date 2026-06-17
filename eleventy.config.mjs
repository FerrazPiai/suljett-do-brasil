// ============================================================
// SULJETT — configuração do Eleventy (11ty)
//
// FASE 1: páginas internas migradas para .njk com layout único (chrome).
// FASE 3: blog em Markdown (src/blog/posts/*.md), coleção "post",
//         listagem /blog/, feed.xml (RSS) e sitemap.xml.
// A home (index.html, gerada por build.mjs) segue como passthrough.
//
// Pipeline: `npm run build` → node build.mjs (home) && eleventy (resto)
// ============================================================
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  // HTML legado (home) e assets: copiados como estão.
  eleventyConfig.addPassthroughCopy("index.html");
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
