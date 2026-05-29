const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Usamos process.env.MONGODB_URI en lugar de un texto fijo
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error("La variable MONGODB_URI no está definida en el entorno");
    }

    await mongoose.connect(uri);
    console.log('Base de datos conectada con éxito (Atlas) ');
  } catch (error) {
    console.error('Error al conectar a la base de datos :', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;