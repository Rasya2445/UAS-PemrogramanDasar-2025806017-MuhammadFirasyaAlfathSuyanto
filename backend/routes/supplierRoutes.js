// ============================================================
// ROUTES - SUPPLIER
// ============================================================
const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/supplierController');

router.get('/', SupplierController.getAll); // GET semua supplier (untuk dropdown)

module.exports = router;