const express = require('express');
const router = express.Router();
const controller = require('../controllers/ProductosController');
const upload = require('../config/upload');


// CREATE con imagen
router.post(
  '/',
  upload.single('imagen'),controller.createProducto
);

// READ
router.get('/', controller.getProductos);

// UPDATE 
router.put(
  '/:id',
  upload.single('imagen'), //agregar esto
  controller.updateProducto
);

// DELETE 
router.delete(
  '/:id',
  controller.deleteProducto
);

router.patch(
  '/:id/stock',
  controller.updateStockProducto
);

module.exports = router;