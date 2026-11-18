const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Middleware sencillo para verificar que es el administrador
const verificarAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === process.env.ADMIN_TOKEN) {
    return next();
  }
  return res.status(403).json({ mensaje: 'Acceso denegado: no autorizado' });
};

// GET: Consultar todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar productos' });
  }
});

// POST: Registrar nuevo producto (Solo Admin)
router.post('/', verificarAdmin, async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const guardado = await nuevoProducto.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el producto' });
  }
});

// PUT: Actualizar producto (Solo Admin)
router.put('/:id', verificarAdmin, async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el producto' });
  }
});

// DELETE: Eliminar producto (Solo Admin)
router.delete('/:id', verificarAdmin, async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar el producto' });
  }
});

module.exports = router;
