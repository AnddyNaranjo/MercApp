const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema(
  {
    nombre: String,
    precio: Number,
    stock: Number,
    descripcion: String,
    imagen: String,
    categoriaID: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }
  },
  {
    collection: 'productos',
    versionKey: false
  }
);

module.exports = mongoose.model('Producto', ProductoSchema);