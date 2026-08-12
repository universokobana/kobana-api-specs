# Kobana para Desenvolvedores — documentação

Site da documentação pública da API da Kobana, construído com [Docusaurus 3](https://docusaurus.io/)
e publicado em `docs.banking.kobana.com.br`. Substitui o portal hospedado no readme.com em
`developers.kobana.com.br`.

O site tem duas seções:

- **Documentação** — os guias que ficavam em `/docs` no readme.com (começando, sandbox,
  SDKs, módulos de e-commerce/ERP, integrações e retenção de dados);
- **API** — as páginas conceituais que ficavam em `/reference` (visão geral, autenticação,
  idempotência, limite de requisições, bancos suportados, webhooks, erros) **mais** a
  referência de endpoints gerada automaticamente a partir dos arquivos OpenAPI deste
  repositório (`swagger/v1_0` e `swagger/v2_0`).

## Pré-requisitos

- Node.js 22 ou superior

## Instalação

```bash
cd developers
npm install
```

## Gerando a referência da API

As páginas de endpoint **não** ficam versionadas: são geradas a partir dos arquivos
OpenAPI na raiz do repositório. Rode este comando depois de clonar, e sempre que os
specs mudarem:

```bash
npm run gen-api-docs:all
```

O comando faz, em ordem:

1. `sync-specs` — copia `swagger/*` e `postman/*` da raiz do repo para `static/`
   (o plugin de OpenAPI só lê caminhos dentro do site, e assim os arquivos também
   ficam publicados em `/openapi/…` e `/postman/…`);
2. `docusaurus clean-api-docs all` + `gen-api-docs all` — regenera `docs/api/v1` e
   `docs/api/v2`;
3. `fix-info-pages` — aponta a página de introdução de cada versão para `/api/v1` e
   `/api/v2` e traduz o rótulo do menu;
4. `rewrite-legacy-links` — reescreve os links `/reference/…` do readme.com que ainda
   existem dentro das descrições dos specs para as rotas novas.

## Desenvolvimento

```bash
npm start        # http://localhost:3300
```

> O dev server do Docusaurus usa um caminho de SSR diferente do build final. Para
> validar algo que vai para produção, use o build:
>
> ```bash
> npm run build
> npm run serve   # http://localhost:3300
> ```

## Build

```bash
npm run build
```

`onBrokenLinks` e `onBrokenMarkdownLinks` estão em `throw`: um link quebrado derruba o
build de propósito.

## Estrutura

```
developers/
├── docs/
│   ├── index.md              # home
│   ├── comecando/            # guias — /docs no readme.com
│   ├── modulos/
│   ├── integracoes/
│   ├── legal/
│   └── api/
│       ├── visao-geral.md    # páginas conceituais — /reference no readme.com
│       ├── autenticacao/
│       ├── bancos/
│       ├── webhooks/
│       ├── v1/               # gerado do OpenAPI (não versionado)
│       └── v2/               # gerado do OpenAPI (não versionado)
├── scripts/                  # sync-specs, fix-info-pages, rewrite-legacy-links
├── src/                      # tema e CSS
├── static/                   # imagens; openapi/ e postman/ são copiados pelo sync-specs
├── docusaurus.config.ts
└── sidebars.ts
```

## URLs antigas

O site é publicado em um host próprio, separado do portal do readme.com, então **não há
redirecionamentos** das URLs antigas (`/docs/<slug>`, `/reference/<slug>`) — as rotas
aqui são as da árvore de `docs/`.

A única coisa que ainda olha para o readme.com é o `rewrite-legacy-links`: alguns
`description` dentro dos specs OpenAPI linkam para `/reference/…` — uns como caminho,
outros como `https://developers.kobana.com.br/reference/…` — e o script troca todos
pelas rotas deste site. Sem isso os caminhos quebrariam o build (`onBrokenLinks` está em
`throw`) e as URLs absolutas continuariam apontando para o portal antigo.
