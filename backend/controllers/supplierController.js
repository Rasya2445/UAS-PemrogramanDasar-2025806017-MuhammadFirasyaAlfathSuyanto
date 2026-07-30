// ============================================================
// CONTROLLER - SUPPLIER
// ============================================================
const SupplierModel = require('../models/supplierModel');

const SupplierController = {
  getAll: async (req, res) => {
    try {
      const data = await SupplierModel.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = SupplierController;