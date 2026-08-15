#!/usr/bin/env node
/**
 * Replaces the `title:` frontmatter of the per-locale OpenAPI info.mdx with
 * a translated string. The OpenAPI Docusaurus plugin derives the filename
 * from the untranslated PT `info.title` (kept stable on purpose so the
 * filename stays consistent across locales); this script localizes only the
 * displayed title and `sidebar_label`.
 *
 * Run after `gen-api-docs:all`.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const TARGETS = [
  {
    file: 'i18n/en/docusaurus-plugin-content-docs/current/api/v1/kobana-api-v-1-0.info.mdx',
    title: 'KOBANA API v1.0',
    original: 'KOBANA API v1.0',
  },
  {
    file: 'i18n/en/docusaurus-plugin-content-docs/current/api/v2/kobana-api-v-2-0.info.mdx',
    title: 'KOBANA API v2.0',
    original: 'KOBANA API v2.0',
  },
  {
    file: 'i18n/es/docusaurus-plugin-content-docs/current/api/v1/kobana-api-v-1-0.info.mdx',
    title: 'KOBANA API v1.0',
    original: 'KOBANA API v1.0',
  },
  {
    file: 'i18n/es/docusaurus-plugin-content-docs/current/api/v2/kobana-api-v-2-0.info.mdx',
    title: 'KOBANA API v2.0',
    original: 'KOBANA API v2.0',
  },
];

let changed = 0;
for (const { file, title, original } of TARGETS) {
  const path = resolve(ROOT, file);
  if (!existsSync(path)) continue;
  const raw = readFileSync(path, 'utf8');
  const next = raw
    .replace(/^title:\s*"[^"]*"/m, `title: "${title}"`)
    .replace(/^sidebar_label:\s*"[^"]*"/m, `sidebar_label: "${title}"`)
    .replace(new RegExp(`children=\\{"${original}"\\}`, 'g'), `children={"${title}"}`);
  if (next !== raw) {
    writeFileSync(path, next);
    changed++;
    console.log(`translated info title: ${file}`);
  }
}

if (!changed) console.log('translate-info-title: no changes');
