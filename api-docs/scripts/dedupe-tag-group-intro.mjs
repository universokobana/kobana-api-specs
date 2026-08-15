#!/usr/bin/env node
/**
 * `groupPathsBy: 'tagGroup'` (used for v2's sidebar, see docusaurus.config.ts)
 * re-runs the plugin's tag-grouping once per `x-tagGroups` entry, and each
 * run re-attaches the version's info/intro doc as the first item of its
 * category — so every top-level group ends up with its own "Introdução"
 * link instead of just the version root having one.
 *
 * Strips every nested `{ type: "doc", id: "api/vN/<info-id>", key: "..." }`
 * item produced this way. The intro page still exists at its own URL
 * (`/api/v2`, see fix-info-pages.mjs) and is linked from the navbar/footer;
 * it just shouldn't appear inside every category.
 *
 * Run after `docusaurus gen-api-docs all` (any step that regenerates
 * sidebar.ts for a tagGroup-mode version).
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const VERSION = 'v2';
const INFO_ID = 'api/v2/kobana-api-v-2-0';

const TARGETS = [
  `docs/api/${VERSION}/sidebar.ts`,
  ...['en', 'es'].map(
    (locale) => `i18n/${locale}/docusaurus-plugin-content-docs/current/api/${VERSION}/sidebar.ts`,
  ),
];

// Matches the exact 5-line item shape the plugin emits, regardless of
// indentation depth (it nests deeper the further down the sidebar tree).
const ITEM_RE = new RegExp(
  `[ \\t]*\\{\\n` +
    `[ \\t]*type: "doc",\\n` +
    `[ \\t]*id: "${INFO_ID}",\\n` +
    `[ \\t]*key: "[^"]*",\\n` +
    `[ \\t]*\\},\\n`,
  'g',
);

let changed = 0;
for (const rel of TARGETS) {
  const path = resolve(ROOT, rel);
  if (!existsSync(path)) continue;
  const src = readFileSync(path, 'utf8');
  const removed = (src.match(ITEM_RE) ?? []).length;
  if (!removed) continue;
  writeFileSync(path, src.replace(ITEM_RE, ''));
  changed += removed;
  console.log(`dedupe-tag-group-intro: removed ${removed} intro item(s) from ${rel}`);
}

if (!changed) console.log('dedupe-tag-group-intro: nothing to remove');
