#!/usr/bin/env node
/**
 * Walks openapi/kobana-api-v{1,2}_0.json and collects every translatable
 * string (operation `summary`/`description`, parameter/schema `description`,
 * tag `description`, root `info.description`) into a deduped list. Written
 * to scratch JSON files that scripts/apply-openapi-translations.mjs reads
 * back in to reassemble locale-specific specs.
 *
 * `info.title` and tag `name` are deliberately excluded — they double as
 * stable identifiers (page filenames, sidebar category keys / operation
 * grouping) across locales, so translating them would require remapping
 * every operation's `tags` array too. Left in Portuguese on purpose.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const TRANSLATABLE_KEYS = new Set(['summary', 'description']);

function extract(doc) {
  const strings = new Map(); // text -> index
  const order = [];

  function visit(node, keyHint) {
    if (Array.isArray(node)) {
      for (const item of node) visit(item, keyHint);
      return;
    }
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        if (TRANSLATABLE_KEYS.has(k) && typeof v === 'string' && v.trim()) {
          if (!strings.has(v)) {
            strings.set(v, order.length);
            order.push(v);
          }
        } else {
          visit(v, k);
        }
      }
    }
  }

  visit(doc);
  return order;
}

for (const version of ['v1_0', 'v2_0']) {
  const src = resolve(ROOT, `openapi/kobana-api-${version}.json`);
  const doc = JSON.parse(readFileSync(src, 'utf8'));
  const strings = extract(doc);
  const out = resolve(ROOT, `scripts/.openapi-strings-${version}.json`);
  writeFileSync(out, JSON.stringify(strings, null, 1));
  console.log(`${version}: ${strings.length} unique strings -> ${out}`);
}
