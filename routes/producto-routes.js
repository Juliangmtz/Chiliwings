const express = require('express');
const router = express.Router();
const productoController = require('../contollers/producto-controller');

// Rutas para el modelo Producto
router.get('/', productoController.getAllProductos); // Mostrar todos los productos
router.post('/', productoController.createProducto); // Crear un nuevo producto
router.delete('/', productoController.deleteProductoByFolio); // Eliminar un producto por folio
router.put('/', productoController.updateProductoByFolio); // Editar un producto por folio
//router.get('/menu', productoController.getProductosByMenu);

//router.get('/', productoController.buscarProductosPorCategoria); // Buscar productos por categoría



module.exports = router;
