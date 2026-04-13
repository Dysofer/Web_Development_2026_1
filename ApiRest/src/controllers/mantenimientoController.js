const pool = require('../config/db');

// GET /api/mantenimiento - Obtener todos los mantenimientos
const getMantenimientos = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                mv.id_registro,
                v.placa,
                v.tipo_vehiculo,
                m.tipo_mantenimiento,
                mv.fecha,
                mv.costo,
                u.nombre AS propietario
            FROM MANTENIMIENTO_VEHICULO mv
            JOIN VEHICULO v ON mv.id_vehiculo = v.id_vehiculo
            JOIN MANTENIMIENTO m ON mv.id_mantenimiento = m.id_mantenimiento
            JOIN USER u ON v.id_user = u.id_user
            ORDER BY mv.fecha DESC
        `);
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/mantenimiento/vehiculo/:id - Mantenimientos de un vehículo específico
const getMantenimientoByVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(`
            SELECT 
                mv.id_registro,
                v.placa,
                v.tipo_vehiculo,
                mod.marca,
                mod.nombre_modelo,
                mod.anio,
                m.tipo_mantenimiento,
                mv.fecha,
                mv.costo
            FROM MANTENIMIENTO_VEHICULO mv
            JOIN VEHICULO v ON mv.id_vehiculo = v.id_vehiculo
            JOIN MODELO_VEHICULO mod ON v.id_modelo = mod.id_modelo
            JOIN MANTENIMIENTO m ON mv.id_mantenimiento = m.id_mantenimiento
            WHERE mv.id_vehiculo = ?
            ORDER BY mv.fecha DESC
        `, [id]);
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/mantenimiento/:id - Obtener un registro por ID
const getMantenimientoById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(`
            SELECT 
                mv.id_registro,
                v.placa,
                v.tipo_vehiculo,
                m.tipo_mantenimiento,
                mv.fecha,
                mv.costo
            FROM MANTENIMIENTO_VEHICULO mv
            JOIN VEHICULO v ON mv.id_vehiculo = v.id_vehiculo
            JOIN MANTENIMIENTO m ON mv.id_mantenimiento = m.id_mantenimiento
            WHERE mv.id_registro = ?
        `, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Registro no encontrado' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /api/mantenimiento - Crear un registro de mantenimiento
const createMantenimiento = async (req, res) => {
    try {
        const { id_vehiculo, id_mantenimiento, fecha, costo } = req.body;
        const [result] = await pool.query(`
            INSERT INTO MANTENIMIENTO_VEHICULO (id_vehiculo, id_mantenimiento, fecha, costo)
            VALUES (?, ?, ?, ?)
        `, [id_vehiculo, id_mantenimiento, fecha, costo]);
        res.status(201).json({
            success: true,
            message: 'Mantenimiento registrado',
            data: { id_registro: result.insertId, id_vehiculo, id_mantenimiento, fecha, costo }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT /api/mantenimiento/:id - Actualizar un registro
const updateMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_vehiculo, id_mantenimiento, fecha, costo } = req.body;
        await pool.query(`
            UPDATE MANTENIMIENTO_VEHICULO 
            SET id_vehiculo=?, id_mantenimiento=?, fecha=?, costo=?
            WHERE id_registro=?
        `, [id_vehiculo, id_mantenimiento, fecha, costo, id]);
        res.json({ success: true, message: 'Registro actualizado' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE /api/mantenimiento/:id - Eliminar un registro
const deleteMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM MANTENIMIENTO_VEHICULO WHERE id_registro = ?', [id]);
        res.json({ success: true, message: 'Registro eliminado' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getMantenimientos,
    getMantenimientoByVehiculo,
    getMantenimientoById,
    createMantenimiento,
    updateMantenimiento,
    deleteMantenimiento
};
