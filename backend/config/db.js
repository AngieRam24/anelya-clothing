const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado exitosamente a MongoDB');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
  }
};

module.exports = conectarDB;
