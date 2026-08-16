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
 *    "Transfers" instead of upstream's "Todos"). A name-based rename
 *    would be simpler here, but the pt spec and the committed en/es
 *    translations were snapshotted at different times and don't always
 *    agree on raw tag names for the same endpoint — a rename keyed by name
 *    would silently merge unrelated resources on whichever locale disagrees,
 *    so every affected path is listed explicitly instead.
 *
 * TAG_INFO/GROUPS names are English on purpose and applied identically to
 * every locale file (see TARGETS) — the sidebar's category/resource labels
 * (unlike operation summaries/descriptions) previously carried the raw pt
 * tag names straight through to the en/es specs, so switching the site
 * language left the menu itself untranslated. English was picked as the one
 * consistent label across locales rather than adding a third translation
 * layer here.
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
  '/v2/transfer/pix/{uid}/approve': { put: 'Pix - Transfer' },
  '/v2/transfer/pix/{uid}/reschedule': { put: 'Pix - Transfer' },
  '/v2/payment/batches': { get: 'Payment Batches' },
  '/v2/payment/batches/{uid}': { get: 'Payment Batches' },
  '/v2/payment/batches/{uid}/approve': { put: 'Payment Batches' },
  '/v2/payment/batches/{uid}/reprove': { put: 'Payment Batches' },
  '/v2/payment/batches/{uid}/cancel': { put: 'Payment Batches' },
  '/v2/mailbox/entries': { get: 'Mailboxes - Mailbox', post: 'Mailboxes - Mailbox' },
  '/v2/mailbox/entries/{uid}': {
    get: 'Mailboxes - Mailbox',
    patch: 'Mailboxes - Mailbox',
    delete: 'Mailboxes - Mailbox',
  },
  '/v2/transfers': { get: 'Transfers', post: 'Transfers' },
  '/v2/transfers/{uid}': { get: 'Transfers' },
  '/v2/transfers/{uid}/cancel': { put: 'Transfers' },
  '/v2/transfer/batches': { get: 'Batches' },
  '/v2/transfer/batches/{uid}': { get: 'Batches' },
  '/v2/transfer/batches/{uid}/approve': { put: 'Batches' },
  '/v2/transfer/batches/{uid}/reprove': { put: 'Batches' },
  '/v2/transfer/batches/{uid}/cancel': { put: 'Batches' },
};

// Upstream raw tag name -> menu tag name. Applied to every operation's tags
// (not just the ones in PATH_TAG_OVERRIDES above), since most tags reach here
// unchanged from the pt spec and need translating regardless of path. Entries
// whose name doesn't change (Pix, TED, INTERNAL) are omitted.
const TAG_RENAME = {
  'Consulta de Boletos': 'Bank Billet Query',
  'Consulta de Pix QR Code': 'Pix QR Code Query',
  Saldos: 'Balances',
  Contas: 'Accounts',
  Provedores: 'Providers',
  Extrato: 'Statement',
  'Conta Pix': 'Pix Account',
  'Pix Automático - Conta': 'Automatic Pix - Account',
  'Pix Automático - Location': 'Automatic Pix - Location',
  'Pix Automático - Recorrência': 'Automatic Pix - Recurrence',
  'Pix Automático - Solicitação': 'Automatic Pix - Request',
  'Pix Automático - Cobrança': 'Automatic Pix - Charge',
  Recebimentos: 'Receipts',
  Transferências: 'Transfers',
  'Entre Contas': 'Between Accounts',
  'Pix - Transferência': 'Pix - Transfer',
  Todos: 'Batches',
  'Contas de Transferência': 'Transfer Accounts',
  Boletos: 'Bank Billets',
  'Todos - Pagamento': 'Payment Batches',
  'Contas de DDA': 'DDA Accounts',
  'Boletos DDA': 'DDA Bank Billets',
  'Contas de Pagamento': 'Payment Accounts',
  'Pix - Pagamento': 'Pix - Payment',
  'Tributo (beta)': 'Tax (beta)',
  'Contas de Consumo': 'Utility Bills',
  Pagamentos: 'Payments',
  'Caixas Postais': 'Mailboxes',
  'Caixas Postais - Mailbox': 'Mailboxes - Mailbox',
  'Arquivos de Mailbox': 'Mailbox Files',
  'Canal Email': 'Email Channel',
  'Canal S3': 'S3 Channel',
  'Canal SFTP': 'SFTP Channel',
  'Canal WhatsApp': 'WhatsApp Channel',
  'Canal Syncthing': 'Syncthing Channel',
  Usuário: 'User',
  Certificado: 'Certificate',
  Subcontas: 'Sub-accounts',
  Conexões: 'Connections',
  Comando: 'Commands',
  'Tokens de Acesso': 'Access Tokens',
  'Informações do Usuário': 'User Information',
};

// name -> { description, xDisplayName? }. Order here is the order tags are
// declared in `tags[]` — cosmetic (categoryLinkSource: 'tag' resolves labels
// from x-tagGroups membership order at the group level), kept for readability.
const TAG_INFO = {
  'Bank Billet Query': { description: 'Query bank billets' },
  'Pix QR Code Query': { description: 'Query Pix QR Code' },
  Balances: { description: 'Manage balances' },
  Accounts: { description: 'Manage financial accounts' },
  Providers: { description: 'List financial providers' },
  Statement: { description: 'Manage statements' },
  'Pix Account': { description: 'Manage Pix accounts' },
  Pix: { description: 'Manage charges via Pix' },
  'Automatic Pix - Account': { description: 'Manage Automatic Pix accounts' },
  'Automatic Pix - Location': { description: 'Manage Automatic Pix locations' },
  'Automatic Pix - Recurrence': { description: 'Manage Automatic Pix recurrences' },
  'Automatic Pix - Request': { description: 'Manage Automatic Pix requests' },
  'Automatic Pix - Charge': { description: 'Manage Automatic Pix charges' },
  Receipts: { description: 'Manage received payments' },
  Transfers: { description: 'Manage transfers' },
  'Between Accounts': { description: 'Manage transfers between accounts' },
  INTERNAL: { description: 'Approve and reschedule internal transfers' },
  'Pix - Transfer': { description: 'Manage transfers via Pix', xDisplayName: 'Pix' },
  TED: { description: 'Manage transfers via TED' },
  Batches: { description: 'Manage transfer batches' },
  'Transfer Accounts': { description: 'Manage transfer accounts' },
  'Bank Billets': { description: 'Manage bank billet payments' },
  'Payment Batches': { description: 'Manage payment batches', xDisplayName: 'Batches' },
  'DDA Accounts': { description: 'Manage DDA accounts' },
  'DDA Bank Billets': { description: 'Manage DDA bank billets' },
  'Payment Accounts': { description: 'Manage payment accounts' },
  'Pix - Payment': { description: 'Manage payments via Pix', xDisplayName: 'Pix' },
  'Tax (beta)': { description: 'Manage tax payments' },
  'Utility Bills': { description: 'Manage utility bill payments' },
  Payments: { description: 'Manage payments' },
  Mailboxes: { description: 'Manage mailboxes' },
  'Mailboxes - Mailbox': {
    description: 'Manage mailboxes',
    xDisplayName: 'Mailboxes',
  },
  'Mailbox Files': { description: 'Manage mailbox files' },
  'Email Channel': { description: 'Manage Email channel' },
  'S3 Channel': { description: 'Manage S3 channel' },
  'SFTP Channel': { description: 'Manage SFTP channel' },
  'WhatsApp Channel': { description: 'Manage WhatsApp channel' },
  'Syncthing Channel': { description: 'Manage Syncthing channel' },
  User: { description: 'Manage users' },
  Certificate: { description: 'Manage certificates' },
  'Sub-accounts': { description: 'Manage sub-accounts' },
  Connections: { description: 'Manage connections' },
  Commands: { description: 'Query commands' },
  'Access Tokens': { description: 'Manage access tokens' },
  'User Information': { description: 'Get authenticated user information' },
};

const GROUPS = [
  ['General', ['Bank Billet Query', 'Pix QR Code Query']],
  ['Financial', ['Balances', 'Accounts', 'Providers', 'Statement']],
  [
    'Charges',
    [
      'Pix Account',
      'Pix',
      'Automatic Pix - Account',
      'Automatic Pix - Location',
      'Automatic Pix - Recurrence',
      'Automatic Pix - Request',
      'Automatic Pix - Charge',
      'Receipts',
    ],
  ],
  [
    'Transfers',
    ['Transfers', 'Between Accounts', 'INTERNAL', 'Pix - Transfer', 'TED', 'Batches', 'Transfer Accounts'],
  ],
  [
    'Payments',
    [
      'Bank Billets',
      'Payment Batches',
      'DDA Accounts',
      'DDA Bank Billets',
      'Payment Accounts',
      'Pix - Payment',
      'Tax (beta)',
      'Utility Bills',
      'Payments',
    ],
  ],
  ['EDI', ['Mailboxes']],
  [
    'Mailbox',
    [
      'Mailboxes - Mailbox',
      'Mailbox Files',
      'Email Channel',
      'S3 Channel',
      'SFTP Channel',
      'WhatsApp Channel',
      'Syncthing Channel',
    ],
  ],
  ['Administration', ['User', 'Certificate', 'Sub-accounts', 'Connections', 'Commands']],
  ['Security and Authentication', ['Access Tokens']],
  ['User', ['User Information']],
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

  for (const item of Object.values(doc.paths ?? {})) {
    for (const op of Object.values(item)) {
      if (op && typeof op === 'object' && Array.isArray(op.tags)) {
        op.tags = op.tags.map((t) => TAG_RENAME[t] ?? t);
      }
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
