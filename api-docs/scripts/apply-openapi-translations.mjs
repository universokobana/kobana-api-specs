#!/usr/bin/env node
/**
 * Reassembles translated OpenAPI specs from the chunk translations produced
 * by the haiku agents (see extract-openapi-strings.mjs,
 * chunk-openapi-strings.mjs, and the `translate openapi vX chunk NNN to
 * <lang>` agent runs).
 *
 * For each version and language: concatenates all `vX_0.NNN.<lang>.json`
 * chunk files in chunk order to rebuild the same ordered unique-string list
 * extract-openapi-strings.mjs produced, zips it against the original
 * `.openapi-strings-vX_0.json` list to build a pt-string -> translated-string
 * map, then walks the original normalized spec (openapi/kobana-api-vX_0.json)
 * substituting every `summary`/`description` value through that map. Strings
 * with no translation (chunk not produced) are left in Portuguese and logged.
 *
 * Writes openapi/i18n/kobana-api-vX_0.<lang>.json.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CHUNKS_DIR = resolve(ROOT, 'scripts/.openapi-chunks');
const OUT_DIR = resolve(ROOT, 'openapi/i18n');

const TRANSLATABLE_KEYS = new Set(['summary', 'description']);

function chunkIndexes(version) {
  return readdirSync(CHUNKS_DIR)
    .filter((f) => f.startsWith(`${version}.`) && /^\d+\.json$/.test(f.slice(version.length + 1)))
    .map((f) => f.slice(version.length + 1, -'.json'.length))
    .sort();
}

function buildMap(version, lang) {
  const original = JSON.parse(readFileSync(resolve(ROOT, `scripts/.openapi-strings-${version}.json`), 'utf8'));
  const translated = [];
  for (const idx of chunkIndexes(version)) {
    const file = resolve(CHUNKS_DIR, `${version}.${idx}.${lang}.json`);
    const chunk = JSON.parse(readFileSync(file, 'utf8'));
    translated.push(...chunk);
  }
  if (translated.length !== original.length) {
    throw new Error(
      `${version}/${lang}: expected ${original.length} translated strings, got ${translated.length} — a chunk is missing or mismatched`,
    );
  }
  const map = new Map();
  original.forEach((pt, i) => map.set(pt, translated[i]));
  return map;
}

function applyTranslations(doc, map) {
  let missing = 0;
  function visit(node) {
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        if (TRANSLATABLE_KEYS.has(k) && typeof v === 'string' && v.trim()) {
          if (map.has(v)) {
            node[k] = map.get(v);
          } else {
            missing++;
          }
        } else {
          visit(v);
        }
      }
    }
  }
  visit(doc);
  return missing;
}

mkdirSync(OUT_DIR, { recursive: true });

for (const version of ['v1_0', 'v2_0']) {
  for (const lang of ['en', 'es']) {
    const map = buildMap(version, lang);
    const doc = JSON.parse(readFileSync(resolve(ROOT, `openapi/kobana-api-${version}.json`), 'utf8'));
    const missing = applyTranslations(doc, map);
    const out = resolve(OUT_DIR, `kobana-api-${version}.${lang}.json`);
    writeFileSync(out, `${JSON.stringify(doc, null, 1)}\n`);
    console.log(`${version}/${lang}: wrote ${out}${missing ? ` (${missing} strings left untranslated)` : ''}`);
  }
}
