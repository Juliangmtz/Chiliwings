const express = require('express');
const router = express.Router();
const clienteController = require('../contollers/clientes-controller');

// Rutas para el modelo Cliente
router.get('/', clienteController.getAllClientes); // Obtener todos los clientes
router.post('/', clienteController.createCliente); // Crear un nuevo cliente
router.delete('/', clienteController.deleteClienteByFolio); // Eliminar un cliente por folio
router.put('/', clienteController.updateClienteByFolio); // Editar un cliente por folio

module.exports = router;
