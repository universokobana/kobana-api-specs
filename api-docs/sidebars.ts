import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// `docusaurus build --locale <x>` sets this for the duration of that build,
// so a single sidebars.ts can pick the right locale's generated sidebar file
// without a separate config per locale.
const LOCALE = process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'pt-BR';

// The version sidebars are written by `npm run gen-api-docs:all` from the
// OpenAPI documents at the repo root (translated copies for en/es), so they
// are build artifacts and not in git. Failing loudly beats a build that
// quietly ships an API tab with no endpoints in it.
function generatedSidebar(version: 'v1' | 'v2') {
  const path =
    LOCALE === 'en'
      ? `./i18n/en/docusaurus-plugin-content-docs/current/api/${version}/sidebar.ts`
      : LOCALE === 'es'
        ? `./i18n/es/docusaurus-plugin-content-docs/current/api/${version}/sidebar.ts`
        : `./docs/api/${version}/sidebar.ts`;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(path).default as unknown[];
  } catch {
    throw new Error(`${path} is missing — run "npm run gen-api-docs:all" before building.`);
  }
}

// The generated v1 sidebar is a flat list of one category per OpenAPI tag,
// in spec order. Regroups it into the named super-sections the readme.com
// sidebar used to show, so the tag list reads as "Cobranças" / "Outros
// Recursos" / "Recursos" instead of one long flat list. Tag names are the
// same across locales (only descriptions were translated), so this mapping
// works unchanged for pt/en/es; the group labels themselves are translated
// via i18n/<locale>/docusaurus-plugin-content-docs/current.json like any
// other sidebar category label.
const V1_TAG_GROUPS: Record<string, string[]> = {
  'Cobranças': ['Boletos', 'Clientes', 'Carnês', 'Assinaturas', 'Carteiras de Cobrança'],
  'Outros Recursos': ['Eventos', 'Histórico de SMS', 'Webhooks', 'Histórico de E-mails', 'Log de Webhooks'],
  Recursos: [
    'CNAB (Retorno)',
    'CNAB (Remessa)',
    'Exportação do Lote',
    'Lotes',
    'Registro de Retorno',
    'Registro de Remessa',
    'Recebimento de Boleto',
    'Registro de Boleto',
    'Importações',
    'Relatórios',
  ],
};

// Same idea for v2, grouped by namespace as in the legacy readme.com sidebar
// (developers.kobana.com.br/v2.0/llms.txt) and the n8n-nodes-kobana node's
// namespace grouping — both agree on Charge / Financial / Transfer /
// Payment / Admin / Security / Mailbox. v2 has many more (and finer-grained)
// tags than v1, so each namespace covers several.
const V2_TAG_GROUPS: Record<string, string[]> = {
  Cobrança: [
    'Pix',
    'PIX',
    'Pix - Pagamento',
    'Conta Pix',
    'Pix Automático - Cobrança',
    'Pix Automático - Conta',
    'Pix Automático - Location',
    'Pix Automático - Recorrência',
    'Pix Automático - Solicitação',
    'Recebimentos',
    'Consulta de Boletos',
    'Consulta de Pix QR Code',
  ],
  Financeiro: ['Contas', 'Saldos', 'Extrato', 'Provedores'],
  Transferências: ['Todos', 'Todos - Transferência', 'Entre Contas', 'TED', 'Contas de Transferência', 'Pix - Transferência'],
  Pagamentos: ['Boletos', 'Pagamentos', 'Contas de Pagamento', 'Boletos DDA', 'Contas de DDA', 'Tributo (beta)', 'Contas de Consumo'],
  Administração: ['Certificado', 'Subcontas', 'Conexões', 'Comando', 'INTERNAL'],
  Segurança: ['Tokens de Acesso'],
  Mailbox: ['Caixas Postais', 'Arquivos de Mailbox', 'Canal Email', 'Canal S3', 'Canal SFTP', 'Canal WhatsApp', 'Canal Syncthing'],
  // Plural on purpose: a leaf tag inside this group is itself named
  // "Usuário" (singular) — same string on wrapper and child would collide
  // as sidebar translation keys and read oddly nested ("Usuário > Usuário").
  'Usuários': ['Usuário', 'Informações do Usuário'],
};

function groupByTag(items: any[], groups: Record<string, string[]>) {
  const categories = new Map(items.filter((i) => i.type === 'category').map((i) => [i.label, i]));
  const nonCategories = items.filter((i) => i.type !== 'category');
  const used = new Set<string>();

  const grouped = Object.entries(groups)
    .map(([groupLabel, tagLabels]) => {
      const children = tagLabels.map((l) => categories.get(l)).filter(Boolean);
      children.forEach((c) => used.add(c.label));
      return children.length ? {type: 'category', label: groupLabel, collapsed: false, items: children} : null;
    })
    .filter(Boolean);

  // Any tag not listed above (e.g. a new one added upstream) still shows up,
  // ungrouped, instead of silently disappearing from the sidebar.
  const leftover = [...categories.values()].filter((c) => !used.has(c.label));

  return [...nonCategories, ...grouped, ...leftover];
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
      label: 'ERPs',
      collapsed: false,
      items: ['erps/totvs-rm', 'erps/totvs-microsiga-protheus'],
    },
    {
      type: 'category',
      label: 'Integrações',
      collapsed: false,
      items: ['integracoes/zapier', 'integracoes/pluga', 'integracoes/n8n'],
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
      label: 'Visão Geral',
      collapsed: false,
      link: {type: 'doc', id: 'api/overview/index'},
      items: [
        'api/overview/introduction',
        'api/overview/openapi',
        'api/overview/postman',
        'api/overview/endpoints',
        'api/overview/user-agent',
        'api/overview/rate-limit',
        {
          type: 'category',
          label: 'Autenticação',
          link: {type: 'doc', id: 'api/overview/authentication/index'},
          items: [
            'api/overview/authentication/access-token',
            'api/overview/authentication/authorization-flow',
            'api/overview/authentication/client-credentials-flow',
            'api/overview/authentication/permissions',
          ],
        },
        'api/overview/idempotency',
        {
          type: 'category',
          label: 'Bancos Suportados',
          link: {type: 'doc', id: 'api/bancos/index'},
          // Collapsed: 36 bank pages expanded would push everything below the
          // fold, and a reader opens this list to find one bank, not to browse.
          collapsed: true,
          items: BANCOS,
        },
        'api/overview/errors',
      ],
    },
    {
      type: 'category',
      label: 'Referência — API v1',
      collapsed: true,
      items: groupByTag(generatedSidebar('v1'), V1_TAG_GROUPS) as any,
    },
    {
      type: 'category',
      label: 'Referência — API v2',
      collapsed: true,
      items: groupByTag(generatedSidebar('v2'), V2_TAG_GROUPS) as any,
    },
    {
      type: 'category',
      label: 'Webhooks',
      collapsed: true,
      link: {type: 'doc', id: 'api/overview/webhooks/index'},
      items: [
        'api/overview/webhooks/events',
        'api/overview/webhooks/configuration',
        'api/overview/webhooks/notifications',
        'api/overview/webhooks/security',
        'api/overview/webhooks/payloads',
      ],
    },
  ],
};

export default sidebars;
