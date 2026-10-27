#!/usr/bin/env node
/**
 * Writes the English and Spanish OpenAPI specs next to each Portuguese one:
 *
 *   swagger/v2_0/kobana-api-v2_0-openapi-3_1.json      (pt, pushed by kobana-app)
 *   swagger/v2_0/kobana-api-v2_0-openapi-3_1.en.json   (written here)
 *   swagger/v2_0/kobana-api-v2_0-openapi-3_1.es.json   (written here)
 *
 * A translated spec is the Portuguese one with every `summary` and
 * `description` swapped for its translation in `i18n/<lang>.json`, a
 * translation memory keyed by the Portuguese text. Nothing else changes, so
 * the three files always describe the same operations, parameters and
 * schemas — the docs and the CLI generate one locale from each file.
 *
 * Text the memory does not know yet stays in Portuguese and is reported:
 *
 *   node scripts/translate-specs.mjs                     # write the specs
 *   node scripts/translate-specs.mjs --missing out.json  # also list the gaps
 *   node scripts/translate-specs.mjs --merge in.json     # add translations first
 *
 * `--missing` writes `{ "en": ["texto", ...], "es": [...] }`; `--merge` reads
 * `{ "en": { "texto": "text" }, "es": { ... } }`. The translate-specs workflow
 * uses the pair to fill the gaps after each spec update. The memory is pruned
 * to the texts the specs still use.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const VERSIONS = ['v1_0', 'v2_0'];
const LANGS = ['en', 'es'];
const TEXT_KEYS = new Set(['summary', 'description']);

const args = process.argv.slice(2);
const option = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const writeJson = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
const memoryPath = (lang) => resolve(ROOT, `i18n/${lang}.json`);
const specPath = (version, lang) =>
  resolve(ROOT, `swagger/${version}/kobana-api-${version}-openapi-3_1${lang ? `.${lang}` : ''}.json`);

/** Calls `fn` with every translatable text node: (parent object, key). */
function eachText(node, fn) {
  if (Array.isArray(node)) {
    for (const item of node) eachText(item, fn);
  } else if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (TEXT_KEYS.has(key) && typeof value === 'string') {
        if (value.trim()) fn(node, key);
      } else {
        eachText(value, fn);
      }
    }
  }
}

const memory = Object.fromEntries(
  LANGS.map((lang) => [lang, existsSync(memoryPath(lang)) ? readJson(memoryPath(lang)) : {}]),
);

const merge = option('--merge');
if (merge) {
  const incoming = readJson(merge);
  for (const lang of LANGS) {
    for (const [pt, text] of Object.entries(incoming[lang] ?? {})) {
      if (typeof text === 'string' && text.trim()) memory[lang][pt] = text;
    }
  }
}

const used = Object.fromEntries(LANGS.map((lang) => [lang, new Set()]));
const missing = Object.fromEntries(LANGS.map((lang) => [lang, new Set()]));

for (const version of VERSIONS) {
  const source = readFileSync(specPath(version), 'utf8');
  for (const lang of LANGS) {
    const doc = JSON.parse(source);
    let total = 0;
    let translated = 0;
    eachText(doc, (node, key) => {
      const pt = node[key];
      total++;
      used[lang].add(pt);
      if (pt in memory[lang]) {
        node[key] = memory[lang][pt];
        translated++;
      } else {
        missing[lang].add(pt);
      }
    });
    writeJson(specPath(version, lang), doc);
    console.log(`${version}.${lang}: ${translated}/${total} texts translated`);
  }
}

for (const lang of LANGS) {
  const kept = Object.keys(memory[lang])
    .filter((pt) => used[lang].has(pt))
    .sort()
    .map((pt) => [pt, memory[lang][pt]]);
  writeJson(memoryPath(lang), Object.fromEntries(kept));
  console.log(`i18n/${lang}.json: ${kept.length} entries, ${missing[lang].size} texts still in Portuguese`);
}

const missingOut = option('--missing');
if (missingOut) {
  writeJson(missingOut, Object.fromEntries(LANGS.map((lang) => [lang, [...missing[lang]]])));
}
