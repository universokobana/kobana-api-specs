#!/usr/bin/env node
/**
 * Splits the deduped string lists from extract-openapi-strings.mjs into
 * translation-sized chunks (target ~12000 chars/chunk so a haiku agent call
 * has room for its own output). Any single string over that budget (a few
 * large embedded markdown tables of event/error codes) gets its own solo
 * chunk instead of blowing out its neighbors.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const BUDGET = 30000;

const outDir = resolve(ROOT, 'scripts/.openapi-chunks');
mkdirSync(outDir, { recursive: true });

let totalChunks = 0;
for (const version of ['v1_0', 'v2_0']) {
  const strings = JSON.parse(readFileSync(resolve(ROOT, `scripts/.openapi-strings-${version}.json`), 'utf8'));
  const chunks = [];
  let current = [];
  let currentLen = 0;
  for (const s of strings) {
    if (s.length > BUDGET) {
      if (current.length) { chunks.push(current); current = []; currentLen = 0; }
      chunks.push([s]);
      continue;
    }
    if (currentLen + s.length > BUDGET && current.length) {
      chunks.push(current);
      current = [];
      currentLen = 0;
    }
    current.push(s);
    currentLen += s.length;
  }
  if (current.length) chunks.push(current);

  chunks.forEach((chunk, i) => {
    const file = resolve(outDir, `${version}.${String(i).padStart(3, '0')}.json`);
    writeFileSync(file, JSON.stringify(chunk, null, 1));
  });
  console.log(`${version}: ${strings.length} strings -> ${chunks.length} chunks`);
  totalChunks += chunks.length;
}
console.log(`total chunks: ${totalChunks}`);
