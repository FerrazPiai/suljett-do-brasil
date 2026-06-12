/* =============================================================
   SULJETT DO BRASIL — FICHAS TÉCNICAS · mapa produto → arquivo
   Fonte única da verdade para o download de fichas técnicas.

   COMO FUNCIONA
   - Cada chave do MAPA é o value do <option> do select de modelo
     (atributo [data-ficha-key] nos formulários).
   - O valor pode ser:
       a) caminho local  → 'assets/fichas/ux2-d160w.pdf'  (recomendado)
       b) URL externa    → 'https://drive.google.com/file/d/<ID>/view'
   - No submit do formulário de download, o site resolve a chave
     e abre a ficha numa nova aba.

   COMO TROCAR O PLACEHOLDER PELA FICHA REAL
   1. salve o PDF oficial em assets/fichas/ (ex.: ux2-d160w.pdf)
   2. troque o valor da chave correspondente abaixo
   ============================================================= */
(() => {
  const PLACEHOLDER = 'assets/fichas/ficha-tecnica-placeholder.pdf';

  const MAPA = {
    /* CIJ Hitachi — fichas técnicas por modelo */
    'ux2-d160w':  PLACEHOLDER,
    'ux-d110w':   PLACEHOLDER,
    'ux-d140w':   PLACEHOLDER,
    'ux-d150w':   PLACEHOLDER,
    'ux-p160wp':  PLACEHOLDER,
    'ux-b160w':   PLACEHOLDER,
    'ux-b160wg':  PLACEHOLDER,
    /* Comparativo da linha completa */
    'all':        PLACEHOLDER,
  };

  /* normaliza "UX2-D160W " → "ux2-d160w" para casar texto de option sem value */
  const norm = (s) => (s || '').trim().toLowerCase();

  const resolver = (chave) => MAPA[norm(chave)] || MAPA['all'];

  const abrir = (chave) => {
    const url = resolver(chave);
    window.open(url, '_blank', 'noopener');
    return url;
  };

  /* liga qualquer form de download que tenha um campo [data-ficha-key].
     Roda após os handlers de UI (is-success) — não interfere neles. */
  const ligar = () => {
    document.querySelectorAll('form').forEach((form) => {
      const campo = form.querySelector('[data-ficha-key]');
      if (!campo) return;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) return;
        abrir(campo.value || campo.options?.[campo.selectedIndex]?.text);
      });
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ligar);
  else ligar();

  window.SJ_FICHAS = { MAPA, resolver, abrir };
})();
