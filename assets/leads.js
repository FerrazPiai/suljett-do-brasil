/* =============================================================
   SULJETT · LEADS E MEDIÇÃO (todas as páginas)

   Formulários: todo <form data-lead="contato|ficha|fispq"> é enviado de
   verdade para o endpoint em <body data-lead-endpoint> (site.json →
   leadEndpoint). Sucesso só aparece depois da resposta do servidor, com
   protocolo. Se falhar, a tela avisa e oferece o WhatsApp.

   Fichas: <body data-fichas> lista os PDFs presentes em assets/fichas/
   (gerado no build). Sem PDF para o modelo, o pedido vira lead e a
   equipe envia a ficha por e-mail. Nunca abre arquivo provisório.

   Medição: eventos no window.dataLayer (lido pelo GTM, se configurado):
   whatsapp_click · contact_click · form_submit · ficha_download ·
   product_view. A origem da campanha (utm_*, gclid, referrer) é guardada
   na primeira página da sessão e vai junto com cada lead.
   ============================================================= */
(() => {
  const body = document.body;
  const ENDPOINT = body.dataset.leadEndpoint;
  const FICHAS = (body.dataset.fichas || '').split(',').filter(Boolean);
  const WHATS = 'https://wa.me/5551980370198';

  const dataLayer = (window.dataLayer = window.dataLayer || []);
  const track = (event, data) => dataLayer.push({ event, ...data });

  /* ─── Origem da campanha (first touch da sessão) ─────────── */
  let origem = null;
  try { origem = JSON.parse(sessionStorage.getItem('sj-origem')); } catch (e) {}
  if (!origem) {
    const q = new URLSearchParams(location.search);
    origem = { landing: location.pathname, referrer: document.referrer || '(direto)' };
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid']
      .forEach((k) => { if (q.get(k)) origem[k] = q.get(k); });
    try { sessionStorage.setItem('sj-origem', JSON.stringify(origem)); } catch (e) {}
  }

  /* ─── Cliques de contato ─────────────────────────────────── */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    const label = a.textContent.trim().slice(0, 80);
    if (href.startsWith('https://wa.me')) track('whatsapp_click', { label, page: location.pathname });
    else if (/^(tel:|mailto:)|contato\.html/.test(href)) track('contact_click', { label, href, page: location.pathname });
    else if (a.hasAttribute('data-ficha-link')) track('ficha_download', { modelo: a.dataset.fichaLink });
  });

  if (body.dataset.product) track('product_view', { produto: body.dataset.product });

  /* ─── Formulários ────────────────────────────────────────── */
  const protocolo = () => {
    const d = new Date();
    const ymd = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    return `SJ-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  };

  const mensagem = (tipo, prot, ficha) => {
    const p = `<span class="form-prot">Protocolo <b>${prot}</b></span>`;
    if (tipo === 'contato') return `${p}<strong>Recebemos a sua mensagem.</strong> Um especialista Suljett responde em até 4h úteis. Se precisar falar antes, cite o protocolo.`;
    if (tipo === 'fispq') return `${p}<strong>Pedido registrado.</strong> A equipe técnica envia a FISPQ do insumo para o seu e-mail corporativo.`;
    if (ficha && FICHAS.includes(ficha)) return `${p}<strong>Pronto.</strong> <a class="form-file" href="/assets/fichas/${ficha}.pdf" target="_blank" rel="noopener" data-ficha-link="${ficha}">Abrir a ficha técnica (PDF)</a>`;
    return `${p}<strong>Pedido registrado.</strong> A equipe técnica envia a ficha técnica oficial Hitachi para o seu e-mail corporativo.`;
  };

  document.querySelectorAll('form[data-lead]').forEach((form) => {
    const btn = form.querySelector('[type=submit]');
    const ok = form.querySelector('.form-success, .lead-success');
    const err = document.createElement('p');
    err.className = 'form-error';
    err.setAttribute('role', 'alert');
    err.innerHTML = `Não conseguimos enviar agora. Tente de novo em instantes ou fale com a gente pelo <a href="${WHATS}" target="_blank" rel="noopener">WhatsApp (51) 98037-0198</a>.`;
    ok?.setAttribute('aria-live', 'polite');
    ok?.before(err);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (form.classList.contains('is-sending')) return;

      const tipo = form.dataset.lead;
      const prot = protocolo();
      const ficha = form.querySelector('[data-ficha-key]')?.value;
      const label = btn.innerHTML;
      form.classList.remove('is-error');
      form.classList.add('is-sending');
      btn.disabled = true;
      btn.textContent = 'Enviando…';

      try {
        const r = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            ...Object.fromEntries(new FormData(form)),
            protocolo: prot,
            formulario: tipo,
            pagina: location.pathname,
            ...origem,
            _subject: `[Site Suljett] ${tipo} · ${prot}`,
            _template: 'table',
            _captcha: 'false',
            _autoresponse: `Recebemos o seu contato. Protocolo ${prot}. A equipe Suljett responde em até 4 horas úteis.`,
          }),
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok || String(j.success) === 'false') throw new Error(j.message || r.status);
      } catch (x) {
        form.classList.remove('is-sending');
        form.classList.add('is-error');
        btn.disabled = false;
        btn.innerHTML = label;
        return;
      }

      track('form_submit', { form: tipo, protocolo: prot, page: location.pathname, ...origem });
      if (ok) ok.innerHTML = mensagem(tipo, prot, ficha);
      form.classList.remove('is-sending');
      form.classList.add('is-success');
      btn.textContent = 'Enviado ✓';
    });
  });
})();
