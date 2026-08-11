import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// The two version sidebars are written by `npm run gen-api-docs:all` from the
// OpenAPI documents at the repo root, so they are build artifacts and not in
// git. Failing loudly beats a build that quietly ships an API tab with no
// endpoints in it.
function generatedSidebar(version: 'v1' | 'v2') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(`./docs/api/${version}/sidebar.ts`).default as unknown[];
  } catch {
    throw new Error(
      `docs/api/${version}/sidebar.ts is missing — run "npm run gen-api-docs:all" before building.`,
    );
  }
}

const BANCOS = [
  'abc-brasil',
  'ailos',
  'arbi',
  'banco-de-brasilia',
  'banco-do-brasil',
  'banco-do-nordeste',
  'banco-industrial-do-brasil',
  'banco-mercantil',
  'banese',
  'banestes',
  'banrisul',
  'bnp-paribas',
  'bocom-bbm',
  'bradesco',
  'bv',
  'btg',
  'caixa-economica-federal',
  'caruana',
  'citibank',
  'cora',
  'credisis',
  'cresol',
  'daycoval',
  'itau',
  'inter',
  'money-plus',
  'pj-bank',
  'rendimento',
  'safra',
  'semear',
  'santander',
  'sicoob',
  'sicredi',
  'sisprime',
  'sofisa',
  'unicred-do-brasil',
].map((slug) => `api/bancos/${slug}`);

const sidebars: SidebarsConfig = {
  // "Documentação" — the guides that lived under /docs on readme.com, in the
  // same four groups and the same order the old sidebar used.
  docsSidebar: [
    'index',
    {
      type: 'category',
      label: 'Começando',
      collapsed: false,
      link: {type: 'doc', id: 'comecando/index'},
      items: [
        'comecando/sandbox',
        'comecando/bibliotecas',
        'comecando/api-e-endpoints',
      ],
    },
    {
      type: 'category',
      label: 'Módulos',
      collapsed: false,
      items: [
        'modulos/magento',
        'modulos/shopify',
        'modulos/totvs-rm',
        'modulos/totvs-microsiga-protheus',
        'modulos/wordpress-woocommerce',
        'modulos/whmcs',
      ],
    },
    {
      type: 'category',
      label: 'Integrações',
      collapsed: false,
      items: ['integracoes/zapier', 'integracoes/pluga'],
    },
    {
      type: 'category',
      label: 'Legal',
      collapsed: false,
      items: ['legal/retencao-de-dados'],
    },
  ],

  // "API" — the conceptual pages readme.com kept under /reference, followed by
  // the endpoint reference generated from the OpenAPI documents.
  apiSidebar: [
    {
      type: 'category',
      label: 'Kobana API',
      collapsed: false,
      link: {type: 'doc', id: 'api/visao-geral'},
      items: [
        'api/visao-geral',
        'api/especificacoes',
        'api/endpoints',
        'api/user-agent',
        'api/limite-de-requisicoes',
        {
          type: 'category',
          label: 'Autenticação',
          link: {type: 'doc', id: 'api/autenticacao/index'},
          items: [
            'api/autenticacao/token-de-acesso',
            'api/autenticacao/authorization-flow',
            'api/autenticacao/client-credentials-flow',
            'api/autenticacao/permissoes',
          ],
        },
        'api/idempotencia',
        'api/postman',
        {
          type: 'category',
          label: 'Bancos Suportados',
          link: {type: 'doc', id: 'api/bancos/index'},
          // Collapsed: 36 bank pages expanded would push everything below the
          // fold, and a reader opens this list to find one bank, not to browse.
          collapsed: true,
          items: BANCOS,
        },
        'api/erros',
      ],
    },
    {
      type: 'category',
      label: 'Referência — API v1',
      collapsed: true,
      items: generatedSidebar('v1') as any,
    },
    {
      type: 'category',
      label: 'Referência — API v2',
      collapsed: true,
      items: generatedSidebar('v2') as any,
    },
    {
      type: 'category',
      label: 'Webhooks',
      collapsed: true,
      link: {type: 'doc', id: 'api/webhooks/index'},
      items: [
        'api/webhooks/eventos',
        'api/webhooks/configuracao',
        'api/webhooks/notificacoes',
        'api/webhooks/seguranca',
        'api/webhooks/payloads',
      ],
    },
    {
      type: 'category',
      label: 'Novas APIs',
      collapsed: true,
      items: ['api/pix'],
    },
  ],
};

export default sidebars;
