-- ============================================================
-- DATABASE: mini_inventory
-- Capstone Project - Mini Inventory Management System
-- ============================================================

CREATE DATABASE IF NOT EXISTS mini_inventory;
USE mini_inventory;

-- ------------------------------------------------------------
-- TABEL 1: kategori
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS kategori (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL,
    deskripsi VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- TABEL 2: supplier
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS supplier (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_supplier VARCHAR(100) NOT NULL,
    kontak VARCHAR(50),
    alamat VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- TABEL 3: barang (berelasi ke kategori & supplier)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS barang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_barang VARCHAR(100) NOT NULL,
    kategori_id INT,
    supplier_id INT,
    stok INT NOT NULL DEFAULT 0,
    harga DECIMAL(12,2) NOT NULL DEFAULT 0,
    deskripsi VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kategori_id) REFERENCES kategori(id) ON DELETE SET NULL,
    FOREIGN KEY (supplier_id) REFERENCES supplier(id) ON DELETE SET NULL
);

-- ------------------------------------------------------------
-- DATA CONTOH (SEED DATA)
-- ------------------------------------------------------------
INSERT INTO kategori (nama_kategori, deskripsi) VALUES
('Elektronik', 'Perangkat dan aksesoris elektronik'),
('Alat Tulis', 'Perlengkapan kantor dan sekolah'),
('Furniture', 'Perabotan rumah dan kantor');

INSERT INTO supplier (nama_supplier, kontak, alamat) VALUES
('CV Sumber Jaya', '0812-3456-7890', 'Tangerang'),
('PT Mitra Elektronik', '0813-9988-1122', 'Jakarta'),
('Toko ABC', '0857-1111-2222', 'Bandung');

INSERT INTO barang (nama_barang, kategori_id, supplier_id, stok, harga, deskripsi) VALUES
('Mouse Wireless', 1, 2, 50, 75000, 'Mouse wireless 2.4GHz'),
('Buku Tulis 58 Lembar', 2, 1, 200, 5000, 'Buku tulis isi 58 lembar'),
('Kursi Kantor', 3, 3, 15, 450000, 'Kursi kantor ergonomis'),
('Keyboard Mechanical', 1, 2, 30, 350000, 'Keyboard mechanical RGB');