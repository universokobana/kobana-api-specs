#!/usr/bin/env node
/**
 * The OpenAPI Docusaurus plugin emits sidebar.ts using paths relative to the
 * configured outputDir. For i18n outputDirs that path includes the
 * `i18n/<locale>/docusaurus-plugin-content-docs/current/` prefix, which is
 * NOT a valid Docusaurus doc id at runtime — docs resolve from the locale's
 * `current/` root, so the id must start at `api/v1/` (or `api/v2/`).
 *
 * Strips the prefix from every `id: "..."` in EN/ES sidebar.ts files, for
 * both API versions. Tag names are already translated inside the source
 * spec (see translate-openapi.mjs), so category labels need no rewriting
 * here.
 *
 * Run after `gen-api-docs:all`.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const TARGETS = ['en', 'es'].flatMap((locale) =>
  ['v1', 'v2'].map((version) => ({
    file: `i18n/${locale}/docusaurus-plugin-content-docs/current/api/${version}/sidebar.ts`,
    prefix: `${locale}/docusaurus-plugin-content-docs/current/`,
  })),
);

let changed = 0;
for (const { file, prefix } of TARGETS) {
  const path = resolve(ROOT, file);
  if (!existsSync(path)) continue;
  const raw = readFileSync(path, 'utf8');
  const next = raw.replaceAll(`id: "${prefix}`, 'id: "');
  if (next !== raw) {
    writeFileSync(path, next);
    console.log(`fixed sidebar ids: ${file}`);
    changed++;
  }
}

if (changed === 0) console.log('fix-i18n-sidebar-ids: no changes');
