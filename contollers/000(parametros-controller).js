const ValidacionesSistema = require('../models/000(Parametros)');
const Empleado = require('../models/empleado');

// Mostrar todas las validaciones
exports.getAllValidaciones = async (req, res) => {
    try {
        const validaciones = await ValidacionesSistema.find();
        res.json(validaciones.map(val => val.showData()));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear una nueva validación
exports.createValidacion = async (req, res) => {
    try {
        // Buscar el empleado por folio para validar la referencia
        const empleado = await Empleado.findOne({ folio: req.body.folio });
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });

        // Crear la nueva validación con la información recibida
        const validacion = new ValidacionesSistema({
            folio: req.body.folio,
            descripcion: req.body.descripcion
        });

        const newValidacion = await validacion.save();
        res.status(201).json(newValidacion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar una validación por folio
exports.deleteValidacionByFolio = async (req, res) => {
    try {
        const { folio } = req.body;

        // Intentamos eliminar la validación con el folio proporcionado
        const result = await ValidacionesSistema.deleteOne({ folio });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Validación no encontrada' });
        }

        res.json({ message: 'Validación eliminada exitosamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Editar una validación por folio
exports.updateValidacionByFolio = async (req, res) => {
    try {
        const validacion = await ValidacionesSistema.findOne({ folio: req.body.folio });
        if (!validacion) return res.status(404).json({ message: 'Validación no encontrada' });

        // Actualizar la descripción si se proporciona una nueva
        if (req.body.descripcion != null) validacion.descripcion = req.body.descripcion;

        const updatedValidacion = await validacion.save();
        res.json(updatedValidacion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
