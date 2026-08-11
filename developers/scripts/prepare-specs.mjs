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
 * The first operation to claim a slug keeps it, so page URLs stay put; later
 * collisions are suffixed with their resource path (`listar-cnabs-remittances`).
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
for (const [from, to] of NORMALIZE) {
  const src = resolve(REPO, from);
  if (!existsSync(src)) {
    console.error(`missing spec: ${from}`);
    process.exitCode = 1;
    continue;
  }
  const doc = JSON.parse(readFileSync(src, 'utf8'));
  const taken = new Set();
  for (const [path, item] of Object.entries(doc.paths ?? {})) {
    for (const method of METHODS) {
      const op = item?.[method];
      if (!op) continue;
      const base = kebabCase(op.operationId ?? op.summary ?? `${method}-${path}`);
      let id = base;
      if (taken.has(id)) {
        id = kebabCase(`${base}-${resourceSlug(path)}`);
        if (taken.has(id)) id = kebabCase(`${id}-${method}`);
        for (let n = 2; taken.has(id); n++) id = kebabCase(`${base}-${resourceSlug(path)}-${n}`);
        disambiguated++;
      }
      taken.add(id);
      op.operationId = id;
      assigned++;
    }
  }
  write(resolve(SITE, to), `${JSON.stringify(doc, null, 1)}\n`);
}

console.log(
  `prepare-specs: ${copied}/${VERBATIM.length} copied to static/, ` +
    `${assigned} operationId(s) assigned (${disambiguated} disambiguated)`,
);
