const express = require('express');
const router = express.Router();
const Solicitud = require('../models/Solicitud');

const verificarAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === process.env.ADMIN_TOKEN) {
    return next();
  }
  return res.status(403).json({ mensaje: 'Acceso denegado' });
};

// POST: Registrar nueva solicitud o mensaje de contacto
router.post('/', async (req, res) => {
  try {
    const nuevaSolicitud = new Solicitud(req.body);
    const guardada = await nuevaSolicitud.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al registrar la solicitud' });
  }
});

// GET: Consultar todas las solicitudes (Solo Admin)
router.get('/', verificarAdmin, async (req, res) => {
  try {
    const solicitudes = await Solicitud.find().sort({ fecha: -1 });
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar solicitudes' });
  }
});

// PUT: Actualizar estado de una solicitud (Solo Admin)
router.put('/:id', verificarAdmin, async (req, res) => {
  try {
    const actualizada = await Solicitud.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true }
    );
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el estado' });
  }
});

module.exports = router;
