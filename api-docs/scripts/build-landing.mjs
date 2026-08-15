#!/usr/bin/env node
/**
 * Materializes the locale-picker landing page as a static dir.
 *
 * Default target: build-landing/ (used by the per-locale dev preview).
 * With `--target <dir>` (e.g. --target build), writes the landing as the
 * root index.html of the production build, alongside the per-locale
 * subdirs the main `build` script produces.
 */

import { mkdirSync, copyFileSync, existsSync, rmSync, cpSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'landing.html');
const STATIC_DIR = resolve(ROOT, 'static');

function parseTarget() {
  const idx = process.argv.indexOf('--target');
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1];
  return 'build-landing';
}

const TARGET = parseTarget();
const OUT = resolve(ROOT, TARGET);
const STANDALONE = TARGET === 'build-landing';

if (!existsSync(SRC)) {
  console.error(`landing source not found: ${SRC}`);
  process.exit(1);
}

if (STANDALONE && existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

copyFileSync(SRC, join(OUT, 'index.html'));

// Standalone dev build needs /img assets sitting next to the picker so
// the favicon resolves. The combined production build already ships
// /pt/img, /en/img, /es/img — we still drop a copy at /img so the
// landing's favicon link works without crossing locales.
const imgSrc = join(STATIC_DIR, 'img');
if (existsSync(imgSrc)) {
  cpSync(imgSrc, join(OUT, 'img'), { recursive: true });
}

console.log(`landing built at ${OUT}`);
