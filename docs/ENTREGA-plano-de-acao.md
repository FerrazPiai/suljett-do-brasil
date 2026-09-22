# Suljett · Entrega do Plano de Ação (Relatório Gerencial v1.1)

Registro técnico do que foi aplicado no site, de como cada item foi comprovado e do que ainda depende da Suljett.

## Frente 1 · Funcionamento

**Formulário entrega o contato de verdade.** Os quatro formulários (home, contato, FISPQ e as fichas das páginas de produto) passam por um único script, `assets/leads.js`. O envio vai para o endpoint em `src/_data/site.json` (`leadEndpoint`). A tela só mostra sucesso depois da resposta do servidor, com protocolo no formato `SJ-AAMMDD-XXXX`. Se o envio falhar, aparece o aviso com o WhatsApp como alternativa. O lead leva junto a página de origem, o referrer e os parâmetros de campanha (utm_*, gclid).

- Destino atual: FormSubmit, que manda o e-mail para `contato@suljett.com`. No **primeiro envio real**, o FormSubmit manda um e-mail de ativação para esse endereço, e alguém da Suljett precisa clicar no link uma vez.
- Para trocar o destino (outro e-mail, CRM ou webhook), basta mudar `leadEndpoint` no `site.json`.
- Testado com o endpoint simulado nos dois caminhos (sucesso e falha) nos quatro formulários.

**Fichas técnicas sem arquivo provisório.** O PDF provisório foi removido. O site lista, no build, os PDFs presentes em `assets/fichas/`, com o nome do arquivo igual à chave do modelo (instruções em `assets/fichas/LEIA-ME.txt`). Se o modelo tem PDF, o link de download aparece depois do cadastro. Se não tem, o pedido vira lead e a equipe envia a ficha por e-mail. O formulário da FISPQ passou a pedir o tipo de insumo num campo de seleção de verdade (antes eram etiquetas que não faziam nada ao toque).

## Frente 2 · Experiência

**Celular sem corte de conteúdo.** Causa raiz: colunas de grid sem `min-width: 0` (a opção longa do seletor de modelo esticava o formulário até 509 px) e botões com `nowrap`. Corrigido na base do CSS, não página a página. Varredura automática das 53 páginas em 320, 360, 375, 390 e 414 px: nenhum elemento fora da tela. Campos com fonte de 16 px no celular (evita o zoom do iOS) e alvos de toque de pelo menos 44 px em links, breadcrumbs, redes sociais e checkboxes.

**Site mais leve.** Medição com gzip (como no nginx de produção). O celular foi simulado em 4G (1,6 Mbps, 150 ms de latência):

| Página | Antes | Depois |
| --- | --- | --- |
| Home, computador | 3.459 KB, 20 requisições | 856 KB, 17 requisições |
| Home, celular 4G | 872 KB, LCP 4,7 s | 303 KB, LCP 0,48 s |
| UX2-D160W, computador | 398 KB | 249 KB |
| UX2-D160W, celular 4G | 398 KB, LCP 2,3 s | 127 KB, LCP 0,75 s |

O que mudou: vídeo da abertura de 2,3 MB para 295 KB (só carrega em computador, sem economia de dados e fora de conexão 2G/3G), fonte TTF de 163 KB para WOFF2 de 24 KB, logotipo baixado uma vez (era duas) em WebP de 20 KB, imagens recomprimidas (600 KB a menos no total) e GSAP, ScrollTrigger e Lenis removidos (136 KB de JavaScript).

**Animações.** Os blocos nascem visíveis. Nos navegadores com suporte a animação ligada à rolagem, eles entram acompanhando a leitura. Nos demais, aparecem direto, sem nenhum risco de texto preso invisível. Transições em cerca de um quarto do tempo anterior (0,3 s contra 0,9 s). A cortina de abertura agora aparece uma vez por sessão, dura cerca de 1 s e não trava a rolagem (antes durava cerca de 3 s em toda visita à home). Os botões respondem ao toque, e o hover só existe onde há mouse. O carrossel de setores deixou de prender a rolagem da página: virou grade no computador e rolagem lateral nativa no celular.

## Frente 3 · Comunicação

- **Abertura:** título novo ("Sua linha de produção não para por falha de codificação."), uma ação principal, prova institucional na abertura e quatro entradas por intenção (reduzir custo, substituir equipamento em fim de vida, embalagem flexível, comparar tecnologias).
- **Chamada principal padronizada:** "Solicitar análise da minha linha" em 48 pontos do site, cabeçalho incluído. As ações específicas de cada página (enviar amostra, abrir chamado, proposta de locação) continuam como estão.
- **Afirmações sem lastro:** "vida útil longa, comprovada em campo" e "onde os outros falham em contraste" foram removidas ou trocadas por dado verificável (garantia Hitachi de até 5 anos, IP65 nos modelos indicados).
- **Tempo de mercado:** "17 anos", "15 anos de durabilidade" e "desde 2008" viraram só "desde 2008" em todo o site.
- **Conteúdo provisório fora do ar:** o "caso real" da cervejaria (marcado como placeholder no documento de copy), os telefones "(47)/(82) a confirmar" e os filtros falsos da página CIJ.
- **Laboratório de amostras** em destaque na home.
- **Páginas de produto:** a UX2-D160W foi montada como modelo com os oito blocos do item 6 do relatório, para aprovação antes de replicar nas outras. As outras seis de equipamento e as quatro de tecnologia já receberam a chamada final "É indicada para a sua aplicação? Fale com um especialista."
- **Travessões:** removidos de todo o texto visível do site (0 no build final), com a pontuação escolhida caso a caso.

## Frente 4 · Medição e SEO

**Eventos no `dataLayer`:** `whatsapp_click`, `contact_click`, `form_submit`, `ficha_download` e `product_view`, com a origem da campanha junto. Para ligar o Google Tag Manager, basta preencher `gtmId` no `site.json`.

**Checklist técnico para o suljett.com**

| Item | Status |
| --- | --- |
| Ambiente de testes fechado para buscadores (header `X-Robots-Tag: noindex` e `robots.txt` bloqueando tudo em qualquer host que não seja suljett.com) | Feito, testado no nginx |
| `www.suljett.com` → `suljett.com` (301) | Feito |
| `/index.html` → `/` (301) e links internos apontando para `/` | Feito |
| Canonical em todas as páginas apontando para suljett.com | Feito |
| Open Graph e Twitter Card em todas as páginas | Feito |
| Dados estruturados: Organization (home) e BlogPosting (blog) | Feito |
| Página 404 real (antes qualquer URL errada devolvia a home com status 200) | Feito |
| sitemap.xml e robots.txt | Feito |
| Title e description únicos, um H1 por página | Feito (53 páginas) |
| Encurtar titles acima de 60 e descriptions acima de 160 caracteres | Pendente, texto para aprovação da Suljett |
| Redirecionamentos 301 das URLs do site antigo | Pendente, precisa da lista de URLs atuais |
| Search Console e verificação do domínio | Pendente, precisa de acesso da Suljett |

## O que depende da Suljett

1. PDFs oficiais das fichas (7 modelos + comparativo), salvos em `assets/fichas/` com o nome da chave.
2. Confirmar o e-mail que recebe os leads (e clicar na ativação do FormSubmit) ou informar o CRM.
3. Confirmar os números institucionais (+1.700 indústrias, +9.200 manutenções, 2 mi+ insumos) com a fonte.
4. Autorização de dois clientes para os casos problema → solução → resultado.
5. Fotos reais de equipamentos, instalações e impressões. As duas imagens da página UX2-D160W estão marcadas como ilustrativas.
6. Telefones das unidades de Joinville e Marechal Deodoro.
7. ID do Google Tag Manager e acesso ao Search Console.

## Etapa seguinte (fora deste escopo, como previsto no plano)

- Recomendador de tecnologia (item 7 do relatório).
- Plano de conteúdo para busca (parte final do item 8).
