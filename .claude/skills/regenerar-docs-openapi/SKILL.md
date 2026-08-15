---
name: regenerar-docs-openapi
description: Regenera a referência da API no site Docusaurus em docs/ a partir dos specs OpenAPI em swagger/, valida o build e ajusta as páginas versionadas que a mudança de spec afeta. Use quando os arquivos OpenAPI (swagger/**) ou as coleções Postman (postman/**) mudarem.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Regenerar a documentação Docusaurus a partir dos specs OpenAPI

Os specs em `swagger/` e as coleções em `postman/` são **gerados upstream** e
commitados neste repo por automação. Esta skill roda **depois** dessa
atualização: regenera a referência do site em `docs/`, garante que o build
continua passando e ajusta as páginas escritas à mão que a mudança de spec
tornou desatualizadas.

## O que é gerado e o que é versionado

| Caminho | Status | Quem escreve |
| --- | --- | --- |
| `swagger/**`, `postman/**` | versionado | automação upstream — **nunca editar aqui** |
| `docs/openapi/`, `docs/static/openapi/`, `docs/static/postman/` | gerado (gitignored) | `npm run prepare-specs` |
| `docs/docs/api/v1/`, `docs/docs/api/v2/` | gerado (gitignored) | `docusaurus gen-api-docs` — **nunca editar à mão** |
| `docs/docs/**` (resto), `docs/sidebars.ts`, `docs/docusaurus.config.ts`, `docs/scripts/*.mjs` | versionado | pessoas — é **aqui** que suas mudanças entram |

Como as páginas de endpoint não são versionadas, o valor desta skill não é
"rodar o gerador" (o build do Vercel já roda): é **detectar o que a mudança de
spec quebrou ou tornou obsoleto nos arquivos versionados** e corrigir.

Não faça `git commit` nem `git push`: o workflow
`.github/workflows/regenerate-docs.yml` commita direto no `main` o que você
deixar na árvore de trabalho dentro de `docs/`. Como não há revisão humana
antes do deploy, o build de §3 é obrigatório — não termine com ele quebrado.

## §1 — Levantar o que mudou nos specs

`BASE_SHA` e `HEAD_SHA` vêm do ambiente quando a skill roda no GitHub Actions
(fallback: `HEAD~1` e `HEAD`).

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

Registre: **endpoints adicionados/removidos**, **tags novas ou renomeadas**
(cada tag é uma categoria da sidebar gerada), **summaries duplicados** (viram
colisão de slug — ver §3) e **arquivos de spec novos ou renomeados** (ver §4).

## §2 — Regenerar a referência

```bash
cd docs
[ -d node_modules ] || npm ci
npm run gen-api-docs:all
```

Esse comando encadeia, nesta ordem: `prepare-specs` → `clean-api-docs all` →
`gen-api-docs all` → `fix-info-pages` → `rewrite-legacy-links`. Leia a saída
inteira: os três scripts em `docs/scripts/` imprimem contagens e avisos
(operationIds atribuídos e desambiguados, links `/reference/…` não resolvidos)
que são o primeiro sinal de problema.

## §3 — Validar com o build

```bash
cd docs && npm run build
```

`onBrokenLinks` e `onBrokenMarkdownLinks` estão em `throw`, então o build é o
teste de verdade — um link quebrado por causa do spec derruba o deploy do
Vercel. Se falhar, corrija **na camada certa**, nunca editando página gerada
nem spec:

| Sintoma | Camada a corrigir |
| --- | --- |
| Endpoint sumiu da referência / duas operações no mesmo arquivo | colisão de slug — `docs/scripts/prepare-specs.mjs` (regra de `operationId`) |
| Link quebrado para `/reference/<slug>` vindo de um `description` do spec | mapa em `docs/scripts/rewrite-legacy-links.mjs` |
| Página de introdução da versão no lugar errado ou rótulo em inglês | `docs/scripts/fix-info-pages.mjs` |
| Link quebrado entre páginas escritas à mão | a página em `docs/docs/**` |
| Categoria/versão faltando no menu da aba "API" | `docs/sidebars.ts` |

Rode `npm run build` de novo até passar limpo. Se um link do spec não tiver
destino possível neste site, o fallback do `rewrite-legacy-links` (índice da
versão) é aceitável — mas registre no relatório.

## §4 — Atualizar as páginas versionadas afetadas

Faça só o que o diff de §1 justificar. Nada mudou de estrutura? Não invente
alteração — "sem mudanças versionadas" é um resultado válido e comum.

- **Arquivo de spec novo/renomeado** (nova versão da API, nova coleção): entre
  em `docs/scripts/prepare-specs.mjs` (listas `VERBATIM` e, se for uma versão
  que vira referência navegável, `NORMALIZE`), em `docs/docusaurus.config.ts`
  (bloco `config` do `docusaurus-plugin-openapi-docs`), em `docs/sidebars.ts`
  (`generatedSidebar` + nova categoria "Referência — API vN") e na tabela de
  `docs/docs/api/especificacoes.md`.
- **Novo endpoint base / mudança de host ou de prefixo de versão**:
  `docs/docs/api/endpoints.md`.
- **Novo banco suportado** (aparece como valor de enum/descrição nos specs):
  crie a página em `docs/docs/api/bancos/<slug>.md` seguindo uma existente,
  adicione o slug à lista `BANCOS` em `docs/sidebars.ts` e ao índice
  `docs/docs/api/bancos/index.md`.
- **Novo evento de webhook**: `docs/docs/api/webhooks/eventos.md` (e
  `payloads.md` se o spec traz o payload).
- **Página conceitual contradita pelo spec** (autenticação, idempotência,
  limite de requisições, erros): corrija o trecho específico, sem reescrever a
  página.

Regras: texto em **pt-BR**, no tom das páginas vizinhas; nunca duplique em
prosa a tabela de parâmetros que a referência gerada já mostra — linke para a
página do endpoint; não mexa em `swagger/`, `postman/`, `docs/docs/api/v1/`,
`docs/docs/api/v2/`, `docs/openapi/` nem `docs/static/openapi|postman/`.

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
