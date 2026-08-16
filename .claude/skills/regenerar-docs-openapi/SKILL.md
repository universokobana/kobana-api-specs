---
name: regenerar-docs-openapi
description: Regenera a referência da API no site Docusaurus em api-docs/ a partir dos specs OpenAPI em swagger/, valida o build e ajusta as páginas versionadas que a mudança de spec afeta. Use quando os arquivos OpenAPI (swagger/**) ou as coleções Postman (postman/**) mudarem.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Regenerar a documentação Docusaurus a partir dos specs OpenAPI

Os specs em `swagger/` e as coleções em `postman/` são **gerados upstream** e
commitados neste repo por automação. Esta skill roda **depois** dessa
atualização: regenera a referência do site em `api-docs/`, garante que o build
continua passando e ajusta as páginas escritas à mão que a mudança de spec
tornou desatualizadas.

## O que é gerado e o que é versionado

| Caminho | Status | Quem escreve |
| --- | --- | --- |
| `swagger/**`, `postman/**` | versionado | automação upstream — **nunca editar aqui** |
| `api-docs/openapi/`, `api-docs/static/openapi/`, `api-docs/static/postman/` | gerado (gitignored) | `npm run prepare-specs` |
| `api-docs/docs/api/v1/`, `api-docs/docs/api/v2/` | gerado (gitignored) | `docusaurus gen-api-docs` — **nunca editar à mão** |
| `api-docs/docs/**` (resto), `api-docs/sidebars.ts`, `api-docs/docusaurus.config.ts`, `api-docs/scripts/*.mjs` | versionado | pessoas — é **aqui** que suas mudanças entram |

Como as páginas de endpoint não são versionadas, o valor desta skill não é
"rodar o gerador" (o build do Vercel já roda): é **detectar o que a mudança de
spec quebrou ou tornou obsoleto nos arquivos versionados** e corrigir.

Não faça `git commit` nem `git push`: o workflow
`.github/workflows/regenerate-docs.yml` commita direto no `main` o que você
deixar na árvore de trabalho dentro de `api-docs/`. Como não há revisão
humana antes do deploy, o build de §3 é obrigatório — não termine com ele
quebrado.

## Invariante: a URL de um endpoint nunca muda sozinha

A URL de cada página de operação (`/api/v2/data/bank_billet_queries/post`,
`/api/v2/financial/accounts/statement_transactions/syncs/get`) é derivada
**só** do método HTTP e do path do endpoint no spec — nunca do `summary`,
da tag, ou de qualquer texto traduzido. Isso é proposital: resumo, tag e
tradução mudam com frequência (reformulação de texto, reclassificação de
categoria, refresh de tradução) e nenhuma dessas mudanças deve derrubar um
link ou marcador que alguém salvou apontando para aquele endpoint. A única
coisa que legitimamente muda a URL de um endpoint é o **próprio path ou
método mudar upstream** — e nesse caso a URL mudar é o comportamento
correto, não um bug.

Essa regra vive em dois lugares, que precisam ficar em sincronia:

- `api-docs/scripts/prepare-specs.mjs` atribui a cada operação um
  `operationId` interno (`post-data-bank-billet-queries`) a partir de
  método+path — só serve de nome de arquivo/id de sidebar, nunca aparece na
  URL. É calculado de forma independente (não copiado) nos três specs
  (pt/en/es), então fica idêntico nos três sem precisar sincronizar nada.
- `api-docs/scripts/set-operation-slugs.mjs` roda depois de
  `docusaurus gen-api-docs all` e sobrescreve a URL de cada página gerada
  com um front matter `slug:` calculado direto do método+path daquela
  operação, no formato `/api/v2/financial/accounts/_uid/put` — cada
  segmento `{param}` do path vira `_param` (nunca é descartado: dropar um
  parâmetro faria a URL parar de bater com a chamada real da API, e
  arrisca duas operações diferentes colidindo na mesma página). Como
  path+método nunca são traduzidos, o slug sai idêntico em pt/en/es sem
  esforço extra. `api-docs/scripts/rewrite-legacy-links.mjs` replica a
  mesma fórmula (`operationSlug`) para redirecionar links antigos do
  readme.com para a URL nova — **se mexer na fórmula em um arquivo, mexa
  nos dois**.

**Nunca** volte a derivar id/URL do `summary` ou de texto traduzido — foi o
esquema anterior e quebrava exatamente essa garantia (URL virava
`/api/v2/create-a-bank-billet-query`, ficava diferente por idioma, e mudava
sempre que o texto do spec era reescrito). Também não volte a descartar
parâmetros de path para "desambiguar" listagem de detalhe (esquema anterior
ao atual) — a URL deve espelhar a chamada real, parâmetro por parâmetro.
Se `set-operation-slugs.mjs` lançar erro de colisão (duas operações caindo
na mesma URL), não silencie removendo a checagem — normalmente é o mesmo
path+método aparecendo duas vezes no spec (problema no spec upstream, não
no script); investigue antes de mudar a fórmula.

## §1 — Levantar o que mudou nos specs

`BASE_SHA` e `HEAD_SHA` vêm do ambiente quando a skill roda no GitHub Actions
(fallback: `HEAD~1` e `HEAD`).

Se a variável de ambiente `FORCE` estiver definida como `true`, é uma
execução manual de teste do pipeline: **não pule §2–§5 mesmo que o diff
abaixo venha vazio.** Rode a regeneração e o build normalmente e diga isso no
relatório final (ex.: "sem mudança de specs; rodado por FORCE=true"). Nunca
responda só "não executado — sem mudança de spec que justifique" quando
`FORCE=true`.

```bash
BASE="${BASE_SHA:-HEAD~1}"; HEAD_REF="${HEAD_SHA:-HEAD}"
git diff --stat "$BASE" "$HEAD_REF" -- swagger postman
```

Com os arquivos JSON dos dois lados, levante o inventário de operações e tags
de cada versão e compare. Ex. para v1 (repita para v2 e para
`all-versions` se ela mudou):

```bash
spec=swagger/v1_0/kobana-api-v1_0-openapi-3_1.json
inv() { jq -r '.paths | to_entries[] | .key as $p | .value | to_entries[]
        | select(.key | IN("get","put","post","delete","patch"))
        | "\(.key|ascii_upcase) \($p)\t\(.value.summary // "")\t\((.value.tags // [])|join(","))"' ; }
git show "$BASE:$spec"     | inv | sort > /tmp/inv-base.txt
git show "$HEAD_REF:$spec" | inv | sort > /tmp/inv-head.txt
diff /tmp/inv-base.txt /tmp/inv-head.txt
```

Registre: **endpoints adicionados/removidos ou com path/método alterado**
(única mudança upstream que legitimamente muda uma URL — ver "Invariante"
acima), **tags novas ou renomeadas** (cada tag é uma categoria da sidebar
gerada, e uma tag nova precisa entrar em `apply-v2-menu-groups.mjs` — ver
§3) e **arquivos de spec novos ou renomeados** (ver §4).

## §2 — Regenerar a referência

```bash
cd api-docs
[ -d node_modules ] || npm ci
npm run gen-api-docs:all
```

Esse comando encadeia `prepare-specs` → `apply-v2-menu-groups` →
`clean-api-docs all` → `gen-api-docs all` → `fix-info-pages` →
`rewrite-legacy-links` → `remove-deprecated-operations` →
`set-operation-slugs` → `fix-i18n-sidebar-ids` → `dedupe-tag-group-intro` →
`translate-info-title` → `fix-sidebar-translation-keys` →
`add-overview-cards` → `translate-payloads` (en/es) — a ordem exata está em
`api-docs/package.json`, script `gen-api-docs:all`. Leia a saída inteira: os
scripts em `api-docs/scripts/` imprimem contagens e avisos (operationIds
atribuídos e desambiguados, páginas com `slug:` sobrescrito, links
`/reference/…` não resolvidos) que são o primeiro sinal de problema.

## §3 — Validar com o build

```bash
cd api-docs && npm run build
```

`onBrokenLinks` e `onBrokenMarkdownLinks` estão em `throw`, então o build é o
teste de verdade — um link quebrado por causa do spec derruba o deploy do
Vercel. Se falhar, corrija **na camada certa**, nunca editando página gerada
nem spec:

| Sintoma | Camada a corrigir |
| --- | --- |
| Endpoint sumiu da referência / duas operações no mesmo arquivo | colisão de id interno — `api-docs/scripts/prepare-specs.mjs` (regra de `operationId`, método+path) |
| Erro `set-operation-slugs: "..." would serve both...` | colisão de URL depois de remover parâmetros de path — ver "Invariante" acima; ajuste `operationSlug` em `set-operation-slugs.mjs` **e** `rewrite-legacy-links.mjs` |
| Tag nova sem classificação (`apply-v2-menu-groups: tag(s) in use with no menu classification`) | adicione a tag em `TAG_INFO`/`GROUPS` (e, se o nome vier em pt-BR, em `TAG_RENAME`) em `api-docs/scripts/apply-v2-menu-groups.mjs` |
| Link quebrado para `/reference/<slug>` vindo de um `description` do spec | mapa em `api-docs/scripts/rewrite-legacy-links.mjs` |
| Página de introdução da versão no lugar errado ou rótulo em inglês | `api-docs/scripts/fix-info-pages.mjs` |
| Link quebrado entre páginas escritas à mão | a página em `api-docs/docs/**` |
| Categoria/versão faltando no menu da aba "API" | `api-docs/sidebars.ts` |

Rode `npm run build` de novo até passar limpo. Se um link do spec não tiver
destino possível neste site, o fallback do `rewrite-legacy-links` (índice da
versão) é aceitável — mas registre no relatório.

## §4 — Atualizar as páginas versionadas afetadas

Faça só o que o diff de §1 justificar. Nada mudou de estrutura? Não invente
alteração — "sem mudanças versionadas" é um resultado válido e comum.

- **Arquivo de spec novo/renomeado** (nova versão da API, nova coleção): entre
  em `api-docs/scripts/prepare-specs.mjs` (listas `VERBATIM` e, se for uma versão
  que vira referência navegável, `NORMALIZE`), em `api-docs/docusaurus.config.ts`
  (bloco `config` do `docusaurus-plugin-openapi-docs`), em `api-docs/sidebars.ts`
  (`generatedSidebar` + nova categoria "Referência — API vN") e na tabela de
  `api-docs/docs/api/overview/openapi.md`.
- **Novo endpoint base / mudança de host ou de prefixo de versão**:
  `api-docs/docs/api/overview/endpoints.md`.
- **Novo banco suportado** (aparece como valor de enum/descrição nos specs):
  crie a página em `api-docs/docs/api/bancos/<slug>.md` seguindo uma existente,
  adicione o slug à lista `BANCOS` em `api-docs/sidebars.ts` e ao índice
  `api-docs/docs/api/bancos/index.md`.
- **Novo evento de webhook**: `api-docs/docs/api/overview/webhooks/events.md`
  (e `payloads.mdx` se o spec traz o payload).
- **Página conceitual contradita pelo spec** (autenticação, idempotência,
  limite de requisições, erros): corrija o trecho específico, sem reescrever a
  página.

Regras: texto em **pt-BR**, no tom das páginas vizinhas; nunca duplique em
prosa a tabela de parâmetros que a referência gerada já mostra — linke para a
página do endpoint; não mexa em `swagger/`, `postman/`, `api-docs/docs/api/v1/`,
`api-docs/docs/api/v2/`, `api-docs/openapi/` nem `api-docs/static/openapi|postman/`.

## §5 — Relatório final

Termine com um resumo curto, em pt-BR, nesta forma (é publicado no summary do
run do Actions):

```
## Specs
<versões alteradas; N endpoints adicionados, M removidos, tags novas>

## Referência regenerada
<páginas geradas por versão; avisos dos scripts>

## Arquivos versionados alterados
<lista com uma linha de motivo cada — ou "nenhum">

## Build
<resultado de `npm run build`; links que caíram no fallback>
```

## Checklist

- [ ] Diff dos specs analisado (endpoints, tags, arquivos)
- [ ] `npm run gen-api-docs:all` rodou sem erro
- [ ] `npm run build` passou
- [ ] Nenhuma edição em spec, coleção ou página gerada
- [ ] Páginas versionadas afetadas atualizadas (ou justificado que não havia)
- [ ] Relatório final emitido
