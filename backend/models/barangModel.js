// ============================================================
// MODEL - BARANG
// Berisi seluruh query database terkait tabel barang
// ============================================================
const db = require('../config/db');

// JOIN agar nama kategori & supplier ikut tampil tanpa request tambahan
const SELECT_QUERY = `
  SELECT b.*, k.nama_kategori, s.nama_supplier
  FROM barang b
  LEFT JOIN kategori k ON b.kategori_id = k.id
  LEFT JOIN supplier s ON b.supplier_id = s.id
`;

const BarangModel = {
  getAll: async () => {
    const [rows] = await db.query(SELECT_QUERY + ' ORDER BY b.id DESC');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(SELECT_QUERY + ' WHERE b.id = ?', [id]);
    return rows[0];
  },

  create: async ({ nama_barang, kategori_id, supplier_id, stok, harga, deskripsi }) => {
    const [result] = await db.query(
      `INSERT INTO barang (nama_barang, kategori_id, supplier_id, stok, harga, deskripsi)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nama_barang, kategori_id || null, supplier_id || null, stok, harga, deskripsi || null]
    );
    return result.insertId;
  },

  update: async (id, { nama_barang, kategori_id, supplier_id, stok, harga, deskripsi }) => {
    const [result] = await db.query(
      `UPDATE barang SET nama_barang=?, kategori_id=?, supplier_id=?, stok=?, harga=?, deskripsi=?
       WHERE id=?`,
      [nama_barang, kategori_id || null, supplier_id || null, stok, harga, deskripsi || null, id]
    );
    return result.affectedRows;
  },

  remove: async (id) => {
    const [result] = await db.query('DELETE FROM barang WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = BarangModel;