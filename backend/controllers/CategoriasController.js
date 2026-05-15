const Categoria = require('../models/Categoria');

// CREATE


exports.createCategoria = async (req, res) => {
    

  try {
    const categoria = new Categoria({
      nombre: req.body.nombre
    });

    await categoria.save();

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};



// READ (listar)
exports.getCategoria = async (req, res) => {
  const categorias = await Categoria.find();
  res.json(categorias);
};

// UPDATE
exports.updateCategoria = async (req, res) => {
  try {
    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      req.params.id,
      { nombre: req.body.nombre },
      { new: true, runValidators: true }
    );

    if (!categoriaActualizada) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada"
      });
    }

    res.json({
      success: true,
      categoria: categoriaActualizada
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE
exports.deleteCategoria = async (req, res) => {
  try {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
     