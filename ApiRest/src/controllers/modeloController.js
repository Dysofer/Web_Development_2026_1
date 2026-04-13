const pool = require('../config/db');

// GET /api/modelos - Obtener todos los modelos
const getModelos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM MODELO_VEHICULO');
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/modelos/:id - Obtener un modelo por ID
const getModeloById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            'SELECT * FROM MODELO_VEHICULO WHERE id_modelo = ?', [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Modelo no encontrado' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /api/modelos - Crear un modelo
const createModelo = async (req, res) => {
    try {
        const { marca, nombre_modelo, anio } = req.body;
        const [result] = await pool.query(
            'INSERT INTO MODELO_VEHICULO (marca, nombre_modelo, anio) VALUES (?, ?, ?)',
            [marca, nombre_modelo, anio]
        );
        res.status(201).json({
            success: true,
            message: 'Modelo creado',
            data: { id_modelo: result.insertId, marca, nombre_modelo, anio }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT /api/modelos/:id - Actualizar un modelo
const updateModelo = async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, nombre_modelo, anio } = req.body;
        await pool.query(
            'UPDATE MODELO_VEHICULO SET marca=?, nombre_modelo=?, anio=? WHERE id_modelo=?',
            [marca, nombre_modelo, anio, id]
        );
        res.json({ success: true, message: 'Modelo actualizado' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE /api/modelos/:id - Eliminar un modelo
const deleteModelo = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM MODELO_VEHICULO WHERE id_modelo = ?', [id]);
        res.json({ success: true, message: 'Modelo eliminado' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getModelos, getModeloById, createModelo, updateModelo, deleteModelo };
