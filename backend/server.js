const express = require('express');
const cors = require('cors');
const contactoRoutes = require('./routes/contacto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/contacto', contactoRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API de Proceso Térmico funcionando ✅');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

