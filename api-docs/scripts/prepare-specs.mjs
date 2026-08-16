#!/usr/bin/env node
/**
 * Prepares the OpenAPI/Postman artifacts kept at the repo root for the site.
 *
 * Two different outputs, on purpose:
 *
 *  1. `static/openapi/` and `static/postman/` — byte-for-byte copies, published
 *     so anyone can download the exact documents this repo versions.
 *  2. `openapi/` — the input `docusaurus-plugin-openapi-docs` actually reads.
 *     Identical to (1) except that every operation is given an explicit
 *     `operationId`.
 *
 * Why (2) exists: the plugin derives a page filename from
 * `kebabCase(operationId ?? summary)` and *skips* an operation whose file
 * already exists. The Kobana specs carry no operationIds and do reuse summaries
 * across resources — "Listar CNABs" is both `GET /v1/discharges` and
 * `GET /v1/remittances`, "Atualizar Caixa Postal" is both
 * `PUT /v2/edi/edi_boxes/{uid}` and `PATCH /v2/mailbox/entries/{uid}` — so
 * seven endpoints silently vanished from the reference. Assigning ids here
 * fixes that without touching the specs, which are generated upstream.
 *
 * The id is built from method+path (`post-data-bank-billet-queries`), not
 * from the summary — a method+path pair is unique by construction (no
 * disambiguation needed) and, unlike a summary, is never translated, so
 * `apply-openapi-translations.mjs` reproduces the exact same id when it
 * rebuilds the en/es copies from this file. The id itself is no longer what
 * the reader sees in the URL (see set-operation-slugs.mjs, which overrides
 * that with the operation's actual path+method) — it only needs to be a
 * stable, collision-free filename.
 *
 * The first operation to claim a slug keeps it, so page URLs stay put; later
 * collisions are suffixed with a counter.
 */

import { copyFileSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const kebabCase = require('lodash/kebabCase.js');

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dirname, '..');
const REPO = resolve(SITE, '..');

const VERBATIM = [
  ['swagger/v1_0/kobana-api-v1_0-openapi-3_1.yaml', 'static/openapi/kobana-api-v1_0-openapi-3_1.yaml'],
  ['swagger/v1_0/kobana-api-v1_0-openapi-3_1.json', 'static/openapi/kobana-api-v1_0-openapi-3_1.json'],
  ['swagger/v2_0/kobana-api-v2_0-openapi-3_1.yaml', 'static/openapi/kobana-api-v2_0-openapi-3_1.yaml'],
  ['swagger/v2_0/kobana-api-v2_0-openapi-3_1.json', 'static/openapi/kobana-api-v2_0-openapi-3_1.json'],
  ['swagger/all-versions/kobana-api-all-versions-openapi-3_1.yaml', 'static/openapi/kobana-api-all-versions-openapi-3_1.yaml'],
  ['swagger/all-versions/kobana-api-all-versions-openapi-3_1.json', 'static/openapi/kobana-api-all-versions-openapi-3_1.json'],
  ['postman/v1_0/kobana-api-v1_0-postman-collection.json', 'static/postman/kobana-api-v1_0-postman-collection.json'],
  ['postman/v2_0/kobana-api-v2_0-postman-collection.json', 'static/postman/kobana-api-v2_0-postman-collection.json'],
  ['postman/all-versions/kobana-api-all-versions-postman-collection.json', 'static/postman/kobana-api-all-versions-postman-collection.json'],
];

const NORMALIZE = [
  ['swagger/v1_0/kobana-api-v1_0-openapi-3_1.json', 'openapi/kobana-api-v1_0.json'],
  ['swagger/v2_0/kobana-api-v2_0-openapi-3_1.json', 'openapi/kobana-api-v2_0.json'],
];

const METHODS = ['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'];

function write(dest, contents) {
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, contents);
}

let copied = 0;
for (const [from, to] of VERBATIM) {
  const src = resolve(REPO, from);
  if (!existsSync(src)) {
    console.error(`missing spec: ${from}`);
    process.exitCode = 1;
    continue;
  }
  const dest = resolve(SITE, to);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  copied++;
}

/** Resource part of a path, minus the version prefix and the parameters. */
function resourceSlug(path) {
  return path
    .split('/')
    .filter((s) => s && !s.startsWith('{') && !/^v\d+$/.test(s))
    .join('-');
}

let assigned = 0;
let disambiguated = 0;

/** Mutates every operation in `doc` to carry a stable, unique operationId. */
function assignOperationIds(doc) {
  const taken = new Set();
  for (const [path, item] of Object.entries(doc.paths ?? {})) {
    for (const method of METHODS) {
      const op = item?.[method];
      if (!op) continue;
      const base = kebabCase(`${method}-${resourceSlug(path)}`);
      let id = base;
      for (let n = 2; taken.has(id); n++) {
        id = kebabCase(`${base}-${n}`);
        disambiguated++;
      }
      taken.add(id);
      op.operationId = id;
      assigned++;
    }
  }
}

for (const [from, to] of NORMALIZE) {
  const src = resolve(REPO, from);
  if (!existsSync(src)) {
    console.error(`missing spec: ${from}`);
    process.exitCode = 1;
    continue;
  }
  const doc = JSON.parse(readFileSync(src, 'utf8'));
  assignOperationIds(doc);
  write(resolve(SITE, to), `${JSON.stringify(doc, null, 1)}\n`);

  // The id depends only on method+path, never on translated text, so it's
  // assigned the exact same way (independently, not copied) on the
  // committed en/es translations — keeping them in sync with whatever the
  // pt doc above just got without needing to re-run the (expensive,
  // AI-translation-dependent) apply-openapi-translations.mjs.
  const version = to.match(/v\d_0/)[0];
  for (const lang of ['en', 'es']) {
    const i18nPath = resolve(SITE, `openapi/i18n/kobana-api-${version}.${lang}.json`);
    if (!existsSync(i18nPath)) continue;
    const i18nDoc = JSON.parse(readFileSync(i18nPath, 'utf8'));
    assignOperationIds(i18nDoc);
    write(i18nPath, `${JSON.stringify(i18nDoc, null, 1)}\n`);
  }
}

console.log(
  `prepare-specs: ${copied}/${VERBATIM.length} copied to static/, ` +
    `${assigned} operationId(s) assigned (${disambiguated} disambiguated)`,
);
