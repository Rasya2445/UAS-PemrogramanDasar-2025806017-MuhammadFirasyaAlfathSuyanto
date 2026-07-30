// ============================================================
// CONTROLLER - BARANG (CRUD LENGKAP)
// ============================================================
const BarangModel = require('../models/barangModel');

// Validasi payload barang, dipakai bersama oleh create & update
function validateBarang({ nama_barang, stok, harga }) {
  if (!nama_barang || nama_barang.trim() === '') {
    return 'Nama barang wajib diisi';
  }
  if (stok === undefined || stok === '' || isNaN(stok) || Number(stok) < 0) {
    return 'Stok harus berupa angka dan tidak boleh negatif';
  }
  if (harga === undefined || harga === '' || isNaN(harga) || Number(harga) < 0) {
    return 'Harga harus berupa angka dan tidak boleh negatif';
  }
  return null;
}

const BarangController = {
  // GET semua barang
  getAll: async (req, res) => {
    try {
      const data = await BarangModel.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // GET barang by ID
  getById: async (req, res) => {
    try {
      const barang = await BarangModel.getById(req.params.id);
      if (!barang) {
        return res.status(404).json({ success: false, message: 'Barang tidak ditemukan' });
      }
      res.json({ success: true, data: barang });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST tambah barang baru
  create: async (req, res) => {
    try {
      const errorMsg = validateBarang(req.body);
      if (errorMsg) {
        return res.status(400).json({ success: false, message: errorMsg });
      }

      const id = await BarangModel.create(req.body);
      res.status(201).json({ success: true, message: 'Barang berhasil ditambahkan', id });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // PUT update barang
  update: async (req, res) => {
    try {
      const errorMsg = validateBarang(req.body);
      if (errorMsg) {
        return res.status(400).json({ success: false, message: errorMsg });
      }

      const affected = await BarangModel.update(req.params.id, req.body);
      if (affected === 0) {
        return res.status(404).json({ success: false, message: 'Barang tidak ditemukan' });
      }
      res.json({ success: true, message: 'Barang berhasil diperbarui' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // DELETE barang
  remove: async (req, res) => {
    try {
      const affected = await BarangModel.remove(req.params.id);
      if (affected === 0) {
        return res.status(404).json({ success: false, message: 'Barang tidak ditemukan' });
      }
      res.json({ success: true, message: 'Barang berhasil dihapus' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = BarangController;