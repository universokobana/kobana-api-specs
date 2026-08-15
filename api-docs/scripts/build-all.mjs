#!/usr/bin/env node
/**
 * Production build: generate the API reference, build the three locales,
 * then the landing page and root llms.txt.
 *
 * Exists because the shell one-liner this replaced could not run on Windows.
 * `rm -rf` and `VAR=x cmd` are POSIX-shell syntax, and npm on Windows runs
 * scripts through cmd.exe — where `BUILD_LOCALE=pt` fails outright. That
 * mattered more than convenience: BUILD_LOCALE is what sets `baseUrl` per
 * locale (docusaurus.config.ts), so a shell that dropped it would emit a site
 * with root-relative links instead of failing loudly.
 *
 *   node scripts/build-all.mjs
 */

import { rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'build');

const LOCALES = [
  { locale: 'pt-BR', baseUrlKey: 'pt' },
  { locale: 'en', baseUrlKey: 'en' },
  { locale: 'es', baseUrlKey: 'es' },
];

function run(command, args, env) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...process.env, ...env },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run('npm', ['run', 'gen-api-docs:all']);
run('node', ['scripts/add-static-indexes.mjs']);

rmSync(OUT, { recursive: true, force: true });

for (const { locale, baseUrlKey } of LOCALES) {
  run('npx', ['docusaurus', 'build', '--locale', locale, '--out-dir', `build/${baseUrlKey}`], {
    BUILD_LOCALE: baseUrlKey,
  });
}

run('node', ['scripts/build-landing.mjs', '--target', 'build']);
run('node', ['scripts/build-root-llms.mjs']);
