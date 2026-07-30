// ============================================================
// CONTROLLER - KATEGORI (CRUD LENGKAP)
// ============================================================
const KategoriModel = require('../models/kategoriModel');

const KategoriController = {
  // GET semua kategori
  getAll: async (req, res) => {
    try {
      const data = await KategoriModel.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // GET kategori by ID
  getById: async (req, res) => {
    try {
      const kategori = await KategoriModel.getById(req.params.id);
      if (!kategori) {
        return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan' });
      }
      res.json({ success: true, data: kategori });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST tambah kategori baru
  create: async (req, res) => {
    try {
      const { nama_kategori, deskripsi } = req.body;

      // Validasi field wajib
      if (!nama_kategori || nama_kategori.trim() === '') {
        return res.status(400).json({ success: false, message: 'Nama kategori wajib diisi' });
      }

      const id = await KategoriModel.create({ nama_kategori, deskripsi });
      res.status(201).json({ success: true, message: 'Kategori berhasil ditambahkan', id });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // PUT update kategori
  update: async (req, res) => {
    try {
      const { nama_kategori, deskripsi } = req.body;

      if (!nama_kategori || nama_kategori.trim() === '') {
        return res.status(400).json({ success: false, message: 'Nama kategori wajib diisi' });
      }

      const affected = await KategoriModel.update(req.params.id, { nama_kategori, deskripsi });
      if (affected === 0) {
        return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan' });
      }
      res.json({ success: true, message: 'Kategori berhasil diperbarui' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // DELETE kategori
  remove: async (req, res) => {
    try {
      const affected = await KategoriModel.remove(req.params.id);
      if (affected === 0) {
        return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan' });
      }
      res.json({ success: true, message: 'Kategori berhasil dihapus' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = KategoriController;