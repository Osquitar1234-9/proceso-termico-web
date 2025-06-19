const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/contacto
router.post('/', async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ error: 'Faltan datos obligatorios.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO contactos (nombre, correo, mensaje) VALUES ($1, $2, $3) RETURNING *',
      [nombre, correo, mensaje]
    );
    res.status(201).json({ mensaje: 'Contacto registrado', data: result.rows[0] });
  } catch (error) {
    console.error('Error al insertar contacto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
