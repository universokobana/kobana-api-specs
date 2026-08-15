#!/usr/bin/env node
/**
 * Docusaurus only generates `index.html` for its own routes. Everything
 * under `static/` is copied to the build root byte-for-byte, so a directory
 * like `static/img/guias/` with no index of its own would serve a raw file
 * listing on any static host that does directory autoindex (some prod
 * hosts don't, but local `http-server`/`serve` do — better to not depend on
 * the host's behavior). This drops a minimal noindex-and-redirect page into
 * every directory under `static/` that doesn't already have one.
 *
 * Re-run whenever a new static subdirectory is added (e.g. a new
 * `static/img/guias/<slug>/` for a guide's screenshots).
 */
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const STATIC_DIR = resolve(ROOT, 'static');

const INDEX_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="robots" content="noindex" />
<meta http-equiv="refresh" content="0; url=/" />
<title>Kobana Gateway Bancário</title>
</head>
<body>
<p>Redirecionando para <a href="/">a documentação</a>...</p>
</body>
</html>
`;

let created = 0;

// The `static/` root itself maps to the site root — Docusaurus already
// generates the real homepage `index.html` there, so only subdirectories
// get one of these.
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    const indexPath = join(full, 'index.html');
    if (!existsSync(indexPath)) {
      writeFileSync(indexPath, INDEX_HTML);
      created++;
    }
    walk(full);
  }
}

if (existsSync(STATIC_DIR)) walk(STATIC_DIR);

console.log(`add-static-indexes: ${created} index.html file(s) created`);
