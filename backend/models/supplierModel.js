// ============================================================
// MODEL - SUPPLIER
// Data referensi, dipakai untuk mengisi dropdown pada form barang
// ============================================================
const db = require('../config/db');

const SupplierModel = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM supplier ORDER BY nama_supplier ASC');
    return rows;
  }
};

module.exports = SupplierModel;