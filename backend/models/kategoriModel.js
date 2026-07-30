// ============================================================
// MODEL - KATEGORI
// Berisi seluruh query database terkait tabel kategori
// ============================================================
const db = require('../config/db');

const KategoriModel = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM kategori ORDER BY id DESC');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM kategori WHERE id = ?', [id]);
    return rows[0];
  },

  create: async ({ nama_kategori, deskripsi }) => {
    const [result] = await db.query(
      'INSERT INTO kategori (nama_kategori, deskripsi) VALUES (?, ?)',
      [nama_kategori, deskripsi || null]
    );
    return result.insertId;
  },

  update: async (id, { nama_kategori, deskripsi }) => {
    const [result] = await db.query(
      'UPDATE kategori SET nama_kategori = ?, deskripsi = ? WHERE id = ?',
      [nama_kategori, deskripsi || null, id]
    );
    return result.affectedRows;
  },

  remove: async (id) => {
    const [result] = await db.query('DELETE FROM kategori WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = KategoriModel;