#!/usr/bin/env node
/**
 * Overrides each generated operation page's URL to mirror the API's own
 * path and method (`/api/v2/data/bank_billet_queries/post`) instead of the
 * readable-but-arbitrary slug `docusaurus-plugin-openapi-docs` derives from
 * `operationId` by default (`/api/v2/create-a-bank-billet-query`).
 *
 * Injects a `slug:` front-matter line into every generated `*.api.mdx`,
 * computed straight from that operation's path+method in the locale's own
 * spec. The generated `id:` (and so the physical filename) is left alone —
 * it's only used internally for sidebar linking, and prepare-specs.mjs
 * already keeps it a stable, collision-free method+path-based string, so it
 * still uniquely maps back to the file here.
 *
 * Since path+method is never translated, the slug is identical in every
 * locale without any extra syncing.
 *
 * Run after `docusaurus gen-api-docs all`.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const METHODS = ['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'];

const TARGETS = [
  { urlVersion: 'v1', spec: 'openapi/kobana-api-v1_0.json', dir: 'docs/api/v1' },
  { urlVersion: 'v2', spec: 'openapi/kobana-api-v2_0.json', dir: 'docs/api/v2' },
  {
    urlVersion: 'v1',
    spec: 'openapi/i18n/kobana-api-v1_0.en.json',
    dir: 'i18n/en/docusaurus-plugin-content-docs/current/api/v1',
  },
  {
    urlVersion: 'v2',
    spec: 'openapi/i18n/kobana-api-v2_0.en.json',
    dir: 'i18n/en/docusaurus-plugin-content-docs/current/api/v2',
  },
  {
    urlVersion: 'v1',
    spec: 'openapi/i18n/kobana-api-v1_0.es.json',
    dir: 'i18n/es/docusaurus-plugin-content-docs/current/api/v1',
  },
  {
    urlVersion: 'v2',
    spec: 'openapi/i18n/kobana-api-v2_0.es.json',
    dir: 'i18n/es/docusaurus-plugin-content-docs/current/api/v2',
  },
];

/**
 * `/v2/financial/accounts/{account_uid}/syncs/{uid}`, get ->
 * `/api/v2/financial/accounts/_account_uid/syncs/_uid/get`. Every path
 * param stays (dropping one — e.g. a parent-scoping id in the middle of the
 * path — would make the URL stop matching the real API call, and risks two
 * different operations colliding on the same page). `{name}` becomes
 * `_name` rather than staying `{name}` so the URL doesn't carry raw braces
 * (which the browser would percent-encode into `%7Bname%7D`).
 */
function operationSlug(urlVersion, path, method) {
  const segments = path
    .replace(/^\/v\d+/, '')
    .split('/')
    .filter(Boolean)
    .map((s) => (s.startsWith('{') && s.endsWith('}') ? `_${s.slice(1, -1)}` : s));
  return `/api/${urlVersion}/${segments.join('/')}/${method}`;
}

let changed = 0;
for (const { urlVersion, spec, dir } of TARGETS) {
  const specPath = resolve(ROOT, spec);
  const dirPath = resolve(ROOT, dir);
  if (!existsSync(specPath) || !existsSync(dirPath)) continue;
  const doc = JSON.parse(readFileSync(specPath, 'utf8'));

  const idToSlug = new Map();
  const slugToId = new Map();
  for (const [path, item] of Object.entries(doc.paths ?? {})) {
    for (const method of METHODS) {
      const op = item?.[method];
      if (!op?.operationId) continue;
      const slug = operationSlug(urlVersion, path, method);
      const prior = slugToId.get(slug);
      if (prior && prior !== op.operationId) {
        throw new Error(
          `set-operation-slugs (${spec}): "${slug}" would serve both "${prior}" and "${op.operationId}" ` +
            `(${method.toUpperCase()} ${path}) — two operations collide once path params are stripped.`,
        );
      }
      slugToId.set(slug, op.operationId);
      idToSlug.set(op.operationId, slug);
    }
  }

  for (const file of readdirSync(dirPath)) {
    if (!file.endsWith('.api.mdx')) continue;
    const slug = idToSlug.get(file.slice(0, -'.api.mdx'.length));
    if (!slug) continue;
    const filePath = join(dirPath, file);
    const src = readFileSync(filePath, 'utf8');
    if (/^slug: /m.test(src)) continue; // already set by a previous run
    const next = src.replace(/^(id: .*)$/m, `$1\nslug: "${slug}"`);
    if (next === src) continue;
    writeFileSync(filePath, next);
    changed++;
  }
}

console.log(`set-operation-slugs: ${changed} page(s) updated`);
