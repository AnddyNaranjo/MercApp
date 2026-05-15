const express = require('express');
const connectDB = require('./routes/db'); // ruta a tu archivo
const productosRoutes = require('./routes/Productos');
const categoriasRoutes = require('./routes/Categorias');
const path = require('path');
const cors = require('cors');

const app = express();
const productos = require('./controllers/ProductosCategoriasAutomaticos');


//cors Permitir solicitudes desde el frontend
app.use(cors());

// Conectar BD
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

//imagen
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/productos', productosRoutes);

app.use('/api/categorias', categoriasRoutes);

productos(); // Ejecutar función para crear admin automáticamente

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
