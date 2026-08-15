#!/usr/bin/env node
/**
 * The v2 sidebar (docusaurus.config.ts: groupPathsBy 'tagGroup') is grouped
 * by `x-tagGroups`, which the upstream spec at `swagger/v2_0/` does not
 * carry — it's committed there by automation whenever the API changes in
 * the source app, so nothing under `swagger/` can be hand-edited (it would
 * just get overwritten on the next sync). This script re-applies our menu
 * taxonomy on top of the upstream spec every time docs are regenerated,
 * instead of baking it into the spec once.
 *
 * PATH_TAG_OVERRIDES corrects two kinds of upstream tagging problem, always
 * keyed by path+method (stable across spec regens) rather than by whatever
 * tag name arrived — so it's safe to reapply every run:
 *
 *  - Two unrelated resources sharing one tag (e.g. both `/v2/transfers` and
 *    `/v2/payment/batches` come tagged "Todos"; both `/v2/edi/edi_boxes` and
 *    `/v2/mailbox/entries` come tagged "Caixas Postais").
 *  - A tag we want renamed for the menu (e.g. `/v2/transfers*` becomes
 *    "Transferências" instead of upstream's "Todos"). A name-based rename
 *    would be simpler here, but the pt spec and the committed en/es
 *    translations were snapshotted at different times and don't always
 *    agree on raw tag names for the same endpoint — a rename keyed by name
 *    would silently merge unrelated resources on whichever locale disagrees,
 *    so every affected path is listed explicitly instead.
 *
 * Then rebuilds `tags` and `x-tagGroups` from TAXONOMY below, restricted to
 * tags actually in use. Fails loudly if a used tag has no taxonomy entry —
 * groupPathsBy: 'tagGroup' silently drops any tag missing from every group,
 * so an unclassified tag must stop the build, not vanish from the menu.
 *
 * Run after `prepare-specs` (which produces openapi/kobana-api-v2_0.json)
 * and before `docusaurus gen-api-docs`, so the plugin reads the grouped
 * spec. Also applied to the committed openapi/i18n/*.json translations so
 * their sidebars stay structurally in sync (translated summaries/
 * descriptions are untouched — only `tags`/`x-tagGroups` are rewritten).
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const TARGETS = [
  'openapi/kobana-api-v2_0.json',
  'openapi/i18n/kobana-api-v2_0.en.json',
  'openapi/i18n/kobana-api-v2_0.es.json',
];

// path -> method -> forced tag. Overrides whatever tag upstream assigned —
// deliberately keyed by path+method only, never by the incoming tag name:
// the pt spec and the committed en/es translations were snapshotted at
// different times and don't agree on raw tag names for the same endpoint
// (e.g. `/v2/transfer/batches*` comes tagged "Todos - Transferência" in pt
// but "Todos" in the en/es snapshots) — a name-based rename would silently
// merge unrelated resources on whichever locale disagrees.
const PATH_TAG_OVERRIDES = {
  '/v2/transfer/pix/{uid}/approve': { put: 'Pix - Transferência' },
  '/v2/transfer/pix/{uid}/reschedule': { put: 'Pix - Transferência' },
  '/v2/payment/batches': { get: 'Todos - Pagamento' },
  '/v2/payment/batches/{uid}': { get: 'Todos - Pagamento' },
  '/v2/payment/batches/{uid}/approve': { put: 'Todos - Pagamento' },
  '/v2/payment/batches/{uid}/reprove': { put: 'Todos - Pagamento' },
  '/v2/payment/batches/{uid}/cancel': { put: 'Todos - Pagamento' },
  '/v2/mailbox/entries': { get: 'Caixas Postais - Mailbox', post: 'Caixas Postais - Mailbox' },
  '/v2/mailbox/entries/{uid}': {
    get: 'Caixas Postais - Mailbox',
    patch: 'Caixas Postais - Mailbox',
    delete: 'Caixas Postais - Mailbox',
  },
  '/v2/transfers': { get: 'Transferências', post: 'Transferências' },
  '/v2/transfers/{uid}': { get: 'Transferências' },
  '/v2/transfers/{uid}/cancel': { put: 'Transferências' },
  '/v2/transfer/batches': { get: 'Todos' },
  '/v2/transfer/batches/{uid}': { get: 'Todos' },
  '/v2/transfer/batches/{uid}/approve': { put: 'Todos' },
  '/v2/transfer/batches/{uid}/reprove': { put: 'Todos' },
  '/v2/transfer/batches/{uid}/cancel': { put: 'Todos' },
};

// name -> { description, xDisplayName? }. Order here is the order tags are
// declared in `tags[]` — cosmetic (categoryLinkSource: 'tag' resolves labels
// from x-tagGroups membership order at the group level), kept for readability.
const TAG_INFO = {
  'Consulta de Boletos': { description: 'Consulta de boletos' },
  'Consulta de Pix QR Code': { description: 'Consulta de Pix QR Code' },
  Saldos: { description: 'Gerenciar saldos' },
  Contas: { description: 'Gerenciar contas financeiras' },
  Provedores: { description: 'Listar provedores financeiros' },
  Extrato: { description: 'Gerenciar extratos' },
  'Conta Pix': { description: 'Gerenciar contas Pix' },
  Pix: { description: 'Gerenciar cobranças via Pix' },
  'Pix Automático - Conta': { description: 'Gerenciar contas do Pix Automático' },
  'Pix Automático - Location': { description: 'Gerenciar locations do Pix Automático' },
  'Pix Automático - Recorrência': { description: 'Gerenciar recorrências do Pix Automático' },
  'Pix Automático - Solicitação': { description: 'Gerenciar solicitações do Pix Automático' },
  'Pix Automático - Cobrança': { description: 'Gerenciar cobranças do Pix Automático' },
  Recebimentos: { description: 'Gerenciar pagamentos recebidos' },
  Transferências: { description: 'Gerenciar transferências' },
  'Entre Contas': { description: 'Gerenciar transferências entre contas' },
  INTERNAL: { description: 'Aprovar e reagendar transferências internas' },
  'Pix - Transferência': { description: 'Gerenciar transferências via Pix', xDisplayName: 'Pix' },
  TED: { description: 'Gerenciar transferências via TED' },
  Todos: { description: 'Gerenciar lotes de transferência' },
  'Contas de Transferência': { description: 'Gerenciar contas de transferência' },
  Boletos: { description: 'Gerenciar pagamentos de boletos' },
  'Todos - Pagamento': { description: 'Gerenciar lotes de pagamento', xDisplayName: 'Todos' },
  'Contas de DDA': { description: 'Gerenciar contas de DDA' },
  'Boletos DDA': { description: 'Gerenciar boletos DDA' },
  'Contas de Pagamento': { description: 'Gerenciar contas de pagamento' },
  'Pix - Pagamento': { description: 'Gerenciar pagamentos via Pix', xDisplayName: 'Pix' },
  'Tributo (beta)': { description: 'Gerenciar pagamentos de tributos' },
  'Contas de Consumo': { description: 'Gerenciar pagamentos de contas de consumo' },
  Pagamentos: { description: 'Gerenciar pagamentos' },
  'Caixas Postais': { description: 'Gerenciar Caixas Postais' },
  'Caixas Postais - Mailbox': {
    description: 'Gerenciar Caixas Postais (Mailbox)',
    xDisplayName: 'Caixas Postais',
  },
  'Arquivos de Mailbox': { description: 'Gerenciar Arquivos de Mailbox' },
  'Canal Email': { description: 'Gerenciar Canal de E-mail' },
  'Canal S3': { description: 'Gerenciar Canal S3' },
  'Canal SFTP': { description: 'Gerenciar Canal SFTP' },
  'Canal WhatsApp': { description: 'Gerenciar Canal WhatsApp' },
  'Canal Syncthing': { description: 'Gerenciar Canal Syncthing' },
  Usuário: { description: 'Gerenciar Usuários' },
  Certificado: { description: 'Gerenciar Certificados' },
  Subcontas: { description: 'Gerenciar Subcontas' },
  Conexões: { description: 'Gerenciar Conexões' },
  Comando: { description: 'Consulta de Comandos' },
  'Tokens de Acesso': { description: 'Gerenciar Tokens de Acesso' },
  'Informações do Usuário': { description: 'Obter informações do usuário autenticado' },
};

const GROUPS = [
  ['GERAL', ['Consulta de Boletos', 'Consulta de Pix QR Code']],
  ['FINANCEIRO', ['Saldos', 'Contas', 'Provedores', 'Extrato']],
  [
    'COBRANÇAS',
    [
      'Conta Pix',
      'Pix',
      'Pix Automático - Conta',
      'Pix Automático - Location',
      'Pix Automático - Recorrência',
      'Pix Automático - Solicitação',
      'Pix Automático - Cobrança',
      'Recebimentos',
    ],
  ],
  [
    'TRANSFERÊNCIAS',
    ['Transferências', 'Entre Contas', 'INTERNAL', 'Pix - Transferência', 'TED', 'Todos', 'Contas de Transferência'],
  ],
  [
    'PAGAMENTOS',
    [
      'Boletos',
      'Todos - Pagamento',
      'Contas de DDA',
      'Boletos DDA',
      'Contas de Pagamento',
      'Pix - Pagamento',
      'Tributo (beta)',
      'Contas de Consumo',
      'Pagamentos',
    ],
  ],
  ['EDI', ['Caixas Postais']],
  [
    'MAILBOX',
    [
      'Caixas Postais - Mailbox',
      'Arquivos de Mailbox',
      'Canal Email',
      'Canal S3',
      'Canal SFTP',
      'Canal WhatsApp',
      'Canal Syncthing',
    ],
  ],
  ['ADMINISTRAÇÃO', ['Usuário', 'Certificado', 'Subcontas', 'Conexões', 'Comando']],
  ['SEGURANÇA E AUTENTICAÇÃO', ['Tokens de Acesso']],
  ['USUÁRIO', ['Informações do Usuário']],
];

// sanity on the static config itself, independent of any spec file
{
  const declared = Object.keys(TAG_INFO);
  const grouped = GROUPS.flatMap(([, tags]) => tags);
  const dupGrouped = grouped.filter((t, i) => grouped.indexOf(t) !== i);
  if (dupGrouped.length) throw new Error(`apply-v2-menu-groups: tag(s) placed in 2+ groups: ${dupGrouped.join(', ')}`);
  const missingFromGroups = declared.filter((t) => !grouped.includes(t));
  if (missingFromGroups.length)
    throw new Error(`apply-v2-menu-groups: TAG_INFO tag(s) with no group: ${missingFromGroups.join(', ')}`);
  const missingFromInfo = grouped.filter((t) => !declared.includes(t));
  if (missingFromInfo.length)
    throw new Error(`apply-v2-menu-groups: grouped tag(s) with no TAG_INFO entry: ${missingFromInfo.join(', ')}`);
}

function transform(doc, label) {
  for (const [path, methods] of Object.entries(PATH_TAG_OVERRIDES)) {
    const item = doc.paths?.[path];
    if (!item) continue; // path absent from this file (e.g. i18n lag) — skip
    for (const [method, tag] of Object.entries(methods)) {
      const op = item[method];
      if (!op) continue;
      op.tags = [tag];
    }
  }

  const used = new Set();
  for (const item of Object.values(doc.paths ?? {})) {
    for (const op of Object.values(item)) {
      if (op && typeof op === 'object' && Array.isArray(op.tags)) op.tags.forEach((t) => used.add(t));
    }
  }

  const unclassified = [...used].filter((t) => !(t in TAG_INFO));
  if (unclassified.length) {
    throw new Error(
      `apply-v2-menu-groups (${label}): tag(s) in use with no menu classification: ${unclassified.join(', ')}. ` +
        `Add them to TAG_INFO and a group in GROUPS (scripts/apply-v2-menu-groups.mjs) before regenerating — ` +
        `groupPathsBy: 'tagGroup' silently drops unclassified tags from the sidebar otherwise.`,
    );
  }

  doc.tags = Object.entries(TAG_INFO)
    .filter(([name]) => used.has(name))
    .map(([name, info]) => {
      const tag = { name, description: info.description };
      if (info.xDisplayName) tag['x-displayName'] = info.xDisplayName;
      return tag;
    });

  doc['x-tagGroups'] = GROUPS.map(([name, tags]) => ({
    name,
    tags: tags.filter((t) => used.has(t)),
  })).filter((g) => g.tags.length);

  return doc;
}

let touched = 0;
for (const rel of TARGETS) {
  const path = resolve(ROOT, rel);
  if (!existsSync(path)) {
    console.log(`apply-v2-menu-groups: skip ${rel} (not found)`);
    continue;
  }
  const doc = JSON.parse(readFileSync(path, 'utf8'));
  transform(doc, rel);
  writeFileSync(path, `${JSON.stringify(doc, null, 2)}\n`);
  touched++;
  console.log(`apply-v2-menu-groups: applied to ${rel} (${doc.tags.length} tags, ${doc['x-tagGroups'].length} groups)`);
}

if (!touched) throw new Error('apply-v2-menu-groups: no target file found — check TARGETS paths');
