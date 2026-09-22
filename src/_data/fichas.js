// Fichas técnicas disponíveis = PDFs em assets/fichas/ (nome = chave do modelo,
// ex.: ux2-d160w.pdf, comparativo.pdf). O layout expõe a lista em
// <body data-fichas>; o assets/leads.js só oferece download do que existe.
// Para publicar uma ficha: salvar o PDF oficial com o nome da chave e rebuildar.
const fs = require("node:fs");
const path = require("node:path");

const dir = path.join(__dirname, "..", "..", "assets", "fichas");

module.exports = fs.existsSync(dir)
  ? fs.readdirSync(dir).filter((f) => f.endsWith(".pdf")).map((f) => f.slice(0, -4))
  : [];
