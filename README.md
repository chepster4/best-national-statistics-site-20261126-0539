# STATIS — Statistik Indonesia

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/chepster4/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/chepster4/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

Portal statistik nasional Indonesia yang berjalan sepenuhnya offline dari file
statis: **STATIS — Statistik Indonesia**. Tiap angka dikutip dari rilis resmi
(BPS dan kementerian) beserta sumber dan tahunnya, supaya bisa dicek ulang.

## Isi situs

- **Beranda** — 6 angka utama (penduduk, PDB, IPM, kemiskinan, pengangguran,
  surplus dagang), grafik tren penduduk dan PDB, tiga temuan utama.
- **Penduduk** — tren 2020–2025, struktur menurut SUPAS 2025 (generasi,
  bahasa, wilayah), kesehatan ibu dan anak 2010 vs 2025. Tab bisa diklik.
- **Ekonomi** — PDB 2022–2025, pengalih metrik Nilai PDB / Pertumbuhan,
  PDB per kapita, inflasi 2024.
- **Ketenagakerjaan** — TPT Agustus 2024 dan 2026, formal vs informal,
  pengangguran menurut kelompok.
- **Perdagangan** — ekspor vs impor 2021–2024, surplus, tujuan ekspor
  nonmigas terbesar Desember 2024.
- **Pembangunan manusia** — IPM 2022–2026 beserta komponennya (harapan hidup,
  lama sekolah, pengeluaran riil), jurang antarprovinsi.
- **Tabel** — semua angka dalam tabel yang bisa **dicari** dan **diurutkan**
  dengan klik judul kolom.
- **Sumber & metodologi** — daftar 12 sumber resmi, glosarium, cara mengutip.

## Menjalankan

Tidak ada build step dan tidak ada network request. Sajikan `app/` dengan
server statis apa pun, lalu buka `index.html`:

```sh
cd app && python3 -m http.server 8080
# buka http://localhost:8080
```

Atau langsung dari Node dengan `node serve.ts` (bila tersedia di kit).

## Struktur kode

```
main.ts            program penyerahan entry (Node 22, stdlib only)
vendor/makefun-frontend.ts   salinan kit, tidak diubah
app/
  index.html       kerangka + navigasi
  style.css        tampilan (serif/sans sistem, tanpa font unduhan)
  data.js          semua angka + sumber + tahun
  charts.js        grafik SVG (garis, batang, berkelompok, horizontal, donat)
  views.js         perender 8 halaman
  main.js          hash router + tab + cari + urutkan tabel
screenshots/      4 tangkapan layar asli dari browser
```

## Data

Semua angka nyata dari rilis resmi: BPS (Penduduk Pertengahan Tahun,
SUPAS 2025, PDB, Inflasi, Profil Kemiskinan, Sakernas, Ekspor-Impor, IPM),
Kementerian Perdagangan, dan Kementerian Keuangan. Situs ini independen dan
tidak berafiliasi dengan BPS atau kementerian mana pun.

## Lisensi

MIT — lihat `LICENSE`.
