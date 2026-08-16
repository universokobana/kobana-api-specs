#!/usr/bin/env node
/**
 * Drops operations that are deprecated/discontinued upstream but still
 * present in the OpenAPI documents, so their generated pages don't show up
 * in the reference. The spec itself isn't edited (it's regenerated
 * upstream) — this just deletes the generated output and strips the
 * sidebar entry after `docusaurus gen-api-docs all` runs.
 *
 * Add an operationId to REMOVE_OPERATION_IDS to drop another one later.
 */
import { readdirSync, readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const REMOVE_OPERATION_IDS = ['get-userinfo'];

const VERSION_DIRS = [
  'docs/api/v1',
  'docs/api/v2',
  'i18n/en/docusaurus-plugin-content-docs/current/api/v1',
  'i18n/en/docusaurus-plugin-content-docs/current/api/v2',
  'i18n/es/docusaurus-plugin-content-docs/current/api/v1',
  'i18n/es/docusaurus-plugin-content-docs/current/api/v2',
];

let filesDeleted = 0;
let sidebarsChanged = 0;

for (const rel of VERSION_DIRS) {
  const dir = resolve(ROOT, rel);
  if (!existsSync(dir)) continue;

  for (const id of REMOVE_OPERATION_IDS) {
    for (const file of readdirSync(dir)) {
      if (file.startsWith(`${id}.`)) {
        unlinkSync(join(dir, file));
        filesDeleted++;
      }
    }
  }

  const sidebarPath = join(dir, 'sidebar.ts');
  if (!existsSync(sidebarPath)) continue;
  const src = readFileSync(sidebarPath, 'utf8');

  // Drop any category whose only doc item is one of the removed ids, and any
  // standalone doc item for one of the removed ids sitting in a category
  // with siblings. Both are line-range deletes keyed off the `id: "..."`
  // line, since the generated file is flat, predictable JS-object literal
  // text (see fix-sidebar-translation-keys.mjs for the same approach).
  const lines = src.split('\n');
  // i18n sidebar.ts files still carry their `<locale>/docusaurus-plugin-…`
  // id prefix at this point in the pipeline (fix-i18n-sidebar-ids.mjs, which
  // strips it, runs after this script) — match on the operationId suffix
  // regardless of what comes before it.
  const idLineRe = new RegExp(`id: ".*/(${REMOVE_OPERATION_IDS.join('|')})",$`);

  // Pass 1: find every range of lines to drop, without mutating anything —
  // computing a range needs to look both behind and ahead of the matching
  // `id:` line, so ranges can't be decided mid-way through a single forward
  // pass over the output.
  const deleteRanges = [];
  for (let i = 0; i < lines.length; i++) {
    if (!idLineRe.test(lines[i].trim())) continue;

    // Walk outward from the `id:` line to the enclosing `{ ... },` doc-item
    // object, then check whether that object is the sole entry in its
    // parent category's `items: [ ... ]` — if so, drop the whole category.
    let itemStart = i;
    while (itemStart > 0 && lines[itemStart].trim() !== '{') itemStart--;
    let itemEnd = i;
    while (itemEnd < lines.length && lines[itemEnd].trim() !== '},') itemEnd++;

    let categoryStart = itemStart;
    while (categoryStart > 0 && !lines[categoryStart].includes('items: [')) categoryStart--;
    const isSoleItem = lines[categoryStart].trim() === 'items: [' && lines[itemEnd + 1]?.trim() === '],';

    if (isSoleItem) {
      let catObjStart = categoryStart;
      while (catObjStart > 0 && lines[catObjStart].trim() !== '{') catObjStart--;
      let catObjEnd = itemEnd + 1; // the `],` closing items
      while (catObjEnd < lines.length && lines[catObjEnd].trim() !== '},') catObjEnd++;
      deleteRanges.push([catObjStart, catObjEnd]);
    } else {
      deleteRanges.push([itemStart, itemEnd]);
    }
  }

  // Pass 2: emit every line whose index doesn't fall inside a deleted range.
  const out = lines.filter((_, i) => !deleteRanges.some(([start, end]) => i >= start && i <= end));
  const next = out.join('\n');
  if (next !== src) {
    writeFileSync(sidebarPath, next);
    sidebarsChanged++;
  }
}

console.log(`remove-deprecated-operations: ${filesDeleted} file(s) deleted, ${sidebarsChanged} sidebar(s) updated`);
