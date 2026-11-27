// data.js — semua angka situs STATIS.
// Setiap angka di bawah ini angka nyata yang dikutip dari rilis resmi,
// lengkap dengan sumber dan tahunnya. Tidak ada angka karangan.
// Sumber utama: Badan Pusat Statistik (BPS), Kementerian Keuangan,
// Kementerian Perdagangan (diolah dari BPS). Satuan ditulis di tiap seri.

export const SITE = {
  name: 'STATIS',
  fullName: 'STATIS — Statistik Indonesia',
  tagline: 'Angka Indonesia, terbuka untuk semua.',
  updated: '27 November 2026',
  note: 'Situs independen, bukan situs resmi BPS. Angka dikutip dari rilis resmi dan disebut sumbernya.',
};

// Penduduk pertengahan tahun (juta jiwa). BPS, Proyeksi Penduduk 2020–2050
// hasil Sensus Penduduk 2020; angka 2025 dari Survei Penduduk Antar Sensus (SUPAS) 2025.
export const POPULATION = {
  unit: 'juta jiwa',
  source: 'BPS — Jumlah Penduduk Pertengahan Tahun & SUPAS 2025',
  years: [2020, 2022, 2023, 2024, 2025],
  values: [270.2, 275.77, 278.7, 281.6, 284.67],
  latest: { year: 2025, value: 284.67, label: '284,67 juta jiwa' },
  growth2024: 1.04, // persen, 2023 ke 2024
};

// Struktur penduduk menurut SUPAS 2025 (persen dari penduduk).
export const POPULATION_STRUCTURE = {
  source: 'BPS — SUPAS 2025',
  rows: [
    { label: 'Generasi Z', value: 24.93, unit: '%' },
    { label: 'Milenial', value: 24.34, unit: '%' },
    { label: 'Penduduk lanjut usia (60+)', value: 10.0, unit: '%', approx: true },
    { label: 'Tinggal di Pulau Jawa', value: 56.0, unit: '%', approx: true },
    { label: 'Dapat berbahasa Indonesia', value: 98.12, unit: '%' },
    { label: 'Menggunakan bahasa daerah', value: 73.82, unit: '%' },
    { label: 'Menguasai bahasa asing', value: 6.28, unit: '%' },
  ],
  fertility: { label: 'Total Fertility Rate (TFR)', value: 2.13, source: 'BPS — SUPAS 2025' },
  mortality: [
    { label: 'Angka kematian bayi (per 1.000 kelahiran hidup)', from: 26.09, fromYear: 2010, to: 14.12, toYear: 2025 },
    { label: 'Angka kematian ibu (per 100.000 kelahiran hidup)', from: 346, fromYear: 2010, to: 144, toYear: 2025 },
  ],
};

// Produk Domestik Bruto. BPS, Berita Resmi Statistik PDB.
export const GDP = {
  unit: 'Rp triliun (harga berlaku)',
  source: 'BPS — PDB Triwulan IV dan Full Year',
  years: [2022, 2023, 2024, 2025],
  nominal: [19588.5, 20892.3, 22139.0, 23821.1],
  growth: [5.31, 5.05, 5.03, 5.11], // persen yoy
  perCapita: [
    { year: 2024, idr: 78.62, usd: 4960.33 },
    { year: 2025, idr: 83.7, usd: 5083.4 },
  ],
};

// Inflasi tahun kalender (yoy Desember). BPS.
export const INFLATION = {
  source: 'BPS — Inflasi',
  rows: [
    { year: 2024, value: 1.57, note: 'terendah dalam beberapa tahun terakhir' },
  ],
};

// Kemiskinan. BPS, Berita Resmi Statistik Profil Kemiskinan.
export const POVERTY = {
  unit: 'persen penduduk',
  source: 'BPS — Profil Kemiskinan',
  series: [
    { period: 'Mar 2024', value: 9.03, people: 25.22 },
    { period: 'Sep 2024', value: 8.57, people: 24.06 },
    { period: 'Mar 2025', value: 8.47, people: null },
    { period: 'Sep 2025', value: 8.25, people: null },
    { period: 'Mar 2026', value: 8.07, people: 22.93 },
  ],
  urbanSep2024: 6.66,
  ruralSep2024: 11.34,
  lineSep2024: 595242, // Rp per kapita per bulan
  lineMar2026: 669235, // Rp per kapita per bulan
};

// Ketenagakerjaan. BPS, Sakernas Agustus 2024 dan Agustus 2026.
export const LABOUR = {
  source: 'BPS — Sakernas',
  aug2024: {
    tpt: 4.91, // Tingkat Pengangguran Terbuka, persen
    working: 144.64, // juta orang
    unemployed: 7.47, // juta orang
    informal: 57.95, // persen pekerja informal
    tptMale: 4.9,
    tptFemale: 4.92,
    tptUrban: 5.79,
    tptRural: 3.67,
  },
  aug2026: {
    tpt: 4.75,
    labourForce: 155.37, // juta orang
    unemployed: 7.38, // juta orang
    informal: 57.93,
    underemployed: 8.68, // persen, bekerja <35 jam/minggu dan menginginkan jam tambahan
    underemployedPeople: 12.84, // juta orang
  },
};

// Perdagangan luar negeri (miliar dolar AS). BPS, diolah Kementerian Perdagangan.
export const TRADE = {
  unit: 'miliar dolar AS',
  source: 'BPS — Ekspor Impor, diolah PDSI Kementerian Perdagangan',
  years: [2021, 2022, 2023, 2024],
  exports: [231.61, 291.9, 258.82, 264.7],
  imports: [196.27, 237.44, 221.93, 233.66],
  surplus: [35.34, 54.46, 36.89, 31.04],
  nonOilExports2024: 248.83,
  nonOilImports2024: 197.38,
  surplusStreakMonths: 56, // bulan berturut-turut sejak Mei 2020 (per Des 2024)
  topDestinationsDec2024: [
    { country: 'Tiongkok', value: 5.79 },
    { country: 'Amerika Serikat', value: 2.46 },
    { country: 'Jepang', value: 1.45 },
  ], // ekspor nonmigas, miliar dolar AS, Desember 2024
};

// Indeks Pembangunan Manusia. BPS, Berita Resmi Statistik IPM.
export const HDI = {
  unit: 'skala 0–100',
  source: 'BPS — Indeks Pembangunan Manusia',
  years: [2022, 2023, 2024, 2025, 2026],
  values: [73.77, 74.39, 75.02, 75.9, 76.59],
  components: {
    lifeExpectancy: [73.7, 73.93, 74.15, 74.47, 74.68], // tahun
    schoolExpectancy: [13.1, 13.15, 13.21, 13.3, 13.34], // tahun
    meanSchooling: [8.69, 8.77, 8.85, 9.07, 9.16], // tahun
    realExpenditure: [null, null, null, 12.8, 13.37], // Rp juta per kapita per tahun
  },
  highest2025: { province: 'DKI Jakarta', value: 85.05 },
  lowest2025: { province: 'Papua Pegunungan', value: 54.91 },
};

// Fakta wilayah. BPS.
export const GEOGRAPHY = {
  source: 'BPS',
  islands: 17380,
  landAreaKm2: 1890179.78,
  provinces: 38,
  regenciesCities: 514,
};

// Daftar sumber lengkap untuk halaman Sumber & Metodologi.
export const SOURCES = [
  { publisher: 'Badan Pusat Statistik (BPS)', title: 'Jumlah Penduduk Pertengahan Tahun 2022–2024', year: 2024 },
  { publisher: 'Badan Pusat Statistik (BPS)', title: 'Survei Penduduk Antar Sensus (SUPAS) 2025', year: 2025 },
  { publisher: 'Badan Pusat Statistik (BPS)', title: 'Pertumbuhan Ekonomi Indonesia Triwulan IV-2024 dan Full Year 2024', year: 2025 },
  { publisher: 'Badan Pusat Statistik (BPS)', title: 'Pertumbuhan Ekonomi Indonesia 2025', year: 2026 },
  { publisher: 'Badan Pusat Statistik (BPS)', title: 'Inflasi 2024', year: 2025 },
  { publisher: 'Badan Pusat Statistik (BPS)', title: 'Profil Kemiskinan Indonesia September 2024 – Maret 2026', year: 2026 },
  { publisher: 'Badan Pusat Statistik (BPS)', title: 'Booklet Sakernas Agustus 2024', year: 2024 },
  { publisher: 'Badan Pusat Statistik (BPS)', title: 'Keadaan Ketenagakerjaan Indonesia Agustus 2026', year: 2026 },
  { publisher: 'Badan Pusat Statistik (BPS)', title: 'Perkembangan Ekspor dan Impor Indonesia Desember 2024', year: 2025 },
  { publisher: 'Badan Pusat Statistik (BPS)', title: 'Indeks Pembangunan Manusia 2024, 2025, dan 2026', year: 2026 },
  { publisher: 'Kementerian Perdagangan (PDSI)', title: 'Perkembangan Perdagangan Luar Negeri Indonesia 2024 (diolah dari BPS)', year: 2025 },
  { publisher: 'Kementerian Keuangan (BKF)', title: 'Neraca Perdagangan Indonesia Tetap Surplus 2024', year: 2025 },
];
