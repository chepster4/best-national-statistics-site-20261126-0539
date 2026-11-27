// views.js — perender halaman STATIS.
// Setiap halaman adalah fungsi yang mengembalikan HTML dari data.js dan grafik
// dari charts.js. Semua angka yang tampil membawa sumber dan tahunnya.

import {
  SITE, POPULATION, POPULATION_STRUCTURE, GDP, INFLATION, POVERTY,
  LABOUR, TRADE, HDI, GEOGRAPHY, SOURCES,
} from './data.js';
import { fmtId, fmtInt, lineChart, barChart, groupedBarChart, horizontalBarChart, donutChart } from './charts.js';

function sourceLine(source) {
  return `<p class="source">Sumber: ${source}</p>`;
}

function kpiCard(value, label, sub) {
  return `<article class="kpi"><div class="kpi-value">${value}</div>`
    + `<div class="kpi-label">${label}</div><div class="kpi-sub">${sub}</div></article>`;
}

function sectionHead(title, intro) {
  return `<header class="section-head"><h2>${title}</h2><p>${intro}</p></header>`;
}

// ---------- BERANDA ----------
export function viewHome() {
  const pop = lineChart({
    labels: POPULATION.years.map(String),
    values: POPULATION.values,
    color: '#0e7c6b',
    unit: '',
    decimals: 2,
  });
  const gdp = barChart({
    labels: GDP.years.map(String),
    values: GDP.nominal,
    color: '#0b2a4a',
    unit: '',
    decimals: 0,
  });
  return `
  <section class="hero">
    <p class="hero-eyebrow">Portal statistik nasional · Indonesia</p>
    <h1>Angka Indonesia,<br>terbuka untuk semua.</h1>
    <p class="hero-intro">STATIS merangkum angka-angka resmi tentang penduduk, ekonomi,
    pekerjaan, perdagangan, dan pembangunan manusia Indonesia — tiap angka
    dikutip dari rilis resmi beserta sumber dan tahunnya, supaya bisa
    dicek ulang dan dipakai untuk mengambil keputusan.</p>
    <p class="hero-meta">${fmtInt(GEOGRAPHY.islands)} pulau · ${GEOGRAPHY.provinces} provinsi ·
    ${GEOGRAPHY.regenciesCities} kabupaten/kota · Luas daratan ${fmtId(GEOGRAPHY.landAreaKm2, 2)} km²
    <span class="source-inline">(${GEOGRAPHY.source})</span></p>
  </section>

  <section class="kpi-grid" aria-label="Angka utama">
    ${kpiCard('284,67 jt', 'Penduduk', 'SUPAS 2025 · BPS')}
    ${kpiCard('Rp23.821,1 T', 'PDB 2025', 'BPS · tumbuh 5,11%')}
    ${kpiCard('75,90', 'IPM 2025', 'BPS · kategori tinggi')}
    ${kpiCard('8,07%', 'Penduduk miskin', 'Mar 2026 · BPS')}
    ${kpiCard('4,91%', 'Pengangguran', 'Agu 2024 · BPS')}
    ${kpiCard('US$31,04 M', 'Surplus dagang', '2024 · BPS')}
  </section>

  <section class="chart-duo">
    <article class="card">
      <h2>Penduduk terus bertambah</h2>
      <p class="card-intro">Jumlah penduduk pertengahan tahun, 2020–2025. Laju tumbuh 2024: 1,04%.</p>
      ${pop}
      ${sourceLine(POPULATION.source)}
    </article>
    <article class="card">
      <h2>Ekonomi tumbuh di atas 5%</h2>
      <p class="card-intro">PDB atas dasar harga berlaku, 2022–2025 (Rp triliun).</p>
      ${gdp}
      ${sourceLine(GDP.source)}
    </article>
  </section>

  <section class="card">
    <h2>Tiga temuan yang perlu dibaca</h2>
    <ol class="findings">
      <li><strong>Kemiskinan terendah sepanjang sejarah pencatatan.</strong>
        Pada Maret 2026 penduduk miskin 8,07% (22,93 juta jiwa), turun dari
        9,03% pada Maret 2024. Garis kemiskinan Maret 2026: Rp669.235 per kapita
        per bulan. <span class="source-inline">(BPS, Profil Kemiskinan 2026)</span></li>
      <li><strong>Surplus dagang 56 bulan berturut-turut.</strong>
        Sejak Mei 2020 sampai Desember 2024 neraca perdagangan selalu surplus;
        surplus 2024 sebesar US$31,04 miliar dengan ekspor US$264,70 miliar.
        <span class="source-inline">(BPS, 2025)</span></li>
      <li><strong>Manusia Indonesia makin sehat dan bersekolah lebih lama.</strong>
        IPM 2025 mencapai 75,90; umur harapan hidup 74,47 tahun dan rata-rata
        lama sekolah 9,07 tahun. <span class="source-inline">(BPS, IPM 2025)</span></li>
    </ol>
  </section>

  <section class="quick-links" aria-label="Jelajahi data">
    <h2>Jelajahi menurut topik</h2>
    <div class="link-grid">
      <a href="#/penduduk">Penduduk <span>284,67 juta jiwa (2025)</span></a>
      <a href="#/ekonomi">Ekonomi <span>PDB Rp23.821,1 T (2025)</span></a>
      <a href="#/kerja">Ketenagakerjaan <span>TPT 4,91% (Agu 2024)</span></a>
      <a href="#/dagang">Perdagangan <span>Ekspor US$264,70 M (2024)</span></a>
      <a href="#/manusia">Pembangunan manusia <span>IPM 75,90 (2025)</span></a>
      <a href="#/data">Semua tabel <span>Cari dan urutkan datanya</span></a>
    </div>
  </section>

  <p class="update-note">Terakhir diperbarui ${SITE.updated}. ${SITE.note}</p>`;
}

// ---------- PENDUDUK ----------
export function viewPopulation(tab = 'tren') {
  const pop = lineChart({
    labels: POPULATION.years.map(String),
    values: POPULATION.values,
    color: '#0e7c6b',
    decimals: 2,
  });
  const structure = horizontalBarChart({
    rows: POPULATION_STRUCTURE.rows.map((r) => ({ label: r.label, value: r.value })),
    color: '#0e7c6b',
    decimals: 2,
    unit: '%',
  });
  const tabs = `<div class="tabs" role="tablist">
    <button type="button" data-tab="tren" class="${tab === 'tren' ? 'active' : ''}">Tren jumlah</button>
    <button type="button" data-tab="struktur" class="${tab === 'struktur' ? 'active' : ''}">Struktur penduduk</button>
    <button type="button" data-tab="kesehatan" class="${tab === 'kesehatan' ? 'active' : ''}">Kesehatan ibu &amp; anak</button>
  </div>`;
  let body = '';
  if (tab === 'tren') {
    body = `<article class="card"><h2>Jumlah penduduk, 2020–2025</h2>
      <p class="card-intro">Pertengahan tahun, juta jiwa. Indonesia negara berpenduduk terbesar keempat di dunia.</p>
      ${pop}${sourceLine(POPULATION.source)}
      <table class="data-table sortable"><thead><tr>
      <th data-type="num">Tahun</th><th data-type="num">Penduduk (juta jiwa)</th></tr></thead>
      <tbody>${POPULATION.years.map((y, i) => `<tr><td>${y}</td><td>${fmtId(POPULATION.values[i], 2)}</td></tr>`).join('')}</tbody></table>
      ${sourceLine(POPULATION.source)}</article>`;
  } else if (tab === 'struktur') {
    body = `<article class="card"><h2>Siapa penduduk Indonesia?</h2>
      <p class="card-intro">Komposisi menurut generasi, wilayah, dan bahasa — persen dari penduduk.</p>
      ${structure}${sourceLine(POPULATION_STRUCTURE.source)}
      <p><strong>Total Fertility Rate:</strong> ${fmtId(POPULATION_STRUCTURE.fertility.value, 2)} anak per perempuan
      <span class="source-inline">(${POPULATION_STRUCTURE.fertility.source})</span> — nyaris di level pengganti (2,1).</p></article>`;
  } else {
    body = `<article class="card"><h2>Kesehatan ibu dan anak membaik</h2>
      <p class="card-intro">Perbandingan 2010 dengan 2025 (SUPAS 2025).</p>
      <table class="data-table"><thead><tr><th>Indikator</th><th data-type="num">2010</th><th data-type="num">2025</th></tr></thead>
      <tbody>${POPULATION_STRUCTURE.mortality.map((m) => `<tr><td>${m.label}</td><td>${fmtId(m.from, 2)}</td><td>${fmtId(m.to, 2)}</td></tr>`).join('')}</tbody></table>
      ${sourceLine(POPULATION_STRUCTURE.source)}</article>`;
  }
  return `${sectionHead('Penduduk', 'Berapa banyak, siapa, dan di mana penduduk Indonesia tinggal — dari sensus dan survei BPS.')}
  ${tabs}${body}`;
}

// ---------- EKONOMI ----------
export function viewEconomy(metric = 'nominal') {
  const labels = GDP.years.map(String);
  const chart = metric === 'growth'
    ? barChart({ labels, values: GDP.growth, color: '#c47f17', unit: '%', decimals: 2 })
    : barChart({ labels, values: GDP.nominal, color: '#0b2a4a', decimals: 0 });
  return `${sectionHead('Ekonomi', 'Besarnya ekonomi, laju tumbuhnya, dan berapa yang dinikmati tiap penduduk.')}
  <section class="kpi-grid" aria-label="Angka utama ekonomi">
    ${kpiCard('Rp23.821,1 T', 'PDB 2025', 'BPS · harga berlaku')}
    ${kpiCard('5,11%', 'Pertumbuhan 2025', 'BPS · yoy')}
    ${kpiCard('Rp83,7 jt', 'PDB per kapita 2025', '≈ US$5.083,4 · BPS')}
    ${kpiCard('1,57%', 'Inflasi 2024', 'BPS · yoy Desember')}
  </section>
  <article class="card">
    <h2>${metric === 'growth' ? 'Pertumbuhan ekonomi (% yoy)' : 'PDB harga berlaku (Rp triliun)'}</h2>
    <div class="tabs" role="tablist">
      <button type="button" data-metric="nominal" class="${metric === 'nominal' ? 'active' : ''}">Nilai PDB</button>
      <button type="button" data-metric="growth" class="${metric === 'growth' ? 'active' : ''}">Pertumbuhan</button>
    </div>
    ${chart}${sourceLine(GDP.source)}
    <table class="data-table sortable"><thead><tr>
      <th data-type="num">Tahun</th><th data-type="num">PDB (Rp triliun)</th><th data-type="num">Tumbuh (%)</th></tr></thead>
      <tbody>${GDP.years.map((y, i) => `<tr><td>${y}</td><td>${fmtId(GDP.nominal[i], 1)}</td><td>${fmtId(GDP.growth[i], 2)}</td></tr>`).join('')}</tbody></table>
    ${sourceLine(GDP.source)}
  </article>
  <article class="card">
    <h2>PDB per kapita</h2>
    <table class="data-table"><thead><tr><th data-type="num">Tahun</th><th data-type="num">Rupiah</th><th data-type="num">Dolar AS</th></tr></thead>
    <tbody>${GDP.perCapita.map((r) => `<tr><td>${r.year}</td><td>Rp${fmtId(r.idr, 2)} juta</td><td>US$${fmtId(r.usd, 2)}</td></tr>`).join('')}</tbody></table>
    ${sourceLine(GDP.source)}
    <p><strong>Inflasi 2024</strong> sebesar ${fmtId(INFLATION.rows[0].value, 2)}% (yoy) —
    ${INFLATION.rows[0].note}. <span class="source-inline">(${INFLATION.source})</span></p>
  </article>`;
}

// ---------- KETENAGAKERJAAN ----------
export function viewLabour() {
  const a = LABOUR.aug2024;
  const b = LABOUR.aug2026;
  return `${sectionHead('Ketenagakerjaan', 'Siapa yang bekerja, siapa yang menganggur, dan seperti apa kualitas pekerjaannya.')}
  <section class="kpi-grid" aria-label="Angka utama ketenagakerjaan">
    ${kpiCard('4,91%', 'TPT Agu 2024', 'BPS · Sakernas')}
    ${kpiCard('144,64 jt', 'Penduduk bekerja', 'Agu 2024 · BPS')}
    ${kpiCard('57,95%', 'Pekerja informal', 'Agu 2024 · BPS')}
    ${kpiCard('4,75%', 'TPT Agu 2026', 'BPS · Sakernas')}
  </section>
  <article class="card">
    <h2>Pengangguran terbuka menurut kelompok</h2>
    <p class="card-intro">Agustus 2024 — persen angkatan kerja.</p>
    ${horizontalBarChart({
      rows: [
        { label: 'Perkotaan', value: a.tptUrban },
        { label: 'Laki-laki', value: a.tptMale },
        { label: 'Perempuan', value: a.tptFemale },
        { label: 'Perdesaan', value: a.tptRural },
      ],
      color: '#c47f17',
      decimals: 2,
      unit: '%',
    })}
    ${sourceLine(LABOUR.source + ' Agustus 2024')}
  </article>
  <article class="card">
    <h2>Formal lawan informal</h2>
    <p class="card-intro">Mayoritas pekerja Indonesia masih bekerja di sektor informal.</p>
    ${donutChart({
      parts: [
        { label: 'Informal', value: a.informal, color: '#c47f17' },
        { label: 'Formal', value: 100 - a.informal, color: '#0e7c6b' },
      ],
    })}
    ${sourceLine(LABOUR.source + ' Agustus 2024')}
    <table class="data-table"><thead><tr><th>Periode</th><th data-type="num">TPT (%)</th><th data-type="num">Bekerja (juta)</th><th data-type="num">Menganggur (juta)</th></tr></thead>
    <tbody>
      <tr><td>Agustus 2024</td><td>${fmtId(a.tpt, 2)}</td><td>${fmtId(a.working, 2)}</td><td>${fmtId(a.unemployed, 2)}</td></tr>
      <tr><td>Agustus 2026</td><td>${fmtId(b.tpt, 2)}</td><td>—</td><td>${fmtId(b.unemployed, 2)}</td></tr>
    </tbody></table>
    <p>Agustus 2026: angkatan kerja ${fmtId(b.labourForce, 2)} juta orang; pekerja setengah
    menganggur ${fmtId(b.underemployed, 2)}% (${fmtId(b.underemployedPeople, 2)} juta orang).
    <span class="source-inline">(${LABOUR.source}, 2026)</span></p>
  </article>`;
}

// ---------- PERDAGANGAN ----------
export function viewTrade() {
  const chart = groupedBarChart({
    labels: TRADE.years.map(String),
    series: [
      { name: 'Ekspor', values: TRADE.exports },
      { name: 'Impor', values: TRADE.imports },
    ],
    colors: ['#0e7c6b', '#0b2a4a'],
    decimals: 0,
  });
  const surplus = barChart({
    labels: TRADE.years.map(String),
    values: TRADE.surplus,
    color: '#c47f17',
    decimals: 2,
    unit: '',
  });
  return `${sectionHead('Perdagangan', 'Apa yang dijual Indonesia ke dunia, apa yang dibeli, dan sisa neracanya.')}
  <section class="kpi-grid" aria-label="Angka utama perdagangan">
    ${kpiCard('US$264,70 M', 'Ekspor 2024', 'naik 2,29% · BPS')}
    ${kpiCard('US$233,66 M', 'Impor 2024', 'naik 5,31% · BPS')}
    ${kpiCard('US$31,04 M', 'Surplus 2024', 'BPS')}
    ${kpiCard('56 bulan', 'Surplus beruntun', 'sejak Mei 2020')}
  </section>
  <article class="card">
    <h2>Ekspor lawan impor, 2021–2024</h2>
    <p class="card-intro">Miliar dolar AS.</p>
    ${chart}${sourceLine(TRADE.source)}
    <table class="data-table sortable"><thead><tr>
      <th data-type="num">Tahun</th><th data-type="num">Ekspor</th><th data-type="num">Impor</th><th data-type="num">Surplus</th></tr></thead>
      <tbody>${TRADE.years.map((y, i) => `<tr><td>${y}</td><td>${fmtId(TRADE.exports[i], 2)}</td><td>${fmtId(TRADE.imports[i], 2)}</td><td>${fmtId(TRADE.surplus[i], 2)}</td></tr>`).join('')}</tbody></table>
    ${sourceLine(TRADE.source)}
  </article>
  <article class="card">
    <h2>Surplus menyusut tapi bertahan</h2>
    <p class="card-intro">Surplus perdagangan (miliar dolar AS). Ekspor nonmigas 2024:
    US$${fmtId(TRADE.nonOilExports2024, 2)} miliar; impor nonmigas US$${fmtId(TRADE.nonOilImports2024, 2)} miliar.</p>
    ${surplus}${sourceLine(TRADE.source)}
    <h3>Tujuan ekspor nonmigas terbesar, Desember 2024</h3>
    <table class="data-table"><thead><tr><th>Negara</th><th data-type="num">Nilai (US$ miliar)</th></tr></thead>
    <tbody>${TRADE.topDestinationsDec2024.map((d) => `<tr><td>${d.country}</td><td>${fmtId(d.value, 2)}</td></tr>`).join('')}</tbody></table>
    ${sourceLine(TRADE.source)}
  </article>`;
}

// ---------- PEMBANGUNAN MANUSIA ----------
export function viewHuman() {
  const hdi = lineChart({
    labels: HDI.years.map(String),
    values: HDI.values,
    color: '#0b2a4a',
    decimals: 2,
  });
  return `${sectionHead('Pembangunan manusia', 'Seberapa panjang, sehat, dan berpendidikan hidup orang Indonesia.')}
  <section class="kpi-grid" aria-label="Angka utama pembangunan manusia">
    ${kpiCard('75,90', 'IPM 2025', 'BPS · kategori tinggi')}
    ${kpiCard('74,47 thn', 'Harapan hidup', '2025 · BPS')}
    ${kpiCard('13,30 thn', 'Harapan lama sekolah', '2025 · BPS')}
    ${kpiCard('9,07 thn', 'Rata-rata lama sekolah', '2025 · BPS')}
  </section>
  <article class="card">
    <h2>IPM naik setiap tahun</h2>
    <p class="card-intro">Indeks Pembangunan Manusia, 2022–2026 (skala 0–100).</p>
    ${hdi}${sourceLine(HDI.source)}
    <table class="data-table sortable"><thead><tr>
      <th data-type="num">Tahun</th><th data-type="num">IPM</th><th data-type="num">Harapan hidup (thn)</th>
      <th data-type="num">Harapan sekolah (thn)</th><th data-type="num">Rata-rata sekolah (thn)</th>
      <th data-type="num">Pengeluaran riil/kapita (Rp jt)</th></tr></thead>
      <tbody>${HDI.years.map((y, i) => `<tr><td>${y}</td><td>${fmtId(HDI.values[i], 2)}</td>`
        + `<td>${fmtId(HDI.components.lifeExpectancy[i], 2)}</td>`
        + `<td>${fmtId(HDI.components.schoolExpectancy[i], 2)}</td>`
        + `<td>${fmtId(HDI.components.meanSchooling[i], 2)}</td>`
        + `<td>${HDI.components.realExpenditure[i] === null ? '—' : fmtId(HDI.components.realExpenditure[i], 2)}</td></tr>`).join('')}</tbody></table>
    ${sourceLine(HDI.source)}
  </article>
  <article class="card">
    <h2>Jurang antarprovinsi masih lebar</h2>
    <p class="card-intro">IPM provinsi tertinggi dan terendah, 2025.</p>
    ${horizontalBarChart({
      rows: [
        { label: HDI.highest2025.province, value: HDI.highest2025.value },
        { label: 'Indonesia', value: 75.9 },
        { label: HDI.lowest2025.province, value: HDI.lowest2025.value },
      ],
      color: '#0b2a4a',
      decimals: 2,
    })}
    ${sourceLine(HDI.source + ' 2025')}
  </article>`;
}

// ---------- SEMUA TABEL ----------
export function viewData(query = '') {
  const q = query.trim().toLowerCase();
  const match = (text) => !q || text.toLowerCase().includes(q);
  const row = (cells) => `<tr>${cells.map((c) => `<td>${c}</td>`).join('')}</tr>`;
  const povertyRows = POVERTY.series.filter((s) => match(`${s.period} ${s.value}`))
    .map((s) => row([s.period, fmtId(s.value, 2), s.people === null ? '—' : fmtId(s.people, 2)]));
  const tradeRows = TRADE.years.filter((y, i) => match(`${y} ${TRADE.exports[i]}`))
    .map((y, i) => row([y, fmtId(TRADE.exports[i], 2), fmtId(TRADE.imports[i], 2), fmtId(TRADE.surplus[i], 2)]));
  const gdpRows = GDP.years.filter((y, i) => match(`${y} ${GDP.nominal[i]}`))
    .map((y, i) => row([y, fmtId(GDP.nominal[i], 1), fmtId(GDP.growth[i], 2)]));
  return `${sectionHead('Semua tabel', 'Seluruh angka situs ini dalam tabel yang bisa dicari dan diurutkan. Ketik kata kunci untuk menyaring baris.')}
  <div class="search-box">
    <label for="table-search">Cari angka atau tahun</label>
    <input id="table-search" type="search" placeholder="mis. 2024, ekspor, kemiskinan…" value="${query.replace(/"/g, '&quot;')}">
  </div>
  <article class="card"><h2>Kemiskinan (% penduduk)</h2>
    <table class="data-table sortable"><thead><tr><th>Periode</th><th data-type="num">Tingkat (%)</th><th data-type="num">Jumlah (juta jiwa)</th></tr></thead>
    <tbody>${povertyRows.join('') || '<tr><td colspan="3">Tidak ada baris yang cocok.</td></tr>'}</tbody></table>
    ${sourceLine(POVERTY.source)}</article>
  <article class="card"><h2>Perdagangan (miliar dolar AS)</h2>
    <table class="data-table sortable"><thead><tr><th data-type="num">Tahun</th><th data-type="num">Ekspor</th><th data-type="num">Impor</th><th data-type="num">Surplus</th></tr></thead>
    <tbody>${tradeRows.join('') || '<tr><td colspan="4">Tidak ada baris yang cocok.</td></tr>'}</tbody></table>
    ${sourceLine(TRADE.source)}</article>
  <article class="card"><h2>PDB dan pertumbuhan</h2>
    <table class="data-table sortable"><thead><tr><th data-type="num">Tahun</th><th data-type="num">PDB (Rp triliun)</th><th data-type="num">Tumbuh (%)</th></tr></thead>
    <tbody>${gdpRows.join('') || '<tr><td colspan="3">Tidak ada baris yang cocok.</td></tr>'}</tbody></table>
    ${sourceLine(GDP.source)}</article>
  <p class="update-note">Angka “—” berarti rilis resmi yang dikutip tidak memuat jumlah jiwanya untuk periode itu.</p>`;
}

// ---------- SUMBER & METODOLOGI ----------
export function viewSources() {
  return `${sectionHead('Sumber & metodologi', 'Dari mana tiap angka berasal, apa artinya, dan bagaimana cara mengutipnya.')}
  <article class="card">
    <h2>Daftar sumber</h2>
    <ol class="source-list">
      ${SOURCES.map((s) => `<li><strong>${s.publisher}.</strong> ${s.title} (${s.year}).</li>`).join('')}
    </ol>
    <p>Semua sumber di atas adalah publikasi resmi yang dapat diakses publik.
    Situs ini independen dan tidak berafiliasi dengan BPS atau kementerian mana pun.</p>
  </article>
  <article class="card">
    <h2>Istilah yang dipakai</h2>
    <dl class="glossary">
      <dt>PDB</dt><dd>Nilai seluruh barang dan jasa yang dihasilkan di Indonesia dalam setahun.
      “Harga berlaku” memakai harga tahun berjalan; pertumbuhan dihitung dari harga konstan.</dd>
      <dt>TPT (Tingkat Pengangguran Terbuka)</dt><dd>Persentase penganggur terhadap angkatan kerja (Sakernas, BPS).</dd>
      <dt>Garis kemiskinan</dt><dd>Batas pengeluaran per kapita per bulan; di bawahnya seseorang dihitung miskin (BPS).</dd>
      <dt>IPM</dt><dd>Indeks 0–100 dari harapan hidup, pendidikan, dan pengeluaran riil per kapita (BPS).</dd>
      <dt>SUPAS</dt><dd>Survei Penduduk Antar Sensus, survei besar BPS di antara dua sensus penduduk.</dd>
    </dl>
  </article>
  <article class="card">
    <h2>Cara mengutip situs ini</h2>
    <p>Contoh: “Penduduk Indonesia 284,67 juta jiwa (BPS, SUPAS 2025), dikutip dari
    STATIS — Statistik Indonesia, diakses 27 November 2026.” Selalu cantumkan sumber
    aslinya (BPS dan kawan-kawan), bukan hanya situs ini.</p>
    <p class="update-note">Terakhir diperbarui ${SITE.updated}. Angka akan diperbarui saat rilis resmi terbaru terbit.</p>
  </article>`;
}
