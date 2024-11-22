const express = require('express');
const router = express.Router();
const sindicatoController = require('../contollers/sindicatos-controller');

// Rutas para el modelo Sindicato
router.get('/', sindicatoController.getAllSindicatos); // Mostrar todos los sindicatos
router.post('/', sindicatoController.createSindicato); // Crear un nuevo sindicato
router.delete('/', sindicatoController.deleteSindicatoByFolio); // Eliminar un sindicato por folio
router.put('/', sindicatoController.updateSindicatoByFolio); // Editar un sindicato por folio

module.exports = router;
