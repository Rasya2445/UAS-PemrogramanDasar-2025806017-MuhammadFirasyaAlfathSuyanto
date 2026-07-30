// ============================================================
// ROUTES - KATEGORI
// ============================================================
const express = require('express');
const router = express.Router();
const KategoriController = require('../controllers/kategoriController');

router.get('/', KategoriController.getAll);        // GET semua kategori
router.get('/:id', KategoriController.getById);     // GET kategori by ID
router.post('/', KategoriController.create);        // POST tambah kategori
router.put('/:id', KategoriController.update);       // PUT update kategori
router.delete('/:id', KategoriController.remove);     // DELETE kategori

module.exports = router;