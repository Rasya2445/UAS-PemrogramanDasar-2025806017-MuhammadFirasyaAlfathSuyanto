// ============================================================
// KONFIGURASI
// ============================================================
const API_URL = 'http://localhost:3000/api';

// ============================================================
// TAB SWITCHING (DOM Manipulation + Event Listener)
// ============================================================
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ============================================================
// HELPER: tampilkan pesan alert
// ============================================================
function showAlert(elementId, message, type) {
  const el = document.getElementById(elementId);
  el.textContent = message;
  el.className = 'alert show ' + type;
  setTimeout(() => el.classList.remove('show'), 3000);
}

function formatRupiah(angka) {
  return 'Rp ' + Number(angka).toLocaleString('id-ID');
}

// ============================================================
// ============  MODUL KATEGORI (CRUD LENGKAP)  ================
// ============================================================
const formKategori = document.getElementById('form-kategori');
const tabelKategori = document.getElementById('tabel-kategori');

// GET semua kategori lalu render ke tabel (async/await + fetch)
async function loadKategori() {
  try {
    const res = await fetch(`${API_URL}/kategori`);
    const result = await res.json();

    tabelKategori.innerHTML = '';
    result.data.forEach(k => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${k.id}</td>
        <td>${k.nama_kategori}</td>
        <td>${k.deskripsi ?? '-'}</td>
        <td>
          <button class="btn btn-edit btn-sm" onclick="editKategori(${k.id})">Edit</button>
          <button class="btn btn-delete btn-sm" onclick="hapusKategori(${k.id})">Hapus</button>
        </td>`;
      tabelKategori.appendChild(tr);
    });

    isiDropdownKategori(result.data);
  } catch (err) {
    showAlert('alert-kategori', 'Gagal memuat data: ' + err.message, 'error');
  }
}

// Isi dropdown kategori pada form barang
function isiDropdownKategori(data) {
  const select = document.getElementById('kategori_id');
  select.innerHTML = '<option value="">-- Pilih Kategori --</option>';
  data.forEach(k => {
    select.innerHTML += `<option value="${k.id}">${k.nama_kategori}</option>`;
  });
}

// SUBMIT form (POST untuk tambah, PUT untuk edit)
formKategori.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('kategori-id').value;
  const nama_kategori = document.getElementById('nama_kategori').value.trim();
  const deskripsi = document.getElementById('deskripsi_kategori').value.trim();

  // Validasi di sisi client
  if (nama_kategori === '') {
    showAlert('alert-kategori', 'Nama kategori wajib diisi', 'error');
    return;
  }

  const payload = { nama_kategori, deskripsi };

  try {
    let res;
    if (id) {
      res = await fetch(`${API_URL}/kategori/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch(`${API_URL}/kategori`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    const result = await res.json();
    if (!result.success) {
      showAlert('alert-kategori', result.message, 'error');
      return;
    }

    showAlert('alert-kategori', result.message || 'Berhasil disimpan', 'success');
    resetFormKategori();
    loadKategori();
    loadBarang(); // refresh nama kategori di tabel barang juga
  } catch (err) {
    showAlert('alert-kategori', 'Terjadi kesalahan: ' + err.message, 'error');
  }
});

// EDIT kategori -> ambil data by ID lalu isi form
async function editKategori(id) {
  const res = await fetch(`${API_URL}/kategori/${id}`);
  const result = await res.json();
  const k = result.data;

  document.getElementById('kategori-id').value = k.id;
  document.getElementById('nama_kategori').value = k.nama_kategori;
  document.getElementById('deskripsi_kategori').value = k.deskripsi || '';
  document.getElementById('form-kategori-title').textContent = 'Edit Kategori';
}

// DELETE kategori
async function hapusKategori(id) {
  if (!confirm('Yakin ingin menghapus kategori ini?')) return;

  try {
    const res = await fetch(`${API_URL}/kategori/${id}`, { method: 'DELETE' });
    const result = await res.json();
    showAlert('alert-kategori', result.message, result.success ? 'success' : 'error');
    loadKategori();
    loadBarang();
  } catch (err) {
    showAlert('alert-kategori', 'Terjadi kesalahan: ' + err.message, 'error');
  }
}

function resetFormKategori() {
  formKategori.reset();
  document.getElementById('kategori-id').value = '';
  document.getElementById('form-kategori-title').textContent = 'Tambah Kategori';
}

document.getElementById('btn-cancel-kategori').addEventListener('click', resetFormKategori);

// ============================================================
// ============   MODUL BARANG (CRUD LENGKAP)   ================
// ============================================================
const formBarang = document.getElementById('form-barang');
const tabelBarang = document.getElementById('tabel-barang');

async function loadBarang() {
  try {
    const res = await fetch(`${API_URL}/barang`);
    const result = await res.json();

    tabelBarang.innerHTML = '';
    result.data.forEach(b => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${b.id}</td>
        <td>${b.nama_barang}</td>
        <td>${b.nama_kategori ?? '-'}</td>
        <td>${b.nama_supplier ?? '-'}</td>
        <td>${b.stok}</td>
        <td>${formatRupiah(b.harga)}</td>
        <td>
          <button class="btn btn-edit btn-sm" onclick="editBarang(${b.id})">Edit</button>
          <button class="btn btn-delete btn-sm" onclick="hapusBarang(${b.id})">Hapus</button>
        </td>`;
      tabelBarang.appendChild(tr);
    });
  } catch (err) {
    showAlert('alert-barang', 'Gagal memuat data: ' + err.message, 'error');
  }
}

async function loadSupplier() {
  const res = await fetch(`${API_URL}/supplier`);
  const result = await res.json();
  const select = document.getElementById('supplier_id');
  select.innerHTML = '<option value="">-- Pilih Supplier --</option>';
  result.data.forEach(s => {
    select.innerHTML += `<option value="${s.id}">${s.nama_supplier}</option>`;
  });
}

formBarang.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('barang-id').value;
  const nama_barang = document.getElementById('nama_barang').value.trim();
  const kategori_id = document.getElementById('kategori_id').value;
  const supplier_id = document.getElementById('supplier_id').value;
  const stok = document.getElementById('stok').value;
  const harga = document.getElementById('harga').value;
  const deskripsi = document.getElementById('deskripsi_barang').value.trim();

  // Validasi di sisi client sebelum dikirim ke server
  if (nama_barang === '') {
    showAlert('alert-barang', 'Nama barang wajib diisi', 'error');
    return;
  }
  if (stok === '' || Number(stok) < 0) {
    showAlert('alert-barang', 'Stok wajib diisi dan tidak boleh negatif', 'error');
    return;
  }
  if (harga === '' || Number(harga) < 0) {
    showAlert('alert-barang', 'Harga wajib diisi dan tidak boleh negatif', 'error');
    return;
  }

  const payload = { nama_barang, kategori_id, supplier_id, stok, harga, deskripsi };

  try {
    let res;
    if (id) {
      res = await fetch(`${API_URL}/barang/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch(`${API_URL}/barang`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    const result = await res.json();
    if (!result.success) {
      showAlert('alert-barang', result.message, 'error');
      return;
    }

    showAlert('alert-barang', result.message || 'Berhasil disimpan', 'success');
    resetFormBarang();
    loadBarang();
  } catch (err) {
    showAlert('alert-barang', 'Terjadi kesalahan: ' + err.message, 'error');
  }
});

async function editBarang(id) {
  const res = await fetch(`${API_URL}/barang/${id}`);
  const result = await res.json();
  const b = result.data;

  document.getElementById('barang-id').value = b.id;
  document.getElementById('nama_barang').value = b.nama_barang;
  document.getElementById('kategori_id').value = b.kategori_id || '';
  document.getElementById('supplier_id').value = b.supplier_id || '';
  document.getElementById('stok').value = b.stok;
  document.getElementById('harga').value = b.harga;
  document.getElementById('deskripsi_barang').value = b.deskripsi || '';
  document.getElementById('form-barang-title').textContent = 'Edit Barang';
}

async function hapusBarang(id) {
  if (!confirm('Yakin ingin menghapus barang ini?')) return;

  try {
    const res = await fetch(`${API_URL}/barang/${id}`, { method: 'DELETE' });
    const result = await res.json();
    showAlert('alert-barang', result.message, result.success ? 'success' : 'error');
    loadBarang();
  } catch (err) {
    showAlert('alert-barang', 'Terjadi kesalahan: ' + err.message, 'error');
  }
}

function resetFormBarang() {
  formBarang.reset();
  document.getElementById('barang-id').value = '';
  document.getElementById('form-barang-title').textContent = 'Tambah Barang';
}

document.getElementById('btn-cancel-barang').addEventListener('click', resetFormBarang);

// ============================================================
// INISIALISASI SAAT HALAMAN DIMUAT
// ============================================================
(async function init() {
  await loadKategori();
  await loadSupplier();
  await loadBarang();
})();