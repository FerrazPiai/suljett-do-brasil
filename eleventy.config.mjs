// ============================================================
// SULJETT: configuração do Eleventy (11ty)
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
  eleventyConfig.addPassthroughCopy("favicon.ico");

  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());

  // src/home e src/shared estão no .eleventyignore (não são templates), mas
  // src/_data/{home,shared}.js lê os CSS/JS de lá em tempo de build. Sem estes
  // watch targets, editar um .css não dispara rebuild no `--serve`.
  eleventyConfig.addWatchTarget("src/home/");
  eleventyConfig.addWatchTarget("src/shared/");
  eleventyConfig.addWatchTarget("src/tokens/");

  // ── Filtros de data (pt-BR) ──
  const toDate = (d) => (d instanceof Date ? d : new Date(d));
  eleventyConfig.addFilter("dateBR", (d) =>
    toDate(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("dateISO", (d) => toDate(d).toISOString());

  // ── Ajustes no HTML final ──
  // 1. Tabelas .tbl: cada <td> recebe data-label com o título da coluna, para
  //    no celular a tabela comparativa virar cards empilhados (sem corte).
  // 2. Nome de modelo (UX-D110W, SJ-T8300, LM-C301...) não quebra no hífen.
  const MODEL = /\b((?:UX2?|SJ|LM)-[A-Z]?\d{2,4}[A-Z]{0,3})\b/g;
  eleventyConfig.addTransform("html-ajustes", function (html) {
    if (!(this.page.outputPath || "").endsWith(".html")) return html;
    html = html.replace(/<table class="tbl">([\s\S]*?)<\/table>/g, (all, inner) => {
      const labels = [...(inner.match(/<thead>[\s\S]*?<\/thead>/) || [""])[0].matchAll(/<th>([\s\S]*?)<\/th>/g)]
        .map((m) => m[1].replace(/<[^>]+>/g, "").replace(/"/g, "&quot;"));
      const body = inner.replace(/<tr([^>]*)>([\s\S]*?)<\/tr>/g, (row, attrs, cells) => {
        let i = 0;
        return `<tr${attrs}>` + cells.replace(/<td>/g, () => `<td data-label="${labels[i++] || ""}">`) + "</tr>";
      });
      return `<table class="tbl${labels.length <= 2 ? " tbl--2" : ""}">${body}</table>`;
    });
    // Só nos textos do <body>; pula script, style, option, textarea e o que
    // já está dentro de .nw.
    const start = html.indexOf("<body");
    if (start < 0) return html;
    let skip = 0;
    const body = html.slice(start).replace(/(<[^>]+>)|([^<]+)/g, (m, tag, text) => {
      if (tag) {
        const t = tag.match(/^<(\/?)(script|style|option|textarea|title)\b/i);
        if (t) skip += t[1] ? -1 : 1;
        return tag;
      }
      return skip > 0 ? text : text.replace(MODEL, '<span class="nw">$1</span>');
    });
    return html.slice(0, start) + body.replace(/<span class="nw"><span class="nw">([^<]*)<\/span><\/span>/g, '<span class="nw">$1</span>');
  });

  // ── Feed RSS do blog (gerado automaticamente) ──
  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: { name: "post", limit: 20 },
    metadata: {
      language: "pt-BR",
      title: "Blog | Suljett do Brasil",
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
