// ============================================================
// APP.JS - Entry point aplikasi
// Mini Inventory Management System
// ============================================================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const kategoriRoutes = require('./routes/kategoriRoutes');
const barangRoutes = require('./routes/barangRoutes');
const supplierRoutes = require('./routes/supplierRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // agar bisa membaca body JSON dari fetch API

// Sajikan file frontend (HTML, CSS, JS) secara statis
app.use(express.static(path.join(__dirname, '../frontend')));

// Routing REST API
app.use('/api/kategori', kategoriRoutes);
app.use('/api/barang', barangRoutes);
app.use('/api/supplier', supplierRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});