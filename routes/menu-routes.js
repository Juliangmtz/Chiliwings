const express = require('express');
const router = express.Router();
const menucontroller = require('../contollers/menu-controller');

// Rutas para el modelo Producto
// Mostrar todos los productos
router.get('/', menucontroller.getTodosLosProductos);


module.exports = router;