const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriasController');


// CREATE con imagen
router.post(
  '/',controller.createCategoria
);

// READ
router.get('/', controller.getCategoria);

// UPDATE 
router.put(
  '/:id',
  controller.updateCategoria
);

// DELETE 
router.delete(
  '/:id',
  controller.deleteCategoria
);

module.exports = router;