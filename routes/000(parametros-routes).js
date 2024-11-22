const express = require('express');
const router = express.Router();
const validacionesController = require('../contollers/000(parametros-controller)');

// Rutas para el modelo ValidacionesSistema
router.get('/', validacionesController.getAllValidaciones); // Obtener todas las validaciones
router.post('/', validacionesController.createValidacion); // Crear una nueva validación
router.delete('/', validacionesController.deleteValidacionByFolio); // Eliminar una validación por folio
router.put('/', validacionesController.updateValidacionByFolio); // Editar una validación por folio

module.exports = router;
