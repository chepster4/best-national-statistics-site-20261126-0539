// main.ts — program penyerahan entry STATIS (Node 22, standard library only).
//
// Situsnya ada di app/ (file statis, tanpa build step, tanpa network), dan
// tangkapan layarnya ada di screenshots/. Program ini menyalin keduanya ke
// /output lalu menulis /output/dossier.json dengan buildDossier dari
// vendor/makefun-frontend.ts — salinan kit yang tidak diubah. Di luar
// kontainer grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Bersihkan hasil run sebelumnya dulu: tanpa ini, file yang sudah dihapus dari
// repo akan tertinggal di /output dan membuat dua run menulis byte yang beda.
mkdirSync(out, { recursive: true });
for (const name of ['app', 'screenshots', 'dossier.json']) {
  const target = join(out, name);
  if (existsSync(target)) rmSync(target, { recursive: true, force: true });
}
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Batas yang sama dengan yang dipakai scorer: teks dossier maks 160 KiB,
// maks 4 screenshot @ 256 KiB, app/ maks 993 entri dan 16 MiB.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
