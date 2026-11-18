const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { correo, password } = req.body;

  if (
    correo === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({
      mensaje: 'Inicio de sesión exitoso',
      token: process.env.ADMIN_TOKEN
    });
  }

  return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
});

module.exports = router;
