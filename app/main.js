// main.js — router dan kontrol STATIS.
// Hash routing: #/ , #/penduduk, #/ekonomi, #/kerja, #/dagang, #/manusia,
// #/data, #/sumber. Tab, pengalih metrik, pencarian tabel, dan pengurutan
// kolom semuanya bekerja nyata di browser, tanpa network.

import {
  viewHome, viewPopulation, viewEconomy, viewLabour, viewTrade,
  viewHuman, viewData, viewSources,
} from './views.js';

const app = document.getElementById('app');
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));

// Keadaan halaman yang sedang tampil (untuk tab dan pencarian).
let populationTab = 'tren';
let economyMetric = 'nominal';
let dataQuery = '';

function parseRoute() {
  const hash = window.location.hash || '#/';
  const parts = hash.slice(2).split('/');
  return { page: parts[0] || '', arg: parts[1] || '' };
}

function render() {
  const { page } = parseRoute();
  let html = '';
  if (page === '') html = viewHome();
  else if (page === 'penduduk') html = viewPopulation(populationTab);
  else if (page === 'ekonomi') html = viewEconomy(economyMetric);
  else if (page === 'kerja') html = viewLabour();
  else if (page === 'dagang') html = viewTrade();
  else if (page === 'manusia') html = viewHuman();
  else if (page === 'data') html = viewData(dataQuery);
  else if (page === 'sumber') html = viewSources();
  else html = `<article class="card"><h2>Halaman tidak ditemukan</h2>
    <p>Alamat <code>${page}</code> tidak ada di situs ini.</p>
    <p><a href="#/">Kembali ke beranda</a></p></article>`;

  app.innerHTML = html;
  navLinks.forEach((a) => {
    const target = a.getAttribute('href').slice(2);
    a.classList.toggle('current', target === page || (target === '' && page === ''));
    if (a.classList.contains('current')) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
  wireControls();
}

// Urutkan tabel saat judul kolom diklik; klik lagi membalik arah.
function sortTable(table, th, index) {
  const type = th.getAttribute('data-type') || 'text';
  const body = table.tBodies[0];
  const rows = Array.from(body.rows);
  const ascending = th.getAttribute('data-dir') !== 'asc';
  table.querySelectorAll('th').forEach((h) => h.removeAttribute('data-dir'));
  th.setAttribute('data-dir', ascending ? 'asc' : 'desc');
  const parse = (cell) => {
    const text = cell.textContent.trim().replace(/\./g, '').replace(',', '.');
    return type === 'num' ? parseFloat(text) : cell.textContent.trim().toLowerCase();
  };
  rows.sort((a, b) => {
    const va = parse(a.cells[index]);
    const vb = parse(b.cells[index]);
    if (Number.isNaN(va) || Number.isNaN(vb)) return String(va).localeCompare(String(vb));
    return ascending ? va - vb : vb - va;
  });
  rows.forEach((r) => body.appendChild(r));
}

function wireControls() {
  // Tab penduduk.
  app.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      populationTab = btn.getAttribute('data-tab');
      render();
    });
  });
  // Pengalih metrik ekonomi.
  app.querySelectorAll('[data-metric]').forEach((btn) => {
    btn.addEventListener('click', () => {
      economyMetric = btn.getAttribute('data-metric');
      render();
    });
  });
  // Pencarian tabel di halaman data: saring ulang saat mengetik.
  const search = document.getElementById('table-search');
  if (search) {
    search.addEventListener('input', () => {
      dataQuery = search.value;
      const pos = search.selectionStart;
      render();
      const again = document.getElementById('table-search');
      if (again) {
        again.focus();
        again.setSelectionRange(pos, pos);
      }
    });
  }
  // Pengurutan tabel.
  app.querySelectorAll('table.sortable').forEach((table) => {
    table.querySelectorAll('th').forEach((th, index) => {
      th.tabIndex = 0;
      th.setAttribute('title', 'Klik untuk mengurutkan');
      const go = () => sortTable(table, th, index);
      th.addEventListener('click', go);
      th.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          go();
        }
      });
    });
  });
}

window.addEventListener('hashchange', render);
render();
