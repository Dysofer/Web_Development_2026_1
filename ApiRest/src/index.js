const express = require('express');
const cors = require('cors');
require('dotenv').config();

const modeloRoutes = require('./routes/modeloRoutes');
const mantenimientoRoutes = require('./routes/mantenimientoRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas principales (como pide la tarea)
app.use('/api/modelos', modeloRoutes);
app.use('/api/mantenimiento', mantenimientoRoutes);

// Ruta raíz - muestra los endpoints disponibles
app.get('/', (req, res) => {
    res.json({
        message: 'CarService API',
        endpoints: {
            Modelo: 'http://localhost:3000/api/modelos',
            Mantenimiento: 'http://localhost:3000/api/mantenimiento'
        }
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
