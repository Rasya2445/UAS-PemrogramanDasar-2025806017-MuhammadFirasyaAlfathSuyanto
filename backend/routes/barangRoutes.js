// ============================================================
// ROUTES - BARANG
// ============================================================
const express = require('express');
const router = express.Router();
const BarangController = require('../controllers/barangController');

router.get('/', BarangController.getAll);        // GET semua barang
router.get('/:id', BarangController.getById);     // GET barang by ID
router.post('/', BarangController.create);        // POST tambah barang
router.put('/:id', BarangController.update);       // PUT update barang
router.delete('/:id', BarangController.remove);     // DELETE barang

module.exports = router;