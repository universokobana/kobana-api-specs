#!/usr/bin/env node
/**
 * Injects a resource card grid into the generated `/api/v1` and `/api/v2`
 * landing pages (`*.info.mdx`), grouped the same way as the "Referência —
 * API v1/v2" sidebar entries (see V1_TAG_GROUPS / V2_TAG_GROUPS in
 * sidebars.ts — keep both in sync if either changes).
 *
 * Run after `docusaurus gen-api-docs all` (needs the generated sidebar.ts +
 * info.mdx to exist) and after fix-i18n-sidebar-ids.mjs (needs i18n doc ids
 * already stripped of their locale prefix).
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Keep in sync with sidebars.ts.
const V1_TAG_GROUPS = {
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

const V2_TAG_GROUPS = {
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
  'Usuários': ['Usuário', 'Informações do Usuário'],
};

const HEADING = {
  'pt-BR': 'Recursos da API',
  en: 'API Resources',
  es: 'Recursos de la API',
};

const GROUP_LABELS = {
  'pt-BR': {
    'Cobranças': 'Cobranças',
    'Outros Recursos': 'Outros Recursos',
    Recursos: 'Recursos',
    Cobrança: 'Cobrança',
    Financeiro: 'Financeiro',
    Transferências: 'Transferências',
    Pagamentos: 'Pagamentos',
    Administração: 'Administração',
    Segurança: 'Segurança',
    Mailbox: 'Mailbox',
    'Usuários': 'Usuários',
  },
  en: {
    'Cobranças': 'Billing',
    'Outros Recursos': 'Other Resources',
    Recursos: 'Resources',
    Cobrança: 'Charge',
    Financeiro: 'Financial',
    Transferências: 'Transfer',
    Pagamentos: 'Payment',
    Administração: 'Admin',
    Segurança: 'Security',
    Mailbox: 'Mailbox',
    'Usuários': 'Users',
  },
  es: {
    'Cobranças': 'Cobranzas',
    'Outros Recursos': 'Otros Recursos',
    Recursos: 'Recursos',
    Cobrança: 'Cobranza',
    Financeiro: 'Financiero',
    Transferências: 'Transferencias',
    Pagamentos: 'Pagos',
    Administração: 'Administración',
    Segurança: 'Seguridad',
    Mailbox: 'Mailbox',
    'Usuários': 'Usuarios',
  },
};

const LOCALE_DIRS = {
  'pt-BR': (version) => `docs/api/${version}`,
  en: (version) => `i18n/en/docusaurus-plugin-content-docs/current/api/${version}`,
  es: (version) => `i18n/es/docusaurus-plugin-content-docs/current/api/${version}`,
};

const INFO_MDX = {
  v1: 'kobana-api-v-1-0.info.mdx',
  v2: 'kobana-api-v-2-0.info.mdx',
};

/** label -> doc id, read from the generated sidebar.ts's tag categories. */
function readLabelToId(sidebarPath) {
  const src = readFileSync(sidebarPath, 'utf8');
  const re = /label: "([^"]+)",\n\s*key: "[^"]*",\n\s*link: \{\n\s*type: "doc",\n\s*id: "([^"]+)",/g;
  const map = new Map();
  for (const m of src.matchAll(re)) map.set(m[1], m[2]);
  return map;
}

function buildCardsMdx(groups, labelToId, heading, groupLabels) {
  const sections = Object.entries(groups)
    .map(([groupKey, tagLabels]) => {
      const cards = tagLabels
        .map((label) => {
          const id = labelToId.get(label);
          if (!id) return null;
          return `    <div className="col col--4 margin-bottom--lg">
      <DocCard item={{type: 'link', href: '/${id}', label: '${label.replace(/'/g, "\\'")}'}} />
    </div>`;
        })
        .filter(Boolean);
      if (!cards.length) return null;
      return `### ${groupLabels[groupKey]}

<div className="row">
${cards.join('\n')}
</div>`;
    })
    .filter(Boolean);

  return `## ${heading}

${sections.join('\n\n')}

`;
}

const CUT_MARKER = '<div\n  style={{"marginBottom":"2rem"}}\n>\n  <Heading\n    id={"authentication"}';
const IMPORT_MARKER = 'import Export from "@theme/ApiExplorer/Export";';

let changed = 0;
for (const [locale, dirFor] of Object.entries(LOCALE_DIRS)) {
  for (const [version, groups] of Object.entries({v1: V1_TAG_GROUPS, v2: V2_TAG_GROUPS})) {
    const dir = resolve(ROOT, dirFor(version));
    const sidebarPath = join(dir, 'sidebar.ts');
    const infoPath = join(dir, INFO_MDX[version]);
    if (!existsSync(sidebarPath) || !existsSync(infoPath)) continue;

    const labelToId = readLabelToId(sidebarPath);
    const cardsMdx = buildCardsMdx(groups, labelToId, HEADING[locale], GROUP_LABELS[locale]);

    let src = readFileSync(infoPath, 'utf8');
    if (!src.includes(IMPORT_MARKER) || !src.includes(CUT_MARKER)) {
      console.error(`add-overview-cards: markers not found in ${infoPath}, skipping`);
      continue;
    }
    src = src.replace(IMPORT_MARKER, `${IMPORT_MARKER}\nimport DocCard from "@theme/DocCard";`);
    src = src.replace(CUT_MARKER, `${cardsMdx}${CUT_MARKER}`);
    writeFileSync(infoPath, src);
    changed++;
  }
}

console.log(`add-overview-cards: ${changed} page(s) updated`);
