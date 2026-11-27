// charts.js — pembuat grafik SVG dari data.js.
// Semua grafik digambar sendiri sebagai SVG murni: tanpa library, tanpa gambar
// pinjaman, tanpa network. Setiap fungsi menerima seri angka dan mengembalikan
// string SVG yang siap disisipkan ke halaman.

// Format angka Indonesia: koma desimal, titik ribuan.
export function fmtId(value, decimals = 2) {
  return value.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function fmtInt(value) {
  return value.toLocaleString('id-ID');
}

// Skala "cantik" untuk sumbu: bulatkan batas atas ke kelipatan langkah.
function niceCeil(max, steps = 4) {
  if (max <= 0) return 1;
  const raw = max / steps;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
  return step * mag * steps;
}

// Grafik garis: satu seri (labels, values) dengan area di bawah garis.
export function lineChart({ labels, values, color = '#0e7c6b', height = 220, unit = '', decimals = 1 }) {
  const width = 640;
  const padL = 46, padR = 14, padT = 16, padB = 30;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  // Grafik garis menunjukkan tren: sumbu mulai di dekat nilai terkecil
  // (bukan di nol), supaya perubahan antar tahun benar-benar terlihat.
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  const span = dataMax - dataMin || 1;
  const max = niceCeil(dataMax + span * 0.25);
  const min = Math.max(0, Math.floor((dataMin - span * 0.5) / 5) * 5);
  const x = (i) => padL + (i / (values.length - 1)) * innerW;
  const y = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;

  let grid = '';
  for (let g = 0; g <= 4; g++) {
    const gv = min + ((max - min) * g) / 4;
    const gy = y(gv);
    grid += `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" stroke="#e3ddd2" stroke-width="1"/>`
      + `<text x="${padL - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#6b655a">${fmtId(gv, 0)}</text>`;
  }
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${padL},${y(min)} ${points} ${x(values.length - 1).toFixed(1)},${y(min)}`;
  let dots = '';
  let labelsRow = '';
  values.forEach((v, i) => {
    // Label titik ujung dijangkarkan ke dalam supaya tidak terpotong tepi.
    const anchor = i === 0 ? 'start' : i === values.length - 1 ? 'end' : 'middle';
    const lx = i === 0 ? x(i) + 2 : i === values.length - 1 ? x(i) - 2 : x(i);
    dots += `<circle cx="${x(i)}" cy="${y(v)}" r="4.5" fill="#fff" stroke="${color}" stroke-width="2.5"/>`
      + `<text x="${lx}" y="${y(v) - 10}" text-anchor="${anchor}" font-size="12" font-weight="700" fill="#1d2b2a">${fmtId(v, decimals)}${unit}</text>`;
    labelsRow += `<text x="${x(i)}" y="${height - 8}" text-anchor="middle" font-size="12" fill="#4a463d">${labels[i]}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Grafik garis">`
    + grid
    + `<polygon points="${area}" fill="${color}" opacity="0.10"/>`
    + `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`
    + dots + labelsRow + `</svg>`;
}

// Grafik batang: satu seri dengan label nilai di atas tiap batang.
export function barChart({ labels, values, color = '#0b2a4a', height = 220, unit = '', decimals = 1 }) {
  const width = 640;
  const padL = 46, padR = 10, padT = 26, padB = 30;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const max = niceCeil(Math.max(...values) * 1.1);
  const slot = innerW / values.length;
  const barW = Math.min(64, slot * 0.55);
  let grid = '';
  for (let g = 0; g <= 4; g++) {
    const gv = (max * g) / 4;
    const gy = padT + innerH - (gv / max) * innerH;
    grid += `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" stroke="#e3ddd2" stroke-width="1"/>`
      + `<text x="${padL - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#6b655a">${fmtId(gv, 0)}</text>`;
  }
  let bars = '';
  values.forEach((v, i) => {
    const h = (v / max) * innerH;
    const bx = padL + slot * i + (slot - barW) / 2;
    const by = padT + innerH - h;
    bars += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW}" height="${h.toFixed(1)}" rx="4" fill="${color}"/>`
      + `<text x="${(bx + barW / 2).toFixed(1)}" y="${(by - 7).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#1d2b2a">${fmtId(v, decimals)}${unit}</text>`
      + `<text x="${(bx + barW / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="12" fill="#4a463d">${labels[i]}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Grafik batang">`
    + grid + bars + `</svg>`;
}

// Grafik batang berkelompok: dua seri berdampingan per label.
export function groupedBarChart({ labels, series, colors, height = 240, unit = '', decimals = 0 }) {
  const width = 640;
  const padL = 46, padR = 10, padT = 26, padB = 30;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const all = series.flatMap((s) => s.values);
  const max = niceCeil(Math.max(...all) * 1.1);
  const slot = innerW / labels.length;
  const barW = Math.min(46, (slot * 0.62) / series.length);
  let grid = '';
  for (let g = 0; g <= 4; g++) {
    const gv = (max * g) / 4;
    const gy = padT + innerH - (gv / max) * innerH;
    grid += `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" stroke="#e3ddd2" stroke-width="1"/>`
      + `<text x="${padL - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#6b655a">${fmtId(gv, 0)}</text>`;
  }
  let bars = '';
  labels.forEach((label, i) => {
    series.forEach((s, j) => {
      const v = s.values[i];
      const h = (v / max) * innerH;
      const bx = padL + slot * i + (slot - barW * series.length) / 2 + j * barW;
      const by = padT + innerH - h;
      bars += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW}" height="${h.toFixed(1)}" rx="3" fill="${colors[j]}"/>`;
    });
    const cx = padL + slot * i + slot / 2;
    bars += `<text x="${cx.toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="12" fill="#4a463d">${label}</text>`;
  });
  const legend = series.map((s, j) =>
    `<span class="legend-item"><span class="legend-swatch" style="background:${colors[j]}"></span>${s.name}</span>`).join('');
  return `<div class="chart-legend">${legend}</div>`
    + `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Grafik batang berkelompok">`
    + grid + bars + `</svg>`;
}

// Batang horizontal: cocok untuk peringkat atau perbandingan antar label.
export function horizontalBarChart({ rows, color = '#0e7c6b', height = 200, unit = '', decimals = 1 }) {
  const width = 640;
  const padL = 170, padR = 56, rowH = 34;
  const h = Math.max(height, rows.length * rowH + 16);
  const max = Math.max(...rows.map((r) => r.value)) * 1.12;
  let out = '';
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const w = ((r.value / max) * (width - padL - padR)).toFixed(1);
    out += `<text x="${padL - 10}" y="${y + 15}" text-anchor="end" font-size="12.5" fill="#2b2b26">${r.label}</text>`
      + `<rect x="${padL}" y="${y}" width="${w}" height="20" rx="4" fill="${color}"/>`
      + `<text x="${padL + Number(w) + 8}" y="${y + 15}" font-size="12.5" font-weight="700" fill="#1d2b2a">${fmtId(r.value, decimals)}${unit}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${h}" width="100%" role="img" aria-label="Grafik batang horizontal">${out}</svg>`;
}

// Donat sederhana untuk satu pembagian (mis. formal vs informal).
export function donutChart({ parts, size = 190 }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, thick = 26;
  const total = parts.reduce((a, p) => a + p.value, 0);
  let offset = 0.25; // mulai dari atas
  let circles = '';
  parts.forEach((p) => {
    const frac = p.value / total;
    const dash = frac * 2 * Math.PI * r;
    circles += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${p.color}" stroke-width="${thick}" `
      + `stroke-dasharray="${dash.toFixed(1)} ${(2 * Math.PI * r - dash).toFixed(1)}" stroke-dashoffset="${(-offset * 2 * Math.PI * r).toFixed(1)}"/>`;
    offset += frac;
  });
  const legend = parts.map((p) =>
    `<span class="legend-item"><span class="legend-swatch" style="background:${p.color}"></span>${p.label} — ${fmtId(p.value, 1)}%</span>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Grafik donat">`
    + circles
    + `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="26" font-weight="800" fill="#1d2b2a">${fmtId(parts[0].value, 1)}%</text>`
    + `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="#6b655a">${parts[0].label}</text>`
    + `</svg><div class="chart-legend">${legend}</div></div>`;
}
