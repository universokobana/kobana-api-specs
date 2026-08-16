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
 *    dropped) for every operation and pairing it with that operation's own
 *    page URL (`/api/v2/<path>/<method>` — see set-operation-slugs.mjs,
 *    which overrides the same operations' pages with this exact URL).
 *
 * Anything still unresolved falls back to that version's reference index, and
 * is reported — a link that lands on the index beats a build that fails or a
 * 404 in the reader's face.
 *
 * Run after `docusaurus gen-api-docs all`.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const CONCEPTUAL = {
  'visao-geral': '/api/overview/introduction',
  'especificações': '/api/overview/openapi',
  'endpoints-1': '/api/overview/endpoints',
  'user-agent': '/api/overview/user-agent',
  'limite-de-requisições': '/api/overview/rate-limit',
  autenticacao: '/api/overview/authentication',
  'token-de-acesso': '/api/overview/authentication/access-token',
  'authorization-flow': '/api/overview/authentication/authorization-flow',
  'client-credentials-flow': '/api/overview/authentication/client-credentials-flow',
  'permissões': '/api/overview/authentication/permissions',
  'idempotência': '/api/overview/idempotency',
  'postman-collection': '/api/overview/postman',
  'bancos-suportados': '/api/bancos',
  erros: '/api/overview/errors',
  webhooks: '/api/overview/webhooks',
  eventos: '/api/overview/webhooks/events',
  'configuração': '/api/overview/webhooks/configuration',
  'notificações': '/api/overview/webhooks/notifications',
  'segurança': '/api/overview/webhooks/security',
  payloads: '/api/overview/webhooks/payloads',
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

/** Mirrors set-operation-slugs.mjs's operationSlug — keep both in sync. */
function operationSlug(version, path, method) {
  const segments = path
    .replace(/^\/v\d+/, '')
    .split('/')
    .filter(Boolean)
    .map((s) => (s.startsWith('{') && s.endsWith('}') ? `_${s.slice(1, -1)}` : s));
  return `/api/${version}/${segments.join('/')}/${method}`;
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
      routes.set(readmeSlug(method, path), operationSlug(version, path, method));
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

const API_DIRS = [
  (v) => join(ROOT, 'docs', 'api', v),
  ...['en', 'es'].map((locale) => (v) =>
    join(ROOT, 'i18n', locale, 'docusaurus-plugin-content-docs', 'current', 'api', v),
  ),
];

for (const { version } of VERSIONS) {
  for (const dirFor of API_DIRS) {
  const dir = dirFor(version);
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
}

console.log(`rewrite-legacy-links: ${rewritten} link(s) across ${files} file(s)`);
for (const slug of unresolved) console.log(`  unresolved: /reference/${slug}`);
