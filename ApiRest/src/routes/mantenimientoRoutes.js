const express = require('express');
const router = express.Router();
const {
    getMantenimientos,
    getMantenimientoByVehiculo,
    getMantenimientoById,
    createMantenimiento,
    updateMantenimiento,
    deleteMantenimiento
} = require('../controllers/mantenimientoController');

// GET    /api/mantenimiento
router.get('/', getMantenimientos);

// GET    /api/mantenimiento/vehiculo/:id  (mantenimientos de un vehículo)
router.get('/vehiculo/:id', getMantenimientoByVehiculo);

// GET    /api/mantenimiento/:id
router.get('/:id', getMantenimientoById);

// POST   /api/mantenimiento
router.post('/', createMantenimiento);

// PUT    /api/mantenimiento/:id
router.put('/:id', updateMantenimiento);

// DELETE /api/mantenimiento/:id
router.delete('/:id', deleteMantenimiento);

module.exports = router;
