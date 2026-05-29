require('dotenv').config();
const express = require('express');
const connectDB = require('./routes/db');
const productosRoutes = require('./routes/Productos');
const categoriasRoutes = require('./routes/Categorias');
const path = require('path');
const cors = require('cors');

const app = express();
const productos = require('./controllers/ProductosCategoriasAutomaticos');

// CORS
app.use(cors({
  origin: function(origin, callback) {
    const allowed = [
      process.env.FRONTEND_URL,
      process.env.NETLIFY_URL,
      'http://localhost:5173'
    ].filter(Boolean);

    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  }
}));

// Conectar BD
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ ok: true, message: 'API MercApp activa ' });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor funcionando ');
});

// Imágenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/productos', productosRoutes);
app.use('/api/categorias', categoriasRoutes);

productos();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});