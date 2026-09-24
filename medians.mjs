import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = process.argv[2];
if (!dir) throw new Error('Usage: node medians.mjs <report-directory>');
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];
const groups = {};
for (const file of (await readdir(dir)).filter(f => f.endsWith('.report.json')).sort()) {
  const report = JSON.parse(await readFile(join(dir, file), 'utf8'));
  const group = file.replace(/-\d+\.report\.json$/, '');
  if (report.runtimeError) throw new Error(`${file}: ${report.runtimeError.message}`);
  for (const id of CATEGORIES) {
    const score = report.categories?.[id]?.score;
    if (!Number.isFinite(score)) throw new Error(`${file}: ${id} has no score`);
    // Scores are stored with two decimals: rounding × 100 removes float noise, never rounds up.
    ((groups[group] ??= {})[id] ??= []).push(Math.round(score * 100));
  }
}
if (!Object.keys(groups).length) throw new Error(`${dir}: no reports`);
for (const [group, categories] of Object.entries(groups)) {
  for (const [id, scores] of Object.entries(categories)) {
    scores.sort((a, b) => a - b);
    if (scores.length !== 3) throw new Error(`${group}: ${scores.length} runs, expected 3`);
    console.log(`${group} ${id}: median ${scores[1]} [${scores[0]}–${scores[2]}]`);
  }
}
