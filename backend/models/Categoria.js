const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema(
  {
    nombre: String
  },
  {
    collection: 'categoria',
    versionKey: false
  }
);

module.exports = mongoose.model('Categoria', CategoriaSchema);