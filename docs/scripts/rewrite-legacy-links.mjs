#!/usr/bin/env node
/**
 * Rewrites readme.com URLs that are baked into the OpenAPI documents.
 *
 * The specs at the repo root were authored while the docs lived on
 * readme.com, so a few operation descriptions link to `/reference/<slug>` —
 * sometimes bare, sometimes fully qualified as
 * `https://developers.kobana.com.br/reference/<slug>`. The bare ones do not
 * exist here and Docusaurus fails the build on them; the qualified ones point
 * at a portal this site replaces. Editing the specs is not an option — they
 * are regenerated upstream — so the fix belongs to the generated pages.
 *
 * Two kinds of slug are resolved:
 *
 *  - conceptual pages (`/reference/webhooks`), from the table below, which is
 *    the same mapping the client-redirects plugin uses;
 *  - endpoint pages (`/reference/get_v1-bank-billet-batch-exports-id`), by
 *    rebuilding readme's slug (`<method>_<path with / and _ as ->`, braces
 *    dropped) for every operation and pairing it with the page the plugin
 *    generates for that operation (`kebabCase(operationId)`, which
 *    `prepare-specs` has already made unique).
 *
 * Anything still unresolved falls back to that version's reference index, and
 * is reported — a link that lands on the index beats a build that fails or a
 * 404 in the reader's face.
 *
 * Run after `docusaurus gen-api-docs all`.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const kebabCase = require('lodash/kebabCase.js');

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const CONCEPTUAL = {
  'visao-geral': '/api/visao-geral',
  'especificações': '/api/especificacoes',
  'endpoints-1': '/api/endpoints',
  'user-agent': '/api/user-agent',
  'limite-de-requisições': '/api/limite-de-requisicoes',
  autenticacao: '/api/autenticacao',
  'token-de-acesso': '/api/autenticacao/token-de-acesso',
  'authorization-flow': '/api/autenticacao/authorization-flow',
  'client-credentials-flow': '/api/autenticacao/client-credentials-flow',
  'permissões': '/api/autenticacao/permissoes',
  'idempotência': '/api/idempotencia',
  'postman-collection': '/api/postman',
  'bancos-suportados': '/api/bancos',
  erros: '/api/erros',
  pix: '/api/pix',
  webhooks: '/api/webhooks',
  eventos: '/api/webhooks/eventos',
  'configuração': '/api/webhooks/configuracao',
  'notificações': '/api/webhooks/notificacoes',
  'segurança': '/api/webhooks/seguranca',
  payloads: '/api/webhooks/payloads',
};

const VERSIONS = [
  { version: 'v1', spec: 'openapi/kobana-api-v1_0.json' },
  { version: 'v2', spec: 'openapi/kobana-api-v2_0.json' },
];

const METHODS = ['get', 'post', 'put', 'patch', 'delete'];

/** readme.com's slug for an operation: `get_v1-bank-billets-id`. */
function readmeSlug(method, path) {
  const tail = path
    .replace(/^\//, '')
    .replace(/[{}]/g, '')
    .replace(/[/_]/g, '-');
  return `${method}_${tail}`;
}

const routes = new Map(Object.entries(CONCEPTUAL));

for (const { version, spec } of VERSIONS) {
  const specPath = resolve(ROOT, spec);
  if (!existsSync(specPath)) {
    console.error(`missing ${spec} — run "npm run prepare-specs" first`);
    process.exitCode = 1;
    continue;
  }
  const doc = JSON.parse(readFileSync(specPath, 'utf8'));
  for (const [path, item] of Object.entries(doc.paths ?? {})) {
    for (const method of METHODS) {
      const op = item[method];
      if (!op?.operationId) continue;
      routes.set(readmeSlug(method, path), `/api/${version}/${kebabCase(op.operationId)}`);
    }
  }
}

const LINK_RE = /(?:https?:\/\/developers\.kobana\.com\.br)?\/reference\/([A-Za-z0-9_%À-ɏ-]+)/g;

function resolveSlug(raw) {
  const slug = decodeURIComponent(raw);
  if (routes.has(slug)) return routes.get(slug);
  // readme appends `-1`, `-2`… when a slug is taken; strip it and retry.
  const stripped = slug.replace(/-\d+$/, '');
  if (routes.has(stripped)) return routes.get(stripped);
  if (/^\w+_v2-/.test(slug)) return '/api/v2';
  if (/^\w+_v1-/.test(slug)) return '/api/v1';
  return null;
}

let files = 0;
let rewritten = 0;
const unresolved = new Set();

for (const { version } of VERSIONS) {
  const dir = join(ROOT, 'docs', 'api', version);
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir)) {
    // `.json` too: the plugin externalises parameter and status-code
    // descriptions into sidecar files, and some of those carry the links.
    if (!file.endsWith('.mdx') && !file.endsWith('.json')) continue;
    const path = join(dir, file);
    const src = readFileSync(path, 'utf8');
    if (!src.includes('/reference/')) continue;
    const out = src.replace(LINK_RE, (match, slug) => {
      const route = resolveSlug(slug);
      if (!route) {
        unresolved.add(slug);
        return match;
      }
      rewritten++;
      return route;
    });
    if (out === src) continue;
    writeFileSync(path, out);
    files++;
  }
}

console.log(`rewrite-legacy-links: ${rewritten} link(s) across ${files} file(s)`);
for (const slug of unresolved) console.log(`  unresolved: /reference/${slug}`);
