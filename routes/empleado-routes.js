const express = require('express');
const router = express.Router();
const empleadoController = require('../contollers/empleado-controller');

// Rutas para el modelo Empleado
router.get('/', empleadoController.getAllEmpleados); // Obtener todos los empleados
router.post('/', empleadoController.createEmpleado); // Crear un nuevo empleado
router.delete('/', empleadoController.deleteEmpleadoByFolio); // Eliminar un empleado por folio
router.put('/', empleadoController.updateEmpleadoByFolio); // Editar un empleado por folio

module.exports = router;
