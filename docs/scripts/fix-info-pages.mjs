#!/usr/bin/env node
/**
 * Post-processes the `*.info.mdx` pages produced by
 * docusaurus-plugin-openapi-docs, once per API version.
 *
 * Two things the generator cannot know:
 *
 *  1. The page should own the version root (`/api/v1`, `/api/v2`) rather than
 *     sit at `/api/v1/kobana-api-v-1-0`. Everything that links to "the API
 *     reference" — the navbar, the footer, the home page — points at the root.
 *  2. Its sidebar label is a hardcoded English "Introduction".
 *
 * Run after `docusaurus gen-api-docs all`.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const VERSIONS = ['v1', 'v2'];
const SIDEBAR_LABEL = 'Introdução';

let changed = 0;
for (const version of VERSIONS) {
  const dir = join(ROOT, 'docs', 'api', version);
  if (!existsSync(dir)) {
    console.error(`missing ${dir} — run "docusaurus gen-api-docs all" first`);
    process.exitCode = 1;
    continue;
  }
  const info = readdirSync(dir).find((f) => f.endsWith('.info.mdx'));
  if (!info) {
    console.error(`no *.info.mdx in docs/api/${version}`);
    process.exitCode = 1;
    continue;
  }
  const path = join(dir, info);
  const src = readFileSync(path, 'utf8');
  let out = src;
  if (!new RegExp(`^slug:\\s*/api/${version}\\s*$`, 'm').test(out)) {
    out = out.replace(/^(id:\s*[^\n]+)$/m, `$1\nslug: /api/${version}`);
  }
  out = out.replace(/^sidebar_label:.*$/m, `sidebar_label: ${SIDEBAR_LABEL}`);
  if (out === src) continue;
  writeFileSync(path, out);
  changed++;
  console.log(`fixed: docs/api/${version}/${info}`);
}

if (!changed) console.log('info pages already up to date');
