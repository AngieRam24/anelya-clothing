const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  tipoSolicitud: { type: String, required: true },
  productoRelacionado: { type: String, default: 'Ninguno' },
  mensaje: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  estado: { type: String, default: 'Pendiente' }
});

module.exports = mongoose.model('Solicitud', solicitudSchema);
