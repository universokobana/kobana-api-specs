#!/usr/bin/env node
/**
 * docusaurus-plugin-openapi-docs generates v1 and v2 sidebars independently,
 * so both versions can (and do) produce a tag category with the same name
 * ("Boletos", "Webhooks", ...) and, within one version, two operations can
 * share a summary ("Listar CNABs" is both GET /v1/discharges and
 * GET /v1/remittances — see prepare-specs.mjs). Docusaurus tolerates that
 * for the default locale, but building any other locale fails outright:
 * i18n extraction keys sidebar translations by label text, and duplicate
 * labels within the same sidebarId collide.
 *
 * Fix, applied to every generated `sidebar.ts` (default locale + each i18n
 * mirror, both API versions):
 *  - every category item gets an explicit `key: "<version>-<slug>"`.
 *  - every doc item whose label collides with another in the same file gets
 *    a `sidebar_key: "<id>"` frontmatter field injected into its `.api.mdx`
 *    (siblings in the same directory as the sidebar.ts).
 *
 * Run after `gen-api-docs:all` (needs the generated sidebar.ts + .api.mdx
 * files to exist).
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const SIDEBAR_FILES = [
  'docs/api/v1/sidebar.ts',
  'docs/api/v2/sidebar.ts',
  'i18n/en/docusaurus-plugin-content-docs/current/api/v1/sidebar.ts',
  'i18n/en/docusaurus-plugin-content-docs/current/api/v2/sidebar.ts',
  'i18n/es/docusaurus-plugin-content-docs/current/api/v1/sidebar.ts',
  'i18n/es/docusaurus-plugin-content-docs/current/api/v2/sidebar.ts',
];

let totalCategoryKeys = 0;
let totalDocKeys = 0;

for (const rel of SIDEBAR_FILES) {
  const path = resolve(ROOT, rel);
  if (!existsSync(path)) continue;
  const version = rel.includes('/v1/') ? 'v1' : 'v2';
  const lines = readFileSync(path, 'utf8').split('\n');

  // Pass 1: add a literal `key:` to every category (fixes v1/v2 tag-name
  // collisions, e.g. both versions having a "Boletos" tag). Uses the raw
  // label, not a normalized slug, so labels differing only by case (a real
  // case here: "Pix" vs "PIX") stay distinct.
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    out.push(lines[i]);
    const m = lines[i].match(/^(\s*)label: "(.*)",$/);
    if (m && lines[i - 1]?.includes('type: "category"') && !lines[i + 1]?.trim().startsWith('key:')) {
      const [, indent, label] = m;
      out.push(`${indent}key: "${version}:${label}",`);
      totalCategoryKeys++;
    }
  }

  // Pass 2: add a literal `key:` to doc items whose label repeats within
  // this file (e.g. "Listar CNABs" is both GET /v1/discharges and
  // GET /v1/remittances — see prepare-specs.mjs). Uses the doc id, which
  // prepare-specs.mjs already made unique.
  const labelCounts = new Map();
  for (let i = 0; i < out.length; i++) {
    const labelMatch = out[i].match(/^\s*label: "(.*)",$/);
    if (labelMatch && out[i - 2]?.includes('type: "doc"')) {
      labelCounts.set(labelMatch[1], (labelCounts.get(labelMatch[1]) ?? 0) + 1);
    }
  }
  const final = [];
  for (let i = 0; i < out.length; i++) {
    final.push(out[i]);
    const idMatch = out[i].match(/^(\s*)id: "(.*)",$/);
    const labelMatch = out[i + 1]?.match(/^\s*label: "(.*)",$/);
    if (
      idMatch &&
      labelMatch &&
      out[i - 1]?.includes('type: "doc"') &&
      (labelCounts.get(labelMatch[1]) ?? 0) > 1 &&
      !out[i + 2]?.trim().startsWith('key:')
    ) {
      const [, indent, id] = idMatch;
      final.push(`${indent}key: "${id}",`);
      totalDocKeys++;
    }
  }

  writeFileSync(path, final.join('\n'));
}

console.log(`fix-sidebar-translation-keys: ${totalCategoryKeys} category key(s), ${totalDocKeys} doc key(s) added`);
